const fs = require('fs-extra');
const path = require('path');

const rootPath = path.resolve(__dirname, '../..');

module.exports = async () => {
	const factory = new GenericComponentsCleaner();
	await factory.cleanGenericComponents();
};


class GenericComponentsCleaner {

	async cleanGenericComponents () {
		// example : declare const _default: <T extends Record<string, any>, O extends Record<string, any>>
		const genericComponentRegex = /declare const _default: <(?<generic>.*)>\(__VLS_props/;

		const packagesFiles = await fs.readdir(path.resolve(rootPath, 'dist/types/packages'), { recursive: true });

		for await (const sourceFile of packagesFiles) {
			if (sourceFile.includes('.vue')) {
				const filePath = path.resolve(rootPath, 'dist/types/packages/' + sourceFile);
				let content = fs.readFileSync(filePath, 'utf8');

				if (genericComponentRegex.test(content)) {
					const packageName = `${sourceFile}`.split('/').slice(-1)[0].replace('.vue.d.ts', '');
					const generic = content.match(genericComponentRegex).groups.generic;

					// example : 'T, O, VKey extends keyof O = never, DKey extends keyof O = VKey, OKey extends Record<string, any> = O'
					const genericKeysRegex = /(?<key>[A-Z]{1,2}\w*)(, | extends)/gm;
					const genericKeys = generic.match(genericKeysRegex).map(key => key.replace(/, | extends/g, ''));

					const libPackagesPath = path.resolve(rootPath, 'dist/types/lib/packages.d.ts');
					let libPackagesContent = fs.readFileSync(libPackagesPath, 'utf8');

					// type Props = ExtractPropTypes<__packageName__Props> | type Props = __packageName__Props
					const propsRegex = new RegExp(`type (?<type>Props) = (ExtractPropTypes<)?(?<props>${packageName}Props)(>)?`);
					const propsMatch = libPackagesContent.match(propsRegex);

					if (propsMatch) {
						// replace the line with "type Props<__generic__> = ExtractPropTypes<__packageName__Props<__genericKeys__>>"
						const newLine = `type ${propsMatch.groups.type}<${generic}> = ExtractPropTypes<${packageName}Props<${genericKeys.join(', ')}>>`;
						libPackagesContent = libPackagesContent.replace(propsMatch[0], newLine);

						await fs.writeFile(libPackagesPath, libPackagesContent, 'utf8');
					} else {
						console.log(`Line not found for package: ${packageName}`);
					}

				}
			}
		}
	}

}
