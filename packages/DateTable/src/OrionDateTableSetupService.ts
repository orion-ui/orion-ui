import { PropType, reactive, ref, watchEffect } from 'vue';
import { uniqBy } from 'lodash-es';
import useMonkey from 'services/MonkeyService';
import SharedSetupService from '../../Shared/SharedSetupService';

type Props = SetupProps<typeof OrionDateTableSetupService.props>

type PeriodDay = {
	color?: Orion.Color;
	date: Date;
	isStart: boolean;
	isEnd: boolean;
	isSelected: boolean;
	exclude: boolean;
	number: number;
	month: number;
	year: number;
	period: Orion.Period[];
	callback?: () => void;
}

type DateTableEmit = {
	(e: 'update:modelValue', payload: Nil<Date>): void;
	(e: 'update:range', payload: Nil<Orion.DateRange>): void;
	(e: 'update:multiple', payload: Nil<Date[]>): void;
	(e: 'update:dayHover', payload: Nil<Date>): void;
	(e: 'change-month', payload: { month: number, year: number }): void;
	(e: 'select-specific', payload: Orion.Period | PeriodDay): void;
	(e: 'select-period', payload: Orion.Period[]): void;
	(e: 'select-day', payload: Orion.Period | PeriodDay): void;
}

export default class OrionDateTableSetupService extends SharedSetupService<Props> {
	static props = {
		// @doc props/month if set, displays only months
		// @doc/fr props/month si défini, affiche uniquement les mois
		month: Boolean,
		// @doc props/modelValue of the dateTable
		// @doc/fr props/modelValue du composant
		modelValue: {
			type: Date as PropType<Nil<Date>>,
			default: undefined,
		},
		// @doc props/range the modelValue if the type is set to `range`
		// @doc/fr props/range modelValue du composant si la prop `type` est `range`
		range: {
			type: Object as PropType<Nil<Orion.DateRange>>,
			default: undefined,
		},
		// @doc props/multiple the modelValue if the type is set to `multiple`
		// @doc/fr props/multiple modelValue du composant si la prop `type` est `multiple`
		multiple: {
			type: Array as PropType<Date[]>,
			default: () => [],
		},
		// @doc props/dayHover the value of the hovered day
		// @doc/fr props/dayHover valeur du jour survolé
		dayHover: {
			type: Object as PropType<Nil<Date>>,
			default: undefined,
		},
		// @doc props/rangeStart if set, defines the range start value as the current value
		// @doc/fr props/rangeStart si définie, la date sélectionnée est le début de la période
		rangeStart: Boolean,
		// @doc props/rangeEnd if set, defines the range end value as the current value
		// @doc/fr props/rangeEnd si définie, la date selectionnée est la fin de la période
		rangeEnd: Boolean,
		// @doc props/disableMonthAndYear disabled month and year selection on top
		// @doc/fr props/disableMonthAndYear désactive la sélection du mois et de l'année en haut du calendrier
		disableMonthAndYear: Boolean,
		// @doc props/minDate the minimum date which can be selected
		// @doc/fr props/minDate la date minimum qui peut être selectionée
		minDate: {
			type: Date as PropType<Nil<Date>>,
			default: undefined,
		},
		// @doc props/maxDate the maximum date which can be selected
		// @doc/fr props/maxDate la date maximum qui peut être sélectionnée
		maxDate: {
			type: Date as PropType<Nil<Date>>,
			default: undefined,
		},
		// @doc props/dateSelected the selected date
		// @doc/fr props/dateSelected la date selectionée
		dateSelected: {
			type: Date as PropType<Nil<Date>>,
			default: undefined,
		},
		// @doc props/type the type of the model value
		// @doc/fr props/type le type de modelValue
		type: {
			type: String as PropType<Orion.DateTableType>,
			default: 'date',
			validator: (val: Orion.DateTableType) => ['date', 'range', 'multiple', 'month'].includes(val),
		},
		// @doc props/canGoNextMonth allows the navigation to the next month
		// @doc/fr props/canGoNextMonth permet la navigation vers le mois suivant
		canGoNextMonth: {
			type: Boolean,
			default: true,
		},
		// @doc props/canGoPrevMonth allows the navigation to the previous month
		// @doc/fr props/canGoPrevMonth permet la navigation vers le mois précédent
		canGoPrevMonth: {
			type: Boolean,
			default: true,
		},
		// @doc props/periods periods to display on the table
		// @doc/fr props/periods périodes à afficher
		periods: {
			type: Array as PropType<Nil<Orion.Period[]>>,
			default: undefined,
		},
	};

	private emit: DateTableEmit;
	private state = reactive({
		currentDate: new Date(),
		viewMonth: false,
		viewYears: false,
		filter: [] as string[],
		filterHover: undefined as Undef<string>,
		colorArray: [] as string[],
		dayHover: undefined as Nil<Date>,
		selectedDates: [] as PeriodDay[],
	});

	_options = ref<RefDom>();

	private get periodsToFilter () {
		if (this.state.filter.length) {
			return this.props.periods?.filter(x => !this.state.filter.includes(x.color));
		} else {
			return this.props.periods;
		}
	}

	private get currentMonth () {
		return this.state.currentDate.getMonth();
	}

	private get firstDayOfCurrentMonth () {
		const firstDay = new Date(this.currentYear, this.currentMonth, 1);
		return firstDay.getDay();
	}

	private get lastDayOfCurrentMonth () {
		const lastDay = new Date(this.currentYear, this.currentMonth + 1, 0);
		return lastDay.getDate();
	}

	private get rangeStartValue () {
		if (this.range?.start) {
			return useMonkey(this.range.start).toMidnight().valueOf();
		}
	}

	private get rangeEndValue () {
		if (this.range?.end) {
			return useMonkey(this.range.end).toMidnight().valueOf();
		}
	}

	private get vModel () {
		return this.props.modelValue;
	}

	private set vModel (val) {
		this.emit('update:modelValue', val);
	}

	private get range () {
		return this.props.range;
	}

	private set range (val) {
		this.emit('update:range', val);
	}

	private get dayHover () {
		return this.props.dayHover ?? this.state.dayHover;
	}

	private set dayHover (val) {
		this.state.dayHover = val;
		this.emit('update:dayHover', val);
	}

	get daysToDisplay () {
		const prevMonthEnd = new Date(this.currentYear, this.currentMonth, 0).getDate();
		const weeks = [];
		let dayInMonth = 1;
		let dayInNextMonth = 1;
		let firstDayOfMonth = this.firstDayOfCurrentMonth;

		if (firstDayOfMonth === 0) firstDayOfMonth = 7;

		for (let i = 1; i <= 6; i++) {
			const days = [];

			for (let d = 7; d >= 1; d--) {
				const currentDay = i * 7 - d;
				let day: PeriodDay = {
					isStart: false,
					isEnd: false,
					isSelected: false,
					exclude: false,
					number: dayInMonth,
					month: this.currentMonth,
					year: this.currentYear,
					date: new Date(this.currentYear, this.currentMonth, dayInMonth),
					period: [],
				};

				if (i === 1 && currentDay < firstDayOfMonth - 1) {
					day.number = (prevMonthEnd - (firstDayOfMonth - 1) + (currentDay + 1));
					day.month = this.currentMonth === 0 ? 11 : this.currentMonth - 1;
					day.year = this.currentMonth === 0 ? this.currentYear -1 : this.currentYear;
				} else if (dayInMonth > this.lastDayOfCurrentMonth) {
					day.number = (dayInNextMonth);
					day.month = this.currentMonth === 11 ? 0 : this.currentMonth + 1;
					day.year = this.currentMonth === 11 ? this.currentYear + 1 : this.currentYear;
					dayInNextMonth++;
				} else {
					dayInMonth++;
				}

				day.date = new Date(day.year, day.month, day.number);

				if (this.props.periods?.length) {
					const dayDate = day.date;
					const nextDayDate = new Date(day.year, day.month, day.number + 1);
					const prevDayDate = new Date(day.year, day.month, day.number - 1);
					if (this.props.dateSelected && useMonkey(this.props.dateSelected).toMidnight().valueOf() === dayDate.valueOf()) {
						day.isSelected = true;
					}

					this.periodsToFilter?.forEach((period) => {
						const nextDayIsExclude = (period.specific?.findIndex((x) => {
							return useMonkey(x.date).toMidnight().valueOf() === nextDayDate.valueOf() && x.exclude;
						}) ?? -1) > -1;
						const prevDayIsExclude = (period.specific?.findIndex((x) => {
							return useMonkey(x.date).toMidnight().valueOf() === prevDayDate.valueOf() && x.exclude;
						}) ?? -1) > -1;

						if (dayDate >= useMonkey(period.start).toMidnight() && dayDate <= useMonkey(period.end).toMidnight()) {
							const isStart = dayDate.valueOf() === useMonkey(period.start).toMidnight().valueOf() || prevDayIsExclude;
							const isEnd = dayDate.valueOf() === useMonkey(period.end).toMidnight().valueOf() || nextDayIsExclude;

							// Si le jour traité est un jour specific
							if (period.specific?.map(x => useMonkey(x.date).toMidnight().valueOf()).includes(dayDate.valueOf())) {
								const specificDay = period.specific.find(x => useMonkey(x.date).toMidnight().valueOf() === dayDate.valueOf());
								day = {
									...day,
									...specificDay,
									isStart: true,
									isEnd: true,
								};
							}

							if (!day.exclude) {
								day = this.addPeriodToDay(period, day, isStart, isEnd);
							}
						}
					});
				}

				days.push(day);
			}

			/* if (i === 1) {
				console.clear();
				console.log(`🚀 ~ getdaysToDisplay ~ firstDayOfMonth`, firstDayOfMonth);
				console.log(`🚀 ~ getdaysToDisplay ~ days`, useMonkey(days).mapKey('date'));
			} */

			weeks.push(days);
		}
		return weeks;
	}

	get rangeYears () {
		const startYear = this.currentYear - (this.currentYear % 10);
		const range = [];
		for (let i = 0; i < 10; i++) {
			range.push(startYear + i);
		}

		return range;
	}

	get monthName () { return this.lang.MONTH_NAME[this.currentMonth];}
	get currentYear () { return this.state.currentDate.getFullYear();}
	get viewMonth () {return this.state.viewMonth;}
	get viewYears () {return this.state.viewYears;}
	get filter () { return this.state.filter;}
	get selectedDates () { return this.state.selectedDates; }

	get labels () {
		if (this.props.periods?.length) {
			return uniqBy(this.props.periods.map(x => ({
				label: x.label,
				color: x.color,
			})), 'label');
		}
		return [];
	}

	get publicInstance () {
		return {
			...super.publicInstance,
			getCurrentDate: () => this.state.currentDate as Date,
			getCurrentMonth: () => this.currentMonth,
			getCurrentYear: () => this.currentYear,
			selectMonth: this.selectMonth.bind(this),
			selectYear: this.selectYear.bind(this),
		};
	}


	constructor (props: Props, emit: DateTableEmit) {
		super(props);
		this.emit = emit;

		watchEffect(() => this.state.currentDate = this.vModel ?? new Date());
	}

	protected async onBeforeMount () {
		this.setDateCalendar();
		this.createColorsArrayFromPeriods();
		if (this.props.month)
			this.state.viewMonth = true;
	}

	protected onUpdated () {
		this.triggerSelectPeriod();
		if (this.props.month)
			this.state.viewMonth = true;
	}


	private triggerSelectPeriod () {
		// Emit selected period during component update
		// to avoir the need to click again on a day to display associated Period
		this.daysToDisplay.forEach((week) => {
			const sendPeriodOfSelected = week.find(d => d.isSelected === true);
			if (sendPeriodOfSelected) this.selectPeriod(sendPeriodOfSelected?.period);
		});
	}

	private addPeriodToDay (period: Orion.Period, day: PeriodDay, isStart = false, isEnd = false) {
		const newPeriod = { ...period };
		newPeriod.isStart = isStart;
		newPeriod.isEnd = isEnd;
		day.period.push(newPeriod);

		return day;
	}

	private createColorsArrayFromPeriods () {
		if (this.props.periods?.length) {
			const setOfColors = new Set(this.props.periods.map(x => x.color));
			this.state.colorArray = [...setOfColors];
		}
	}

	filterColorOnClick (color: string) {
		if (this.state.filter.includes(color)) {
			this.state.filter.splice(this.state.filter.indexOf(color), 1);
		} else {
			this.state.filter.push(color);
		}
		this.state.filterHover = undefined;
	}

	filterColorOnHover (color: string, leave = false) {
		if (!this.state.filter.includes(color)) {
			this.state.filterHover = leave ? undefined : color;
		}
	}

	getClassForBackground (period: Orion.Period | PeriodDay) {
		if (!period) return;

		const cssClass = ['emphasis', `emphasis--${period.color}`];

		if (this.state.filterHover && this.state.filterHover !== period.color) {
			cssClass.push('emphasis--opacity');
		}

		if (period.isEnd && period.isStart) {
			cssClass.push('emphasis--circle');
		}

		if (period.isStart && period.isEnd === false) {
			cssClass.push('emphasis-border-radius--left', 'emphasis-border-radius');
		}

		if (period.isEnd && period.isStart === false) {
			cssClass.push('emphasis-border-radius--right', 'emphasis-border-radius');
		}

		return cssClass;
	}

	getClassForNotification (day: PeriodDay) {
		if (this.vModel?.getDate() === day.number) {
			return 'notification--white';
		}
		if (day.month !== this.currentMonth) {
			return 'notification--lighter';
		}
	}

	showMonths () {
		if (!this.props.disableMonthAndYear) {
			this.state.viewMonth = true;
		}
	}

	showYears () {
		if (!this.props.disableMonthAndYear) {
			this.state.viewMonth = false;
			this.state.viewYears = true;
		}
	}

	switchPeriod (numberOfperiod: number) {
		if (this.state.viewMonth) {
			this.state.currentDate = new Date(this.currentYear + numberOfperiod, this.currentMonth, 1);
		} else if (this.state.viewYears) {
			const year = numberOfperiod === -1 ? this.rangeYears[0] : this.rangeYears[this.rangeYears.length - 1];
			this.state.currentDate = new Date(year + numberOfperiod, this.currentMonth, 1);
		} else {
			if ((numberOfperiod === -1 && this.props.canGoPrevMonth) || (numberOfperiod === 1 && this.props.canGoNextMonth)) {
				this.state.currentDate = new Date(this.currentYear, this.currentMonth + numberOfperiod, 1);
				this.emit('change-month', {
					month: this.currentMonth,
					year: this.currentYear,
				});
			}
		}
	}

	private selectPeriod (period: Orion.Period[]) {
		period.forEach((element) => {
			if (element.callback) {
				element.callback();
			}
		});
		this.emit('select-period', period);
	}

	selectDate (day: PeriodDay) {
		let newDate = day.date;

		if (this.props.minDate && newDate < this.props.minDate) {
			if (this.props.type === 'multiple') return;
			newDate = this.props.minDate;
		}

		if (this.props.maxDate && newDate > this.props.maxDate) {
			if (this.props.type === 'multiple') return;
			newDate = this.props.maxDate;
		}

		if (this.props.type === 'range') {
			if (!this.range?.selecting) {
				this.range = {
					start: newDate,
					end: undefined,
					selecting: true,
				};
			} else {
				if (!!this.range?.start && newDate >= this.range.start) {
					this.range = {
						...this.range,
						end: newDate,
						selecting: false,
					};
				} else {
					this.range = {
						start: newDate,
						end: this.range?.start,
						selecting: false,
					};
				}
			}
		} else if (this.props.type === 'multiple') {
			const targetIndex = this.props.multiple.findIndex(x => x.valueOf() === newDate.valueOf());
			if (targetIndex >= 0) {
				this.props.multiple.splice(targetIndex, 1);
			} else {
				this.props.multiple.push(newDate);
			}
		} else {
			this.vModel = newDate;
		}
	}

	getCssClassForDayInRange (day: PeriodDay) {
		if (this.props.type === 'date') return;
		if (!this.rangeStartValue) return;

		const dayValue = day.date.valueOf();
		const dayHoverValue = this.dayHover?.valueOf();
		const cssClass: string[] = [];

		if (!this.rangeEndValue && dayHoverValue) {
			if ((dayValue >= this.rangeStartValue && dayValue <= dayHoverValue)
				||(dayValue <= this.rangeStartValue && dayValue >= dayHoverValue)
			) cssClass.push('in-range');

			if ((dayValue >= this.rangeStartValue && dayValue === dayHoverValue)
				||(dayValue === this.rangeStartValue && dayValue >= dayHoverValue)) {
				cssClass.push('in-range--border-right-radius');
			}
			if ((dayValue <= this.rangeStartValue && dayValue === dayHoverValue)
				||(dayValue === this.rangeStartValue && dayValue <= dayHoverValue)) {
				cssClass.push('in-range--border-left-radius');
			}
		} else if (this.rangeEndValue) {
			if (dayValue >= this.rangeStartValue && dayValue <= this.rangeEndValue) cssClass.push('in-range');
			if (dayValue === this.rangeStartValue) cssClass.push('in-range--border-left-radius');
			if (dayValue === this.rangeEndValue) cssClass.push('in-range--border-right-radius');
		}

		return cssClass;
	}

	getClassForDay (day: PeriodDay) {
		const dayDate = day.date;
		const dayIsCurrentMonth = day.month === this.currentMonth;
		const dayIsNextMonth = day.month > this.currentMonth;
		const dayIsprevMonth = day.month < this.currentMonth;
		const dayIsOutOfMonth = dayIsNextMonth || dayIsprevMonth;

		const dayPeriodColors = [];
		// Define day colors for periods highlight
		if (day.color) {
			dayPeriodColors.push(`day--${day.color}`);
		} else if (dayIsCurrentMonth) {
			day.period?.forEach((period) => {
				dayPeriodColors.push(`day--${period.color}`);
			});
		}

		const cssClass: string[] = [];
		// Si le jour sélectionné contient une période, ou une couleur, alors classObject['selected--${day.color} ']
		if (day.isSelected && (day.color || day.period?.length)) {
			const color = day.color ?? useMonkey(day.period).last()?.color;
			cssClass.push(`selected--${color}`);
		}

		// Handle days out of current month
		if (dayIsOutOfMonth) {
			cssClass.push('orion-date-table-row__cell-display--grey');
		}

		// Handle days out of boundaries
		// Only minDate
		if (!this.props.maxDate && this.props.minDate && dayDate < useMonkey(this.props.minDate).toMidnight()) {
			cssClass.push('disable');
		}
		// Only maxDate
		if (!this.props.minDate && this.props.maxDate && dayDate > useMonkey(this.props.maxDate).toMidnight()) {
			cssClass.push('disable');
		}
		// Both
		if (this.props.maxDate && dayDate > useMonkey(this.props.maxDate).toMidnight()
			|| this.props.minDate && dayDate < useMonkey(this.props.minDate).toMidnight()) {
			cssClass.push('disable');
		}

		if (!dayIsOutOfMonth) {
			if (dayDate.valueOf() === useMonkey(new Date()).toMidnight().valueOf()) {
				cssClass.push('today');
			}

			if (this.props.type === 'range') {
				if (this.range?.start && useMonkey(this.range?.start).toMidnight().valueOf() === dayDate.valueOf()
					|| this.range?.end && useMonkey(this.range?.end).toMidnight().valueOf() === dayDate.valueOf()) {
					cssClass.push('selected');
				}
			} else if (this.props.multiple.length) {
				if (dayDate && this.props.multiple.find(x => x.getTime() === dayDate.getTime()))
					cssClass.push('selected');
			} else if (this.vModel && useMonkey(this.vModel).toMidnight().valueOf() === dayDate.valueOf()) {
				cssClass.push('selected');
			}
		}

		return [...dayPeriodColors, ...cssClass];
	}

	getCssClassForMonth (month: number) {
		const cssClass = ['orion-date-table-row__cell orion-date-table-row__cell--month'];

		if (this.props.month) {
			if (this.range?.monthNumber === month)
				cssClass.push('selected');

			if ((this.props.minDate && new Date(this.currentYear, month, 1) < this.props.minDate)
			|| (this.props.maxDate && new Date(this.currentYear, month, new Date(this.currentYear, month+1, 0).getDate()) > this.props.maxDate)) {
				cssClass.push('disabled');
			}
		}

		return cssClass;
	}

	selectMonth (month: number) {
		this.state.currentDate = new Date(this.currentYear, month, 1);
		this.state.viewMonth = false;
		if (this.props.month) {
			if ((this.props.minDate && this.state.currentDate < this.props.minDate)
			|| (this.props.maxDate && new Date(this.currentYear, month, new Date(this.currentYear, month+1, 0).getDate()) > this.props.maxDate))
				return;

			this.range = {
				start: this.state.currentDate,
				end: new Date(this.currentYear, month, new Date(this.currentYear, month+1, 0).getDate()),
				monthNumber: month,
				year: this.currentYear,
			};
		}
	}

	selectYear (year: number) {
		this.state.currentDate = new Date(year, this.currentMonth, 1);
		this.state.viewYears = false;
	}

	private setDateCalendar () {
		const today = new Date();

		if (this.props.type === 'date') {
			this.state.currentDate = this.vModel ?? new Date();
		}

		if (this.props.type === 'range') {
			if (this.props.rangeStart) {
				this.state.currentDate = this.range?.start
					? new Date(this.range.start)
					: new Date();
			}
			if (this.props.rangeEnd) {
				this.state.currentDate = this.range?.end
					? new Date(this.range.end)
					: new Date(today.getFullYear(), today.getMonth() + 1, 1);
			}
		}
	}

	handleSpecificDayCallback (day: Orion.Period | PeriodDay) {
		if (day.callback) {
			day.callback();
			this.emit('select-specific', day);
		}
		this.emit('select-day', day);
	}

	handleMouseOverDay (day: PeriodDay) {
		if (this.props.type === 'range') {
			this.dayHover = day.date;
		}
	}
}
