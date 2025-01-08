const fs = require('fs-extra');
const path = require('path');
const glob = require('fast-glob');
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const {  log } = require('@clack/prompts');
const { exec } = require('child_process');

// path the the `vue-tsc` binary in `node_modules`
const vueTscPath = path.resolve('node_modules/.bin/vue-tsc');
const rootPath = path.resolve(__dirname, '../..');
const outputDir = path.resolve(rootPath, 'dist/types');
const typesPath = path.resolve(rootPath, 'dist/types');
const lessImportRegex = /^import .+.less.+\n/gm;
const options = {}

module.exports = async () => {
	const factory = new TypesDeclarationFilesFactory();
	await factory.buildFiles()
	await factory.copyFiles();
};


class TypesDeclarationFilesFactory {

  config = {
    requiredFiles: [
      'lib/global.d.ts',
      'lib/private.d.ts',
    ],
    dtsFilesNeededForBuild: [
      'shims-env.d.ts',
      'lib/packages.d.ts',
      'lib/global.d.ts',
      'lib/private.d.ts',
      'packages/packages-shims.d.ts',
    ],
    input: [
      'packages/**/*.ts',
      'packages/**/src/*.vue',
      // 'packages/!(Shared)/!(*SetupService).ts',
      'packages/index.ts',
      'lang/**/*.ts',
    ],
    inputDist: [
      'lib/index.ts',
      'assets/fonts/coolicons.ts',
      'utils/Bus.ts',
      'utils/Log.ts',
      'utils/Orion.ts',
      'utils/Validator.ts',
      'utils/tools.ts',
      'utils/mockup.ts',
      'services/**/*.ts',
    ],
  };

  constructor () {

  }

  executeCommand(command) {
    return new Promise((resolve, reject) => {
        exec(command, (error, stdout, stderr) => {
       /*    if (stdout) {
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

  async buildFiles() {
    try {
      await fs.rm(outputDir, { recursive: true, force: true });
      const vueTscCommand = `${vueTscPath} --declaration --emitDeclarationOnly`;

      // Exécuter la commande vue-tsc et attendre la fin
      log.step('Generating declaration files...');
      await this.executeCommand(vueTscCommand);
      log.step('Declaration files generated with success !');

    } catch (error) {
        //console.error(error);
    }
  }

  async copyFiles () {
    
    await fs.move(path.resolve(rootPath, 'dist/packages'), path.resolve(rootPath, 'dist/types/packages'))

    const packagesFiles = await fs.readdir(path.resolve(rootPath, 'dist/types/packages'), {recursive: true, })

    for(const sourceFile of packagesFiles) {
      if(sourceFile.includes('.vue')) {
        const filePath = path.resolve(rootPath, 'dist/types/packages/' + sourceFile)
        let content = fs.readFileSync(filePath, 'utf8');
        content = content.replace(lessImportRegex, '');
        await fs.writeFile(filePath, content, 'utf8');
      }
    }

    await fs.rm(path.resolve(rootPath, 'dist/services/docs'), { recursive: true, force: true });
    await fs.move(path.resolve(rootPath, 'dist/services'), path.resolve(rootPath, 'dist/types/services'))
    await fs.move(path.resolve(rootPath, 'dist/utils'), path.resolve(rootPath, 'dist/types/utils'))
    await fs.move(path.resolve(rootPath, 'dist/lib'), path.resolve(rootPath, 'dist/types/lib'))
    await fs.move(path.resolve(rootPath, 'dist/assets/fonts/coolicons.d.ts'), path.resolve(rootPath, 'dist/types/assets/fonts/coolicons.d.ts'))
  }

}
