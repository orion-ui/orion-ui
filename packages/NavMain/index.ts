import { App, Plugin } from 'vue';
import { upperFirst } from 'lodash-es';
import OrionNavMain from './src/OrionNavMain.vue';
import OrionNavMainSetupService from './src/OrionNavMainSetupService';

export const OrionNavMainPlugin: Plugin = {
	install (app: App, prefix: string = 'o') {
		app.component(`${upperFirst(prefix)}NavMain`, OrionNavMain);
	},
};

export { OrionNavMain, OrionNavMainSetupService };
