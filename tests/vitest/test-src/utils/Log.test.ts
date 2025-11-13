
import { reactive, ref } from 'vue';
import { describe, it, expect, vi, beforeEach, afterAll } from 'vitest';
vi.unmock('../../../../utils/Log');

import { Log } from '../../../../utils/Log';

describe('utils/Log.ts', () => {
	const consoleLogSpy = vi.spyOn(console, 'log').mockImplementation(() => {});

	beforeEach(() => {
		vi.clearAllMocks();
	});

	afterAll(() => {
		vi.restoreAllMocks();
	});

	describe('info()', () => {
		it('should log a string payload with a default title', () => {
			Log.info('test message');
			expect(consoleLogSpy).toHaveBeenCalledWith('%cINFO ➤', 'color:#198CFF; font-weight:600', 'test message');
		});

		it('should log an object payload with a custom title', () => {
			const payload = { id: 1, value: 'data' };
			Log.info(payload, 'Custom Title');
			expect(consoleLogSpy).toHaveBeenCalledWith('%cCustom Title ➤', 'color:#198CFF; font-weight:600', payload);
		});

		it('should log the unwrapped value of a ref', () => {
			const payload = ref('ref value');
			Log.info(payload);
			expect(consoleLogSpy).toHaveBeenCalledWith('%cINFO ➤', 'color:#198CFF; font-weight:600', 'ref value');
		});

		it('should log the raw value of a reactive object', () => {
			const payload = reactive({ user: 'Orion' });
			Log.info(payload);
			expect(consoleLogSpy).toHaveBeenCalledWith('%cINFO ➤', 'color:#198CFF; font-weight:600', { user: 'Orion' });
		});
	});

	describe('success()', () => {
		it('should log a success message', () => {
			Log.success('Operation successful');
			expect(consoleLogSpy).toHaveBeenCalledWith('%cSUCCESS ➤', 'color:#00d883; font-weight:600', 'Operation successful');
		});
	});

	describe('warn()', () => {
		it('should log a warning message', () => {
			Log.warn('This is a warning');
			expect(consoleLogSpy).toHaveBeenCalledWith('%cWARN ➤', 'color:#ff7043; font-weight:600', 'This is a warning');
		});
	});

	describe('error()', () => {
		it('should log an error message', () => {
			Log.error('An error occurred');
			expect(consoleLogSpy).toHaveBeenCalledWith('%cERROR ➤', 'color:#ff0033; font-weight:600', 'An error occurred');
		});
	});

	describe('orion()', () => {
		const originalProd = import.meta.env.PROD;

		afterEach(() => {
			import.meta.env.PROD = originalProd;
		});

		it('should log a message when not in production environment', () => {
			import.meta.env.PROD = false;
			Log.orion('Dev message');
			expect(consoleLogSpy).toHaveBeenCalledWith('%c🥨 ORION ➤', 'color:#d5742c; font-weight:600', 'Dev message');
		});

		it('should not log a message when in production environment', () => {
			import.meta.env.PROD = true;
			Log.orion('Prod message');
			expect(consoleLogSpy).not.toHaveBeenCalled();
		});
	});
});
