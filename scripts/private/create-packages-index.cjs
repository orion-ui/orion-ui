const path = require('path');
const { readFile, readdir, writeFile } = require('fs-extra');
const { log, note } = require('@clack/prompts');
const { PackagesFolderToNotIndex } = require('../scripts-utils.cjs');

/**
 * @typedef {object} Options
 * @property {boolean} [dryRun]
 * @property {boolean} [verbose]
 */

module.exports = async (/** @type {Options} */ options) => {
	const factory = new PackagesIndexFactory(options);
	await factory.setPackagesList();
	await factory.createPackageIndexTsFile();
	await factory.createPackageDtsFile();
};

class PackagesIndexFactory {
	constructor (/** @type {Options} */ options) {
		this.options = options;
		this.packagesFolderPath = path.resolve(__dirname, '../../packages');
		this.packagesFolderRelativePath = this.packagesFolderPath.replace(process.cwd(), '');
		this.libFolderPath = path.resolve(__dirname, '../../lib');
		this.libFolderRelativePath = this.libFolderPath.replace(process.cwd(), '');
		/** @type {string[]} */
		this.packages = [];
	}

	async setPackagesList () {
		this.packages = (await readdir(this.packagesFolderPath)).filter((x) => {
			return !(/(\.d)?\.ts$/).test(x) && !PackagesFolderToNotIndex.includes(x);
		});
	}

	async createPackageIndexTsFile () {
		const importTemplate = `import { Orion{ComponentName}Plugin } from './{ComponentName}';`;
		const pluginTemplate = `Orion{ComponentName}Plugin.install?.(app, prefix);`;
		const exportTemplate = `export * from './{ComponentName}';`;

		let content = await readFile(path.resolve(__dirname, 'templates/packages-index.tstemplate'), { encoding: 'utf-8' });

		content = content.replace(/{imports}/gm, this.packages.map((x) => {
			return importTemplate.replace(/{ComponentName}/gm, x);
		}).join('\n'));

		content = content.replace(/{plugins}/gm, this.packages.map((x) => {
			return pluginTemplate.replace(/{ComponentName}/gm, x);
		}).join('\n\t\t'));

		content = content.replace(/{exports}/gm, this.packages.map((x) => {
			return exportTemplate.replace(/{ComponentName}/gm, x);
		}).join('\n'));

		if (this.options.dryRun) {
			note(`🥨 --> Orion would write following content in ${this.packagesFolderRelativePath}/index.ts`);
			log.message(content);
		} else {
			await writeFile(path.resolve(this.packagesFolderPath, 'index.ts'), content, { encoding: 'utf-8' });
			log.success(`🥨 --> Orion created ${this.packagesFolderRelativePath}/index.ts`);
		}
	}

	async createPackageDtsFile () {
		const importTemplate = `import { Orion{ComponentName}SetupService, Orion{ComponentName}Props, Orion{ComponentName}Emits } from '../packages/index';`;
		const declarationTemplate = `type Orion{ComponentName} = InstanceType<typeof Orion{ComponentName}SetupService>['publicInstance'];
	namespace Orion{ComponentName} {
		type Props = Orion{ComponentName}Props
		type Emits = Orion{ComponentName}Emits
	}`;

		let content = await readFile(path.resolve(__dirname, 'templates/packages.d.tstemplate'), { encoding: 'utf-8' });

		content = content.replace(/{imports}/gm, this.packages.map((x) => {
			return importTemplate.replace(/{ComponentName}/gm, x);
		}).join('\n'));

		content = content.replace(/{declarations}/gm, this.packages.map((x) => {
			return declarationTemplate.replace(/{ComponentName}/gm, x);
		}).join('\n\n\t'));

		if (this.options.dryRun) {
			note(`🥨 --> Orion would write following content in ${this.libFolderRelativePath}/packages.d.ts`);
			log.message(content);
		} else {
			await writeFile(path.resolve(this.libFolderPath, 'packages.d.ts'), content, { encoding: 'utf-8' });
			log.success(`🥨 --> Orion created ${this.libFolderRelativePath}/packages.d.ts`);
		}
	}
}
