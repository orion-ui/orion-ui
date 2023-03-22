/* eslint-disable no-console */
const pico = require('picocolors');
const path = require('path');
const { PrivateServices } = require('../scripts-utils.cjs');
const { readFile, readdir, writeFile } = require('fs-extra');

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
		console.log(pico.yellow(`🥨 --> Orion would write following content in ${servicesFolderRelativePath}/index.ts`));
		console.log();
		console.log(content);
	} else {
		await writeFile(path.resolve(servicesFolderPath, 'index.ts'), content, { encoding: 'utf-8' });
		console.log(pico.yellow(`🥨 --> Successfully created ${servicesFolderRelativePath}/index.ts`));
	}
};

