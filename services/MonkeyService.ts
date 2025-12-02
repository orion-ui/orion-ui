/* eslint-disable max-len */
import { escapeRegExp, get, isArray, isDate, isNil } from 'lodash-es';
import { prefixWithZeros } from 'utils/tools';
import { Log } from '../utils/Log';
import useLang, { getAppLang } from './LangService';
import usePluralize from './PluralizeService';


class ArrayMonkeyPatching<T> extends Array<T> {
	constructor (...items: T[]) {
		super();
		this.push(...items);
	}

	/**
	 * @desc returns an array with distinct values for the key specified in parameter
	 * @param {keyof T} distinctBy key of the array where the filter will be applied
	 * @return T[]
	 */
	distinct (distinctBy?: keyof T) {
		if (distinctBy) {
			const result = [];
			const map = new Map();
			for (const item of this) {
				if (distinctBy in (item as Record<string, any>)) {
					if (!map.has(item[distinctBy])) {
						map.set(item[distinctBy], true);
						result.push(item);
					}
				}
			}
			return result;
		} else {
			return [...new Set(this)];
		}
	}

	/**
	 * @desc returns the last item of the array, or undefined if the array is empty
	 * @return T | undefined
	 */
	last () {
		return this ? this[this.length - 1] : undefined;
	}

	/**
	 * @desc returns the first item of the array, or undefined if the array is empty
	 * @return T | undefined
	 */
	first () {
		return this ? this[0] : undefined;
	}

	/**
	 * @desc deletes an item from the array, based on the key given in parameters
	 * @param {any} target item or object to delete from the array
	 * @param {keyof T} [key='id'] key on which the research will be based
	 * @param {number} [deleteCount=1] numbers of elements to remove after the item index
	 * @return T[]
	 */
	delete (target: T, key: keyof T = 'id' as keyof T, deleteCount = 1): T[] {
		let targetIndex: number;

		if (typeof target === 'object' && !isNil(target?.[key])) {
			targetIndex = this.findIndex(x => x[key] === target?.[key]);
		} else {
			targetIndex = this.findIndex(x => x === target);
		}

		if (targetIndex >= 0) {
			this.splice(targetIndex, deleteCount);
		}

		return this as T[];
	}

	/**
	 * @desc deletes an item from the array if the pair key/ValueKey is found or if the key function is verified
	 * @param {any} keyValue value of the object to remove
	 * @param {K | ((x: T) => boolean)} key key on which the research will be based, or the function to verify
	 * @return T[]
	 */
	deleteWhere <K extends keyof T> (key: K | ((x: T) => boolean), keyValue?: T[K]): T[] {
		if (typeof key === 'string') {
			const filtered = this.filter(x => x[key] !== keyValue);
			this.length = 0;
			this.push(...filtered);
		} else if (typeof key === 'function') {
			const filtered = this.filter(x => !key(x));
			this.length = 0;
			this.push(...filtered);
		}

		return this as T[];
	};

	/**
	 * @desc clears the array
	 * @return Array
	 */
	empty (): T[] {
		this.length = 0;
		return this as T[];
	}

	/**
	 * @desc adds the target element in the array if it is not already present, removes it otherwise
	 * @param {T} target item or object to toggle in the array
	 * @param {keyof T} [key='id'] key on which the research will be based
	 * @return T[]
	 */
	toggle (target: T[][number], key: keyof T[][number] = 'id' as keyof T): T[] {
		let targetIndex: number;

		if (typeof target === 'object' && !isNil(target?.[key])) {
			targetIndex = this.findIndex(x => x[key] === target?.[key]);
		} else {
			targetIndex = this.findIndex(x => x === target);
		}

		if (targetIndex >= 0) {
			this.splice(targetIndex, 1);
		} else {
			this.push(target);
		}

		return this as T[];
	}

	/**
	 * @desc maps all values of the key given in parameter
	 * @param {K} [keyPath='id']
	 * @return T[K][]
	 */
	mapKey <T extends object, K extends keyof T> (this: T[], keyPath: K = 'id' as K): T[K][] {
		// TODO: get nested properties in typing
		return this.map(x => get<T, K>(x, keyPath));
	}

	/**
	 * @desc checks if the arrays contains the key/value pair given in parameters and returns it if found, undefined otherwise
	 * @param {T[K]} keyValue value of the key
	 * @param {K} [key='id'] key on which the research will be based
	 * @return T | undefined
	 */
	findByKey <T extends object, K extends keyof T> (this: T[], keyValue: T[K], key: K = 'id' as K) {
		return this.find(x => get<T, K>(x, key) === keyValue);
	}

	/**
	 * @desc adds the item if the array does not contain it already
	 * @param {any} item item to add
	 * @return Array
	 */
	pushUniq (item: T): T[] {
		if (!this.includes(item)) this.push(item);
		return this as T[];
	}

	/**
	 * @desc return the array without null or undefined items
	 * @return {*}  {T[]}
	 */
	filterNil (): T[] {
		return this.filter(x => x !== undefined && x !== null);
	}
}

class DateMonkeyPatching extends Date {
	constructor (baseDate: Date) {
		super(baseDate);
	}

	/**
	 * @desc returns the date to the format YYYY-MM-DD, or YYYY-MM-DDTHH-MM-SS if the param withTime is set to true
	 * @param {boolean} [withTime=false] adds the time to the date
	 * @return string
	 */
	toPost (withTime = false) {
		const month = prefixWithZeros(this.getMonth() + 1);
		const day = prefixWithZeros(this.getDate());
		let valueToReturn = `${this.getFullYear()}-${month}-${day}`;
		if (withTime) {
			const hour = prefixWithZeros(this.getHours());
			const minute = prefixWithZeros(this.getMinutes());
			const second = prefixWithZeros(this.getSeconds());
			valueToReturn = valueToReturn + `T${hour}:${minute}:${second}`;
		}
		return valueToReturn;
	}

	/**
	 * @desc returns the date to to current timezone, at the YYYY-MM-DDTHH-MM-SS format
	 * @return string
	 */
	toOffset () {
		const tzo = -this.getTimezoneOffset();
		const dif = tzo >= 0 ? '+' : '-';
		const pad = function (num: number): string {
			const norm = Math.floor(Math.abs(num));
			return (norm < 10 ? '0' : '') + norm;
		};

		return this.getFullYear() +
          '-' + pad(this.getMonth() + 1) +
          '-' + pad(this.getDate()) +
          'T' + pad(this.getHours()) +
          ':' + pad(this.getMinutes()) +
          ':' + pad(this.getSeconds()) +
          dif + pad(tzo / 60) +
          ':' + pad(tzo % 60);
	}

	/**
	 * @desc checks if the date is bissextile
	 * @return boolean
	 */
	isBissextile () {
		const year = this.getFullYear();
		return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
	}

	/**
	 * @desc returns the date to the YYYY-DDD format
	 * @return number
	 */
	getOrdinalDate () {
		const month = this.getMonth() + 1;
		const i = this.isBissextile() ? 2 : 3;
		let addOrLeapYear = (30 * (month - 1) + Math.floor(0.6 * (month + 1)) - i);
		if (month === 1) addOrLeapYear = 0;
		if (month === 2) addOrLeapYear = 31;
		const ordinalDay = addOrLeapYear + this.getDate();

		return ordinalDay;
	}

	/**
	 * @desc returns a string which indicates the elapsed time between the current date or the date given in parameter
	 * @param {string} pattern pattern of the result string (can contain $year, $month ...)
	 * @param {date} date optionnal date to compare
	 * @return string
	 */
	getTimeBetween (pattern?: string, date?: Date) {

		const startDate = new Date(this);
		const endDate = date ? new Date(date) : new Date();

		function getYearInMonth () {
			if (pattern?.includes('$year')) return;
			if (diffYear > 0) {
				diffMonth += 12 * diffYear;
			}
		}

		const getMonthInDay = () => {
			if (pattern?.includes('$month')) return;
			if (diffMonth > 0) {
				const refDate = endDate;
				const negativeDays = endDate.getDate() - startDate.getDate() < 0;
				for (let i = negativeDays ? 1 : 0; i < (negativeDays ? diffMonth + 1 : diffMonth); i++) {
					if (refDate.getMonth() - i > 0) {
						diffDay += new Date(refDate.getFullYear(), refDate.getMonth() - i, 0).getDate();
					} else {
						diffDay += new Date(refDate.getFullYear() - 1, refDate.getMonth() + 12 - i, 0).getDate();
					}
				}
			}
		};

		function getDayInHour () {
			if (pattern?.includes('$day')) return;
			if (diffDay > 0) {
				diffHour += diffDay * 24;
			}
		}

		function getHourInMin () {
			if (pattern?.includes('$hour')) return;
			if (diffHour > 0) {
				diffMin += diffHour * 60;
			}
		}

		function getMinInSec () {
			if (pattern?.includes('$min')) return;
			if (diffMin > 0) {
				diffSec += diffMin * 60;
			}
		}

		let diffYear = endDate.getFullYear() - startDate.getFullYear();
		let diffMonth = endDate.getMonth() - startDate.getMonth();
		let diffDay = endDate.getDate() - startDate.getDate();
		let diffHour = endDate.getHours() - startDate.getHours();
		let diffMin = endDate.getMinutes() - startDate.getMinutes();
		let diffSec = endDate.getSeconds() - startDate.getSeconds();

		if (diffSec < 0) {
			diffMin--;
			diffSec = 60 + diffSec;
		}

		if (diffMin < 0) {
			diffHour--;
			diffMin = 60 + diffMin;
		}

		if (diffHour < 0) {
			diffDay--;
			diffHour = 24 + diffHour;
		}

		if (diffDay < 0) {
			diffMonth--;
			const numberOfDaysInMonth = new Date(endDate.getFullYear(), endDate.getMonth(), 0).getDate();
			diffDay = numberOfDaysInMonth + diffDay;
		}

		if (diffMonth < 0) {
			diffYear--;
			diffMonth = 12 + diffMonth;
		}

		if (pattern) {
			getYearInMonth();
			getMonthInDay();
			getDayInHour();
			getHourInMin();
			getMinInSec();
		} else {

			function addTimeToPattern (pattern: string) {
				if (diffYear === 0 && diffMonth === 0 && diffDay === 0 && diffHour === 0 && diffMin === 0) {
					pattern += ' $sec';
				} else if (diffYear === 0 && diffMonth === 0 && diffDay === 0 && diffHour === 0) {
					pattern += ' $min';
				} else if (diffYear === 0 && diffMonth === 0 && diffDay === 0) {
					pattern += ' $hour';
				} else if (diffYear === 0 && diffMonth === 0) {
					pattern += ' $day';
				} else if (diffYear === 0) {
					pattern += ' $month';
				} else {
					pattern += ' $year';
				}

				return pattern;
			}

			if (date)
				pattern = useLang().IN.toLowerCase();
			else {
				if (getAppLang() === 'fr') {
					pattern = useLang().THERE_IS.toLowerCase();
					pattern = addTimeToPattern(pattern);
				} else {
					pattern = addTimeToPattern('');
					pattern += ' ' + useLang().THERE_IS.toLowerCase();
				}

			}

		}
		const result: string = pattern
			.replace('$year', `${usePluralize(useLang().YEAR, diffYear, true).toLowerCase()}`)
			.replace('$month', `${usePluralize(useLang().MONTH, diffMonth, true).toLowerCase()}`)
			.replace('$day', `${usePluralize(useLang().DAY, diffDay, true).toLowerCase()}`)
			.replace('$hour', `${usePluralize(useLang().HOUR, diffHour, true).toLowerCase()}`)
			.replace('$min', `${usePluralize(useLang().MINUTE, diffMin, true).toLowerCase()}`)
			.replace('$sec', `${usePluralize(useLang().SECOND, diffSec, true).toLowerCase()}`);
		return result;
	};

	/**
	 * @desc returns the weeknumber of the date
	 * @return number
	 */
	getWeekNumber () {
		const ordinalDay = this.getOrdinalDate();
		let weekDay = this.getDay();
		weekDay = weekDay === 0 ? 7 : weekDay;
		let weekNumber = Math.floor((ordinalDay - weekDay + 10) / 7);
		if (weekNumber === 53 && !this.hasFiftyThreeWeeks()) weekNumber = 1;
		if (weekNumber === 0) {
			const previousYearHas53weeks = useMonkey(new Date(`1-1-${this.getFullYear() - 1}`)).hasFiftyThreeWeeks();
			if (previousYearHas53weeks) weekNumber = 53;
			else weekNumber = 52;
		}

		return weekNumber;
	}

	/**
	 * @desc returns an object with the weekdays as keys, and their associated dates as values
	 * @return object
	 */
	getWeekDays () {
		const originalDate = new DateMonkeyPatching(this);
		const fdow = originalDate.setDateToFirstDow();
		const day = fdow.getDate();
		const month = fdow.getMonth();
		const year = fdow.getFullYear();

		return {
			monday: new Date(year, month, day),
			tuesday: new Date(year, month, day + 1),
			wednesday: new Date(year, month, day + 2),
			thursday: new Date(year, month, day + 3),
			friday: new Date(year, month, day + 4),
			saturday: new Date(year, month, day + 5),
			sunday: new Date(year, month, day + 6),
		};
	}

	/**
	 * @desc returns an object with the first and the last day of the week number given in parameter
	 * @param {string} [startKey = 'start'] key for the first day of the week
	 * @param {string} [endKey = 'end'] key for the last day of the week
	 * @return object
	 */
	getWeekDates <S extends string = 'start', E extends string = 'end'> (startKey = 'start' as S, endKey = 'end' as E): { [key in S | E]: Date } {
		return {
			[startKey]: this.getWeekDays().monday,
			[endKey]: this.getWeekDays().sunday,
		} as { [key in S | E]: Date };
	}

	/**
	 * @desc checks if the year of the date has 53 weeks
	 * @return boolean
	 */
	hasFiftyThreeWeeks () {
		let hasFiftyThreeWeeks = false;
		const oneJan = new Date(this.getFullYear(), 0, 1);

		if (useMonkey(oneJan).isBissextile()) {
			if (oneJan.getDay() === 4 || oneJan.getDay() === 3) {
				hasFiftyThreeWeeks = true;
			}
		} else if (oneJan.getDay() === 4) {
			hasFiftyThreeWeeks = true;
		}

		return hasFiftyThreeWeeks;
	}

	/**
	 * @desc sets the date to the first day of the week
	 * @return Date
	 */
	setDateToFirstDow () {
		let day = this.getDay();
		day = day === 0 ? 6 : day - 1;
		this.setDate(this.getDate() - day);
		return this;
	}

	/**
	 * @desc sets the date to the last day of the week
	 * @return Date
	 */
	setDateToLastDow () {
		let day = this.getDay();
		day = day === 0 ? 0 : 7 - day;
		this.setDate(this.getDate() + day);
		return this;
	}

	/**
	 * @desc returns the date to a string formatted according to the given pattern
	 * @param {string} [pattern=language.DATE_PATTERN] pattern of the string
	 * @param { } Example `new Date().toReadable('Meeting date : $dddd, $YYYY-$MM-$DD')`
	 * @param { } PatternKeywords ```\n$DD - date\n$dddd - day name\n$ddd - day name short\n$MMMM - month name\n$MMM - month name short\n$MM - month number\n$YYYY - full year\n$YY - short year\n$hh - hours\n$mm - minutes\n$ss - seconds\n```
	 * @return string
	 */
	toReadable (pattern?: string) {
		if (!pattern) pattern = useLang().DATE_PATTERN;

		let readableDay = '';
		switch (this.getDay()) {
		case 1:
			readableDay = useLang().DAY_NAME[0];
			break;
		case 2:
			readableDay = useLang().DAY_NAME[1];
			break;
		case 3:
			readableDay = useLang().DAY_NAME[2];
			break;
		case 4:
			readableDay = useLang().DAY_NAME[3];
			break;
		case 5:
			readableDay = useLang().DAY_NAME[4];
			break;
		case 6:
			readableDay = useLang().DAY_NAME[5];
			break;
		case 0:
			readableDay = useLang().DAY_NAME[6];
			break;
		default:
			break;
		}
		const readableDayShort = readableDay.slice(0, 3) + '.';

		const monthNum = this.getMonth() + 1;
		let readableMonth = '';
		let readableMonthShort = '';
		switch (monthNum) {
		case 1:
			readableMonth = useLang().MONTH_NAME[0];
			readableMonthShort = useLang().MONTH_NAME_SHORT[0];
			break;
		case 2:
			readableMonth = useLang().MONTH_NAME[1];
			readableMonthShort = useLang().MONTH_NAME_SHORT[1];
			break;
		case 3:
			readableMonth = useLang().MONTH_NAME[2];
			readableMonthShort = useLang().MONTH_NAME_SHORT[2];
			break;
		case 4:
			readableMonth = useLang().MONTH_NAME[3];
			readableMonthShort = useLang().MONTH_NAME_SHORT[3];
			break;
		case 5:
			readableMonth = useLang().MONTH_NAME[4];
			readableMonthShort = useLang().MONTH_NAME_SHORT[4];
			break;
		case 6:
			readableMonth = useLang().MONTH_NAME[5];
			readableMonthShort = useLang().MONTH_NAME_SHORT[5];
			break;
		case 7:
			readableMonth = useLang().MONTH_NAME[6];
			readableMonthShort = useLang().MONTH_NAME_SHORT[6];
			break;
		case 8:
			readableMonth = useLang().MONTH_NAME[7];
			readableMonthShort = useLang().MONTH_NAME_SHORT[7];
			break;
		case 9:
			readableMonth = useLang().MONTH_NAME[8];
			readableMonthShort = useLang().MONTH_NAME_SHORT[8];
			break;
		case 10:
			readableMonth = useLang().MONTH_NAME[9];
			readableMonthShort = useLang().MONTH_NAME_SHORT[9];
			break;
		case 11:
			readableMonth = useLang().MONTH_NAME[10];
			readableMonthShort = useLang().MONTH_NAME_SHORT[10];
			break;
		case 12:
			readableMonth = useLang().MONTH_NAME[11];
			readableMonthShort = useLang().MONTH_NAME_SHORT[11];
			break;
		default:
			break;
		}

		const result = pattern
			.replace('$DD', this.getDate().toString().padStart(2, '0'))
			.replace('$D', this.getDate().toString())
			.replace('$dddd', readableDay)
			.replace('$ddd', readableDayShort)
			.replace('$MMMM', pattern.indexOf('$MMMM') > 0
				? readableMonth.toLowerCase()
				: readableMonth,
			)
			.replace('$MMM', pattern.indexOf('$MMM') > 0
				? readableMonthShort.toLowerCase()
				: readableMonthShort,
			)
			.replace('$MM', monthNum.toString().padStart(2, '0'))
			.replace('$M', monthNum.toString())
			.replace('$YYYY', this.getFullYear().toString())
			.replace('$YY', this.getFullYear().toString().slice(-2))
			.replace('$hh', getAppLang() === 'en'
				? this.toLocaleTimeString('en').split(':')[0].toString().padStart(2, '0')
				: this.getHours().toString().padStart(2, '0'),
			)
			.replace('$h', getAppLang() === 'en'
				? this.toLocaleTimeString('en').split(':')[0].toString()
				: this.getHours().toString(),
			)
			.replace('$mm', this.getMinutes().toString().padStart(2, '0'))
			.replace('$m', this.getMinutes().toString())
			.replace('$ss', this.getSeconds().toString().padStart(2, '0'))
			.replace('$s', this.getSeconds().toString())
			.replace('$A', getAppLang() === 'en'
				? this.getHours() >= 12 ? 'PM' : 'AM'
				: '',
			)
			.replace('$a', getAppLang() === 'en'
				? this.getHours() >= 12 ? 'pm' : 'am'
				: '',
			);

		return result;
	}

	/**
	 * @desc returns the date, with the time set to midnight
	 * @desc/fr returns the date, with the time set to midnight
	 * @return Date
	 */
	toMidnight () {
		const midnightDate = new Date(this) as Date;
		midnightDate.setHours(0, 0, 0, 0);
		return midnightDate;
	}

	/**
	 * @desc returns the date with the time set to 23:59:999
	 * @return Date
	 */
	toEndOfDay () {
		const endOfDay = new Date(this) as Date;
		endOfDay.setHours(23, 59, 59, 999);
		return endOfDay;
	}
}

class NumberMonkeyPatching extends Number {
	constructor (baseNumber: number) {
		super(baseNumber);
	}

	/**
	 * @desc converts the number to hours and minutes
	 * @param {string} [separator=':'] separator between hours and minutes
	 * @return string
	 */
	toHoursMinutes (separator = ':') {
		const minutes = (this as unknown as number) % 1;
		const hours = String((this as unknown as number) - minutes).padStart(2, '0');
		return `${hours}${separator}${String(Math.round(minutes * 60)).padStart(2, '0')}`;
	}

	/**
	 * @desc converts the number to a string with separator between thousands and decimals
	 * @param {string} [thousands=' '] pattern of the string
	 * @param {string} [decimal=','] pattern of the string
	 * @return string
	 */
	withDelimiters (thousands = ' ', decimal = ',') {
		const parts = this.toString().split('.');
		parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, thousands);
		return parts.join(decimal);
	}

	/**
	 * @desc returns the number with two numbers of digits after the decimal point and with the currency
	 * @param {string} [currency=' €'] currency symbol
	 * @return string
	 */
	toCurrency (currency = ' €') {
		const amountArray = useMonkey(Number(this.toFixed(2))).withDelimiters().split(',');
		if (amountArray[1] && amountArray[1].length === 1) {
			amountArray[1] += '0';
		} else if (amountArray.length === 1) {
			amountArray.push('00');
		}
		return amountArray.join(',') + currency;
	}

	/**
	 * @desc return a decimal value of the number with the precision given in parameter
	 * @param {number} [precision=2] precision
	 * @return number
	 */
	decimal (precision = 2) {
		return Number(this.toFixed(precision));
	}
}

class StringMonkeyPatching extends String {
	constructor (baseString: string) {
		super(baseString);
	}

	/**
	 * @desc convertst the string to a JSON value
	 * @return string
	 */
	toPost () {
		return JSON.stringify(this);
	};

	/**
	 * @desc convert the string to a new Date and return its .toReadable(pattern)
	 * @param {string} pattern pattern of the date string
	 * @param { } MoreInfos check the Date.toReadable() method above
	 * @return string
	 */
	toReadableDate (pattern?: string): string {
		if (isNaN(new Date(this as unknown as Date).getDate())) {
			// eslint-disable-next-line no-console
			console.error(`String.toReadableDate() Invalid date string detected : ${this}`);
			return this as unknown as string;
		}
		return useMonkey(new Date(this as unknown as Date)).toReadable(pattern);
	};

	/**
	 * @desc insert the string given in parameters into the original string
	 * @param {string} string string to insert
	 * @param {number} [index=0] index when the string will be inserted
	 * @param {boolean} [replace=false] if set, the character on the original string at the position of the given index will be replaced by the inserted string
	 * @return string
	 */
	insert (string: string, index = 0, replace = false) {
		const replaceIndex = replace ? 1 : 0;
		if (index > 0) {
			return this.substring(0, index) + string + this.substr(index + replaceIndex);
		} else if (index < 0) {
			return this.substr(0, this.length + index - replaceIndex) + string + this.substring(this.length, this.length + index);
		}
		return string + this;
	};

	/**
	 * @desc adds the plural to the string if the quantity is greater than 1
	 * @param {number} quantity quantity of the word
	 * @param {boolean} [quantityIncluded=true] if set to true, the quantity will be added at the begining of the string
	 * @return string
	 */
	pluralize (quantity: number, quantityIncluded = true): string {
		if (quantity >= 2 || quantity <= -2) {
			return usePluralize(this as unknown as string, quantity, quantityIncluded);
		} else {
			return quantityIncluded ? `${quantity} ${this}` : this as unknown as string;
		}
	};

	/**
	 * @desc returns a hashCode of the string
	 * @return number
	 */
	hashCode () {
		return [...this].reduce((s, c) => Math.imul(31, s) + c.charCodeAt(0) | 0, 0);
	};

	/**
	 * @desc highlights in the string, the term given in parameter
	 * @param {string} valueToMark the term to mark
	 * @return string
	 */
	mark (valueToMark?: string): string {
		if (!valueToMark || !valueToMark?.length) return this as unknown as string;

		const subst = '<mark>$1</mark>';
		const regex = new RegExp(`(${escapeRegExp(valueToMark)})`, 'gmi');

		return this.replace(regex, subst);
	}

	/**
	 * @desc return a preview of the string with the given character length and an ellipsis if necessary
	 * @param {number} charLength the length of the preview
	 * @param {string} [ellipsis='...'] the ellipsis
	 * @return string
	 */
	preview (charLength: number, ellipsis = '...') {
		if (this.length <= charLength) {
			return this.toString();
		} else {
			const preview = this.slice(0, charLength - ellipsis.length);
			return preview + ellipsis;
		}
	}
}


class MonkeyService {
	static Array <T> (...items: T[]) {
		return new ArrayMonkeyPatching(...items);
	}

	static Date (baseDate: Date) {
		return new DateMonkeyPatching(baseDate);
	}

	static Number (baseNumber: number) {
		return new NumberMonkeyPatching(baseNumber);
	}

	static String (baseString: string) {
		return new StringMonkeyPatching(baseString);
	}
}

export default function useMonkey <T> (val: T[]): ArrayMonkeyPatching<T>;
export default function useMonkey (val: Date): DateMonkeyPatching;
export default function useMonkey (val: number): NumberMonkeyPatching;
export default function useMonkey (val: string): StringMonkeyPatching;
export default function useMonkey <T> (val: T[] | Date | number | string):
  ArrayMonkeyPatching<T> |
  DateMonkeyPatching |
  NumberMonkeyPatching |
  StringMonkeyPatching;
export default function useMonkey <T> (val: T[] | Date | number | string) {
	if (isArray(val)) return MonkeyService.Array(...val);
	if (isDate(val)) return MonkeyService.Date(val);
	if (typeof val === 'number') return MonkeyService.Number(val);
	if (typeof val === 'string') return MonkeyService.String(val);
}


export function applyMonkeyPatching () {
	const arrayPrototypeToPatch = Object.getPrototypeOf(new ArrayMonkeyPatching(...[]));
	const arrayMethodsToPatch = Object.getOwnPropertyNames(arrayPrototypeToPatch).filter(x => x !== 'constructor');
	arrayMethodsToPatch.forEach((x) => {
		Object.defineProperty(Array.prototype, x, { value: arrayPrototypeToPatch[x] });
	});

	const datePrototypeToPatch = Object.getPrototypeOf(new DateMonkeyPatching(new Date()));
	const dateMethodsToPatch = Object.getOwnPropertyNames(datePrototypeToPatch).filter(x => x !== 'constructor');
	dateMethodsToPatch.forEach((x) => {
		Object.defineProperty(Date.prototype, x, { value: datePrototypeToPatch[x] });
	});

	const numberPrototypeToPatch = Object.getPrototypeOf(new NumberMonkeyPatching(0));
	const numberMethodsToPatch = Object.getOwnPropertyNames(numberPrototypeToPatch).filter(x => x !== 'constructor');
	numberMethodsToPatch.forEach((x) => {
		Object.defineProperty(Number.prototype, x, { value: numberPrototypeToPatch[x] });
	});

	const stringPrototypeToPatch = Object.getPrototypeOf(new StringMonkeyPatching(''));
	const stringMethodsToPatch = Object.getOwnPropertyNames(stringPrototypeToPatch).filter(x => x !== 'constructor');
	stringMethodsToPatch.forEach((x) => {
		Object.defineProperty(String.prototype, x, { value: stringPrototypeToPatch[x] });
	});

	Log.orion(`MonkeyPatching activated`);
}
