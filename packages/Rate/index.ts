import { upperFirst } from 'lodash-es';
import { type App, type Plugin } from 'vue';
import OrionRate from './src/OrionRate.vue';
import { OrionRateSetup, type OrionRateEmits, type OrionRateProps } from './src/OrionRateSetup';

export const OrionRatePlugin: Plugin = {
	install (app: App, prefix: string = 'o') {
		app.component(`${upperFirst(prefix)}Rate`, OrionRate);
	},
};

export { OrionRate, OrionRateSetup, type OrionRateEmits, type OrionRateProps };
