import { App, Plugin } from 'vue';
import { upperFirst } from 'lodash-es';
import OrionDateTableHorizontal from './src/OrionDateTableHorizontal.vue';
import type { OrionDateTableHorizontalEmits, OrionDateTableHorizontalProps } from './src/OrionDateTableHorizontalSetupService';
import OrionDateTableHorizontalSetupService from './src/OrionDateTableHorizontalSetupService';

export const OrionDateTableHorizontalPlugin: Plugin = {
	install (app: App, prefix: string = 'o') {
		app.component(`${upperFirst(prefix)}DateTableHorizontal`, OrionDateTableHorizontal);
	},
};

export { OrionDateTableHorizontal, OrionDateTableHorizontalSetupService, OrionDateTableHorizontalEmits, OrionDateTableHorizontalProps };
