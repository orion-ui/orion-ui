import { upperFirst } from 'lodash-es';
import { type App, type Plugin } from 'vue';
import OrionPopConfirm from './src/OrionPopConfirm.vue';
import { OrionPopConfirmSetup, type OrionPopConfirmEmits, type OrionPopConfirmProps } from './src/OrionPopConfirmSetup';

export const OrionPopConfirmPlugin: Plugin = {
	install (app: App, prefix: string = 'o') {
		app.component(`${upperFirst(prefix)}PopConfirm`, OrionPopConfirm);
	},
};

export { OrionPopConfirm, OrionPopConfirmSetup, type OrionPopConfirmEmits, type OrionPopConfirmProps };
