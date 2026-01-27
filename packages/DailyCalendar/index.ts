import { upperFirst } from 'lodash-es';
import { type App, type Plugin } from 'vue';
import OrionDailyCalendar from './src/OrionDailyCalendar.vue';
import { OrionDailyCalendarSetup, type OrionDailyCalendarEmits, type OrionDailyCalendarProps } from './src/OrionDailyCalendarSetup';

export const OrionDailyCalendarPlugin: Plugin = {
	install (app: App, prefix: string = 'o') {
		app.component(`${upperFirst(prefix)}DailyCalendar`, OrionDailyCalendar);
	},
};

export { OrionDailyCalendar, OrionDailyCalendarSetup, type OrionDailyCalendarEmits, type OrionDailyCalendarProps };
