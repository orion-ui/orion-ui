import { readFileSync } from "fs";
import { XMLParser } from "fast-xml-parser";

function formatPercent(value) {
  return `${(parseFloat(value) * 100).toFixed(2)}%`;
}

function extractCoverage(data) {
  if (!data.coverage) {
    throw new Error("Erreur : balise <coverage> non trouvée dans XML");
  }

  const attr = data.coverage;

  const lineRate = attr && attr["line-rate"] ? attr["line-rate"] : "0";
  const branchRate = attr && attr["branch-rate"] ? attr["branch-rate"] : "0";

  return {
    line: lineRate,
    branch: branchRate,
    method: "-", 
  };
}

function printTable(summary) {
  console.log("+---------+--------+--------+--------+");
  console.log("|         | Line   | Branch | Method |");
  console.log("+---------+--------+--------+--------+");
  console.log(
    `| Total   | ${formatPercent(summary.line)} | ${formatPercent(summary.branch)} | ${summary.method}     |`
  );
  console.log(
    `| Average | ${formatPercent(summary.line)} | ${formatPercent(summary.branch)} | ${summary.method}     |`
  );
  console.log("+---------+--------+--------+--------+");
}

function main() {
  const xml = readFileSync(process.argv[2], "utf-8");
  const parser = new XMLParser({
    ignoreAttributes: false, 
    attributeNamePrefix: "", 
  });
  const data = parser.parse(xml);
  const summary = extractCoverage(data);
  printTable(summary);
}

main();
