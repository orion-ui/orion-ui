import { upperFirst } from 'lodash-es';
import { type App, type Plugin } from 'vue';
import OrionCropper from './src/OrionCropper.vue';
import { OrionCropperSetup, type OrionCropperEmits, type OrionCropperProps } from './src/OrionCropperSetup';

export const OrionCropperPlugin: Plugin = {
	install (app: App, prefix: string = 'o') {
		app.component(`${upperFirst(prefix)}Cropper`, OrionCropper);
	},
};

export { OrionCropper, OrionCropperSetup, type OrionCropperEmits, type OrionCropperProps };
