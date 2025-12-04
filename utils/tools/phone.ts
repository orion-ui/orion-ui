import { CountryCode, parsePhoneNumberWithError } from 'libphonenumber-js';

export function displayPhone (phoneNumber : string, code: CountryCode) {
	try {
		const parsedPhoneNumber = parsePhoneNumberWithError(phoneNumber, code);
		if (parsedPhoneNumber.isValid()) {
			return parsedPhoneNumber.formatInternational();
		}
		return phoneNumber;
	} catch {
		return phoneNumber;
	}
}
