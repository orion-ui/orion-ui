import { upperFirst } from 'lodash-es';
import { App, Plugin } from 'vue';
import OrionDateTable from './src/OrionDateTable.vue';
import type { OrionDateTableEmits, OrionDateTableProps } from './src/OrionDateTableSetup';
import OrionDateTableSetup from './src/OrionDateTableSetup';

export const OrionDateTablePlugin: Plugin = {
	install (app: App, prefix: string = 'o') {
		app.component(`${upperFirst(prefix)}DateTable`, OrionDateTable);
	},
};

export { OrionDateTable, OrionDateTableEmits, OrionDateTableProps, OrionDateTableSetup };

