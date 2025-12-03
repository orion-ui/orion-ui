import { App, Plugin } from 'vue';
import { upperFirst } from 'lodash-es';
import OrionAvatarGroup from './src/OrionAvatarGroup.vue';
import OrionAvatarGroupSetupService from './src/OrionAvatarGroupSetupService';

export const OrionAvatarGroupPlugin: Plugin = {
	install (app: App, prefix: string = 'o') {
		app.component(`${upperFirst(prefix)}AvatarGroup`, OrionAvatarGroup);
	},
};

export { OrionAvatarGroup, OrionAvatarGroupSetupService };
