import { App, Plugin } from 'vue';
import { upperFirst } from 'lodash-es';
import OrionTextarea from './src/OrionTextarea.vue';
import OrionTextareaSetupService from './src/OrionTextareaSetupService';

export const OrionTextareaPlugin: Plugin = {
	install (app: App, prefix: string = 'o') {
		app.component(`${upperFirst(prefix)}Textarea`, OrionTextarea);
	},
};

export { OrionTextarea, OrionTextareaSetupService };
