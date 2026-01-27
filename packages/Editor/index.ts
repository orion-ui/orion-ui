import { upperFirst } from 'lodash-es';
import { App, Plugin } from 'vue';
import OrionEditor from './src/OrionEditor.vue';
import type { OrionEditorEmits, OrionEditorProps } from './src/OrionEditorSetup';
import OrionEditorSetup from './src/OrionEditorSetup';

export const OrionEditorPlugin: Plugin = {
	install (app: App, prefix: string = 'o') {
		app.component(`${upperFirst(prefix)}Editor`, OrionEditor);
	},
};

export { OrionEditor, OrionEditorEmits, OrionEditorProps, OrionEditorSetup };

