import { upperFirst } from 'lodash-es';
import { App, Plugin } from 'vue';
import OrionPage from './src/OrionPage.vue';
import type { OrionPageEmits, OrionPageProps } from './src/OrionPageSetup';
import OrionPageSetup from './src/OrionPageSetup';

export const OrionPagePlugin: Plugin = {
	install (app: App, prefix: string = 'o') {
		app.component(`${upperFirst(prefix)}Page`, OrionPage);
	},
};

export { OrionPage, OrionPageEmits, OrionPageProps, OrionPageSetup };

