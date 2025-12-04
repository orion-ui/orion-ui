export class Pluralizer {
	private pronouns = new Map([
		[`l'`, 'les '],
		['le', 'les'],
		['la', 'les'],
		['un', 'des'],
		['une', 'des'],
		['mon', 'mes'],
		['ton', 'tes'],
		['son', 'ses'],
		['notre', 'nos'],
		['votre', 'vos'],
		['leur', 'leurs'],
		['ce', 'ces'],
		['cet', 'ces'],
		['cette', 'ces'],
	]);

	private ouExceptions = [
		'bijou',
		'caillou',
		'chou',
		'genou',
		'hibou',
		'joujou',
		'pou',
	];

	private alExceptions = [
		'astronaval',
		'aéronaval',
		'aval',
		'bal',
		'banal',
		'bancal',
		'carnaval',
		'cérémonial',
		'chacal',
		'choral',
		'étal',
		'fatal',
		'festival',
		'final',
		'mistral',
		'natal',
		'naval',
		'récital',
		'régal',
	];

	private ailExceptions = [
		'aspirail',
		'bail',
		'corail',
		'émail',
		'fermail',
		'gemmail',
		'soupirail',
		'travail',
		'vantail',
		'ventail',
		'vitrail',
	];

	private noFormatting = (word: string): string => word;
	private auFormatting = (word: string): string => `${word}x`;

	private cielFormatting = (): string => 'cieux';
	private oeilFormatting = (): string => 'yeux';

	private ouFormatting = (word: string): string => {
		return this.ouExceptions.includes(word) ? `${word}x` : `${word}s`;
	};

	private alFormatting = (word: string): string => {
		const formattedWord = word.substr(0, word.length - 1);
		return this.alExceptions.includes(word) ? `${word}s` : `${formattedWord}ux`;
	};

	private ailFormatting = (word: string): string => {
		const formattedWord = word.substr(0, word.length - 2);
		return this.ailExceptions.includes(word) ? `${formattedWord}ux` : `${word}s`;
	};

	private exceptions = new Map([
		['s', this.noFormatting],
		['x', this.noFormatting],
		['z', this.noFormatting],
		['au', this.auFormatting],
		['eu', this.auFormatting],
		['ou', this.ouFormatting],
		['al', this.alFormatting],
		['ail', this.ailFormatting],
		['ciel', this.cielFormatting],
		['oeil', this.oeilFormatting],
		['œil', this.oeilFormatting],
	]);

	pluralize (words: string, quantity: number, quantityIncluded = true) {
		const prefix = quantityIncluded ? `${quantity} ` : '';

		if (quantity >= 2 || quantity <= -2) {
			return prefix + this.pluralizeWords(words);
		} else {
			return prefix + words;
		}
	}

	private pluralizeWords (words: string) {
		let wordsFormatted = '';
		words.split(' ').forEach((element: string, index: number) => {
			if (index > 0) wordsFormatted += ' ';
			wordsFormatted += this.pluralizeSingleWord(element);
		});
		return wordsFormatted.replace(/l'/g, this.pronouns.get(`l'`)!);
	}

	private pluralizeSingleWord (word: string) {
		const pronoun = this.pronouns.get(word);
		if (pronoun) return pronoun;

		const count = word.length < 4 ? word.length + 1 : 5;
		for (let i = 1; i < count; i++) {
			const end = word.substring(word.length - i);
			const formatFunction = this.exceptions.get(end);
			if (formatFunction) return formatFunction(word);
		}
		return `${word}s`;
	}
}
