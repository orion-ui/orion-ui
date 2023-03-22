import { App, Plugin } from 'vue';
import { upperFirst } from 'lodash-es';
import OrionDailyCalendar from './src/OrionDailyCalendar.vue';
import OrionDailyCalendarSetupService from './src/OrionDailyCalendarSetupService';

export const OrionDailyCalendarPlugin: Plugin = {
	install (app: App, prefix: string = 'o') {
		app.component(`${upperFirst(prefix)}DailyCalendar`, OrionDailyCalendar);
	},
};

export { OrionDailyCalendar, OrionDailyCalendarSetupService };
