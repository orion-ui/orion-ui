import { describe, it, expect, vi, beforeEach } from 'vitest';
import { h, render } from 'vue';
import { OrionModal } from '../../../../packages/Modal';
import orionAppService from 'utils/Orion';
import useDocument from '../../../../services/DocumentService';
import usePopableQueueService from '../../../../services/PopableQueueService';
import useModal from '../../../../services/ModalService';

vi.mock('vue', () => ({
	h: vi.fn((comp, props) => ({
		component: comp,
		props,
		appContext: null,
	})),
	render: vi.fn(),
}));

vi.mock('../../../../packages/Modal', () => ({
	OrionModal: { name: 'OrionModal' },
}));

const mockRegisterComponentInstanceInDevtool = vi.fn();
vi.mock('../../../../services/PopableService', () => ({
	PopableService: class {
		options: any;
		nameForDevtool = 'OrionModal';
		constructor (options: any) {
			this.options = options;
		}

		registerComponentInstanceInDevtool = mockRegisterComponentInstanceInDevtool;
	},
}));

const mockAppendChild = vi.fn();
const mockBodyAppendChild = vi.fn();
const mockGetElementById = vi.fn();
const mockCreateElement = vi.fn(() => ({
	id: '',
	appendChild: mockAppendChild,
}));
vi.mock('../../../../services/DocumentService', () => ({
	default: vi.fn(() => ({
		body: { appendChild: mockBodyAppendChild },
		createElement: mockCreateElement,
		getElementById: mockGetElementById,
	})),
}));

const mockGetInstance = vi.fn(() => ({ id: 'mock-modal-instance' }));
vi.mock('../../../../services/PopableQueueService', () => ({
	default: vi.fn(() => ({
		getInstance: mockGetInstance,
	})),
}));

vi.mock('../../../../utils/Orion', () => ({
	default: {
		appContext: { id: 'mock-app-context' },
	},
}));


describe('useModal', () => {
	const defaultOptions: Partial<Orion.Modal.Options> = { uid: 12345, title: 'Test Modal' };

	beforeEach(() => {
		vi.clearAllMocks();
	});

	it('creates and mounts a modal inside the popable wrapper if it exists', () => {
		const popableWrapper = { appendChild: mockAppendChild };
		mockGetElementById.mockReturnValue(popableWrapper);
		const vnode = { component: OrionModal, props: { options: defaultOptions }, appContext: null };
		(h as vi.Mock).mockReturnValue(vnode);

		const instance = useModal(defaultOptions);

		expect(h).toHaveBeenCalledOnce();
		expect(h).toHaveBeenCalledWith(OrionModal, { options: expect.objectContaining(defaultOptions) });
		expect(vnode.appContext).toEqual({ id: 'mock-app-context' });

		expect(useDocument).toHaveBeenCalled();
		expect(mockCreateElement).toHaveBeenCalledWith('div');
		const container = mockCreateElement.mock.results[0].value;
		expect(container.id).toBe(`OrionModal-wrapper-${defaultOptions.uid}`);

		expect(mockGetElementById).toHaveBeenCalledWith('orion-popable-wrapper');
		expect(mockAppendChild).toHaveBeenCalledWith(container);
		expect(mockBodyAppendChild).not.toHaveBeenCalled();

		expect(render).toHaveBeenCalledOnce();
		expect(render).toHaveBeenCalledWith(vnode, container);

		expect(mockRegisterComponentInstanceInDevtool).toHaveBeenCalledWith(vnode);

		expect(usePopableQueueService).toHaveBeenCalled();
		expect(mockGetInstance).toHaveBeenCalledWith(defaultOptions.uid);
		expect(instance).toEqual({ id: 'mock-modal-instance' });
	});

	it('creates and mounts a modal in the body if popable wrapper does not exist', () => {
		mockGetElementById.mockReturnValue(null);
		const vnode = { component: OrionModal, props: { options: defaultOptions }, appContext: null };
		(h as vi.Mock).mockReturnValue(vnode);

		useModal(defaultOptions);

		const container = mockCreateElement.mock.results[0].value;
		expect(mockGetElementById).toHaveBeenCalledWith('orion-popable-wrapper');
		expect(mockAppendChild).not.toHaveBeenCalled();
		expect(mockBodyAppendChild).toHaveBeenCalledWith(container);

		expect(render).toHaveBeenCalledOnce();
		expect(render).toHaveBeenCalledWith(vnode, container);
		expect(mockGetInstance).toHaveBeenCalledWith(defaultOptions.uid);
	});

	it('skips DOM manipulation but still returns an instance if document is not available', () => {
		(useDocument as vi.Mock).mockReturnValue(undefined);

		const instance = useModal(defaultOptions);

		expect(mockCreateElement).not.toHaveBeenCalled();
		expect(render).not.toHaveBeenCalled();
		expect(mockRegisterComponentInstanceInDevtool).not.toHaveBeenCalled();

		expect(usePopableQueueService).toHaveBeenCalled();
		expect(mockGetInstance).toHaveBeenCalledWith(defaultOptions.uid);
		expect(instance).toEqual({ id: 'mock-modal-instance' });
	});
});