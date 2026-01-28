import { upperFirst } from 'lodash-es';
import { type App, type Plugin } from 'vue';
import OrionSwipe from './src/OrionSwipe.vue';
import { OrionSwipeSetup, type OrionSwipeEmits, type OrionSwipeProps } from './src/OrionSwipeSetup';

export const OrionSwipePlugin: Plugin = {
	install (app: App, prefix: string = 'o') {
		app.component(`${upperFirst(prefix)}Swipe`, OrionSwipe);
	},
};

export { OrionSwipe, OrionSwipeSetup, type OrionSwipeEmits, type OrionSwipeProps };
