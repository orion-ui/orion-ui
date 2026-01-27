import { upperFirst } from 'lodash-es';
import { App, Plugin } from 'vue';
import OrionAlert from './src/OrionAlert.vue';
import type { OrionAlertEmits, OrionAlertProps } from './src/OrionAlertSetup';
import OrionAlertSetup from './src/OrionAlertSetup';

export const OrionAlertPlugin: Plugin = {
	install (app: App, prefix: string = 'o') {
		app.component(`${upperFirst(prefix)}Alert`, OrionAlert);
	},
};

export { OrionAlert, OrionAlertEmits, OrionAlertProps, OrionAlertSetup };

