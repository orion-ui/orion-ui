import fs from 'node:fs';
import path from 'node:path';

const args = process.argv.slice(2);
// Dossiers à scanner : si rien passé → on scanne tout le repo "packages"
const roots = args.length ? args : ['packages'];

// Emplacement de ton mapping dans /packages/Shared/styles/
const defaultMapPath = path.join(
	'packages',
	'Shared',
	'styles',
	'mappings.json',
);
const mapPath = process.env.MAP_PATH || defaultMapPath;

if (!fs.existsSync(mapPath)) {
	console.error(`✖ mappings.json introuvable: ${mapPath}`);
	process.exit(1);
}
const map = JSON.parse(fs.readFileSync(mapPath, 'utf8'));

const exts = new Set(['.vue', '.ts', '.tsx', '.js', '.jsx', '.less', '.css']);

function esc (s: string) {
	return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function walk (dir: string) {
	for (const entry of fs.readdirSync(dir)) {
		const p = path.join(dir, entry);
		const s = fs.statSync(p);
		if (s.isDirectory()) walk(p);
		else if (exts.has(path.extname(p))) transform(p);
	}
}

function transform (file: string) {
	let src = fs.readFileSync(file, 'utf8');
	let changed = false;

	// Remplacement var(--old) → var(--new)
	for (const [from, to] of Object.entries(map.CSSVars ?? {})) {
		const re = new RegExp(`var\\(${esc(from as string)}\\)`, 'g');
		if (re.test(src)) {
			src = src.replace(re, `var(${to})`);
			changed = true;
		}
	}

	// Remplacement classes utilitaires (optionnel)
	for (const [from, to] of Object.entries(map.Classes ?? {})) {
		const re = new RegExp(`\\b${esc(from as string)}\\b`, 'g');
		if (re.test(src)) {
			src = src.replace(re, to as string);
			changed = true;
		}
	}

	if (changed) {
		fs.writeFileSync(file, src, 'utf8');
		console.log('✓ migrated', file);
	}
}

// Lance sur tous les roots demandés
for (const r of roots) {
	if (fs.existsSync(r)) walk(r);
}
