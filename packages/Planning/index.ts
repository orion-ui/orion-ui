import { App, Plugin } from 'vue';
import { upperFirst } from 'lodash-es';
import OrionPlanning from './src/OrionPlanning.vue';
import OrionPlanningSetupService from './src/OrionPlanningSetupService';

export const OrionPlanningPlugin: Plugin = {
	install (app: App, prefix: string = 'o') {
		app.component(`${upperFirst(prefix)}Planning`, OrionPlanning);
	},
};

export { OrionPlanning, OrionPlanningSetupService };
