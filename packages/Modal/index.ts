import { App, Plugin } from 'vue';
import { upperFirst } from 'lodash-es';
import OrionModal from './src/OrionModal.vue';
import OrionModalSetupService from './src/OrionModalSetupService';

export const OrionModalPlugin: Plugin = {
	install (app: App, prefix: string = 'o') {
		app.component(`${upperFirst(prefix)}Modal`, OrionModal);
	},
};

export { OrionModal, OrionModalSetupService };
