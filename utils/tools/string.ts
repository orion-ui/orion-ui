/**
 * @desc prefixes with zeros the number to reach the length given in parameter
 * @param {number | string} number number to prefix
 * @param {number} [length=2] final length
 * @return string
 */
export function prefixWithZeros (number: number | string, length = 2) {
	if (!number) number = 0;
	return String(number).padStart(length, '0');
}

/**
 * Capitalize the first letter of a string
 */
export function capitalizeFirstLetter (val: string) {
	return String(val).charAt(0).toUpperCase() + String(val).slice(1);
}

export function getEmailRegex () {
	return /^([a-zA-Z0-9_-]+([+.]{1}[a-zA-Z0-9_-]+)*)@([a-zA-Z0-9_-]+([.]{1}[a-zA-Z0-9_-]+)*)([.]{1}[a-z]{2,12})$/;
}
