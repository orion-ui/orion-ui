import { App, Plugin } from 'vue';
import { upperFirst } from 'lodash-es';
import OrionEditor from './src/OrionEditor.vue';
import OrionEditorSetupService from './src/OrionEditorSetupService';

export const OrionEditorPlugin: Plugin = {
	install (app: App, prefix: string = 'o') {
		app.component(`${upperFirst(prefix)}Editor`, OrionEditor);
	},
};

export { OrionEditor, OrionEditorSetupService };
