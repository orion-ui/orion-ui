import { upperFirst } from 'lodash-es';
import { type App, type Plugin } from 'vue';
import OrionTourStep from './src/OrionTourStep.vue';
import { OrionTourStepSetup, type OrionTourStepEmits, type OrionTourStepProps } from './src/OrionTourStepSetup';

export const OrionTourStepPlugin: Plugin = {
	install (app: App, prefix: string = 'o') {
		app.component(`${upperFirst(prefix)}TourStep`, OrionTourStep);
	},
};

export { OrionTourStep, OrionTourStepSetup, type OrionTourStepEmits, type OrionTourStepProps };
