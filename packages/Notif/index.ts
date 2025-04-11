import { App, Plugin } from 'vue';
import { upperFirst } from 'lodash-es';
import OrionNotif from './src/OrionNotif.vue';
import type { OrionNotifEmits, OrionNotifProps } from './src/OrionNotifSetupService';
import OrionNotifSetupService from './src/OrionNotifSetupService';

export const OrionNotifPlugin: Plugin = {
	install (app: App, prefix: string = 'o') {
		app.component(`${upperFirst(prefix)}Notif`, OrionNotif);
	},
};

export { OrionNotif, OrionNotifSetupService, OrionNotifEmits, OrionNotifProps };
