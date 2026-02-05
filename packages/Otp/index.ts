import { upperFirst } from 'lodash-es';
import { type App, type Plugin } from 'vue';
import OrionOtp from './src/OrionOtp.vue';
import { OrionOtpSetup, type OrionOtpEmits, type OrionOtpProps } from './src/OrionOtpSetup';

export const OrionOtpPlugin: Plugin = {
	install (app: App, prefix: string = 'o') {
		app.component(`${upperFirst(prefix)}Otp`, OrionOtp);
	},
};

export { OrionOtp, OrionOtpSetup, type OrionOtpEmits, type OrionOtpProps };
