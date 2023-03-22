import { App, Plugin } from 'vue';
import { upperFirst } from 'lodash-es';
import OrionInput from './src/OrionInput.vue';
import OrionInputSetupService from './src/OrionInputSetupService';

export const OrionInputPlugin: Plugin = {
	install (app: App, prefix: string = 'o') {
		app.component(`${upperFirst(prefix)}Input`, OrionInput);
	},
};

export { OrionInput, OrionInputSetupService };
