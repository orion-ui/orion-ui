import { upperFirst } from 'lodash-es';
import { App, Plugin } from 'vue';
import OrionField from './src/OrionField.vue';
import type { OrionFieldEmits, OrionFieldProps } from './src/OrionFieldSetup';
import OrionFieldSetup from './src/OrionFieldSetup';

export const OrionFieldPlugin: Plugin = {
	install (app: App, prefix: string = 'o') {
		app.component(`${upperFirst(prefix)}Field`, OrionField);
	},
};

export { OrionField, OrionFieldEmits, OrionFieldProps, OrionFieldSetup };

