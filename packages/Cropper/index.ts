import { App, Plugin } from 'vue';
import { upperFirst } from 'lodash-es';
import OrionCropper from './src/OrionCropper.vue';
import type { OrionCropperEmits, OrionCropperProps } from './src/OrionCropperSetupService';
import OrionCropperSetupService from './src/OrionCropperSetupService';

export const OrionCropperPlugin: Plugin = {
	install (app: App, prefix: string = 'o') {
		app.component(`${upperFirst(prefix)}Cropper`, OrionCropper);
	},
};

export { OrionCropper, OrionCropperSetupService, OrionCropperEmits, OrionCropperProps};
