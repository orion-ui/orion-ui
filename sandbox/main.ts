// /// <reference path="../lib/monkey-patching.d.ts" />

import { createApp } from 'vue';
import OrionPlugin from '../lib';
import App from './App.vue';
import router from './router/index.router';
// import orionAppService from 'utils/Orion';

const sandboxApp = createApp(App)
	.use(router)
	.use(OrionPlugin, {
		use: ['components'],
		// router,
	} as Orion.Config)
	.mount('#app');

export default sandboxApp;
