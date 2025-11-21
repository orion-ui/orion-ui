const fs = require('fs-extra');
const path = require('path');
const { log } = require('@clack/prompts');
const { exec } = require('child_process');

// path the the `vue-tsc` binary in `node_modules`
const vueTscPath = path.resolve('node_modules/.bin/vue-tsc');
const rootPath = path.resolve(__dirname, '../..');
const outputDir = path.resolve(rootPath, 'dist/types');
const buildLibTsConfigPath = path.resolve(rootPath, 'tsconfig.build-lib.json');
const lessImportRegex = /^import .+.less.+\n/gm;

module.exports = async () => {
	const factory = new TypesDeclarationFilesFactory();
	await factory.buildFiles();
	await factory.copyFiles();
	await factory.cleanLessImports();
};


class TypesDeclarationFilesFactory {

	executeCommand (command) {
		return new Promise((resolve, reject) => {
			exec(command, (error, stdout, stderr) => {
				/* if (stdout) {
					console.log(`stdout: ${stdout}`);
				}
				if (stderr) {
					console.error(`stderr: ${stderr}`);
				}
				if (error) {
					reject(`Erreur : ${error.message}`);
					return;
				} */
				resolve(stdout);
			});
		});
	}

	async buildFiles () {
		try {
			await fs.rm(outputDir, {
				recursive: true,
				force: true,
			});

			const vueTscCommand = `"${vueTscPath}" --project "${buildLibTsConfigPath}" --declaration --emitDeclarationOnly`;

			// Exécuter la commande vue-tsc et attendre la fin
			log.step('Generating declaration files...');
			await this.executeCommand(vueTscCommand);
			log.step('Declaration files generated with success !');

		} catch (error) {
			// eslint-disable-next-line no-console
			console.error(error);
		}
	}

	async cleanLessImports () {
		const packagesFiles = await fs.readdir(path.resolve(rootPath, 'dist/types/packages'), { recursive: true });

		for (const sourceFile of packagesFiles) {
			if (sourceFile.includes('.vue')) {
				const filePath = path.resolve(rootPath, 'dist/types/packages/' + sourceFile);
				let content = fs.readFileSync(filePath, 'utf8');

				content = content
					.replace(lessImportRegex, '')
					.replace(/__VLS_PrettifyLocal<any & /gm, '__VLS_PrettifyLocal<');

				await fs.writeFile(filePath, content, 'utf8');
			}
		}
	}

	async copyFiles () {

		await fs.move(path.resolve(rootPath, 'dist/packages'), path.resolve(rootPath, 'dist/types/packages'));
		await fs.move(path.resolve(rootPath, 'dist/services'), path.resolve(rootPath, 'dist/types/services'));
		await fs.move(path.resolve(rootPath, 'dist/lang'), path.resolve(rootPath, 'dist/types/lang'));
		await fs.move(path.resolve(rootPath, 'dist/utils'), path.resolve(rootPath, 'dist/types/utils'));
		await fs.move(path.resolve(rootPath, 'dist/lib'), path.resolve(rootPath, 'dist/types/lib'));
		await fs.move(path.resolve(rootPath, 'dist/assets/fonts/materialIcons.d.ts'), path.resolve(rootPath, 'dist/types/assets/fonts/materialIcons.d.ts'));

		// Change import in global.d.ts
		const filePath = path.resolve(rootPath, 'dist/types/lib/index.d.ts');
		let content = fs.readFileSync(filePath, 'utf8');
		if ((content.includes('lib/global'))) {
			content = content.replace('<reference types="lib/global" />', '<reference types="./global" />');
		} else {
			content = `/// <reference types="./global" />\n` + content;
		}

		await fs.writeFile(filePath, content, 'utf8');

	}

}
