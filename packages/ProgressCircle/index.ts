import { upperFirst } from 'lodash-es';
import { type App, type Plugin } from 'vue';
import OrionProgressCircle from './src/OrionProgressCircle.vue';
import { OrionProgressCircleSetup, type OrionProgressCircleEmits, type OrionProgressCircleProps } from './src/OrionProgressCircleSetup';

export const OrionProgressCirclePlugin: Plugin = {
	install (app: App, prefix: string = 'o') {
		app.component(`${upperFirst(prefix)}ProgressCircle`, OrionProgressCircle);
	},
};

export { OrionProgressCircle, OrionProgressCircleSetup, type OrionProgressCircleEmits, type OrionProgressCircleProps };
