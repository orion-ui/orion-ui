import { upperFirst } from 'lodash-es';
import { App, Plugin } from 'vue';
import OrionDateTableHorizontal from './src/OrionDateTableHorizontal.vue';
import type { OrionDateTableHorizontalEmits, OrionDateTableHorizontalProps } from './src/OrionDateTableHorizontalSetup';
import OrionDateTableHorizontalSetup from './src/OrionDateTableHorizontalSetup';

export const OrionDateTableHorizontalPlugin: Plugin = {
	install (app: App, prefix: string = 'o') {
		app.component(`${upperFirst(prefix)}DateTableHorizontal`, OrionDateTableHorizontal);
	},
};

export { OrionDateTableHorizontal, OrionDateTableHorizontalEmits, OrionDateTableHorizontalProps, OrionDateTableHorizontalSetup };

