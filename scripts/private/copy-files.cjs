const fs = require('fs-extra');
const path = require('path');
const { log } = require('@clack/prompts');

/**
 * @typedef {object} Options
 * @property {boolean} [dryRun]
 * @property {boolean} [less]
 * @property {boolean} [cli]
 * @property {boolean} [dts]
 */

module.exports = async (/** @type {Options} */ options) => {
	const service = new CopyFilesService(options);

	if (options.cli) await service.copyCliFiles();
	if (options.less) await service.copyLessFiles();
	if (options.dts) await service.copyDtsFiles();
};

class CopyFilesService {
	constructor (/** @type {Options} */ options) {
		this.options = options;

		this.rootPath = path.resolve(__dirname, '../..');
		this.stylesPath = path.resolve(this.rootPath, 'dist/styles');
		this.cliPath = path.resolve(this.rootPath, 'dist/scripts/public');
	}

	async copyLessFiles () {
		log.step('🥨 --> Copy Shared .less files');
		await fs.remove(this.stylesPath);
		await fs.copy(path.resolve(this.rootPath, 'packages/Shared/styles'), this.stylesPath);

		log.step('🥨 --> Copy Packages .less files');
		const packages = (await fs.readdir(path.resolve(this.rootPath, 'packages'), { withFileTypes: true }))
			.filter(x => x.isDirectory() && x.name !== 'Shared')
			.map(x => x.name);

		if (await fs.pathExists(path.resolve(this.rootPath, 'dist/styles/packages'))) {
			await fs.rm(path.resolve(this.rootPath, 'dist/styles/packages'), { recursive: true });
		}

		await fs.mkdir(path.resolve(this.rootPath, 'dist/styles/packages'));

		for await (const packageName of packages) {
			const lessFileContent = await fs.readFile(
				path.resolve(this.rootPath, 'packages', packageName, `src/Orion${packageName}.less`),
				{ encoding: 'utf-8' },
			);

			const result = lessFileContent
				.replace(`@import '../../Shared/styles/variables.less';`, `@import '../variables.less';`)
				.replace(`@import '../../Shared/styles/mixins.less';`, `@import '../mixins.less';`)
				.replace(`@import '../../Input/src/OrionInput';`, `@import './OrionInput';`)
				.replace(`@import (css) url('assets/fonts/coolicons/coolicons.css');`, `@import (css) url('../../assets/fonts/coolicons/coolicons.css');`);

			await fs.writeFile(path.resolve(this.rootPath, 'dist/styles/packages', `Orion${packageName}.less`), result, { encoding: 'utf-8' });
		}

		await fs.writeFile(
			path.resolve(this.rootPath, 'dist/styles/packages', `index.less`),
			packages.map(x => `@import './Orion${x}.less';`).join('\n'),
			{ encoding: 'utf-8' },
		);

		await fs.copy(path.resolve(this.rootPath, 'assets'), path.resolve(this.rootPath, 'dist/assets'));
	}

	async copyCliFiles () {
		log.step('🥨 --> Copy cli files');
		await fs.copy(path.resolve(this.rootPath, 'scripts/public'), this.cliPath);
		await fs.copy(path.resolve(this.rootPath, 'cli.cjs'), path.resolve(this.rootPath, 'dist/cli.cjs'));
	}

	async copyDtsFiles () {
		log.step('🥨 --> Copy .dts files');
		await fs.copy(
			path.resolve(this.rootPath, 'lib/monkey-patching.d.ts'),
			path.resolve(this.rootPath, 'dist/monkey-patching.d.ts'),
		);
		await fs.copy(
			path.resolve(this.rootPath, 'lib/packages.d.ts'),
			path.resolve(this.rootPath, 'dist/types/lib/packages.d.ts'),
		);
	}
}
