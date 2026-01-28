import { upperFirst } from 'lodash-es';
import { type App, type Plugin } from 'vue';
import OrionTabPane from './src/OrionTabPane.vue';
import { OrionTabPaneSetup, type OrionTabPaneEmits, type OrionTabPaneProps } from './src/OrionTabPaneSetup';

export const OrionTabPanePlugin: Plugin = {
	install (app: App, prefix: string = 'o') {
		app.component(`${upperFirst(prefix)}TabPane`, OrionTabPane);
	},
};

export { OrionTabPane, OrionTabPaneSetup, type OrionTabPaneEmits, type OrionTabPaneProps };
