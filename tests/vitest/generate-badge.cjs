#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

/**
 * Generate a coverage badge SVG file
 * @param {number} coverage - Coverage percentage (0-100)
 * @param {string} outputPath - Output path for the SVG file
 */
function generateCoverageBadge (coverage, outputPath) {
	let color;
	if (coverage >= 90) {
		color = '#4c1';
	} else if (coverage >= 80) {
		color = '#dfb317';
	} else if (coverage >= 70) {
		color = '#fe7d37';
	} else {
		color = '#e05d44';
	}

	const svg = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="104" height="20" role="img" aria-label="coverage: ${coverage}%">
	<title>coverage: ${coverage}%</title>
	<linearGradient id="s" x2="0" y2="100%">
		<stop offset="0" stop-color="#bbb" stop-opacity=".1"/>
		<stop offset="1" stop-opacity=".1"/>
	</linearGradient>
	<clipPath id="r">
		<rect width="104" height="20" rx="3" fill="#fff"/>
	</clipPath>
	<g clip-path="url(#r)">
		<rect width="61" height="20" fill="#555"/>
		<rect x="61" width="43" height="20" fill="${color}"/>
		<rect width="104" height="20" fill="url(#s)"/>
	</g>
	<g fill="#fff" text-anchor="middle" font-family="Verdana,Geneva,DejaVu Sans,sans-serif" text-rendering="geometricPrecision" font-size="110">
		<text aria-hidden="true" x="315" y="150" fill="#010101" fill-opacity=".3" transform="scale(.1)" textLength="510">coverage</text>
		<text x="315" y="140" transform="scale(.1)" fill="#fff" textLength="510">coverage</text>
		<text aria-hidden="true" x="815" y="150" fill="#010101" fill-opacity=".3" transform="scale(.1)" textLength="330">${coverage}%</text>
		<text x="815" y="140" transform="scale(.1)" fill="#fff" textLength="330">${coverage}%</text>
	</g>
</svg>`;

	// Create the output directory if it doesn't exist
	const outputDir = path.dirname(outputPath);
	if (!fs.existsSync(outputDir)) {
		fs.mkdirSync(outputDir, { recursive: true });
	}

	// Write the SVG file
	fs.writeFileSync(outputPath, svg, 'utf8');
	console.log(`✅ Coverage badge generated: ${outputPath} (${coverage}%)`);
}

/**
 * Read the coverage-summary.json file and extract line coverage percentage
 * @param {string} summaryPath - Path to coverage-summary.json file
 * @returns {number} Line coverage percentage
 */
function getCoverageFromSummary (summaryPath) {
	try {
		const summaryData = JSON.parse(fs.readFileSync(summaryPath, 'utf8'));
		const totalCoverage = summaryData.total;

		const linesCoverage = totalCoverage.lines.pct;

		if (linesCoverage === 'Unknown' || isNaN(linesCoverage)) {
			return 0;
		}

		return Math.round(linesCoverage);
	} catch (error) {
		console.error(`❌ Can't read coverage file:`, error.message);
		process.exit(1);
	}
}

function main () {
	const summaryPath = process.argv[2] || './coverage/coverage-summary.json';
	const outputPath = process.argv[3] || './coverage/badge.svg';

	if (!fs.existsSync(summaryPath)) {
		console.error(`❌ Can't find coverage file: ${summaryPath}`);
		console.log('💡 Usage: node generate-badge.js <coverage-summary-path> <output-path>');
		process.exit(1);
	}

	const coverage = getCoverageFromSummary(summaryPath);
	generateCoverageBadge(coverage, outputPath);
}

if (require.main === module) {
	main();
}

module.exports = {
	generateCoverageBadge,
	getCoverageFromSummary,
};
