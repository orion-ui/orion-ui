/* eslint-disable max-len */

/**
 * Auto generated file using cli command
 * _> node cli.cjs
 * Then select 'doc' option
 * Manual changes will be overwritten
 */

const serviceDocData = new Map([
	[
		'Aside',
		{},
	],
	[
		'Chat',
		{},
	],
	[
		'Confirm',
		{},
	],
	[
		'Country',
		{
			get: {
				'description': 'returns all the countries objects',
				'return': 'Orion.Country[]',
				'param': [],
			},
			getCountryByCode: {
				'description': 'returns the country related to the code given in parameter',
				'return': 'Orion.Country | undefined',
				'param': [{
					'name': 'code',
					'type': 'string',
					'description': 'the code of the country',
				}],
			},
			getCountryByAreaCode: {
				'description': 'returns the country related to the area code given in parameter',
				'return': 'Orion.Country | undefined',
				'param': [{
					'name': 'areaCode',
					'type': 'string',
					'description': 'the areaCode of the country',
				}],
			},
		},
	],
	[
		'Document',
		{},
	],
	[
		'DragNDrop',
		{},
	],
	[
		'Lang',
		{},
	],
	[
		'Loader',
		{
			setGlobalLoader: {
				'description': 'adds a global loader on the application',
				'return': 'void',
				'param': [{
					'name': 'loaderInstance',
					'type': 'object',
					'description': 'instance of the orion loader',
				}],
			},
			show: {
				'description': 'if the global loader is set, shows the loader',
				'return': 'void',
				'param': [],
			},
			hide: {
				'description': 'if the global loader is set, hides the loader',
				'return': 'void',
				'param': [],
			},
		},
	],
	[
		'LocalStorage',
		{},
	],
	[
		'Modal',
		{},
	],
	[
		'Monkey',
		{
			'Array': {
				distinct: {
					'description': 'returns an array with distinct values for the key specified in parameter',
					'return': 'T[]',
					'param': [{
						'name': 'distinctBy',
						'type': 'keyof T',
						'description': 'key of the array where the filter will be applied',
					}],
				},
				last: {
					'description': 'returns the last item of the array, or undefined if the array is empty',
					'return': 'T | undefined',
					'param': [],
				},
				first: {
					'description': 'returns the first item of the array, or undefined if the array is empty',
					'return': 'T | undefined',
					'param': [],
				},
				delete: {
					'description': 'deletes an item from the array, based on the key given in parameters',
					'return': 'T[]',
					'param': [{
						'name': 'target',
						'type': 'any',
						'description': 'item or object to delete from the array',
					}, {
						'name': 'key',
						'type': 'keyof T',
						'defaultValue': '\'id\'',
						'description': 'key on which the research will be based',
					}, {
						'name': 'deleteCount',
						'type': 'number',
						'defaultValue': '1',
						'description': 'numbers of elements to remove after the item index',
					}],
				},
				deleteWhere: {
					'description': 'deletes an item from the array if the pair key/ValueKey is found or if the key function is verified',
					'return': 'T[]',
					'param': [{
						'name': 'keyValue',
						'type': 'any',
						'description': 'value of the object to remove',
					}, {
						'name': 'key',
						'type': 'K | ((x: T) => boolean)',
						'description': 'key on which the research will be based, or the function to verify',
					}],
				},
				empty: {
					'description': 'clears the array',
					'return': 'Array',
					'param': [],
				},
				toggle: {
					'description': 'adds the target element in the array if it is not already present, removes it otherwise',
					'return': 'T[]',
					'param': [{
						'name': 'target',
						'type': 'T',
						'description': 'item or object to toggle in the array',
					}, {
						'name': 'key',
						'type': 'keyof T',
						'defaultValue': '\'id\'',
						'description': 'key on which the research will be based',
					}],
				},
				mapKey: {
					'description': 'maps all values of the key given in parameter',
					'return': 'T[K][]',
					'param': [],
				},
				findByKey: {
					'description': 'checks if the arrays contains the key/value pair given in parameters and returns it if found, undefined otherwise',
					'return': 'T | undefined',
					'param': [{
						'name': 'keyValue',
						'type': 'T[K]',
						'description': 'value of the key',
					}, {
						'name': 'key',
						'type': 'K',
						'defaultValue': '\'id\'',
						'description': 'key on which the research will be based',
					}],
				},
				pushUniq: {
					'description': 'adds the item if the array does not contain it already',
					'return': 'Array',
					'param': [{
						'name': 'item',
						'type': 'any',
						'description': 'item to add',
					}],
				},
				filterNil: {
					'description': 'return the array without null or undefined items',
					'return': '{*}  {T[]}',
					'param': [],
				},
			},
			'Date': {
				toPost: {
					'description': 'returns the date to the format YYYY-MM-DD, or YYYY-MM-DDTHH-MM-SS if the param withTime is set to true',
					'return': 'string',
					'param': [{
						'name': 'withTime',
						'type': 'boolean',
						'defaultValue': 'false',
						'description': 'adds the time to the date',
					}],
				},
				toOffset: {
					'description': 'returns the date to to current timezone, at the YYYY-MM-DDTHH-MM-SS format',
					'return': 'string',
					'param': [],
				},
				isBissextile: {
					'description': 'checks if the date is bissextile',
					'return': 'boolean',
					'param': [],
				},
				getOrdinalDate: {
					'description': 'returns the date to the YYYY-DDD format',
					'return': 'number',
					'param': [],
				},
				getTimeBetween: {
					'description': 'returns a string which indicates the elapsed time between the current date or the date given in parameter',
					'return': 'string',
					'param': [{
						'name': 'pattern',
						'type': 'string',
						'description': 'pattern of the result string (can contain $year, $month ...)',
					}, {
						'name': 'date',
						'type': 'date',
						'description': 'optionnal date to compare',
					}],
				},
				getWeekNumber: {
					'description': 'returns the weeknumber of the date',
					'return': 'number',
					'param': [],
				},
				getWeekDays: {
					'description': 'returns an object with the weekdays as keys, and their associated dates as values',
					'return': 'object',
					'param': [],
				},
				getWeekDates: {
					'description': 'returns an object with the first and the last day of the week number given in parameter',
					'return': 'object',
					'param': [],
				},
				hasFiftyThreeWeeks: {
					'description': 'checks if the year of the date has 53 weeks',
					'return': 'boolean',
					'param': [],
				},
				setDateToFirstDow: {
					'description': 'sets the date to the first day of the week',
					'return': 'Date',
					'param': [],
				},
				setDateToLastDow: {
					'description': 'sets the date to the last day of the week',
					'return': 'Date',
					'param': [],
				},
				toReadable: {
					'description': 'returns the date to a string formatted according to the given pattern',
					'return': 'string',
					'param': [{
						'name': 'pattern',
						'type': 'string',
						'defaultValue': 'language.DATE_PATTERN',
						'description': 'pattern of the string',
					}, {
						'name': 'Example',
						'type': ' ',
						'description': '`new Date().toReadable(\'Meeting date : $dddd, $YYYY-$MM-$DD\')`',
					}, {
						'name': 'PatternKeywords',
						'type': ' ',
						'description': '```\\n$DD - date\\n$dddd - day name\\n$ddd - day name short\\n$MMMM - month name\\n$MMM - month name short\\n$MM - month number\\n$YYYY - full year\\n$YY - short year\\n$hh - hours\\n$mm - minutes\\n$ss - seconds\\n```',
					}],
				},
				toMidnight: {
					'description': 'returns the date, with the time set to midnight',
					'return': 'Date',
					'param': [],
				},
				toEndOfDay: {
					'description': 'returns the date with the time set to 23:59:999',
					'return': 'Date',
					'param': [],
				},
			},
			'Number': {
				toHoursMinutes: {
					'description': 'converts the number to hours and minutes',
					'return': 'string',
					'param': [{
						'name': 'separator',
						'type': 'string',
						'defaultValue': '\':\'',
						'description': 'separator between hours and minutes',
					}],
				},
				withDelimiters: {
					'description': 'converts the number to a string with separator between thousands and decimals',
					'return': 'string',
					'param': [{
						'name': 'thousands',
						'type': 'string',
						'defaultValue': '\' \'',
						'description': 'pattern of the string',
					}, {
						'name': 'decimal',
						'type': 'string',
						'defaultValue': '\',\'',
						'description': 'pattern of the string',
					}],
				},
				toCurrency: {
					'description': 'returns the number with two numbers of digits after the decimal point and with the currency',
					'return': 'string',
					'param': [{
						'name': 'currency',
						'type': 'string',
						'defaultValue': '\' €\'',
						'description': 'currency symbol',
					}],
				},
				decimal: {
					'description': 'return a decimal value of the number with the precision given in parameter',
					'return': 'number',
					'param': [{
						'name': 'precision',
						'type': 'number',
						'defaultValue': '2',
						'description': 'precision',
					}],
				},
			},
			'String': {
				toPost: {
					'description': 'convertst the string to a JSON value',
					'return': 'string',
					'param': [],
				},
				toReadableDate: {
					'description': 'convert the string to a new Date and return its .toReadable(pattern)',
					'return': 'string',
					'param': [{
						'name': 'pattern',
						'type': 'string',
						'description': 'pattern of the date string',
					}, {
						'name': 'MoreInfos',
						'type': ' ',
						'description': 'check the Date.toReadable() method above',
					}],
				},
				insert: {
					'description': 'insert the string given in parameters into the original string',
					'return': 'string',
					'param': [{
						'name': 'string',
						'type': 'string',
						'description': 'string to insert',
					}, {
						'name': 'index',
						'type': 'number',
						'defaultValue': '0',
						'description': 'index when the string will be inserted',
					}, {
						'name': 'replace',
						'type': 'boolean',
						'defaultValue': 'false',
						'description': 'if set, the character on the original string at the position of the given index will be replaced by the inserted string',
					}],
				},
				pluralize: {
					'description': 'adds the plural to the string if the quantity is greater than 1',
					'return': 'string',
					'param': [{
						'name': 'quantity',
						'type': 'number',
						'description': 'quantity of the word',
					}, {
						'name': 'quantityIncluded',
						'type': 'boolean',
						'defaultValue': 'true',
						'description': 'if set to true, the quantity will be added at the begining of the string',
					}],
				},
				hashCode: {
					'description': 'returns a hashCode of the string',
					'return': 'number',
					'param': [],
				},
				mark: {
					'description': 'highlights in the string, the term given in parameter',
					'return': 'string',
					'param': [{
						'name': 'valueToMark',
						'type': 'string',
						'description': 'the term to mark',
					}],
				},
				preview: {
					'description': 'return a preview of the string with the given character length and an ellipsis if necessary',
					'return': 'string',
					'param': [{
						'name': 'charLength',
						'type': 'number',
						'description': 'the length of the preview',
					}, {
						'name': 'ellipsis',
						'type': 'string',
						'defaultValue': '\'...\'',
						'description': 'the ellipsis',
					}],
				},
			},
		},
	],
	[
		'Mouse',
		{},
	],
	[
		'Notif',
		{},
	],
	[
		'Overlay',
		{
			setGlobalOverlay: {
				'description': 'adds a global overlay on the application. Used by **Orion** to set the main overlay',
				'return': 'void',
				'param': [{
					'name': 'overlayInstance',
					'type': 'object',
					'description': 'instance of the orion overlay',
				}],
			},
			show: {
				'description': 'if the global overlay is set, shows the overlay',
				'return': 'void',
				'param': [],
			},
			hide: {
				'description': 'if the global overlay is set, hides the overlay',
				'return': 'void',
				'param': [],
			},
		},
	],
	[
		'Pluralize',
		{},
	],
	[
		'PopableQueue',
		{},
	],
	[
		'Popable',
		{},
	],
	[
		'Prompt',
		{},
	],
	[
		'Responsive',
		{},
	],
	[
		'Tour',
		{
			register: {
				'description': 'registers the tour in the instance',
				'return': 'object',
				'param': [{
					'name': 'name',
					'type': 'string',
					'description': 'name of the tour',
				}],
			},
			start: {
				'description': 'starts the tour at the position given in parameter (0 by default)',
				'return': 'void',
				'param': [{
					'name': 'index',
					'type': 'number',
					'defaultValue': '0',
					'description': 'index of the step to target',
				}],
			},
			stop: {
				'description': 'stops the tour',
				'return': 'void',
				'param': [],
			},
		},
	],
	[
		'Ui',
		{},
	],
	[
		'Validation',
		{
			check: {
				'description': 'checks if the value verifies the rule given in parameter',
				'return': 'boolean',
				'param': [{
					'name': 'value',
					'type': 'T',
					'description': 'value to check',
				}, {
					'name': 'ruleParams',
					'type': 'Orion.Validation.RuleResult<T>',
					'description': 'rule which must verify the value to pass the verification',
				}],
			},
			checkRuleParams: {
				'description': 'checks if the value verifies the rule given in parameter',
				'return': 'boolean',
				'deprecated': 'Use "check" method instead',
				'param': [{
					'name': 'value',
					'type': 'any',
					'description': 'value to check',
				}, {
					'name': 'ruleParams',
					'type': 'Orion.Validation.RuleResult<any>',
					'description': 'rule which must verify the value to pass the verification',
				}],
			},
			validate: {
				'description': 'checks if the object to validate verifies all the rules.',
				'return': 'boolean',
				'param': [],
			},
			getResult: {
				'description': 'checks if the value verifies the rule given in parameter and return its full result.',
				'return': 'Orion.Validator.RuleResult[]',
				'param': [{
					'name': 'value',
					'type': 'T',
					'description': 'value to check',
				}, {
					'name': 'ruleParams',
					'type': 'Orion.Validation.RuleResult<T>',
					'description': 'rule which must verify the value to pass the verification',
				}],
			},
			getResults: {
				'description': 'checks each rule and return its result.',
				'return': 'Orion.Validator.RuleResult[]',
				'param': [],
			},
			rule: {
				'param': [{
					'name': 'ruleName',
					'type': 'string',
					'description': 'name of the rule',
				}],
			},
			showValidationState: {
				'description': 'displays the validation state',
				'return': 'void',
				'param': [],
			},
			hideValidationState: {
				'description': 'hides the validation state',
				'return': 'void',
				'param': [],
			},
			resetValidationState: {
				'description': 'resets the validation state',
				'return': 'void',
				'param': [],
			},
			registerComponentFocusStateSetter: {
				'description': 'this method allows the ValidationService instance to set the component\'s focus state, to display validation status on it',
				'return': 'void',
				'param': [],
			},
		},
	],
	[
		'Window',
		{},
	],
]);

export default serviceDocData;
