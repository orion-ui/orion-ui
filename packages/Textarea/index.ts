import { upperFirst } from 'lodash-es';
import { type App, type Plugin } from 'vue';
import OrionTextarea from './src/OrionTextarea.vue';
import { OrionTextareaSetup, type OrionTextareaEmits, type OrionTextareaProps } from './src/OrionTextareaSetup';

export const OrionTextareaPlugin: Plugin = {
	install (app: App, prefix: string = 'o') {
		app.component(`${upperFirst(prefix)}Textarea`, OrionTextarea);
	},
};

export { OrionTextarea, OrionTextareaSetup, type OrionTextareaEmits, type OrionTextareaProps };
