import { upperFirst } from 'lodash-es';
import { App, Plugin } from 'vue';
import OrionChips from './src/OrionChips.vue';
import type { OrionChipsEmits, OrionChipsProps } from './src/OrionChipsSetup';
import OrionChipsSetup from './src/OrionChipsSetup';

export const OrionChipsPlugin: Plugin = {
	install (app: App, prefix: string = 'o') {
		app.component(`${upperFirst(prefix)}Chips`, OrionChips);
	},
};

export { OrionChips, OrionChipsEmits, OrionChipsProps, OrionChipsSetup };

