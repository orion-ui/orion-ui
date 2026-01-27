import { upperFirst } from 'lodash-es';
import { App, Plugin } from 'vue';
import OrionDateWeek from './src/OrionDateWeek.vue';
import type { OrionDateWeekEmits, OrionDateWeekProps } from './src/OrionDateWeekSetup';
import OrionDateWeekSetup from './src/OrionDateWeekSetup';

export const OrionDateWeekPlugin: Plugin = {
	install (app: App, prefix: string = 'o') {
		app.component(`${upperFirst(prefix)}DateWeek`, OrionDateWeek);
	},
};

export { OrionDateWeek, OrionDateWeekEmits, OrionDateWeekProps, OrionDateWeekSetup };

