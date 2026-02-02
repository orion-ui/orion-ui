import { upperFirst } from 'lodash-es';
import { type App, type Plugin } from 'vue';
import OrionEditor from './src/OrionEditor.vue';
import { OrionEditorSetup, type OrionEditorEmits, type OrionEditorProps } from './src/OrionEditorSetup';

export const OrionEditorPlugin: Plugin = {
	install (app: App, prefix: string = 'o') {
		app.component(`${upperFirst(prefix)}Editor`, OrionEditor);
	},
};

export { OrionEditor, OrionEditorSetup, type OrionEditorEmits, type OrionEditorProps };
