import { upperFirst } from 'lodash-es';
import { App, Plugin } from 'vue';
import OrionRate from './src/OrionRate.vue';
import type { OrionRateEmits, OrionRateProps } from './src/OrionRateSetup';
import OrionRateSetup from './src/OrionRateSetup';

export const OrionRatePlugin: Plugin = {
	install (app: App, prefix: string = 'o') {
		app.component(`${upperFirst(prefix)}Rate`, OrionRate);
	},
};

export { OrionRate, OrionRateEmits, OrionRateProps, OrionRateSetup };

