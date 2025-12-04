import { useDocument } from 'services/DocumentService';
import { useWindow } from 'services/WindowService';

export function isBrowser () {
	return !!useWindow() && !!useDocument();
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
			// eslint-disable-next-line no-empty, @typescript-eslint/no-unused-vars
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
