import { upperFirst } from 'lodash-es';
import { App, Plugin } from 'vue';
import OrionTimelinePill from './src/OrionTimelinePill.vue';
import type { OrionTimelinePillEmits, OrionTimelinePillProps } from './src/OrionTimelinePillSetup';
import OrionTimelinePillSetup from './src/OrionTimelinePillSetup';

export const OrionTimelinePillPlugin: Plugin = {
	install (app: App, prefix: string = 'o') {
		app.component(`${upperFirst(prefix)}TimelinePill`, OrionTimelinePill);
	},
};

export { OrionTimelinePill, OrionTimelinePillEmits, OrionTimelinePillProps, OrionTimelinePillSetup };

