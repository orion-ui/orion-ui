import { reactive, ref, PropType } from 'vue';
import SharedSetupService from '../../Shared/SharedSetupService';
import SharedProps from '../../Shared/SharedProps';
import { debounce } from 'lodash-es';
import { useMonkey } from 'services';

type Props = SetupProps<typeof OrionPlanningSetupService.props>;
type PlanningEmit = {
	(e: 'update:dateRange', payload: Orion.Planning.DateRangeType): void;
};

export default class OrionPlanningSetupService extends SharedSetupService<Props> {
	static props = {
		// @doc props/loading adds a loading icon and disables the button
		// @doc/fr props/loading ajoute une icône de chargement et désactive le bouton
		name: String,

		dayStart: {
			type: Date,
			required: true as const,
			default: new Date(),
		},

		dayEnd: {
			type: Date,
			required: true as const,
			default: new Date(),
		},

		date: {
			type: Date,
			required: true as const,
			default: new Date(),
		},

		dateRange: {
			type: String as PropType<Orion.Planning.DateRangeType>,
			default: 'day',
		},

		events: {
			type: Array<Orion.Planning.Event>,
			required: true as const,
		},
	};

	get activePeriod () { return this.getDisplayDates();};
	protected emit: PlanningEmit;

	_el = ref<RefDom>();

	uid = this.getUid();

	public state = reactive({ });

	getDates (startDate: Date, stopDate: Date) {
		const activeDays = [];
		const currentDate = startDate;
		while (currentDate < stopDate) {
			activeDays.push(new Date(currentDate));
			currentDate.setDate(currentDate.getDate() + 1);
		}
		return activeDays;
	}

	getDisplayDates () {
		let dayStart: Date;
		let dayEnd: Date;
		switch (this.props.dateRange) {
		case 'day':
			return [ this.props.date ];
		case 'week':
			dayStart = this.props.date;
			while (dayStart.getDay() !== 1) {
				dayStart.setDate(dayStart.getDate() - 1);
			}
			dayEnd = new Date(dayStart);
			dayEnd.setDate(dayEnd.getDate() + 7);
			return this.getDates(dayStart, dayEnd);
		case 'month':
			dayStart = this.props.date;
			dayStart.setDate(1);
			dayEnd = new Date(dayStart);
			dayEnd.setMonth(dayEnd.getMonth() + 1);
			return this.getDates(dayStart, dayEnd);
		}
	}

	placeEventInPlanning = debounce(async () => {
		const datesElts = document.getElementsByClassName('orion-planning-day');

		if (datesElts.length === 0) return;
		const rectBase = datesElts[0].getBoundingClientRect();

		let currentTop = 48;

		this.props.events.forEach((event) => {
			currentTop = this.placeEvent(event, rectBase.left, currentTop);

			let currentsubEvent = event.subEvent;
			while (currentsubEvent) {
				currentTop = this.placeEvent(currentsubEvent, rectBase.left, currentTop);
				currentsubEvent = currentsubEvent.subEvent;
			}

		});
	}, 80);

	placeEvent (event: Orion.Planning.Event, leftBase: number, currentTop: number) {
		const eventElt = document.getElementById('event-' + event.id);
		const beginElt = document.getElementById(`date-${useMonkey(event.begin).toReadable('$DD-$MM-$YYYY')}`);
		const endElt = document.getElementById(`date-${useMonkey(event.end).toReadable('$DD-$MM-$YYYY')}`);
		let beginPos = -16;

		if (!eventElt) return currentTop;
		eventElt.style.display = 'flex';
		if (!beginElt && !endElt) {
			eventElt.style.display = 'none';
			return currentTop;
		}
		if (!beginElt) eventElt.style.left = '-1rem';
		else {
			const rectBegin = beginElt.getBoundingClientRect();
			eventElt.style.left = rectBegin.left - leftBase + 'px';
			beginPos = rectBegin.left - leftBase;
		}
		if (!endElt) eventElt.style.right = '-1rem';
		else {
			const rectEnd = endElt.getBoundingClientRect();
			eventElt.style.width = rectEnd.right - beginPos - leftBase + 'px';
		}

		eventElt.style.top = currentTop + 'px';
		currentTop += eventElt.getBoundingClientRect().height + 4;

		return currentTop;
	}

	onBeforeMounted () {
		super.onBeforeMount();
	}

	moveEventElt (eventElt: HTMLElement, event: MouseEvent) {
		eventElt.style.left = event.clientX + 'px';
		eventElt.style.top = event.clientY + 'px';
	}

	onMounted () {
		this.placeEventInPlanning();
		window.addEventListener('resize', this.debouncePlaceEventInPlanning.bind(this));

		this.props.events.forEach((event) => {
			const eventElt = document.getElementById('event-'+event.id);

			if (!eventElt) return;
			eventElt.addEventListener('mousedown', (e) => {
				eventElt.addEventListener('mousemove', this.moveEventElt(eventElt, this));
			});
			eventElt.addEventListener('mouseup', () => {
				eventElt.removeEventListener('mousemove');
			});
		});
	}

	onUnmounted () {
		this.window?.removeEventListener('resize', this.debouncePlaceEventInPlanning.bind(this));
	};

	debouncePlaceEventInPlanning () {
		this.placeEventInPlanning();
	}

	isSameDay (d1 : Date, d2 : Date) {
		return d1.getDate() === d2.getDate() &&
				d1.getMonth() === d2.getMonth() &&
				d1.getFullYear() === d2.getFullYear();
	}

	changeDateRange (dateRange: Orion.Planning.DateRangeType) {
		this.emit('update:dateRange', dateRange);
		this.debouncePlaceEventInPlanning();
	}

	constructor (props: Props, emit: PlanningEmit) {
		super(props);
		this.emit = emit;
	}
}
