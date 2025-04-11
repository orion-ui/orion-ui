import { App, Plugin } from 'vue';
import { upperFirst } from 'lodash-es';
import OrionTabNav from './src/OrionTabNav.vue';
import type { OrionTabNavEmits, OrionTabNavProps } from './src/OrionTabNavSetupService';
import OrionTabNavSetupService from './src/OrionTabNavSetupService';

export const OrionTabNavPlugin: Plugin = {
	install (app: App, prefix: string = 'o') {
		app.component(`${upperFirst(prefix)}TabNav`, OrionTabNav);
	},
};

export { OrionTabNav, OrionTabNavSetupService, OrionTabNavEmits, OrionTabNavProps };
