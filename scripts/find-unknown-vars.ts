import fs from 'node:fs';
import path from 'node:path';

const args = process.argv.slice(2);
const roots = args.filter(a => !a.startsWith('--'));
const stylesDirArg = args.find(a => a.startsWith('--styles='));
const stylesDir = stylesDirArg
	? stylesDirArg.split('=')[1]
	: path.join('packages', 'Shared', 'styles');

if (roots.length === 0) roots.push('packages'); // par défaut : tout le monorepo "packages"

function readFileSafe (p: string) {
	try {
		return fs.readFileSync(p, 'utf8');
	} catch {
		return '';
	}
}

const allowed = new Set<string>();
function loadAllowedFromDir (dir: string) {
	if (!fs.existsSync(dir)) return;
	const reDecl = /--([a-zA-Z0-9\-]+)\s*:/g;
	for (const entry of fs.readdirSync(dir)) {
		const p = path.join(dir, entry);
		const s = fs.statSync(p);
		if (s.isDirectory()) loadAllowedFromDir(p);
		else if (p.endsWith('.less') || p.endsWith('.css')) {
			const src = readFileSafe(p);
			for (const m of src.matchAll(reDecl)) allowed.add(m[1]);
		}
	}
}

// Charge toutes les variables déclarées dans /packages/Shared/styles
loadAllowedFromDir(stylesDir);

const used = new Map<string, Set<string>>(); // var -> fichiers
function scan (dir: string) {
	for (const entry of fs.readdirSync(dir)) {
		const p = path.join(dir, entry);
		const s = fs.statSync(p);
		if (s.isDirectory()) scan(p);
		else if (/\.(vue|ts|tsx|js|jsx|less|css)$/.test(p)) {
			const txt = readFileSafe(p);
			for (const m of txt.matchAll(/var\(--([a-zA-Z0-9\-]+)\)/g)) {
				const v = m[1];
				if (!used.has(v)) used.set(v, new Set());
				used.get(v)!.add(p);
			}
		}
	}
}

for (const r of roots) if (fs.existsSync(r)) scan(r);

const unknown = [...used.keys()].filter(v => !allowed.has(v));
if (unknown.length === 0) {
	console.log('✓ aucune variable inconnue');
} else {
	console.log('Variables inconnues (à mapper ou aliaser) :');
	for (const v of unknown) {
		console.log('-', v);
		for (const f of used.get(v)!) console.log('   •', f);
	}
}
