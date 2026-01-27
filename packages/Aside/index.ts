import { upperFirst } from 'lodash-es';
import { type App, type Plugin } from 'vue';
import OrionAside from './src/OrionAside.vue';
import { OrionAsideSetup, type OrionAsideEmits, type OrionAsideProps } from './src/OrionAsideSetup';

export const OrionAsidePlugin: Plugin = {
	install (app: App, prefix: string = 'o') {
		app.component(`${upperFirst(prefix)}Aside`, OrionAside);
	},
};

export { OrionAside, OrionAsideSetup, type OrionAsideEmits, type OrionAsideProps };
