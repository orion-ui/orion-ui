import { upperFirst } from 'lodash-es';
import { type App, type Plugin } from 'vue';
import OrionSticker from './src/OrionSticker.vue';
import { OrionStickerSetup, type OrionStickerEmits, type OrionStickerProps } from './src/OrionStickerSetup';

export const OrionStickerPlugin: Plugin = {
	install (app: App, prefix: string = 'o') {
		app.component(`${upperFirst(prefix)}Sticker`, OrionSticker);
	},
};

export { OrionSticker, OrionStickerSetup, type OrionStickerEmits, type OrionStickerProps };
