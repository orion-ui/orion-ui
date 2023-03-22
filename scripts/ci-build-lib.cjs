#!/usr/bin/env node

(async () => {
	await require('./private/create-types-declaration-files.cjs')({ dist: true });
	await require('./private/copy-files.cjs')({
		less: true,
		cli: true,
		dts: true,
	});
})();

