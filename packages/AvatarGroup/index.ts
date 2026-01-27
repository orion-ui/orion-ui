import { upperFirst } from 'lodash-es';
import { type App, type Plugin } from 'vue';
import OrionAvatarGroup from './src/OrionAvatarGroup.vue';
import { OrionAvatarGroupSetup, type OrionAvatarGroupEmits, type OrionAvatarGroupProps } from './src/OrionAvatarGroupSetup';

export const OrionAvatarGroupPlugin: Plugin = {
	install (app: App, prefix: string = 'o') {
		app.component(`${upperFirst(prefix)}AvatarGroup`, OrionAvatarGroup);
	},
};

export { OrionAvatarGroup, OrionAvatarGroupSetup, type OrionAvatarGroupEmits, type OrionAvatarGroupProps };
