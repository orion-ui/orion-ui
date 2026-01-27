import { upperFirst } from 'lodash-es';
import { App, Plugin } from 'vue';
import OrionPhone from './src/OrionPhone.vue';
import type { OrionPhoneEmits, OrionPhoneProps } from './src/OrionPhoneSetup';
import OrionPhoneSetup from './src/OrionPhoneSetup';

export const OrionPhonePlugin: Plugin = {
	install (app: App, prefix: string = 'o') {
		app.component(`${upperFirst(prefix)}Phone`, OrionPhone);
	},
};

export { OrionPhone, OrionPhoneEmits, OrionPhoneProps, OrionPhoneSetup };

