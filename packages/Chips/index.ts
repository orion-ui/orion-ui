import { upperFirst } from 'lodash-es';
import { type App, type Plugin } from 'vue';
import OrionChips from './src/OrionChips.vue';
import { OrionChipsSetup, type OrionChipsEmits, type OrionChipsProps } from './src/OrionChipsSetup';

export const OrionChipsPlugin: Plugin = {
	install (app: App, prefix: string = 'o') {
		app.component(`${upperFirst(prefix)}Chips`, OrionChips);
	},
};

export { OrionChips, OrionChipsSetup, type OrionChipsEmits, type OrionChipsProps };
