import { ModelRef, reactive, watchEffect } from 'vue';
import { uniqBy } from 'lodash-es';
import useMonkey from 'services/MonkeyService';
import SharedSetupService from '../../Shared/SharedSetupService';

export type OrionDateTableEmits = {
	(e: 'change-month', payload: { month: number, year: number }): void;
	(e: 'select-specific', payload: Orion.Period | PeriodDay): void;
	(e: 'select-period', payload: Orion.Period[]): void;
	(e: 'select-day', payload: Orion.Period | PeriodDay): void;
}

export type OrionDateTableProps = {
	// @doc props/canGoNextMonth allows the navigation to the next month
	// @doc/fr props/canGoNextMonth permet la navigation vers le mois suivant
	canGoNextMonth: boolean,
	// @doc props/canGoPrevMonth allows the navigation to the previous month
	// @doc/fr props/canGoPrevMonth permet la navigation vers le mois précédent
	canGoPrevMonth: boolean,
	// @doc props/dateSelected the selected date
	// @doc/fr props/dateSelected la date selectionée
	dateSelected?: Nil<Date>,
	// @doc props/disableMonthAndYear disabled month and year selection on top
	// @doc/fr props/disableMonthAndYear désactive la sélection du mois et de l'année en haut du calendrier
	disableMonthAndYear: boolean,
	// @doc props/displayWeekNumber if true, displays week number on each row
	// @doc/fr props/displayWeekNumber si true, affiche le numéro de semaine sur chaque ligne
	displayWeekNumber: boolean,
	// @doc props/maxDate the maximum date which can be selected
	// @doc/fr props/maxDate la date maximum qui peut être sélectionnée
	maxDate?: Nil<Date>,
	// @doc props/minDate the minimum date which can be selected
	// @doc/fr props/minDate la date minimum qui peut être selectionée
	minDate?: Nil<Date>,
	// @doc props/month if set, displays only months
	// @doc/fr props/month si défini, affiche uniquement les mois
	month: boolean,
	// @doc props/periods periods to display on the table
	// @doc/fr props/periods périodes à afficher
	periods?: Nil<Orion.Period[]>,
	// @doc props/rangeEnd if set, defines the range end value as the current value
	// @doc/fr props/rangeEnd si définie, la date selectionnée est la fin de la période
	rangeEnd: boolean,
	// @doc props/rangeStart if set, defines the range start value as the current value
	// @doc/fr props/rangeStart si définie, la date sélectionnée est le début de la période
	rangeStart: boolean,
	// @doc props/type the type of the vModel
	// @doc/fr props/type le type de vModel
	type: Orion.DateTableType,
};

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

export default class OrionDateTableSetupService extends SharedSetupService {
	static readonly defaultProps = {
		canGoNextMonth: true,
		canGoPrevMonth: true,
		disableMonthAndYear: false,
		displayWeekNumber: false,
		month: false,
		multiple: () => [],
		rangeEnd: false,
		rangeStart: false,
		type: 'date' as Orion.DateTableType,
	};


	private state = reactive({
		currentDate: new Date(),
		viewMonth: false,
		viewYears: false,
		filter: [] as string[],
		filterHover: undefined as Undef<string>,
		colorArray: [] as string[],
		selectedDates: [] as PeriodDay[],
	});

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
		if (this.range?.value?.start) {
			return useMonkey(this.range.value.start).toMidnight().valueOf();
		}
	}

	private get rangeEndValue () {
		if (this.range?.value?.end) {
			return useMonkey(this.range.value.end).toMidnight().valueOf();
		}
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

	// @doc vModel/range the vModel if the type is set to `range`
	// @doc/fr vModel/range vModel du composant si la prop `type` est `range`
	// @doc vModel/multiple the vModel if the type is set to `multiple`
	// @doc/fr vModel/multiple vModel du composant si la prop `type` est `multiple`
	// @doc vModel/dayHover the value of the hovered day
	// @doc/fr vModel/dayHover valeur du jour survolé
	constructor (
		protected props: OrionDateTableProps,
		protected emits: OrionDateTableEmits,
		protected vModel: ModelRef<Nil<Date>>,
		protected range: ModelRef<Nil<Orion.DateRange>>,
		protected multiple: ModelRef<Nil<Date[]>>,
		protected dayHover: ModelRef<Nil<Date>>) {
		super();

		watchEffect(() => this.state.currentDate = this.vModel.value ?? new Date());
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
		if (this.vModel.value?.getDate() === day.number) {
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
				this.emits('change-month', {
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
		this.emits('select-period', period);
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
			if (!this.range?.value?.selecting) {
				this.range.value = {
					start: newDate,
					end: undefined,
					selecting: true,
				};
			} else {
				if (!!this.range?.value.start && newDate >= this.range.value.start) {
					this.range.value = {
						...this.range.value,
						end: newDate,
						selecting: false,
					};
				} else {
					this.range.value = {
						start: newDate,
						end: this.range?.value.start,
						selecting: false,
					};
				}
			}
		} else if (this.props.type === 'multiple') {
			const targetIndex = this.multiple.value?.findIndex(x => x.valueOf() === newDate.valueOf());
			if (targetIndex && targetIndex >= 0) {
				this.multiple.value?.splice(targetIndex, 1);
			} else {
				this.multiple.value?.push(newDate);
			}
		} else {
			this.vModel.value = newDate;
		}
	}

	getCssClassForDayInRange (day: PeriodDay) {
		if (this.props.type === 'date') return;
		if (!this.rangeStartValue) return;

		const dayValue = day.date.valueOf();
		const dayHoverValue = this.dayHover.value?.valueOf();
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
				if (this.range?.value?.start && useMonkey(this.range?.value?.start).toMidnight().valueOf() === dayDate.valueOf()
					|| this.range?.value?.end && useMonkey(this.range?.value?.end).toMidnight().valueOf() === dayDate.valueOf()) {
					cssClass.push('selected');
				}
			} else if (this.multiple.value?.length) {
				if (dayDate && this.multiple.value?.find(x => x.getTime() === dayDate.getTime()))
					cssClass.push('selected');
			} else if (this.vModel?.value && useMonkey(this.vModel?.value).toMidnight().valueOf() === dayDate.valueOf()) {
				cssClass.push('selected');
			}
		}

		return [...dayPeriodColors, ...cssClass];
	}

	getCssClassForMonth (month: number) {
		const cssClass = ['orion-date-table-row__cell orion-date-table-row__cell--month'];

		if (this.props.month) {
			if (this.range?.value?.monthNumber === month && this.range?.value.year === this.currentYear)
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

			this.range.value = {
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
			this.state.currentDate = this.vModel.value ?? new Date();
		}

		if (this.props.type === 'range') {
			if (this.props.rangeStart) {
				this.state.currentDate = this.range?.value?.start
					? new Date(this.range.value?.start)
					: new Date();
			}
			if (this.props.rangeEnd) {
				this.state.currentDate = this.range?.value?.end
					? new Date(this.range.value.end)
					: new Date(today.getFullYear(), today.getMonth() + 1, 1);
			}
			if (this.props.month) {
				this.state.currentDate = this.range?.value?.start
					? new Date(this.range?.value?.start)
					: new Date();
			}
		}
	}

	handleSpecificDayCallback (day: Orion.Period | PeriodDay) {
		if (day.callback) {
			day.callback();
			this.emits('select-specific', day);
		}
		this.emits('select-day', day);
	}

	handleMouseOverDay (day: PeriodDay) {
		if (this.props.type === 'range') {
			this.dayHover.value = day.date;
		}
	}

	getWeekNumber (date: Date) {
		return useMonkey(date).getWeekNumber();
	}
}
