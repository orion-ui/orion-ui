import { Ref, nextTick } from 'vue';
import { Dropdown } from 'floating-vue';
import { devtool, devtoolId } from 'devtool';
import useDocument from 'services/DocumentService';
import useLocalStorage from 'services/LocalStorageService';
import useWindow from 'services/WindowService';
import { CountryCode, parsePhoneNumber } from 'libphonenumber-js';
import useDynamicFlagService from 'services/DynamicFlagService';
import { Log } from 'lib';

const uidGenerator = function* () {
	let index = 1;
	while (true)
		yield index++;
}();


export const getUid = () => uidGenerator.next().value;

export const regexEmail = /^([a-zA-Z0-9_-]+([+.]{1}[a-zA-Z0-9_-]+)*)@([a-zA-Z0-9_-]+([.]{1}[a-zA-Z0-9_-]+)*)([.]{1}[a-z]{2,12})$/;

export const isBrowser = !!useWindow() && !!useDocument();

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
 * @desc resolves a promise after the number of milliseconds given in parameters
 * @param {number} milliseconds time to wait
 * @return Promise
 */
export async function sleep (milliseconds: number) {
	return new Promise(resolve => setTimeout(resolve, milliseconds));
}

/**
 * @desc checks if the value is different from undefined, null or false
 * @param {any} val value to check
 * @return boolean
 */
export function isDefineOrTrue (val: any) {
	return val !== undefined && val !== null && val !== false;
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

/**
 * @desc checks if the app is running on an ipad
 * @return boolean | undefined
 */
export function isIpad () {
	const ua = useWindow()?.navigator.userAgent;
	if (!ua) return;

	if (ua.indexOf('iPad') > -1) {
		return true;
	}

	if (ua.indexOf('Macintosh') > -1) {
		try {
			useDocument()?.createEvent('TouchEvent');
			return true;
			// eslint-disable-next-line no-empty
		} catch (e) {}
	}

	return false;
}

/**
 * @desc checks if the app is running on a device with a touchable screen
 * @return boolean
 */
export function isTouch () {
	return (!useWindow()?.matchMedia(
		'(any-hover: hover) and (pointer: fine)',
	).matches);
}

/**
 * @desc checks if the app is running on a Mac device
 * @return boolean
 */
export function isMac () {
	return typeof navigator !== 'undefined' && navigator.platform.toUpperCase().includes('MAC');
}

/**
 * @desc checks if the app is running on a Windows device
 * @return boolean
 */
export function isWindows () {
	return typeof navigator !== 'undefined' && navigator.platform.toUpperCase().includes('WIN');
}

/**
 * @desc hightlights an element of the DOM
 * @param {(HTMLElement | string | null | undefined)} element DOM element to highlight
 * @param {{ padding?: number, delay?: number, event?: MouseEvent }} [options] options
 * @return void
 */
export function highlightDomElement (element: Nil<HTMLElement | string>, options?: { padding?: number, delay?: number, event?: MouseEvent }) {
	const browserDocument = useDocument();
	if (!browserDocument) return;

	if (typeof element === 'string') {
		element = browserDocument.getElementById(element);
	}

	if (!element) return;

	const mergedOptions = {
		...{
			padding: 3,
			delay: 1000,
			event: undefined,
		},
		...(options ?? {}),
	};

	const highlighter = browserDocument.createElement('canvas');
	highlighter.classList.add('orion-highlighter');
	highlighter.style.top = (element.offsetTop - mergedOptions.padding) + 'px';
	highlighter.style.left = (element.offsetLeft - mergedOptions.padding) + 'px';
	highlighter.style.height = (element.offsetHeight + mergedOptions.padding * 2) + 'px';
	highlighter.style.width = (element.offsetWidth + mergedOptions.padding * 2) + 'px';

	if (element.parentElement && element.parentElement.append) {
		// https://developer.mozilla.org/fr/docs/Web/API/ParentNode/append
		element.parentElement.append(highlighter);
	}

	setTimeout(() => {
		highlighter.classList.add('orion-highlighter--visible');
	}, 50);

	if (mergedOptions.event?.type === 'mouseenter') {
		mergedOptions.event.target?.addEventListener('mouseleave', () => {
			highlighter.addEventListener('transitionend', () => highlighter.remove());
			highlighter.classList.remove('orion-highlighter--visible');
		}, { once: true });
	} else if (mergedOptions.event?.type === 'click' || !mergedOptions.event) {
		setTimeout(() => {
			highlighter.addEventListener('transitionend', () => highlighter.remove());
			highlighter.classList.remove('orion-highlighter--visible');
		}, mergedOptions.delay);
	}
}

/**
 * @desc adds the class `istouch` to the body if the device is touchable, removes it if not
 * @return void
 */
export function handleTouchDevice () {
	if (isTouch()) {
		useDocument()?.body.classList.add('istouch');
	} else {
		useDocument()?.body.classList.remove('istouch');
	}
}

/**
 * @desc checks if the item contains the prop given in parameter
 * @param {Record<string, any>} item item to check
 * @param {any} prop prop to search
 * @return boolean
 */
export function itemHas <P extends string> (item: Record<string, any>, prop: P): item is Record<P, any> {
	return prop in item;
}

/**
 * @desc checks if the item is of the given type by checking the existance of one or more keys
 * @param {Record<string, any>} item item to check
 * @param {string[]} validationKeys keys to look for in the object
 * @return boolean
 */
export function itemIs<T extends Record<string, any>> (item: Record<string, any>, ...validationKeys: (keyof T)[]): item is T {
	return validationKeys.filter(k => k in item).length === validationKeys.length;
}

/**
 * @desc returns a copy of the object in the first argument with only the properties specified in the second argument
 * @param {T extends Record<string, any>} target the object on which to extract keys
 * @param {(K extends keyof T)[]} keys the keys to extract
 * @return Pick<T, K>
 */
export function pickFrom <T extends object, K extends keyof T> (target: T, keys: K[]): Pick<T, K> {
	const res = {} as Pick<T, K>;
	keys.forEach((k) => {
		res[k] = target[k];
	});
	return res;
}

/**
 * @desc add a 'click' event listener on the popover's backdrop to close it
 * @param {Ref<InstanceType<typeof Dropdown>>} popoverRef
 * @param {() => void} [cb]
 * @return void
 */
export function addPopoverBackdropCloseAbility (popoverRef: Ref<Undef<InstanceType<typeof Dropdown>>>, cb?: () => void) {
	const targetPopoverId = (popoverRef.value?.getTargetNodes() as HTMLElement[])[0]?.getAttribute('aria-describedby');
	if (targetPopoverId) {
		const backdrop = document.getElementById(targetPopoverId)?.querySelector('.v-popper__backdrop') as Undef<HTMLElement>;
		backdrop?.addEventListener('click', () => {
			popoverRef.value?.hide();
			nextTick(() => cb?.());
		}, { once: true });
	}
}

export function displayPhone (phoneNumber : string, code: CountryCode) {
	try {
		const parsedPhoneNumber = parsePhoneNumber(phoneNumber, code);
		if (parsedPhoneNumber.isValid()) {
			return parsedPhoneNumber.formatInternational();
		}
		return phoneNumber;
	} catch {
		return phoneNumber;
	}
}

export function getImageFlag (countryCode: CountryCode) {
	return useDynamicFlagService(countryCode);
}



// #region Global events toggling
type EventEntry = {
  type: string;
  callback: EventListenerOrEventListenerObject;
	target: 'document' | 'window';
}
const eventsRegistry: Record<number, EventEntry> = {};
export function toggleGlobalListener (
	type: string | number,
	callback?: EventListenerOrEventListenerObject,
	params?: (boolean | AddEventListenerOptions) & { uid?: number, target?: EventEntry['target'] },
) {
	const uid = params?.uid ?? getUid();
	const target = params?.target ?? 'document';
	if (typeof type === 'string' && !!callback) {
		eventsRegistry[uid] = {
			type,
			callback,
			target,
		};

		if (target === 'document') {
			useDocument()?.addEventListener(type, callback, params);
		} else {
			useWindow()?.addEventListener(type, callback, params);
		}
		return uid;
	} else if (typeof type === 'number') {
		if (!eventsRegistry[type]) return;

		if (eventsRegistry[type].target === 'document') {
			useDocument()?.removeEventListener(eventsRegistry[type].type, eventsRegistry[type].callback);
		} else {
			useWindow()?.removeEventListener(eventsRegistry[type].type, eventsRegistry[type].callback);
		}
		return type;
	}
}
// #endregion


// #region Color Theme
export const isDarkMode = useWindow()?.matchMedia && useWindow()?.matchMedia('(prefers-color-scheme: dark)').matches;
const darkThemeMediaQuery = useWindow()?.matchMedia('(prefers-color-scheme: dark)');
const themeMediaQueryListEventHandler = (e: MediaQueryListEvent) => {
	const targetTheme = e.matches ? 'dark' : 'light';
	useDocument()?.documentElement.setAttribute('data-orion-theme', targetTheme);
};

export function getThemeMode () {
	return useLocalStorage()?.getItem('orion-theme') as Orion.Theme ?? 'auto';
}

export function setThemeMode (mode: Orion.Theme) {
	if (mode === 'dark' || mode === 'light') {
		useLocalStorage()?.setItem('orion-theme', mode);
		useDocument()?.documentElement.setAttribute('data-orion-theme', mode);

		if (typeof darkThemeMediaQuery?.removeEventListener === 'function') {
			darkThemeMediaQuery?.removeEventListener('change', themeMediaQueryListEventHandler);
		}
	} else {
		useLocalStorage()?.removeItem('orion-theme');
		if (darkThemeMediaQuery?.matches) {
			useDocument()?.documentElement.setAttribute('data-orion-theme', 'dark');
		} else {
			useDocument()?.documentElement.setAttribute('data-orion-theme', 'light');
		}

		if (typeof darkThemeMediaQuery?.addEventListener === 'function') {
			darkThemeMediaQuery?.addEventListener('change', themeMediaQueryListEventHandler);
		}
	}

	devtool?.sendInspectorState(devtoolId);
}

export function initThemeMode () {
	setThemeMode(getThemeMode());
}
// #endregion


export function getIconStyle () : Orion.IconStyle {
	const iconStyle = useLocalStorage()?.getItem('data-orion-icon-style') as Orion.IconStyle;
	return iconStyle ?? 'outlined';
}

export function setIconStyle (style: Orion.IconStyle) {
	useLocalStorage()?.setItem('data-orion-icon-style', style);
	useDocument()?.documentElement.setAttribute('data-orion-icon-style', style);

	loadMaterialIconsCSS(style);
}

function capitalizeFirstLetter (val: string) {
	return String(val).charAt(0).toUpperCase() + String(val).slice(1);
}

async function loadMaterialIconsCSS (style: Orion.IconStyle) {
	try {
		const existingLinks = useDocument()?.querySelectorAll('link[data-material-icons], style[data-material-icons]');
		existingLinks?.forEach(link => link.remove());

		const link = useDocument()?.createElement('link');
		if (link && useDocument()) {
			link.rel = 'stylesheet';
			link.type = 'text/css';
			link.setAttribute('data-material-icons', style);

			link.href = `https://fonts.googleapis.com/css2?family=Material+Symbols+${capitalizeFirstLetter(style)}`;
			useDocument()?.head.appendChild(link);
		}

	} catch {
		Log.error('Failed to load Material Icons CSS');
	}
}

