import { upperFirst } from 'lodash-es';
import { App, Plugin } from 'vue';
import OrionCropper from './src/OrionCropper.vue';
import type { OrionCropperEmits, OrionCropperProps } from './src/OrionCropperSetup';
import OrionCropperSetup from './src/OrionCropperSetup';

export const OrionCropperPlugin: Plugin = {
	install (app: App, prefix: string = 'o') {
		app.component(`${upperFirst(prefix)}Cropper`, OrionCropper);
	},
};

export { OrionCropper, OrionCropperEmits, OrionCropperProps, OrionCropperSetup };

