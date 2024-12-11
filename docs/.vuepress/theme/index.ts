import { getDirname, path } from 'vuepress/utils'
const __dirname = getDirname(import.meta.url)

import type { Theme } from '@vuepress/core';
import type { DefaultThemeOptions } from '@vuepress/theme-default';
import { defaultTheme } from "@vuepress/theme-default";
import { navbar, sidebar } from '../configs';
import { docsearchPlugin } from '@vuepress/plugin-docsearch'
import { loadEnv } from 'vite';

const themeOrion = (options?: DefaultThemeOptions): Theme => {
	const env = loadEnv(process.env.NODE_ENV ?? 'development', process.cwd());

	return (app) => {
		return {
			name: 'vuepress-theme-orion',
			clientConfigFile: path.resolve(__dirname, 'client.ts'),
			plugins: [
				docsearchPlugin({
					appId: env.VITE_ALGOLIA_APP_ID,
					apiKey: env.VITE_ALGOLIA_API_KEY,
					indexName: 'orion-ui',
					locales: {
						'/': {
							placeholder: 'Search',
							translations: {
								button: {
									buttonText: 'Search',
								},
							},
						},
						'/fr/': {
							placeholder: 'Rechercher',
							translations: {
								button: {
									buttonText: 'Rechercher',
								},
							},
						},
					},
				}),
			],
			extends: defaultTheme({
				logo: '/orion-logo-brand.svg',
				repo: 'orion-ui/orion-ui',
				docsRepo: 'orion-ui/orion-ui',
				docsBranch: 'main',
				docsDir: 'docs',
				editLinkPattern: ':repo/edit/:branch/:path',
				locales: {
					'/': {
						navbar: navbar.en,
						sidebar: sidebar.en,
						sidebarDepth: 0,
					},
					'/fr/': {
						home: '/fr/',
						selectLanguageName: 'Français', 
						selectLanguageText: 'Langue',
						navbar: navbar.fr,
						sidebar: sidebar.fr,
						sidebarDepth: 0,
						//custom container
						prev: 'Précédent',
						next: 'Suivant',
						tip: 'Astuce',
						warning: 'Attention'
					},
				},
			}),
		}
	}
};

export default themeOrion;
