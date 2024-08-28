import { App, Plugin } from 'vue';
import { upperFirst } from 'lodash-es';
import OrionPeriod from './src/OrionPeriod.vue';
import OrionPeriodSetupService from './src/OrionPeriodSetupService';

export const OrionPeriodPlugin: Plugin = {
	install (app: App, prefix: string = 'o') {
		app.component(`${upperFirst(prefix)}Period`, OrionPeriod);
	},
};

export { OrionPeriod, OrionPeriodSetupService };
