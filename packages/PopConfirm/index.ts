import { upperFirst } from 'lodash-es';
import { App, Plugin } from 'vue';
import OrionPopConfirm from './src/OrionPopConfirm.vue';
import type { OrionPopConfirmEmits, OrionPopConfirmProps } from './src/OrionPopConfirmSetup';
import OrionPopConfirmSetup from './src/OrionPopConfirmSetup';

export const OrionPopConfirmPlugin: Plugin = {
	install (app: App, prefix: string = 'o') {
		app.component(`${upperFirst(prefix)}PopConfirm`, OrionPopConfirm);
	},
};

export { OrionPopConfirm, OrionPopConfirmEmits, OrionPopConfirmProps, OrionPopConfirmSetup };

