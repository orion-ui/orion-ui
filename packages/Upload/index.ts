import { App, Plugin } from 'vue';
import { upperFirst } from 'lodash-es';
import OrionUpload from './src/OrionUpload.vue';
import type { OrionUploadEmits, OrionUploadProps } from './src/OrionUploadSetupService';
import OrionUploadSetupService from './src/OrionUploadSetupService';

export const OrionUploadPlugin: Plugin = {
	install (app: App, prefix: string = 'o') {
		app.component(`${upperFirst(prefix)}Upload`, OrionUpload);
	},
};

export { OrionUpload, OrionUploadSetupService, OrionUploadEmits, OrionUploadProps };
