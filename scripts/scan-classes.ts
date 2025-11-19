import fs from 'node:fs';
import path from 'node:path';

const args = process.argv.slice(2);
const roots = args.filter(a => !a.startsWith('--'));
if (roots.length === 0) roots.push('.');
const outArg = args.find(a => a.startsWith('--out='));
const outPath = outArg ? outArg.split('=')[1] : '';

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
const styleExts = new Set(['.css', '.less', '.scss', '.sass']);
const tplExts = new Set(['.vue', '.html', '.jsx', '.tsx', '.js', '.ts']);

const defined = new Map<string, Set<string>>();
const used = new Map<string, Set<string>>();

function add (map: Map<string, Set<string>>, key: string, file: string) {
	if (!map.has(key)) map.set(key, new Set());
	map.get(key)!.add(file);
}

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
			const ext = path.extname(p);
			if (!styleExts.has(ext) && !tplExts.has(ext)) continue;

			let txt = '';
			try {
				txt = fs.readFileSync(p, 'utf8');
			} catch {}

			if (styleExts.has(ext)) {
				for (const m of txt.matchAll(/\.(?!\d)([a-zA-Z0-9_-]+)\s*[{,.:#\s]/g)) {
					const cls = m[1];
					if (cls) add(defined, cls, p);
				}
			}
			if (tplExts.has(ext)) {
				for (const m of txt.matchAll(/\bclass\s*=\s*["']([^"']+)["']/g)) {
					const parts = m[1].split(/\s+/).filter(Boolean);
					for (const cls of parts) add(used, cls, p);
				}
				for (const m of txt.matchAll(/["'`]([a-zA-Z0-9_-]+)["'`]/g)) {
					const token = m[1];
					if (
						/^(btn|o-|text-|bg-|badge|tag|chip|alert|card|tooltip|dropdown|menu|nav|tab)/.test(
							token,
						)
					) {
						add(used, token, p);
					}
				}
			}
		}
	}
}

for (const r of roots) if (fs.existsSync(r)) walk(r);

function toArr (map: Map<string, Set<string>>) {
	return [...map.entries()]
		.map(([name, files]) => ({
			name,
			count: files.size,
			files: [...files].sort(),
		}))
		.sort((a, b) => b.count - a.count || a.name.localeCompare(b.name));
}

const payload = {
	defined: toArr(defined),
	used: toArr(used),
};
const json = JSON.stringify(payload, null, 2);

if (outPath) {
	fs.writeFileSync(outPath, json, 'utf8');
	console.log(
		`✓ ${payload.used.length} classes utilisées, ${payload.defined.length} définies → ${outPath}`,
	);
} else {
	console.log(json);
}
