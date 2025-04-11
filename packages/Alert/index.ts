import { App, Plugin } from 'vue';
import { upperFirst } from 'lodash-es';
import OrionAlert from './src/OrionAlert.vue';
import OrionAlertSetupService from './src/OrionAlertSetupService';
import type { OrionAlertEmits, OrionAlertProps } from './src/OrionAlertSetupService';

export const OrionAlertPlugin: Plugin = {
	install (app: App, prefix: string = 'o') {
		app.component(`${upperFirst(prefix)}Alert`, OrionAlert);
	},
};

export { OrionAlert, OrionAlertSetupService, OrionAlertEmits, OrionAlertProps };
