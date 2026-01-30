import { upperFirst } from 'lodash-es';
import { type App, type Plugin } from 'vue';
import OrionNotif from './src/OrionNotif.vue';
import { OrionNotifSetup, type OrionNotifEmits, type OrionNotifProps } from './src/OrionNotifSetup';

export const OrionNotifPlugin: Plugin = {
	install (app: App, prefix: string = 'o') {
		app.component(`${upperFirst(prefix)}Notif`, OrionNotif);
	},
};

export { OrionNotif, OrionNotifSetup, type OrionNotifEmits, type OrionNotifProps };
