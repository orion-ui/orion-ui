import { App, Plugin } from 'vue';
import { upperFirst } from 'lodash-es';
import OrionDateTable from './src/OrionDateTable.vue';
import type { OrionDateTableEmits, OrionDateTableProps } from './src/OrionDateTableSetupService';
import OrionDateTableSetupService from './src/OrionDateTableSetupService';

export const OrionDateTablePlugin: Plugin = {
	install (app: App, prefix: string = 'o') {
		app.component(`${upperFirst(prefix)}DateTable`, OrionDateTable);
	},
};

export { OrionDateTable, OrionDateTableSetupService, OrionDateTableEmits, OrionDateTableProps };
