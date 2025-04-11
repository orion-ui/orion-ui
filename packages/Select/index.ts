import { App, Plugin } from 'vue';
import { upperFirst } from 'lodash-es';
import OrionSelect from './src/OrionSelect.vue';
import type { OrionSelectEmits, OrionSelectProps } from './src/OrionSelectSetupService';
import OrionSelectSetupService from './src/OrionSelectSetupService';

export const OrionSelectPlugin: Plugin = {
	install (app: App, prefix: string = 'o') {
		app.component(`${upperFirst(prefix)}Select`, OrionSelect);
	},
};

export { OrionSelect, OrionSelectSetupService, OrionSelectEmits, OrionSelectProps };
