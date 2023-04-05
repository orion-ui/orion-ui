const path = require('path');
const { dash } = require('radash');
const { readFile, writeFile, existsSync, readdirSync } = require('fs-extra');
const { log, note } = require('@clack/prompts');
const { NoRoutePackagesFolder } = require('../scripts-utils.cjs');

/**
 * @typedef {object} Options
 * @property {boolean} [dryRun]
 * @property {boolean} [verbose]
 */

module.exports = async (/** @type {Options} */ options) => {
	const factory = new RouteFactory(options);

	await factory.writeRouterFile();
	await factory.writeViewFiles();
	await factory.writeNavigationFile();
};


class RouteFactory {
	constructor (/** @type {Options} */ options) {
		this.options = options;

		const packagesFolderPath = path.resolve(__dirname, '../../packages');
		this.packages = readdirSync(packagesFolderPath).filter(x => !(/(\.d)?\.ts$/).test(x) && !NoRoutePackagesFolder.includes(x));
	}

	viewName (/** @type {string} */ name) {
		return `${name}View`;
	}

	async writeRouterFile () {
		const routerFolderPath = path.resolve(__dirname, '../../sandbox/router/packages.router.ts');
		const routerFolderRelativePath = routerFolderPath.replace(process.cwd(), '');

		let content = await readFile(path.resolve(__dirname, 'templates/packages.router.tstemplate'), { encoding: 'utf-8' });

		content = content.replace(/{routes}/gm, this.packages.map((x) => {
			return `{
				name: '${this.viewName(x)}',
				path: '${dash(x)}',
				component: () => import('sandbox/views/packages/${this.viewName(x)}.vue'),
			},`;
		}).join('\n\t\t\t'));

		if (this.options.dryRun) {
			note(`🥨 --> Orion would write following content in ${routerFolderRelativePath}`);
			log.message(content);
		} else {
			await writeFile(routerFolderPath, content, { encoding: 'utf-8' });
			log.success(`🥨 --> Orion created ${routerFolderRelativePath}`);
		}
	}

	async writeNavigationFile () {
		const utilsFolderPath = path.resolve(__dirname, '../../sandbox/utils/packages-navigation.ts');
		const utilsFolderRelativePath = utilsFolderPath.replace(process.cwd(), '');

		let content = await readFile(path.resolve(__dirname, 'templates/packages-navigation.tstemplate'), { encoding: 'utf-8' });

		content = content.replace(/{navigations}/gm, this.packages.map((x) => {
			return `{
		label: '${x}',
		to: { name: '${this.viewName(x)}' },
		icon: 'black_lives_matter',
	},`;
		}).join('\n\t'));

		if (this.options.dryRun) {
			note(`🥨 --> Orion would write following content in ${utilsFolderRelativePath}`);
			log.message(content);
		} else {
			await writeFile(utilsFolderPath, content, { encoding: 'utf-8' });
			log.success(`🥨 --> Orion created ${utilsFolderRelativePath}`);
		}
	}

	async writeViewFiles () {
		const viewsFolderPath = path.resolve(__dirname, '../../sandbox/views/packages');
		const viewsFolderRelativePath = viewsFolderPath.replace(process.cwd(), '');
		const viewTemplateContent = await readFile(path.resolve(__dirname, 'templates/{PackageName}.vuetemplate'), { encoding: 'utf-8' });

		this.packages.forEach(async (x) => {
			const viewFileName = `${this.viewName(x)}.vue`;

			if (!existsSync(path.resolve(viewsFolderPath, viewFileName))) {
				const content = viewTemplateContent.replace(/{PackageName}/gm, x);

				if (this.options.dryRun) {
					note(`🥨 --> Orion would write following content in ${viewsFolderRelativePath}/${viewFileName}`);
					log.message(content);
				} else {
					await writeFile(path.resolve(viewsFolderPath, viewFileName), content, { encoding: 'utf-8' });
					log.success(`🥨 --> Orion created ${viewsFolderRelativePath}/${viewFileName}`);
				}
			}
		});
	}
}


