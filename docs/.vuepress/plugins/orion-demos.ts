import glob from 'fast-glob';
import path from 'path';
import fs from "fs-extra";
import type { Plugin } from 'vite'

const rootLib = path.resolve(__dirname, '../../../');

export function OrionDemos(specificPackagesMap: Map<string, string>, supportedLanguages: string[]): Plugin {
	return {
		name: 'orion-demos',
		enforce: 'pre',
		async transform (code, id) {
			const serviceRegex = /\/services\/(?<name>\w+)\.html\.vue$/;
			const packageRegex = /Orion(?<name>\w+)\.html\.vue$/;

			const isService = serviceRegex.test(id);
			const isPackage = packageRegex.test(id);

			if (!id.includes('docs')) return;
			if (!isService && !isPackage) return;
			
			let packageName = packageRegex.exec(id)?.groups?.name;

			if (isPackage && packageName) {
				packageName = specificPackagesMap.get(packageName) ?? packageName;
			}

			if (isPackage && !packageName) return;
			
			const demosPathsPattern = isPackage
				? `packages/${packageName}/docs/*.vue`
				: `services/docs/*.vue`;
			const demosPaths = await glob(demosPathsPattern, { cwd: rootLib })

			const demosImports: string[] = [];

			for await (const demoPath of demosPaths) {
				const demoName = /(?<name>\w+)\.vue$/.exec(demoPath)?.groups?.name;
				if (!demoName) continue;

				demosImports.push(`import ${demoName} from '${demoPath}'`);
			}

			code += `
				<script setup lang="ts">
				${demosImports.join('\n')}
				</script>
			`;

			return code;
		},
		handleHotUpdate(ctx) {
			const regexPackage = new RegExp(`^${rootLib}/packages/(?<package>\\w+)/docs/(?<demo>(\\w+)).vue$`);
			const regexService = new RegExp(`^${rootLib}/services/docs/(?<demo>(\\w+)).vue$`);

			if (regexPackage.test(ctx.file)) {
				const parser = regexPackage.exec(ctx.file)?.groups;
				const demoPackage = parser?.package;
				const targetMdPath = path.resolve(rootLib, `docs/components/Orion${demoPackage}.md`);
				const targetMdContent = fs.readFileSync(targetMdPath, {encoding: 'utf-8'});
				fs.writeFileSync(targetMdPath, targetMdContent, {encoding: 'utf-8'});
				
				supportedLanguages.filter(x => x !== 'en').forEach(lang => {
					const targetMdPath = path.resolve(rootLib, `docs/${lang}/components/Orion${demoPackage}.md`);
					const targetMdContent = fs.readFileSync(targetMdPath, {encoding: 'utf-8'});
					fs.writeFileSync(targetMdPath, targetMdContent, {encoding: 'utf-8'});
				})
			} 
			else if (regexService.test(ctx.file)) {
				const fileContent = fs.readFileSync(ctx.file, {encoding: 'utf-8'});
				const hmrTargetsRegex = /@hmr (?<target>[\w\/]+.md)$/gm;

				fileContent.match(hmrTargetsRegex)?.map(x => {
					const target = x.replace('@hmr ', '');
					const targetMdPath = path.resolve(rootLib, `docs/${target}`);
					const targetMdContent = fs.readFileSync(targetMdPath, {encoding: 'utf-8'});
					fs.writeFileSync(targetMdPath, targetMdContent, {encoding: 'utf-8'});
				});
			}
		},
	}
}
