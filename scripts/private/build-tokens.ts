// scripts/private/build-tokens.ts
import fs from 'fs';
import path from 'path';

const rootDir = process.cwd();

const paths = {
	primitive: path.join(
		rootDir,
		'packages/Shared/styles/tokens/primitive/orion.json',
	),
	light: path.join(
		rootDir,
		'packages/Shared/styles/tokens/semantic/light.json',
	),
	dark: path.join(rootDir, 'packages/Shared/styles/tokens/semantic/dark.json'),
	outDir: path.join(rootDir, 'packages/Shared/styles/tokens/generated'),
};

if (!fs.existsSync(paths.outDir)) {
	fs.mkdirSync(paths.outDir, { recursive: true });
}

// ---------- utils ----------

function readJson (p: string): any {
	return JSON.parse(fs.readFileSync(p, 'utf8'));
}

function getByPath (obj: any, pathStr: string): any {
	const parts = pathStr.split('.');
	let current = obj;
	for (const part of parts) {
		if (current == null) return undefined;
		current = current[part];
	}
	return current;
}

function isAlias (v: unknown): v is string {
	return typeof v === 'string' && v.startsWith('{') && v.endsWith('}');
}

function stripBraces (v: string) {
	return v.slice(1, -1);
}

function resolveValue (rawValue: any, primitive: any): any {
	if (!isAlias(rawValue)) return rawValue;

	const pathStr = stripBraces(rawValue); // ex: "colors.primary.500"
	const node = getByPath(primitive, pathStr);

	if (!node) {
		console.warn('⚠️ Alias non résolu :', rawValue);
		return rawValue;
	}

	const inner = (node as any).$value ?? node;
	return isAlias(inner) ? resolveValue(inner, primitive) : inner;
}

type FlatToken = {
	type: string | undefined;
	value: any;
};

function flattenTokens (
	obj: any,
	prefix: string[] = [],
): Record<string, FlatToken> {
	const out: Record<string, FlatToken> = {};

	for (const [key, val] of Object.entries(obj)) {
		if (
			val &&
			typeof val === 'object' &&
			Object.prototype.hasOwnProperty.call(val, '$value')
		) {
			const tokenName = [...prefix, key].join('.');
			out[tokenName] = {
				type: (val as any).$type,
				value: (val as any).$value,
			};
		} else if (val && typeof val === 'object') {
			Object.assign(out, flattenTokens(val, [...prefix, key]));
		}
	}

	return out;
}

function tokenNameToCssVar (name: string): string {
	return (
		'--' +
		name
			.replace(/\./g, '-')
			.replace(/([a-z0-9])([A-Z])/g, '$1-$2')
			.toLowerCase()
	);
}

// ici tu pourras raffiner selon type (px, %, etc.)
function toCssValue (type: string | undefined, value: any): string {
	if (type === 'color') return String(value);
	if (type === 'number') return String(value);
	return String(value);
}

function buildLessForTheme (
	themeName: 'light' | 'dark',
	semanticTokens: any,
	primitiveTokens: any,
): string {
	const flat = flattenTokens(semanticTokens);
	let css = `:root[data-theme="${themeName}"] {\n`;

	for (const [name, meta] of Object.entries(flat)) {
		const { type, value } = meta as FlatToken;
		const resolved = resolveValue(value, primitiveTokens);
		const cssVar = tokenNameToCssVar(name);
		const cssValue = toCssValue(type, resolved);
		css += `  ${cssVar}: ${cssValue};\n`;
	}

	css += '}\n';
	return css;
}

// ---------- main ----------

function main () {
	const primitive = readJson(paths.primitive);
	const light = readJson(paths.light);
	const dark = readJson(paths.dark);

	const lightLess = buildLessForTheme('light', light, primitive);
	const darkLess = buildLessForTheme('dark', dark, primitive);

	fs.writeFileSync(
		path.join(paths.outDir, 'tokens-light.less'),
		lightLess,
		'utf8',
	);
	fs.writeFileSync(
		path.join(paths.outDir, 'tokens-dark.less'),
		darkLess,
		'utf8',
	);

	console.log('✅ tokens-light.less & tokens-dark.less générés.');
}

main();
