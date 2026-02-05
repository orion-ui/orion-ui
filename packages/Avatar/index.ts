import { upperFirst } from 'lodash-es';
import { type App, type Plugin } from 'vue';
import OrionAvatar from './src/OrionAvatar.vue';
import { OrionAvatarSetup, type OrionAvatarEmits, type OrionAvatarProps } from './src/OrionAvatarSetup';

export const OrionAvatarPlugin: Plugin = {
	install (app: App, prefix: string = 'o') {
		app.component(`${upperFirst(prefix)}Avatar`, OrionAvatar);
	},
};

export { OrionAvatar, OrionAvatarSetup, type OrionAvatarEmits, type OrionAvatarProps };
