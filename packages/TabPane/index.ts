import { upperFirst } from 'lodash-es';
import { App, Plugin } from 'vue';
import OrionTabPane from './src/OrionTabPane.vue';
import type { OrionTabPaneEmits, OrionTabPaneProps } from './src/OrionTabPaneSetup';
import OrionTabPaneSetup from './src/OrionTabPaneSetup';

export const OrionTabPanePlugin: Plugin = {
	install (app: App, prefix: string = 'o') {
		app.component(`${upperFirst(prefix)}TabPane`, OrionTabPane);
	},
};

export { OrionTabPane, OrionTabPaneEmits, OrionTabPaneProps, OrionTabPaneSetup };

