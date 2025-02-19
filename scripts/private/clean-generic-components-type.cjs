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
		// const genericComponentRegex = /declare const _default: <(?<generic>.*)>\(__VLS_props/;
		const genericComponentPropsRegex = /export type (.*)Props<(?<generic>.*)>\s=/;
		const genericComponentEmitsRegex = /export type (.*)Emits<(?<generic>.*)>\s=/;

		const packagesFiles = await fs.readdir(path.resolve(rootPath, 'dist/types/packages'), { recursive: true });
		const libPackagesPath = path.resolve(rootPath, 'dist/types/lib/packages.d.ts');

		for await (const sourceFile of packagesFiles) {
			if (sourceFile.includes('SetupService.d.ts')) {
				const filePath = path.resolve(rootPath, 'dist/types/packages/' + sourceFile);
				let content = fs.readFileSync(filePath, 'utf8');

				const packageName = `${sourceFile}`.split('/').slice(-1)[0].replace('SetupService.d.ts', '');

				// example : 'T, O, VKey extends keyof O = never, DKey extends keyof O = VKey, OKey extends Record<string, any> = O'
				const genericKeysRegex = /(?<key>(?<!(extends | = )\w*)[A-Z]{1,2}\w*)(, | extends | = )?/gm;

				if (genericComponentPropsRegex.test(content)) {
					const generic = content.match(genericComponentPropsRegex).groups.generic;
					const genericKeys = generic.match(genericKeysRegex)
						.map(key => key.replace(/, | extends| = /g, '').trim())
						.filter((value, index, self) => self.indexOf(value) === index);

					let libPackagesContent = fs.readFileSync(libPackagesPath, 'utf8');

					// type Props = ExtractPropTypes<__packageName__Props> | type Props = __packageName__Props
					const propsRegex = new RegExp(`type (?<type>Props) = (ExtractPropTypes<)?(?<props>${packageName}Props)(>)?`);
					const propsMatch = libPackagesContent.match(propsRegex);

					if (propsMatch) {
						// replace the line with "type Props<__generic__> = ExtractPropTypes<__packageName__Props<__genericKeys__>>"
						const newLine = `type ${propsMatch.groups.type}<${generic}> = ${packageName}Props<${genericKeys.join(', ')}>`;
						libPackagesContent = libPackagesContent.replace(propsMatch[0], newLine);

						await fs.writeFile(libPackagesPath, libPackagesContent, 'utf8');
					} else {
						console.log(`Line Props not found for package: ${packageName}`);
					}
				}

				if (genericComponentEmitsRegex.test(content)) {
					const generic = content.match(genericComponentEmitsRegex).groups.generic;
					const genericKeys = generic.match(genericKeysRegex)
						.map(key => key.replace(/, | extends| = /g, '').trim())
						.filter((value, index, self) => self.indexOf(value) === index);

					let libPackagesContent = fs.readFileSync(libPackagesPath, 'utf8');

					// type Emits = ExtractPropTypes<__packageName__Emits> | type Emits = __packageName__Emits
					const emitsRegex = new RegExp(`type (?<type>Emits) = (ExtractPropTypes<)?(?<emits>${packageName}Emits)(>)?`);
					const emitsMatch = libPackagesContent.match(emitsRegex);

					if (emitsMatch) {
						// replace the line with "type Emits<__generic__> = ExtractPropTypes<__packageName__Emits<__genericKeys__>>"
						const newLine = `type ${emitsMatch.groups.type}<${generic}> = ${packageName}Emits<${genericKeys.join(', ')}>`;
						libPackagesContent = libPackagesContent.replace(emitsMatch[0], newLine);

						await fs.writeFile(libPackagesPath, libPackagesContent, 'utf8');
					} else {
						console.log(`Line Emits not found for package: ${packageName}`);
					}
				}
			}
		}

		// clean ExtractPropTypes<...> from lib/packages.d.ts
		const extractPropTypesRegex = /ExtractPropTypes<(?<typeToExtract>.*)>/gm;
		let libPackagesContent = fs.readFileSync(libPackagesPath, 'utf8');
		libPackagesContent = libPackagesContent.replace(extractPropTypesRegex, '$<typeToExtract>');

		await fs.writeFile(libPackagesPath, libPackagesContent, 'utf8');
	}

}

module.exports();
