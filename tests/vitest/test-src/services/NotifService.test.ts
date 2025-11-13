import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

import * as vue from 'vue';

vi.mock('../../../../packages/Notif', () => ({
	OrionNotif: { name: 'OrionNotif' },
}));

vi.mock('utils/Orion', () => ({
	default: {
		appContext: {},
	},
}));

vi.mock('../../../../services/DocumentService');
vi.mock('../../../../services/PopableQueueService');

vi.mock('../../../../services/PopableService', () => {
	class MockPopableService {
		options: any;
		constructor (options: any) { this.options = options; }
		registerComponentInstanceInDevtool = vi.fn();
	}
	return { PopableService: MockPopableService };
});

vi.mock('vue', async () => {
	const actualVue = await vi.importActual<typeof vue>('vue');
	return {
		...actualVue,
		h: vi.fn(actualVue.h),
		render: vi.fn(),
	};
});

vi.mock('../../../../services/NotifService', async () => {
	const actual = await vi.importActual<any>('../../../../services/NotifService');
	return actual;
});


const { default: useNotif } = await import('../../../../services/NotifService');
const { h, render } = await import('vue');
const { default: useDocument } = await import('../../../../services/DocumentService');
const { default: usePopableQueueService } = await import('../../../../services/PopableQueueService');


describe('NotifService & useNotif', () => {
	let mockContainer: { id: string; appendChild: ReturnType<typeof vi.fn> };
	let mockPopableWrapper: { appendChild: ReturnType<typeof vi.fn> };
	let mockDocument: {
		createElement: ReturnType<typeof vi.fn>;
		getElementById: ReturnType<typeof vi.fn>;
		body: { appendChild: ReturnType<typeof vi.fn> };
	};
	const mockInstance = { name: 'MockedOrionNotifInstance' };
	const mockPopableQueueService = {
		getInstance: vi.fn(() => mockInstance),
	};

	beforeEach(() => {
		vi.clearAllMocks();
		mockContainer = { id: '', appendChild: vi.fn() };
		mockPopableWrapper = { appendChild: vi.fn() };
		mockDocument = {
			createElement: vi.fn(() => mockContainer),
			getElementById: vi.fn(() => mockPopableWrapper),
			body: { appendChild: vi.fn() },
		};
		(useDocument as any).mockReturnValue(mockDocument);
		(usePopableQueueService as any).mockReturnValue(mockPopableQueueService);
	});

	afterEach(() => {
		vi.restoreAllMocks();
	});

	describe('useNotif()', () => {
		const notifTypes: Array<[keyof typeof useNotif, string, string]> = [
			['info', 'info', 'info'],
			['success', 'check_big', 'success'],
			['warning', 'triangle_warning', 'warning'],
			['danger', 'stop_sign', 'danger'],
		];

		it.each(notifTypes)('`useNotif.%s()` should create and render a notification', (type, icon, color) => {
			const title = `${type} title`;
			const message = `${type} message`;

			const instance = useNotif[type](title, message);

			expect(h).toHaveBeenCalledOnce();
			const vnodeOptions = (h as any).mock.calls[0][1].options;
			expect((h as any).mock.calls[0][0].name).toBe('OrionNotif');
			expect(vnodeOptions).toEqual(expect.objectContaining({ title, message, icon, color, duration: 5 }));
			expect(mockPopableQueueService.getInstance).toHaveBeenCalledWith(vnodeOptions.uid);
			expect(instance).toBe(mockInstance);
		});

		it('should append notification to body if wrapper element is not found', () => {
			(mockDocument.getElementById as any).mockReturnValue(null);
			useNotif.info('Test', 'Message');
			expect(mockDocument.body.appendChild).toHaveBeenCalledWith(mockContainer);
		});


		it('should correctly sanitize options when payload is a string', () => {
			useNotif.info('My Title', 'My Message');
			const vnodeOptions = (h as any).mock.calls[0][1].options;
			expect(vnodeOptions).toEqual(expect.objectContaining({
				title: 'My Title',
				message: 'My Message',
			}));
		});

		it('should correctly sanitize options when payload is an object', () => {
			useNotif.success({ title: 'Object Title', message: 'Object Message', duration: 10 });
			const vnodeOptions = (h as any).mock.calls[0][1].options;
			expect(vnodeOptions).toEqual(expect.objectContaining({
				title: 'Object Title',
				message: 'Object Message',
				duration: 10,
				color: 'success',
			}));
		});

		it('should unref the message property if it is a ref', () => {
			const messageRef = { value: 'Message from ref' };
			const unrefSpy = vi.spyOn(vue, 'unref').mockImplementation((val: any) => val.value);

			useNotif.danger({ title: 'My Title', message: messageRef as any });

			const vnodeOptions = (h as any).mock.calls[0][1].options;
			expect(vnodeOptions.message).toBe('Message from ref');
			unrefSpy.mockRestore();
		});
	});
});