import { App, Plugin } from 'vue';
import { upperFirst } from 'lodash-es';
import OrionCarousel from './src/OrionCarousel.vue';
import type { OrionCarouselEmits, OrionCarouselProps } from './src/OrionCarouselSetupService';
import OrionCarouselSetupService from './src/OrionCarouselSetupService';

export const OrionCarouselPlugin: Plugin = {
	install (app: App, prefix: string = 'o') {
		app.component(`${upperFirst(prefix)}Carousel`, OrionCarousel);
	},
};

export { OrionCarousel, OrionCarouselSetupService, OrionCarouselEmits, OrionCarouselProps  };
