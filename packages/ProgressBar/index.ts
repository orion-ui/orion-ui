import { upperFirst } from 'lodash-es';
import { type App, type Plugin } from 'vue';
import OrionProgressBar from './src/OrionProgressBar.vue';
import { OrionProgressBarSetup, type OrionProgressBarEmits, type OrionProgressBarProps } from './src/OrionProgressBarSetup';

export const OrionProgressBarPlugin: Plugin = {
	install (app: App, prefix: string = 'o') {
		app.component(`${upperFirst(prefix)}ProgressBar`, OrionProgressBar);
	},
};

export { OrionProgressBar, OrionProgressBarSetup, type OrionProgressBarEmits, type OrionProgressBarProps };
