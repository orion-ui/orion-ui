import { describe, it, expect, vi, beforeEach } from 'vitest';
import type { ResponsiveService as ResponsiveServiceType } from '../../../../services/ResponsiveService';
import useWindow from '../../../../services/WindowService';
import Log from '../../../../utils/Log';
import { debounce } from 'lodash-es';

vi.mock('utils/Log', () => ({
	default: {
		orion: vi.fn(),
	},
}));

vi.mock('lodash-es', async (importOriginal) => {
	const original = await importOriginal<typeof import('lodash-es')>();
	return {
		...original,
		debounce: vi.fn((fn) => fn),
	};
});

let mockWindow: {
	innerWidth: number;
	innerHeight: number;
	addEventListener: ReturnType<typeof vi.fn>;
};

vi.mock('services/WindowService', () => ({
	default: vi.fn(() => mockWindow),
}));

describe('services/ResponsiveService.ts', () => {
	let ResponsiveService: any;
	let useResponsive: () => ResponsiveServiceType;

	beforeEach(async () => {
		vi.resetModules();
		vi.clearAllMocks();

		mockWindow = {
			innerWidth: 1024,
			innerHeight: 768,
			addEventListener: vi.fn(),
		};

		const module = await import('../../../../services/ResponsiveService');
		ResponsiveService = module.ResponsiveService;
		useResponsive = module.default;
	});

	it('should activate and log a message on construction', () => {
		expect(Log.orion).toHaveBeenCalledOnce();
		expect(Log.orion).toHaveBeenCalledWith('ResponsiveService activated');
	});

	it('should initialize with default breakpoints', () => {
		const service = useResponsive();
		expect(service.BPtablet).toBe(768);
		expect(service.BPtabletLandscape).toBe(1024);
		expect(service.BPdesktop).toBe(1280);
		expect(service.BPdesktopXL).toBe(1536);
	});

	it('should allow overriding breakpoints via options', () => {
		vi.clearAllMocks();
		const customBreakpoints = {
			BPtablet: 800,
			BPdesktop: 1300,
		};
		const service = new ResponsiveService(customBreakpoints);
		expect(Log.orion).toHaveBeenCalledOnce();
		expect(service.BPtablet).toBe(800);
		expect(service.BPtabletLandscape).toBe(1024);
		expect(service.BPdesktop).toBe(1300);
	});

	it('should set initial window size on construction', async () => { // 1. Ajout de "async"
		mockWindow.innerWidth = 1200;
		mockWindow.innerHeight = 800;
		
		vi.resetModules();

		const { default: useResponsiveNew } = await import('../../../../services/ResponsiveService');
		const service = useResponsiveNew();
		
		expect(service.ww).toBe(1200);
		expect(service.wh).toBe(800);
	});


	describe('Breakpoint computed properties', () => {
		it('should be correct for a phone size (ww < 768)', () => {
			const service = useResponsive();
			mockWindow.innerWidth = 480;
			service.setWindowSize();

			expect(service.ww).toBe(480);
			expect(service.onPhone).toBe(true);
		});

	});

	it('should update window size when setWindowSize is called', () => {
		const service = useResponsive();
		expect(service.ww).toBe(1024);

		mockWindow.innerWidth = 500;
		mockWindow.innerHeight = 1000;
		service.setWindowSize();

		expect(service.ww).toBe(500);
		expect(service.wh).toBe(1000);
		expect(service.onPhone).toBe(true);
	});

});