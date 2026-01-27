import { upperFirst } from 'lodash-es';
import { type App, type Plugin } from 'vue';
import OrionDraggable from './src/OrionDraggable.vue';
import { OrionDraggableSetup, type OrionDraggableEmits, type OrionDraggableProps } from './src/OrionDraggableSetup';

export const OrionDraggablePlugin: Plugin = {
	install (app: App, prefix: string = 'o') {
		app.component(`${upperFirst(prefix)}Draggable`, OrionDraggable);
	},
};

export { OrionDraggable, OrionDraggableSetup, type OrionDraggableEmits, type OrionDraggableProps };
