import { upperFirst } from 'lodash-es';
import { App, Plugin } from 'vue';
import OrionAside from './src/OrionAside.vue';
import type { OrionAsideEmits, OrionAsideProps } from './src/OrionAsideSetup';
import OrionAsideSetup from './src/OrionAsideSetup';

export const OrionAsidePlugin: Plugin = {
	install (app: App, prefix: string = 'o') {
		app.component(`${upperFirst(prefix)}Aside`, OrionAside);
	},
};

export { OrionAside, OrionAsideEmits, OrionAsideProps, OrionAsideSetup };

