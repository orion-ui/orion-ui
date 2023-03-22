import { nextTick, PropType, ref, watch } from 'vue';
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

	private dateSeparator = useLang().DATE_SEPARATOR;
	private timeSeparator = useLang().TIME_SEPARATOR;
	private dateTimeSeparator = useLang().DATETIME_SEPARATOR;
	private appLang = getAppLang();
	private dateformat = this.setDateFormat();
	private pattern = this.getPattern();

	private focusedWithMouse = false;
	private usedKeyboard = false;

	protected emit: DatepickerEmit;

	_options = ref<RefDom<OrionDateWeek | OrionDateRange | OrionDateTable>>();

	get displayDateSelected () {
		if (this.props.type === 'range' || this.props.type === 'week') {
			if (this.range?.start instanceof Date && this.range?.end instanceof Date) {
				return useLang().DATE_FROM_TO
					.replace('$start', useMonkey(this.range.start).toReadable())
					.replace('$end', useMonkey(this.range.end).toReadable());
			}
		} else {
			if (this.vModel instanceof Date) {
				if (this.props.time) {
					const hour = this.vModel.getHours();
					const minute = this.vModel.getMinutes();
					return `${useMonkey(this.vModel).toReadable()} - ${hour < 10 ? '0' + hour : hour}:${minute < 10 ? '0' + minute : minute}`;
				}
				return useMonkey(this.vModel).toReadable();
			}
			if (this.state.isFocus) {
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

		watch(() => props.time, () => {
			this.dateformat = this.setDateFormat();
			this.pattern = this.getPattern();
		});
	}


	private selectDate (date: Date) {
		this.vModel = date;
		if (!this.usedKeyboard) {
			if (this.props.time) {
				nextTick(() => {
					this._input.value?.setSelectionRange(
						this._input.value?.value.indexOf(this.dateTimeSeparator) + this.dateTimeSeparator.length,
						this._input.value?.value.indexOf(this.dateTimeSeparator) + this.dateTimeSeparator.length + 2,
					);
				});
			} else {
				this._input.value?.blur();
			}
		}

		this.usedKeyboard = false;
	};

	private setDateFormat () {
		let result = useLang().DATE_PATTERN;

		if (this.props.time)
			result += this.dateTimeSeparator + useLang().HOUR_FORMAT.replace('$TIME_SEPARATOR', this.timeSeparator);

		if (this.appLang === 'fr')
			result = result.replaceAll('D', 'J').replaceAll('Y', 'A');
		return result;
	};


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
	};

	private getEventData (e: Event) {
		const input = e.target as HTMLInputElement;
		const firstSeparatorIndex = input.value.indexOf(this.dateSeparator);
		const dateTimeSeparatorIndex = input.value.indexOf(this.dateTimeSeparator);

		const dayPostion = this.dateformat.toLowerCase().indexOf('$d');
		const monthPostion = this.dateformat.toLowerCase().indexOf('$m');

		let dayIndex, monthIndex;
		if (dayPostion < monthPostion) {
			dayIndex = 0;
			monthIndex = 1;
		} else {
			dayIndex = 1;
			monthIndex = 0;
		}

		return {
			input,
			cursorPosition: input.selectionStart ?? 0,
			firstSeparatorIndex,
			secondSeparatorIndex: input.value.indexOf(this.dateSeparator, firstSeparatorIndex + 1),
			dateTimeSeparatorIndex,
			timeSeparatorIndex: input.value.indexOf(this.timeSeparator, dateTimeSeparatorIndex + 1),
			day: input.value.split(this.dateTimeSeparator)[0].split(this.dateSeparator)[dayIndex],
			month: input.value.split(this.dateTimeSeparator)[0].split(this.dateSeparator)[monthIndex],
			year: input.value.split(this.dateTimeSeparator)[0].split(this.dateSeparator)[2],
			hour: input.value.split(this.dateTimeSeparator)[1]?.split(this.timeSeparator)[0],
			minute: input.value.split(this.dateTimeSeparator)[1]?.split(this.timeSeparator)[1],
		};
	}

	handleMouseup (e: MouseEvent) {
		const {
			input, cursorPosition,
			firstSeparatorIndex, secondSeparatorIndex, dateTimeSeparatorIndex, timeSeparatorIndex,
		} = this.getEventData(e);

		setTimeout(() => {
			if (!this.vModel || cursorPosition <= firstSeparatorIndex) {
				// select day
				input.setSelectionRange(0, firstSeparatorIndex);
			} else if (cursorPosition > firstSeparatorIndex && cursorPosition <= secondSeparatorIndex) {
				// select month
				input.setSelectionRange(firstSeparatorIndex + 1, secondSeparatorIndex);
			} else if (cursorPosition > secondSeparatorIndex && (!this.props.time || (this.props.time && cursorPosition <= dateTimeSeparatorIndex))) {
				// select year
				input.setSelectionRange(secondSeparatorIndex + 1, dateTimeSeparatorIndex);
			} else if (cursorPosition > dateTimeSeparatorIndex && cursorPosition <= timeSeparatorIndex) {
				// select hour
				input.setSelectionRange(dateTimeSeparatorIndex + 3, timeSeparatorIndex);
			} else if (cursorPosition > timeSeparatorIndex) {
				// select minute
				input.setSelectionRange(timeSeparatorIndex + 1, timeSeparatorIndex + 3);
			}
		}, 25);
	}

	handleMousedown () {
		this.focusedWithMouse = true;
	}

	handleFocusCustom (e: FocusEvent) {
		if (!this.focusedWithMouse) {
			setTimeout(() => {
				const { input, firstSeparatorIndex } = this.getEventData(e);
				input.setSelectionRange(0, firstSeparatorIndex);
			}, 25);
		}
		this.handleFocus(e);
	}

	handleBlurCustom (e?: FocusEvent) {
		this.focusedWithMouse = false;

		if (e) {
			const { year, month, day, hour, minute } = this.getEventData(e);
			if (this.usedKeyboard && /^\d{4}$/.test(year) && /^\d{1,2}$/.test(month) && /^\d{1,2}$/.test(day)) {
				this.selectDate(new Date(Number(year), Number(month) - 1, Number(day), Number(hour ?? 0), Number(minute ?? 0)));
			}
		}

		this.handleBlur(e);
	}

	handleClearCustom () {
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
			input, cursorPosition, day, month, year, hour, minute,
			firstSeparatorIndex, secondSeparatorIndex, dateTimeSeparatorIndex, timeSeparatorIndex,
		} = this.getEventData(e);
		const { key } = e;
		const numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
		const arrows = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'];
		const deletion = ['Backspace', 'Delete'];
		const misc = ['Tab'];
		const allowed = [...numbers, ...arrows, ...deletion, ...misc];

		if (e.metaKey || e.ctrlKey || !allowed.includes(key)) {
			e.preventDefault();
			return;
		}

		if (![...misc, this.dateSeparator].includes(key)) e.preventDefault();

		this.usedKeyboard = true;

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
		const selectionIsOnMinute = this.props.time && cursorPosition > timeSeparatorIndex;

		const setSelectionToDay = () => {
			const { input, firstSeparatorIndex } = this.getEventData(e);
			if (this.appLang === 'fr')
				input.setSelectionRange(0, firstSeparatorIndex);
			else if (this.appLang === 'en')
				input.setSelectionRange(firstSeparatorIndex + 1, secondSeparatorIndex);
		};

		const setSelectionToMonth = () => {
			const { input, firstSeparatorIndex, secondSeparatorIndex } = this.getEventData(e);
			if (this.appLang === 'fr')
				input.setSelectionRange(firstSeparatorIndex + 1, secondSeparatorIndex);
			else if (this.appLang === 'en')
				input.setSelectionRange(0, firstSeparatorIndex);
		};

		const setSelectionToYear = () => {
			const { input, secondSeparatorIndex } = this.getEventData(e);
			input.setSelectionRange(secondSeparatorIndex + 1, secondSeparatorIndex + 5);
		};

		const setSelectionToHour = () => {
			if (!this.props.time) return;
			const { input, timeSeparatorIndex } = this.getEventData(e);
			input.setSelectionRange(timeSeparatorIndex - 2, timeSeparatorIndex);
		};

		const setSelectionToMinute = () => {
			if (!this.props.time) return;
			const { input, timeSeparatorIndex } = this.getEventData(e);
			input.setSelectionRange(timeSeparatorIndex + 1, timeSeparatorIndex + 3);
		};

		const setInputValue = (year: string, month: string, day: string, hour = 'hh', minute = 'mm') => {
			const numRegex = /^-?\d{1,4}$/;
			const dateValid = this.props.time
				? numRegex.test(year) && numRegex.test(month) && numRegex.test(day) && numRegex.test(hour) && numRegex.test(minute)
				: numRegex.test(year) && numRegex.test(month) && numRegex.test(day);

			const dateValue = dateValid
				? this.props.time
					? new Date(Number(year), Number(month) - 1, Number(day), Number(hour), Number(minute))
					: new Date(Number(year), Number(month) - 1, Number(day))
				: null;

			// Check if all params are numbers
			if (dateValue) {
				if (this.props.time) {
					input.value = useMonkey(dateValue).toReadable()
						+ this.dateTimeSeparator + String(dateValue.getHours()).padStart(2, '0')
						+ this.timeSeparator + String(dateValue.getMinutes()).padStart(2, '0');
				} else {
					input.value = useMonkey(dateValue).toReadable();
				}
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
						.replace(this.pattern.minute, minute);
				} else {
					input.value = this.dateformat.toLowerCase()
						.replace(this.pattern.day, day)
						.replace(this.pattern.month, month)
						.replace(this.pattern.year, year);
				}
			}
		};

		const checkToUpdateValue = () => {
			if (this.props.type !== 'date') return;
			const { year, month, day, hour, minute } = this.getEventData(e);
			const regexWithTime = new RegExp(
				`\\d{2}${this.dateSeparator}\\d{2}${this.dateSeparator}\\d{4}${this.dateTimeSeparator}\\d{2}${this.timeSeparator}\\d{2}`,
			);
			const regexWithoutTime = new RegExp(`\\d{2}${this.dateSeparator}\\d{2}${this.dateSeparator}\\d{4}`);

			if (this.props.time && regexWithTime.test(input.value)) {
				this.vModel = new Date(
					Number(year),
					Number(month) - 1,
					Number(day),
					Number(hour),
					Number(minute),
				);
			} else if (!this.props.time && regexWithoutTime.test(input.value)) {
				this.vModel = new Date(
					Number(year),
					Number(month) - 1,
					Number(day),
				);
			}
		};

		// Handle arrows
		if (arrows.includes(key)) {
			if (key === 'ArrowRight') {
				// Set input value to handle 1 digit in day or month
				setInputValue(year, month, day, hour, minute);
				if (selectionIsOnDay) {
					if (this.appLang === 'fr')
						setSelectionToMonth();
					else
						setSelectionToYear();
				}
				if (selectionIsOnMonth)
					if (this.appLang === 'fr')
						setSelectionToYear();
					else {
						setSelectionToDay();
					}
				if (selectionIsOnYear) setSelectionToHour();
				if (selectionIsOnHour) setSelectionToMinute();
			}

			if (key === 'ArrowLeft') {
				// Set input value to handle 1 digit in day or month
				setInputValue(year, month, day, hour, minute);
				if (selectionIsOnDay) {
					setSelectionToMonth();
				}
				if (selectionIsOnMonth) setSelectionToDay();
				if (selectionIsOnYear) {
					if (this.appLang === 'fr')
						setSelectionToMonth();
					else if (this.appLang === 'en')
						setSelectionToDay();
				}
				if (selectionIsOnHour) setSelectionToYear();
				if (selectionIsOnMinute) setSelectionToHour();
			}

			if (key === 'ArrowDown' || key === 'ArrowUp') {
				if (selectionIsOnDay && /\d{1,2}/.test(day)) {
					let newDay = Number(day);
					if (key === 'ArrowDown') newDay--;
					if (key === 'ArrowUp') newDay++;
					setInputValue(year, month, String(newDay), hour, minute);
					setSelectionToDay();
				}

				if (selectionIsOnMonth && /\d{1,2}/.test(month)) {
					let newMonth = Number(month);
					if (key === 'ArrowDown') newMonth--;
					if (key === 'ArrowUp') newMonth++;
					setInputValue(year, String(newMonth), day, hour, minute);
					setSelectionToMonth();
				}

				if (selectionIsOnYear && /\d{4}/.test(year)) {
					let newYear = Number(year);
					if (key === 'ArrowDown') newYear--;
					if (key === 'ArrowUp') newYear++;
					setInputValue(String(newYear), month, day, hour, minute);
					setSelectionToYear();
				}

				if (selectionIsOnHour && /\d{1,2}/.test(hour)) {
					let newHour = Number(hour);
					if (key === 'ArrowDown') newHour--;
					if (key === 'ArrowUp') newHour++;
					setInputValue(year, month, day, String(newHour), minute);
					setSelectionToHour();
				}

				if (selectionIsOnMinute && /\d{1,2}/.test(minute)) {
					let newMinute = Number(minute);
					if (key === 'ArrowDown') newMinute--;
					if (key === 'ArrowUp') newMinute++;
					setInputValue(year, month, day, hour, String(newMinute));
					setSelectionToMinute();
				}
			}
		}

		// Handle numeric
		if (numbers.includes(key)) {
			const num = Number(key);
			if (selectionIsOnDay) {
				if (day.length === 2 && num >= 4) {
					setInputValue(year, month, key, hour, minute);
					this.appLang === 'en' ? setSelectionToYear() : setSelectionToMonth();
				} else {
					if (day.length === 1) {
						if (day === '3' && num > 1) return;
						setInputValue(year, month, day + num, hour, minute);
						this.appLang === 'en' ? setSelectionToYear() : setSelectionToMonth();
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
						setInputValue(year, key, day, hour, minute);
						this.appLang === 'en' ? setSelectionToDay() : setSelectionToYear();
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
					if (this.appLang === 'en') {
						input.value = input.value.slice(0, cursorPosition) + num + input.value.slice(firstSeparatorIndex);
						setSelectionToDay();
					} else {
						input.value = input.value.slice(0, cursorPosition) + num + input.value.slice(secondSeparatorIndex);
						setSelectionToYear();
					}
				}
			}

			if (selectionIsOnYear) {
				if (this.props.time) {
					input.value = input.value.slice(0, cursorPosition) + num + input.value.slice(dateTimeSeparatorIndex);
					input.setSelectionRange(cursorPosition + 1, cursorPosition + 1);
					if (year.length === 3) setSelectionToHour();
				} else {
					if (year.length >= 4 && cursorPosition > 6) return;
					input.value = input.value.slice(0, cursorPosition) + num;
				}
			}

			if (selectionIsOnHour) {
				if (hour.length === 2) {
					if (num > 2) {
						setInputValue(year, month, day, key, minute);
						setSelectionToMinute();
					} else {
						input.value = input.value.slice(0, cursorPosition) + num + input.value.slice(timeSeparatorIndex);
						input.setSelectionRange(cursorPosition + 1, cursorPosition + 1);
					}
				} else if (hour.length === 1 && ((hour === '2' && num <= 3) || hour === '1' || hour === '0')) {
					input.value = input.value.slice(0, cursorPosition) + num + input.value.slice(timeSeparatorIndex);
					setSelectionToMinute();
				}
			}

			if (selectionIsOnMinute) {
				if (minute.length === 2) {
					if (num > 5) {
						setInputValue(year, month, day, hour, key);
					} else {
						input.value = input.value.slice(0, cursorPosition) + num;
					}
				} else {
					input.value = input.value.slice(0, cursorPosition) + num;
				}
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
						setInputValue(year, monthPattern, day, hour, minute);
						setSelectionToMonth();
					} else {
						this.handleClearCustom();
						nextTick(setSelectionToDay);
					}
				} else {
					setInputValue(year, month, dayPattern, hour, minute);
					setSelectionToDay();
				}
			}

			if (selectionIsOnMonth) {
				if (isNaN(+month)) {
					if (this.appLang === 'en') {
						this.handleClearCustom();
						setSelectionToMonth();
					} else {
						setInputValue(year, month, dayPattern, hour, minute);
						setSelectionToDay();
					}
				} else {
					setInputValue(year, monthPattern, day, hour, minute);
					if (this.appLang === 'en')
						setSelectionToMonth();
					else
						setSelectionToDay();
				}
			}

			if (selectionIsOnYear) {
				if (!isNaN(+year)) {
					setInputValue(yearPattern, month, day, hour, minute);
					setSelectionToYear();
				} else {
					if (this.appLang === 'en') {
						setInputValue(year, month, dayPattern, hour, minute);
						setSelectionToDay();
					} else {
						setInputValue(year, monthPattern, day, hour, minute);
						setSelectionToMonth();
					}
				}
			}

			if (selectionIsOnHour) {
				if (isNaN(+hour)) {
					setInputValue(yearPattern, month, day, hour, minute);
					setSelectionToYear();
				} else {
					setInputValue(year, month, day, hourPattern, minute);
					setSelectionToHour();
				}
			}

			if (selectionIsOnMinute) {
				if (isNaN(+minute)) {
					setInputValue(year, month, day, hourPattern, minute);
					setSelectionToHour();
				} else {
					setInputValue(year, month, day, hour, minutePattern);
					setSelectionToMinute();
				}
			}
		}

		// Handle tab key
		if (key === 'Tab') {
			setInputValue(year, month, day, hour, minute);
		}

		checkToUpdateValue();
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
			this.handleClearCustom();
		}
	}
}
