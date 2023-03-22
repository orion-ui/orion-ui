import { App, Plugin } from 'vue';
import { upperFirst } from 'lodash-es';
import OrionLoader from './src/OrionLoader.vue';
import OrionLoaderSetupService from './src/OrionLoaderSetupService';

export const OrionLoaderPlugin: Plugin = {
	install (app: App, prefix: string = 'o') {
		app.component(`${upperFirst(prefix)}Loader`, OrionLoader);
	},
};

export { OrionLoader, OrionLoaderSetupService };
