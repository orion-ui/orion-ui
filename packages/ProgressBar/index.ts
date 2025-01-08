import { App, Plugin } from 'vue';
import { upperFirst } from 'lodash-es';
import OrionProgressBar from './src/OrionProgressBar.vue';
import type { OrionProgressBarEmits, OrionProgressBarProps } from './src/OrionProgressBarSetupService';
import OrionProgressBarSetupService from './src/OrionProgressBarSetupService';

export const OrionProgressBarPlugin: Plugin = {
	install (app: App, prefix: string = 'o') {
		app.component(`${upperFirst(prefix)}ProgressBar`, OrionProgressBar);
	},
};

export { OrionProgressBar, OrionProgressBarSetupService, OrionProgressBarEmits, OrionProgressBarProps };
