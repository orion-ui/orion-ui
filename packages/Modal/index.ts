import { upperFirst } from 'lodash-es';
import { type App, type Plugin } from 'vue';
import OrionModal from './src/OrionModal.vue';
import { OrionModalSetup, type OrionModalEmits, type OrionModalProps } from './src/OrionModalSetup';

export const OrionModalPlugin: Plugin = {
	install (app: App, prefix: string = 'o') {
		app.component(`${upperFirst(prefix)}Modal`, OrionModal);
	},
};

export { OrionModal, OrionModalSetup, type OrionModalEmits, type OrionModalProps };
