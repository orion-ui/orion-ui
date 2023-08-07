import { App, Plugin } from 'vue';
import { upperFirst } from 'lodash-es';
import OrionOtp from './src/OrionOtp.vue';
import OrionOtpSetupService from './src/OrionOtpSetupService';

export const OrionOtpPlugin: Plugin = {
	install (app: App, prefix: string = 'o') {
		app.component(`${upperFirst(prefix)}Otp`, OrionOtp);
	},
};

export { OrionOtp, OrionOtpSetupService };
