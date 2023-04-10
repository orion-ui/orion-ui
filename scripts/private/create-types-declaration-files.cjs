const fs = require('fs-extra');
const path = require('path');
const glob = require('fast-glob');
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { Project, SourceFile } = require('ts-morph');
const { parse, compileScript } = require('@vue/compiler-sfc');
const { sleep } = require('radash');
const { log, note, spinner } = require('@clack/prompts');

// const setupServiceImportRegex = /^import (\w+SetupService) from .+\n/gm;
const lessImportRegex = /^import .+.less.+\n/gm;

/**
 * @typedef {object} Options
 * @property {boolean} [dryRun]
 * @property {boolean} [verbose]
 * @property {boolean} [inOrion]
 * @property {boolean} [dist]
 */

module.exports = async (/** @type {Options} */ options) => {
	const factory = new TypesDeclarationFilesFactory(options);
	await factory.buildTypesAsync();
};

class TypesDeclarationFilesFactory {
	/** @type {string[]} */
	packagesNames = [];
	/** @type {Project | undefined} */
	project;
	/** @type {SourceFile[]} */
	sourceFiles = [];

	config = {
		requiredFiles: [
			'lib/global.d.ts',
		],
		dtsFilesNeededForBuild: [
			'shims-env.d.ts',
			'lib/packages.d.ts',
			'lib/global.d.ts',
			'packages/packages-shims.d.ts',
		],
		input: [
			'packages/**/*.ts',
			'packages/**/src/*.vue',
			// 'packages/!(Shared)/!(*SetupService).ts',
			'packages/index.ts',
			'lang/**/*.ts',
		],
		inputDist: [
			'lib/index.ts',
			'assets/fonts/coolicons.ts',
			'utils/Bus.ts',
			'utils/Log.ts',
			'utils/Orion.ts',
			'utils/tools.ts',
			'services/**/*.ts',
		],
	};

	constructor (/** @type {Options} */ options) {
		this.options = options;
		this.rootPath = path.resolve(__dirname, '../..');
		this.typesPath = path.resolve(this.rootPath, 'dist/types');
	}

	get tsConfigFilePath () {
		return path.resolve(this.rootPath, 'tsconfig.json');
	}

	get sortedPackageNames () {
		return this.packagesNames.sort();
	}

	async buildTypesAsync () {
		log.step(`🥨 --> Generate types declaration files`);

		if (!this.options.dryRun) {
			await fs.remove(this.typesPath);
			await this.copyRequiredFiles();
		}

		const { input, inputDist, dtsFilesNeededForBuild } = this.config;

		const tsConfigFilePath = fs.existsSync(this.tsConfigFilePath)
			? this.tsConfigFilePath
			: undefined;

		this.project = new Project({
			compilerOptions: {
				// noEmitOnError: true,
				allowJs: true,
				declaration: true,
				emitDeclarationOnly: true,
				outDir: this.typesPath,
			},
			tsConfigFilePath,
			skipAddingFilesFromTsConfig: true,
		});

		const filesToScan = [dtsFilesNeededForBuild, input, inputDist];

		for await (const bundle of filesToScan) {
			log.info(`Working on following bundle:`);
			note(bundle.join('\n'));
			const files = await glob(bundle);
			await this.computeFiles(files);
		}
	}

	async scanFiles (/** @type {string[]} */ files) {
		this.sourceFiles.length = 0;

		const scanSpinner = spinner();
		scanSpinner.start(`Scanning ${files.length} files`);
		await sleep(1000);

		for await (const file of files) {
			if (/\.vue$/.test(file)) {
				const content = fs.readFileSync(file, 'utf8');
				const sfc = parse(content);
				const { script, scriptSetup } = sfc.descriptor;
				const tsLang = ['ts', 'tsx'];

				if (script || scriptSetup) {
					let content = '';
					let isTS = false;
					let isTSX = false;

					if (scriptSetup) {
						const compiled = compileScript(sfc.descriptor, { id: 'xxx' });
						content += compiled.content;
						if (scriptSetup.lang && tsLang.includes(scriptSetup.lang)) isTS = true;
						if (scriptSetup.lang === 'tsx') isTSX = true;
					} else if (script && script.content) {
						content += script.content;
						if (script.lang && tsLang.includes(script.lang)) isTS = true;
						if (script.lang === 'tsx') isTSX = true;
					}

					const sourceFile = this.project?.createSourceFile(
						path.relative(process.cwd(), file) + (isTS ? '.ts' : '.js'),
						content,
						{
							scriptKind: isTSX
								? 4
								: isTS
									? 3
									: 1,
						},
					);

					if (sourceFile) this.sourceFiles.push(sourceFile);
				}
			} else {
				if (this.project) this.sourceFiles.push(this.project.addSourceFileAtPath(file));
			}
		}

		scanSpinner.stop(`${files.length} files scanned`);
	}

	async computeFiles (/** @type {string[]} */ files) {
		if (!this.project) return;

		await this.scanFiles(files);

		/* const diagnostics = this.project.getPreEmitDiagnostics();
		log.message(this.project.formatDiagnosticsWithColorAndContext(diagnostics)); */

		const successFiles = [];
		const errorFiles = [];
		const { dtsFilesNeededForBuild } = this.config;

		const computeSpinner = spinner();
		computeSpinner.start(`Building types for ${this.sourceFiles.length} files`);

		for (const sourceFile of this.sourceFiles) {
			const emitOutput = sourceFile.getEmitOutput();
			const fileRelativePath = sourceFile.getFilePath().split(this.rootPath)[1].slice(1);
			const isLibIndex = fileRelativePath === 'lib/index.ts';
			const isPackageIndex = /^packages(\/\w+\/)(?!src\/)/.test(fileRelativePath);

			if (dtsFilesNeededForBuild.includes(fileRelativePath)) continue;

			if (!emitOutput.getOutputFiles().length) {
				errorFiles.push(sourceFile.getFilePath());
			}

			for (const outputFile of emitOutput.getOutputFiles()) {
				const filePath = outputFile
					.getFilePath()
					.replace('.vue.d.ts', '.d.ts');

				/* if (this.options.verbose) {
					log.message(`🤖 --> build types for`, pico.yellow(fileRelativePath.replace('.vue.ts', '.vue')));
				} */

				let fileContent = outputFile
					.getText()
					.replace(lessImportRegex, '');
				// .replace(setupServiceImportRegex, '');

				if (isPackageIndex) {
					// Replace import .vue with .d.ts
					fileContent = fileContent.replace(/(^import \w+ from .+)(.vue)/gm, '$1');
					this.sortedPackageNames.push(fileRelativePath.split('/')[1]);
				}

				if (isLibIndex) {
					fileContent = fileContent.replace('<reference types="lib/global" />', '<reference types="./global" />');
				}

				if (this.options.dryRun && this.options.verbose) {
					note(`🥨 --> Orion would write following content in ${fileRelativePath}`);
					log.message(fileContent);
				} else {
					await fs.mkdir(path.resolve(this.typesPath, path.dirname(filePath)), { recursive: true });
					await fs.writeFile(filePath, fileContent, 'utf8');
				}

				successFiles.push(filePath);
			}
		}

		computeSpinner.stop(`Types built for ${this.sourceFiles.length} files`);


		if (errorFiles.length) {
			log.error('🤮 Error for files');
			note(errorFiles.join('\n'));
		}

		return {
			successFiles,
			errorFiles,
		};
	}

	async copyRequiredFiles () {
		fs.mkdirSync(path.resolve(this.typesPath, 'lib'), { recursive: true });
		return Promise.all(this.config.requiredFiles.map((f) => {
			return fs.copyFile(
				path.resolve(this.rootPath, f),
				path.resolve(this.typesPath, f),
			);
		}));
	}
}
