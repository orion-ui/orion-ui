import { upperFirst } from 'lodash-es';
import { App, Plugin } from 'vue';
import OrionSwipe from './src/OrionSwipe.vue';
import type { OrionSwipeEmits, OrionSwipeProps } from './src/OrionSwipeSetup';
import OrionSwipeSetup from './src/OrionSwipeSetup';

export const OrionSwipePlugin: Plugin = {
	install (app: App, prefix: string = 'o') {
		app.component(`${upperFirst(prefix)}Swipe`, OrionSwipe);
	},
};

export { OrionSwipe, OrionSwipeEmits, OrionSwipeProps, OrionSwipeSetup };

