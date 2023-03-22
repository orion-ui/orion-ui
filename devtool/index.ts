import { setupDevtoolsPlugin } from '@vue/devtools-api';
import { DevtoolsPluginApi, ExtractSettingsTypes, PluginSettingsItem } from '@vue/devtools-api';

import { getThemeMode, isIpad, isMac, isTouch, isWindows } from 'utils/tools';
import { OrionAppService } from 'utils/Orion';
import useLang from 'services/LangService';
import Log from 'utils/Log';

export const devtoolId = 'orion-devtool';

export let devtool: Undef<DevtoolsPluginApi<ExtractSettingsTypes<Record<string, PluginSettingsItem>>>>;

const orionStateType = 'SetupService';

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
				const exposed = payload.componentInstance.exposed;

				// Remove SetupService
				const setupPropsIndex = instance.state.findIndex(x => x.type === 'setup' && x.key === 'props');
				instance.state.splice(setupPropsIndex, 1);
				const setupSetupIndex = instance.state.findIndex(x => x.type === 'setup' && x.key === 'setup');
				instance.state.splice(setupSetupIndex, 1);

				if (exposed) {
					instance.state.push(...Object.entries(exposed)
						.map(([key, value]) => ({
							type: orionStateType,
							key,
							value,
							// editable: typeof value !== 'function',
						})),
					);
				}
			}
		});
	});
}
