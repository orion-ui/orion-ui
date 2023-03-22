import { App, Plugin } from 'vue';
import { upperFirst } from 'lodash-es';
import OrionTimelinePill from './src/OrionTimelinePill.vue';
import OrionTimelinePillSetupService from './src/OrionTimelinePillSetupService';

export const OrionTimelinePillPlugin: Plugin = {
	install (app: App, prefix: string = 'o') {
		app.component(`${upperFirst(prefix)}TimelinePill`, OrionTimelinePill);
	},
};

export { OrionTimelinePill, OrionTimelinePillSetupService };
