import { upperFirst } from 'lodash-es';
import { App, Plugin } from 'vue';
import OrionNavTop from './src/OrionNavTop.vue';
import type { OrionNavTopEmits, OrionNavTopProps } from './src/OrionNavTopSetup';
import OrionNavTopSetup from './src/OrionNavTopSetup';

export const OrionNavTopPlugin: Plugin = {
	install (app: App, prefix: string = 'o') {
		app.component(`${upperFirst(prefix)}NavTop`, OrionNavTop);
	},
};

export { OrionNavTop, OrionNavTopEmits, OrionNavTopProps, OrionNavTopSetup };

