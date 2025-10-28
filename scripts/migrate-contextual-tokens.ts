// scripts/migrate-contextual-tokens.ts
import fs from 'node:fs';
import path from 'node:path';

/** ----- Réglages ----- */
const ROOTS = process.argv.slice(2).length
	? process.argv.slice(2)
	: ['packages'];

type Channel = 'text' | 'background' | 'border';

/** Legacy → famille sémantique */
function familyOf (name: string): string {
	if (name.startsWith('brand')) return 'primary';
	if (name.startsWith('pink')) return 'secondary';
	if (name.startsWith('grey')) return 'neutral';
	if (name.startsWith('info')) return 'info';
	if (name.startsWith('success')) return 'success';
	if (name.startsWith('warning')) return 'warning';
	if (name.startsWith('danger')) return 'error';
	return 'neutral';
}

/** Shade legacy → state sémantique par canal */
function stateOf (name: string, channel: Channel): string {
	// détache suffixes: -light, -lighter, -dark, -alt
	const light = /-light$/.test(name);
	const lighter = /-lighter$/.test(name);
	const dark = /-dark$/.test(name);
	const darker = /-darker$/.test(name);
	const alt = /-alt$/.test(name);

	if (channel === 'background') {
		if (lighter) return 'minimal';
		if (light) return 'subtle';
		if (alt) return 'subtle';
		if (dark) return 'moderate';
		if (darker) return 'highlight';
		return 'default';
	}
	if (channel === 'border') {
		if (lighter) return 'minimal';
		if (light) return 'subtle';
		if (alt) return 'subtle';
		if (dark) return 'default';
		if (darker) return 'default';
		return 'default';
	}
	// channel === "text"
	if (lighter) return 'minimal';
	if (light) return 'subtle';
	if (alt) return 'subtle';
	if (dark) return 'default';
	if (darker) return 'default';
	if (name.startsWith('grey')) return 'subtle';
	return 'default';
}

/** Construit le token sémantique final */
function semanticVar (name: string, channel: Channel): string {
	const fam = familyOf(name);
	const state = stateOf(name, channel);
	if (channel === 'background') return `--background-${fam}-${state}`;
	if (channel === 'border') return `--border-${fam}-${state}`;
	return `--text-${fam}-${state}`;
}

/** ----- Scan & replace ----- */

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
const FILE_EXT = /\.(vue|ts|tsx|js|jsx|less|css|scss|sass|html)$/i;

function walk (dir: string) {
	for (const name of fs.readdirSync(dir)) {
		const p = path.join(dir, name);
		let st: fs.Stats;
		try {
			st = fs.statSync(p);
		} catch {
			continue;
		}
		if (st.isDirectory()) {
			if (!IGNORE_DIRS.has(name)) walk(p);
		} else if (FILE_EXT.test(p)) transform(p);
	}
}

function detectChannel (prop: string): Channel | null {
	prop = prop.toLowerCase();
	if (prop === 'color' || prop === 'fill' || prop === 'stroke') return 'text';
	if (prop.startsWith('background')) return 'background';
	if (prop.startsWith('border') || prop === 'outline') return 'border';
	return null;
}

function transform (file: string) {
	let src = fs.readFileSync(file, 'utf8');
	let changed = false;

	// match lignes CSS/LESS simples:  property: ... var(--xxx) ...
	// capture prop name + le --token legacy (brand|pink|grey|info|success|warning|danger avec suffixe éventuel)
	const re =
		/(^|\s)([a-zA-Z-]+)\s*:\s*([^;]*?)var\(--([a-z0-9-]+)\)([^;]*?);/gim;

	src = src.replace(re, (_full, pre, prop, before, legacy, after) => {
		const channel = detectChannel(prop);
		if (!channel) return _full; // on ne touche pas si propriété non reconnue

		// seulement pour les familles attendues; sinon skip
		if (!/^(brand|pink|grey|info|success|warning|danger)(-|$)/.test(legacy))
			return _full;

		const to = semanticVar(legacy, channel);
		changed = true;
		return `${pre}${prop}: ${before}var(${to})${after};`;
	});

	if (changed) {
		fs.writeFileSync(file, src, 'utf8');
		console.log('✓ migrated ctx', file);
	}
}

for (const r of ROOTS) if (fs.existsSync(r)) walk(r);
