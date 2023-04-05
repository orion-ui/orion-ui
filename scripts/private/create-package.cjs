const fs = require('fs-extra');
const path = require('path');
const { sanitizePackageName } = require('../scripts-utils.cjs');
const { text, log, note } = require('@clack/prompts');


/**
 * @typedef {object} Options
 * @property {boolean} [dryRun]
 * @property {boolean} [verbose]
 * @property {boolean} inOrion
 */

module.exports = async (/** @type {Options} */ options) => {
	const name = await text({
		message: `What's the name of your package?`,
		placeholder: `Package name`,
		validate: (value) => {
			if (!value.trim().length) {
				return `You need to specify the a name for your package`;
			}

			const existingPackages = fs
				.readdirSync(path.resolve(__dirname, '../../packages'))
				.filter(x => !(/(\.d)?\.ts$/).test(x));

			const { cleanPascalCase } = sanitizePackageName(value);

			if (existingPackages.includes(cleanPascalCase)) {
				return `This package already exists`;
			}
		},
	});

	const factory = new ComponentFactory(name.toString(), options);
	factory.createFolderTree();
	factory.createFiles();
	factory.createDocFiles();
};


class ComponentFactory {
	constructor (/** @type {string} */ name, /** @type {Options} */ options) {
		this.options = options;

		const cleanPackageName = sanitizePackageName(name);
		this.nameKebabCase = cleanPackageName.kebabCase;
		this.namePascalCase = cleanPackageName.pascalCase;
		this.namePascalCaseClean = cleanPackageName.cleanPascalCase;

		this.rootPath = path.resolve(__dirname, '../../');
		this.packagePath = path.resolve(this.rootPath, 'packages', this.namePascalCase.replace(/^Orion/, ''));
		this.docPath = path.resolve(this.rootPath, 'docs');
		this.demosPath = path.resolve(this.packagePath, 'docs');
		this.srcPath = path.resolve(this.packagePath, 'src');
	}

	createFolderTree () {
		if (!this.options.dryRun) {
			if (!fs.existsSync(this.packagePath)) fs.mkdirSync(this.packagePath);
			if (!fs.existsSync(this.demosPath)) fs.mkdirSync(this.demosPath);
			if (!fs.existsSync(this.srcPath)) fs.mkdirSync(this.srcPath);
		}
	}

	createFiles () {
		const filesToWrite = [
			'index.ts',
			'src/{ComponentName}.vue',
			'src/{ComponentName}.less',
			'src/{ComponentName}SetupService.ts',
		];

		if (this.options.dryRun) note(`🥨 --> Orion would write following files in /packages`);

		filesToWrite.forEach((f) => {
			const targetFileName = f.replace(/{ComponentName}/g, this.namePascalCase);
			const relativePath = path.resolve(this.packagePath, targetFileName).replace(this.rootPath, '');

			if (this.options.dryRun) {
				log.message(path.resolve(this.packagePath, targetFileName));
			} else {
				fs.writeFileSync(path.resolve(this.packagePath, targetFileName), this.readTemplate(`component/${f}`), { encoding: 'utf-8' });
				log.success(`🥨 --> Orion created ${relativePath}`);
			}
		});
	}

	createDocFiles () {
		const filesToWrite = [
			'components/{ComponentName}.md',
			'fr/components/{ComponentName}.md',
		];

		if (this.options.dryRun) note(`🥨 --> Orion would write following files in /docs`);

		filesToWrite.forEach((f) => {
			const targetFileName = f.replace(/{ComponentName}/g, this.namePascalCase);
			const relativePath = path.resolve(this.docPath, targetFileName).replace(this.rootPath, '');

			if (this.options.dryRun) {
				log.message(path.resolve(this.docPath, targetFileName));
			} else {
				fs.writeFileSync(path.resolve(this.docPath, targetFileName), this.readTemplate(`docs/${f}`), { encoding: 'utf-8' });
				log.success(`🥨 --> Orion created ${relativePath}`);
			}
		});
	}

	readTemplate (/** @type {string} */ targetPath) {
		let content = fs.readFileSync(path.resolve(__dirname, 'templates', `${targetPath}template`), 'utf8');

		content = content.replace(/{ComponentName}/g, this.namePascalCase);
		content = content.replace(/{ComponentCleanName}/g, this.namePascalCaseClean);
		content = content.replace(/{component-name}/g, this.nameKebabCase);

		return content;
	}
}
