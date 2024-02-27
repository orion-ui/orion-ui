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
				{
					name: 'TabsView',
					path: '/packages/tabs',
					component: () => import('sandbox/views/packages/TabsView.vue'),
					children: [
						{
							path: 'toggle',
							name: 'TabsOne',
							components: { toto: () => import('sandbox/views/packages/ToggleView.vue') },
						},
						{
							path: 'button',
							name: 'TabsTwo',
							components: { toto: () => import('sandbox/views/packages/ButtonView.vue') },
						},
					],
				},
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
		{
			path: '/sandbox-:sandbox/:subview*',
			component: () => import('sandbox/views/SandboxView.vue'),
		},
	],
});

export default router;
