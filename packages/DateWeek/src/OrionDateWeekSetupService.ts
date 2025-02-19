import { nextTick, PropType, reactive, ref } from 'vue';
import useMonkey from 'services/MonkeyService';
import SharedSetupService from '../../Shared/SharedSetupService';

type Props = SetupProps<typeof OrionDateWeekSetupService.props>
type DateWeekEmit = { (e: 'update:modelValue', payload: Nil<Orion.DateRange>): void }

export default class OrionDateWeekSetupService extends SharedSetupService<Props> {
	static props = {
		disableMonthAndYear: Boolean,
		hideDisabled: Boolean,
		modelValue: {
			type: Object as PropType<Nil<Orion.DateRange>>,
			default: undefined,
		},
		minDate: {
			type: Date as PropType<Nil<Date>>,
			default: undefined,
		},
		maxDate: {
			type: Date as PropType<Nil<Date>>,
			default: undefined,
		},
	};

	private emit: DateWeekEmit;
	private state = reactive({
		year: new Date().getFullYear(),
		viewYears: false,
	});

	_weekPicker = ref<RefDom>();

	get vModel () {
		return this.props.modelValue;
	}

	private set vModel (val) {
		this.emit('update:modelValue', val);
	}

	get weekOptions () {
		const weekOptions = [];
		let firstWeekStartsInDecember = false;
		for (let i = 1; i <= this.numberOfWeeksInYear(); i++) {
			if (this.props.hideDisabled && this.weekIsDisabled(this.weekDates(i))) continue;


			let weekDates = this.weekDates(i);
			let weekNumber = i;

			//adjust weeknumber depending on the ISO week number
			if (i === 1 && (weekDates.start.getDate() === 5
				|| weekDates.start.getDate() === 6
				|| weekDates.start.getDate() === 7)) {
				firstWeekStartsInDecember = true;
			}

			if (i === this.numberOfWeeksInYear() && firstWeekStartsInDecember) {
				weekNumber = 1;
				if (this.numberOfWeeksInYear() === 53) {
					const lastWeek = this.weekDates(this.numberOfWeeksInYear(this.state.year-1), this.state.year-1);
					weekDates = {
						start: new Date(lastWeek.start.setDate(lastWeek.start.getDate())),
						end: new Date(new Date(weekOptions[0].start).setDate(weekOptions[0].start.getDate() - 1)),
					};
				} else {
					const lastWeek = this.weekDates(this.numberOfWeeksInYear(this.state.year-1), this.state.year-1);
					weekDates = {
						start: new Date(lastWeek.end.setDate(lastWeek.end.getDate()+1)),
						end: new Date(new Date(weekOptions[0].start).setDate(weekOptions[0].start.getDate() - 1)),
					};
				}
			} else {
				weekNumber = firstWeekStartsInDecember ? i+1 : i;
			}

			weekOptions.push({
				...weekDates,
				weekNumber,
				year: this.state.year,
			});
		}

		return weekOptions.toSorted((a, b) => a.weekNumber - b.weekNumber);
	}

	get rangeYears () {
		const startYear = this.state.year - (this.state.year % 10);
		const range = [];
		for (let i = 0; i < 10; i++) {
			range.push(startYear + i);
		}
		return range;
	}

	get year () {
		return this.state.year;
	}

	get viewYears () {
		return this.state.viewYears;
	}

	get publicInstance () {
		return {
			...super.publicInstance,
			_weekPicker: () => this._weekPicker.value,
		};
	}


	constructor (props: Props, emit: DateWeekEmit) {
		super(props);
		this.emit = emit;
	}

	protected onMounted () {
		if (this.vModel?.year) {
			this.state.year = this.vModel.year;
		}

		nextTick(() => {
			const target = this.vModel?.weekNumber && this.vModel?.year === this.state.year
				? this._weekPicker.value?.getElementsByClassName('calendar__week-row--active').item(0)
				: this._weekPicker.value?.querySelector('div.calendar__week-row:not(.calendar__week-row--disabled)');

			if (target) {
				this._weekPicker.value?.scrollTo({
					top: (target as HTMLElement).offsetTop - 120,
					behavior: 'smooth',
				});
			}
		});
	}

	private numberOfWeeksInYear (year? : number) {
		return useMonkey(new Date(year ?? this.state.year, 0, 1)).hasFiftyThreeWeeks() ? 53 : 52;
	}

	private weekDates (weekNumber: number, year?: number) {
		return useMonkey(new Date(year ?? this.state.year, 0, weekNumber*7)).getWeekDates();
	}

	showYears () {
		if (!this.props.disableMonthAndYear) {
			this.state.viewYears = true;
		}
	}

	switchPeriod (numberOfperiod: number) {
		if (this.state.viewYears) {
			this.state.year += numberOfperiod * 10;
		} else {
			this.state.year += numberOfperiod;
		}
	}

	selectYear (targetYear: number) {
		this.state.year = targetYear;
		this.state.viewYears = false;
	}

	selectWeek (week: Orion.DateRange) {
		if (this.props.minDate && week.start && week.start.valueOf() < this.props.minDate.valueOf()) return;
		if (this.props.maxDate && week.end && week.end.valueOf() > this.props.maxDate.valueOf()) return;
		this.vModel = { ...week };
	}

	readableWeek (week: Orion.DateRange) {
		if (week.start && week.end) {
			return this.lang.DATE_FROM_TO
				.replace('$start', useMonkey(week.start).toReadable())
				.replace('$end', useMonkey(week.end).toReadable());
		}
	}

	weekIsDisabled (week: Orion.DateRange) {
		return (this.props.minDate && week.start && week.start < this.props.minDate)
			|| (this.props.maxDate && week.end && week.end > this.props.maxDate);
	}

	weekIsActive (week: Orion.DateRange) {
		return this.vModel?.weekNumber === week.weekNumber
			&& this.vModel?.year === this.year;
	}
}
