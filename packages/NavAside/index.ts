import { upperFirst } from 'lodash-es';
import { App, Plugin } from 'vue';
import OrionNavAside from './src/OrionNavAside.vue';
import type { OrionNavAsideEmits, OrionNavAsideProps } from './src/OrionNavAsideSetup';
import OrionNavAsideSetup from './src/OrionNavAsideSetup';

export const OrionNavAsidePlugin: Plugin = {
	install (app: App, prefix: string = 'o') {
		app.component(`${upperFirst(prefix)}NavAside`, OrionNavAside);
	},
};

export { OrionNavAside, OrionNavAsideEmits, OrionNavAsideProps, OrionNavAsideSetup };

