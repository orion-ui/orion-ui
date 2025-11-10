import {
	describe,
	it,
	expect,
	vi,
	beforeEach,
	afterEach,
} from 'vitest';
import Log from '../../../../utils/Log';
import { Bus, logBusEvents } from '../../../../utils/Bus';

vi.mock('../../../../utils/Log', () => ({
	default: {
		info: vi.fn(),
	},
}));

describe('Bus', () => {
	beforeEach(() => {
		Bus.all.clear();
	});

	afterEach(() => {
		vi.clearAllMocks();
	});

	it('logBusEvents doit enregistrer un auditeur d\'événements sur le bus', () => {
		const busOnSpy = vi.spyOn(Bus, 'on');

		logBusEvents();

		expect(busOnSpy).toHaveBeenCalledOnce();
		expect(busOnSpy).toHaveBeenCalledWith('*', expect.any(Function));
	});

	it('doit appeler Log.info avec le type d\'événement et les données lorsqu\'un événement est émis', () => {
		const eventType = 'test-event';
		const eventPayload = { data: 'test-payload' };

		logBusEvents(); 
		Bus.emit(eventType, eventPayload); 

		expect(Log.info).toHaveBeenCalledOnce();
		expect(Log.info).toHaveBeenCalledWith(eventPayload, `Bus ~ ${eventType}`);
	});

	it('doit gérer les événements sans données', () => {
		const eventType = 'simple-event';

		logBusEvents();
		Bus.emit(eventType); 
		expect(Log.info).toHaveBeenCalledOnce();
		expect(Log.info).toHaveBeenCalledWith(undefined, `Bus ~ ${eventType}`);
	});
});