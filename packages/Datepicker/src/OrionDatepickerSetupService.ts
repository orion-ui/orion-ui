import { nextTick, PropType, ref } from 'vue';
import { isNil } from 'lodash-es';
import SharedFieldSetupService, { FieldEmit } from '../../Shared/SharedFieldSetupService';
import useMonkey from 'services/MonkeyService';
import { useLang } from 'services';
import { getAppLang } from 'services/LangService';

type Props = SetupProps<typeof OrionDatepickerSetupService.props>
type DatepickerEmit = FieldEmit<Nil<Date>> & {
	(e: 'update:range', payload: Nil<Orion.DateRange>): void;
}

export default class OrionDatepickerSetupService extends SharedFieldSetupService<Props, Nil<Date>> {
	static props = {
		...SharedFieldSetupService.props,
		// @doc props/preserveTime keep the current time value when changing date
		// @doc/fr props/preserveTime conserve la valeur actuelle de l'heure lors du changement de date
		preserveTime: Boolean,
		// @doc props/time displays also hours/minutes
		// @doc/fr props/time affiche aussi les heures/minutes
		time: Boolean,
		// @doc props/range the modelValue if the type is set to `range`
		// @doc/fr props/range le modelValue si le type est défini à `range`
		range: {
			type: Object as PropType<Nil<Orion.DateRange>>,
			default: undefined,
		},
		// @doc props/minDate the minimum date which can be selected
		// @doc/fr props/minDate la date minimum qui peut être sélectionnée
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
		// @doc props/type the type of the model value
		// @doc/fr props/type le type de modelValue
		type: {
			type: String as PropType<Orion.DatepickerType>,
			default: 'date',
			validator: (val: Orion.DatepickerType) => ['date', 'range', 'week'].includes(val),
		},
		// @doc props/valueDisplayFormat function to customize the display format
		// @doc/fr props/valueDisplayFormat fonction pour personnaliser l'affichage
		valueDisplayFormat: {
			type: Function,
			default: undefined,
		},
	};

	private focusedWithMouse = false;

	protected emit: DatepickerEmit;

	_options = ref<RefDom<OrionDateWeek | OrionDateRange | OrionDateTable>>();

	private get dateSeparator () { return useLang().DATE_SEPARATOR; }
	private get timeSeparator () { return useLang().TIME_SEPARATOR; }
	private get dateTimeSeparator () { return useLang().DATETIME_SEPARATOR; }
	private get appLang () { return getAppLang(); }
	private get dateformat () { return this.setDateFormat(); }
	private get pattern () { return this.getPattern(); }

	get displayDateSelected () {
		if (this.props.type === 'range' || this.props.type === 'week') {
			if (this.range?.start instanceof Date && this.range?.end instanceof Date) {
				return useLang().DATE_FROM_TO
					.replace('$start', useMonkey(this.range.start).toReadable())
					.replace('$end', useMonkey(this.range.end).toReadable());
			}
		} else {
			if (this.vModel instanceof Date) {
				return this.inputValueFormat(this.vModel);
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
		if (['range', 'week'].includes(this.props.type) && !!this.props.range) {
			return !!this.props.range.start && !!this.props.range.end;
		} else {
			return !isNil(this.vModel);
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

	get vModel () {
		return this.props.modelValue as Nil<Date>;
	}

	set vModel (val) {
		const currentValue = this.vModel;
		if (val) {
			if (currentValue && this.props.preserveTime) {
				val.setHours(currentValue.getHours(), currentValue.getMinutes(), currentValue.getSeconds(), currentValue.getMilliseconds());
			}
			if (this.props.minDate && val.valueOf() < this.props.minDate.valueOf()) {
				val = this.props.minDate;
			}
			if (this.props.maxDate && val.valueOf() > this.props.maxDate.valueOf()) {
				val = this.props.maxDate;
			}
		}
		this.emit('update:modelValue', val);
		this.emit('input', val);
	}

	get range () {
		return this.props.range;
	}

	set range (val) {
		this.emit('update:range', val);
	}


	constructor (props: Props, emit: DatepickerEmit) {
		super(props, emit);
		this.emit = emit;
	}


	private inputValueFormat (date: Date) {
		if (this.props.time) {
			return useMonkey(date).toReadable()
				+ this.dateTimeSeparator
				+ useMonkey(date).toReadable(`$hh${this.timeSeparator}$mm${this.appLang === 'en' ? ` $A` : ''}`);
		} else {
			return useMonkey(date).toReadable();
		}
	}

	private setDateFormat () {
		let result = useLang().DATE_PATTERN;

		if (this.props.time)
			result += this.dateTimeSeparator + useLang().HOUR_FORMAT.replace('$TIME_SEPARATOR', this.timeSeparator);

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

	private getEventData (e: Event) {
		const input = e.target as HTMLInputElement;
		const isPM = /(PM$)/.test(input.value);
		const isTwelveHours = /(AM|PM$)/.test(input.value);
		const selection = input.selectionStart && input.selectionEnd
			? input.value.slice(input.selectionStart, input.selectionEnd)
			: '';

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
			isPM,
			isTwelveHours,
			day: input.value.split(this.dateTimeSeparator)[0].split(this.dateSeparator)[dayIndex],
			month: input.value.split(this.dateTimeSeparator)[0].split(this.dateSeparator)[monthIndex],
			year: input.value.split(this.dateTimeSeparator)[0].split(this.dateSeparator)[2],
			hour: input.value.split(this.dateTimeSeparator)[1]?.split(this.timeSeparator)[0],
			minute: input.value.split(this.dateTimeSeparator)[1]?.split(this.timeSeparator)[1]?.replace(/\s*(AM|PM)$/, ''),
		};
	}

	private setSelectionToYear (e: Event) {
		const { input, secondSeparatorIndex } = this.getEventData(e);
		input.setSelectionRange(secondSeparatorIndex + 1, secondSeparatorIndex + 5);
	}

	private setSelectionToMonth (e: Event) {
		const { input, firstSeparatorIndex, secondSeparatorIndex } = this.getEventData(e);
		this.appLang === 'fr'
			? input.setSelectionRange(firstSeparatorIndex + 1, secondSeparatorIndex)
			: input.setSelectionRange(0, firstSeparatorIndex);
	}

	private setSelectionToDay (e: Event) {
		const { input, firstSeparatorIndex, secondSeparatorIndex } = this.getEventData(e);
		this.appLang === 'fr'
			? input.setSelectionRange(0, firstSeparatorIndex)
			: input.setSelectionRange(firstSeparatorIndex + 1, secondSeparatorIndex);
	}

	private setSelectionToHour (e: Event) {
		if (!this.props.time) return;
		const { input, hour, timeSeparatorIndex } = this.getEventData(e);
		input.setSelectionRange(timeSeparatorIndex - hour?.length ?? 2, timeSeparatorIndex);
	}

	private setSelectionToMinute (e: Event) {
		if (!this.props.time) return;
		const { input, timeSeparatorIndex } = this.getEventData(e);
		input.setSelectionRange(timeSeparatorIndex + 1, timeSeparatorIndex + 3);
	}

	private setSelectionToAmPm (e: Event) {
		if (!this.props.time || this.appLang !== 'en') return;
		const { input } = this.getEventData(e);
		input.setSelectionRange(input.value.length - 2, input.value.length);
	}

	private toggleYear (e: Event, key: 'ArrowUp' | 'ArrowDown') {
		if (!this.vModel) return;

		const dateToSet = new Date(this.vModel);
		dateToSet.setFullYear(dateToSet.getFullYear() + (key === 'ArrowUp' ? 1 : -1));

		this.vModel = dateToSet;
	}

	private toggleMonth (e: Event, key: 'ArrowUp' | 'ArrowDown') {
		if (!this.vModel) return;

		const dateToSet = new Date(this.vModel);
		dateToSet.setMonth(dateToSet.getMonth() + (key === 'ArrowUp' ? 1 : -1));

		this.vModel = dateToSet;
	}

	private toggleDay (e: Event, key: 'ArrowUp' | 'ArrowDown') {
		if (!this.vModel) return;

		const dateToSet = new Date(this.vModel);
		dateToSet.setDate(dateToSet.getDate() + (key === 'ArrowUp' ? 1 : -1));

		this.vModel = dateToSet;
	}

	private toggleHour (e: Event, key: 'ArrowUp' | 'ArrowDown') {
		if (!this.vModel) return;

		const dateToSet = new Date(this.vModel);
		dateToSet.setHours(dateToSet.getHours() + (key === 'ArrowUp' ? 1 : -1));

		this.vModel = dateToSet;
	}

	private toggleMinute (e: Event, key: 'ArrowUp' | 'ArrowDown') {
		if (!this.vModel) return;

		const dateToSet = new Date(this.vModel);
		dateToSet.setMinutes(dateToSet.getMinutes() + (key === 'ArrowUp' ? 1 : -1));

		this.vModel = dateToSet;
	}

	private toggleAmPm (e: Event, key: 'ArrowUp' | 'ArrowDown') {
		if (!this.vModel) return;

		const dateToSet = new Date(this.vModel);
		dateToSet.setHours(dateToSet.getHours() + (key === 'ArrowUp' ? 12 : -12));

		this.vModel = dateToSet;
	}

	private setAmPm (e: Event, key: 'A' | 'a' | 'P' | 'p') {
		if (!this.vModel) return;
		const { isPM } = this.getEventData(e);

		if (isPM && ['P', 'p'].includes(key)) return;
		if (!isPM && ['A', 'a'].includes(key)) return;

		const dateToSet = new Date(this.vModel);
		dateToSet.setHours(dateToSet.getHours() + (['P', 'p'].includes(key) ? 12 : -12));

		this.vModel = dateToSet;
	}

	private setInputStringValue (e: Event, year: string, month: string, day: string, hour = 'hh', minute = 'mm') {
		const { input, isPM, isTwelveHours } = this.getEventData(e);
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
			this.vModel = dateValue;
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

	handleMouseup (e: MouseEvent) {
		const {
			selectionIsOnYear, selectionIsOnMonth, selectionIsOnDay,
			selectionIsOnHour, selectionIsOnMinute, selectionIsOnAmPm,
		} = this.getEventData(e);

		setTimeout(() => {
			if (this.vModel) {
				if (selectionIsOnYear) this.setSelectionToYear(e);
				if (selectionIsOnMonth) this.setSelectionToMonth(e);
				if (selectionIsOnDay) this.setSelectionToDay(e);
				if (selectionIsOnHour) this.setSelectionToHour(e);
				if (selectionIsOnMinute) this.setSelectionToMinute(e);
				if (selectionIsOnAmPm) this.setSelectionToAmPm(e);
			} else {
				this.appLang === 'en'
					? this.setSelectionToMonth(e)
					: this.setSelectionToDay(e);
			}
		}, 25);
	}

	handleMousedown () {
		this.focusedWithMouse = true;
	}

	handleFocus (e: FocusEvent) {
		if (!this.focusedWithMouse && this.props.type === 'date') {
			setTimeout(() => {
				const { input, firstSeparatorIndex } = this.getEventData(e);
				input.setSelectionRange(0, firstSeparatorIndex);
			}, 25);
		}
		super.handleFocus(e);
	}

	handleBlur (e?: FocusEvent) {
		this.focusedWithMouse = false;
		super.handleBlur(e);
	}

	handleClear () {
		if (this.props.disabled || this.props.readonly) return;
		if (this.props.type === 'range' || this.props.type === 'week') {
			this.emit('update:range', undefined);
		} else {
			this.emit('update:modelValue', undefined);
		}
		this.emit('input', undefined);
		this.emit('change', undefined);
		this.emit('clear');
	}

	handleKeydownGuard (e: KeyboardEvent) {
		const {
			input, cursorPosition, day, month, year, hour, minute, isTwelveHours, selection,
			selectionIsOnYear, selectionIsOnMonth, selectionIsOnDay, selectionIsOnHour, selectionIsOnMinute, selectionIsOnAmPm,
			firstSeparatorIndex, secondSeparatorIndex, dateTimeSeparatorIndex, timeSeparatorIndex,
		} = this.getEventData(e);
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
				this.setInputStringValue(e, year, month, day, hour, minute);
				nextTick(() => {
					if (selectionIsOnDay) {
						this.appLang === 'fr'
							? this.setSelectionToMonth(e)
							: this.setSelectionToYear(e);
					}
					if (selectionIsOnMonth) {
						this.appLang === 'fr'
							? this.setSelectionToYear(e)
							: this.setSelectionToDay(e);
					}
					if (selectionIsOnYear) this.setSelectionToHour(e);
					if (selectionIsOnHour) this.setSelectionToMinute(e);
					if (selectionIsOnMinute) this.setSelectionToAmPm(e);
				});
			}

			if (key === 'ArrowLeft') {
				// Set input value to handle 1 digit in day or month
				this.setInputStringValue(e, year, month, day, hour, minute);
				nextTick(() => {
					if (selectionIsOnDay && this.appLang === 'en') this.setSelectionToMonth(e);
					if (selectionIsOnMonth && this.appLang === 'fr') this.setSelectionToDay(e);
					if (selectionIsOnYear) {
						this.appLang === 'fr'
							? this.setSelectionToMonth(e)
							: this.setSelectionToDay(e);
					}
					if (selectionIsOnHour) this.setSelectionToYear(e);
					if (selectionIsOnMinute) this.setSelectionToHour(e);
					if (selectionIsOnAmPm) this.setSelectionToMinute(e);
				});
			}

			if (key === 'ArrowDown' || key === 'ArrowUp') {
				if (selectionIsOnDay && /\d{1,2}/.test(day)) {
					this.toggleDay(e, key);
					nextTick(() => this.setSelectionToDay(e));
				}

				if (selectionIsOnMonth && /\d{1,2}/.test(month)) {
					this.toggleMonth(e, key);
					nextTick(() => this.setSelectionToMonth(e));
				}

				if (selectionIsOnYear && /\d{4}/.test(year)) {
					this.toggleYear(e, key);
					nextTick(() => this.setSelectionToYear(e));
				}

				if (selectionIsOnHour && /\d{1,2}/.test(hour)) {
					this.toggleHour(e, key);
					nextTick(() => this.setSelectionToHour(e));
				}

				if (selectionIsOnMinute && /\d{1,2}/.test(minute)) {
					this.toggleMinute(e, key);
					nextTick(() => this.setSelectionToMinute(e));
				}

				if (selectionIsOnAmPm) {
					this.toggleAmPm(e, key);
					nextTick(() => this.setSelectionToAmPm(e));
				}
			}
		}

		// Handle numeric
		if (numbers.includes(key)) {
			const num = Number(key);

			if (selectionIsOnDay) {
				if (day.length === 2 && num >= 4) {
					this.setInputStringValue(e, year, month, key, hour, minute);
					nextTick(() => this.appLang === 'en' ? this.setSelectionToYear(e) : this.setSelectionToMonth(e));
				} else {
					if (day.length === 1) {
						if (day === '3' && num > 1) return;
						this.setInputStringValue(e, year, month, day + key, hour, minute);
						nextTick(() => this.appLang === 'en' ? this.setSelectionToYear(e) : this.setSelectionToMonth(e));
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
						this.setInputStringValue(e, year, key, day, hour, minute);
						nextTick(() => this.appLang === 'en' ? this.setSelectionToDay(e) : this.setSelectionToYear(e));
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
					this.setInputStringValue(e, year, month+key, day, hour, minute);
					nextTick(() => {
						this.appLang === 'fr'
							? this.setSelectionToYear(e)
							: this.setSelectionToDay(e);
					});
				}
			}

			if (selectionIsOnYear) {
				if (this.props.time) {
					input.value = input.value.slice(0, cursorPosition) + num + input.value.slice(dateTimeSeparatorIndex);
					input.setSelectionRange(cursorPosition + 1, cursorPosition + 1);
					if (year.length === 3) {
						this.setInputStringValue(e, year+key, month, day, hour, minute);
						nextTick(() => { this.setSelectionToHour(e); });
					}
				} else {
					if (year.length === 3) {
						this.setInputStringValue(e, year+key, month, day, hour, minute);
					} else if (year.length < 4 || selection.length === 4) {
						input.value = input.value.slice(0, cursorPosition) + num;
					}
				}
			}

			if (selectionIsOnHour) {
				if (hour.length === 2) {
					if (num > 2 || (this.appLang === 'en' && num > 1)) {
						this.setInputStringValue(e, year, month, day, key, minute);
						nextTick(() => this.setSelectionToMinute(e));
					} else {
						input.value = input.value.slice(0, cursorPosition) + num + input.value.slice(timeSeparatorIndex);
						input.setSelectionRange(cursorPosition + 1, cursorPosition + 1);
					}
				} else if (hour.length === 1 && ((hour === '2' && num <= 3) || hour === '1' || hour === '0')) {
					this.setInputStringValue(e, year, month, day, hour+key, minute);
					nextTick(() => this.setSelectionToMinute(e));
				}
			}

			if (selectionIsOnMinute) {
				if (selection.length === 2) {
					if (num > 5) {
						this.setInputStringValue(e, year, month, day, hour, key);
						nextTick(() => this.setSelectionToAmPm(e));
					} else {
						input.value = input.value.slice(0, cursorPosition) + key + (isTwelveHours
							? input.value.slice(input.value.length - 3)
							: '');
						input.setSelectionRange(cursorPosition + 1, cursorPosition + 1);
					}
				} else if (minute.length === 1) {
					this.setInputStringValue(e, year, month, day, hour, minute+key);
					nextTick(() => this.setSelectionToAmPm(e));
				}
			}
		}

		// Handle alpha
		if (alpha.includes(key as typeof alpha[number])) {
			if (selectionIsOnAmPm) {
				this.setAmPm(e, key as typeof alpha[number]);
				nextTick(() => this.setSelectionToAmPm(e));
			}
		}

		// Handle deletion keys
		if (deletion.includes(key)) {

			const dayPattern = this.pattern.day.replace('$', '');
			const monthPattern = this.pattern.month.replace('$', '');
			const yearPattern = this.pattern.year.replace('$', '');
			const hourPattern = this.pattern.hour?.replace('$', '');
			const minutePattern = this.pattern.minute?.replace('$', '');

			if (selectionIsOnDay) {
				if (isNaN(+day)) {
					if (this.appLang === 'en') {
						this.setInputStringValue(e, year, monthPattern, day, hour, minute);
						this.setSelectionToMonth(e);
					} else {
						this.handleClear();
						nextTick(() => this.setSelectionToDay(e));
					}
				} else {
					this.setInputStringValue(e, year, month, dayPattern, hour, minute);
					this.setSelectionToDay(e);
				}
			}

			if (selectionIsOnMonth) {
				if (isNaN(+month)) {
					if (this.appLang === 'en') {
						this.handleClear();
						this.setSelectionToMonth(e);
					} else {
						this.setInputStringValue(e, year, month, dayPattern, hour, minute);
						this.setSelectionToDay(e);
					}
				} else {
					this.setInputStringValue(e, year, monthPattern, day, hour, minute);
					if (this.appLang === 'en')
						this.setSelectionToMonth(e);
					else
						this.setSelectionToDay(e);
				}
			}

			if (selectionIsOnYear) {
				if (!isNaN(+year)) {
					this.setInputStringValue(e, yearPattern, month, day, hour, minute);
					this.setSelectionToYear(e);
				} else {
					if (this.appLang === 'en') {
						this.setInputStringValue(e, year, month, dayPattern, hour, minute);
						this.setSelectionToDay(e);
					} else {
						this.setInputStringValue(e, year, monthPattern, day, hour, minute);
						this.setSelectionToMonth(e);
					}
				}
			}

			if (selectionIsOnHour) {
				if (isNaN(+hour)) {
					this.setInputStringValue(e, yearPattern, month, day, hour, minute);
					this.setSelectionToYear(e);
				} else {
					this.setInputStringValue(e, year, month, day, hourPattern, minute);
					this.setSelectionToHour(e);
				}
			}

			if (selectionIsOnMinute) {
				if (isNaN(+minute)) {
					this.setInputStringValue(e, year, month, day, hourPattern, minute);
					this.setSelectionToHour(e);
				} else {
					this.setInputStringValue(e, year, month, day, hour, minutePattern);
					this.setSelectionToMinute(e);
				}
			}
		}

		// Handle tab key
		if (key === 'Tab') {
			this.setInputStringValue(e, year, month, day, hour, minute);
		}
	}

	handlePopperShow () {
		if (this.props.type === 'range' && !this.hasValue) {
			this.range = {};
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
	}
}
