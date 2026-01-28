import { upperFirst } from 'lodash-es';
import { type App, type Plugin } from 'vue';
import OrionUpload from './src/OrionUpload.vue';
import { OrionUploadSetup, type OrionUploadEmits, type OrionUploadProps } from './src/OrionUploadSetup';

export const OrionUploadPlugin: Plugin = {
	install (app: App, prefix: string = 'o') {
		app.component(`${upperFirst(prefix)}Upload`, OrionUpload);
	},
};

export { OrionUpload, OrionUploadSetup, type OrionUploadEmits, type OrionUploadProps };
