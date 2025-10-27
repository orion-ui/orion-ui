import { useMonkey } from 'services';
import OrionDateTableSetupService, { OrionDateTableEmits, OrionDateTableProps } from '../../DateTable/src/OrionDateTableSetupService';
import { groupBy } from 'lodash-es';

export type OrionDateTableHorizontalEmits = OrionDateTableEmits

export type OrionDateTableHorizontalProps = OrionDateTableProps

type PeriodDay = {
	color?: Orion.ColorExtendedAndGreys;
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

export default class OrionDateTableHorizontalSetupService extends OrionDateTableSetupService {
	static readonly defaultProps = {
		canGoNextMonth: true,
		canGoPrevMonth: true,
		type: 'date' as Orion.DateTable.Type,
		weeksToDisplay: 6,
	};

	get daysToDisplay () {
		let firstDayOfMonth = this.firstDayOfCurrentMonth;
		if (firstDayOfMonth === 0) firstDayOfMonth = 7;

		const startDate = new Date(this.currentYear, this.currentMonth, this.props.startDate?.getDate() ?? 1);
		const endDate = new Date(this.currentYear, this.currentMonth + 2, this.props.endDate?.getDate() ?? 0);
		// remove time portion
		startDate.setHours(0, 0, 0, 0);
		endDate.setHours(0, 0, 0, 0);

		const dates = [] as PeriodDay[];
		for (let i = startDate; i <= endDate; i.setDate(i.getDate() + 1)) {

			let day: PeriodDay = {
				isStart: false,
				isEnd: false,
				isSelected: false,
				exclude: false,
				number: i.getDate(),
				month: i.getMonth(),
				year: i.getFullYear(),
				date: new Date(i),
				period: [],
			};

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


			dates.push(day);
		}

		return Object.values(groupBy(dates, date => `${date.year}-${date.month}`));
	}

	getClassForDay (day: PeriodDay) {
		const classes = super.getClassForDay(day);
		const dayDate = day.date;

		if (dayDate.valueOf() === useMonkey(new Date()).toMidnight().valueOf()) {
			classes.push('today');
		}

		if (this.props.type === 'range') {
			if (this.range?.value?.start && useMonkey(this.range?.value?.start).toMidnight().valueOf() === dayDate.valueOf()
					|| this.range?.value?.end && useMonkey(this.range?.value?.end).toMidnight().valueOf() === dayDate.valueOf()) {
				classes.push('selected');
			}
		} else if (this.multiple.value?.length) {
			if (dayDate && this.multiple.value?.find(x => x.getTime() === dayDate.getTime()))
				classes.push('selected');
		} else if (this.vModel?.value && useMonkey(this.vModel?.value).toMidnight().valueOf() === dayDate.valueOf()) {
			classes.push('selected');
		}

		return classes;
	}

}
