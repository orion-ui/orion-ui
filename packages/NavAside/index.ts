import { upperFirst } from 'lodash-es';
import { type App, type Plugin } from 'vue';
import OrionNavAside from './src/OrionNavAside.vue';
import { OrionNavAsideSetup, type OrionNavAsideEmits, type OrionNavAsideProps } from './src/OrionNavAsideSetup';

export const OrionNavAsidePlugin: Plugin = {
	install (app: App, prefix: string = 'o') {
		app.component(`${upperFirst(prefix)}NavAside`, OrionNavAside);
	},
};

export { OrionNavAside, OrionNavAsideSetup, type OrionNavAsideEmits, type OrionNavAsideProps };
