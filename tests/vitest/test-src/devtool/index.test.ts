import { describe, it, expect, vi, beforeEach } from 'vitest';
import { setupDevtools, devtoolId } from '../../../../devtool';
import type { DevtoolsPluginApi, ExtractSettingsTypes, PluginSettingsItem, StateBase } from '@vue/devtools-api';

vi.mock('@vue/devtools-api', () => ({
  setupDevtoolsPlugin: vi.fn(),
}));

vi.mock('utils/tools', () => ({
  getThemeMode: vi.fn(() => 'dark'),
  isIpad: vi.fn(() => false),
  isMac: vi.fn(() => false),
  isTouch: vi.fn(() => true),
  isWindows: vi.fn(() => true),
}));

vi.mock('utils/Orion', () => ({
  OrionAppService: vi.fn().mockImplementation(() => ({
    appConfig: {
      option1: 'value1',
      option2: true,
    },
  })),
}));

vi.mock('services/LangService', () => ({
  default: vi.fn(() => ({
    OK: 'OK',
    CANCEL: 'Cancel',
    ORION_BUTTON_LABEL: 'Button',
    USE_FORM_VALIDATION: 'Validation',
    countries: [{ code: 'FR', name: 'France' }],
    pluralize: vi.fn(),
  })),
}));

vi.mock('utils/Log', () => ({
  default: {
    orion: vi.fn(),
  },
}));

vi.mock('services/ResponsiveService', () => ({
  default: vi.fn(() => ({
    ww: 1920,
    wh: 1080,
    onDesktop: true,
  })),
}));


let devtoolsCallback: (api: DevtoolsPluginApi<ExtractSettingsTypes<Record<string, PluginSettingsItem>>>) => void;
const { setupDevtoolsPlugin } = await import('@vue/devtools-api');
vi.mocked(setupDevtoolsPlugin).mockImplementation((config, callback) => {
  devtoolsCallback = callback;
});


describe('Devtools: index.ts', () => {
  let mockApi: any;
  let mockApp: any;
  let mockOrionAppService: any;

  beforeEach(async () => {
    vi.clearAllMocks();

    mockApp = {};
    const { OrionAppService } = await import('utils/Orion');
    mockOrionAppService = new OrionAppService();

    mockApi = {
      addInspector: vi.fn(),
      on: {
        getInspectorTree: vi.fn(),
        getInspectorState: vi.fn(),
        visitComponentTree: vi.fn(),
        inspectComponent: vi.fn(),
      },
    };
  });

  it('should setup the devtools plugin with correct initial configuration', async () => {
    const Log = (await import('utils/Log')).default;
    setupDevtools(mockApp, mockOrionAppService);

    expect(setupDevtoolsPlugin).toHaveBeenCalledWith(
      expect.objectContaining({
        id: 'orion-devtool-plugin',
        label: 'Orion DevTool Plugin',
        app: mockApp,
      }),
      expect.any(Function)
    );

    devtoolsCallback(mockApi);

    expect(Log.orion).toHaveBeenCalledWith('Orion DevTool Plugin enabled');
    expect(mockApi.addInspector).toHaveBeenCalledWith({
      id: devtoolId,
      label: 'Orion UI',
      icon: 'radio_button_checked',
    });
  });

  describe('Event Handlers', () => {
    beforeEach(() => {
      setupDevtools(mockApp, mockOrionAppService);
      devtoolsCallback(mockApi);
    });

    it('getInspectorTree: should create root nodes', () => {
      const getInspectorTreeCallback = mockApi.on.getInspectorTree.mock.calls[0][0];
      const payload = { inspectorId: devtoolId, rootNodes: [] };
      getInspectorTreeCallback(payload);

      expect(payload.rootNodes).toEqual([
        { id: 'configuration', label: 'Configuration' },
        { id: 'localization', label: 'Localization' },
      ]);
    });

		it('getInspectorTree: should not modify root nodes for other inspectors', () => {
      const getInspectorTreeCallback = mockApi.on.getInspectorTree.mock.calls[0][0];
      const payload = { inspectorId: 'another-inspector', rootNodes: [] };
      getInspectorTreeCallback(payload);

      expect(payload.rootNodes).toEqual([]);
    });

    it('getInspectorState: should populate state for "configuration" node', async () => {
      const { getThemeMode, isIpad, isTouch, isMac, isWindows } = await import('utils/tools');
			const useResponsive = (await import('services/ResponsiveService')).default;

      const getInspectorStateCallback = mockApi.on.getInspectorState.mock.calls[0][0];
      const payload = { nodeId: 'configuration', state: {} };
      getInspectorStateCallback(payload);

      expect(payload.state).toHaveProperty('Initialization configuration');
      expect(payload.state['Initialization configuration']).toEqual(
        expect.arrayContaining([
          { key: 'option1', value: 'value1' },
          { key: 'option2', value: true },
        ])
      );

      expect(payload.state).toHaveProperty('Runtime configuration');
      expect(payload.state['Runtime configuration']).toEqual([
        { key: 'theme', value: getThemeMode() },
        { key: 'isIpad', value: isIpad() },
        { key: 'isTouch', value: isTouch() },
        { key: 'isMac', value: isMac() },
        { key: 'isWindows', value: isWindows() },
      ]);
			
      expect(payload.state).toHaveProperty('Responsive');
      expect(payload.state['Responsive']).toEqual(expect.arrayContaining([
        { key: 'ww', value: useResponsive().ww },
        { key: 'wh', value: useResponsive().wh },
        { key: 'onDesktop', value: useResponsive().onDesktop },
      ]));
    });

    it('getInspectorState: should populate state for "localization" node', async () => {
			const useLang = (await import('services/LangService')).default;
      const getInspectorStateCallback = mockApi.on.getInspectorState.mock.calls[0][0];
      const payload = { nodeId: 'localization', state: {} };
      getInspectorStateCallback(payload);
			
      const currentLang = useLang();
      expect(payload.state['01 - Global']).toEqual([
        { key: 'CANCEL', value: currentLang.CANCEL },
        { key: 'OK', value: currentLang.OK },
      ]);
      expect(payload.state['02 - Components']).toEqual([
        { key: 'ORION_BUTTON_LABEL', value: currentLang.ORION_BUTTON_LABEL },
      ]);
      expect(payload.state['03 - Services']).toEqual([
        { key: 'USE_FORM_VALIDATION', value: currentLang.USE_FORM_VALIDATION },
      ]);
      expect(payload.state['04 - Countries']).toEqual([
        { key: 'FR', value: { code: 'FR', name: 'France' } },
      ]);
    });

    it('visitComponentTree: should add a tag to Orion components', () => {
      const visitComponentTreeCallback = mockApi.on.visitComponentTree.mock.calls[0][0];
      const payload = {
        componentInstance: { type: { __name: 'OrionButton' } },
        treeNode: { tags: [] },
      };
      visitComponentTreeCallback(payload);

      expect(payload.treeNode.tags).toHaveLength(1);
      expect(payload.treeNode.tags[0]).toEqual({
        label: 'Orion',
        textColor: 0xffffff,
        backgroundColor: 0x7027fa,
      });
    });

		it('visitComponentTree: should not add a tag to non-Orion components', () => {
      const visitComponentTreeCallback = mockApi.on.visitComponentTree.mock.calls[0][0];
      const payload = {
        componentInstance: { type: { __name: 'RegularDiv' } },
        treeNode: { tags: [] },
      };
      visitComponentTreeCallback(payload);

      expect(payload.treeNode.tags).toHaveLength(0);
    });

    it('inspectComponent: should restructure state for Orion components', () => {
      const inspectComponentCallback = mockApi.on.inspectComponent.mock.calls[0][0];
			const testFunction = () => 'test';
      const payload = {
        componentInstance: {
          type: { __name: 'OrionDatepicker' },
          exposed: {
            propA: 1,
						funcB: testFunction,
            publicInstance: {
              exposedProp: 'hello',
							exposedFunc: testFunction,
            }
          },
        },
        instanceData: {
          state: [
            { type: 'props', key: 'prop1', value: 'val1' },
            { type: 'setup', key: 'setupProp', value: 'sval1' },
						{ type: 'setup (other)', key: 'setupProp2', value: 'sval2' },
          ],
        },
      };

      inspectComponentCallback(payload);

      expect(payload.instanceData.state.find(s => s.type === 'setup')).toBeUndefined();
			expect(payload.instanceData.state.find(s => s.type === 'setup (other)')).toBeUndefined();
      expect(payload.instanceData.state.find(s => s.type === 'props')).toBeDefined();

      expect(payload.instanceData.state[0].type).toBe('Setup.publicInstance');
      expect(payload.instanceData.state[0].key).toBe('exposedProp');
      expect(payload.instanceData.state[0].value).toBe('hello');
			
			expect(payload.instanceData.state[1].type).toBe('Setup.publicInstance');
      expect(payload.instanceData.state[1].key).toBe('exposedFunc');
      expect(payload.instanceData.state[1].value).toHaveProperty('_custom');

      expect(payload.instanceData.state[2].type).toBe('SetupService');
      expect(payload.instanceData.state[2].key).toBe('propA');
      expect(payload.instanceData.state[2].value).toBe(1);

			expect(payload.instanceData.state[3].type).toBe('SetupService');
      expect(payload.instanceData.state[3].key).toBe('funcB');
      expect(payload.instanceData.state[3].value).toHaveProperty('_custom');
      expect(payload.instanceData.state[3].value._custom.type).toBe(Function);

      expect(payload.instanceData.state).toHaveLength(6);
    });

		it('inspectComponent: should not restructure state for non-Orion components', () => {
      const inspectComponentCallback = mockApi.on.inspectComponent.mock.calls[0][0];
      const originalState: StateBase[] = [
        { type: 'props', key: 'prop1', value: 'val1', editable: true },
        { type: 'setup', key: 'setupProp', value: 'sval1', editable: true },
      ];
			const payload = {
        componentInstance: {
          type: { __name: 'MyCustomComponent' },
        },
        instanceData: {
          state: [...originalState],
        },
      };

      inspectComponentCallback(payload);

      expect(payload.instanceData.state).toEqual(originalState);
    });
  });
});