import { App, Plugin } from 'vue';
import { upperFirst } from 'lodash-es';
import OrionPaginate from './src/OrionPaginate.vue';
import type { OrionPaginateEmits, OrionPaginateProps } from './src/OrionPaginateSetupService';
import OrionPaginateSetupService from './src/OrionPaginateSetupService';

export const OrionPaginatePlugin: Plugin = {
	install (app: App, prefix: string = 'o') {
		app.component(`${upperFirst(prefix)}Paginate`, OrionPaginate);
	},
};

export { OrionPaginate, OrionPaginateSetupService, OrionPaginateEmits, OrionPaginateProps };
