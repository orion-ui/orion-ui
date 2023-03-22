import { App, Plugin } from 'vue';
import { upperFirst } from 'lodash-es';
import OrionTour from './src/OrionTour.vue';
import OrionTourSetupService from './src/OrionTourSetupService';

export const OrionTourPlugin: Plugin = {
	install (app: App, prefix: string = 'o') {
		app.component(`${upperFirst(prefix)}Tour`, OrionTour);
	},
};

export { OrionTour, OrionTourSetupService };
