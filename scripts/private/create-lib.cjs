/**
 * @typedef {object} Options
 * @property {boolean} [dryRun]
 * @property {boolean} [verbose]
 * @property {boolean} [inOrion]
 * @property {boolean} [dist]
 */

module.exports = async (/** @type {Options} */ options) => {
	await require('./create-types-declaration-files.cjs')(options);
	await require('./copy-files.cjs')({
		...options,
		less: true,
		cli: true,
		dts: true,
	});
};

