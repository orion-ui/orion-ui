import { createRouter, createWebHistory } from 'vue-router';
import packagesRoutes from './packages.router';

const router = createRouter({
	history: createWebHistory(),
	routes: [
		{
			path: '/',
			component: () => import('sandbox/views/LayoutApp.vue'),
			children: [
				...packagesRoutes,
			],
		},
		{
			path: '/service',
			component: () => import('sandbox/views/LayoutApp.vue'),
			children: [
				{
					name: 'ValidationService',
					path: 'validation',
					component: () => import('sandbox/views/services/ValidationService.vue'),
				},
				{
					name: 'PromptService',
					path: 'prompt',
					component: () => import('sandbox/views/services/PromptService.vue'),
				},
				{
					name: 'DragNDropService',
					path: 'dragNDrop',
					component: () => import('sandbox/views/services/DragNDropService.vue'),
				},
			],
		},
	],
});

export default router;
