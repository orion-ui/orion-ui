import { upperFirst } from 'lodash-es';
import { App, Plugin } from 'vue';
import OrionTimelinePane from './src/OrionTimelinePane.vue';
import type { OrionTimelinePaneEmits, OrionTimelinePaneProps } from './src/OrionTimelinePaneSetup';
import OrionTimelinePaneSetup from './src/OrionTimelinePaneSetup';

export const OrionTimelinePanePlugin: Plugin = {
	install (app: App, prefix: string = 'o') {
		app.component(`${upperFirst(prefix)}TimelinePane`, OrionTimelinePane);
	},
};

export { OrionTimelinePane, OrionTimelinePaneEmits, OrionTimelinePaneProps, OrionTimelinePaneSetup };

