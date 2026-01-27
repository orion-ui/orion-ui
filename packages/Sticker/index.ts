import { upperFirst } from 'lodash-es';
import { App, Plugin } from 'vue';
import OrionSticker from './src/OrionSticker.vue';
import type { OrionStickerEmits, OrionStickerProps } from './src/OrionStickerSetup';
import OrionStickerSetup from './src/OrionStickerSetup';

export const OrionStickerPlugin: Plugin = {
	install (app: App, prefix: string = 'o') {
		app.component(`${upperFirst(prefix)}Sticker`, OrionSticker);
	},
};

export { OrionSticker, OrionStickerEmits, OrionStickerProps, OrionStickerSetup };

