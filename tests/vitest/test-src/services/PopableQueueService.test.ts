
import { describe, it, expect, vi } from 'vitest';
import usePopableQueueService from '../../../../services/PopableQueueService';

const getMockInstance = (uid: number): Orion.Popable.PublicIntance => ({
	uid,
	props: {
		programmatic: true,
	},
	isOpen: false,
	close: vi.fn(),
	open: vi.fn(),
});


describe('usePopableQueueService', () => {
	it('should return a singleton instance', () => {
		const instance1 = usePopableQueueService();
		const instance2 = usePopableQueueService();
		expect(instance1).toBe(instance2);
	});

	it('should have empty queues on initial state', () => {
		const service = usePopableQueueService();
		expect(service.queue).toBeDefined();
		expect(service.queueIds).toEqual([]);
		expect(service.asideQueue).toEqual([]);
		expect(service.modalQueue).toEqual([]);
		expect(service.notifQueue).toEqual([]);
	});

	it('should register a popable instance and allow retrieval', () => {
		const service = usePopableQueueService();
		const mockInstance = getMockInstance(1);

		service.register(1, mockInstance);

		const retrievedInstance = service.getInstance(1);
		expect(retrievedInstance).toBe(mockInstance);
	});

	it('should return undefined for a non-registered instance UID', () => {
		const service = usePopableQueueService();
		expect(service.getInstance(9999)).toBeUndefined();
	});

	it('should unregister a popable instance', () => {
		const service = usePopableQueueService();
		const mockInstance = getMockInstance(2);

		service.register(2, mockInstance);
		expect(service.getInstance(2)).toBe(mockInstance);

		service.unregister(2);
		expect(service.getInstance(2)).toBeUndefined();
	});

	it('should handle multiple registrations and unregistrations correctly', () => {
		const service = usePopableQueueService();
		const instance10 = getMockInstance(10);
		const instance20 = getMockInstance(20);

		service.register(10, instance10);
		service.register(20, instance20);

		expect(service.getInstance(10)).toBe(instance10);
		expect(service.getInstance(20)).toBe(instance20);

		service.unregister(10);

		expect(service.getInstance(10)).toBeUndefined();
		expect(service.getInstance(20)).toBe(instance20);

		service.unregister(20);
		expect(service.getInstance(20)).toBeUndefined();
	});
});

