
import { describe, it, expect, vi } from 'vitest';
import useWindow from '../../../../services/WindowService';

describe('useWindow', () => {
	it('should return the window object when it is defined', () => {
		expect(useWindow()).toBe(window);
		expect(useWindow()).toBeDefined();
	});

	it('should return undefined when window is not defined (SSR)', () => {
		vi.stubGlobal('window', undefined);

		expect(useWindow()).toBeUndefined();

	});
});
