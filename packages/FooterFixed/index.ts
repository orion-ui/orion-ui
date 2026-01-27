import { upperFirst } from 'lodash-es';
import { App, Plugin } from 'vue';
import OrionFooterFixed from './src/OrionFooterFixed.vue';
import type { OrionFooterFixedEmits, OrionFooterFixedProps } from './src/OrionFooterFixedSetup';
import OrionFooterFixedSetup from './src/OrionFooterFixedSetup';

export const OrionFooterFixedPlugin: Plugin = {
	install (app: App, prefix: string = 'o') {
		app.component(`${upperFirst(prefix)}FooterFixed`, OrionFooterFixed);
	},
};

export { OrionFooterFixed, OrionFooterFixedEmits, OrionFooterFixedProps, OrionFooterFixedSetup };

