import { upperFirst } from 'lodash-es';
import { type App, type Plugin } from 'vue';
import OrionCarouselItem from './src/OrionCarouselItem.vue';
import { OrionCarouselItemSetup, type OrionCarouselItemEmits, type OrionCarouselItemProps } from './src/OrionCarouselItemSetup';

export const OrionCarouselItemPlugin: Plugin = {
	install (app: App, prefix: string = 'o') {
		app.component(`${upperFirst(prefix)}CarouselItem`, OrionCarouselItem);
	},
};

export { OrionCarouselItem, OrionCarouselItemSetup, type OrionCarouselItemEmits, type OrionCarouselItemProps };
