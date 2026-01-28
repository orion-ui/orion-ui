import { upperFirst } from 'lodash-es';
import { type App, type Plugin } from 'vue';
import OrionPage from './src/OrionPage.vue';
import { OrionPageSetup, type OrionPageEmits, type OrionPageProps } from './src/OrionPageSetup';

export const OrionPagePlugin: Plugin = {
	install (app: App, prefix: string = 'o') {
		app.component(`${upperFirst(prefix)}Page`, OrionPage);
	},
};

export { OrionPage, OrionPageSetup, type OrionPageEmits, type OrionPageProps };
