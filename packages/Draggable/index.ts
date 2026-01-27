import { upperFirst } from 'lodash-es';
import { App, Plugin } from 'vue';
import OrionDraggable from './src/OrionDraggable.vue';
import type { OrionDraggableEmits, OrionDraggableProps } from './src/OrionDraggableSetup';
import OrionDraggableSetup from './src/OrionDraggableSetup';

export const OrionDraggablePlugin: Plugin = {
	install (app: App, prefix: string = 'o') {
		app.component(`${upperFirst(prefix)}Draggable`, OrionDraggable);
	},
};

export { OrionDraggable, OrionDraggableEmits, OrionDraggableProps, OrionDraggableSetup };

