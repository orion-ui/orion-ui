import { App, Plugin } from 'vue';
import { upperFirst } from 'lodash-es';
import OrionTourStep from './src/OrionTourStep.vue';
import type { OrionTourStepEmits, OrionTourStepProps } from './src/OrionTourStepSetupService';
import OrionTourStepSetupService from './src/OrionTourStepSetupService';

export const OrionTourStepPlugin: Plugin = {
	install (app: App, prefix: string = 'o') {
		app.component(`${upperFirst(prefix)}TourStep`, OrionTourStep);
	},
};

export { OrionTourStep, OrionTourStepSetupService, OrionTourStepEmits, OrionTourStepProps };
