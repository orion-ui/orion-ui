import fs from 'node:fs';
import path from 'node:path';

const roots = process.argv.slice(2);
if (roots.length === 0) roots.push('.');

const IGNORE_DIRS = new Set([
	'.git',
	'node_modules',
	'dist',
	'build',
	'coverage',
	'.turbo',
	'.next',
	'storybook-static',
]);

const exts = new Set([
	'.vue',
	'.ts',
	'.tsx',
	'.js',
	'.jsx',
	'.css',
	'.less',
	'.scss',
	'.sass',
	'.html',
]);
const used = new Map<string, Set<string>>(); // varName -> files

function walk (dir: string) {
	for (const name of fs.readdirSync(dir)) {
		const p = path.join(dir, name);
		let stat: fs.Stats;
		try {
			stat = fs.statSync(p);
		} catch {
			continue;
		}
		if (stat.isDirectory()) {
			if (IGNORE_DIRS.has(name)) continue;
			walk(p);
		} else {
			if (!exts.has(path.extname(p))) continue;
			let txt = '';
			try {
				txt = fs.readFileSync(p, 'utf8');
			} catch {
				/* ignore */
			}
			const re = /var\(--([a-zA-Z0-9_-]+)\)/g;
			for (const m of txt.matchAll(re)) {
				const v = m[1];
				if (!used.has(v)) used.set(v, new Set());
				used.get(v)!.add(p);
			}
		}
	}
}

for (const r of roots) if (fs.existsSync(r)) walk(r);

const list = [...used.entries()]
	.map(([name, files]) => ({
		name,
		count: files.size,
		files: [...files].sort(),
	}))
	.sort((a, b) => b.count - a.count || a.name.localeCompare(b.name));

console.log(JSON.stringify({
	total: list.length,
	vars: list,
}, null, 2));
