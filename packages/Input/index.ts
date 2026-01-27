import { upperFirst } from 'lodash-es';
import { App, Plugin } from 'vue';
import OrionInput from './src/OrionInput.vue';
import type { OrionInputEmits, OrionInputProps } from './src/OrionInputSetup';
import OrionInputSetup from './src/OrionInputSetup';

export const OrionInputPlugin: Plugin = {
	install (app: App, prefix: string = 'o') {
		app.component(`${upperFirst(prefix)}Input`, OrionInput);
	},
};

export { OrionInput, OrionInputEmits, OrionInputProps, OrionInputSetup };

