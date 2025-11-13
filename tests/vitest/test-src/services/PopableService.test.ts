import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { PopableService } from '../../../../services/PopableService';
import orionAppService from '../../../../utils/Orion';
import { getUid } from '../../../../utils/tools';
import { devtool } from '../../../../devtool';
import { VNode } from 'vue';

vi.mock('devtool', () => ({
	devtool: {
		on: {
			visitComponentTree: vi.fn(),
		},
		getComponentInstances: vi.fn(),
		notifyComponentUpdate: vi.fn(),
	},
}));

vi.mock('utils/tools', () => ({
	getUid: vi.fn(),
}));

vi.mock('utils/Orion', () => ({
	default: {
		app: { name: 'mock-app' },
		appInstance: null,
	},
}));

class ConcretePopableService extends PopableService<VNode> {
	nameForDevtool = 'TestPopable';

	constructor (options: Partial<Orion.Popable.Options> = {}) {
		super(options);
	}

	createVNode (): VNode {
		return {} as VNode;
	}
}

describe('PopableService', () => {
	const MOCK_UID = 12345;
	const MOCK_COMPONENT_UID = 54321;

	beforeEach(() => {
		vi.clearAllMocks();
		vi.useFakeTimers();
		(getUid as vi.Mock).mockReturnValue(MOCK_UID);
		orionAppService.appInstance = null;
	});

	afterEach(() => {
		vi.useRealTimers();
	});

	it('constructor should set default and provided options correctly', () => {
		const customOptions = { custom: 'value' };

		const service = new ConcretePopableService(customOptions as any);

		expect(getUid).toHaveBeenCalled();
		expect(service['options']).toEqual({
			openauto: true,
			programmatic: true,
			uid: MOCK_UID,
			custom: 'value',
		});
	});

	describe('registerComponentInstanceInDevtool()', () => {
		it('should do nothing if vnode component is missing', () => {
			const service = new ConcretePopableService();
			const vnode = {} as VNode;
			orionAppService.appInstance = { uid: 1 } as any;

			service.registerComponentInstanceInDevtool(vnode);

			expect(devtool.on.visitComponentTree).not.toHaveBeenCalled();
		});

		it('should do nothing if orionAppService instance is missing', () => {
			const service = new ConcretePopableService();
			const vnode = { component: { uid: MOCK_COMPONENT_UID } } as VNode;
			orionAppService.appInstance = null;

			service.registerComponentInstanceInDevtool(vnode);

			expect(devtool.on.visitComponentTree).not.toHaveBeenCalled();
		});

		it('should register component in devtool and notify update after a delay', () => {
			const service = new ConcretePopableService();
			const mockAppInstance = { uid: 1, name: 'mock-app-instance' };
			orionAppService.appInstance = mockAppInstance as any;

			const mockVNode = {
				component: {
					uid: MOCK_COMPONENT_UID,
					parent: null,
					root: null,
				},
			} as VNode;

			const mockPayload = {
				app: { __VUE_DEVTOOLS_APP_RECORD_ID__: 'test-app-id' },
				treeNode: {
					uid: mockAppInstance.uid,
					children: [],
				},
			};

			let visitCallback: (payload: any) => void = () => {};
			(devtool.on.visitComponentTree as vi.Mock).mockImplementation((callback) => {
				visitCallback = callback;
			});

			const notifySpy = vi.spyOn(service, 'notifyPopableUpdate');

			service.registerComponentInstanceInDevtool(mockVNode);
			visitCallback(mockPayload);

			expect(mockVNode.component?.parent).toBe(mockAppInstance);
			expect(mockVNode.component?.root).toBe(mockAppInstance);
			expect(devtool.on.visitComponentTree).toHaveBeenCalledOnce();
			expect(mockPayload.treeNode.children).toHaveLength(1);
			expect(mockPayload.treeNode.children[0]).toMatchObject({
				name: 'TestPopable',
				uid: MOCK_COMPONENT_UID,
				orionUid: MOCK_UID,
			});

			expect(notifySpy).not.toHaveBeenCalled();
			vi.advanceTimersByTime(100);
			expect(notifySpy).toHaveBeenCalledWith(MOCK_COMPONENT_UID);
		});
	});

	describe('notifyPopableUpdate()', () => {
		it('should get instances and notify the correct component update', async () => {
			const service = new ConcretePopableService();
			const mockInstances = [
				{ uid: 1, name: 'other-component' },
				{ uid: MOCK_COMPONENT_UID, name: 'target-component' },
			];
			(devtool.getComponentInstances as vi.Mock).mockResolvedValue(mockInstances);

			await service.notifyPopableUpdate(MOCK_COMPONENT_UID);

			expect(devtool.getComponentInstances).toHaveBeenCalledWith(orionAppService.app);
			expect(devtool.notifyComponentUpdate).toHaveBeenCalledWith(mockInstances[1]);
		});

		it('should not notify if instance is not found', async () => {
			const service = new ConcretePopableService();
			const mockInstances = [{ uid: 1, name: 'other-component' }];
			(devtool.getComponentInstances as vi.Mock).mockResolvedValue(mockInstances);

			await service.notifyPopableUpdate(999);

			expect(devtool.getComponentInstances).toHaveBeenCalledWith(orionAppService.app);
			expect(devtool.notifyComponentUpdate).toHaveBeenCalledWith(undefined);
		});

		it('should handle cases where getComponentInstances returns null or undefined', async () => {
			const service = new ConcretePopableService();
			(devtool.getComponentInstances as vi.Mock).mockResolvedValue(null);

			await service.notifyPopableUpdate(MOCK_COMPONENT_UID);

			expect(devtool.getComponentInstances).toHaveBeenCalledWith(orionAppService.app);
			expect(devtool.notifyComponentUpdate).toHaveBeenCalledWith(undefined);
		});
	});
});