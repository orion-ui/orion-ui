import { upperFirst } from 'lodash-es';
import { App, Plugin } from 'vue';
import OrionHorizontalScroll from './src/OrionHorizontalScroll.vue';
import type { OrionHorizontalScrollEmits, OrionHorizontalScrollProps } from './src/OrionHorizontalScrollSetup';
import OrionHorizontalScrollSetup from './src/OrionHorizontalScrollSetup';

export const OrionHorizontalScrollPlugin: Plugin = {
	install (app: App, prefix: string = 'o') {
		app.component(`${upperFirst(prefix)}HorizontalScroll`, OrionHorizontalScroll);
	},
};

export { OrionHorizontalScroll, OrionHorizontalScrollEmits, OrionHorizontalScrollProps, OrionHorizontalScrollSetup };

