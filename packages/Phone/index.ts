import { upperFirst } from 'lodash-es';
import { type App, type Plugin } from 'vue';
import OrionPhone from './src/OrionPhone.vue';
import { OrionPhoneSetup, type OrionPhoneEmits, type OrionPhoneProps } from './src/OrionPhoneSetup';

export const OrionPhonePlugin: Plugin = {
	install (app: App, prefix: string = 'o') {
		app.component(`${upperFirst(prefix)}Phone`, OrionPhone);
	},
};

export { OrionPhone, OrionPhoneSetup, type OrionPhoneEmits, type OrionPhoneProps };
