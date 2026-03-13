/* build-tokens.js
 *
 * Input:
 *  - packages/Shared/styles/tokens/primitive/orion.json
 *  - packages/Shared/styles/tokens/semantic/light.json
 *  - packages/Shared/styles/tokens/semantic/dark.json
 *
 * Output:
 *  - packages/Shared/styles/tokens/semantic/tokens.less
 *  - packages/Shared/styles/tokens/semantic/tokens-light.less
 *  - packages/Shared/styles/tokens/semantic/tokens-dark.less
 *  - packages/Shared/styles/tokens/primitive/tokens.less
 *
 * Rules:
 *  - primitives => hard values
 *  - semantic   => only references => var(--o-xxx)
 *  - prefix     => --o-
 */

import fs from 'fs';
import path from 'path';

const ROOT = process.cwd();

const TOKENS_ROOT = path.join(ROOT, 'packages', 'Shared', 'styles', 'tokens');
const INPUT = {
	primitive: path.join(TOKENS_ROOT, 'primitive', 'orion.json'),
	semanticLight: path.join(TOKENS_ROOT, 'semantic', 'light.json'),
	semanticDark: path.join(TOKENS_ROOT, 'semantic', 'dark.json'),
};

const OUTPUT = {
	semantic: path.join(TOKENS_ROOT, 'semantic', 'tokens.less'),
	semanticLight: path.join(TOKENS_ROOT, 'semantic', 'tokens-light.less'),
	semanticDark: path.join(TOKENS_ROOT, 'semantic', 'tokens-dark.less'),
	primitive: path.join(TOKENS_ROOT, 'primitive', 'tokens.less'),
};

const PREFIX = '--o-';

// Ensure output folders exist before writing files.
function ensureDir (dirPath: string) {
	fs.mkdirSync(dirPath, { recursive: true });
}

// Read a JSON token file from disk.
function readJson (filePath: string) {
	const raw = fs.readFileSync(filePath, 'utf8');
	return JSON.parse(raw);
}

function isRecord (value: unknown): value is Record<string, unknown> {
	return !!value && typeof value === 'object';
}

// Detect a leaf token object with a usable value.
function isTokenLeaf (node: unknown) {
	if (!isRecord(node)) return false;
	if (Object.prototype.hasOwnProperty.call(node, '$value')) return true;
	if (!Object.prototype.hasOwnProperty.call(node, 'value')) return false;
	const value = node.value;
	return typeof value === 'string' || typeof value === 'number';
}

// Normalize token nodes that can store values under "$value" or "value".
function getTokenValue (node: unknown) {
	if (isRecord(node)) {
		if (Object.prototype.hasOwnProperty.call(node, '$value')) return node.$value;
		if (Object.prototype.hasOwnProperty.call(node, 'value')) return node.value;
	}
	return node;
}

function getTokenType (node: unknown) {
	if (isRecord(node)) {
		if (Object.prototype.hasOwnProperty.call(node, '$type')) return String(node.$type);
		if (Object.prototype.hasOwnProperty.call(node, 'type')) return String(node.type);
	}
	return undefined;
}

function toKebabCase (value: string) {
	return value
		.replace(/([a-z0-9])([A-Z])/g, '$1-$2')
		.replace(/\s+/g, '-')
		.toLowerCase();
}

function normalizePathParts (parts: unknown[]) {
	return parts
		.filter(Boolean)
		.map(p => String(p).trim())
		.filter(p => p.length > 0)
		.map(p => toKebabCase(p));
}

// Convert a token path array into a CSS variable name.
function pathPartsToCssVar (parts: unknown[]) {
	const clean = normalizePathParts(parts);
	return `${PREFIX}${clean.join('-')}`;
}

const NO_PX_UNIT_SUFFIXES = ['-weight', '-opacity', '-z-index'];
const REM_BASE = 16;

function isRemToken (pathParts: string[]) {
	if (pathParts.length < 1) return false;
	const [group, scale] = pathParts;
	if (group === 'radius' || group === 'sizing' || group === 'spacing') return true;
	return pathParts.length >= 2 && group === 'typography' && (scale === 'size' || scale === 'lineHeight');
}

function isEmToken (pathParts: string[]) {
	if (pathParts.length < 2) return false;
	const [group, scale] = pathParts;
	return group === 'typography' && scale === 'letterSpacing';
}

function formatNumber (value: number, decimals: number = 4) {
	return value.toFixed(decimals).replace(/\.?0+$/, '');
}

function applyUnits (cssVar: string, value: unknown, cssValue: string, pathParts: string[]) {
	if (typeof value !== 'number') return cssValue;
	if (NO_PX_UNIT_SUFFIXES.some(suffix => cssVar.includes(suffix))) return String(value);
	if (isEmToken(pathParts)) return `${formatNumber(value / REM_BASE)}em`;
	if (isRemToken(pathParts)) return `${formatNumber(value / REM_BASE)}rem`;
	return `${value}px`;
}

// Turn a token reference "{path.to.token}" into var(--o-...).
function convertReferenceToCssVar (ref: string) {
	const inner = ref.trim().replace(/^\{/, '').replace(/\}$/, '').trim();
	const parts = inner.includes('/') ? inner.split('/') : inner.split('.');
	const cssVar = pathPartsToCssVar(parts);
	const value = `var(${cssVar})`;
	return value;
}

// Convert raw token values to CSS-safe strings.
function stringifyCssValue (value: unknown) {
	if (typeof value === 'string') {
		const v = value.trim();

		if (/^\{.+\}$/.test(v)) {
			return convertReferenceToCssVar(v);
		}

		if (/^[a-z-]+\(.+\)$/i.test(v)) {
			return v;
		}

		if (/[A-Za-z]/.test(v) && !/^["'].*["']$/.test(v) && v.includes(' ')) {
			return `"${v}"`;
		}

		return v;
	}

	if (typeof value === 'number') return String(value);

	if (value === null) return 'null';
	if (typeof value === 'boolean') return value ? 'true' : 'false';

	return JSON.stringify(value);
}

function isBoxShadowType (type?: string) {
	return (type || '').toLowerCase() === 'boxshadow';
}

function isGradientType (type?: string) {
	return (type || '').toLowerCase() === 'gradient';
}

function formatShadowNumber (value: number) {
	return `${formatNumber(value, 4)}px`;
}

function formatShadowLength (value: unknown) {
	if (typeof value === 'number') return formatShadowNumber(value);
	if (typeof value === 'string') {
		const v = value.trim();
		if (/^\{.+\}$/.test(v)) return convertReferenceToCssVar(v);
		if (/^-?(?:\d+|\d*\.\d+)$/.test(v)) return `${formatNumber(Number(v), 4)}px`;
		return stringifyCssValue(v);
	}
	return stringifyCssValue(value);
}

function formatShadowColor (value: unknown) {
	if (typeof value === 'string') {
		const v = value.trim();
		if (/^\{.+\}$/.test(v)) return convertReferenceToCssVar(v);
		return v;
	}
	return stringifyCssValue(value);
}

function stringifyBoxShadowLayer (layer: unknown) {
	if (!isRecord(layer)) return stringifyCssValue(layer);

	const type = typeof layer.type === 'string' ? layer.type.toLowerCase() : '';
	const inset = type === 'innershadow' ? 'inset ' : '';

	const x = formatShadowLength(layer.x ?? 0);
	const y = formatShadowLength(layer.y ?? 0);
	const blur = formatShadowLength(layer.blur ?? 0);
	const spread = formatShadowLength(layer.spread ?? 0);
	const color = layer.color !== undefined ? formatShadowColor(layer.color) : '';

	return `${inset}${x} ${y} ${blur} ${spread}${color ? ` ${color}` : ''}`.trim();
}

function stringifyBoxShadowValue (value: unknown) {
	if (typeof value === 'string') return stringifyCssValue(value);
	if (Array.isArray(value)) {
		return value.map(item => stringifyBoxShadowLayer(item)).join(', ');
	}
	if (isRecord(value)) {
		return stringifyBoxShadowLayer(value);
	}
	return stringifyCssValue(value);
}

function formatGradientAngle (value: unknown) {
	if (typeof value === 'number') return `${formatNumber(value, 4)}deg`;
	if (typeof value === 'string') {
		const v = value.trim();
		if (/^\{.+\}$/.test(v)) return convertReferenceToCssVar(v);
		return v;
	}
	return '0deg';
}

function formatGradientPosition (value: unknown) {
	if (typeof value === 'number') {
		const normalized = value >= 0 && value <= 1 ? value * 100 : value;
		return `${formatNumber(normalized, 4)}%`;
	}
	if (typeof value === 'string') {
		const v = value.trim();
		if (/^\{.+\}$/.test(v)) return convertReferenceToCssVar(v);
		return v;
	}
	return '';
}

function formatGradientColor (value: unknown) {
	if (typeof value === 'string') {
		const v = value.trim();
		if (/^\{.+\}$/.test(v)) return convertReferenceToCssVar(v);
		return v;
	}
	return stringifyCssValue(value);
}

function stringifyGradientStop (stop: unknown) {
	if (!isRecord(stop)) return stringifyCssValue(stop);

	const color = stop.color !== undefined ? formatGradientColor(stop.color) : '';
	const position = stop.position !== undefined ? formatGradientPosition(stop.position) : '';

	if (color && position) return `${color} ${position}`.trim();
	return color || position || '';
}

function stringifyGradientValue (value: unknown) {
	if (!isRecord(value)) return stringifyCssValue(value);

	const type = typeof value.type === 'string' ? value.type.toLowerCase() : 'linear';
	const stops = Array.isArray(value.stops)
		? value.stops.map(stop => stringifyGradientStop(stop)).filter(Boolean).join(', ')
		: '';

	if (type === 'linear') {
		const angle = formatGradientAngle(value.rotation ?? 0);
		return `linear-gradient(${[angle, stops].filter(Boolean).join(', ')})`;
	}

	if (type === 'radial') {
		const shape = typeof value.shape === 'string' ? value.shape.trim() : '';
		const position = typeof value.position === 'string' ? value.position.trim() : '';
		const header = [shape, position].filter(Boolean).join(' ');
		return `radial-gradient(${[header, stops].filter(Boolean).join(', ')})`;
	}

	return stringifyCssValue(value);
}

// Walk the token tree and collect all leaf tokens with their paths.
function collectLeaves (
	obj: unknown,
	basePath: string[] = [],
	out: { path: string[], value: unknown, type?: string }[] = [],
) {
	if (!obj || typeof obj !== 'object') return out;

	if (isTokenLeaf(obj)) {
		out.push({
			path: basePath,
			value: getTokenValue(obj),
			type: getTokenType(obj),
		});
		return out;
	}

	for (const [key, val] of Object.entries(obj)) {
		if (key === '$type' || key === '$description' || key === '$extensions') continue;
		collectLeaves(val, [...basePath, key], out);
	}

	return out;
}

// Build the CSS variable declarations for a root block.
function buildCssVarsBlock (
	leaves: { path: string[], value: unknown, type?: string }[],
	indent: string = '	',
) {
	const sorted = [...leaves].sort((a, b) => a.path.join('/').localeCompare(b.path.join('/')));
	const lines = [];
	for (const item of sorted) {
		const cssVar = pathPartsToCssVar(item.path);
		const rawValue = item.value;
		const cssValue = isBoxShadowType(item.type)
			? stringifyBoxShadowValue(rawValue)
			: isGradientType(item.type)
				? stringifyGradientValue(rawValue)
				: stringifyCssValue(rawValue);
		const withUnits = isBoxShadowType(item.type) || isGradientType(item.type)
			? cssValue
			: applyUnits(cssVar, rawValue, cssValue, item.path);
		lines.push(`${indent}${cssVar}: ${withUnits};`);
	}
	return lines.join('\n');
}

function wrapBlock (selector: string, content: string) {
	return `${selector} {\n${content}\n}\n`;
}

// Assemble a full file with header + root selector block.
function buildRootFile (
	selector: string,
	source: string,
	leaves: { path: string[], value: unknown, type?: string }[],
) {
	return [
		'/* AUTO-GENERATED - DO NOT EDIT */',
		'',
		`/* Source: ${source} */`,
		`/* stylelint-disable color-hex-length */`,
		'',
		wrapBlock(selector, buildCssVarsBlock(leaves, '	')),
	].join('\n');
}

/** ---------- Build ---------- */

function main () {
	// Ensure all output dirs exist.
	for (const outputFile of Object.values(OUTPUT)) {
		ensureDir(path.dirname(outputFile));
	}

	// Load source token files.
	const primitive = readJson(INPUT.primitive);
	const semanticLight = readJson(INPUT.semanticLight);
	const semanticDark = readJson(INPUT.semanticDark);

	const isColorLeaf = (leaf: { type?: string }) => (leaf.type || '').toLowerCase() === 'color';
	const semanticLightLeaves = collectLeaves(semanticLight);
	const semanticDarkLeaves = collectLeaves(semanticDark);

	// Define the outputs to generate.
	const files = [
		{
			output: OUTPUT.primitive,
			selector: ':root',
			source: 'tokens/primitive/orion.json',
			leaves: collectLeaves(primitive),
		},
		{
			output: OUTPUT.semantic,
			selector: ':root',
			source: 'tokens/semantic/light.json (non-color)',
			leaves: semanticLightLeaves.filter(leaf => !isColorLeaf(leaf)),
		},
		{
			output: OUTPUT.semanticLight,
			selector: ':root',
			source: 'tokens/semantic/light.json (colors)',
			leaves: semanticLightLeaves.filter(isColorLeaf),
		},
		{
			output: OUTPUT.semanticDark,
			selector: ':root[data-theme="dark"]',
			source: 'tokens/semantic/dark.json (colors)',
			leaves: semanticDarkLeaves.filter(isColorLeaf),
		},
	];

	// Generate each file in a consistent format.
	for (const file of files) {
		fs.writeFileSync(file.output, buildRootFile(file.selector, file.source, file.leaves), 'utf8');
	}

	// eslint-disable-next-line no-console
	console.log('Generated:');
	for (const file of files) {
		// eslint-disable-next-line no-console
		console.log(' -', path.relative(ROOT, file.output));
	}
}

main();
