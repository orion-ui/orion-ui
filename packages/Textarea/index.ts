import { upperFirst } from 'lodash-es';
import { App, Plugin } from 'vue';
import OrionTextarea from './src/OrionTextarea.vue';
import type { OrionTextareaEmits, OrionTextareaProps } from './src/OrionTextareaSetup';
import OrionTextareaSetup from './src/OrionTextareaSetup';

export const OrionTextareaPlugin: Plugin = {
	install (app: App, prefix: string = 'o') {
		app.component(`${upperFirst(prefix)}Textarea`, OrionTextarea);
	},
};

export { OrionTextarea, OrionTextareaEmits, OrionTextareaProps, OrionTextareaSetup };

