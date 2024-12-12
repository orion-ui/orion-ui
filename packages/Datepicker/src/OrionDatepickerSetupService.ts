import { ModelRef, nextTick, reactive, ref, Slots, watchEffect } from 'vue';
import { debounce, isNil, throttle } from 'lodash-es';
import { Dropdown } from 'floating-vue';
import SharedFieldSetupService, { SharedFieldSetupServiceEmits, SharedFieldSetupServiceProps } from '../../Shared/SharedFieldSetupService';
import useMonkey from 'services/MonkeyService';
import { getAppLang } from 'services/LangService';
import { addPopoverBackdropCloseAbility } from 'utils/tools';

export type OrionDatepickerEmits = SharedFieldSetupServiceEmits<Nil<Date>> & {}
export type OrionDatepickerProps = SharedFieldSetupServiceProps & {
	// @doc props/disablePopover if you don't want to use the calendar popover
	// @doc/fr props/disablePopover si vous ne souhaitez pas utiliser la popover avec le calendrier
	disablePopover?: boolean,
	// @doc props/displayWeekNumber if true, displays week number on each row
	// @doc/fr props/displayWeekNumber si true, affiche le numéro de semaine sur chaque ligne
	displayWeekNumber?: boolean,
	// @doc props/hideDisabled hide disabled dates (currently for type="week" only)
	// @doc/fr props/hideDisabled cache les dates désactivées (actuellement uniquement avec type="week")
	hideDisabled?: boolean,
	// @doc props/maxDate the maximum date which can be selected
	// @doc/fr props/maxDate la date maximum qui peut être sélectionnée
	maxDate?: Date,
	// @doc props/minDate the minimum date which can be selected
	// @doc/fr props/minDate la date minimum qui peut être sélectionnée
	minDate?: Date,
	// @doc props/multipleLabelColor color of the displayed dates is the type is set to `multiple`
	// @doc/fr props/multipleLabelColor couleurs des dates affichées si le type est défini à `multiple`
	multipleLabelColor?: Orion.ColorExtendedAndGreys,
	// @doc props/preserveTime keep the current time value when changing date
	// @doc/fr props/preserveTime conserve la valeur actuelle de l'heure lors du changement de date
	preserveTime?: boolean,
	// @doc props/time displays also hours/minutes
	// @doc/fr props/time affiche aussi les heures/minutes
	time?: boolean,
	// @doc props/type the type of the vModel
	// @doc/fr props/type le type de vModel
	type?: Orion.DatepickerType,
	// @doc props/valueDisplayFormat function to customize the display format
	// @doc/fr props/valueDisplayFormat fonction pour personnaliser l'affichage
	valueDisplayFormat?: Function,
};

export default class OrionDatepickerSetupService extends SharedFieldSetupService<OrionDatepickerProps, Nil<Date>> {
	static readonly defaultProps = {
		...SharedFieldSetupService.defaultProps,
		disablePopover: false,
		displayWeekNumber: false,
		hideDisabled: false,
		multipleLabelColor: 'default' as Orion.ColorExtendedAndGreys,
		preserveTime: false,
		time: false,
		type: 'date' as Orion.DatepickerType,
	};

	private focusedWithMouse = false;

	readonly _popover = ref<InstanceType<typeof Dropdown>>();
	readonly _options = ref<OrionDateWeek | OrionDateRange | OrionDateTable>();
	readonly _hours = ref<HTMLElement>();
	readonly _minutes = ref<HTMLElement>();

	protected state = reactive({
		...this.sharedState,
		mobileHoursValue: 0,
		mobileMinutesValue: 0,
		selectionIsOn: undefined as Undef<'year' | 'month' | 'day' | 'hours' | 'minutes' | 'ampm'>,
		rangeBuffer: undefined as Undef<Orion.DateRange>,
	});

	private get dateSeparator () { return this.lang.DATE_SEPARATOR; }
	private get timeSeparator () { return this.lang.TIME_SEPARATOR; }
	private get dateTimeSeparator () { return this.lang.DATETIME_SEPARATOR; }
	private get dateformat () { return this.setDateFormat(); }
	private get pattern () { return this.getPattern(); }

	get appLang () { return getAppLang(); }

	get selectionIsOnHourMinute () {
		return !!this.state.selectionIsOn && ['hours', 'minutes', 'ampm'].includes(this.state.selectionIsOn);
	}

	get isFocus () {
		if (this.props.disablePopover) return false;
		return this.state.isFocus;
	}

	get displayDateSelected () {
		if (this.props.type === 'range' || this.props.type === 'week') {
			if (this.range.value?.start instanceof Date && this.range.value?.end instanceof Date) {
				return this.lang.DATE_FROM_TO
					.replace('$start', useMonkey(this.range.value.start).toReadable())
					.replace('$end', useMonkey(this.range.value.end).toReadable());
			}
		} else if (this.props.type === 'month') {
			if (this.range.value?.start instanceof Date) {
				return useMonkey(this.range.value?.start)?.toReadable('$MMMM');
			}
		} else {
			if (this.vModel.value instanceof Date) {
				return this.inputValueFormat(this.vModel.value);
			} else if (this.state.isFocus) {
				return this.dateformat.replaceAll('$', '').toLowerCase();
			}
		}

		return '';
	}

	get maxInput () {
		if (this.props.time) return 16;
		return 10;
	}

	get hasValue () {
		if (['range', 'week', 'month'].includes(this.props.type) && !!this.range.value) {
			return !!this.range.value.start && !!this.range.value.end;
		}
		if (this.props.type === 'multiple') {
			return !!this.multiple.value && (this.multiple.value.length > 0);
		} else {
			return !isNil(this.vModel?.value);
		}
	}

	get minDate () {
		return this.props.minDate
			? useMonkey(this.props.minDate).toMidnight()
			: undefined;
	}

	get maxDate () {
		return this.props.maxDate
			? useMonkey(this.props.maxDate).toEndOfDay()
			: undefined;
	}

	get isOnPhoneWithTimepicker () {
		return this.props.type === 'date' && this.props.time && this.responsive.onPhone;
	}

	get isPm () {
		return this.displayDateSelected.includes('PM');
	}

	get vModelProxy () { return this.vModel.value;}

	set vModelProxy (val) {
		const currentValue = this.vModel.value;
		const dateUnchanged = (val?.getDate() === currentValue?.getDate())
			&& (val?.getMonth() === currentValue?.getMonth())
			&& (val?.getFullYear() === currentValue?.getFullYear());

		if (val) {
			if (currentValue && (this.props.preserveTime || !dateUnchanged)) {
				val.setHours(currentValue.getHours(), currentValue.getMinutes(), currentValue.getSeconds(), currentValue.getMilliseconds());
			}
			if (this.props.minDate && val.valueOf() < this.props.minDate.valueOf()) {
				val = this.props.minDate;
			}
			if (this.props.maxDate && val.valueOf() > this.props.maxDate.valueOf()) {
				val = this.props.maxDate;
			}
		}

		this.vModel.value = val;
	}

	get rangeBuffer () { return this.state.rangeBuffer; }
	set rangeBuffer (val) {
		this.state.rangeBuffer = val;

		if (!!val?.selecting) return;
		if (!!val?.start && !val.end) return;
		this.range.value = val;
	}

	// @doc props/vModel the vModel if the type is set to `date`
	// @doc/fr props/vModel le vModel si le type est défini à `date`
	// @doc props/multiple the vModel if the type is set to `multiple`
	// @doc/fr props/multiple le vModel si le type est défini à `multiple`
	// @doc props/range the vModel if the type is set to `range`
	// @doc/fr props/range le vModel si le type est défini à `range`
	constructor (
		protected props: OrionDatepickerProps & typeof OrionDatepickerSetupService.defaultProps,
		protected emits: OrionDatepickerEmits,
		private slots: Slots,
		protected vModel: ModelRef<Nil<Date>>,
		protected range: ModelRef<Nil<Orion.DateRange>>,
		protected multiple: ModelRef<Nil<Date[]>>,
	) {
		super(props, emits, vModel);


		watchEffect(() => this.state.rangeBuffer = { ...range.value });

		if (this.props.clearToNull && this.props.type === 'multiple') {
			// eslint-disable-next-line no-console
			console.warn(`OrionDatepicker - props "clear-to-null" is not compatible with type "multiple"`);
		}
	}


	inputValueFormat (date: Date) {
		if (this.props.time && this.props.type !== 'multiple') {
			return useMonkey(date).toReadable()
				+ this.dateTimeSeparator
				+ useMonkey(date).toReadable(`$hh${this.timeSeparator}$mm${this.appLang === 'en' ? ` $A` : ''}`);
		} else {
			return useMonkey(date).toReadable();
		}
	}

	private setDateFormat () {
		let result = this.lang.DATE_PATTERN;

		if (this.props.time && this.props.type !== 'multiple')
			result += this.dateTimeSeparator + this.lang.HOUR_FORMAT.replace('$TIME_SEPARATOR', this.timeSeparator);

		if (this.appLang === 'fr')
			result = result.replaceAll('D', 'J').replaceAll('Y', 'A');

		return result;
	}

	private getPattern () {
		const dayPostion = this.dateformat.toLocaleLowerCase().indexOf('$d');
		const monthPostion = this.dateformat.indexOf('$M');

		let dayIndex, monthIndex;
		if (dayPostion < monthPostion) {
			dayIndex = 0;
			monthIndex = 1;
		} else {
			dayIndex = 1;
			monthIndex = 0;
		}

		return {
			day: this.dateformat.split(this.dateTimeSeparator)[0].split(this.dateSeparator)[dayIndex].toLocaleLowerCase(),
			month: this.dateformat.split(this.dateTimeSeparator)[0].split(this.dateSeparator)[monthIndex].toLocaleLowerCase(),
			year: this.dateformat.split(this.dateTimeSeparator)[0].split(this.dateSeparator)[2].toLocaleLowerCase(),
			hour: this.dateformat.split(this.dateTimeSeparator)[1]?.split(this.timeSeparator)[0],
			minute: this.dateformat.split(this.dateTimeSeparator)[1]?.split(this.timeSeparator)[1],
		};
	}

	private getEventData () {
		const input = this._input.value as HTMLInputElement;
		const isPM = /(PM$)/.test(input.value);
		const isTwelveHours = /(AM|PM$)/.test(input.value);
		const selection = input.selectionStart !== null && input.selectionEnd !== null
			? input.value.slice(input.selectionStart, input.selectionEnd)
			: '';

		const isFullSelected = selection.length === input.value.length;
		const firstSeparatorIndex = input.value.indexOf(this.dateSeparator);
		const dateTimeSeparatorIndex = input.value.indexOf(this.dateTimeSeparator);
		const secondSeparatorIndex = input.value.indexOf(this.dateSeparator, firstSeparatorIndex + 1);
		const timeSeparatorIndex = input.value.indexOf(this.timeSeparator, dateTimeSeparatorIndex + 1);

		const cursorPosition = input.selectionStart ?? 0;
		const dayPosition = this.dateformat.toLowerCase().indexOf('$d');
		const monthPosition = this.dateformat.toLowerCase().indexOf('$m');

		let dayIndex, monthIndex;
		if (dayPosition < monthPosition) {
			dayIndex = 0;
			monthIndex = 1;
		} else {
			dayIndex = 1;
			monthIndex = 0;
		}

		let selectionIsOnDay, selectionIsOnMonth;
		if (this.appLang === 'fr') {
			selectionIsOnDay = cursorPosition <= firstSeparatorIndex;
			selectionIsOnMonth = cursorPosition > firstSeparatorIndex && cursorPosition <= secondSeparatorIndex;
		} else if (this.appLang === 'en') {
			selectionIsOnMonth = cursorPosition <= firstSeparatorIndex;
			selectionIsOnDay = cursorPosition > firstSeparatorIndex && cursorPosition <= secondSeparatorIndex;
		}

		const selectionIsOnYear = cursorPosition > secondSeparatorIndex && (!this.props.time || (this.props.time && cursorPosition <= dateTimeSeparatorIndex));
		const selectionIsOnHour = this.props.time && cursorPosition > dateTimeSeparatorIndex && cursorPosition <= timeSeparatorIndex;
		const selectionIsOnMinute = this.props.time && cursorPosition > timeSeparatorIndex && cursorPosition <= timeSeparatorIndex + 3;
		const selectionIsOnAmPm = this.props.time && /(AM|PM)$/.test(input.value) && cursorPosition >= (input.value.length - 2);

		return {
			input,
			cursorPosition,
			firstSeparatorIndex,
			secondSeparatorIndex,
			dateTimeSeparatorIndex,
			timeSeparatorIndex,
			selection,
			selectionIsOnYear,
			selectionIsOnMonth,
			selectionIsOnDay,
			selectionIsOnHour,
			selectionIsOnMinute,
			selectionIsOnAmPm,
			isFullSelected,
			isPM,
			isTwelveHours,
			day: input.value.split(this.dateTimeSeparator)[0].split(this.dateSeparator)[dayIndex],
			month: input.value.split(this.dateTimeSeparator)[0].split(this.dateSeparator)[monthIndex],
			year: input.value.split(this.dateTimeSeparator)[0].split(this.dateSeparator)[2],
			hour: input.value.split(this.dateTimeSeparator)[1]?.split(this.timeSeparator)[0],
			minute: input.value.split(this.dateTimeSeparator)[1]?.split(this.timeSeparator)[1]?.replace(/\s*(AM|PM)$/, ''),
		};
	}

	private setSelectionToYear () {
		this.state.selectionIsOn = 'year';
		const { input, secondSeparatorIndex } = this.getEventData();
		input.setSelectionRange(secondSeparatorIndex + 1, secondSeparatorIndex + 5);
	}

	private setSelectionToMonth () {
		this.state.selectionIsOn = 'month';
		const { input, firstSeparatorIndex, secondSeparatorIndex } = this.getEventData();
		this.appLang === 'fr'
			? input.setSelectionRange(firstSeparatorIndex + 1, secondSeparatorIndex)
			: input.setSelectionRange(0, firstSeparatorIndex);
	}

	private setSelectionToDay () {
		this.state.selectionIsOn = 'day';
		const { input, firstSeparatorIndex, secondSeparatorIndex } = this.getEventData();
		this.appLang === 'fr'
			? input.setSelectionRange(0, firstSeparatorIndex)
			: input.setSelectionRange(firstSeparatorIndex + 1, secondSeparatorIndex);
	}

	setSelectionToHour () {
		if (!this.props.time) return;
		this.state.selectionIsOn = 'hours';
		const { input, hour, timeSeparatorIndex } = this.getEventData();
		input.setSelectionRange(timeSeparatorIndex - (hour?.length ?? 2), timeSeparatorIndex);
	}

	private setSelectionToMinute () {
		if (!this.props.time) return;
		this.state.selectionIsOn = 'minutes';
		const { input, timeSeparatorIndex } = this.getEventData();
		input.setSelectionRange(timeSeparatorIndex + 1, timeSeparatorIndex + 3);
	}

	private setSelectionToAmPm () {
		if (!this.props.time || this.appLang !== 'en') return;
		this.state.selectionIsOn = 'ampm';
		const { input } = this.getEventData();
		input.setSelectionRange(input.value.length - 2, input.value.length);
	}

	private toggleYear (key: 'ArrowUp' | 'ArrowDown') {
		if (!this.vModel.value) return;

		const dateToSet = new Date(this.vModel.value);
		dateToSet.setFullYear(dateToSet.getFullYear() + (key === 'ArrowUp' ? 1 : -1));

		this.vModel.value = dateToSet;
	}

	private toggleMonth (key: 'ArrowUp' | 'ArrowDown') {
		if (!this.vModel.value) return;

		const dateToSet = new Date(this.vModel.value);
		dateToSet.setMonth(dateToSet.getMonth() + (key === 'ArrowUp' ? 1 : -1));

		this.vModel.value = dateToSet;
	}

	private toggleDay (key: 'ArrowUp' | 'ArrowDown') {
		if (!this.vModel.value) return;

		const dateToSet = new Date(this.vModel.value);
		dateToSet.setDate(dateToSet.getDate() + (key === 'ArrowUp' ? 1 : -1));

		this.vModel.value = dateToSet;
	}

	private toggleHour (key: 'ArrowUp' | 'ArrowDown') {
		if (!this.vModel.value) return;

		const dateToSet = new Date(this.vModel.value);
		dateToSet.setHours(dateToSet.getHours() + (key === 'ArrowUp' ? 1 : -1));

		this.vModel.value = dateToSet;
	}

	private toggleMinute (key: 'ArrowUp' | 'ArrowDown') {
		if (!this.vModel.value) return;

		const dateToSet = new Date(this.vModel.value);
		dateToSet.setMinutes(dateToSet.getMinutes() + (key === 'ArrowUp' ? 1 : -1));

		this.vModel.value = dateToSet;
	}

	private toggleAmPm (key: 'ArrowUp' | 'ArrowDown') {
		if (!this.vModel.value) return;

		const dateToSet = new Date(this.vModel.value);
		dateToSet.setHours(dateToSet.getHours() + (key === 'ArrowUp' ? 12 : -12));

		this.vModel.value = dateToSet;
	}

	setAmPm (key: 'A' | 'a' | 'P' | 'p') {
		if (!this.vModel.value) return;
		const { isPM } = this.getEventData();

		if (isPM && ['P', 'p'].includes(key)) return;
		if (!isPM && ['A', 'a'].includes(key)) return;

		const dateToSet = new Date(this.vModel.value);
		dateToSet.setHours(dateToSet.getHours() + (['P', 'p'].includes(key) ? 12 : -12));

		this.vModel.value = dateToSet;
	}

	private setInputStringValue (year: string, month: string, day: string, hour = 'hh', minute = 'mm') {
		const { input, isPM, isTwelveHours } = this.getEventData();
		const numRegex = /^\d{1,4}$/;

		const dateValid = this.props.time
			? numRegex.test(year) && numRegex.test(month) && numRegex.test(day) && numRegex.test(hour) && numRegex.test(minute)
			: numRegex.test(year) && numRegex.test(month) && numRegex.test(day);

		const dateValue = dateValid
			? this.props.time
				? new Date(Number(year), Number(month) - 1, Number(day), Number(hour), Number(minute))
				: new Date(Number(year), Number(month) - 1, Number(day))
			: null;

		if (dateValue) {
			if (isTwelveHours && +hour < 13 && isPM && hour !== '12') dateValue.setHours(+hour + 12);
			if (isTwelveHours && +hour < 13 && !isPM && hour === '12') dateValue.setHours(0);
			this.vModel.value = dateValue;
		} else {
			day = numRegex.test(day) ? day.padStart(2, '0') : day;
			month = numRegex.test(month) ? month.padStart(2, '0') : month;
			year = numRegex.test(year) ? year.padEnd(4, '0') : year;
			hour = numRegex.test(hour) ? hour.padStart(2, '0') : hour;
			minute = numRegex.test(minute) ? minute.padStart(2, '0') : minute;

			if (this.props.time) {
				input.value = this.dateformat.toLowerCase()
					.replace(this.pattern.day, day)
					.replace(this.pattern.month, month)
					.replace(this.pattern.year, year)
					.replace(this.pattern.hour, hour)
					.replace(this.pattern.minute, minute)
					+ (this.appLang === 'en'
						? ((numRegex.test(hour) && (+hour > 12)) ? ' PM' : ' AM')
						: '');
			} else {
				input.value = this.dateformat.toLowerCase()
					.replace(this.pattern.day, day)
					.replace(this.pattern.month, month)
					.replace(this.pattern.year, year);
			}
		}
	}

	private computeTimeItemsStyle (container: 'hours' | 'minutes') {
		if (!this._hours.value || !this._minutes.value) return;

		const containerRect = container === 'hours'
			? this._hours.value.getBoundingClientRect()
			: this._minutes.value.getBoundingClientRect();

		const containerItems = container === 'hours'
			? Array.from(this._hours.value.children) as HTMLElement[]
			: Array.from(this._minutes.value.children) as HTMLElement[];

		const containerOffsetMiddle = containerRect.top + (containerRect.height / 2);
		const containerRelativeMiddle = containerRect.height / 2;

		for (let i = 0; i < containerItems.length; i++) {
			const el = containerItems[i];
			const itemRect = el.getBoundingClientRect();
			const itemOffsetMiddle = itemRect.top + (itemRect.height / 2);
			let itemRelativeMiddle: number;

			if (itemOffsetMiddle < containerRect.top || itemOffsetMiddle > containerRect.bottom) {
				el.setAttribute('style', `--factor: 0`);
				continue;
			}

			if (itemOffsetMiddle < containerOffsetMiddle) {
				itemRelativeMiddle = itemOffsetMiddle - containerRect.top;
			} else if (itemOffsetMiddle > containerOffsetMiddle) {
				itemRelativeMiddle = containerRect.bottom - itemOffsetMiddle;
			} else {
				itemRelativeMiddle = containerRelativeMiddle;
			}

			const factor = (itemRelativeMiddle * 100 / containerRelativeMiddle) / 100;
			el.setAttribute('style', `--factor: ${factor}`);

			if (+(factor.toFixed(1)) === 1) {
				container === 'hours'
					? this.state.mobileHoursValue = +el.innerText
					: this.state.mobileMinutesValue = +el.innerText;
			}
		}
	}

	private scrollCurrentTimeItem (container: 'hours' | 'minutes', val: number) {
		const targetContainer = container === 'hours'
			? this._hours.value
			: this._minutes.value;

		(Array.from(targetContainer?.children ?? []) as HTMLElement[])
			.find(el => el.dataset.value === val.toString())
			?.scrollIntoView({ block: 'center' });
	}

	handleMouseup () {
		if (this.responsive.onPhone) {
			this._input.value?.blur();
			return;
		};

		if (this.props.disabled || this.props.readonly) {
			return;
		}

		const {
			selectionIsOnYear, selectionIsOnMonth, selectionIsOnDay,
			selectionIsOnHour, selectionIsOnMinute, selectionIsOnAmPm,
		} = this.getEventData();

		setTimeout(() => {
			if (this.props.selectOnFocus && this.hasValue) return;

			if (this.vModel.value) {
				if (selectionIsOnYear) this.setSelectionToYear();
				if (selectionIsOnMonth) this.setSelectionToMonth();
				if (selectionIsOnDay) this.setSelectionToDay();
				if (selectionIsOnHour) this.setSelectionToHour();
				if (selectionIsOnMinute) this.setSelectionToMinute();
				if (selectionIsOnAmPm) this.setSelectionToAmPm();
			} else {
				this.appLang === 'en'
					? this.setSelectionToMonth()
					: this.setSelectionToDay();
			}
		}, 25);
	}

	handleMousedown () {
		this.focusedWithMouse = true;
	}

	handleFocus (e: FocusEvent) {
		if (!this.focusedWithMouse && this.props.type === 'date' && !this.responsive.onPhone && !this.props.selectOnFocus) {
			setTimeout(() => {
				const { input, firstSeparatorIndex } = this.getEventData();
				input.setSelectionRange(0, firstSeparatorIndex);
			}, 25);
		}

		super.handleFocus(e);
	}

	handleBlur (e?: FocusEvent, force = false) {
		if (!!this.slots.popper) return;
		if (this.responsive.onPhone && !force) return;

		this.focusedWithMouse = false;
		super.handleBlur(e);
	}

	handleClear () {
		const clearTo = this.props.clearToNull ? null : undefined;

		if (this.props.disabled || this.props.readonly) return;
		if (this.props.type === 'range' || this.props.type === 'week' || this.props.type === 'month') {
			this.range.value = clearTo;
		} else if (this.props.type === 'multiple') {
			this.multiple.value = [];
		} else {
			this.vModel.value = clearTo;
		}
		this.emits('change', clearTo);
		this.emits('clear');
	}

	handleKeydownGuard (e: KeyboardEvent) {
		if (this.props.disabled || this.props.readonly) {
			e.preventDefault();
			return;
		}

		const {
			input, cursorPosition, day, month, year, hour, minute, isTwelveHours, isFullSelected, selection,
			selectionIsOnYear, selectionIsOnMonth, selectionIsOnDay, selectionIsOnHour, selectionIsOnMinute, selectionIsOnAmPm,
			firstSeparatorIndex, secondSeparatorIndex, dateTimeSeparatorIndex, timeSeparatorIndex,
		} = this.getEventData();
		let { key } = e;
		const numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
		const alpha = ['A', 'a', 'P', 'p'] as const;
		const arrows = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'];
		const deletion = ['Backspace', 'Delete'];
		const misc = ['Tab'];
		const allowed = [...numbers, ...alpha, ...arrows, ...deletion, ...misc, this.dateSeparator, this.timeSeparator];
		const isSeparatorKey = this.dateSeparator.includes(key) || this.timeSeparator.includes(key) || this.dateTimeSeparator.includes(key);

		if (e.metaKey || e.ctrlKey || !(allowed.includes(key) || isSeparatorKey)) {
			e.preventDefault();
			return;
		};

		if (isSeparatorKey) key = 'ArrowRight';
		if (![...misc].includes(key)) e.preventDefault();


		// Handle arrows
		if (arrows.includes(key)) {
			if (key === 'ArrowRight') {
				// Set input value to handle 1 digit in day or month
				this.setInputStringValue(year, month, day, hour, minute);
				nextTick(() => {
					if (selectionIsOnDay) {
						this.appLang === 'fr'
							? this.setSelectionToMonth()
							: this.setSelectionToYear();
					}
					if (selectionIsOnMonth) {
						this.appLang === 'fr'
							? this.setSelectionToYear()
							: this.setSelectionToDay();
					}
					if (selectionIsOnYear) this.setSelectionToHour();
					if (selectionIsOnHour) this.setSelectionToMinute();
					if (selectionIsOnMinute) this.setSelectionToAmPm();
				});
			}

			if (key === 'ArrowLeft') {
				// Set input value to handle 1 digit in day or month
				this.setInputStringValue(year, month, day, hour, minute);
				nextTick(() => {
					if (selectionIsOnDay && this.appLang === 'en') this.setSelectionToMonth();
					if (selectionIsOnMonth && this.appLang === 'fr') this.setSelectionToDay();
					if (selectionIsOnYear) {
						this.appLang === 'fr'
							? this.setSelectionToMonth()
							: this.setSelectionToDay();
					}
					if (selectionIsOnHour) this.setSelectionToYear();
					if (selectionIsOnMinute) this.setSelectionToHour();
					if (selectionIsOnAmPm) this.setSelectionToMinute();
				});
			}

			if (key === 'ArrowDown' || key === 'ArrowUp') {
				if (selectionIsOnDay && /\d{1,2}/.test(day)) {
					this.toggleDay(key);
					nextTick(() => this.setSelectionToDay());
				}

				if (selectionIsOnMonth && /\d{1,2}/.test(month)) {
					this.toggleMonth(key);
					nextTick(() => this.setSelectionToMonth());
				}

				if (selectionIsOnYear && /\d{4}/.test(year)) {
					this.toggleYear(key);
					nextTick(() => this.setSelectionToYear());
				}

				if (selectionIsOnHour && /\d{1,2}/.test(hour)) {
					this.toggleHour(key);
					nextTick(() => this.setSelectionToHour());
				}

				if (selectionIsOnMinute && /\d{1,2}/.test(minute)) {
					this.toggleMinute(key);
					nextTick(() => this.setSelectionToMinute());
				}

				if (selectionIsOnAmPm) {
					this.toggleAmPm(key);
					nextTick(() => this.setSelectionToAmPm());
				}
			}
		}

		// Handle numeric
		if (numbers.includes(key)) {
			const num = Number(key);

			if (selectionIsOnDay) {
				if (day.length === 2 && num >= 4) {
					this.setInputStringValue(year, month, key, hour, minute);
					nextTick(() => this.appLang === 'en' ? this.setSelectionToYear() : this.setSelectionToMonth());
				} else {
					if (day.length === 1) {
						if (day === '3' && num > 1) return;
						this.setInputStringValue(year, month, day + key, hour, minute);
						nextTick(() => this.appLang === 'en' ? this.setSelectionToYear() : this.setSelectionToMonth());
					} else {
						if (this.appLang === 'en') {
							input.value = input.value.slice(0, cursorPosition) + num + input.value.slice(secondSeparatorIndex);
							input.setSelectionRange(firstSeparatorIndex + 2, firstSeparatorIndex + 2);
						} else {
							input.value = num + input.value.slice(cursorPosition + 2);
							input.setSelectionRange(1, 1);
						}
					}
				}
			}

			if (selectionIsOnMonth) {
				if (month.length === 2) {
					if (num > 1) {
						this.setInputStringValue(year, key, day, hour, minute);
						nextTick(() => this.appLang === 'en' ? this.setSelectionToDay() : this.setSelectionToYear());
					} else {
						if (this.appLang === 'en') {
							input.value = num + input.value.slice(cursorPosition + 2);
							input.setSelectionRange(1, 1);
						} else {
							input.value = input.value.slice(0, cursorPosition) + num + input.value.slice(secondSeparatorIndex);
							input.setSelectionRange(cursorPosition + 1, cursorPosition + 1);
						}
					}
				} else if (month.length === 1 && ((month === '1' && num <= 2) || month === '0')) {
					this.setInputStringValue(year, month+key, day, hour, minute);
					nextTick(() => {
						this.appLang === 'fr'
							? this.setSelectionToYear()
							: this.setSelectionToDay();
					});
				}
			}

			if (selectionIsOnYear) {
				if (this.props.time) {
					input.value = input.value.slice(0, cursorPosition) + num + input.value.slice(dateTimeSeparatorIndex);
					input.setSelectionRange(cursorPosition + 1, cursorPosition + 1);
					if (year.length === 3) {
						this.setInputStringValue(year+key, month, day, hour, minute);
						nextTick(() => { this.setSelectionToHour(); });
					}
				} else {
					if (year.length === 3) {
						this.setInputStringValue(year+key, month, day, hour, minute);
					} else if (year.length < 4 || selection.length === 4) {
						input.value = input.value.slice(0, cursorPosition) + num;
					}
				}
			}

			if (selectionIsOnHour) {
				if (hour.length === 2) {
					if (num > 2 || (this.appLang === 'en' && num > 1)) {
						this.setInputStringValue(year, month, day, key, minute);
						nextTick(() => this.setSelectionToMinute());
					} else {
						input.value = input.value.slice(0, cursorPosition) + num + input.value.slice(timeSeparatorIndex);
						input.setSelectionRange(cursorPosition + 1, cursorPosition + 1);
					}
				} else if (hour.length === 1 && ((hour === '2' && num <= 3) || hour === '1' || hour === '0')) {
					this.setInputStringValue(year, month, day, hour+key, minute);
					nextTick(() => this.setSelectionToMinute());
				}
			}

			if (selectionIsOnMinute) {
				if (selection.length === 2) {
					if (num > 5) {
						this.setInputStringValue(year, month, day, hour, key);
						nextTick(() => this.setSelectionToAmPm());
					} else {
						input.value = input.value.slice(0, cursorPosition) + key + (isTwelveHours
							? input.value.slice(input.value.length - 3)
							: '');
						input.setSelectionRange(cursorPosition + 1, cursorPosition + 1);
					}
				} else if (minute.length === 1) {
					this.setInputStringValue(year, month, day, hour, minute+key);
					nextTick(() => this.setSelectionToAmPm());
				}
			}
		}

		// Handle alpha
		if (alpha.includes(key as typeof alpha[number])) {
			if (selectionIsOnAmPm) {
				this.setAmPm(key as typeof alpha[number]);
				nextTick(() => this.setSelectionToAmPm());
			}
		}

		// Handle deletion keys
		if (deletion.includes(key)) {
			if (isFullSelected) {
				this.clear();
				nextTick(() => this.setSelectionToDay());
				return;
			}

			const dayPattern = this.pattern.day.replace('$', '');
			const monthPattern = this.pattern.month.replace('$', '');
			const yearPattern = this.pattern.year.replace('$', '');
			const hourPattern = this.pattern.hour?.replace('$', '');
			const minutePattern = this.pattern.minute?.replace('$', '');

			if (selectionIsOnDay) {
				if (isNaN(+day)) {
					if (this.appLang === 'en') {
						this.setInputStringValue(year, monthPattern, day, hour, minute);
						this.setSelectionToMonth();
					} else {
						this.handleClear();
						nextTick(() => this.setSelectionToDay());
					}
				} else {
					this.setInputStringValue(year, month, dayPattern, hour, minute);
					this.setSelectionToDay();
				}
			}

			if (selectionIsOnMonth) {
				if (isNaN(+month)) {
					if (this.appLang === 'en') {
						this.handleClear();
						this.setSelectionToMonth();
					} else {
						this.setInputStringValue(year, month, dayPattern, hour, minute);
						this.setSelectionToDay();
					}
				} else {
					this.setInputStringValue(year, monthPattern, day, hour, minute);
					if (this.appLang === 'en')
						this.setSelectionToMonth();
					else
						this.setSelectionToDay();
				}
			}

			if (selectionIsOnYear) {
				if (!isNaN(+year)) {
					this.setInputStringValue(yearPattern, month, day, hour, minute);
					this.setSelectionToYear();
				} else {
					if (this.appLang === 'en') {
						this.setInputStringValue(year, month, dayPattern, hour, minute);
						this.setSelectionToDay();
					} else {
						this.setInputStringValue(year, monthPattern, day, hour, minute);
						this.setSelectionToMonth();
					}
				}
			}

			if (selectionIsOnHour) {
				if (isNaN(+hour)) {
					this.setInputStringValue(yearPattern, month, day, hour, minute);
					this.setSelectionToYear();
				} else {
					this.setInputStringValue(year, month, day, hourPattern, minute);
					this.setSelectionToHour();
				}
			}

			if (selectionIsOnMinute) {
				if (isNaN(+minute)) {
					this.setInputStringValue(year, month, day, hourPattern, minute);
					this.setSelectionToHour();
				} else {
					this.setInputStringValue(year, month, day, hour, minutePattern);
					this.setSelectionToMinute();
				}
			}
		}

		// Handle tab key
		if (key === 'Tab') {
			this.setInputStringValue(year, month, day, hour, minute);
		}
	}

	handlePopperShow () {
		addPopoverBackdropCloseAbility(this._popover, () => this.handleBlur(undefined, true));

		if (this.isOnPhoneWithTimepicker) {
			this.computeTimeItemsStyle('hours');
			this.computeTimeItemsStyle('minutes');

			nextTick(() => {
				if (this.vModel.value) {
					this.scrollCurrentTimeItem('minutes', this.vModel.value.getMinutes());
					this.scrollCurrentTimeItem('hours', this.appLang === 'en' && this.vModel.value.getHours() > 12
						? this.vModel.value.getHours() - 12
						: this.vModel.value.getHours(),
					);
				}
			});
		}

		if (this.props.type === 'range' && !this.hasValue) {
			// this.rangeBuffer = {};
		}

		if (this.props.type === 'week' && this.hasValue) {
			const weekPicker = (this._options.value as RefDom<OrionDateWeek>)?._weekPicker();
			weekPicker?.scrollTo({ top: (weekPicker.querySelector('.orion-date-week__week-row--active') as HTMLElement)?.offsetTop - 90 });
		}
	}

	handlePopperHide () {
		if (this.props.type === 'range' && !this.hasValue) {
			this.handleClear();
		}

		if (this.props.type === 'range' && this.state.rangeBuffer?.selecting) {
			this.state.rangeBuffer = { ...this.range.value };
		}
	}

	handleTimeScroll (container: 'hours' | 'minutes') {
		this.handleTimeItemScrollThrottled(container);
		this.handleTimeScrollDebounced();
	}

	handleTimeItemScrollThrottled = throttle((container: 'hours' | 'minutes') => this.computeTimeItemsStyle(container), 16);

	handleTimeScrollDebounced = debounce(() => {
		const dateToEmit = new Date(this.vModel.value ?? Date.now());

		dateToEmit.setMinutes(this.state.mobileMinutesValue);

		if (this.appLang && this.isPm) {
			dateToEmit.setHours(this.state.mobileHoursValue + 12);
		} else {
			dateToEmit.setHours(this.state.mobileHoursValue);
		}

		this.vModel.value = dateToEmit;
	}, 200);

	removeDate (date: Date) {
		if (this.multiple.value)
			this.multiple.value = useMonkey(this.multiple.value).toggle(date);
	}

	closePopperSlot () {
		this.focusedWithMouse = false;
		super.handleBlur();
	}
}
