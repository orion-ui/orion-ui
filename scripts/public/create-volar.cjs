const path = require('path');
const { text, log, note } = require('@clack/prompts');
const { readFileSync, readdirSync, writeFileSync } = require('fs');
const { capitalize } = require('radash');


/**
 * @typedef {object} Options
 * @property {boolean} [dryRun]
 * @property {boolean} [verbose]
 * @property {boolean} inOrion
 *
 * @property {string} [output]
 */

module.exports = async (/** @type {Options} */ options) => {
	const promptedPrefix = await text({
		message: 'Enter the prefix for Orion components?',
		placeholder: 'Need 1 letter min.',
		initialValue: 'o',
		validate (value) {
			if (value.length === 0) return `Value is required!`;
		},
	});

	const prefix = capitalize(promptedPrefix.toString());

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
		note(`🥨 --> Orion would write following content in ${relativePath}`);
		log.message(content);
	} else {
		writeFileSync(outputPath, content, { encoding: 'utf-8' });
		log.success(`🥨 --> Orion created ${relativePath}`);
	}
};
