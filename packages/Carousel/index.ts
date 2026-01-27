import { upperFirst } from 'lodash-es';
import { App, Plugin } from 'vue';
import OrionCarousel from './src/OrionCarousel.vue';
import type { OrionCarouselEmits, OrionCarouselProps } from './src/OrionCarouselSetup';
import OrionCarouselSetup from './src/OrionCarouselSetup';

export const OrionCarouselPlugin: Plugin = {
	install (app: App, prefix: string = 'o') {
		app.component(`${upperFirst(prefix)}Carousel`, OrionCarousel);
	},
};

export { OrionCarousel, OrionCarouselEmits, OrionCarouselProps, OrionCarouselSetup };

