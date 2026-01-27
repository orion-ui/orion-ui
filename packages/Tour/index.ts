import { upperFirst } from 'lodash-es';
import { App, Plugin } from 'vue';
import OrionTour from './src/OrionTour.vue';
import type { OrionTourEmits, OrionTourProps } from './src/OrionTourSetup';
import OrionTourSetup from './src/OrionTourSetup';

export const OrionTourPlugin: Plugin = {
	install (app: App, prefix: string = 'o') {
		app.component(`${upperFirst(prefix)}Tour`, OrionTour);
	},
};

export { OrionTour, OrionTourEmits, OrionTourProps, OrionTourSetup };

