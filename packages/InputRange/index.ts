import { upperFirst } from 'lodash-es';
import { App, Plugin } from 'vue';
import OrionInputRange from './src/OrionInputRange.vue';
import type { OrionInputRangeEmits, OrionInputRangeProps } from './src/OrionInputRangeSetup';
import OrionInputRangeSetup from './src/OrionInputRangeSetup';

export const OrionInputRangePlugin: Plugin = {
	install (app: App, prefix: string = 'o') {
		app.component(`${upperFirst(prefix)}InputRange`, OrionInputRange);
	},
};

export { OrionInputRange, OrionInputRangeEmits, OrionInputRangeProps, OrionInputRangeSetup };

