import { App, Plugin } from 'vue';
import { upperFirst } from 'lodash-es';
import OrionBadge from './src/OrionBadge.vue';
import type { OrionBadgeEmits, OrionBadgeProps } from './src/OrionBadgeSetupService';
import OrionBadgeSetupService from './src/OrionBadgeSetupService';

export const OrionBadgePlugin: Plugin = {
	install (app: App, prefix: string = 'o') {
		app.component(`${upperFirst(prefix)}Badge`, OrionBadge);
	},
};

export { OrionBadge, OrionBadgeSetupService, OrionBadgeEmits, OrionBadgeProps };
