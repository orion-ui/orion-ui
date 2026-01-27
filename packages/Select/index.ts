import { upperFirst } from 'lodash-es';
import { App, Plugin } from 'vue';
import OrionSelect from './src/OrionSelect.vue';
import type { OrionSelectEmits, OrionSelectProps } from './src/OrionSelectSetup';
import OrionSelectSetup from './src/OrionSelectSetup';

export const OrionSelectPlugin: Plugin = {
	install (app: App, prefix: string = 'o') {
		app.component(`${upperFirst(prefix)}Select`, OrionSelect);
	},
};

export { OrionSelect, OrionSelectEmits, OrionSelectProps, OrionSelectSetup };

