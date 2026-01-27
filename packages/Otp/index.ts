import { upperFirst } from 'lodash-es';
import { App, Plugin } from 'vue';
import OrionOtp from './src/OrionOtp.vue';
import type { OrionOtpEmits, OrionOtpProps } from './src/OrionOtpSetup';
import OrionOtpSetup from './src/OrionOtpSetup';

export const OrionOtpPlugin: Plugin = {
	install (app: App, prefix: string = 'o') {
		app.component(`${upperFirst(prefix)}Otp`, OrionOtp);
	},
};

export { OrionOtp, OrionOtpEmits, OrionOtpProps, OrionOtpSetup };

