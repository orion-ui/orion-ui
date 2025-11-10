import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

vi.unmock('../../../../utils/tools');
vi.unmock('../../../../services/DynamicFlagService');

import useDocument from '../../../../services/DocumentService';
import useLocalStorage from '../../../../services/LocalStorageService';
import useWindow from '../../../../services/WindowService';
import useDynamicFlagService from '../../../../services/DynamicFlagService';
import { nextTick, ref } from 'vue';

vi.mock('../../../../services/WindowService');
vi.mock('../../../../services/DocumentService');
vi.mock('../../../../services/LocalStorageService');

vi.mock('devtool', () => ({
	devtoolId: 'orion-devtool',
	devtool: {
		sendInspectorState: vi.fn(),
	},
	setupDevtools: vi.fn(),
}));

vi.mock('../../../../devtool/index.ts', () => ({
	devtoolId: 'orion-devtool',
	devtool: {
		sendInspectorState: vi.fn(),
	},
	setupDevtools: vi.fn(),
}));

vi.mock('../../../../services/DynamicFlagService', () => ({
	default: vi.fn(),
}));


vi.mock('vue', async (importActual) => {
	const actual = await importActual<typeof import('vue')>();
	return {
		...actual,
		nextTick: vi.fn().mockImplementation(cb => cb?.()),
	};
});

const {
	getUid,
	regexEmail,
	isBrowser,
	prefixWithZeros,
	hoursToNumber,
	sleep,
	isDefineOrTrue,
	getDaysInMonth,
	getHoursInterval,
	isIpad,
	isTouch,
	isMac,
	isWindows,
	highlightDomElement,
	handleTouchDevice,
	itemHas,
	itemIs,
	pickFrom,
	addPopoverBackdropCloseAbility,
	displayPhone,
	getImageFlag,
	toggleGlobalListener,
	getThemeMode,
	setThemeMode,
	initThemeMode,
} = await import('../../../../utils/tools');

const mockUseWindow = useWindow as vi.Mock;
const mockUseDocument = useDocument as vi.Mock;
const mockUseLocalStorage = useLocalStorage as vi.Mock;
const mockUseDynamicFlagService = useDynamicFlagService as vi.Mock;
const mockNextTick = nextTick as vi.Mock;


describe('Tools.ts', () => {
	beforeEach(() => {
		vi.clearAllMocks();
		document.body.className = '';
		document.body.innerHTML = '';
		document.head.innerHTML = '';
	});

	describe('getUid', () => {
		it('should return incrementing numbers on subsequent calls', () => {
			const firstId = getUid();
			const secondId = getUid();
			expect(typeof firstId).toBe('number');
			expect(secondId).toBe(firstId + 1);
		});
	});

	describe('regexEmail', () => {
		it.each([
			['test@example.com', true],
			['test.name@example.co.uk', true],
			['test+alias@example.com', true],
			['test@example', false],
			['test.example.com', false],
			['@example.com', false],
		])('should validate email "%s" as %s', (email, isValid) => {
			expect(regexEmail.test(email)).toBe(isValid);
		});
	});

	describe('prefixWithZeros', () => {
		it('should prefix single-digit numbers with a zero by default', () => {
			expect(prefixWithZeros(5)).toBe('05');
		});

		it('should not prefix numbers that already meet the length', () => {
			expect(prefixWithZeros(15)).toBe('15');
		});

		it('should prefix with multiple zeros to meet a custom length', () => {
			expect(prefixWithZeros(5, 4)).toBe('0005');
		});

		it('should handle falsy inputs by treating them as 0', () => {
			expect(prefixWithZeros(0)).toBe('00');
			expect(prefixWithZeros(null as any)).toBe('00');
			expect(prefixWithZeros(undefined as any)).toBe('00');
		});
	});

	describe('hoursToNumber', () => {
		it.each([
			['10:30', 10.5],
			['08:15', 8.25],
			['12:00', 12],
			['5:3', 5.5],
		])('should convert "%s" to %f', (time, expected) => {
			expect(hoursToNumber(time)).toBeCloseTo(expected);
		});

		it('should return 0 for invalid string', () => {
			expect(hoursToNumber('invalid-time')).toBe(0);
		});
	});

	describe('sleep', () => {
		beforeEach(() => {
			vi.useFakeTimers();
		});
		afterEach(() => {
			vi.useRealTimers();
		});

		it('should resolve after the specified milliseconds', async () => {
			const sleepPromise = sleep(1000);
			await vi.advanceTimersByTimeAsync(1000);
			await expect(sleepPromise).resolves.toBeUndefined();
		});
	});

	describe('isDefineOrTrue', () => {
		it.each([
			[true, true],
			[1, true],
			['hello', true],
			[{}, true],
			[false, false],
			[null, false],
			[undefined, false],
		])('should return %s for input %s', (input, expected) => {
			expect(isDefineOrTrue(input)).toBe(expected);
		});
	});

	describe('getDaysInMonth', () => {
		it('should return the correct number of days for a given month and year', () => {
			expect(getDaysInMonth(2, 2023)).toBe(28); // Feb 2023
			expect(getDaysInMonth(2, 2024)).toBe(29); // Feb 2024 (leap year)
			expect(getDaysInMonth(4, 2023)).toBe(30); // April
		});
	});

	describe('getHoursInterval', () => {
		it('should return a formatted string for a date interval', () => {
			const start = new Date(2023, 0, 1, 9, 5);
			const end = new Date(2023, 0, 1, 17, 30);
			expect(getHoursInterval(start, end)).toBe('De 09h05 à 17h30');
		});

		it('should use a custom pattern and separator', () => {
			const start = new Date(2023, 0, 1, 8, 0);
			const end = new Date(2023, 0, 1, 12, 0);
			expect(getHoursInterval(start, end, 'From $start to $end', ':')).toBe('From 08:00 to 12:00');
		});
	});

	describe('Device detection', () => {
		const mockWindow = {
			navigator: { userAgent: '', platform: '' },
			matchMedia: vi.fn(),
		};
		const mockDocument = {
			createEvent: vi.fn(),
			body: { classList: { add: vi.fn(), remove: vi.fn() } },
		};

		beforeEach(() => {
			mockUseWindow.mockReturnValue(mockWindow);
			mockUseDocument.mockReturnValue(mockDocument);
			vi.spyOn(global, 'navigator', 'get').mockReturnValue({ platform: '' } as any);
		});

		describe('isIpad', () => {
			it('should return true if userAgent contains "iPad"', () => {
				mockWindow.navigator.userAgent = 'Mozilla/5.0 (iPad; CPU OS 13_5)';
				expect(isIpad()).toBe(true);
			});
			it('should return true if userAgent contains "Macintosh" and touch events are supported', () => {
				mockWindow.navigator.userAgent = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15)';
				mockDocument.createEvent.mockImplementation(() => { });
				expect(isIpad()).toBe(true);
			});
		});

		describe('isTouch', () => {
			it('should return true when matchMedia indicates a touch device', () => {
				mockWindow.matchMedia.mockReturnValue({ matches: false });
				expect(isTouch()).toBe(true);
			});
			it('should return false when matchMedia indicates a non-touch device', () => {
				mockWindow.matchMedia.mockReturnValue({ matches: true });
				expect(isTouch()).toBe(false);
			});
		});

		describe('isMac', () => {
			it('should return true for Mac platforms', () => {
				vi.spyOn(global, 'navigator', 'get').mockReturnValue({ platform: 'MacIntel' } as any);
				expect(isMac()).toBe(true);
			});
		});

		describe('isWindows', () => {
			it('should return true for Windows platforms', () => {
				vi.spyOn(global, 'navigator', 'get').mockReturnValue({ platform: 'Win32' } as any);
				expect(isWindows()).toBe(true);
			});
		});

		describe('handleTouchDevice', () => {
			it('should add "istouch" class to body if device is touch', () => {
				mockWindow.matchMedia.mockReturnValue({ matches: false }); // isTouch() will be true
				handleTouchDevice();
				expect(mockDocument.body.classList.add).toHaveBeenCalledWith('istouch');
			});
			it('should remove "istouch" class from body if device is not touch', () => {
				mockWindow.matchMedia.mockReturnValue({ matches: true }); // isTouch() will be false
				handleTouchDevice();
				expect(mockDocument.body.classList.remove).toHaveBeenCalledWith('istouch');
			});
		});
	});

	describe('highlightDomElement', () => {
		beforeEach(() => {
			vi.useFakeTimers();
			mockUseDocument.mockReturnValue(document);
		});
		afterEach(() => {
			vi.useRealTimers();
		});

		it('should create and append a highlighter canvas element', () => {
			const targetElement = document.createElement('div');
			Object.defineProperties(targetElement, {
				offsetTop: { value: 100 }, offsetLeft: { value: 150 },
				offsetHeight: { value: 50 }, offsetWidth: { value: 200 },
			});
			document.body.appendChild(targetElement);

			highlightDomElement(targetElement, { padding: 5, delay: 500 });

			const highlighter = document.querySelector('.orion-highlighter');
			expect(highlighter).not.toBeNull();
			expect((highlighter as HTMLElement).style.top).toBe('95px');
			expect((highlighter as HTMLElement).style.width).toBe('210px');

			vi.advanceTimersByTime(50);
			expect(highlighter?.classList.contains('orion-highlighter--visible')).toBe(true);

			vi.advanceTimersByTime(500);
			highlighter?.dispatchEvent(new Event('transitionend'));
			expect(document.querySelector('.orion-highlighter')).toBeNull();
		});
	});

	describe('Object utils', () => {
		const testObj = { a: 1, b: 'hello', c: true };

		it('itemHas should validate property existence', () => {
			expect(itemHas(testObj, 'a')).toBe(true);
			expect(itemHas(testObj, 'd' as any)).toBe(false);
		});

		it('itemIs should validate object shape', () => {
			type TestType = { a: number, b: string };
			expect(itemIs<TestType>(testObj, 'a', 'b')).toBe(true);
			expect(itemIs<TestType & { d: boolean }>(testObj, 'a', 'b', 'd')).toBe(false);
		});

		it('pickFrom should return a new object with only specified keys', () => {
			const picked = pickFrom(testObj, ['a', 'c']);
			expect(picked).toEqual({ a: 1, c: true });
			expect(picked).not.toHaveProperty('b');
		});
	});

	describe('addPopoverBackdropCloseAbility', () => {
		it('should add a click listener to the backdrop to hide the popover', () => {
			const hideMock = vi.fn();
			const popoverRef = ref({
				hide: hideMock,
				getTargetNodes: () => {
					const targetNode = document.createElement('div');
					targetNode.setAttribute('aria-describedby', 'popover-123');
					return [targetNode];
				},
			});

			const backdrop = document.createElement('div');
			backdrop.className = 'v-popper__backdrop';
			const popperContainer = document.createElement('div');
			popperContainer.id = 'popover-123';
			popperContainer.appendChild(backdrop);
			document.body.appendChild(popperContainer);

			const callback = vi.fn();
			addPopoverBackdropCloseAbility(popoverRef as any, callback);

			backdrop.click();

			expect(hideMock).toHaveBeenCalledOnce();
			expect(mockNextTick).toHaveBeenCalledOnce();
			expect(callback).toHaveBeenCalledOnce();
		});
	});

	describe('displayPhone', () => {
		it('should format a valid phone number internationally', () => {
			expect(displayPhone('+33612345678', 'FR')).toBe('+33 6 12 34 56 78');
		});

		it('should return the original string for an invalid number', () => {
			expect(displayPhone('12345', 'FR')).toBe('12345');
		});
	});

	describe('getImageFlag', () => {
		it('should call useDynamicFlagService with the country code', () => {
			getImageFlag('FR');
			expect(mockUseDynamicFlagService).toHaveBeenCalledWith('FR');
		});
	});

	describe('toggleGlobalListener', () => {
		const mockDocAdd = vi.fn(), mockDocRemove = vi.fn();
		const mockWinAdd = vi.fn(), mockWinRemove = vi.fn();

		beforeEach(() => {
			mockUseDocument.mockReturnValue({ addEventListener: mockDocAdd, removeEventListener: mockDocRemove });
			mockUseWindow.mockReturnValue({ addEventListener: mockWinAdd, removeEventListener: mockWinRemove });
		});

		it('should add a listener to document by default', () => {
			const cb = () => {};
			toggleGlobalListener('click', cb);
			expect(mockDocAdd).toHaveBeenCalledWith('click', cb, undefined);
		});

		it('should remove a listener given a UID', () => {
			const cb = () => {};
			const uid = toggleGlobalListener('click', cb) as number;
			toggleGlobalListener(uid);
			expect(mockDocRemove).toHaveBeenCalledWith('click', cb);
		});
	});

	describe('Theme management', () => {
		const mockLocalStorage = { getItem: vi.fn(), setItem: vi.fn(), removeItem: vi.fn() };
		const mockSetAttribute = vi.fn();
		const mockMediaQuery = { matches: false, addEventListener: vi.fn(), removeEventListener: vi.fn() };

		beforeEach(() => {
			mockUseLocalStorage.mockReturnValue(mockLocalStorage);
			mockUseDocument.mockReturnValue({ documentElement: { setAttribute: mockSetAttribute } });
			mockUseWindow.mockReturnValue({ matchMedia: () => mockMediaQuery });
		});

		it('getThemeMode should return theme from local storage or default to "auto"', () => {
			mockLocalStorage.getItem.mockReturnValue('dark');
			expect(getThemeMode()).toBe('dark');
			mockLocalStorage.getItem.mockReturnValue(null);
			expect(getThemeMode()).toBe('auto');
		});

		it('setThemeMode should set theme for "dark" or "light"', () => {
			setThemeMode('dark');
			expect(mockLocalStorage.setItem).toHaveBeenCalledWith('orion-theme', 'dark');
			expect(mockSetAttribute).toHaveBeenCalledWith('data-orion-theme', 'dark');
		});


		it('initThemeMode should initialize theme based on stored value', () => {
			mockLocalStorage.getItem.mockReturnValue('dark');
			initThemeMode();
			expect(mockSetAttribute).toHaveBeenCalledWith('data-orion-theme', 'dark');
		});
	});
});