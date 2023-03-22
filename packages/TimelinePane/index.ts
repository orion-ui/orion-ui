import { App, Plugin } from 'vue';
import { upperFirst } from 'lodash-es';
import OrionTimelinePane from './src/OrionTimelinePane.vue';
import OrionTimelinePaneSetupService from './src/OrionTimelinePaneSetupService';

export const OrionTimelinePanePlugin: Plugin = {
	install (app: App, prefix: string = 'o') {
		app.component(`${upperFirst(prefix)}TimelinePane`, OrionTimelinePane);
	},
};

export { OrionTimelinePane, OrionTimelinePaneSetupService };
