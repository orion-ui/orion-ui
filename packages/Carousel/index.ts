import { upperFirst } from 'lodash-es';
import { type App, type Plugin } from 'vue';
import OrionCarousel from './src/OrionCarousel.vue';
import { OrionCarouselSetup, type OrionCarouselEmits, type OrionCarouselProps } from './src/OrionCarouselSetup';

export const OrionCarouselPlugin: Plugin = {
	install (app: App, prefix: string = 'o') {
		app.component(`${upperFirst(prefix)}Carousel`, OrionCarousel);
	},
};

export { OrionCarousel, OrionCarouselSetup, type OrionCarouselEmits, type OrionCarouselProps };
