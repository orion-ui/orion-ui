import { upperFirst } from 'lodash-es';
import { App, Plugin } from 'vue';
import OrionDateRange from './src/OrionDateRange.vue';
import type { OrionDateRangeEmits, OrionDateRangeProps } from './src/OrionDateRangeSetup';
import OrionDateRangeSetup from './src/OrionDateRangeSetup';

export const OrionDateRangePlugin: Plugin = {
	install (app: App, prefix: string = 'o') {
		app.component(`${upperFirst(prefix)}DateRange`, OrionDateRange);
	},
};

export { OrionDateRange, OrionDateRangeEmits, OrionDateRangeProps, OrionDateRangeSetup };

