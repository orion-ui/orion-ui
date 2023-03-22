export class Pluralizer {
	static pluralize (words: string, quantity: number, quantityIncluded = true) {
		const prefix = quantityIncluded ? `${quantity} ` : '';

		if (quantity >= 2 || quantity <= -2) {
			return prefix + Pluralizer.pluralizeWords(words);
		} else {
			return prefix + words;
		}
	}

	private static pluralizeWords (words: string) {
		let wordsFormatted = '';
		words.split(' ').forEach((element: string, index: number) => {
			if (index > 0) wordsFormatted += ' ';
			wordsFormatted += Pluralizer.pluralizeSingleWord(element);
		});
		return wordsFormatted.replace(/l'/g, pronouns.get(`l'`));
	}

	private static pluralizeSingleWord (word: string) {
		const pronoun = pronouns.get(word);
		if (pronoun) return pronoun;

		const count = word.length < 4 ? word.length + 1 : 5;
		for (let i = 1; i < count; i++) {
			const end = word.substr(word.length - i);
			const formatFunction = exceptions.get(end);
			if (formatFunction) return formatFunction(word);
		}
		return `${word}s`;
	}
}

// #region Methods for pronoun's formatting
const pronouns = new Map();
pronouns.set(`l'`, 'les ');
pronouns.set('le', 'les');
pronouns.set('la', 'les');
pronouns.set('un', 'des');
pronouns.set('une', 'des');
pronouns.set('mon', 'mes');
pronouns.set('ton', 'tes');
pronouns.set('son', 'ses');
pronouns.set('notre', 'nos');
pronouns.set('votre', 'vos');
pronouns.set('leur', 'leurs');
pronouns.set('ce', 'ces');
pronouns.set('cet', 'ces');
pronouns.set('cette', 'ces');
// #endregion

// #region Methods for word's formatting
const ouExceptions = [
	'bijou',
	'caillou',
	'chou',
	'genou',
	'hibou',
	'joujou',
	'pou',
];

const alExceptions = [
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

const ailExceptions = [
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

const noFormatting = (word: string): string => word;
const auFormatting = (word: string): string => `${word}x`;

const cielFormatting = (): string => 'cieux';
const oeilFormatting = (): string => 'yeux';

const ouFormatting = (word: string): string => ouExceptions.includes(word) ? `${word}x` : `${word}s`;
const alFormatting = (word: string): string => {
	const formattedWord = word.substr(0, word.length - 1);
	return alExceptions.includes(word) ? `${word}s` : `${formattedWord}ux`;
};
const ailFormatting = (word: string): string => {
	const formattedWord = word.substr(0, word.length - 2);
	return ailExceptions.includes(word) ? `${formattedWord}ux` : `${word}s`;
};

const exceptions = new Map();
exceptions.set('s', noFormatting);
exceptions.set('x', noFormatting);
exceptions.set('z', noFormatting);
exceptions.set('au', auFormatting);
exceptions.set('eu', auFormatting);
exceptions.set('ou', ouFormatting);
exceptions.set('al', alFormatting);
exceptions.set('ail', ailFormatting);
exceptions.set('ciel', cielFormatting);
exceptions.set('oeil', oeilFormatting);
exceptions.set('œil', oeilFormatting);
// #endregion

export default Pluralizer;
