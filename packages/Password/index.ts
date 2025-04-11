import { App, Plugin } from 'vue';
import { upperFirst } from 'lodash-es';
import OrionPassword from './src/OrionPassword.vue';
import type { OrionPasswordEmits, OrionPasswordProps } from './src/OrionPasswordSetupService';
import OrionPasswordSetupService from './src/OrionPasswordSetupService';

export const OrionPasswordPlugin: Plugin = {
	install (app: App, prefix: string = 'o') {
		app.component(`${upperFirst(prefix)}Password`, OrionPassword);
	},
};

export { OrionPassword, OrionPasswordSetupService, OrionPasswordEmits, OrionPasswordProps };
