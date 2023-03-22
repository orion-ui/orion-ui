#!/usr/bin/env node

/* eslint-disable no-console */
const { prompt } = require('enquirer');
const path = require('path');


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
		name: 'volar',
		message: 'volar     - Create .dts file for Volar',
	},
];

const privateChoices = [
	{
		name: 'package',
		message: 'package   - Scaffold a new package',
	},
	{
		name: 'packages',
		message: 'packages  - Create index files for packages export',
	},
	{
		name: 'services',
		message: 'services  - Create index files for services export',
	},
	{
		name: 'routes',
		message: 'routes    - Create routes file for the sandbox',
	},
	{
		name: 'doc',
		message: 'doc       - Create data files for the documentation',
	},
	{
		name: 'lib',
		message: 'lib       - Build the lib',
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
					console.log(`🚨 Unknown option ${rawArgName}`);
				}
			}

			const argValue = x.split('=')[1] ?? true;
			return [argName, argValue];
		}),
	);

	options.inOrion = inOrion();

	if (options.verbose) {
		console.log(options);
		console.log();
	}

	try {
		/** @type {{ targetScript: TargetScript }} */
		const res = await prompt({
			type: 'select',
			name: 'targetScript',
			message: 'Select what you want to do',
			choices: options.inOrion
				? [...publicChoices, ...privateChoices]
				: [...publicChoices],
		});

		const { targetScript } = res;

		if (options.verbose) {
			console.log({ targetScript });
		}

		if (privateScripts.includes(targetScript)) {
			privateGuard();
		}

		switch (targetScript) {
		case 'doc':
			await require('./scripts/private/create-doc.cjs')(options);
			break;
		case 'lib':
			await require('./scripts/ci-build-lib.cjs');
			break;
		case 'package':
			await require('./scripts/private/create-package.cjs')(options);
			await require('./scripts/private/create-packages-index.cjs')(options);
			await require('./scripts/public/create-volar.cjs')(options);
			break;
		case 'packages':
			await require('./scripts/private/create-packages-index.cjs')(options);
			break;
		case 'services':
			await require('./scripts/private/create-services-index.cjs')(options);
			break;
		case 'routes':
			await require('./scripts/private/create-routes.cjs')(options);
			break;
		case 'volar':
			await require('./scripts/public/create-volar.cjs')(options);
			break;
		}

	} catch (e) {
		if (e === '__private-guard__') {
			console.log(`🚨 This command can only be executed inside Orion project`);
		} else {
			console.log('Aborted');
			console.log(e);
		}
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
		console.log(`🚨 ${e}`);
		console.log(`🚨 Are you in your project root folder ?`);
		console.log();
	}
}
