import { upperFirst } from 'lodash-es';
import { App, Plugin } from 'vue';
import OrionProgressBar from './src/OrionProgressBar.vue';
import type { OrionProgressBarEmits, OrionProgressBarProps } from './src/OrionProgressBarSetup';
import OrionProgressBarSetup from './src/OrionProgressBarSetup';

export const OrionProgressBarPlugin: Plugin = {
	install (app: App, prefix: string = 'o') {
		app.component(`${upperFirst(prefix)}ProgressBar`, OrionProgressBar);
	},
};

export { OrionProgressBar, OrionProgressBarEmits, OrionProgressBarProps, OrionProgressBarSetup };

