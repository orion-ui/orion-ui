import { upperFirst } from 'lodash-es';
import { type App, type Plugin } from 'vue';
import OrionTour from './src/OrionTour.vue';
import { OrionTourSetup, type OrionTourEmits, type OrionTourProps } from './src/OrionTourSetup';

export const OrionTourPlugin: Plugin = {
	install (app: App, prefix: string = 'o') {
		app.component(`${upperFirst(prefix)}Tour`, OrionTour);
	},
};

export { OrionTour, OrionTourSetup, type OrionTourEmits, type OrionTourProps };
