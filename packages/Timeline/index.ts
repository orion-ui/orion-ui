import { App, Plugin } from 'vue';
import { upperFirst } from 'lodash-es';
import OrionTimeline from './src/OrionTimeline.vue';
import type { OrionTimelineEmits, OrionTimelineProps } from './src/OrionTimelineSetupService';
import OrionTimelineSetupService from './src/OrionTimelineSetupService';

export const OrionTimelinePlugin: Plugin = {
	install (app: App, prefix: string = 'o') {
		app.component(`${upperFirst(prefix)}Timeline`, OrionTimeline);
	},
};

export { OrionTimeline, OrionTimelineSetupService, OrionTimelineEmits, OrionTimelineProps };
