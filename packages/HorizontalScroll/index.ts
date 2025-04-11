import { App, Plugin } from 'vue';
import { upperFirst } from 'lodash-es';
import OrionHorizontalScroll from './src/OrionHorizontalScroll.vue';
import type { OrionHorizontalScrollEmits, OrionHorizontalScrollProps } from './src/OrionHorizontalScrollSetupService';
import OrionHorizontalScrollSetupService from './src/OrionHorizontalScrollSetupService';

export const OrionHorizontalScrollPlugin: Plugin = {
	install (app: App, prefix: string = 'o') {
		app.component(`${upperFirst(prefix)}HorizontalScroll`, OrionHorizontalScroll);
	},
};

export { OrionHorizontalScroll, OrionHorizontalScrollSetupService, OrionHorizontalScrollEmits, OrionHorizontalScrollProps };
