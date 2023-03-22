import { App, Plugin } from 'vue';
import { upperFirst } from 'lodash-es';
import OrionRate from './src/OrionRate.vue';
import OrionRateSetupService from './src/OrionRateSetupService';

export const OrionRatePlugin: Plugin = {
	install (app: App, prefix: string = 'o') {
		app.component(`${upperFirst(prefix)}Rate`, OrionRate);
	},
};

export { OrionRate, OrionRateSetupService };
