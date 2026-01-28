import { upperFirst } from 'lodash-es';
import { type App, type Plugin } from 'vue';
import OrionTimeline from './src/OrionTimeline.vue';
import { OrionTimelineSetup, type OrionTimelineEmits, type OrionTimelineProps } from './src/OrionTimelineSetup';

export const OrionTimelinePlugin: Plugin = {
	install (app: App, prefix: string = 'o') {
		app.component(`${upperFirst(prefix)}Timeline`, OrionTimeline);
	},
};

export { OrionTimeline, OrionTimelineSetup, type OrionTimelineEmits, type OrionTimelineProps };
