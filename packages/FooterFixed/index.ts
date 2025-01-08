import { App, Plugin } from 'vue';
import { upperFirst } from 'lodash-es';
import OrionFooterFixed from './src/OrionFooterFixed.vue';
import type { OrionFooterFixedEmits, OrionFooterFixedProps } from './src/OrionFooterFixedSetupService';
import OrionFooterFixedSetupService from './src/OrionFooterFixedSetupService';

export const OrionFooterFixedPlugin: Plugin = {
	install (app: App, prefix: string = 'o') {
		app.component(`${upperFirst(prefix)}FooterFixed`, OrionFooterFixed);
	},
};

export { OrionFooterFixed, OrionFooterFixedSetupService, OrionFooterFixedEmits, OrionFooterFixedProps };
