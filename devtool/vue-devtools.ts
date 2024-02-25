import { addCustomTab } from '@vue/devtools-api';
// import type { OrionAppService } from 'utils/Orion';
// import Log from 'utils/Log';

export function setupDevtools(/* app: any, orionAppService: OrionAppService */) {
	addCustomTab({
		// unique identifier
		name: 'orion-ui',
		// title to display in the tab
		title: 'Orion UI',
		// any icon from Iconify, or a URL to an image
		icon: 'https://orion-ui.org/orion-logo-brand.svg',
		// iframe view
		view: {
			type: 'iframe',
			src: 'https://orion-ui.org/',
		},
		category: 'advanced',
	});

	console.log(addCustomTab);

	console.log('Orion Devtools initialized');
}
