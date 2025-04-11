import { App, Plugin } from 'vue';
import { upperFirst } from 'lodash-es';
import OrionSticker from './src/OrionSticker.vue';
import type { OrionStickerEmits, OrionStickerProps } from './src/OrionStickerSetupService';
import OrionStickerSetupService from './src/OrionStickerSetupService';

export const OrionStickerPlugin: Plugin = {
	install (app: App, prefix: string = 'o') {
		app.component(`${upperFirst(prefix)}Sticker`, OrionSticker);
	},
};

export { OrionSticker, OrionStickerSetupService, OrionStickerEmits, OrionStickerProps };
