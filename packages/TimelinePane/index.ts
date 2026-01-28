import { upperFirst } from 'lodash-es';
import { type App, type Plugin } from 'vue';
import OrionTimelinePane from './src/OrionTimelinePane.vue';
import { OrionTimelinePaneSetup, type OrionTimelinePaneEmits, type OrionTimelinePaneProps } from './src/OrionTimelinePaneSetup';

export const OrionTimelinePanePlugin: Plugin = {
	install (app: App, prefix: string = 'o') {
		app.component(`${upperFirst(prefix)}TimelinePane`, OrionTimelinePane);
	},
};

export { OrionTimelinePane, OrionTimelinePaneSetup, type OrionTimelinePaneEmits, type OrionTimelinePaneProps };
