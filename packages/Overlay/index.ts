import { upperFirst } from 'lodash-es';
import { App, Plugin } from 'vue';
import OrionOverlay from './src/OrionOverlay.vue';
import type { OrionOverlayEmits, OrionOverlayProps } from './src/OrionOverlaySetup';
import OrionOverlaySetup from './src/OrionOverlaySetup';

export const OrionOverlayPlugin: Plugin = {
	install (app: App, prefix: string = 'o') {
		app.component(`${upperFirst(prefix)}Overlay`, OrionOverlay);
	},
};

export { OrionOverlay, OrionOverlayEmits, OrionOverlayProps, OrionOverlaySetup };

