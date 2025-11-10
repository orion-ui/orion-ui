
import { vi, describe, it, expect, beforeEach } from 'vitest';

type OrionOverlay = {
	show: () => void;
	hide: () => void;
};

vi.mock('utils/Log', () => ({
	default: {
		orion: vi.fn(),
	},
}));

describe('OverlayService', () => {
	let useOverlay: () => any;
	let OverlayService: any;
	let Log: { orion: ReturnType<typeof vi.fn> };
	const mockOverlay: OrionOverlay = {
		show: vi.fn(),
		hide: vi.fn(),
	};

	beforeEach(async () => {
		vi.clearAllMocks();
		vi.resetModules();

		const logModule = await import('../../../../utils/Log');
		Log = logModule.default;

		const serviceModule = await import('../../../../services/OverlayService');
		useOverlay = serviceModule.default;
		OverlayService = serviceModule.OverlayService;
	});

	it('should be a singleton instance and log activation on creation', () => {
		expect(Log.orion).toHaveBeenCalledOnce();
		expect(Log.orion).toHaveBeenCalledWith('OverlayService activated');

		const serviceInstance1 = useOverlay();
		const serviceInstance2 = useOverlay();

		expect(serviceInstance1).toBeInstanceOf(OverlayService);
		expect(serviceInstance1).toBe(serviceInstance2);
	});

	describe('when global overlay is not set', () => {
		it('show() should throw an error', () => {
			const service = useOverlay();
			expect(() => service.show()).toThrow('Orion global overlay not set');
		});

		it('hide() should throw an error', () => {
			const service = useOverlay();
			expect(() => service.hide()).toThrow('Orion global overlay not set');
		});
	});

	describe('when global overlay is set', () => {
		it('setGlobalOverlay() allows show() and hide() to be called without throwing', () => {
			const service = useOverlay();
			service.setGlobalOverlay(mockOverlay);
			expect(() => service.show()).not.toThrow();
			expect(() => service.hide()).not.toThrow();
		});

		it('show() should call the show method on the global overlay instance', () => {
			const service = useOverlay();
			service.setGlobalOverlay(mockOverlay);
			service.show();
			expect(mockOverlay.show).toHaveBeenCalledOnce();
			expect(mockOverlay.hide).not.toHaveBeenCalled();
		});

		it('hide() should call the hide method on the global overlay instance', () => {
			const service = useOverlay();
			service.setGlobalOverlay(mockOverlay);
			service.hide();
			expect(mockOverlay.hide).toHaveBeenCalledOnce();
			expect(mockOverlay.show).not.toHaveBeenCalled();
		});
	});
});
