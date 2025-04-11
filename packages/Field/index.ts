import { App, Plugin } from 'vue';
import { upperFirst } from 'lodash-es';
import OrionField from './src/OrionField.vue';
import type { OrionFieldEmits, OrionFieldProps } from './src/OrionFieldSetupService';
import OrionFieldSetupService from './src/OrionFieldSetupService';

export const OrionFieldPlugin: Plugin = {
	install (app: App, prefix: string = 'o') {
		app.component(`${upperFirst(prefix)}Field`, OrionField);
	},
};

export { OrionField, OrionFieldSetupService, OrionFieldEmits, OrionFieldProps };
