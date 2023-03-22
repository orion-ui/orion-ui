/* eslint-disable no-console */
const pico = require('picocolors');
const fs = require('fs-extra');
const path = require('path');
const { sanitizePackageName } = require('../scripts-utils.cjs');

/**
 * @typedef {object} Options
 * @property {boolean} [dryRun]
 */

module.exports = async (/** @type {string} */ name, /** @type {Options} */ options) => {
	if (!name?.length) throw `You need to specify the --name option`;

	const factory = new ComponentFactory(name, options);
	factory.createFolderTree();
	factory.createFiles();
};


class ComponentFactory {
	constructor (/** @type {string} */ name, /** @type {Options} */ options) {
		this.options = options;

		const cleanPackageName = sanitizePackageName(name);
		this.nameKebabCase = cleanPackageName.kebabCase;
		this.namePascalCase = cleanPackageName.pascalCase;
		this.namePascalCaseClean = cleanPackageName.cleanPascalCase;

		this.rootPath = path.resolve(__dirname, '../../');
		this.packagePath = path.resolve(this.rootPath, 'packages', this.namePascalCaseClean);
		this.docsPath = path.resolve(this.packagePath, 'docs');
		this.srcPath = path.resolve(this.packagePath, 'src');
	}

	createFolderTree () {
		if (!this.options.dryRun) {
			if (!fs.existsSync(this.packagePath)) fs.mkdirSync(this.packagePath);
			if (!fs.existsSync(this.docsPath)) fs.mkdirSync(this.docsPath);
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

		filesToWrite.forEach((f) => {
			const targetFileName = f.replace(/{ComponentName}/g, this.namePascalCase);
			const relativePath = path.resolve(this.packagePath, targetFileName).replace(this.rootPath, '');

			if (this.options.dryRun) {
				console.log(pico.cyan(`Would write file`));
				console.log(path.resolve(this.packagePath, targetFileName));
			} else {
				fs.writeFileSync(path.resolve(this.packagePath, targetFileName), this.readTemplate(f), { encoding: 'utf-8' });
				console.log(pico.yellow(`🥨 --> Successfully created ${relativePath}`));
			}
		});
	}

	readTemplate (/** @type {string} */targetPath) {
		let content = fs.readFileSync(path.resolve(__dirname, 'templates/component', `${targetPath}template`), 'utf8');

		content = content.replace(/{ComponentName}/g, this.namePascalCase);
		content = content.replace(/{ComponentCleanName}/g, this.namePascalCaseClean);
		content = content.replace(/{component-name}/g, this.nameKebabCase);

		return content;
	}
}
