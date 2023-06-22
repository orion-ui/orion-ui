import { App, Plugin } from 'vue';
import { upperFirst } from 'lodash-es';
import OrionCarouselItem from './src/OrionCarouselItem.vue';
import OrionCarouselItemSetupService from './src/OrionCarouselItemSetupService';

export const OrionCarouselItemPlugin: Plugin = {
	install (app: App, prefix: string = 'o') {
		app.component(`${upperFirst(prefix)}CarouselItem`, OrionCarouselItem);
	},
};

export { OrionCarouselItem, OrionCarouselItemSetupService };
