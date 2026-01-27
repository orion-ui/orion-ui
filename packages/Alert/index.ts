import { upperFirst } from 'lodash-es';
import { type App, type Plugin } from 'vue';
import OrionAlert from './src/OrionAlert.vue';
import { OrionAlertSetup, type OrionAlertEmits, type OrionAlertProps } from './src/OrionAlertSetup';

export const OrionAlertPlugin: Plugin = {
	install (app: App, prefix: string = 'o') {
		app.component(`${upperFirst(prefix)}Alert`, OrionAlert);
	},
};

export { OrionAlert, OrionAlertSetup, type OrionAlertEmits, type OrionAlertProps };
