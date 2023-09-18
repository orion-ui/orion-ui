import { setupDevtoolsPlugin } from '@vue/devtools-api';
import { DevtoolsPluginApi, ExtractSettingsTypes, PluginSettingsItem } from '@vue/devtools-api';

import { getThemeMode, isIpad, isMac, isTouch, isWindows } from 'utils/tools';
import { OrionAppService } from 'utils/Orion';
import useLang from 'services/LangService';
import Log from 'utils/Log';
import useResponsive from 'services/ResponsiveService';

export const devtoolId = 'orion-devtool';

export let devtool: Undef<DevtoolsPluginApi<ExtractSettingsTypes<Record<string, PluginSettingsItem>>>>;

const orionStateType = 'SetupService';
const SetupServiceKeysToExclude = [
	'Bus',
	'bus',
	'props',
	'responsive',
	'ui',
	'window',
	'document',
	'defaultRouter',
	'getUid',
	'emits',
];

export function setupDevtools (app: any, orionAppService: OrionAppService) {
	setupDevtoolsPlugin({
		id: 'orion-devtool-plugin',
		label: 'Orion DevTool Plugin',
		packageName: 'orion-devtool-plugin',
		homepage: 'https://orion-dev.armado.fr/',
		componentStateTypes: [orionStateType],
		app,
	}, (api) => {
		Log.orion(`Orion DevTool Plugin enabled`);

		devtool = api;

		api.addInspector({
			id: devtoolId,
			label: 'Orion UI',
			icon: 'radio_button_checked',
		});

		api.on.getInspectorTree((payload) => {
			if (payload.inspectorId === devtoolId) {
				payload.rootNodes = [
					{
						id: 'configuration',
						label: 'Configuration',
					},
					{
						id: 'localization',
						label: 'Localization',
					},
				];
			}
		});

		api.on.getInspectorState((payload) => {
			if (payload.nodeId === 'configuration') {
				payload.state = {
					'Initialization configuration': Object.keys(orionAppService.appConfig)
						.sort()
						.map(key => ({
							key,
							value: orionAppService.appConfig[key as keyof Orion.AppServiceConfig],
						})),
					'Runtime configuration': [
						{
							key: 'theme',
							value: getThemeMode(),
						},
						{
							key: 'isIpad',
							value: isIpad(),
						},
						{
							key: 'isTouch',
							value: isTouch(),
						},
						{
							key: 'isMac',
							value: isMac(),
						},
						{
							key: 'isWindows',
							value: isWindows(),
						},
					],
					'Responsive': [
						'ww',
						'wh',
						'onPhone',
						'onTablet',
						'onTabletOnly',
						'onTabletPortrait',
						'onTabletPortraitOnly',
						'onTabletLandscape',
						'onTabletLandscapeOnly',
						'onDesktop',
						'onDesktopOnly',
						'onDesktopXL',
					].map(key => ({
						key,
						value: (useResponsive() as any)[key],
					})),
				};
			} else if (payload.nodeId === 'localization') {
				const currentLang = useLang();
				payload.state = {
					'01 - Global': Object.keys(currentLang)
						.filter(key => !/^(ORION_|USE_)/.test(key) && !['countries', 'pluralize'].includes(key))
						.sort()
						.map(key => ({
							key,
							value: currentLang[key as keyof typeof currentLang],
						})),
					'02 - Components': Object.keys(currentLang)
						.filter(key => /^(ORION_)/.test(key) && !['countries', 'pluralize'].includes(key))
						.sort()
						.map(key => ({
							key,
							value: currentLang[key as keyof typeof currentLang],
						})),
					'03 - Services': Object.keys(currentLang)
						.filter(key => /^(USE_)/.test(key) && !['countries', 'pluralize'].includes(key))
						.sort()
						.map(key => ({
							key,
							value: currentLang[key as keyof typeof currentLang],
						})),
					'04 - Countries': currentLang.countries
						.map(country => ({
							key: country.code,
							value: country,
						})),
				};
			}
		});

		api.on.visitComponentTree((payload) => {
			if (/^Orion/.test(payload.componentInstance.type.__name)) {
				const node = payload.treeNode;

				node.tags.push({
					label: 'Orion',
					textColor: 0xffffff,
					backgroundColor: 0x7027fa,
				});
			}
		});

		api.on.inspectComponent((payload) => {
			if (/^Orion/.test(payload.componentInstance.type.__name)) {
				const instance = payload.instanceData;
				const SetupService = payload.componentInstance.devtoolsRawSetupState.setup;

				for (let i = instance.state.length - 1; i > -1; i--) {
					const element = instance.state[i];
					if (element.type === 'setup' || element.type === 'setup (other)') {
						instance.state.splice(i, 1);
					}
				}

				instance.state.unshift(...Object.entries(SetupService)
					.filter(([key]) => !SetupServiceKeysToExclude.includes(key) && !Object.keys(SetupService.publicInstance).includes(key))
					.map(([key, value]) => ({
						type: orionStateType,
						key,
						value: typeof value !== 'function' ? value : handleFunctions(value),
						editable: typeof value !== 'function',
					})),
				);

				instance.state.unshift(...Object.entries(SetupService.publicInstance)
					.map(([key, value]) => ({
						type: 'Setup.publicInstance',
						key,
						value: typeof value !== 'function' ? value : handleFunctions(value),
					})),
				);
			}
		});
	});
}


function handleFunctions (value: Function) {
	return {
		_custom: {
			type: Function,
			readOnly: true,
			display: `Function`,
			tooltip: 'Click the icon to trigger',
			// value: 'value',
			actions: [
				{
					icon: 'input',
					tooltip: 'Trigger function',
					action: async () => {
						// console.log(value);
						// eslint-disable-next-line no-console
						console.log(await value());
					},
				},
			],
		},
	};
}
