const { SetupFileScanner, VueFileScanner } = require('./private/create-doc.cjs').scanner;

const path = require('path');
const { readdir, writeFile } = require('fs-extra');
// eslint-disable-next-line no-unused-vars
const { Project, SourceFile, SyntaxKind } = require('ts-morph');
const { PrivatePackagesFolder } = require('./scripts-utils.cjs');

/**
 * @typedef {Record<string, any>} PackageData
 *
 * @typedef {object} Options
 * @property {boolean} [dryRun]
 * @property {boolean} [verbose]
 */

class MigratePropToPureTs {

	testOnPackages = [
	/* 'Alert',
		'Aside',
		'Radio',
		'Button',
		'Checkbox',
		'Datepicker',
		'Notif',
		'TabPane',
		'Tour', */
	];

	packagesFolderPath = path.resolve(__dirname, '../dist/types/packages');
	tsFileFolderPath = path.resolve(__dirname, '../packages');
	file;
	packages;
	project;
	pack;

	/** @type {Array<{ package: string, data: PackageData }>} */
	packagesDataDocFile = [];

	constructor () {

		this.initAsync();
	}

	async initAsync () {
		this.createTsMorphProject();
		await this.setPackagesListAsync();
		await this.scanPackagesAsync();
	}

	async setPackagesListAsync () {
		this.packages = (await readdir(this.packagesFolderPath)).filter((x) => {
			return this.testOnPackages.length
				? !(/(\.d)?\.ts$/).test(x) && this.testOnPackages.includes(x)
				: !(/(\.d)?\.ts$/).test(x) && !PrivatePackagesFolder.includes(x);
		});
	}

	createTsMorphProject () {
		this.project = new Project({
			compilerOptions: {
				allowJs: true,
				declaration: true,
				emitDeclarationOnly: true,
			},
			skipAddingFilesFromTsConfig: true,
		});
	}

	addFileToTsMorphProject (pack) {
		this.file = this.project.addSourceFileAtPath(path.resolve(
			this.packagesFolderPath,
			pack,
			'src',
			`Orion${this.pack}Setup.ts`,
		));

		this.fullText = this.file.getText(true);
	}

	async scanPackagesAsync () {
		for await (const pack of this.packages) {
			const setupServiceFileScanner = new SetupFileScanner(undefined, this.project, pack);
			const vueFileScanner = new VueFileScanner(undefined, this.project, pack);
			const setupServiceFileData = await setupServiceFileScanner.scan();
			const setupFile = setupServiceFileScanner.file;
			let vueFileContent = vueFileScanner.vue;

			await this.rewritePropsAsync(pack, setupFile, setupServiceFileData.props);
			await this.rewriteVueFileAsync(pack, vueFileContent);
		}
	}

	async rewritePropsAsync (packageName, /** @type {SourceFile} */sourceFile, props) {
		const regexProps = /static props\s*=\s*{([\s\S]*?)};/g;
		const regexTypeProps = /type Props = SetupProps.*/;
		const regexIsConstructor = /constructor \(.*\)/;
		const regexConstructor = /\(props: \w*(,\s*emit[s]*: \w*)*/;
		const regexEmitsDef = /^type .*Emit[s]* = /;
		const regexExistingEmits = /private emit[s]*:* .*;|protected emit[s]*:* .*;/;
		const regexEmitAssign = /this.emit[s]* = emit[s]*;/;
		const regexExtendProps = /<Props/;

		let newProps = `export type Orion${packageName}Props = {`;
		let defaultProps = `static readonly defaultProps = {`;

		// GET inherit props
		const spreadProps = sourceFile?.getClass(`Orion${packageName}Setup`)?.getProperty('props')?.getInitializerIfKind(SyntaxKind.ObjectLiteralExpression);

		const spreadAssignments = spreadProps?.getProperties().filter(prop =>
			prop.getKind() === SyntaxKind.SpreadAssignment,
		);
		const res = spreadAssignments?.map(x => ({
			name: x.getText().replace('.props', '.defaultProps'),
			default: x.getText().match(/'.*'/g),
		}));

		defaultProps += '\n\t\t' + res?.filter(x => x.name.includes(`.defaultProps`)).map(x => x.name)?.join('\n') + ',';

		const newConstructorProps = `(protected props: Orion${packageName}Props, protected emits: Orion${packageName}Emits`;
		const newEmitsDef = `export type Orion${packageName}Emits =`;

		props.forEach((prop) => {
			newProps += `\n\t// @doc props/${prop.name} ${prop.desc.en}
	// @doc/fr props/${prop.name} ${prop.desc.fr}
	${prop.name}: ${prop.type.replace('function', 'Function')},`;

			if (prop.defaultValue !== 'undefined')
				defaultProps += `\n\t\t${prop.name}: ${prop.defaultValue},`;
		});

		newProps += `\n};`;
		defaultProps += `\n\t};`;
		let fileContent = sourceFile.getText(true);
		sourceFile.removeText();
		if (fileContent.match(regexEmitsDef)) {
			fileContent = fileContent.replace(regexEmitsDef, newEmitsDef);
		}
		else {
			newProps = `export type Orion${packageName}Emits = {}\n`.concat(newProps);
		}

		fileContent = fileContent.replace('SharedSetup<Props>', 'SharedSetup');
		fileContent = fileContent.replace(regexTypeProps, newProps);
		fileContent = fileContent.replace(regexExtendProps, `<Orion${packageName}Props`);
		fileContent = fileContent.replace(regexExistingEmits, '');
		fileContent = fileContent.replace(regexEmitAssign, '');

		if (regexIsConstructor.test(fileContent)) {
			fileContent = fileContent.replace(regexConstructor, newConstructorProps);
		}
		await writeFile(sourceFile.getFilePath(), fileContent.replace(regexProps, defaultProps), 'utf8');
	}

	async rewriteVueFileAsync (packageName, fileContent) {
		const filePath = this.tsFileFolderPath + `/${packageName}/src/Orion${packageName}.vue`;

		const regexProps = /const props = .*/;
		const regexEmits = /(const emit(s)* = )*defineEmits<({(\n*\s*\(.*)*\n*>*})*\w*>*\(\);/;
		const regexTypeEmits = /type \w*Emit(s)*\s*=\s*{\s*(\n*\s*\(.*)*\n}/;
		const regexConstructor = /\(props(,*\s*emit[s]*)*/;

		let newProps = `import type { Orion${packageName}Props, Orion${packageName}Emits } from './Orion${packageName}Setup';
const props = withDefaults(defineProps<Orion${packageName}Props>(), Orion${packageName}Setup.defaultProps);`;
		const newEmits = `const emits = defineEmits<Orion${packageName}Emits>() as Orion${packageName}Emits;`;

		if (fileContent.match(regexTypeEmits)) {
			fileContent = fileContent.replace(regexTypeEmits, '');
		}
		fileContent = fileContent.replace(regexConstructor, `(props, emits`);
		fileContent = fileContent.replace(regexEmits, '');
		fileContent = fileContent.replace('', '');

		newProps = `const emits = defineEmits<Orion${packageName}Emits>() as Orion${packageName}Emits;\n`.concat(newProps);

		fileContent = fileContent.replace(regexProps, newProps);
		fileContent = fileContent.replace(regexEmits, newEmits);

		await writeFile(filePath, fileContent, 'utf8');
	}

}

new MigratePropToPureTs();
