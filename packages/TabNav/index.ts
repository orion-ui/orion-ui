import { upperFirst } from 'lodash-es';
import { App, Plugin } from 'vue';
import OrionTabNav from './src/OrionTabNav.vue';
import type { OrionTabNavEmits, OrionTabNavProps } from './src/OrionTabNavSetup';
import OrionTabNavSetup from './src/OrionTabNavSetup';

export const OrionTabNavPlugin: Plugin = {
	install (app: App, prefix: string = 'o') {
		app.component(`${upperFirst(prefix)}TabNav`, OrionTabNav);
	},
};

export { OrionTabNav, OrionTabNavEmits, OrionTabNavProps, OrionTabNavSetup };

