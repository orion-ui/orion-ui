export default [
	{
		name: 'prefixWithZeros',
		return: 'string',
		params: {
			number: 'number | string',
			length: '= 2',
		},
		description: 'Prefixes the number given with zeros (2 by default).',
	},
	{
		name: 'setThemeMode',
		return: 'void',
		params: { mode: 'Theme' },
		description: 'Applies the theme defined in the parameter.',
	},
	{
		name: 'getThemeMode',
		return: 'Theme',
		params: '',
		description: 'Gets the theme in the localStorage.',
	},
	{
		name: 'initThemeMode',
		return: 'Theme',
		params: '',
		description: 'Initialize the theme mode from the local storage.',
	},
	{
		name: 'numberToHours',
		return: 'string',
		params: {
			value: 'number',
			delimiter: '=  : ',
		},
		description: 'Converts a decimal number into an hour format.',
	},
	{
		name: 'hoursToNumber',
		return: 'number',
		params: {
			value: 'string',
			delimiter: `= :`,
		},
		description: 'Converts an hour to a decimal format.',
	},
	{
		name: 'sleep',
		return: 'Promise',
		params: { milliseconds: `number` },
		description: 'Sets a timeout.',
	},
	{
		name: 'isDefineOrTrue',
		return: 'boolean',
		params: { val: `any` },
		description: 'Checks if the value is defined or true.',
	},
	{
		name: 'getWeekDates',
		return: 'Object',
		params: {
			weeknumber: 'number',
			year: 'number',
			startKey: '= start',
			endKey: '= end',
		},
		description: 'Returns an object which contains the start date and the end date of a certain week.',
	},
	{
		name: 'getWeekDays',
		return: 'Date[]',
		params: {
			weekNumber: 'number',
			year: 'number',
		},
		description: 'Returns an arrays which contains all the dates of the weeknumber given in parameters.',
	},
	{
		name: 'getDaysInMonth',
		return: 'number',
		params: {
			month: 'number',
			year: 'number',
		},
		description: 'Returns the number of days in a month.',
	},
	{
		name: 'getHoursInterval',
		return: 'string',
		params: {
			start: 'Date',
			end: 'Date',
			pattern: '= De $start à $end',
			hourSeparator: '= h',
		},
		description: 'Description',
	},
	{
		name: 'getCurrencySymbol',
		return: 'string',
		params: { currency: 'string' },
		description: 'description',
	},
	{
		name: 'isIpad',
		return: 'boolean | undefined',
		description: 'Check if the device is an Ipad.',
	},
	{
		name: 'isTouch',
		return: 'boolean | undefined',
		description: 'Check if the device is touchable.',
	},
	{
		name: 'highlightDomElement',
		return: 'void',
		params: {
			element: 'HTMLElement | string',
			event: 'MouseEvent',
		},
		description: 'description',
	},
	{
		name: 'getReadablePeriod',
		return: 'string',
		params: {
			startOrWeekNumber: 'Date | number',
			endOrYear: 'Date | number',
			pattern: '= Du $start au $end',
			readableParams: '= short',
		},
		description: 'Returns a string which contains a interval of dates.',
	},
	//TODO: Add pluralize ?
	{
		name: 'refreshNavMain',
		return: 'void',
		description: 'Emits a refresh event for the main navigation.',
	},
	{
		name: 'handleTouchDevice',
		return: 'void',
		description: `Adds the class 'istouch' on the body is the device is touchable, removes the class if not. `,
	},
	{
		name: 'toggleGlobalListener',
		return: 'number | undefined',
		params: {
			type: 'string | number',
			callback: 'EventListenerOrEventListenerObject',
			params: '(boolean | AddEventListenerOptions) & { uid?: number }',
		},
		description: 'description',
	},
];
