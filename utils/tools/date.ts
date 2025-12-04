/**
 * @desc converts an hour in a string format to a number
 * @param {string} value value to convert
 * @param {string} [delimiter=':'] delimiter between hours and minutes
 * @return number
 */
export function hoursToNumber (value: string, delimiter = ':') {
	const hourMinuteArray = value.split(delimiter);

	const hours = Number(hourMinuteArray[0]);

	const minutesString = hourMinuteArray[1]?.slice(0, 2).padEnd(2, '0') ?? '00';
	const minutes = Number(minutesString) / 60;

	const result = hours + minutes;

	return isNaN(result) ? 0 : result;
}

/**
 * @desc returns the number of days in a month
 * @param {number} weekNumber week number
 * @param {number} year year of the week
 * @return number
 */
export function getDaysInMonth (month: number, year: number) {
	return new Date(year, month, 0).getDate();
}

/**
 * @desc returns a string which contains an interval between two dates
 * @param {Date} start start date
 * @param {Date} end end date
 * @param {string} [pattern='De $start à $end'] pattern of the result string
 * @param {string} [hourSeparator='h'] separator between hours and minutes
 * @return string
 */
export function getHoursInterval (start: Date, end: Date, pattern = 'De $start à $end', hourSeparator='h') {

	const startHours = start.getHours().toString().padStart(2, '0');
	const startMinutes = start.getMinutes().toString().padStart(2, '0');

	const endHours = end.getHours().toString().padStart(2, '0');
	const endMinutes = end.getMinutes().toString().padStart(2, '0');

	return pattern
		.replace('$start', startHours.concat(hourSeparator, startMinutes))
		.replace('$end', endHours.concat(hourSeparator, endMinutes));
}
