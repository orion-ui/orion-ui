import { App, Plugin } from 'vue';
import { upperFirst } from 'lodash-es';
import OrionChips from './src/OrionChips.vue';
import type { OrionChipsEmits, OrionChipsProps } from './src/OrionChipsSetupService';
import OrionChipsSetupService from './src/OrionChipsSetupService';

export const OrionChipsPlugin: Plugin = {
	install (app: App, prefix: string = 'o') {
		app.component(`${upperFirst(prefix)}Chips`, OrionChips);
	},
};

export { OrionChips, OrionChipsSetupService, OrionChipsEmits, OrionChipsProps };
