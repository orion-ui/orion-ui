import { App, Plugin } from 'vue';
import { upperFirst } from 'lodash-es';
import OrionDateRange from './src/OrionDateRange.vue';
import type { OrionDateRangeEmits, OrionDateRangeProps } from './src/OrionDateRangeSetupService';
import OrionDateRangeSetupService from './src/OrionDateRangeSetupService';

export const OrionDateRangePlugin: Plugin = {
	install (app: App, prefix: string = 'o') {
		app.component(`${upperFirst(prefix)}DateRange`, OrionDateRange);
	},
};

export { OrionDateRange, OrionDateRangeSetupService, OrionDateRangeEmits, OrionDateRangeProps };
