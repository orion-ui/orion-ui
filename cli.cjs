#!/usr/bin/env node

const path = require('path');
const { intro, outro, select, cancel, isCancel, log, note } = require('@clack/prompts');


const optionsAccronym = {
	d: 'dryRun',
	v: 'verbose',
};

const privateScripts = [
	'package',
	'packages',
	'services',
	'types',
	'routes',
	'doc',
	'lib',
];

const publicChoices = [
	{
		value: 'volar',
		label: `Volar Intellisense`,
		hint: `Create .dts file for Volar`,
	},
];

const privateChoices = [
	{
		value: 'package',
		label: `New package`,
		hint: `Scaffold a new package`,
	},
	{
		value: 'packages-index',
		label: `Create packages index`,
		hint: `Create index files for packages export`,
	},
	{
		value: 'services-index',
		label: `Create services index`,
		hint: `Create index files for services export`,
	},
	{
		value: 'routes',
		label: `Create sandbox routes`,
		hint: `Create routes file for the sandbox`,
	},
	{
		value: 'lib',
		label: `Build lib`,
		hint: `Build the lib in local`,
	},
	{
		value: 'doc',
		label: `Create doc's data files`,
		hint: `Create data files for the documentation`,
	},
];


/**
 * @typedef {object} Options
 * @property {boolean} [dryRun]
 * @property {boolean} [verbose]
 * @property {boolean} inOrion
 *
 * @typedef {'volar' | 'package' | 'packages' | 'types' | 'routes' | 'services' | 'doc' | 'lib'} TargetScript
 */

(async () => {
	/** @type {Options} */
	const options = Object.fromEntries(process.argv
		.slice(2)
		.map((x) => {
			const rawArgName = x.split('=')[0];
			const argIsAccronym = /^-\w{1,3}/.test(rawArgName);

			let argName = rawArgName.replace(/--?/, '');

			if (argIsAccronym) {
				if (Object.keys(optionsAccronym).includes(argName)) {
					argName = optionsAccronym[argName];
				} else {
					log.error(`🚨 Unknown option ${rawArgName}`);
				}
			}

			const argValue = x.split('=')[1] ?? true;
			return [argName, argValue];
		}),
	);

	options.inOrion = inOrion();

	if (options.verbose) {
		// eslint-disable-next-line no-console
		console.log(options, '\n');
	}

	try {
		intro(`\n🥨 --> Welcome to Orion CLI`);

		const targetScript = await select({
			message: 'Select what you want to do',
			options: options.inOrion
				? [...publicChoices, ...privateChoices]
				: [...publicChoices],
		});

		if (isCancel(targetScript)) {
			cancel(`Operation cancelled. The choice can be hard...`);
			process.exit(0);
		}

		if (options.verbose) {
			log.message(`targetScript: ${targetScript}`);
		}

		if (privateScripts.includes(targetScript)) {
			privateGuard();
		}

		switch (targetScript) {
		case 'volar':
			await require('./scripts/public/create-volar.cjs')(options);
			break;
		case 'package':
			await require('./scripts/private/create-package.cjs')(options);
			await require('./scripts/private/create-packages-index.cjs')(options);
			await require('./scripts/public/create-volar.cjs')(options);
			break;
		case 'packages-index':
			await require('./scripts/private/create-packages-index.cjs')(options);
			break;
		case 'services-index':
			await require('./scripts/private/create-services-index.cjs')(options);
			break;
		case 'routes':
			await require('./scripts/private/create-routes.cjs')(options);
			break;
		case 'lib':
			await require('./scripts/private/create-lib.cjs')(options);
			break;
		case 'doc':
			await require('./scripts/private/create-doc.cjs')(options);
			break;
		}

	} catch (e) {
		if (e === '__private-guard__') {
			log.error(`🚨 This command can only be executed inside Orion project`);
		} else {
			log.error('Aborted');
			// eslint-disable-next-line no-console
			console.error(e);
			process.exit(0);
		}
	} finally {
		note(`Thank you for using Orion CLI`);
		outro(`🥨 --> See you!`);
	}
})();


function privateGuard () {
	if (!inOrion()) throw '__private-guard__';
}

function inOrion () {
	try {
		const { name: projectName } = require(path.join(process.cwd(), 'package.json'));
		return projectName === '@orion.ui/orion';
	} catch (e) {
		log.error(`🚨 ${e}`);
		log.error(`🚨 Are you in your project root folder ?`);
	}
}
