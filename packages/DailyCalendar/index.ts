import { upperFirst } from 'lodash-es';
import { App, Plugin } from 'vue';
import OrionDailyCalendar from './src/OrionDailyCalendar.vue';
import type { OrionDailyCalendarEmits, OrionDailyCalendarProps } from './src/OrionDailyCalendarSetup';
import OrionDailyCalendarSetup from './src/OrionDailyCalendarSetup';

export const OrionDailyCalendarPlugin: Plugin = {
	install (app: App, prefix: string = 'o') {
		app.component(`${upperFirst(prefix)}DailyCalendar`, OrionDailyCalendar);
	},
};

export { OrionDailyCalendar, OrionDailyCalendarEmits, OrionDailyCalendarProps, OrionDailyCalendarSetup };

