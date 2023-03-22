import { App, Plugin } from 'vue';
import { upperFirst } from 'lodash-es';
import OrionSwipe from './src/OrionSwipe.vue';
import OrionSwipeSetupService from './src/OrionSwipeSetupService';

export const OrionSwipePlugin: Plugin = {
	install (app: App, prefix: string = 'o') {
		app.component(`${upperFirst(prefix)}Swipe`, OrionSwipe);
	},
};

export { OrionSwipe, OrionSwipeSetupService };
