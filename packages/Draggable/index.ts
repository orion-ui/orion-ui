import { App, Plugin } from 'vue';
import { upperFirst } from 'lodash-es';
import OrionDraggable from './src/OrionDraggable.vue';
import type { OrionDraggableEmits, OrionDraggableProps } from './src/OrionDraggableSetupService';
import OrionDraggableSetupService from './src/OrionDraggableSetupService';

export const OrionDraggablePlugin: Plugin = {
	install (app: App, prefix: string = 'o') {
		app.component(`${upperFirst(prefix)}Draggable`, OrionDraggable);
	},
};

export { OrionDraggable, OrionDraggableSetupService, OrionDraggableEmits, OrionDraggableProps };
