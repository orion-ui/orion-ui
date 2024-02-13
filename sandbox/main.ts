// /// <reference path="../lib/monkey-patching.d.ts" />

import { createApp } from 'vue';
import App from './App.vue';
import router from './router/index.router';
import Orion from '../lib';
// import orionAppService from 'utils/Orion';

const sandboxApp = createApp(App)
	.use(router)
	.use(Orion, {
		use: ['components'],
		router,
		/* popableAnimationHooks: {
			asideEnterBefore: () => {
				(orionAppService.appContext.app._container as HTMLElement)?.classList
					.add('orion-aside-background-content', 'orion-aside-background-content--zoomout');
			},
			asideLeaveStart: () => {
				(orionAppService.appContext.app._container as HTMLElement)?.classList
					.remove('orion-aside-background-content--zoomout');
			},
			asideLeaveEnd: () => {
				setTimeout(() => {
					(orionAppService.appContext.app._container as HTMLElement)?.classList
						.remove('orion-aside-background-content');
				}, 300);
			},
		}, */
	} as Orion.Config)
	.mount('#app');

export default sandboxApp;
