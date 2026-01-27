import { upperFirst } from 'lodash-es';
import { type App, type Plugin } from 'vue';
import OrionDateWeek from './src/OrionDateWeek.vue';
import { OrionDateWeekSetup, type OrionDateWeekEmits, type OrionDateWeekProps } from './src/OrionDateWeekSetup';

export const OrionDateWeekPlugin: Plugin = {
	install (app: App, prefix: string = 'o') {
		app.component(`${upperFirst(prefix)}DateWeek`, OrionDateWeek);
	},
};

export { OrionDateWeek, OrionDateWeekSetup, type OrionDateWeekEmits, type OrionDateWeekProps };
