/* eslint-disable max-len */

/**
 * Auto generated file using cli command
 * _> node cli.cjs doc
 * Manual changes will be overwritten
 */

const toolsDocData = {
			prefixWithZeros: {"description":"prefixes with zeros the number to reach the length given in parameter","return":"string","param":[{"name":"number","type":"number | string","description":"number to prefix"},{"name":"length","type":"number","defaultValue":"2","description":"final length"}]},
			hoursToNumber: {"description":"converts an hour in a string format to a number","return":"number","param":[{"name":"value","type":"string","description":"value to convert"},{"name":"delimiter","type":"string","defaultValue":"':'","description":"delimiter between hours and minutes"}]},
			sleep: {"description":"resolves a promise after the number of milliseconds given in parameters","return":"Promise","param":[{"name":"milliseconds","type":"number","description":"time to wait"}]},
			isDefineOrTrue: {"description":"checks if the value is different from undefined, null or false","return":"boolean","param":[{"name":"val","type":"any","description":"value to check"}]},
			getDaysInMonth: {"description":"returns the number of days in a month","return":"number","param":[{"name":"weekNumber","type":"number","description":"week number"},{"name":"year","type":"number","description":"year of the week"}]},
			getHoursInterval: {"description":"returns a string which contains an interval between two dates","return":"string","param":[{"name":"start","type":"Date","description":"start date"},{"name":"end","type":"Date","description":"end date"},{"name":"pattern","type":"string","defaultValue":"'De $start à $end'","description":"pattern of the result string"},{"name":"hourSeparator","type":"string","defaultValue":"'h'","description":"separator between hours and minutes"}]},
			isIpad: {"description":"checks if the app is running on an ipad","return":"boolean | undefined","param":[]},
			isTouch: {"description":"checks if the app is running on a device with a touchable screen","return":"boolean","param":[]},
			isMac: {"description":"checks if the app is running on a Mac device","return":"boolean","param":[]},
			isWindows: {"description":"checks if the app is running on a Windows device","return":"boolean","param":[]},
			highlightDomElement: {"description":"hightlights an element of the DOM","return":"void","param":[{"name":"element","type":"(HTMLElement | string | null | undefined)","description":"DOM element to highlight"}]},
			handleTouchDevice: {"description":"adds the class `istouch` to the body if the device is touchable, removes it if not","return":"void","param":[]},
			itemHas: {"description":"checks if the item contains the prop given in parameter","return":"boolean","param":[{"name":"item","type":"Record<string, any>","description":"item to check"},{"name":"prop","type":"any","description":"prop to search"}]},
			itemIs: {"description":"checks if the item is of the given type by checking the existance of one or more keys","return":"boolean","param":[{"name":"item","type":"Record<string, any>","description":"item to check"},{"name":"validationKeys","type":"string[]","description":"keys to look for in the object"}]},
			pickFrom: {"description":"returns a copy of the object in the first argument with only the properties specified in the second argument","return":"Pick<T, K>","param":[{"name":"target","type":"T extends Record<string, any>","description":"the object on which to extract keys"},{"name":"keys","type":"(K extends keyof T)[]","description":"the keys to extract"}]},
			addPopoverBackdropCloseAbility: {"description":"add a 'click' event listener on the popover's backdrop to close it","return":"void","param":[]},
		};

export default toolsDocData;
