/* eslint-disable max-len */

/**
 * Auto generated file using cli command
 * _> node cli.cjs
 * Then select 'doc' option
 * Manual changes will be overwritten
 */

const packagesDocData = new Map([
	[
		'Avatar',
		{
			localTypes: {},
			provide: [],
			slots: [],
			vModel: [],
			props: [{
				'name': 'avatar',
				'type': '{id: number} | number | string',
				'desc': {
					'en': 'the url of the image or an id (combined with root-url prop). More info in [Edges cases](#edge-cases) section.',
					'fr': 'url de l\'image ou id (combiné avec la prop `root-url`). Plus d\'infos dans la section [Cas complexes](#cas-complexes).',
				},
			}, {
				'name': 'color',
				'type': 'Orion.Color',
				'desc': {
					'en': 'defines the color',
					'fr': 'définit la couleur',
				},
				'defaultValue': '\'default\' ',
			}, {
				'name': 'contain',
				'type': 'boolean',
				'desc': {
					'en': 'adapts the size of the image to fit into the container',
					'fr': 'adapte la taille de l\'image pour s\'adapter à son conteneur',
				},
			}, {
				'name': 'name',
				'type': 'string',
				'desc': {
					'en': 'displays first letter of the name if there is no image',
					'fr': 'affiche la première lettre de la prop `name` s\'il n\'y a pas d\'image',
				},
				'defaultValue': '\'\'',
			}, {
				'name': 'nbAvatarUpdates',
				'type': 'number',
				'desc': {
					'en': 'number to increment on each update to refresh the image',
					'fr': 'nombre à incrémenter à chaque mise à jour de l\'image pour la rafraîchir',
				},
				'defaultValue': '0',
			}, {
				'name': 'rootUrl',
				'type': 'string',
				'desc': {
					'en': 'the root url when the `avatar` prop is a number or JSON object',
					'fr': 'url de l\'avatar si la prop `avatar` est un nombre ou un objet JSON',
				},
				'defaultValue': '\'/avatar/\'',
			}, {
				'name': 'size',
				'type': 'number | Orion.Size',
				'desc': {
					'en': 'define the size',
					'fr': 'définit la taille',
				},
				'defaultValue': '\'md\' ',
			}, {
				'name': 'square',
				'type': 'boolean',
				'desc': {
					'en': 'defines if the avatar is square-shaped (circle otherwise)',
					'fr': 'Définit la forme de l\'avatar (ronde par défaut)',
				},
			}, {
				'name': 'tooltip',
				'type': 'string',
				'desc': {
					'en': 'the tooltip text displayed to update the avatar',
					'fr': 'le texte qui sera affiché dans la tooltip au survol de l\'icône de modification',
				},
			}, {
				'name': 'updateFunction',
				'type': '() => void',
				'desc': {
					'en': 'function to call to update the avatar',
					'fr': 'fonction à appeler pour modifier l\'avatar',
				},
			}],
			events: [],
			publicInstance: undefined,
		},
	],
	[
		'Button',
		{
			localTypes: {},
			provide: [],
			slots: [{
				'name': 'default',
				'desc': {
					'en': 'the content of the button',
					'fr': 'contenu du bouton',
				},
				'bindings': [],
			}],
			vModel: [],
			props: [{
				'name': 'autofocus',
				'type': 'boolean',
				'desc': {
					'en': 'if set, focus the button',
					'fr': 'si défini, le focus sera placé sur le bouton',
				},
			}, {
				'name': 'block',
				'type': 'boolean',
				'desc': {
					'en': 'defines the button\'s width to 100%',
					'fr': 'définie la largeur du bouton à 100%',
				},
			}, {
				'name': 'color',
				'type': 'Orion.Color',
				'desc': {
					'en': 'defines the color',
					'fr': 'définit la couleur',
				},
				'defaultValue': '\'default\' ',
			}, {
				'name': 'disabled',
				'type': 'boolean',
				'desc': {
					'en': 'determines if the button is disabled',
					'fr': 'désactive le bouton',
				},
			}, {
				'name': 'loading',
				'type': 'boolean',
				'desc': {
					'en': 'adds a loading icon and disables the button',
					'fr': 'ajoute une icône de chargement et désactive le bouton',
				},
			}, {
				'name': 'nude',
				'type': 'boolean',
				'desc': {
					'en': 'removes the background color',
					'fr': 'masque la couleur en arrière plan',
				},
			}, {
				'name': 'outline',
				'type': 'boolean',
				'desc': {
					'en': 'adds an outline on the button',
					'fr': 'ajoute un contraste sur le bouton',
				},
			}, {
				'name': 'prefixFontIcon',
				'type': 'string',
				'desc': {
					'en': 'the prefix icon from the imported font library',
					'fr': 'définit l\'icône de préfixe à partir de la librairie de police importée',
				},
			}, {
				'name': 'prefixIcon',
				'type': 'Orion.Icon',
				'desc': {
					'en': 'the prefix icon',
					'fr': 'définit l\'icône de préfixe',
				},
			}, {
				'name': 'size',
				'type': 'Orion.Size',
				'desc': {
					'en': 'define the size',
					'fr': 'définit la taille',
				},
				'defaultValue': '\'md\' ',
			}, {
				'name': 'suffixFontIcon',
				'type': 'string',
				'desc': {
					'en': 'the suffix icon from the imported font library',
					'fr': 'Missing @doc',
				},
			}, {
				'name': 'suffixIcon',
				'type': 'Orion.Icon',
				'desc': {
					'en': 'the suffix icon',
					'fr': 'définit l\'icône de suffixe',
				},
			}],
			events: [{
				'name': 'click',
				'payload': 'MouseEvent',
				'desc': {
					'en': 'emitted on button click',
					'fr': 'émis lors du click sur le bouton',
				},
			}],
			publicInstance: undefined,
		},
	],
]);

export default packagesDocData;
