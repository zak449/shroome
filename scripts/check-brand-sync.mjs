#!/usr/bin/env node
// ─────────────────────────────────────────────────────────────────────────────
// check-brand-sync.mjs — verifies the CSS token mirror in app/globals.css
// matches the source of truth in app/lib/brand.ts.
//
// Usage: node scripts/check-brand-sync.mjs   (exit 0 = in sync)
// Run after any brand token change (see Brand/reskin-runbook.md).
// ─────────────────────────────────────────────────────────────────────────────
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const brandTs = readFileSync(join(root, "app/lib/brand.ts"), "utf8");
const css = readFileSync(join(root, "app/globals.css"), "utf8");

// camelCase token -> kebab-case CSS var suffix
const kebab = (s) => s.replace(/[A-Z]/g, (c) => "-" + c.toLowerCase());

// Parse simple `key: "value",` pairs from a named block of brand.ts
function parseBlock(src, blockName) {
  const m = src.match(new RegExp(blockName + ":\\s*{([\\s\\S]*?)\\n  }", ""));
  if (!m) throw new Error(`Could not find "${blockName}" block in brand.ts`);
  const out = {};
  for (const [, k, v] of m[1].matchAll(/^\s*(\w+):\s*"([^"]*)",?\s*$/gm)) out[k] = v;
  return out;
}

function cssVar(name) {
  const m = css.match(new RegExp(`--${name}:\\s*([^;]+);`));
  return m ? m[1].trim() : undefined;
}

const norm = (s) => s.replace(/\s+/g, " ").trim().toLowerCase();

let failures = 0;
function expect(varName, tsValue) {
  const cssValue = cssVar(varName);
  if (cssValue === undefined) {
    console.error(`MISSING  --${varName} not defined in globals.css (brand.ts says "${tsValue}")`);
    failures++;
  } else if (norm(cssValue) !== norm(tsValue)) {
    console.error(`MISMATCH --${varName}: globals.css="${cssValue}" brand.ts="${tsValue}"`);
    failures++;
  }
}

const colors = parseBlock(brandTs, "colors");
for (const [k, v] of Object.entries(colors)) expect(`brand-${kebab(k)}`, v);

const rgb = parseBlock(brandTs, "rgb");
for (const [k, v] of Object.entries(rgb)) expect(`brand-${kebab(k)}-rgb`, v);

// Font stacks (only the three stack tokens have CSS mirrors)
const fontVars = { display: "brand-font-display", body: "brand-font-body", mono: "brand-font-mono" };
const fonts = parseBlock(brandTs, "fonts");
for (const [k, varName] of Object.entries(fontVars)) {
  if (fonts[k]) expect(varName, fonts[k]);
}

if (failures) {
  console.error(`\n${failures} token(s) out of sync between app/lib/brand.ts and app/globals.css.`);
  process.exit(1);
}
console.log("Brand tokens in sync: app/lib/brand.ts ↔ app/globals.css");
