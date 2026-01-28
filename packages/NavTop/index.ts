import { upperFirst } from 'lodash-es';
import { type App, type Plugin } from 'vue';
import OrionNavTop from './src/OrionNavTop.vue';
import { OrionNavTopSetup, type OrionNavTopEmits, type OrionNavTopProps } from './src/OrionNavTopSetup';

export const OrionNavTopPlugin: Plugin = {
	install (app: App, prefix: string = 'o') {
		app.component(`${upperFirst(prefix)}NavTop`, OrionNavTop);
	},
};

export { OrionNavTop, OrionNavTopSetup, type OrionNavTopEmits, type OrionNavTopProps };
