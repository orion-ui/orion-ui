import { upperFirst } from 'lodash-es';
import { type App, type Plugin } from 'vue';
import OrionDateRange from './src/OrionDateRange.vue';
import { OrionDateRangeSetup, type OrionDateRangeEmits, type OrionDateRangeProps } from './src/OrionDateRangeSetup';

export const OrionDateRangePlugin: Plugin = {
	install (app: App, prefix: string = 'o') {
		app.component(`${upperFirst(prefix)}DateRange`, OrionDateRange);
	},
};

export { OrionDateRange, OrionDateRangeSetup, type OrionDateRangeEmits, type OrionDateRangeProps };
