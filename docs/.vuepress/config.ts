import { defineUserConfig } from 'vuepress';
import { viteBundler } from '@vuepress/bundler-vite';
import { registerComponentsPlugin } from '@vuepress/plugin-register-components';
import vueJsx from '@vitejs/plugin-vue-jsx';
import babel from 'vite-plugin-babel';
import path from 'path';

import { alias } from '../../vite.config';
import { mdDemoPlugin } from './plugins/md-demo-plugin';
import { OrionDemos } from './plugins/orion-demos';
import { mdTypesPlugin } from './plugins/md-types-plugin';
import themeOrion from './theme';


const specificPackagesMap = new Map([
	['DragNDrop', 'Droppable'],
	['Tabs', 'Tabs'],
]);

const supportedLanguages = ['en', 'fr'];


export default defineUserConfig({
	lang: 'en-US',
	title: `Orion UI`,
	description: `Documentation for Orion UI framework`,
	pagePatterns: ['**/*.md', '**/*.mdx', '!.vuepress', '!node_modules'],
	theme: themeOrion(),
	extendsMarkdown: (md, App) => {
		mdDemoPlugin(md, App, supportedLanguages)
		mdTypesPlugin(md, App)
	},

	head: [
		[
			'link',
			{
				rel: 'icon',
				type: 'image/png',
				sizes: '1024x1024',
				href: `/orion-logo-brand@4x.png`,
			},
		],
	],

	locales: {
    '/': {
      lang: 'en-US',
			title: 'Orion UI',
    },
    '/fr/': {
      lang: 'fr-FR',
			title: 'Orion UI',
    },
  },

	plugins: [
		registerComponentsPlugin({
			componentsDir: path.resolve(__dirname, './components'),
		}),
	],

	alias: {
		...alias,
		'@': path.resolve(__dirname, '../../'),
		'@utils': path.resolve(__dirname, './utils/'),
	},

	bundler: viteBundler({
		viteOptions: {
			plugins: [
				OrionDemos(specificPackagesMap, supportedLanguages),
				vueJsx(),
				babel({ filter: /\.tsx?$/ }),
			]
		},
	}),
});
