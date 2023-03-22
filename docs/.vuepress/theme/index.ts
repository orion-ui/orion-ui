import type { Theme } from '@vuepress/core';
import type { DefaultThemeOptions } from '@vuepress/theme-default';
import { defaultTheme } from "@vuepress/theme-default";
import path from 'path';
import { navbar, sidebar } from '../configs';

const themeOrion = (options?: DefaultThemeOptions): Theme => {
	return (app) => {
		return {
			name: 'vuepress-theme-orion',
			clientConfigFile: path.resolve(__dirname, 'client.ts'),
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
						tip: 'Astuce',
						warning: 'Attention'
					},
				},
			}),
		}
	}
};

export default themeOrion;
