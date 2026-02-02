import { upperFirst } from 'lodash-es';
import { type App, type Plugin } from 'vue';
import OrionTimelinePill from './src/OrionTimelinePill.vue';
import { OrionTimelinePillSetup, type OrionTimelinePillEmits, type OrionTimelinePillProps } from './src/OrionTimelinePillSetup';

export const OrionTimelinePillPlugin: Plugin = {
	install (app: App, prefix: string = 'o') {
		app.component(`${upperFirst(prefix)}TimelinePill`, OrionTimelinePill);
	},
};

export { OrionTimelinePill, OrionTimelinePillSetup, type OrionTimelinePillEmits, type OrionTimelinePillProps };
