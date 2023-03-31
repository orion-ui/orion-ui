#!/usr/bin/env node

(async () => {
	await require('./private/create-lib.cjs')({ dist: true });
})();

