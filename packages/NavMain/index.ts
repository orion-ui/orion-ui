import { upperFirst } from 'lodash-es';
import { type App, type Plugin } from 'vue';
import OrionNavMain from './src/OrionNavMain.vue';
import { OrionNavMainSetup, type OrionNavMainEmits, type OrionNavMainProps } from './src/OrionNavMainSetup';

export const OrionNavMainPlugin: Plugin = {
	install (app: App, prefix: string = 'o') {
		app.component(`${upperFirst(prefix)}NavMain`, OrionNavMain);
	},
};

export { OrionNavMain, OrionNavMainSetup, type OrionNavMainEmits, type OrionNavMainProps };
