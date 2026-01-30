import { upperFirst } from 'lodash-es';
import { type App, type Plugin } from 'vue';
import OrionHorizontalScroll from './src/OrionHorizontalScroll.vue';
import { OrionHorizontalScrollSetup, type OrionHorizontalScrollEmits, type OrionHorizontalScrollProps } from './src/OrionHorizontalScrollSetup';

export const OrionHorizontalScrollPlugin: Plugin = {
	install (app: App, prefix: string = 'o') {
		app.component(`${upperFirst(prefix)}HorizontalScroll`, OrionHorizontalScroll);
	},
};

export { OrionHorizontalScroll, OrionHorizontalScrollSetup, type OrionHorizontalScrollEmits, type OrionHorizontalScrollProps };
