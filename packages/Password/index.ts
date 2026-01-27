import { upperFirst } from 'lodash-es';
import { App, Plugin } from 'vue';
import OrionPassword from './src/OrionPassword.vue';
import type { OrionPasswordEmits, OrionPasswordProps } from './src/OrionPasswordSetup';
import OrionPasswordSetup from './src/OrionPasswordSetup';

export const OrionPasswordPlugin: Plugin = {
	install (app: App, prefix: string = 'o') {
		app.component(`${upperFirst(prefix)}Password`, OrionPassword);
	},
};

export { OrionPassword, OrionPasswordEmits, OrionPasswordProps, OrionPasswordSetup };

