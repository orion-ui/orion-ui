import { upperFirst } from 'lodash-es';
import { App, Plugin } from 'vue';
import OrionModal from './src/OrionModal.vue';
import type { OrionModalEmits, OrionModalProps } from './src/OrionModalSetup';
import OrionModalSetup from './src/OrionModalSetup';

export const OrionModalPlugin: Plugin = {
	install (app: App, prefix: string = 'o') {
		app.component(`${upperFirst(prefix)}Modal`, OrionModal);
	},
};

export { OrionModal, OrionModalEmits, OrionModalProps, OrionModalSetup };

