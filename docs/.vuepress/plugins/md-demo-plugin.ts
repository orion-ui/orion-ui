import MardownIt from "markdown-it";
import mdContainer from 'markdown-it-container'
import type Token from 'markdown-it/lib/token'
import type Renderer from 'markdown-it/lib/renderer'
import { App } from "vuepress";
import fs from "fs-extra";
import path from "path";

const rootLib = path.resolve(__dirname, '../../../');
const demoRegex = /^demo:((\(service\))|(?<package>\w+))$/;
const demoIsServiceRegex = /^demo:(\(service\))$/;

interface ContainerOpts {
	marker?: string | undefined
	validate?(params: string): boolean
	render?(
		tokens: Token[],
		index: number,
		options: any,
		env: any,
		self: Renderer
	): string
}

export const mdDemoPlugin = (md: MardownIt, App: App, supportedLanguages: string[]) => {
	md.use(mdContainer, 'demo', {
		validate(params) {
			return !!params.trim().match(demoRegex)
		},

		render(tokens, index) {			
			if (tokens[index].type === 'container_demo_open') {
				const demoPackage = demoRegex.exec(tokens[index].info.trim())?.groups?.package;
				const demoIsService = demoIsServiceRegex.test(tokens[index].info.trim());
				
				if (!demoPackage && !demoIsService) return;

				const demos = tokens[index + 2].children
					?.filter(x => x.type === 'text')
					.map(x => x.content);

				return `<div class="oriondoc-demos">${
					demos?.map(demo => {

						const targetPath = demoIsService
							? `services/docs/${demo}.vue`
							: `packages/${demoPackage}/docs/${demo}.vue`

						const demoSource = fs.readFileSync(
							path.resolve(rootLib, targetPath),
							{ encoding: 'utf-8' }
						);

						const parser = /(?<source>(.|\n)*<\/(template|script|style)>)((.|\n)*@hl (?<highlight>{[\d,-]+}))?((.|\n)*@hmr (?<hmr>[\w\/]+.md))?((?<doc>(.|\n)*))?/.exec(demoSource)?.groups;

						const source = parser?.source?.replace(/from 'lib'/gm, `from '@orion.ui/orion'`) ?? '';
						const highlight = parser?.highlight ?? '';
						const doc = parser?.doc?.trim() ?? '';

						const docRegex = /@lang:(?<language>.*)\n(?<content>(.|\n)*?)@lang/g;
						let match;
						let result = {} as Record<string, string | undefined> | string;
						if(doc.includes('Playground'))
							result = doc;
						else {
							while (match = docRegex.exec(doc)) {
								const lang = match.groups?.language;
								if (lang && typeof result === 'object')
									result[lang] = match.groups?.content;
							}
						}
						return `
<div class="oriondoc-demo">
<PackageDemo :demo="${demo}" :hasNested="${/import.*Nested.*/.test(source)}">
<template #default="{lang}">
${
	typeof result === 'string'
		? App.markdown.render(result)
		: supportedLanguages.map(lang => `<div v-if="lang === '${lang}'" class="lang ${lang}">
${App.markdown.render(
	(result as any)[lang] ?? `:::warning @lang:${lang} is missing in demo documentation for ${demo}
${(result as any).en ?? 'Missing documentation'}
:::`)}
</div>`).join(`\n\n`)
}
</template>

<template #source>
${App.markdown.render(`\`\`\`vue${highlight}
${source}
\`\`\``)}
</template>

<template #rawSource>
${App.markdown.render(`\`\`\`
${source}
\`\`\``)}
</template>
</PackageDemo>
</div>`
				}).join('\n')}`;
			} else if (tokens[index].type === 'container_demo_close') {
				return `</div>`;
			}
		}
	} as ContainerOpts)
}
