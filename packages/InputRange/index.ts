import { upperFirst } from 'lodash-es';
import { type App, type Plugin } from 'vue';
import OrionInputRange from './src/OrionInputRange.vue';
import { OrionInputRangeSetup, type OrionInputRangeEmits, type OrionInputRangeProps } from './src/OrionInputRangeSetup';

export const OrionInputRangePlugin: Plugin = {
	install (app: App, prefix: string = 'o') {
		app.component(`${upperFirst(prefix)}InputRange`, OrionInputRange);
	},
};

export { OrionInputRange, OrionInputRangeSetup, type OrionInputRangeEmits, type OrionInputRangeProps };
