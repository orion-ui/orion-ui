import { describe, it, expect, vi, beforeEach } from 'vitest';

vi.mock('utils/Log', () => ({
	default: {
		orion: vi.fn(),
	},
}));

vi.mock('services/WindowService', () => ({
	default: vi.fn(() => ({
		addEventListener: vi.fn(),
	})),
}));

import useMouse from 'services/MouseService';
import Log from 'utils/Log';
import useWindow from 'services/WindowService';

describe('MouseService', () => {
	const mockLogOrion = vi.mocked(Log.orion);
	const mockUseWindow = vi.mocked(useWindow);
	const mockAddEventListener = mockUseWindow.mock.results[0].value.addEventListener;

	const mousedownCallback = vi.mocked(mockAddEventListener).mock.calls[0][1];

	it('should initialize correctly by logging and adding a mousedown event listener', () => {
		expect(mockLogOrion).toHaveBeenCalledWith('MouseService activated');
		expect(mockUseWindow).toHaveBeenCalledOnce();
		expect(mockAddEventListener).toHaveBeenCalledOnce();
		expect(mockAddEventListener).toHaveBeenCalledWith('mousedown', expect.any(Function));
	});

	describe('instance behavior', () => {
		beforeEach(() => {
			useMouse().setLastClickPosition(0, 0);
			mockLogOrion.mockClear();
		});

		it('should return the same singleton instance on every call to useMouse', () => {
			const instance1 = useMouse();
			const instance2 = useMouse();
			expect(instance1).toBe(instance2);
		});

		it('should update lastClickPosition state when setLastClickPosition is called directly', () => {
			const mouseService = useMouse();
			expect(mouseService.lastClickPosition).toEqual({ x: 0, y: 0 });

			mouseService.setLastClickPosition(123, 456);

			expect(mouseService.lastClickPosition).toEqual({ x: 123, y: 456 });
		});

		it('should update lastClickPosition when the mousedown event listener is triggered', () => {
			const mouseService = useMouse();
			const mockMouseEvent = { clientX: 55, clientY: 88 } as MouseEvent;

			expect(mouseService.lastClickPosition).toEqual({ x: 0, y: 0 });

			mousedownCallback(mockMouseEvent);

			expect(mouseService.lastClickPosition).toEqual({ x: 55, y: 88 });
		});
	});
});