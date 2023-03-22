/* eslint-disable no-console */
const pico = require('picocolors');
const path = require('path');
const { readFileSync, readdirSync, writeFileSync } = require('fs');
const { capitalize } = require('radash');
const { prompt } = require('enquirer');


/**
 * @typedef {object} Options
 * @property {boolean} [dryRun]
 * @property {boolean} [verbose]
 * @property {boolean} inOrion
 *
 * @property {string} [output]
 */

module.exports = async (/** @type {Options} */ options) => {
	/** @type {{prefix: string}} */
	const res = await prompt({
		type: 'input',
		name: 'prefix',
		required: true,
		message: `Enter the prefix for Orion components`,
		initial: 'o',
		validate: (value) => {
			if (!value.trim().length)
				return `You need to specify a prefix`;

			if (!/^[a-z]+$/.test(value))
				return `Only lower case letters (/^[a-z]+$)`;

			return true;
		},
	});

	const prefix = capitalize(res.prefix);

	const outputPath = path.resolve(
		process.cwd(),
		options.inOrion
			? 'sandbox'
			: 'src',
		'orion-volar.d.ts',
	);
	const relativePath = outputPath.replace(process.cwd(), '');
	const packagesFolderPath = options.inOrion
		? path.resolve(__dirname, '../../packages')
		: path.resolve(__dirname, '../../types/packages');
	const packages = readdirSync(packagesFolderPath).filter(x => !(/(\.d)?\.ts$/).test(x) && x !== 'Shared');

	let content = readFileSync(path.resolve(__dirname, 'templates/volar.d.tstemplate'), { encoding: 'utf-8' });

	content = content.replace(/{types}/gm, packages.map((x) => {
		if (options.inOrion) {
			return `${prefix}${x}: typeof import('packages/index')['Orion${x}'];`;
		} else {
			return `${prefix}${x}: typeof import('@orion.ui/orion/dist/types/packages')['Orion${x}'];`;
		}
	}).join('\n\t\t'));

	if (options.dryRun) {
		console.log(pico.yellow(`🥨 --> Orion would write following content in ${relativePath}`));
		console.log();
		console.log(content);
	} else {
		writeFileSync(outputPath, content, { encoding: 'utf-8' });
		console.log(pico.yellow(`🥨 --> Successfully created ${relativePath}`));
	}
};
