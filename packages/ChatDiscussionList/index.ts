import { App, Plugin } from 'vue';
import { upperFirst } from 'lodash-es';
import OrionChatDiscussionList from './src/OrionChatDiscussionList.vue';
import OrionChatDiscussionListSetupService from './src/OrionChatDiscussionListSetupService';

export const OrionChatDiscussionListPlugin: Plugin = {
	install (app: App, prefix: string = 'o') {
		app.component(`${upperFirst(prefix)}ChatDiscussionList`, OrionChatDiscussionList);
	},
};

export { OrionChatDiscussionList, OrionChatDiscussionListSetupService };
