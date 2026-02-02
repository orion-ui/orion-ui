import { upperFirst } from 'lodash-es';
import { type App, type Plugin } from 'vue';
import OrionOverlay from './src/OrionOverlay.vue';
import { OrionOverlaySetup, type OrionOverlayEmits, type OrionOverlayProps } from './src/OrionOverlaySetup';

export const OrionOverlayPlugin: Plugin = {
	install (app: App, prefix: string = 'o') {
		app.component(`${upperFirst(prefix)}Overlay`, OrionOverlay);
	},
};

export { OrionOverlay, OrionOverlaySetup, type OrionOverlayEmits, type OrionOverlayProps };
