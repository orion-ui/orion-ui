import { App, Plugin } from 'vue';
import { upperFirst } from 'lodash-es';
import OrionOverlay from './src/OrionOverlay.vue';
import OrionOverlaySetupService from './src/OrionOverlaySetupService';

export const OrionOverlayPlugin: Plugin = {
	install (app: App, prefix: string = 'o') {
		app.component(`${upperFirst(prefix)}Overlay`, OrionOverlay);
	},
};

export { OrionOverlay, OrionOverlaySetupService };
