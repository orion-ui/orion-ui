import MardownIt, { Renderer, Token } from "markdown-it";
import mdContainer from 'markdown-it-container'
import { App } from "vuepress";
import globalTypesDocData from '../../global-types-doc-data';

const typeRegex = /^types$/;

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

export const mdTypesPlugin = (md: MardownIt, App: App) => {
	md.use(mdContainer, 'types', {
		validate(params) {
			return !!params.trim().match(typeRegex)
		},

		render(tokens, index) {			
			if (tokens[index].type === 'container_types_open') {
			
				const types = tokens[index + 2].children
					?.filter(x => x.type === 'text')
					.map(x => x.content);

				return `<div class="oriondoc-types">${
					types?.map(type => {

					
						return `
<div class="oriondoc-type">     
<h3 id="${type}">Namespace ${type}</h3>  
${App.markdown.render(`\`\`\`ts
${formatSource(type)}
\`\`\``)}
</div>`
				}).join('\n')}`;
			} else if (tokens[index].type === 'container_types_close') {
				return `</div>`;
			}
		}
	} as ContainerOpts)
}

function formatSource (type: string) {
  if (type in globalTypesDocData) {
		const datas = globalTypesDocData[type as keyof typeof globalTypesDocData];
		let resultString = ``;

		datas.forEach(item => {
			const tabLevel = item.description.split('\n')[1]?.match(/(?<tab>\t)/g)?.length ?? 1;
			const tabRegex = new RegExp(`^\t{${tabLevel - 1}}`, 'gm');
			const trimDescription = item.description.replace(tabRegex, '');
			const cleanCommentDescription = trimDescription.replace(/^\s*(\/\/).*\n/gm, '')
			
			if(item.generic !== '')
				resultString += `type ${item.type} <${item.generic}> = ${cleanCommentDescription} \n`
			else 
				resultString += `type ${item.type} = ${cleanCommentDescription} \n`
		})
		
		return resultString.trim();
  }
}