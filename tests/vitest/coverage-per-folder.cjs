#!/usr/bin/env node

const fs = require('fs');
const path = require('path');


const coverageFile = path.join(__dirname, "coverage/coverage-summary.json");
const outputFile = path.join(__dirname, "coverage/coverage-per-folder.md");

const summary = JSON.parse(fs.readFileSync(coverageFile, "utf8"));

const folderTotals = {};

for (const [filePath, metrics] of Object.entries(summary)) {
  if (filePath === "total") continue;

  const normalized = filePath.replace(/\\/g, "/"); // support Windows
  const parts = normalized.split("/");

  const idx = parts.findIndex(part =>
    ["services", "lib", "packages", "utils", "assets", "lang"].includes(part)
  );

  if (idx === -1) {
    console.warn("Unknown root folder for:", filePath);
    continue;
  }

  const folder = parts[idx];

  if (!folderTotals[folder]) {
    folderTotals[folder] = { covered: 0, total: 0 };
  }

  const s = metrics.statements;
  folderTotals[folder].covered += s.covered;
  folderTotals[folder].total += s.total;
}

let markdown = "| Folder | Coverage |\n|---------|------------|\n";

for (const folder of Object.keys(folderTotals)) {
  const { covered, total } = folderTotals[folder];
  const pct = total === 0 ? 0 : (covered / total) * 100;
  markdown += `| ${folder} | ${pct.toFixed(2)}% |\n`;
}

fs.writeFileSync(outputFile, markdown);
console.log("🥨 Generated:", outputFile);
