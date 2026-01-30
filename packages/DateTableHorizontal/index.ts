import { upperFirst } from 'lodash-es';
import { type App, type Plugin } from 'vue';
import OrionDateTableHorizontal from './src/OrionDateTableHorizontal.vue';
import { OrionDateTableHorizontalSetup, type OrionDateTableHorizontalEmits, type OrionDateTableHorizontalProps } from './src/OrionDateTableHorizontalSetup';

export const OrionDateTableHorizontalPlugin: Plugin = {
	install (app: App, prefix: string = 'o') {
		app.component(`${upperFirst(prefix)}DateTableHorizontal`, OrionDateTableHorizontal);
	},
};

export { OrionDateTableHorizontal, OrionDateTableHorizontalSetup, type OrionDateTableHorizontalEmits, type OrionDateTableHorizontalProps };
