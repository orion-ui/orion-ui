import { upperFirst } from 'lodash-es';
import { App, Plugin } from 'vue';
import OrionLoader from './src/OrionLoader.vue';
import type { OrionLoaderEmits, OrionLoaderProps } from './src/OrionLoaderSetup';
import OrionLoaderSetup from './src/OrionLoaderSetup';

export const OrionLoaderPlugin: Plugin = {
	install (app: App, prefix: string = 'o') {
		app.component(`${upperFirst(prefix)}Loader`, OrionLoader);
	},
};

export { OrionLoader, OrionLoaderEmits, OrionLoaderProps, OrionLoaderSetup };

