import { App, Plugin } from 'vue';
import { upperFirst } from 'lodash-es';
import OrionInputRange from './src/OrionInputRange.vue';
import type { OrionInputRangeEmits, OrionInputRangeProps } from './src/OrionInputRangeSetupService';
import OrionInputRangeSetupService from './src/OrionInputRangeSetupService';

export const OrionInputRangePlugin: Plugin = {
	install (app: App, prefix: string = 'o') {
		app.component(`${upperFirst(prefix)}InputRange`, OrionInputRange);
	},
};

export { OrionInputRange, OrionInputRangeSetupService, OrionInputRangeEmits, OrionInputRangeProps };
