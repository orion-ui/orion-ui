import { App, Plugin } from 'vue';
import { upperFirst } from 'lodash-es';
import OrionAvatar from './src/OrionAvatar.vue';
import OrionAvatarSetupService from './src/OrionAvatarSetupService';

export const OrionAvatarPlugin: Plugin = {
	install (app: App, prefix: string = 'o') {
		app.component(`${upperFirst(prefix)}Avatar`, OrionAvatar);
	},
};

export { OrionAvatar, OrionAvatarSetupService };
