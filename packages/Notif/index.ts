import { upperFirst } from 'lodash-es';
import { App, Plugin } from 'vue';
import OrionNotif from './src/OrionNotif.vue';
import type { OrionNotifEmits, OrionNotifProps } from './src/OrionNotifSetup';
import OrionNotifSetup from './src/OrionNotifSetup';

export const OrionNotifPlugin: Plugin = {
	install (app: App, prefix: string = 'o') {
		app.component(`${upperFirst(prefix)}Notif`, OrionNotif);
	},
};

export { OrionNotif, OrionNotifEmits, OrionNotifProps, OrionNotifSetup };

