
import { describe, it, expect, vi, beforeEach } from 'vitest';
import Log from '../../../../utils/Log';

vi.mock('utils/Log', () => ({
	default: {
		orion: vi.fn(),
		info: vi.fn(),
		success: vi.fn(),
		warn: vi.fn(),
		error: vi.fn(),
	},
}));

type MockOrionTour = {
	start: (index?: number) => void;
	stop: () => void;
};

describe('TourService and useTour', () => {
	beforeEach(() => {
		vi.resetModules();
		vi.clearAllMocks();
	});


	it('register() should add a tour to the state and return it', async () => {
		const { TourService } = await import('../../../../services/TourService');
		const service = new TourService();
		const mockTour: MockOrionTour = { start: vi.fn(), stop: vi.fn() };

		const registeredTour = service.register('myTour', mockTour as any);

		expect(service.state['myTour']).toBe(mockTour);
		expect(registeredTour).toBe(mockTour);
	});

	it('register() should do nothing and return undefined if tour is not provided', async () => {
		const { TourService } = await import('../../../../services/TourService');
		const service = new TourService();

		const result = service.register('myTour', undefined);

		expect(service.state).not.toHaveProperty('myTour');
		expect(result).toBeUndefined();
	});

	it('start() should call start on the active tour with the provided index', async () => {
		const { TourService } = await import('../../../../services/TourService');
		const service = new TourService();
		const mockTour: MockOrionTour = { start: vi.fn(), stop: vi.fn() };
		service.tour = mockTour as any;

		service.start(5);

		expect(mockTour.start).toHaveBeenCalledOnce();
		expect(mockTour.start).toHaveBeenCalledWith(5);
	});

	it('start() should call start on the active tour with default index 0', async () => {
		const { TourService } = await import('../../../../services/TourService');
		const service = new TourService();
		const mockTour: MockOrionTour = { start: vi.fn(), stop: vi.fn() };
		service.tour = mockTour as any;

		service.start();

		expect(mockTour.start).toHaveBeenCalledOnce();
		expect(mockTour.start).toHaveBeenCalledWith(0);
	});

	it('stop() should call stop on the active tour', async () => {
		const { TourService } = await import('../../../../services/TourService');
		const service = new TourService();
		const mockTour: MockOrionTour = { start: vi.fn(), stop: vi.fn() };
		service.tour = mockTour as any;

		service.stop();

		expect(mockTour.stop).toHaveBeenCalledOnce();
	});

	it('useTour() should register a new tour and set it as the active tour', async () => {
		const { default: useTour, TourService } = await import('../../../../services/TourService');
		const mockTour: MockOrionTour = { start: vi.fn(), stop: vi.fn() };

		const serviceInstance = useTour('newTour', mockTour as any);

		expect(serviceInstance).toBeInstanceOf(TourService);
		expect(serviceInstance.state['newTour']).toBe(mockTour);
		expect(serviceInstance.tour).toBe(mockTour);
	});

	it('useTour() should retrieve an existing tour and set it as the active tour', async () => {
		const { default: useTour } = await import('../../../../services/TourService');
		const mockTour: MockOrionTour = { start: vi.fn(), stop: vi.fn() };

		useTour('existingTour', mockTour as any);

		const serviceInstance = useTour('existingTour');

		expect(serviceInstance.state['existingTour']).toBe(mockTour);
		expect(serviceInstance.tour).toBe(mockTour);
	});

	it('useTour() should switch the active tour when called with different names', async () => {
		const { default: useTour } = await import('../../../../services/TourService');
		const mockTourA: MockOrionTour = { start: vi.fn(), stop: vi.fn() };
		const mockTourB: MockOrionTour = { start: vi.fn(), stop: vi.fn() };

		const serviceInstance1 = useTour('tourA', mockTourA as any);
		expect(serviceInstance1.tour).toBe(mockTourA);
		expect(serviceInstance1.state['tourA']).toBe(mockTourA);

		const serviceInstance2 = useTour('tourB', mockTourB as any);
		expect(serviceInstance2.tour).toBe(mockTourB);
		expect(serviceInstance2.state['tourB']).toBe(mockTourB);
		expect(serviceInstance2.state['tourA']).toBe(mockTourA);

		const serviceInstance3 = useTour('tourA');
		expect(serviceInstance3.tour).toBe(mockTourA);
	});
});
