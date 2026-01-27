import { upperFirst } from 'lodash-es';
import { type App, type Plugin } from 'vue';
import OrionDroppable from './src/OrionDroppable.vue';
import { OrionDroppableSetup, type OrionDroppableEmits, type OrionDroppableProps } from './src/OrionDroppableSetup';

export const OrionDroppablePlugin: Plugin = {
	install (app: App, prefix: string = 'o') {
		app.component(`${upperFirst(prefix)}Droppable`, OrionDroppable);
	},
};

export { OrionDroppable, OrionDroppableSetup, type OrionDroppableEmits, type OrionDroppableProps };
