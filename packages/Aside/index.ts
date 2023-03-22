import { App, Plugin } from 'vue';
import { upperFirst } from 'lodash-es';
import OrionAside from './src/OrionAside.vue';
import OrionAsideSetupService from './src/OrionAsideSetupService';

export const OrionAsidePlugin: Plugin = {
	install (app: App, prefix: string = 'o') {
		app.component(`${upperFirst(prefix)}Aside`, OrionAside);
	},
};

export { OrionAside, OrionAsideSetupService };
