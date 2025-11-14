import { describe, it, expect, vi, beforeEach, type Mock } from 'vitest';
import { h, render } from 'vue';
import { PopableService } from '../../../../services/PopableService';
import useAside from '../../../../services/AsideService';
import { OrionAside } from '../../../../packages/Aside';
import orionAppService from '../../../../utils/Orion';
import useDocument from '../../../../services/DocumentService';
import usePopableQueueService from '../../../../services/PopableQueueService';

declare global {
  namespace Orion {
    namespace Aside {
      interface Options {
        uid?: number;
      }
    }
  }
}

let mockInstance: any;
let mockUsePopableQueueService: any;
let mockContainer: any;
let mockPopableWrapper: any;
let mockBody: any;
let mockUseDocument: any;

vi.mock('../../../../services/PopableQueueService', () => ({ default: vi.fn().mockImplementation(() => mockUsePopableQueueService) }));

vi.mock('../../../../services/DocumentService', () => ({ default: vi.fn().mockImplementation(() => mockUseDocument) }));

vi.mock('../../../../services/PopableService', () => {
	const PopableService = vi.fn(function (this: any, options: any) {
		this.options = options;
	});
	PopableService.prototype.registerComponentInstanceInDevtool = vi.fn();
	return { PopableService };
});

vi.mock('../../../../packages/Aside', () => ({ OrionAside: { name: 'OrionAside' } }));

vi.mock('../../../../utils/Orion', () => ({ default: { appContext: { id: 'mock-app-context' } } }));

vi.mock('vue', async () => {
	const actualVue = await vi.importActual<typeof import('vue')>('vue');
	return {
		...actualVue,
		h: vi.fn().mockImplementation(() => ({ appContext: null })),
		render: vi.fn(),
	};
});

describe('useAside', () => {
	const defaultOptions: Partial<Orion.Aside.Options> = { uid: 42 };

	beforeEach(() => {
		vi.clearAllMocks();

		mockInstance = { name: 'MockOrionAsideInstance' };
		mockUsePopableQueueService = { getInstance: vi.fn().mockReturnValue(mockInstance) };

		mockContainer = {
			id: '',
			appendChild: vi.fn(),
		};
		mockPopableWrapper = { appendChild: vi.fn() };
		mockBody = { appendChild: vi.fn() };
		mockUseDocument = {
			createElement: vi.fn().mockReturnValue(mockContainer),
			getElementById: vi.fn().mockReturnValue(mockPopableWrapper),
			body: mockBody,
		};
	});

	it('creates a VNode and appends it to the popable wrapper if it exists', () => {
		const instance = useAside(defaultOptions);

		const mockedVNode = (h as Mock).mock.results[0].value;

		expect(PopableService).toHaveBeenCalledWith(defaultOptions);

		expect(useDocument).toHaveBeenCalled();
		expect(mockUseDocument.createElement).toHaveBeenCalledWith('div');
		expect(mockContainer.id).toBe(`OrionAside-wrapper-${defaultOptions.uid}`);
		expect(mockUseDocument.getElementById).toHaveBeenCalledWith('orion-popable-wrapper');
		expect(mockPopableWrapper.appendChild).toHaveBeenCalledWith(mockContainer);
		expect(mockBody.appendChild).not.toHaveBeenCalled();

		expect(h).toHaveBeenCalledWith(OrionAside, { options: defaultOptions });
		expect(mockedVNode.appContext).toBe(orionAppService.appContext);
		expect(render).toHaveBeenCalledWith(mockedVNode, mockContainer);

		const popableServiceInstance = (PopableService as any).mock.instances[0];
		expect(popableServiceInstance.registerComponentInstanceInDevtool).toHaveBeenCalledWith(mockedVNode);

		expect(usePopableQueueService).toHaveBeenCalled();
		expect(mockUsePopableQueueService.getInstance).toHaveBeenCalledWith(defaultOptions.uid);
		expect(instance).toBe(mockInstance);
	});

	it('appends the VNode to the body if the popable wrapper does not exist', () => {
		mockUseDocument.getElementById.mockReturnValue(null);

		useAside(defaultOptions);

		expect(mockUseDocument.getElementById).toHaveBeenCalledWith('orion-popable-wrapper');
		expect(mockPopableWrapper.appendChild).not.toHaveBeenCalled();
		expect(mockBody.appendChild).toHaveBeenCalledWith(mockContainer);
	});

	it('should still get instance from queue even if container is not created', () => {
		mockUseDocument.createElement.mockReturnValue(null);

		const instance = useAside(defaultOptions);

		expect(render).not.toHaveBeenCalled();
		expect(mockUsePopableQueueService.getInstance).toHaveBeenCalledWith(defaultOptions.uid);
		expect(instance).toBe(mockInstance);
	});
});
