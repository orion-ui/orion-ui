const path = require('path');
const { readFile, readdir, writeFile } = require('fs-extra');
const { log, note } = require('@clack/prompts');
const { PrivateServices } = require('../scripts-utils.cjs');

/**
 * @typedef {object} Options
 * @property {boolean} [dryRun]
 * @property {boolean} [verbose]
 */

module.exports = async (/** @type {Options} */ options) => {
	const servicesFolderPath = path.resolve(__dirname, '../../services');
	const servicesFolderRelativePath = servicesFolderPath.replace(process.cwd(), '');

	const services = (await readdir(servicesFolderPath)).filter(x => !PrivateServices.includes(x));
	const exportTemplate = `export { default as {serviceName} } from './{serviceFileName}';`;

	let content = await readFile(path.resolve(__dirname, 'templates/services-index.tstemplate'), { encoding: 'utf-8' });

	content = content.replace(/{services}/gm, services.map((x) => {
		const serviceFileName = x.replace(/\.ts$/, '');
		const serviceName = `use${serviceFileName.replace(/Service$/, '')}`;
		return exportTemplate
			.replace(/{serviceName}/gm, serviceName)
			.replace(/{serviceFileName}/gm, serviceFileName);
	}).join('\n'));

	if (options.dryRun) {
		note(`🥨 --> Orion would write following content in ${servicesFolderRelativePath}/index.ts`);
		log.message(content);
	} else {
		await writeFile(path.resolve(servicesFolderPath, 'index.ts'), content, { encoding: 'utf-8' });
		log.success(`🥨 --> Orion created ${servicesFolderRelativePath}/index.ts`);
	}
};

