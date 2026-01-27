import { upperFirst } from 'lodash-es';
import { type App, type Plugin } from 'vue';
import OrionField from './src/OrionField.vue';
import { OrionFieldSetup, type OrionFieldEmits, type OrionFieldProps } from './src/OrionFieldSetup';

export const OrionFieldPlugin: Plugin = {
	install (app: App, prefix: string = 'o') {
		app.component(`${upperFirst(prefix)}Field`, OrionField);
	},
};

export { OrionField, OrionFieldSetup, type OrionFieldEmits, type OrionFieldProps };
