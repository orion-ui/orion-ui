import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';


const {
	mockLangSet,
	currentLangRef,
	mockUseLang,
	mockGetAppLang,
	mockUsePluralize,
	mockLogOrion,
} = vi.hoisted(() => {
	const langSet = {
		fr: {
			IN: 'Dans',
			THERE_IS: 'Il y a',
			YEAR: 'An',
			MONTH: 'Mois',
			DAY: 'Jour',
			HOUR: 'Heure',
			MINUTE: 'Minute',
			SECOND: 'Seconde',
			DATE_PATTERN: '$dddd $DD $MMMM $YYYY',
			DAY_NAME: ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'],
			MONTH_NAME: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'],
			MONTH_NAME_SHORT: ['Janv.', 'Févr.', 'Mars', 'Avr.', 'Mai', 'Juin', 'Juil.', 'Août', 'Sept.', 'Oct.', 'Nov.', 'Déc.'],
		},
		en: {
			IN: 'In',
			THERE_IS: 'ago',
			YEAR: 'Year',
			MONTH: 'Month',
			DAY: 'Day',
			HOUR: 'Hour',
			MINUTE: 'Minute',
			SECOND: 'Second',
			DATE_PATTERN: '$MMMM $DD, $YYYY, $h:$mm $a',
			DAY_NAME: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
			MONTH_NAME: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
			MONTH_NAME_SHORT: ['Jan.', 'Feb.', 'Mar.', 'Apr.', 'May', 'Jun.', 'Jul.', 'Aug.', 'Sep.', 'Oct.', 'Nov.', 'Dec.'],
		},
	};

	const langRef = { current: 'fr' as 'fr' | 'en' };

	return {
		mockLangSet: langSet,
		currentLangRef: langRef,
		mockGetAppLang: vi.fn(() => langRef.current),
		mockUseLang: vi.fn(() => langSet[langRef.current]),
		mockUsePluralize: vi.fn((word: string, quantity: number, withCount = true) => {
			const pluralWord = (Math.abs(quantity) !== 1) ? `${word}s` : word;
			return withCount ? `${quantity} ${pluralWord}` : pluralWord;
		}),
		mockLogOrion: vi.fn(),
	};
});

vi.mock('../../../../services/LangService', () => ({
	default: mockUseLang,
	getAppLang: mockGetAppLang,
}));

vi.mock('../../../../services/PluralizeService', () => ({
	default: mockUsePluralize,
}));

vi.mock('../../../../utils/Log', () => ({
	default: {
		orion: mockLogOrion,
	},
}));

import useMonkey, { applyMonkeyPatching } from '../../../../services/MonkeyService';


describe('services/MonkeyService', () => {
	beforeEach(() => {
		vi.clearAllMocks();
		currentLangRef.current = 'fr';
		vi.useRealTimers();
	});
	
	describe('useMonkey factory', () => {
		it('should return ArrayMonkeyPatching for an array', () => {
			const result = useMonkey([1, 2]);
			expect(result.constructor.name).toBe('ArrayMonkeyPatching');
		});

		it('should return DateMonkeyPatching for a Date', () => {
			const result = useMonkey(new Date());
			expect(result.constructor.name).toBe('DateMonkeyPatching');
		});

		it('should return NumberMonkeyPatching for a number', () => {
			const result = useMonkey(123);
			expect(result.constructor.name).toBe('NumberMonkeyPatching');
		});

		it('should return StringMonkeyPatching for a string', () => {
			const result = useMonkey('hello');
			expect(result.constructor.name).toBe('StringMonkeyPatching');
		});
	});

	describe('ArrayMonkeyPatching', () => {
		it('distinct should filter unique primitives', () => {
			const arr = useMonkey([1, 2, 2, 3, 1]);
			expect(arr.distinct()).toEqual([1, 2, 3]);
		});

		it('distinct should filter unique objects by key', () => {
			const arr = useMonkey([{ id: 1, name: 'a' }, { id: 2, name: 'b' }, { id: 1, name: 'c' }]);
			expect(arr.distinct('id')).toEqual([{ id: 1, name: 'a' }, { id: 2, name: 'b' }]);
		});

		it('last should return the last element', () => {
			expect(useMonkey([1, 2, 3]).last()).toBe(3);
			expect(useMonkey([]).last()).toBeUndefined();
		});

		it('first should return the first element', () => {
			expect(useMonkey([1, 2, 3]).first()).toBe(1);
			expect(useMonkey([]).first()).toBeUndefined();
		});

		it('delete should remove an element by value or key', () => {
			expect(useMonkey([1, 2, 3]).delete(2)).toEqual([1, 3]);
			const arr = useMonkey([{ id: 1 }, { id: 2 }, { id: 3 }]);
			expect(arr.delete({ id: 2 })).toEqual([{ id: 1 }, { id: 3 }]);
		});

		it('deleteWhere should remove elements based on a condition', () => {
			const arr = useMonkey([{ id: 1, val: 'a' }, { id: 2, val: 'b' }, { id: 3, val: 'a' }]);
			expect(arr.deleteWhere('val', 'a')).toEqual([{ id: 2, val: 'b' }]);
			const arr2 = useMonkey([1, 2, 3, 4, 5]);
			expect(arr2.deleteWhere(x => x > 3)).toEqual([1, 2, 3]);
		});

		it('empty should clear the array', () => {
			expect(useMonkey([1, 2, 3]).empty()).toEqual([]);
		});

		it('toggle should add or remove an element', () => {
			const arr = useMonkey([1, 2]);
			arr.toggle(3);
			expect(arr).toEqual([1, 2, 3]);
			arr.toggle(2);
			expect(arr).toEqual([1, 3]);
		});

		it('mapKey should return an array of values for a given key', () => {
			const arr = [{ id: 1, name: 'a' }, { id: 2, name: 'b' }];
			expect(useMonkey(arr).mapKey('name')).toEqual(['a', 'b']);
		});

		it('findByKey should find an object by its key value', () => {
			const arr = [{ id: 1, name: 'a' }, { id: 2, name: 'b' }];
			expect(useMonkey(arr).findByKey(2, 'id')).toEqual({ id: 2, name: 'b' });
		});

		it('pushUniq should only add unique items', () => {
			const arr = useMonkey([1, 2]);
			arr.pushUniq(3);
			expect(arr).toEqual([1, 2, 3]);
			arr.pushUniq(2);
			expect(arr).toEqual([1, 2, 3]);
		});

		it('filterNil should remove null and undefined values', () => {
			const arr = useMonkey([1, null, 2, undefined, 3, 0]);
			expect(arr.filterNil()).toEqual([1, 2, 3, 0]);
		});
	});

	describe('DateMonkeyPatching', () => {
		const testDate = new Date('2023-05-20T14:30:15');

		it('toPost should format date for POST requests', () => {
			expect(useMonkey(testDate).toPost()).toBe('2023-05-20');
			expect(useMonkey(testDate).toPost(true)).toBe('2023-05-20T14:30:15');
		});

		it('isBissextile should detect leap years', () => {
			expect(useMonkey(new Date('2024-01-01')).isBissextile()).toBe(true);
			expect(useMonkey(new Date('2023-01-01')).isBissextile()).toBe(false);
		});

		it('toReadable should format date according to lang', () => {
			currentLangRef.current = 'fr';
			expect(useMonkey(testDate).toReadable()).toBe('Samedi 20 mai 2023');

			currentLangRef.current = 'en';
			expect(useMonkey(testDate).toReadable()).toBe('May 20, 2023, 2:30 pm');
		});

		it('toMidnight should set time to 00:00:00:000', () => {
			const midnight = useMonkey(testDate).toMidnight();
			expect(midnight.getHours()).toBe(0);
			expect(midnight.getMinutes()).toBe(0);
			expect(midnight.getSeconds()).toBe(0);
		});

		it('toEndOfDay should set time to 23:59:59:999', () => {
			const endOfDay = useMonkey(testDate).toEndOfDay();
			expect(endOfDay.getHours()).toBe(23);
			expect(endOfDay.getMinutes()).toBe(59);
			expect(endOfDay.getSeconds()).toBe(59);
			expect(endOfDay.getMilliseconds()).toBe(999);
		});

		it('getTimeBetween should calculate and format time difference', () => {
			vi.useFakeTimers();
			const fixedNow = new Date('2024-06-21T15:40:25');
			vi.setSystemTime(fixedNow);
			const startDate = new Date('2023-05-20T14:30:15');

			const result = useMonkey(startDate).getTimeBetween();

			expect(result).toBe('il y a 1 an');

			const pattern = '$year, $month, $day, $hour, $min, $sec';
			const resultWithPattern = useMonkey(startDate).getTimeBetween(pattern, fixedNow);
			expect(mockUsePluralize).toHaveBeenCalledWith('An', 1, true);
			expect(mockUsePluralize).toHaveBeenCalledWith('Mois', 1, true);
			expect(mockUsePluralize).toHaveBeenCalledWith('Jour', 1, true);
			expect(mockUsePluralize).toHaveBeenCalledWith('Heure', 1, true);
			expect(mockUsePluralize).toHaveBeenCalledWith('Minute', 10, true);
			expect(mockUsePluralize).toHaveBeenCalledWith('Seconde', 10, true);
		});
	});

	describe('NumberMonkeyPatching', () => {
		it('toHoursMinutes should convert decimal hours to H:M format', () => {
			expect(useMonkey(8.5).toHoursMinutes()).toBe('08:30');
			expect(useMonkey(12.75).toHoursMinutes('h')).toBe('12h45');
		});

		it('withDelimiters should format number with thousand separators', () => {
			expect(useMonkey(1234567.89).withDelimiters()).toBe('1 234 567,89');
			expect(useMonkey(1234567.89).withDelimiters(',', '.')).toBe('1,234,567.89');
		});

		it('toCurrency should format number as currency', () => {
			expect(useMonkey(123.45).toCurrency()).toBe('123,45 €');
			expect(useMonkey(123).toCurrency('$')).toBe('123,00$');
			expect(useMonkey(123.4).toCurrency()).toBe('123,40 €');
		});

		it('decimal should round to a given precision', () => {
			expect(useMonkey(10.129).decimal(2)).toBe(10.13);
			expect(useMonkey(10.123).decimal(2)).toBe(10.12);
		});
	});

	describe('StringMonkeyPatching', () => {
		it('toReadableDate should format a date string', () => {
			currentLangRef.current = 'fr';
			const dateStr = '2023-05-20T14:30:15';
			expect(useMonkey(dateStr).toReadableDate()).toBe('Samedi 20 mai 2023');
		});

		it('insert should insert a string at a given index', () => {
			expect(useMonkey('world').insert('hello ', 0).toString()).toBe('hello world');
			expect(useMonkey('Hllo').insert('e', 1).toString()).toBe('Hello');
		});

		it('pluralize should pluralize a string based on quantity', () => {
			expect(useMonkey('test').pluralize(1).toString()).toBe('1 test');
			expect(useMonkey('test').pluralize(2).toString()).toBe('2 tests');
			expect(useMonkey('test').pluralize(0, false).toString()).toBe('test');
		});

		it('hashCode should return a number', () => {
			expect(typeof useMonkey('test').hashCode()).toBe('number');
		});

		it('mark should highlight a substring with <mark> tags', () => {
			const text = 'This is a test sentence.';
			const marked = useMonkey(text).mark('test');
			expect(marked.toString()).toBe('This is a <mark>test</mark> sentence.');
		});

		it('preview should truncate a string with an ellipsis', () => {
			const longText = 'This is a very long sentence.';
			expect(useMonkey(longText).preview(20).toString()).toBe('This is a very lo...');
			expect(useMonkey('short').preview(10).toString()).toBe('short');
		});
	});

	describe('applyMonkeyPatching', () => {
		it('should add custom methods to native prototypes and log a message', () => {
			delete (Array.prototype as any).last;
			expect(([] as any).last).toBeUndefined();

			applyMonkeyPatching();

			expect(typeof ([] as any).last).toBe('function');
			expect([1, 2].last()).toBe(2);
			expect(mockLogOrion).toHaveBeenCalledWith('MonkeyPatching activated');
		});
	});
});