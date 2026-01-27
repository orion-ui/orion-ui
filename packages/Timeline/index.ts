import { upperFirst } from 'lodash-es';
import { App, Plugin } from 'vue';
import OrionTimeline from './src/OrionTimeline.vue';
import type { OrionTimelineEmits, OrionTimelineProps } from './src/OrionTimelineSetup';
import OrionTimelineSetup from './src/OrionTimelineSetup';

export const OrionTimelinePlugin: Plugin = {
	install (app: App, prefix: string = 'o') {
		app.component(`${upperFirst(prefix)}Timeline`, OrionTimeline);
	},
};

export { OrionTimeline, OrionTimelineEmits, OrionTimelineProps, OrionTimelineSetup };

