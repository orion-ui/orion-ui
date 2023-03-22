import { App, Plugin } from 'vue';
import { upperFirst } from 'lodash-es';
import OrionPhone from './src/OrionPhone.vue';
import OrionPhoneSetupService from './src/OrionPhoneSetupService';

export const OrionPhonePlugin: Plugin = {
	install (app: App, prefix: string = 'o') {
		app.component(`${upperFirst(prefix)}Phone`, OrionPhone);
	},
};

export { OrionPhone, OrionPhoneSetupService };
