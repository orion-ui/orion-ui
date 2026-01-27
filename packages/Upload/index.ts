import { upperFirst } from 'lodash-es';
import { App, Plugin } from 'vue';
import OrionUpload from './src/OrionUpload.vue';
import type { OrionUploadEmits, OrionUploadProps } from './src/OrionUploadSetup';
import OrionUploadSetup from './src/OrionUploadSetup';

export const OrionUploadPlugin: Plugin = {
	install (app: App, prefix: string = 'o') {
		app.component(`${upperFirst(prefix)}Upload`, OrionUpload);
	},
};

export { OrionUpload, OrionUploadEmits, OrionUploadProps, OrionUploadSetup };

