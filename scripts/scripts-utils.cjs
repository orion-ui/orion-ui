const { pascal, dash, camel } = require('radash');

const PrivatePackagesFolder = [
	'Shared',
	'NavMain',
	'NavTop',
	'NavTabs',
	'NavAside',
	'NavMainItem',
	'TabNav',
	'TimelinePill',
	'Field',
	'DateRange',
	'DateWeek',
];

const NoRoutePackagesFolder = [
	...PrivatePackagesFolder,
	'Layout',
	'TabPane',
	'TimelinePane',
	'Paginate',
	'FooterFixed',
	'Draggable',
	'Droppable',
	'TourStep',
	'ChatMessage',
	'ChatDiscussionList',
	'CarouselItem',
];

const PrivateServices = [
	'docs',
	'index.ts',
	'PopableService.ts',
];

const PackagesFolderToNotIndex = [
	'Shared',
];


function sanitizePackageName (/** @type {string} */ name) {
	const sanitized = name
		.replace(/^(Orion|orion)-?/, '')
		.replace(/([A-Z]{1})/gm, ' $1')
		.replace(/-/gm, ' ')
		.trim();

	const cleanPascalCase = pascal(sanitized);
	const pascalCase = `Orion${cleanPascalCase}`;
	const camelCase = camel(pascalCase);
	const kebabCase = dash(pascalCase);

	return {
		camelCase,
		kebabCase,
		pascalCase,
		cleanPascalCase,
	};
}


module.exports = {
	PrivatePackagesFolder,
	PrivateServices,
	PackagesFolderToNotIndex,
	NoRoutePackagesFolder,
	sanitizePackageName,
};
