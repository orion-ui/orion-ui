import { upperFirst } from 'lodash-es';
import { type App, type Plugin } from 'vue';
import OrionTabNav from './src/OrionTabNav.vue';
import { OrionTabNavSetup, type OrionTabNavEmits, type OrionTabNavProps } from './src/OrionTabNavSetup';

export const OrionTabNavPlugin: Plugin = {
	install (app: App, prefix: string = 'o') {
		app.component(`${upperFirst(prefix)}TabNav`, OrionTabNav);
	},
};

export { OrionTabNav, OrionTabNavSetup, type OrionTabNavEmits, type OrionTabNavProps };
