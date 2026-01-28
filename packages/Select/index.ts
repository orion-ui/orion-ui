import { upperFirst } from 'lodash-es';
import { type App, type Plugin } from 'vue';
import OrionSelect from './src/OrionSelect.vue';
import { OrionSelectSetup, type OrionSelectEmits, type OrionSelectProps } from './src/OrionSelectSetup';

export const OrionSelectPlugin: Plugin = {
	install (app: App, prefix: string = 'o') {
		app.component(`${upperFirst(prefix)}Select`, OrionSelect);
	},
};

export { OrionSelect, OrionSelectSetup, type OrionSelectEmits, type OrionSelectProps };
