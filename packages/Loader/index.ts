import { upperFirst } from 'lodash-es';
import { type App, type Plugin } from 'vue';
import OrionLoader from './src/OrionLoader.vue';
import { OrionLoaderSetup, type OrionLoaderEmits, type OrionLoaderProps } from './src/OrionLoaderSetup';

export const OrionLoaderPlugin: Plugin = {
	install (app: App, prefix: string = 'o') {
		app.component(`${upperFirst(prefix)}Loader`, OrionLoader);
	},
};

export { OrionLoader, OrionLoaderSetup, type OrionLoaderEmits, type OrionLoaderProps };
