import { upperFirst } from 'lodash-es';
import { App, Plugin } from 'vue';
import OrionTourStep from './src/OrionTourStep.vue';
import type { OrionTourStepEmits, OrionTourStepProps } from './src/OrionTourStepSetup';
import OrionTourStepSetup from './src/OrionTourStepSetup';

export const OrionTourStepPlugin: Plugin = {
	install (app: App, prefix: string = 'o') {
		app.component(`${upperFirst(prefix)}TourStep`, OrionTourStep);
	},
};

export { OrionTourStep, OrionTourStepEmits, OrionTourStepProps, OrionTourStepSetup };

