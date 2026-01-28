import { upperFirst } from 'lodash-es';
import { type App, type Plugin } from 'vue';
import OrionPassword from './src/OrionPassword.vue';
import { OrionPasswordSetup, type OrionPasswordEmits, type OrionPasswordProps } from './src/OrionPasswordSetup';

export const OrionPasswordPlugin: Plugin = {
	install (app: App, prefix: string = 'o') {
		app.component(`${upperFirst(prefix)}Password`, OrionPassword);
	},
};

export { OrionPassword, OrionPasswordSetup, type OrionPasswordEmits, type OrionPasswordProps };
