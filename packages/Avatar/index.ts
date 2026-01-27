import { upperFirst } from 'lodash-es';
import { App, Plugin } from 'vue';
import OrionAvatar from './src/OrionAvatar.vue';
import type { OrionAvatarEmits, OrionAvatarProps } from './src/OrionAvatarSetup';
import OrionAvatarSetup from './src/OrionAvatarSetup';

export const OrionAvatarPlugin: Plugin = {
	install (app: App, prefix: string = 'o') {
		app.component(`${upperFirst(prefix)}Avatar`, OrionAvatar);
	},
};

export { OrionAvatar, OrionAvatarEmits, OrionAvatarProps, OrionAvatarSetup };

