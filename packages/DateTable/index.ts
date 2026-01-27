import { upperFirst } from 'lodash-es';
import { type App, type Plugin } from 'vue';
import OrionDateTable from './src/OrionDateTable.vue';
import { OrionDateTableSetup, type OrionDateTableEmits, type OrionDateTableProps } from './src/OrionDateTableSetup';

export const OrionDateTablePlugin: Plugin = {
	install (app: App, prefix: string = 'o') {
		app.component(`${upperFirst(prefix)}DateTable`, OrionDateTable);
	},
};

export { OrionDateTable, OrionDateTableSetup, type OrionDateTableEmits, type OrionDateTableProps };
