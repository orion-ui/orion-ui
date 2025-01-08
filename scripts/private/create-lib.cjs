/**
 * @typedef {object} Options
 * @property {boolean} [dryRun]
 * @property {boolean} [verbose]
 * @property {boolean} [inOrion]
 * @property {boolean} [dist]
 */

module.exports = async (/** @type {Options} */ options) => {
	await require('./vue-tsc.cjs')();
	await require('./copy-files.cjs')({
		...options,
		less: true,
		cli: true,
		dts: true,
	});
};

