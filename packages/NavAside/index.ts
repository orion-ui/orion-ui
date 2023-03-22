import { App, Plugin } from 'vue';
import { upperFirst } from 'lodash-es';
import OrionNavAside from './src/OrionNavAside.vue';
import OrionNavAsideSetupService from './src/OrionNavAsideSetupService';

export const OrionNavAsidePlugin: Plugin = {
	install (app: App, prefix: string = 'o') {
		app.component(`${upperFirst(prefix)}NavAside`, OrionNavAside);
	},
};

export { OrionNavAside, OrionNavAsideSetupService };
