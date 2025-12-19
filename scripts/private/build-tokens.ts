/* build-tokens.js
 *
 * Input:
 *  - packages/Shared/styles/tokens/primitive/orion.json
 *  - packages/Shared/styles/tokens/semantic/light.json
 *  - packages/Shared/styles/tokens/semantic/dark.json
 *
 * Output:
 *  - packages/Shared/styles/tokens/semantic/tokens-light.less
 *  - packages/Shared/styles/tokens/semantic/tokens-dark.less
 *  - packages/Shared/styles/tokens/primitive/tokens-primitive.less
 *
 * Rules:
 *  - primitives => hard values
 *  - semantic   => only references => var(--o-xxx)
 *  - prefix     => --o-
 *  - numbers stay numbers (no px/rem auto)
 */

import fs from "fs";
import path from "path";

const ROOT = process.cwd();

const TOKENS_ROOT = path.join(ROOT, "packages", "Shared", "styles", "tokens");
const INPUT = {
  primitive: path.join(TOKENS_ROOT, "primitive", "orion.json"),
  semanticLight: path.join(TOKENS_ROOT, "semantic", "light.json"),
  semanticDark: path.join(TOKENS_ROOT, "semantic", "dark.json"),
};

const OUTPUT = {
  semanticLight: path.join(TOKENS_ROOT, "semantic", "tokens-light.less"),
  semanticDark: path.join(TOKENS_ROOT, "semantic", "tokens-dark.less"),
  primitive: path.join(TOKENS_ROOT, "primitive", "tokens.less"),
};

const PREFIX = "--o-";
/** ---------- Helpers ---------- */

function ensureDir(dirPath: string) {
  fs.mkdirSync(dirPath, { recursive: true });
}

function readJson(filePath: string) {
  const raw = fs.readFileSync(filePath, "utf8");
  return JSON.parse(raw);
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return !!value && typeof value === "object";
}

// Tokens Studio peut produire du DTCG: { "$value": ..., "$type": ... }
// ou d'anciens formats. On gère les deux.
function isTokenLeaf(node: unknown) {
  if (!isRecord(node)) return false;
  if (Object.prototype.hasOwnProperty.call(node, "$value")) return true;
  // fallback: leaf primitive direct
  if (!Object.prototype.hasOwnProperty.call(node, "value")) return false;
  const value = node.value;
  return typeof value === "string" || typeof value === "number";
  return false;
}

function getTokenValue(node: unknown) {
  if (isRecord(node)) {
    if (Object.prototype.hasOwnProperty.call(node, "$value")) return node.$value;
    if (Object.prototype.hasOwnProperty.call(node, "value")) return node.value;
  }
  return node;
}

function normalizePathParts(parts: unknown[]) {
  return parts
    .filter(Boolean)
    .map((p) => String(p).trim())
    .filter((p) => p.length > 0);
}

function pathPartsToCssVar(parts: unknown[]) {
  const clean = normalizePathParts(parts);
  // Ex: ["colors","primary","500"] => --o-colors-primary-500
  return `${PREFIX}${clean.join("-")}`.replace(/\s+/g, "-");
}

// Convert "{colors/primary/500}" OR "{colors.primary.500}" to "var(--o-colors-primary-500)"
function convertReferenceToCssVar(ref: string) {
  // strip { }
  const inner = ref.trim().replace(/^\{/, "").replace(/\}$/, "").trim();
  const parts = inner.includes("/") ? inner.split("/") : inner.split(".");
  const cssVar = pathPartsToCssVar(parts);
  return `var(${cssVar})`;
}

function stringifyCssValue(value: unknown) {
  // semantic reference => var(--o-...)
  if (typeof value === "string") {
    const v = value.trim();

    // DTCG reference
    if (/^\{.+\}$/.test(v)) {
      return convertReferenceToCssVar(v);
    }

    // string literal (ex font name)
    // On quote seulement si ça ressemble à une font-family sans guillemets
    if (/[A-Za-z]/.test(v) && !/^["'].*["']$/.test(v) && v.includes(" ")) {
      return `"${v}"`;
    }

    return v;
  }

  // number stays number
  if (typeof value === "number") return String(value);

  // boolean/null fallback
  if (value === null) return "null";
  if (typeof value === "boolean") return value ? "true" : "false";

  // arrays/objects fallback
  return JSON.stringify(value);
}

function collectLeaves(obj: unknown, basePath: string[] = [], out: { path: string[]; value: unknown }[] = []) {
  if (!obj || typeof obj !== "object") return out;

  if (isTokenLeaf(obj)) {
    out.push({ path: basePath, value: getTokenValue(obj) });
    return out;
  }

  for (const [key, val] of Object.entries(obj)) {
    // ignore meta keys
    if (key === "$type" || key === "$description" || key === "$extensions") continue;
    collectLeaves(val, [...basePath, key], out);
  }

  return out;
}

function buildCssVarsBlock(
  leaves: { path: string[]; value: unknown }[],
  indent: string = "  "
) {
  // sort for stable output
  const sorted = [...leaves].sort((a, b) => a.path.join("/").localeCompare(b.path.join("/")));
  const lines = [];
  for (const item of sorted) {
    const cssVar = pathPartsToCssVar(item.path);
    const cssValue = stringifyCssValue(item.value);
    lines.push(`${indent}${cssVar}: ${cssValue};`);
  }
  return lines.join("\n");
}

function wrapBlock(selector: string, content: string) {
  return `${selector} {\n${content}\n}\n`;
}

/** ---------- Build ---------- */

function main() {
  ensureDir(path.dirname(OUTPUT.semanticLight));
  ensureDir(path.dirname(OUTPUT.semanticDark));
  ensureDir(path.dirname(OUTPUT.primitive));

  const primitive = readJson(INPUT.primitive);
  const semanticLight = readJson(INPUT.semanticLight);
  const semanticDark = readJson(INPUT.semanticDark);

  // collect leaves
  const primitiveLeaves = collectLeaves(primitive, []);
  const semanticLightLeaves = collectLeaves(semanticLight, []);
  const semanticDarkLeaves = collectLeaves(semanticDark, []);

  // Build primitive file: primitives in :root
  const primitiveRoot = [
    "/* AUTO-GENERATED - DO NOT EDIT */",
    "/* Source: tokens/primitive/orion.json */",
    "",
    wrapBlock(
      ":root",
      [
        buildCssVarsBlock(primitiveLeaves, "  "),
      ].join("\n")
    ),
  ].join("\n");

  // Build light file: semantic light in :root
  const lightRoot = [
    "/* AUTO-GENERATED - DO NOT EDIT */",
    "/* Source: tokens/semantic/light.json */",
    "",
    wrapBlock(
      ":root",
      [
        buildCssVarsBlock(semanticLightLeaves, "  "),
      ].join("\n")
    ),
  ].join("\n");

  // Build dark file: semantic dark in :root
  const darkRoot = [
    "/* AUTO-GENERATED - DO NOT EDIT */",
    "/* Source: tokens/semantic/dark.json */",
    "",
    wrapBlock(
      ":root",
      [
        buildCssVarsBlock(semanticDarkLeaves, "  "),
      ].join("\n")
    ),
  ].join("\n");

  fs.writeFileSync(OUTPUT.primitive, primitiveRoot, "utf8");
  fs.writeFileSync(OUTPUT.semanticLight, lightRoot, "utf8");
  fs.writeFileSync(OUTPUT.semanticDark, darkRoot, "utf8");

  console.log("Generated:");
  console.log(" -", path.relative(ROOT, OUTPUT.primitive));
  console.log(" -", path.relative(ROOT, OUTPUT.semanticLight));
  console.log(" -", path.relative(ROOT, OUTPUT.semanticDark));
}

main();


