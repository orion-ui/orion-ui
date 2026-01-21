import { upperFirst } from 'lodash-es';
import { App, Plugin } from 'vue';
import OrionAvatarGroup from './src/OrionAvatarGroup.vue';
import type { OrionAvatarGroupEmits, OrionAvatarGroupProps } from './src/OrionAvatarGroupSetupService';
import OrionAvatarGroupSetupService from './src/OrionAvatarGroupSetupService';

export const OrionAvatarGroupPlugin: Plugin = {
	install (app: App, prefix: string = 'o') {
		app.component(`${upperFirst(prefix)}AvatarGroup`, OrionAvatarGroup);
	},
};

export { OrionAvatarGroup, OrionAvatarGroupEmits, OrionAvatarGroupProps, OrionAvatarGroupSetupService };

