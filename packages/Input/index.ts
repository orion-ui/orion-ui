import { upperFirst } from 'lodash-es';
import { type App, type Plugin } from 'vue';
import OrionInput from './src/OrionInput.vue';
import { OrionInputSetup, type OrionInputEmits, type OrionInputProps } from './src/OrionInputSetup';

export const OrionInputPlugin: Plugin = {
	install (app: App, prefix: string = 'o') {
		app.component(`${upperFirst(prefix)}Input`, OrionInput);
	},
};

export { OrionInput, OrionInputSetup, type OrionInputEmits, type OrionInputProps };
