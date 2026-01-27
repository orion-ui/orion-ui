import { upperFirst } from 'lodash-es';
import { App, Plugin } from 'vue';
import OrionNavMain from './src/OrionNavMain.vue';
import type { OrionNavMainEmits, OrionNavMainProps } from './src/OrionNavMainSetup';
import OrionNavMainSetup from './src/OrionNavMainSetup';

export const OrionNavMainPlugin: Plugin = {
	install (app: App, prefix: string = 'o') {
		app.component(`${upperFirst(prefix)}NavMain`, OrionNavMain);
	},
};

export { OrionNavMain, OrionNavMainEmits, OrionNavMainProps, OrionNavMainSetup };

