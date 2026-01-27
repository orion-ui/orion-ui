import { upperFirst } from 'lodash-es';
import { App, Plugin } from 'vue';
import OrionDroppable from './src/OrionDroppable.vue';
import type { OrionDroppableEmits, OrionDroppableProps } from './src/OrionDroppableSetup';
import OrionDroppableSetup from './src/OrionDroppableSetup';

export const OrionDroppablePlugin: Plugin = {
	install (app: App, prefix: string = 'o') {
		app.component(`${upperFirst(prefix)}Droppable`, OrionDroppable);
	},
};

export { OrionDroppable, OrionDroppableEmits, OrionDroppableProps, OrionDroppableSetup };

