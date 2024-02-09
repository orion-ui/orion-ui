/* eslint-disable max-len */

/**
 * Auto generated file using cli command
 * _> node cli.cjs
 * Then select 'doc' option
 * Manual changes will be overwritten
 */

const packagesDocData = new Map([
	[
		'Alert',
		{
			localTypes: {},
			events: [{
				'name': 'close',
				'payload': 'undefined',
				'optional': false,
				'desc': {
					'en': 'emitted when closing the alert',
					'fr': 'émis lors de la fermeture de l\'alerte',
				},
			}],
			provide: [],
			slots: [{
				'name': 'default',
				'desc': {
					'en': 'the content of the alert',
					'fr': 'contenu de l\'alerte',
				},
				'bindings': [],
			}],
			props: [{
				'name': 'center',
				'defaultValue': false,
				'type': 'boolean',
				'required': false,
				'desc': {
					'en': 'Defines if the content must be centered in the component',
					'fr': 'Défini si le contenu doit être centré dans le composant',
				},
			}, {
				'name': 'close',
				'defaultValue': false,
				'type': 'boolean',
				'required': false,
				'desc': {
					'en': 'Defines if the alert can be closed',
					'fr': 'Si défini, une croix permet de fermer l\'alert',
				},
			}, {
				'name': 'color',
				'defaultValue': '\'default\'',
				'type': 'Orion.Color',
				'required': false,
				'sharedDefaultValue': '\'default\'',
				'desc': {
					'en': 'defines the color',
					'fr': 'définit la couleur',
				},
			}, {
				'name': 'title',
				'defaultValue': 'undefined',
				'type': 'string',
				'required': false,
				'desc': {
					'en': 'Title of the alert',
					'fr': 'Titre de l\'alert',
				},
			}],
			publicInstance: [{
				'name': '_el',
				'type': '() => HTMLElement | undefined',
			}],
		},
	],
	[
		'Aside',
		{
			localTypes: { 'AsideEmit': '{\n\t(e: \'enter-start\'): void,\n\t(e: \'enter-end\'): void,\n\t(e: \'leave-start\'): void,\n\t(e: \'leave-end\'): void,\n}' },
			events: [{
				'name': 'enter-start',
				'payload': 'undefined',
				'optional': false,
				'desc': {
					'en': 'the aside begins its enter transition',
					'fr': 'l\'aside commence son animation d\'arrivée',
				},
			}, {
				'name': 'enter-end',
				'payload': 'undefined',
				'optional': false,
				'desc': {
					'en': 'the aside ends its enter transition',
					'fr': 'l\'aside a fini son animation d\'arrivée',
				},
			}, {
				'name': 'leave-start',
				'payload': 'undefined',
				'optional': false,
				'desc': {
					'en': 'the aside begins its leave transition',
					'fr': 'l\'aside commence sa transition de départ',
				},
			}, {
				'name': 'leave-end',
				'payload': 'undefined',
				'optional': false,
				'desc': {
					'en': 'the aside ends its leave transition',
					'fr': 'l\'aside a fini sa transition de départ',
				},
			}],
			provide: [{
				'name': '_aside',
				'data': 'publicInstance',
			}],
			slots: [{
				'name': 'poster',
				'desc': {
					'en': 'useful to display a poster image on aside\'s top',
					'fr': 'utile pour afficher une image de couverture en haut de l\'aside',
				},
				'bindings': [],
			}, {
				'name': 'header',
				'desc': {
					'en': 'the header of the aside',
					'fr': 'en-tête de l\'aside',
				},
				'bindings': [],
			}, {
				'name': 'actions',
				'desc': {
					'en': 'content at the top left of the aside (useful for action\'s buttons)',
					'fr': 'contenu situé en haut à gauche de l\'aside (utile pour des boutons d\'actions)',
				},
				'bindings': [{
					'bind': 'close',
					'type': '() => void',
					'desc': {
						'en': 'to close the aside',
						'fr': 'fonction pour fermer l\'aside',
					},
				}],
			}, {
				'name': 'footer',
				'desc': {
					'en': 'the footer of the aside',
					'fr': 'pied de page de l\'aside',
				},
				'bindings': [{
					'bind': 'close',
					'type': 'function',
					'desc': {
						'en': 'to close the aside',
						'fr': 'fonction pour fermer l\'aside',
					},
				}],
			}, {
				'name': 'default',
				'desc': {
					'en': 'the content of the aside',
					'fr': 'contenu de l\'aside',
				},
				'bindings': [{
					'bind': 'close',
					'type': '() => void',
					'desc': {
						'en': 'to close the aside',
						'fr': 'fonction pour fermer l\'aside',
					},
				}],
			}],
			props: [{
				'name': 'display',
				'defaultValue': false,
				'type': 'boolean',
				'required': false,
				'desc': {
					'en': 'if set, displays the component',
					'fr': 'Missing @doc',
				},
			}, {
				'name': 'options',
				'defaultValue': '() => {}',
				'type': 'Partial<Orion.Aside.Options>',
				'required': false,
				'desc': {
					'en': 'options of the aside',
					'fr': 'options de l\'aside',
				},
			}],
			publicInstance: [{
				'name': 'slotPoster',
				'type': 'string',
			}, {
				'name': 'slotFooter',
				'type': 'string',
			}, {
				'name': 'slotActions',
				'type': 'string',
			}, {
				'name': 'slotHeader',
				'type': 'string',
			}, {
				'name': '_loader',
				'type': '() => OrionLoader',
			}, {
				'name': 'uid',
				'type': 'number',
			}, {
				'name': 'bus',
				'type': 'Bus',
			}, {
				'name': 'state',
				'type': '{\n\tisClosing: boolean;\n\tisOpening: boolean;\n\tisMounted: boolean;\n\tvisible: boolean;\n}',
			}, {
				'name': 'options',
				'type': 'Orion.Popable.Options',
			}, {
				'name': 'open',
				'type': '(keepInQueue?: boolean) => Promise<void>',
			}, {
				'name': 'close',
				'type': '(options?: Orion.Popable.CloseOptions | undefined) => Promise<void>',
			}, {
				'name': 'trigger',
				'type': '(eventName: string, params?: any) => void',
			}, {
				'name': 'animateAsync',
				'type': '(enter: boolean) => Promise<void>',
			}, {
				'name': 'removeProgrammatic',
				'type': '() => void',
			}, {
				'name': 'isLastOpenedPopable',
				'type': '() => boolean',
			}, {
				'name': '_el',
				'type': '() => HTMLElement | undefined',
			}],
		},
	],
	[
		'Avatar',
		{
			localTypes: {},
			events: [],
			provide: [],
			slots: [],
			props: [{
				'name': 'avatar',
				'defaultValue': 'undefined',
				'type': '{id: number} | number | string',
				'required': false,
				'desc': {
					'en': 'the url of the image or an id (combined with root-url prop). More info in [Edges cases](#edge-cases) section.',
					'fr': 'url de l\'image ou id (combiné avec la prop `root-url`). Plus d\'infos dans la section [Cas complexes](#cas-complexes).',
				},
			}, {
				'name': 'color',
				'defaultValue': '\'brand\'',
				'type': 'Orion.Color',
				'required': false,
				'sharedDefaultValue': '\'default\'',
				'desc': {
					'en': 'defines the color',
					'fr': 'définit la couleur',
				},
			}, {
				'name': 'contain',
				'defaultValue': false,
				'type': 'boolean',
				'required': false,
				'desc': {
					'en': 'adapts the size of the image to fit into the container',
					'fr': 'adapte la taille de l\'image pour s\'adapter à son conteneur',
				},
			}, {
				'name': 'name',
				'defaultValue': '\'\'',
				'type': 'string',
				'required': false,
				'desc': {
					'en': 'displays first letter of the name if there is no image',
					'fr': 'affiche la première lettre de la prop `name` s\'il n\'y a pas d\'image',
				},
			}, {
				'name': 'nbAvatarUpdates',
				'defaultValue': '0',
				'type': 'number',
				'required': false,
				'desc': {
					'en': 'number to increment on each update to refresh the image',
					'fr': 'nombre à incrémenter à chaque mise à jour de l\'image pour la rafraîchir',
				},
			}, {
				'name': 'rootUrl',
				'defaultValue': '\'/avatar/\'',
				'type': 'string',
				'required': false,
				'desc': {
					'en': 'the root url when the `avatar` prop is a number or JSON object',
					'fr': 'url de l\'avatar si la prop `avatar` est un nombre ou un objet JSON',
				},
			}, {
				'name': 'size',
				'defaultValue': '\'md\'',
				'type': 'number | Orion.Size',
				'required': false,
				'desc': {
					'en': 'the size of the avatar',
					'fr': 'taille de l\'avatar',
				},
			}, {
				'name': 'square',
				'defaultValue': false,
				'type': 'boolean',
				'required': false,
				'desc': {
					'en': 'defines if the avatar is square-shaped (circle otherwise)',
					'fr': 'Définit la forme de l\'avatar (ronde par défaut)',
				},
			}, {
				'name': 'tooltip',
				'defaultValue': 'undefined',
				'type': 'string',
				'required': false,
				'desc': {
					'en': 'the tooltip text displayed to update the avatar',
					'fr': 'le texte qui sera affiché dans la tooltip au survol de l\'icône de modification',
				},
			}, {
				'name': 'updateFunction',
				'defaultValue': 'undefined',
				'type': 'Function',
				'required': false,
				'desc': {
					'en': 'function to call to update the avatar',
					'fr': 'fonction à appeler pour modifier l\'avatar',
				},
			}],
			publicInstance: [{
				'name': '_el',
				'type': '() => HTMLElement | undefined',
			}],
		},
	],
	[
		'Button',
		{
			localTypes: {},
			events: [{
				'name': 'click',
				'payload': 'undefined',
				'optional': false,
				'desc': {
					'en': 'emitted on button click',
					'fr': 'émis lors du click sur le bouton',
				},
			}],
			provide: [],
			slots: [{
				'name': 'default',
				'desc': {
					'en': 'the content of the button',
					'fr': 'contenu du bouton',
				},
				'bindings': [],
			}],
			props: [{
				'name': 'autofocus',
				'defaultValue': false,
				'type': 'boolean',
				'required': false,
				'desc': {
					'en': 'if set, focus the button',
					'fr': 'si défini, le focus sera placé sur le bouton',
				},
			}, {
				'name': 'block',
				'defaultValue': false,
				'type': 'boolean',
				'required': false,
				'desc': {
					'en': 'defines the button\'s width to 100%',
					'fr': 'définie la largeur du bouton à 100%',
				},
			}, {
				'name': 'color',
				'defaultValue': '\'default\'',
				'type': 'Orion.Color',
				'required': false,
				'sharedDefaultValue': '\'default\'',
				'desc': {
					'en': 'defines the color',
					'fr': 'définit la couleur',
				},
			}, {
				'name': 'disabled',
				'defaultValue': false,
				'type': 'boolean',
				'required': false,
				'desc': {
					'en': 'determines if the button is disabled',
					'fr': 'désactive le bouton',
				},
			}, {
				'name': 'loading',
				'defaultValue': false,
				'type': 'boolean',
				'required': false,
				'desc': {
					'en': 'adds a loading icon and disables the button',
					'fr': 'ajoute une icône de chargement et désactive le bouton',
				},
			}, {
				'name': 'nude',
				'defaultValue': false,
				'type': 'boolean',
				'required': false,
				'desc': {
					'en': 'removes the background color',
					'fr': 'masque la couleur en arrière plan',
				},
			}, {
				'name': 'outline',
				'defaultValue': false,
				'type': 'boolean',
				'required': false,
				'desc': {
					'en': 'adds an outline on the button',
					'fr': 'ajoute un contraste sur le bouton',
				},
			}, {
				'name': 'prefixFontIcon',
				'type': 'string',
				'required': false,
				'desc': {
					'en': 'the prefix icon from the imported font library',
					'fr': 'définit l\'icône de préfixe à partir de la librairie de police importée',
				},
			}, {
				'name': 'prefixIcon',
				'type': 'Orion.Icon',
				'required': false,
				'desc': {
					'en': 'the prefix icon',
					'fr': 'définit l\'icône de préfixe',
				},
			}, {
				'name': 'size',
				'defaultValue': '\'md\'',
				'type': 'Orion.Size',
				'required': false,
				'sharedDefaultValue': '\'md\'',
				'desc': {
					'en': 'define the size',
					'fr': 'définit la taille',
				},
			}, {
				'name': 'suffixFontIcon',
				'type': 'string',
				'required': false,
				'desc': {
					'en': 'the suffix icon from the imported font library',
					'fr': 'Missing @doc',
				},
			}, {
				'name': 'suffixIcon',
				'type': 'Orion.Icon',
				'required': false,
				'desc': {
					'en': 'the suffix icon',
					'fr': 'définit l\'icône de suffixe',
				},
			}],
			publicInstance: [{
				'name': '_el',
				'type': '() => HTMLElement | undefined',
			}],
		},
	],
	[
		'Card',
		{
			localTypes: {},
			events: [{
				'name': 'header-click',
				'payload': 'undefined',
				'optional': false,
				'desc': {
					'en': 'emitted on header click',
					'fr': 'émis lors du click sur l\'en-tête',
				},
			}, {
				'name': 'body-click',
				'payload': 'undefined',
				'optional': false,
				'desc': {
					'en': 'emitted on body click',
					'fr': 'émis lors du click sur le body de la carte',
				},
			}],
			provide: [],
			slots: [{
				'name': 'poster',
				'desc': {
					'en': 'adds a poster at the top of the card, without any padding',
					'fr': 'ajoute un poster en haut de la carte, sans aucun padding',
				},
				'bindings': [],
			}, {
				'name': 'header',
				'desc': {
					'en': 'the header of the card',
					'fr': 'en-tête de la carte',
				},
				'bindings': [],
			}, {
				'name': 'default',
				'desc': {
					'en': 'the content of the card',
					'fr': 'contenu de la carte',
				},
				'bindings': [],
			}, {
				'name': 'actions',
				'desc': {
					'en': 'actions of the card, on the footer of the card',
					'fr': 'actions au bas de la carte',
				},
				'bindings': [],
			}],
			props: [{
				'name': 'actionsLine',
				'defaultValue': 'false',
				'type': 'boolean',
				'required': false,
				'desc': {
					'en': 'displays a line between the body and the actions of the card',
					'fr': 'affiche une line de sépération entre les slots `default` et `actions` de la carte',
				},
			}, {
				'name': 'gradient',
				'defaultValue': 'undefined',
				'type': 'string',
				'required': false,
				'desc': {
					'en': 'adds a gradient in the backgroung of the card',
					'fr': 'ajoute un dégradé sur l\'arrière plan de la carte',
				},
			}, {
				'name': 'headerLine',
				'defaultValue': 'false',
				'type': 'boolean',
				'required': false,
				'desc': {
					'en': 'displays a line between the header and the body of the card',
					'fr': 'affiche une line de sépération entre les slots `header` et `default` de la carte',
				},
			}, {
				'name': 'hoverElevation',
				'defaultValue': '1',
				'type': 'number',
				'required': false,
				'desc': {
					'en': 'elevation level on mouse hover',
					'fr': 'niveau d\'élévation au survol de la souris',
				},
			}, {
				'name': 'selected',
				'defaultValue': 'false',
				'type': 'boolean',
				'required': false,
				'desc': {
					'en': 'adds a selected style on the card',
					'fr': 'ajoute le style `selected` sur la carte',
				},
			}, {
				'name': 'selectedColor',
				'defaultValue': '\'info\'',
				'type': 'Orion.Color',
				'required': false,
				'desc': {
					'en': 'changes the color of the selected style',
					'fr': 'définit la couleur du style `selected`',
				},
			}, {
				'name': 'size',
				'defaultValue': '\'md\'',
				'type': 'Orion.Size',
				'required': false,
				'sharedDefaultValue': '\'md\'',
				'desc': {
					'en': 'define the size',
					'fr': 'définit la taille',
				},
			}, {
				'name': 'title',
				'defaultValue': 'undefined',
				'type': 'string',
				'required': false,
				'desc': {
					'en': 'the title of the card',
					'fr': 'titre de la carte',
				},
			}],
			publicInstance: [{
				'name': '_el',
				'type': '() => HTMLElement | undefined',
			}],
		},
	],
	[
		'Carousel',
		{
			localTypes: { 'Emits': '{(e: \'update:modelValue\', val?: number | string): void}' },
			events: [{
				'name': 'update:modelValue',
				'payload': 'number | string',
				'optional': true,
				'desc': {
					'en': 'Missing @doc',
					'fr': 'Missing @doc',
				},
			}],
			provide: [{
				'name': '_carousel',
				'data': 'publicInstance',
			}],
			slots: [{
				'name': 'poster',
				'desc': {
					'en': 'fixed placeholder no matter what slide is active',
					'fr': 'emplacement fixe peu importe le slide actif',
				},
				'bindings': [{
					'bind': 'step',
					'type': 'number | string | undefined',
					'desc': {
						'en': 'active step',
						'fr': 'l\'élément actif',
					},
				}, {
					'bind': 'stepIndex',
					'type': 'number',
					'desc': {
						'en': 'active step index',
						'fr': 'l\'index de l\'élément actif',
					},
				}],
			}, {
				'name': 'default',
				'desc': {
					'en': 'the content of the carousel (use o-carousel-item component)',
					'fr': 'contenu du carousel (utilisez le composant o-carousel-item)',
				},
				'bindings': [{
					'bind': 'step',
					'type': 'number | string | undefined',
					'desc': {
						'en': 'active step',
						'fr': 'l\'élément actif',
					},
				}, {
					'bind': 'stepIndex',
					'type': 'number',
					'desc': {
						'en': 'active step index',
						'fr': 'l\'index de l\'élément actif',
					},
				}, {
					'bind': 'goPreviousStep',
					'type': '() => void',
					'desc': {
						'en': 'function to display previous step',
						'fr': 'fonction pour afficher l\'élément précédent',
					},
				}, {
					'bind': 'goNextStep',
					'type': '() => void',
					'desc': {
						'en': 'function to display next step',
						'fr': 'fonction pour afficher l\'élément suivant',
					},
				}],
			}, {
				'name': 'navigation',
				'desc': {
					'en': 'the content of the carousel (use o-carousel-item component)',
					'fr': 'contenu du carousel (utilisez le composant o-carousel-item)',
				},
				'bindings': [{
					'bind': 'step',
					'type': 'number | string | undefined',
					'desc': {
						'en': 'active step',
						'fr': 'l\'élément actif',
					},
				}, {
					'bind': 'stepIndex',
					'type': 'number',
					'desc': {
						'en': 'active step index',
						'fr': 'l\'index de l\'élément actif',
					},
				}, {
					'bind': 'goPreviousStep',
					'type': '() => void',
					'desc': {
						'en': 'function to display previous step',
						'fr': 'fonction pour afficher l\'élément précédent',
					},
				}, {
					'bind': 'goNextStep',
					'type': '() => void',
					'desc': {
						'en': 'function to display next step',
						'fr': 'fonction pour afficher l\'élément suivant',
					},
				}],
			}, {
				'name': 'actions',
				'desc': {
					'en': 'display additional actions for the carousel',
					'fr': 'affiche des actions supplémentaires pour le carrousel',
				},
				'bindings': [{
					'bind': 'step',
					'type': 'number | string | undefined',
					'desc': {
						'en': 'active step',
						'fr': 'l\'élément actif',
					},
				}, {
					'bind': 'stepIndex',
					'type': 'number',
					'desc': {
						'en': 'active step index',
						'fr': 'l\'index de l\'élément actif',
					},
				}, {
					'bind': 'goPreviousStep',
					'type': '() => void',
					'desc': {
						'en': 'function to display previous step',
						'fr': 'fonction pour afficher l\'élément précédent',
					},
				}, {
					'bind': 'goNextStep',
					'type': '() => void',
					'desc': {
						'en': 'function to display next step',
						'fr': 'fonction pour afficher l\'élément suivant',
					},
				}, {
					'bind': 'goToStep',
					'type': '(step: { name: number | string }) => void',
					'desc': {
						'en': 'function to activate specific step',
						'fr': 'fonction pour afficher un élément spécifique',
					},
				}, {
					'bind': 'goToStepIndex',
					'type': '(index: number) => void',
					'desc': {
						'en': 'function to display step at specific index',
						'fr': 'fonction pour afficher un élément à l\'index spécifié',
					},
				}],
			}],
			props: [{
				'name': 'color',
				'defaultValue': '\'brand\'',
				'type': 'Orion.Color | Orion.ColorAlt',
				'required': false,
				'desc': {
					'en': 'color of the dots at the carousel\'s bottom',
					'fr': 'couleur des points au bas du carrousel',
				},
			}, {
				'name': 'hideNavigationButtons',
				'defaultValue': false,
				'type': 'boolean',
				'required': false,
				'desc': {
					'en': 'hide the navigation buttons around the dots',
					'fr': 'masque les boutons de navigation autour des points',
				},
			}, {
				'name': 'hideNavigationDots',
				'defaultValue': false,
				'type': 'boolean',
				'required': false,
				'desc': {
					'en': 'hide the navigation dots',
					'fr': 'masque les points de navigation',
				},
			}, {
				'name': 'loop',
				'defaultValue': false,
				'type': 'boolean',
				'required': false,
				'desc': {
					'en': 'enable the "loop" mode',
					'fr': 'active le mode "en boucle"',
				},
			}, {
				'name': 'modelValue',
				'defaultValue': 'undefined',
				'type': 'number | string',
				'required': false,
				'desc': {
					'en': 'refers to the active step\'s **name** prop',
					'fr': 'correspond à la prop **name** de l\'élément actif',
				},
			}, {
				'name': 'pauseOnHover',
				'defaultValue': false,
				'type': 'boolean',
				'required': false,
				'desc': {
					'en': 'pause timer when hovering the carousel',
					'fr': 'met au pause le minuteur lors du survol du carrousel',
				},
			}, {
				'name': 'stepTimer',
				'defaultValue': 'undefined',
				'type': 'number',
				'required': false,
				'desc': {
					'en': 'apply a timer to automatically switch to the next item',
					'fr': 'applique un minuteur pour passer automatiquement à l\'élément suivant',
				},
			}],
			publicInstance: [{
				'name': 'step',
				'type': '() => string | number | undefined',
			}, {
				'name': 'stepsLength',
				'type': '() => number',
			}, {
				'name': 'stepIndex',
				'type': '() => number',
			}, {
				'name': 'shouldLoop',
				'type': '() => boolean',
			}, {
				'name': 'goToStep',
				'type': '(step: {\n\tname: string | number;\n\tuid: number;\n}) => void',
			}, {
				'name': 'goToStepIndex',
				'type': '(index: number) => void',
			}, {
				'name': 'goPreviousStep',
				'type': '() => void',
			}, {
				'name': 'goNextStep',
				'type': '() => void',
			}, {
				'name': '_el',
				'type': '() => HTMLElement | undefined',
			}],
		},
	],
	[
		'CarouselItem',
		{
			localTypes: {},
			events: [],
			provide: [],
			slots: [{
				'name': 'default',
				'desc': {
					'en': 'the content of the item',
					'fr': 'contenu de l\'élément',
				},
				'bindings': [{
					'bind': 'isActive',
					'type': 'boolean',
					'desc': {
						'en': 'item is active',
						'fr': 'l\'élément est actif',
					},
				}],
			}],
			props: [{
				'name': 'lazy',
				'defaultValue': false,
				'type': 'boolean',
				'required': false,
				'desc': {
					'en': 'the content of the item is mounted each time the item becomes active',
					'fr': 'le contenu de l\'élément est monté à chaque fois qu\'il devient actif',
				},
			}, {
				'name': 'lazyOnce',
				'defaultValue': false,
				'type': 'boolean',
				'required': false,
				'desc': {
					'en': 'the content of the item is only mounted once, the first time the item is active',
					'fr': 'le contenu de l\'élément est uniquement monté une fois, la première fois qu\'il est actif',
				},
			}, {
				'name': 'name',
				'type': 'number | string',
				'required': true,
				'desc': {
					'en': 'step identifier',
					'fr': 'identifiant de l\'élément',
				},
			}],
			publicInstance: [{
				'name': '_el',
				'type': '() => HTMLElement | undefined',
			}],
		},
	],
	[
		'Chat',
		{
			localTypes: { 'ChatEmit': '{ (e: \'new-message\', payload: Orion.Chat.NewMessage): void; }' },
			events: [{
				'name': 'new-message',
				'payload': 'Orion.Chat.NewMessage',
				'optional': false,
				'desc': {
					'en': 'emitted when a new message is sent',
					'fr': 'émis lorsqu\'un nouveau message est envoyé',
				},
			}],
			provide: [],
			slots: [{
				'name': 'discussion-title',
				'desc': {
					'en': 'title of the discussion',
					'fr': 'titre de la discussion',
				},
				'bindings': [{
					'bind': 'discussion',
					'type': 'OrionChatEntity',
					'desc': {
						'en': 'Instance of the discussion entity',
						'fr': 'Instance de l\'entité `discussion`',
					},
				}],
			}, {
				'name': 'prepend-discussion-actions',
				'desc': {
					'en': 'left part of the action\'s content',
					'fr': 'partie située avant les actions',
				},
				'bindings': [{
					'bind': 'discussion',
					'type': 'OrionChatEntity',
					'desc': {
						'en': 'Instance of the discussion entity',
						'fr': 'Instance de l\'entité `discussion`',
					},
				}, {
					'bind': 'showSearch',
					'type': 'boolean',
					'desc': {
						'en': '`true` if the search field is displayed',
						'fr': '`true` si le champ de recherche est affiché',
					},
				}],
			}, {
				'name': 'append-discussion-actions',
				'desc': {
					'en': 'right part of the action\'s content',
					'fr': 'partie située à droite des actions',
				},
				'bindings': [{
					'bind': 'discussion',
					'type': 'OrionChatEntity',
					'desc': {
						'en': 'Instance of the discussion entity',
						'fr': 'Instance de l\'entité `discussion`',
					},
				}],
			}],
			props: [{
				'name': 'chat',
				'type': 'ChatService',
				'required': true,
				'desc': {
					'en': 'instance of the chat service',
					'fr': 'instance du service `chat`',
				},
			}, {
				'name': 'discussionId',
				'type': 'number',
				'required': true,
				'desc': {
					'en': 'id of the discussion',
					'fr': 'id de la discussion',
				},
			}, {
				'name': 'focusOnOpen',
				'defaultValue': false,
				'type': 'boolean',
				'required': false,
				'desc': {
					'en': 'focused the input field chat the chat opens',
					'fr': 'place le focus sur la zone de texte quand le chat s\'ouvre',
				},
			}, {
				'name': 'hideSearch',
				'defaultValue': false,
				'type': 'boolean',
				'required': false,
				'desc': {
					'en': 'hides the research field on the top of the chat',
					'fr': 'masque le champ de recherche en haut du chat',
				},
			}],
			publicInstance: [{
				'name': 'checkUnreadMessagesInDom',
				'type': '() => Promise<void>',
			}, {
				'name': 'getDiscussionId',
				'type': '() => number | undefined',
			}, {
				'name': '_el',
				'type': '() => HTMLElement | undefined',
			}],
		},
	],
	[
		'ChatDiscussionList',
		{
			localTypes: { 'Emits': '{\n\t(e: \'new-discussion\'): void;\n\t(e: \'select-discussion\', payload: number): void;\n}' },
			events: [{
				'name': 'new-discussion',
				'payload': 'undefined',
				'optional': false,
				'desc': {
					'en': 'emitted when a new discussion is created',
					'fr': 'émis lorsqu\'une nouvelle discussion est créée',
				},
			}, {
				'name': 'select-discussion',
				'payload': 'number',
				'optional': false,
				'desc': {
					'en': 'emitted when a discussion is selected',
					'fr': 'émis quand une discussion est séléctionnée',
				},
			}],
			provide: [],
			slots: [{
				'name': 'append-discussion-list-header',
				'desc': {
					'en': 'the bottom content of the list header',
					'fr': 'contenu situé en bas de l\'en-tête de la liste',
				},
				'bindings': [],
			}, {
				'name': 'before-discussion-list',
				'desc': {
					'en': 'the content before all the discussion items',
					'fr': 'contenu placé juste avant la liste de discussions',
				},
				'bindings': [],
			}, {
				'name': 'discussion-item',
				'desc': {
					'en': 'the content of the discussion item',
					'fr': 'contenu d\'un élément de la liste',
				},
				'bindings': [{
					'bind': 'discussion',
					'type': 'OrionChatEntity',
					'desc': {
						'en': 'the discussion\'s instance',
						'fr': 'l\'instance de la discussion',
					},
				}],
			}, {
				'name': 'append-discussion-item',
				'desc': {
					'en': 'the content under the discussion item',
					'fr': 'contenu situé juste après un élément de la liste',
				},
				'bindings': [],
			}],
			props: [{
				'name': 'chat',
				'type': 'ChatService',
				'required': true,
				'desc': {
					'en': 'instance of the chat service',
					'fr': 'instance du service `chat`',
				},
			}],
			publicInstance: [{
				'name': '_el',
				'type': '() => HTMLElement | undefined',
			}],
		},
	],
	[
		'ChatMessage',
		{
			localTypes: {},
			events: [],
			provide: [],
			slots: [],
			props: [{
				'name': 'chat',
				'type': 'ChatService',
				'required': true,
				'desc': {
					'en': 'instance of the chat',
					'fr': 'instance du service `chat`',
				},
			}, {
				'name': 'discussion',
				'type': 'OrionChatEntity',
				'required': true,
				'desc': {
					'en': 'the discussion related to the message',
					'fr': 'discussion relative au message',
				},
			}, {
				'name': 'message',
				'type': 'OrionChatMessageEntity',
				'required': true,
				'desc': {
					'en': 'message object',
					'fr': 'Objet représentant le message',
				},
			}],
			publicInstance: [{
				'name': '_el',
				'type': '() => HTMLElement | undefined',
			}],
		},
	],
	[
		'Checkbox',
		{
			localTypes: {
				'VModelType': 'any[] | boolean | null | undefined',
				'FieldEmit': '{\n  (e: \'focus\', payload: FocusEvent): void;\n  (e: \'blur\', payload?: FocusEvent): void;\n  (e: \'input\', payload: VModelType): void;\n  (e: \'change\', val?: VModelType): void;\n  (e: \'update:modelValue\', payload: VModelType): void;\n  (e: \'clear\'): void;\n}',
			},
			events: [{
				'name': 'focus',
				'payload': 'FocusEvent',
				'optional': false,
				'desc': {
					'en': 'emitted on checkbox focus',
					'fr': 'émis lors du focus',
				},
			}, {
				'name': 'blur',
				'payload': 'FocusEvent',
				'optional': true,
				'desc': {
					'en': 'emitted when the focus leaves the checkbox',
					'fr': 'émis quand le focus quitte la case à cocher',
				},
			}, {
				'name': 'input',
				'payload': 'VModelType',
				'optional': false,
				'desc': {
					'en': 'emitted when the value of the checkbox changes',
					'fr': 'émis lorsque la valeur est modifiée',
				},
			}, {
				'name': 'change',
				'payload': 'VModelType',
				'optional': true,
				'desc': {
					'en': 'emitted when the value of the checkbox changes',
					'fr': ' émis lorsque la valeur est modifiée',
				},
			}, {
				'name': 'update:modelValue',
				'payload': 'VModelType',
				'optional': false,
				'desc': {
					'en': 'emitted to update the checkbox value',
					'fr': 'émis pour mettre à jour la valeur',
				},
			}, {
				'name': 'clear',
				'payload': 'undefined',
				'optional': false,
				'desc': {
					'en': 'emitted when the checkbox is cleared',
					'fr': 'Missing @doc',
				},
			}],
			provide: [],
			slots: [{
				'name': 'default',
				'desc': {
					'en': 'content of the checkbox to replace the default label.',
					'fr': 'Missing @doc',
				},
				'bindings': [],
			}],
			props: [{
				'name': 'autofocus',
				'defaultValue': false,
				'type': 'boolean',
				'required': false,
				'desc': {
					'en': 'autofocus the field when mounted.',
					'fr': 'focus automatiquement le champ lorsqu\'il est monté.',
				},
			}, {
				'name': 'clearable',
				'defaultValue': false,
				'type': 'boolean',
				'required': false,
				'desc': {
					'en': 'defines if the field can be cleared.',
					'fr': 'définit si le champ peut être vidé.',
				},
			}, {
				'name': 'clearToNull',
				'defaultValue': false,
				'type': 'boolean',
				'required': false,
				'desc': {
					'en': 'sets the value to null when the field is cleared',
					'fr': 'lorsque que le champ est vidé, sa valeur vaut `null`',
				},
			}, {
				'name': 'color',
				'defaultValue': '\'default\'',
				'type': 'Orion.Color',
				'required': false,
				'sharedDefaultValue': '\'default\'',
				'desc': {
					'en': 'defines the color',
					'fr': 'définit la couleur',
				},
			}, {
				'name': 'disabled',
				'defaultValue': false,
				'type': 'boolean',
				'required': false,
				'desc': {
					'en': 'disables the field',
					'fr': 'désactive le champ',
				},
			}, {
				'name': 'donetyping',
				'defaultValue': '0',
				'type': 'number',
				'required': false,
				'desc': {
					'en': 'define the debounce duration before updating the value (useful for search field)',
					'fr': 'défini la durée du debounce avant de mettre à jour la valeur (utile pour les champs de recherche)',
				},
			}, {
				'name': 'forceLabelFloating',
				'defaultValue': false,
				'type': 'boolean',
				'required': false,
				'desc': {
					'en': 'allows floating label',
					'fr': 'permet au label de se placer au dessus du champ lorsqu\'il possède une valeur',
				},
			}, {
				'name': 'iconCheck',
				'defaultValue': 'undefined',
				'type': 'Orion.Icon',
				'required': false,
				'desc': {
					'en': 'the icon when the checkbox is checked',
					'fr': 'l\'icône lorsque la case est cochée',
				},
			}, {
				'name': 'inheritValidationState',
				'defaultValue': 'undefined',
				'type': 'boolean',
				'required': false,
				'desc': {
					'en': 'defines if the validation comes from its parent',
					'fr': 'définit si la validation provient du parent',
				},
			}, {
				'name': 'inline',
				'defaultValue': false,
				'type': 'boolean',
				'required': false,
				'desc': {
					'en': 'set the property `display` on `inline-flex` instead of `flex`',
					'fr': 'défini la propriété `display` à `inline-flex` à la place `flex`',
				},
			}, {
				'name': 'inputValue',
				'defaultValue': 'undefined',
				'type': 'string | boolean | number | Object | any[] | Date | undefined',
				'required': false,
				'desc': {
					'en': 'the value of the checkbox',
					'fr': 'valeur de la case à cocher',
				},
			}, {
				'name': 'label',
				'defaultValue': 'undefined',
				'type': 'string',
				'required': false,
				'desc': {
					'en': 'label of the field',
					'fr': 'le label du champ',
				},
			}, {
				'name': 'modelValue',
				'type': 'T',
				'required': false,
				'desc': {
					'en': 'modelValue of the component',
					'fr': 'modelValue du composant',
				},
			}, {
				'name': 'multiple',
				'defaultValue': false,
				'type': 'boolean',
				'required': false,
				'desc': {
					'en': 'allows to select multiples checkbox values, related to v-model array',
					'fr': 'permet de selectionner plusieurs cases à cocher, dans le cas où le v-model est un tableau',
				},
			}, {
				'name': 'prefixFontIcon',
				'type': 'string',
				'required': false,
				'desc': {
					'en': 'the prefix icon from the imported font library',
					'fr': 'définit l\'icône de préfixe à partir de la librairie de police importée',
				},
			}, {
				'name': 'prefixIcon',
				'type': 'Orion.Icon',
				'required': false,
				'desc': {
					'en': 'the prefix icon',
					'fr': 'définit l\'icône de préfixe',
				},
			}, {
				'name': 'readonly',
				'defaultValue': false,
				'type': 'boolean',
				'required': false,
				'desc': {
					'en': 'sets the field to read-only mode',
					'fr': 'définit le champ comme étant en lecture seule',
				},
			}, {
				'name': 'required',
				'defaultValue': false,
				'type': 'boolean',
				'required': false,
				'desc': {
					'en': 'sets the field required',
					'fr': 'indique que le champ est obligatoire',
				},
			}, {
				'name': 'reverse',
				'defaultValue': false,
				'type': 'boolean',
				'required': false,
				'desc': {
					'en': 'displays the label first',
					'fr': 'affiche d\'abord le label puis la case à cocher',
				},
			}, {
				'name': 'selectOnFocus',
				'defaultValue': false,
				'type': 'boolean',
				'required': false,
				'desc': {
					'en': 'select the field content when focused.',
					'fr': 'sélectionne le contenu du champ lorsqu\'il est focus.',
				},
			}, {
				'name': 'size',
				'defaultValue': '\'md\'',
				'type': 'Orion.Size',
				'required': false,
				'sharedDefaultValue': '\'md\'',
				'desc': {
					'en': 'define the size',
					'fr': 'définit la taille',
				},
			}, {
				'name': 'suffixFontIcon',
				'type': 'string',
				'required': false,
				'desc': {
					'en': 'the suffix icon from the imported font library',
					'fr': 'Missing @doc',
				},
			}, {
				'name': 'suffixIcon',
				'type': 'Orion.Icon',
				'required': false,
				'desc': {
					'en': 'the suffix icon',
					'fr': 'définit l\'icône de suffixe',
				},
			}, {
				'name': 'type',
				'defaultValue': '\'checkbox\'',
				'type': 'string',
				'required': false,
				'desc': {
					'en': 'the type of the input',
					'fr': 'type du champ',
				},
			}, {
				'name': 'validation',
				'defaultValue': 'undefined',
				'type': 'string | ((val: any) => boolean) | Orion.Validator.Rule | Orion.Validation.Rule | boolean',
				'required': false,
				'desc': {
					'en': 'the validation for the field',
					'fr': 'la validation du champ',
				},
			}, {
				'name': 'validationErrorMessage',
				'defaultValue': 'undefined',
				'type': 'string',
				'required': false,
				'desc': {
					'en': 'the error message displayed after input\'s validation.',
					'fr': 'le message d\'erreur affiché en cas d\'erreur lors de la validation',
				},
			}],
			publicInstance: [{
				'name': 'hasBeenFocus',
				'type': '() => boolean',
			}, {
				'name': 'isFocus',
				'type': '() => boolean',
			}, {
				'name': 'focus',
				'type': '() => void',
			}, {
				'name': 'blur',
				'type': 'Lodash.debounce',
			}, {
				'name': 'clear',
				'type': '() => void',
			}, {
				'name': 'setHasBeenFocus',
				'type': '(value: boolean) => void',
			}, {
				'name': 'isValid',
				'type': '() => boolean',
			}, {
				'name': '_el',
				'type': '() => HTMLElement | undefined',
			}],
		},
	],
	[
		'Chips',
		{
			localTypes: {},
			events: [{
				'name': 'close',
				'payload': 'undefined',
				'optional': false,
				'desc': {
					'en': 'Emitted when closing the chips',
					'fr': 'Émis lors de la fermeture de la chips',
				},
			}],
			provide: [],
			slots: [{
				'name': 'default',
				'desc': {
					'en': 'The content of the chips',
					'fr': 'Contenu de la chips',
				},
				'bindings': [],
			}, {
				'name': 'dual',
				'desc': {
					'en': 'The content of the second half of the chips',
					'fr': 'Contenu de la seconde partie de la chips',
				},
				'bindings': [],
			}],
			props: [{
				'name': 'close',
				'defaultValue': false,
				'type': 'boolean',
				'required': false,
				'desc': {
					'en': 'Defines if the chips can be closed',
					'fr': 'définit si le chips peut être fermée',
				},
			}, {
				'name': 'color',
				'defaultValue': '\'default\'',
				'type': 'Orion.ColorExtendedAndGreys',
				'required': false,
				'sharedDefaultValue': '\'default\'',
				'desc': {
					'en': 'defines the color',
					'fr': 'définit la couleur',
				},
			}, {
				'name': 'outline',
				'defaultValue': false,
				'type': 'boolean',
				'required': false,
				'desc': {
					'en': 'Adds an outline style on the chips',
					'fr': 'modifie le style en ajoutant un contraste',
				},
			}, {
				'name': 'size',
				'defaultValue': '\'md\'',
				'type': 'Orion.Size',
				'required': false,
				'sharedDefaultValue': '\'md\'',
				'desc': {
					'en': 'define the size',
					'fr': 'définit la taille',
				},
			}],
			publicInstance: [{
				'name': '_el',
				'type': '() => HTMLElement | undefined',
			}],
		},
	],
	[
		'ColorPicker',
		{
			localTypes: {
				'ColorValue': '{\n  rgba: {\n    r: number;\n    g: number;\n    b: number;\n    a: number;\n  };\n  hsv: {\n    h: number;\n    s: number;\n    v: number;\n  };\n  hex: string;\n}',
				'VModelType': 'Nil<string>',
				'ColorPickerEmit': '{\n  (e: \'focus\', payload: FocusEvent): void;\n  (e: \'blur\', payload?: FocusEvent): void;\n  (e: \'input\', payload: VModelType): void;\n  (e: \'change\', val?: VModelType): void;\n  (e: \'update:modelValue\', payload: VModelType): void;\n  (e: \'clear\'): void;\n\t(e: \'picked\', payload: ColorValue): void;\n}',
			},
			events: [{
				'name': 'focus',
				'payload': 'FocusEvent',
				'optional': false,
				'desc': {
					'en': 'emitted on focus',
					'fr': 'émis lors du focus',
				},
			}, {
				'name': 'blur',
				'payload': 'FocusEvent',
				'optional': true,
				'desc': {
					'en': 'emitted when the focus leaves the component',
					'fr': 'émis quand le focus quitte la case à cocher',
				},
			}, {
				'name': 'input',
				'payload': 'VModelType',
				'optional': false,
				'desc': {
					'en': 'emitted when the value changes',
					'fr': 'émis lorsque la valeur est modifiée',
				},
			}, {
				'name': 'change',
				'payload': 'VModelType',
				'optional': true,
				'desc': {
					'en': 'emitted when the value changes',
					'fr': ' émis lorsque la valeur est modifiée',
				},
			}, {
				'name': 'update:modelValue',
				'payload': 'VModelType',
				'optional': false,
				'desc': {
					'en': 'emitted to update the value',
					'fr': 'émis pour mettre à jour la valeur',
				},
			}, {
				'name': 'clear',
				'payload': 'undefined',
				'optional': false,
				'desc': {
					'en': 'emitted when the value is cleared',
					'fr': 'Missing @doc',
				},
			}, {
				'name': 'picked',
				'payload': 'ColorValue',
				'optional': false,
				'desc': {
					'en': 'emitted when a color is selected',
					'fr': 'émis quand une couleur est selectionnée',
				},
			}],
			provide: [],
			slots: [],
			props: [{
				'name': 'autofocus',
				'defaultValue': false,
				'type': 'boolean',
				'required': false,
				'desc': {
					'en': 'autofocus the field when mounted.',
					'fr': 'focus automatiquement le champ lorsqu\'il est monté.',
				},
			}, {
				'name': 'clearable',
				'defaultValue': false,
				'type': 'boolean',
				'required': false,
				'desc': {
					'en': 'defines if the field can be cleared.',
					'fr': 'définit si le champ peut être vidé.',
				},
			}, {
				'name': 'clearToNull',
				'defaultValue': false,
				'type': 'boolean',
				'required': false,
				'desc': {
					'en': 'sets the value to null when the field is cleared',
					'fr': 'lorsque que le champ est vidé, sa valeur vaut `null`',
				},
			}, {
				'name': 'debounce',
				'defaultValue': '300',
				'type': 'number',
				'required': false,
				'desc': {
					'en': 'the debounce interval',
					'fr': 'définits la durée selon laquelle la valeur va se mettre à jour',
				},
			}, {
				'name': 'disabled',
				'defaultValue': false,
				'type': 'boolean',
				'required': false,
				'desc': {
					'en': 'disables the field',
					'fr': 'désactive le champ',
				},
			}, {
				'name': 'donetyping',
				'defaultValue': '0',
				'type': 'number',
				'required': false,
				'desc': {
					'en': 'define the debounce duration before updating the value (useful for search field)',
					'fr': 'défini la durée du debounce avant de mettre à jour la valeur (utile pour les champs de recherche)',
				},
			}, {
				'name': 'forceLabelFloating',
				'defaultValue': false,
				'type': 'boolean',
				'required': false,
				'desc': {
					'en': 'allows floating label',
					'fr': 'permet au label de se placer au dessus du champ lorsqu\'il possède une valeur',
				},
			}, {
				'name': 'format',
				'defaultValue': '\'hex\'',
				'type': 'ColorFormat',
				'required': false,
				'desc': {
					'en': 'the format of the color definition',
					'fr': 'format de la couleur',
				},
			}, {
				'name': 'hideHex',
				'defaultValue': false,
				'type': 'boolean',
				'required': false,
				'desc': {
					'en': 'hides the hexadecimal value',
					'fr': 'masque la valeur hexadécimale',
				},
			}, {
				'name': 'hideRgba',
				'defaultValue': false,
				'type': 'boolean',
				'required': false,
				'desc': {
					'en': 'hides the rgba value',
					'fr': 'masque la valeur rgba',
				},
			}, {
				'name': 'inheritValidationState',
				'defaultValue': 'undefined',
				'type': 'boolean',
				'required': false,
				'desc': {
					'en': 'defines if the validation comes from its parent',
					'fr': 'définit si la validation provient du parent',
				},
			}, {
				'name': 'label',
				'defaultValue': 'undefined',
				'type': 'string',
				'required': false,
				'desc': {
					'en': 'label of the field',
					'fr': 'le label du champ',
				},
			}, {
				'name': 'modelValue',
				'type': 'T',
				'required': false,
				'desc': {
					'en': 'modelValue of the component',
					'fr': 'modelValue du composant',
				},
			}, {
				'name': 'prefixFontIcon',
				'type': 'string',
				'required': false,
				'desc': {
					'en': 'the prefix icon from the imported font library',
					'fr': 'définit l\'icône de préfixe à partir de la librairie de police importée',
				},
			}, {
				'name': 'prefixIcon',
				'type': 'Orion.Icon',
				'required': false,
				'desc': {
					'en': 'the prefix icon',
					'fr': 'définit l\'icône de préfixe',
				},
			}, {
				'name': 'readonly',
				'defaultValue': false,
				'type': 'boolean',
				'required': false,
				'desc': {
					'en': 'sets the field to read-only mode',
					'fr': 'définit le champ comme étant en lecture seule',
				},
			}, {
				'name': 'required',
				'defaultValue': false,
				'type': 'boolean',
				'required': false,
				'desc': {
					'en': 'sets the field required',
					'fr': 'indique que le champ est obligatoire',
				},
			}, {
				'name': 'selectOnFocus',
				'defaultValue': false,
				'type': 'boolean',
				'required': false,
				'desc': {
					'en': 'select the field content when focused.',
					'fr': 'sélectionne le contenu du champ lorsqu\'il est focus.',
				},
			}, {
				'name': 'size',
				'defaultValue': '\'md\'',
				'type': 'Orion.Size',
				'required': false,
				'sharedDefaultValue': '\'md\'',
				'desc': {
					'en': 'define the size',
					'fr': 'définit la taille',
				},
			}, {
				'name': 'startValue',
				'defaultValue': 'undefined',
				'type': 'string',
				'required': false,
				'desc': {
					'en': 'the default value',
					'fr': 'la valeur par défaut',
				},
			}, {
				'name': 'suffixFontIcon',
				'type': 'string',
				'required': false,
				'desc': {
					'en': 'the suffix icon from the imported font library',
					'fr': 'Missing @doc',
				},
			}, {
				'name': 'suffixIcon',
				'type': 'Orion.Icon',
				'required': false,
				'desc': {
					'en': 'the suffix icon',
					'fr': 'définit l\'icône de suffixe',
				},
			}, {
				'name': 'type',
				'defaultValue': '\'text\'',
				'type': 'string | Orion.DatepickerType',
				'required': false,
				'desc': {
					'en': 'type of the input',
					'fr': 'type of the input',
				},
			}, {
				'name': 'validation',
				'defaultValue': 'undefined',
				'type': 'string | ((val: any) => boolean) | Orion.Validator.Rule | Orion.Validation.Rule | boolean',
				'required': false,
				'desc': {
					'en': 'the validation for the field',
					'fr': 'la validation du champ',
				},
			}, {
				'name': 'validationErrorMessage',
				'defaultValue': 'undefined',
				'type': 'string',
				'required': false,
				'desc': {
					'en': 'the error message displayed after input\'s validation.',
					'fr': 'le message d\'erreur affiché en cas d\'erreur lors de la validation',
				},
			}],
			publicInstance: [{
				'name': 'hasBeenFocus',
				'type': '() => boolean',
			}, {
				'name': 'isFocus',
				'type': '() => boolean',
			}, {
				'name': 'focus',
				'type': '() => void',
			}, {
				'name': 'blur',
				'type': 'Lodash.debounce',
			}, {
				'name': 'clear',
				'type': '() => void',
			}, {
				'name': 'setHasBeenFocus',
				'type': '(value: boolean) => void',
			}, {
				'name': 'isValid',
				'type': '() => boolean',
			}, {
				'name': '_el',
				'type': '() => HTMLElement | undefined',
			}],
		},
	],
	[
		'Cropper',
		{
			localTypes: {},
			events: [],
			provide: [],
			slots: [],
			props: [{
				'name': 'circle',
				'defaultValue': false,
				'type': 'boolean',
				'required': false,
				'desc': {
					'en': 'define if the shape of the cropper is a circle (otherwise a square)',
					'fr': 'définit si le recadrage prend la forme d\'unn cercle (un rectangle sinon)',
				},
			}, {
				'name': 'cropHeight',
				'defaultValue': '300',
				'type': 'number',
				'required': false,
				'desc': {
					'en': 'the height of the cropped image',
					'fr': 'la hauteur de l\'image recadrée',
				},
			}, {
				'name': 'cropWidth',
				'defaultValue': '300',
				'type': 'number',
				'required': false,
				'desc': {
					'en': 'the width of the cropped image',
					'fr': 'la largeur de l\'image recadrée',
				},
			}, {
				'name': 'file',
				'defaultValue': 'undefined',
				'type': 'File',
				'required': false,
				'desc': {
					'en': 'the file',
					'fr': 'le fichier à recadrer',
				},
			}, {
				'name': 'options',
				'defaultValue': 'undefined',
				'type': 'Object',
				'required': false,
				'desc': {
					'en': 'options of the cropper',
					'fr': 'les options du cropper',
				},
			}, {
				'name': 'zoomMax',
				'defaultValue': '3',
				'type': 'number',
				'required': false,
				'desc': {
					'en': 'the maximum zoom',
					'fr': 'le zoom maximum',
				},
			}, {
				'name': 'zoomMin',
				'defaultValue': '0.01',
				'type': 'number',
				'required': false,
				'desc': {
					'en': 'the minimal zoom',
					'fr': 'le zoom minimum',
				},
			}, {
				'name': 'zoomStep',
				'defaultValue': '0.01',
				'type': 'number',
				'required': false,
				'desc': {
					'en': 'the step of the zoom',
					'fr': 'le pas du zoom',
				},
			}],
			publicInstance: [{
				'name': 'crop',
				'type': '() => Promise<File>',
			}, {
				'name': '_el',
				'type': '() => HTMLElement | undefined',
			}],
		},
	],
	[
		'DailyCalendar',
		{
			localTypes: { 'DailyCalendarEmit': '{\n\t(e: \'update:date\', payload: Date): void;\n}' },
			events: [{
				'name': 'update:date',
				'payload': 'Date',
				'optional': false,
				'desc': {
					'en': 'Event to update the modelValue',
					'fr': 'évènement pour mettre à jour la modelValue',
				},
			}],
			provide: [],
			slots: [],
			props: [{
				'name': 'date',
				'defaultValue': 'null',
				'type': 'Date',
				'required': false,
				'desc': {
					'en': 'the selected date.',
					'fr': 'la date sélectionnée.',
				},
			}, {
				'name': 'dayTasks',
				'defaultValue': 'null',
				'type': 'Orion.DailyCalendarTask[]',
				'required': false,
				'desc': {
					'en': 'tasks array',
					'fr': 'le tableau de qui contient les tâches du jour',
				},
			}, {
				'name': 'range',
				'defaultValue': '() => ([\n\t\t\t\t8,\n\t\t\t\t18,\n\t\t\t])',
				'type': 'number[]',
				'required': false,
				'desc': {
					'en': 'hour range displayed.',
					'fr': 'la plage horaire affichée.',
				},
			}],
			publicInstance: [{
				'name': '_el',
				'type': '() => HTMLElement | undefined',
			}],
		},
	],
	[
		'DateTable',
		{
			localTypes: {
				'Period': '{\n\tisStart?: boolean;\n\tisEnd?: boolean;\n\tstart: Date;\n\tend: Date;\n\tlabel: string;\n\tcolor: Orion.Color;\n\tcallback?: () => void;\n\tspecific?: {\n\t\tcolor: Orion.Color;\n\t\tdate: Date;\n\t\texclude: boolean;\n\t}[];\n}',
				'PeriodDay': '{\n\tcolor?: Orion.Color;\n\tdate: Date;\n\tisStart: boolean;\n\tisEnd: boolean;\n\tisSelected: boolean;\n\texclude: boolean;\n\tnumber: number;\n\tmonth: number;\n\tyear: number;\n\tperiod: Period[];\n\tcallback?: () => void;\n}',
				'DateTableEmit': '{\n\t(e: \'update:modelValue\', payload: Nil<Date>): void;\n\t(e: \'update:range\', payload: Nil<Orion.DateRange>): void;\n\t(e: \'update:multiple\', payload: Nil<Date[]>): void;\n\t(e: \'update:dayHover\', payload: Nil<Date>): void;\n\t(e: \'change-month\', payload: { month: number, year: number }): void;\n\t(e: \'select-specific\', payload: Period | PeriodDay): void;\n\t(e: \'select-period\', payload: Period[]): void;\n\t(e: \'select-day\', payload: Period | PeriodDay): void;\n}',
			},
			events: [{
				'name': 'update:modelValue',
				'payload': 'Nil<Date>',
				'optional': false,
				'desc': {
					'en': 'emitted to update the modelValue',
					'fr': 'émis pour mettre à jour le modelValue',
				},
			}, {
				'name': 'update:range',
				'payload': 'Nil<Orion.DateRange>',
				'optional': false,
				'desc': {
					'en': 'emitted to update the range value',
					'fr': 'émis pour mettre à jour le modelValue dans le cas ou il est de type `range`',
				},
			}, {
				'name': 'update:multiple',
				'payload': 'Nil<Date[]>',
				'optional': false,
				'desc': {
					'en': 'emitted to update the multiple value',
					'fr': 'émis pour mettre à jour le modelValue dans le cas ou il est de type `multiple`',
				},
			}, {
				'name': 'update:dayHover',
				'payload': 'Nil<Date>',
				'optional': false,
				'desc': {
					'en': 'emitted to update the dayHover value',
					'fr': 'émis pour mettre à jour la valeur de `dayHover`',
				},
			}, {
				'name': 'change-month',
				'payload': '{ month: number, year: number }',
				'optional': false,
				'desc': {
					'en': 'emitted to change the current month',
					'fr': 'émis pour mettre à jour la valeur du mois courant',
				},
			}, {
				'name': 'select-specific',
				'payload': 'Period | PeriodDay',
				'optional': false,
				'desc': {
					'en': 'emitted on day click, to execute the associate callback if it exists',
					'fr': 'émis au moment du click sur un jour spécifique, pour exécuter le callback correspondant s\'il est défini',
				},
			}, {
				'name': 'select-period',
				'payload': 'Period[]',
				'optional': false,
				'desc': {
					'en': 'emitted when a period is selected and executes its associated callbacks',
					'fr': 'émis quand une période est sélectionnée et exécute le callback si défini',
				},
			}, {
				'name': 'select-day',
				'payload': 'Period | PeriodDay',
				'optional': false,
				'desc': {
					'en': 'emitted when a day is selected',
					'fr': 'émis quand un jour est sélectioné',
				},
			}],
			provide: [],
			slots: [],
			props: [{
				'name': 'canGoNextMonth',
				'defaultValue': 'true',
				'type': 'boolean',
				'required': false,
				'desc': {
					'en': 'allows the navigation to the next month',
					'fr': 'permet la navigation vers le mois suivant',
				},
			}, {
				'name': 'canGoPrevMonth',
				'defaultValue': 'true',
				'type': 'boolean',
				'required': false,
				'desc': {
					'en': 'allows the navigation to the previous month',
					'fr': 'permet la navigation vers le mois précédent',
				},
			}, {
				'name': 'dateSelected',
				'defaultValue': 'undefined',
				'type': 'Nil<Date>',
				'required': false,
				'desc': {
					'en': 'the selected date',
					'fr': 'la date selectionée',
				},
			}, {
				'name': 'dayHover',
				'defaultValue': 'undefined',
				'type': 'Nil<Date>',
				'required': false,
				'desc': {
					'en': 'the value of the hovered day',
					'fr': 'valeur du jour survolé',
				},
			}, {
				'name': 'disableMonthAndYear',
				'defaultValue': false,
				'type': 'boolean',
				'required': false,
				'desc': {
					'en': 'disabled month and year selection on top',
					'fr': 'désactive la sélection du mois et de l\'année en haut du calendrier',
				},
			}, {
				'name': 'maxDate',
				'defaultValue': 'undefined',
				'type': 'Nil<Date>',
				'required': false,
				'desc': {
					'en': 'the maximum date which can be selected',
					'fr': 'la date maximum qui peut être sélectionnée',
				},
			}, {
				'name': 'minDate',
				'defaultValue': 'undefined',
				'type': 'Nil<Date>',
				'required': false,
				'desc': {
					'en': 'the minimum date which can be selected',
					'fr': 'la date minimum qui peut être selectionée',
				},
			}, {
				'name': 'modelValue',
				'defaultValue': 'undefined',
				'type': 'Nil<Date>',
				'required': false,
				'desc': {
					'en': 'of the dateTable',
					'fr': 'du composant',
				},
			}, {
				'name': 'month',
				'defaultValue': false,
				'type': 'boolean',
				'required': false,
				'desc': {
					'en': 'if set, displays only months',
					'fr': 'si défini, affiche uniquement les mois',
				},
			}, {
				'name': 'multiple',
				'defaultValue': '() => []',
				'type': 'Date[]',
				'required': false,
				'desc': {
					'en': 'the modelValue if the type is set to `multiple`',
					'fr': 'modelValue du composant si la prop `type` est `multiple`',
				},
			}, {
				'name': 'periods',
				'defaultValue': 'undefined',
				'type': 'Nil<Orion.Period[]>',
				'required': false,
				'desc': {
					'en': 'periods to display on the table',
					'fr': 'périodes à afficher',
				},
			}, {
				'name': 'range',
				'defaultValue': 'undefined',
				'type': 'Nil<Orion.DateRange>',
				'required': false,
				'desc': {
					'en': 'the modelValue if the type is set to `range`',
					'fr': 'modelValue du composant si la prop `type` est `range`',
				},
			}, {
				'name': 'rangeEnd',
				'defaultValue': false,
				'type': 'boolean',
				'required': false,
				'desc': {
					'en': 'if set, defines the range end value as the current value',
					'fr': 'si définie, la date selectionnée est la fin de la période',
				},
			}, {
				'name': 'rangeStart',
				'defaultValue': false,
				'type': 'boolean',
				'required': false,
				'desc': {
					'en': 'if set, defines the range start value as the current value',
					'fr': 'si définie, la date sélectionnée est le début de la période',
				},
			}, {
				'name': 'type',
				'defaultValue': '\'date\'',
				'type': 'Orion.DateTableType',
				'required': false,
				'desc': {
					'en': 'the type of the model value',
					'fr': 'le type de modelValue',
				},
			}],
			publicInstance: [{
				'name': 'getCurrentDate',
				'type': '() => Date',
			}, {
				'name': 'getCurrentMonth',
				'type': '() => number',
			}, {
				'name': 'getCurrentYear',
				'type': '() => number',
			}, {
				'name': 'selectMonth',
				'type': '(month: number) => void',
			}, {
				'name': 'selectYear',
				'type': '(year: number) => void',
			}, {
				'name': '_el',
				'type': '() => HTMLElement | undefined',
			}],
		},
	],
	[
		'Datepicker',
		{
			localTypes: {
				'VModelType': 'Nil<Date>',
				'FieldEmit': '{\n  (e: \'focus\', payload: FocusEvent): void;\n  (e: \'blur\', payload?: FocusEvent): void;\n  (e: \'input\', payload: VModelType): void;\n  (e: \'change\', val?: VModelType): void;\n  (e: \'update:modelValue\', payload: VModelType): void;\n  (e: \'clear\'): void;\n\t(e: \'update:range\', payload: Nil<Orion.DateRange>): void;\n\t(e: \'update:multiple\', payload: Date[]): void;\n}',
			},
			events: [{
				'name': 'focus',
				'payload': 'FocusEvent',
				'optional': false,
				'desc': {
					'en': 'emitted on focus',
					'fr': 'émis lors du focus',
				},
			}, {
				'name': 'blur',
				'payload': 'FocusEvent',
				'optional': true,
				'desc': {
					'en': 'emitted when the focus leaves the field',
					'fr': 'émis quand le focus quitte le champ',
				},
			}, {
				'name': 'input',
				'payload': 'VModelType',
				'optional': false,
				'desc': {
					'en': 'emitted when the value of the field changes',
					'fr': 'émis lorsque la valeur est modifiée',
				},
			}, {
				'name': 'change',
				'payload': 'VModelType',
				'optional': true,
				'desc': {
					'en': 'emitted when the value of the field changes',
					'fr': 'émis lorsque la valeur est modifiée',
				},
			}, {
				'name': 'update:modelValue',
				'payload': 'VModelType',
				'optional': false,
				'desc': {
					'en': 'emitted to update the field value',
					'fr': 'émis pour mettre à jour la valeur',
				},
			}, {
				'name': 'clear',
				'payload': 'undefined',
				'optional': false,
				'desc': {
					'en': 'emitted when the field is cleared',
					'fr': 'émis quand le champ est vidé',
				},
			}, {
				'name': 'update:range',
				'payload': 'Nil<Orion.DateRange>',
				'optional': false,
				'desc': {
					'en': 'emitted to update the modelValue when the type is `range`',
					'fr': 'émis pour mettre à jour la valeur quand le type est `range`',
				},
			}, {
				'name': 'update:multiple',
				'payload': 'Date[]',
				'optional': false,
				'desc': {
					'en': 'emitted to update the field value when the type is `multiple`',
					'fr': 'émis pour mettre à jour la valeur quand le type est `multiple`',
				},
			}],
			provide: [],
			slots: [{
				'name': 'multipleDisplay',
				'desc': {
					'en': 'if type is `multiple`, the content inside the input',
					'fr': 'si le type est `multiple`, il s\'agit du contenu de l\'input',
				},
				'bindings': [{
					'bind': 'datas',
					'type': 'Date[]',
					'desc': {
						'en': 'the selected dates',
						'fr': 'Missing @doc',
					},
				}, {
					'bind': 'close',
					'type': '(date: Date) => void',
					'desc': {
						'en': 'remove the date',
						'fr': 'retire la date',
					},
				}],
			}],
			props: [{
				'name': 'autofocus',
				'defaultValue': false,
				'type': 'boolean',
				'required': false,
				'desc': {
					'en': 'autofocus the field when mounted.',
					'fr': 'focus automatiquement le champ lorsqu\'il est monté.',
				},
			}, {
				'name': 'clearable',
				'defaultValue': false,
				'type': 'boolean',
				'required': false,
				'desc': {
					'en': 'defines if the field can be cleared.',
					'fr': 'définit si le champ peut être vidé.',
				},
			}, {
				'name': 'clearToNull',
				'defaultValue': false,
				'type': 'boolean',
				'required': false,
				'desc': {
					'en': 'sets the value to null when the field is cleared',
					'fr': 'lorsque que le champ est vidé, sa valeur vaut `null`',
				},
			}, {
				'name': 'disabled',
				'defaultValue': false,
				'type': 'boolean',
				'required': false,
				'desc': {
					'en': 'disables the field',
					'fr': 'désactive le champ',
				},
			}, {
				'name': 'donetyping',
				'defaultValue': '0',
				'type': 'number',
				'required': false,
				'desc': {
					'en': 'define the debounce duration before updating the value (useful for search field)',
					'fr': 'défini la durée du debounce avant de mettre à jour la valeur (utile pour les champs de recherche)',
				},
			}, {
				'name': 'forceLabelFloating',
				'defaultValue': false,
				'type': 'boolean',
				'required': false,
				'desc': {
					'en': 'allows floating label',
					'fr': 'permet au label de se placer au dessus du champ lorsqu\'il possède une valeur',
				},
			}, {
				'name': 'hideDisabled',
				'defaultValue': false,
				'type': 'boolean',
				'required': false,
				'desc': {
					'en': 'hide disabled dates (currently for type="week" only)',
					'fr': 'cache les dates désactivées (actuellement uniquement avec type="week")',
				},
			}, {
				'name': 'inheritValidationState',
				'defaultValue': 'undefined',
				'type': 'boolean',
				'required': false,
				'desc': {
					'en': 'defines if the validation comes from its parent',
					'fr': 'définit si la validation provient du parent',
				},
			}, {
				'name': 'label',
				'defaultValue': 'undefined',
				'type': 'string',
				'required': false,
				'desc': {
					'en': 'label of the field',
					'fr': 'le label du champ',
				},
			}, {
				'name': 'maxDate',
				'defaultValue': 'undefined',
				'type': 'Undef<Date>',
				'required': false,
				'desc': {
					'en': 'the maximum date which can be selected',
					'fr': 'la date maximum qui peut être sélectionnée',
				},
			}, {
				'name': 'minDate',
				'defaultValue': 'undefined',
				'type': 'Undef<Date>',
				'required': false,
				'desc': {
					'en': 'the minimum date which can be selected',
					'fr': 'la date minimum qui peut être sélectionnée',
				},
			}, {
				'name': 'modelValue',
				'type': 'T',
				'required': false,
				'desc': {
					'en': 'modelValue of the component',
					'fr': 'modelValue du composant',
				},
			}, {
				'name': 'multiple',
				'defaultValue': '() => []',
				'type': 'Date[]',
				'required': false,
				'desc': {
					'en': 'the modelValue if the type is set to `multiple`',
					'fr': 'le modelValue si le type est défini à `multiple`',
				},
			}, {
				'name': 'multipleLabelColor',
				'defaultValue': '\'default\'',
				'type': 'Orion.ColorExtendedAndGreys',
				'required': false,
				'desc': {
					'en': 'color of the displayed dates is the type is set to `multiple`',
					'fr': 'couleurs des dates affichées si le type est défini à `multiple`',
				},
			}, {
				'name': 'prefixFontIcon',
				'type': 'string',
				'required': false,
				'desc': {
					'en': 'the prefix icon from the imported font library',
					'fr': 'définit l\'icône de préfixe à partir de la librairie de police importée',
				},
			}, {
				'name': 'prefixIcon',
				'type': 'Orion.Icon',
				'required': false,
				'desc': {
					'en': 'the prefix icon',
					'fr': 'définit l\'icône de préfixe',
				},
			}, {
				'name': 'preserveTime',
				'defaultValue': false,
				'type': 'boolean',
				'required': false,
				'desc': {
					'en': 'keep the current time value when changing date',
					'fr': 'conserve la valeur actuelle de l\'heure lors du changement de date',
				},
			}, {
				'name': 'range',
				'defaultValue': 'undefined',
				'type': 'Undef<Orion.DateRange>',
				'required': false,
				'desc': {
					'en': 'the modelValue if the type is set to `range`',
					'fr': 'le modelValue si le type est défini à `range`',
				},
			}, {
				'name': 'readonly',
				'defaultValue': false,
				'type': 'boolean',
				'required': false,
				'desc': {
					'en': 'sets the field to read-only mode',
					'fr': 'définit le champ comme étant en lecture seule',
				},
			}, {
				'name': 'required',
				'defaultValue': false,
				'type': 'boolean',
				'required': false,
				'desc': {
					'en': 'sets the field required',
					'fr': 'indique que le champ est obligatoire',
				},
			}, {
				'name': 'selectOnFocus',
				'defaultValue': false,
				'type': 'boolean',
				'required': false,
				'desc': {
					'en': 'select the field content when focused.',
					'fr': 'sélectionne le contenu du champ lorsqu\'il est focus.',
				},
			}, {
				'name': 'size',
				'defaultValue': '\'md\'',
				'type': 'Orion.Size',
				'required': false,
				'sharedDefaultValue': '\'md\'',
				'desc': {
					'en': 'define the size',
					'fr': 'définit la taille',
				},
			}, {
				'name': 'suffixFontIcon',
				'type': 'string',
				'required': false,
				'desc': {
					'en': 'the suffix icon from the imported font library',
					'fr': 'Missing @doc',
				},
			}, {
				'name': 'suffixIcon',
				'type': 'Orion.Icon',
				'required': false,
				'desc': {
					'en': 'the suffix icon',
					'fr': 'définit l\'icône de suffixe',
				},
			}, {
				'name': 'time',
				'defaultValue': false,
				'type': 'boolean',
				'required': false,
				'desc': {
					'en': 'displays also hours/minutes',
					'fr': 'affiche aussi les heures/minutes',
				},
			}, {
				'name': 'type',
				'defaultValue': '\'date\'',
				'type': 'Orion.DatepickerType',
				'required': false,
				'desc': {
					'en': 'the type of the model value',
					'fr': 'le type de modelValue',
				},
			}, {
				'name': 'validation',
				'defaultValue': 'undefined',
				'type': 'string | ((val: any) => boolean) | Orion.Validator.Rule | Orion.Validation.Rule | boolean',
				'required': false,
				'desc': {
					'en': 'the validation for the field',
					'fr': 'la validation du champ',
				},
			}, {
				'name': 'validationErrorMessage',
				'defaultValue': 'undefined',
				'type': 'string',
				'required': false,
				'desc': {
					'en': 'the error message displayed after input\'s validation.',
					'fr': 'le message d\'erreur affiché en cas d\'erreur lors de la validation',
				},
			}, {
				'name': 'valueDisplayFormat',
				'defaultValue': 'undefined',
				'type': 'Function',
				'required': false,
				'desc': {
					'en': 'function to customize the display format',
					'fr': 'fonction pour personnaliser l\'affichage',
				},
			}],
			publicInstance: [{
				'name': 'hasBeenFocus',
				'type': '() => boolean',
			}, {
				'name': 'isFocus',
				'type': '() => boolean',
			}, {
				'name': 'focus',
				'type': '() => void',
			}, {
				'name': 'blur',
				'type': 'Lodash.debounce',
			}, {
				'name': 'clear',
				'type': '() => void',
			}, {
				'name': 'setHasBeenFocus',
				'type': '(value: boolean) => void',
			}, {
				'name': 'isValid',
				'type': '() => boolean',
			}, {
				'name': '_el',
				'type': '() => HTMLElement | undefined',
			}],
		},
	],
	[
		'Draggable',
		{
			localTypes: { 'DraggableEmit': '{\n\t(e: \'update:disabled\', payload: boolean): void;\n}' },
			events: [{
				'name': 'update:disabled',
				'payload': 'boolean',
				'optional': false,
				'desc': {
					'en': 'Missing @doc',
					'fr': 'Missing @doc',
				},
			}],
			provide: [],
			slots: [{
				'name': 'default',
				'desc': {
					'en': 'the content of the draggable component',
					'fr': 'contenu de l\'élément',
				},
				'bindings': [],
			}],
			props: [{
				'name': 'data',
				'defaultValue': 'null',
				'type': 'Object',
				'required': false,
				'desc': {
					'en': 'datas of the draggable item',
					'fr': 'données de l\'élément',
				},
			}, {
				'name': 'disabled',
				'defaultValue': false,
				'type': 'boolean',
				'required': false,
				'desc': {
					'en': 'if set, the item will not be draggable',
					'fr': 'si défini, l\'élément ne sera pas déplaçable',
				},
			}, {
				'name': 'tag',
				'defaultValue': '\'div\'',
				'type': 'string',
				'required': false,
				'desc': {
					'en': 'the tag or component of the draggable item',
					'fr': 'tag ou composant qui réprésentera l\'élément',
				},
			}],
			publicInstance: [{
				'name': '_el',
				'type': '() => HTMLElement | undefined',
			}],
		},
	],
	[
		'Droppable',
		{
			localTypes: { 'DropEmit': '{\n\t(e: \'dropIn\', payload: any): void ;\n\t(e: \'dragOver\'): void ;\n\t(e: \'dragLeave\'): void ;\n\t(e: \'reorder\', payload: any): void ;\n\t(e: \'dropOut\', payload: any): void ;\n\t(e: \'update:datalist\', payload: any[]): void ;\n}' },
			events: [{
				'name': 'dropIn',
				'payload': 'any',
				'optional': false,
				'desc': {
					'en': 'Emitted when the draggable item is dropped in a zone',
					'fr': 'émis quand un élément est déposé dans une zone de drop',
				},
			}, {
				'name': 'dragOver',
				'payload': 'undefined',
				'optional': false,
				'desc': {
					'en': 'Emitted when the draggable item enters in a droppable zone',
					'fr': 'émis quand un élément entre dans une zone de drop',
				},
			}, {
				'name': 'dragLeave',
				'payload': 'undefined',
				'optional': false,
				'desc': {
					'en': 'Emitted when the draggable item leaves a droppable zone',
					'fr': 'émis quand un élément quitte une zone de drop',
				},
			}, {
				'name': 'reorder',
				'payload': 'any',
				'optional': false,
				'desc': {
					'en': 'Emitted when the draggable item is dropped in its origin area',
					'fr': 'émis quand un élément est relaché dans la zone dont il provient',
				},
			}, {
				'name': 'dropOut',
				'payload': 'any',
				'optional': false,
				'desc': {
					'en': 'Emitted when the draggable item is droped outside a droppable zone',
					'fr': 'émis quand un élément est laché en dehors d\'une zone de drop',
				},
			}, {
				'name': 'update:datalist',
				'payload': 'any[]',
				'optional': false,
				'desc': {
					'en': 'Emitted to update the datalist',
					'fr': 'émis pour mettre à jour la liste d\'élément du composant',
				},
			}],
			provide: [{
				'name': '_droppable',
				'data': 'publicInstance',
			}],
			slots: [{
				'name': 'default',
				'desc': {
					'en': 'The content of the component',
					'fr': 'Contenu du composant',
				},
				'bindings': [],
			}],
			props: [{
				'name': 'datalist',
				'defaultValue': 'null',
				'type': 'DataListItem[]',
				'required': false,
				'desc': {
					'en': 'datas of the component',
					'fr': 'liste d\'objets du composant',
				},
			}, {
				'name': 'tag',
				'defaultValue': '\'div\'',
				'type': 'string',
				'required': false,
				'desc': {
					'en': 'the tag or component of the droppable area',
					'fr': 'tag ou composant qui représentera la zone de drop',
				},
			}, {
				'name': 'validation',
				'defaultValue': 'null',
				'type': 'Orion.DndValidation',
				'required': false,
				'desc': {
					'en': 'allows you to add a validation before the item drops',
					'fr': 'permet d\'ajouter une validation avant de déposer un objet dans la zone',
				},
			}],
			publicInstance: [{
				'name': 'uid',
				'type': 'number',
			}, {
				'name': '_el',
				'type': '() => HTMLElement | undefined',
			}],
		},
	],
	[
		'Editor',
		{
			localTypes: {
				'VModelType': 'string | null | undefined',
				'EditorEmit': '{\n  (e: \'focus\', payload: FocusEvent): void;\n  (e: \'blur\', payload?: FocusEvent): void;\n  (e: \'input\', payload: VModelType): void;\n  (e: \'change\', val?: VModelType): void;\n  (e: \'update:modelValue\', payload: VModelType): void;\n  (e: \'clear\'): void;\n\t(e: \'update:json\', payload: JSONContent | undefined): void;\n}',
			},
			events: [{
				'name': 'focus',
				'payload': 'FocusEvent',
				'optional': false,
				'desc': {
					'en': 'emitted on focus',
					'fr': 'émis lors du focus',
				},
			}, {
				'name': 'blur',
				'payload': 'FocusEvent',
				'optional': true,
				'desc': {
					'en': 'emitted when the focus leaves the field',
					'fr': 'émis quand le focus quitte le champ',
				},
			}, {
				'name': 'input',
				'payload': 'VModelType',
				'optional': false,
				'desc': {
					'en': 'emitted when the value of the field changes',
					'fr': 'émis lorsque la valeur est modifiée',
				},
			}, {
				'name': 'change',
				'payload': 'VModelType',
				'optional': true,
				'desc': {
					'en': 'emitted when the value of the field changes',
					'fr': 'émis lorsque la valeur est modifiée',
				},
			}, {
				'name': 'update:modelValue',
				'payload': 'VModelType',
				'optional': false,
				'desc': {
					'en': 'emitted to update the field value',
					'fr': 'émis pour mettre à jour la valeur',
				},
			}, {
				'name': 'clear',
				'payload': 'undefined',
				'optional': false,
				'desc': {
					'en': 'emitted when the field is cleared',
					'fr': 'émis quand le champ est vidé',
				},
			}, {
				'name': 'update:json',
				'payload': 'JSONContent | undefined',
				'optional': false,
				'desc': {
					'en': 'emitted to update the json value',
					'fr': 'émis pour mettre à jour la valeur JSON',
				},
			}],
			provide: [],
			slots: [],
			props: [{
				'name': 'autofocus',
				'defaultValue': false,
				'type': 'boolean',
				'required': false,
				'desc': {
					'en': 'autofocus the field when mounted.',
					'fr': 'focus automatiquement le champ lorsqu\'il est monté.',
				},
			}, {
				'name': 'clearable',
				'defaultValue': false,
				'type': 'boolean',
				'required': false,
				'desc': {
					'en': 'defines if the field can be cleared.',
					'fr': 'définit si le champ peut être vidé.',
				},
			}, {
				'name': 'clearToNull',
				'defaultValue': false,
				'type': 'boolean',
				'required': false,
				'desc': {
					'en': 'sets the value to null when the field is cleared',
					'fr': 'lorsque que le champ est vidé, sa valeur vaut `null`',
				},
			}, {
				'name': 'disabled',
				'defaultValue': false,
				'type': 'boolean',
				'required': false,
				'desc': {
					'en': 'disables the field',
					'fr': 'désactive le champ',
				},
			}, {
				'name': 'disableFeatures',
				'defaultValue': '() => []',
				'type': 'EditorFeature[]',
				'required': false,
				'desc': {
					'en': 'disable some editor\'s features',
					'fr': 'désactive des fonctions de l\'éditeur',
				},
			}, {
				'name': 'donetyping',
				'defaultValue': '0',
				'type': 'number',
				'required': false,
				'desc': {
					'en': 'define the debounce duration before updating the value (useful for search field)',
					'fr': 'défini la durée du debounce avant de mettre à jour la valeur (utile pour les champs de recherche)',
				},
			}, {
				'name': 'forceLabelFloating',
				'defaultValue': false,
				'type': 'boolean',
				'required': false,
				'desc': {
					'en': 'allows floating label',
					'fr': 'permet au label de se placer au dessus du champ lorsqu\'il possède une valeur',
				},
			}, {
				'name': 'imgFileTypes',
				'defaultValue': '() => [\'image/jpeg\', \'image/png\', \'image/gif\']',
				'type': 'string[]',
				'required': false,
				'desc': {
					'en': 'authorized image file formats',
					'fr': 'type de fichier autorisé pour les images',
				},
			}, {
				'name': 'imgMaxSize',
				'defaultValue': '1500',
				'type': 'number',
				'required': false,
				'desc': {
					'en': 'maximum size of the imported image',
					'fr': 'taille maximum d\'une image importée',
				},
			}, {
				'name': 'inheritValidationState',
				'defaultValue': 'undefined',
				'type': 'boolean',
				'required': false,
				'desc': {
					'en': 'defines if the validation comes from its parent',
					'fr': 'définit si la validation provient du parent',
				},
			}, {
				'name': 'json',
				'defaultValue': 'undefined',
				'type': 'JSONContent',
				'required': false,
				'desc': {
					'en': 'the json format of the editor value',
					'fr': 'valeur de l\'éditeur au format JSON',
				},
			}, {
				'name': 'label',
				'defaultValue': 'undefined',
				'type': 'string',
				'required': false,
				'desc': {
					'en': 'label of the field',
					'fr': 'le label du champ',
				},
			}, {
				'name': 'modelValue',
				'type': 'T',
				'required': false,
				'desc': {
					'en': 'modelValue of the component',
					'fr': 'modelValue du composant',
				},
			}, {
				'name': 'placeholder',
				'defaultValue': 'undefined',
				'type': 'string',
				'required': false,
				'desc': {
					'en': 'place holder',
					'fr': 'placeholder',
				},
			}, {
				'name': 'prefixFontIcon',
				'type': 'string',
				'required': false,
				'desc': {
					'en': 'the prefix icon from the imported font library',
					'fr': 'définit l\'icône de préfixe à partir de la librairie de police importée',
				},
			}, {
				'name': 'prefixIcon',
				'type': 'Orion.Icon',
				'required': false,
				'desc': {
					'en': 'the prefix icon',
					'fr': 'définit l\'icône de préfixe',
				},
			}, {
				'name': 'readonly',
				'defaultValue': false,
				'type': 'boolean',
				'required': false,
				'desc': {
					'en': 'sets the field to read-only mode',
					'fr': 'définit le champ comme étant en lecture seule',
				},
			}, {
				'name': 'required',
				'defaultValue': false,
				'type': 'boolean',
				'required': false,
				'desc': {
					'en': 'sets the field required',
					'fr': 'indique que le champ est obligatoire',
				},
			}, {
				'name': 'selectOnFocus',
				'defaultValue': false,
				'type': 'boolean',
				'required': false,
				'desc': {
					'en': 'select the field content when focused.',
					'fr': 'sélectionne le contenu du champ lorsqu\'il est focus.',
				},
			}, {
				'name': 'size',
				'defaultValue': '\'md\'',
				'type': 'Orion.Size',
				'required': false,
				'sharedDefaultValue': '\'md\'',
				'desc': {
					'en': 'define the size',
					'fr': 'définit la taille',
				},
			}, {
				'name': 'suffixFontIcon',
				'type': 'string',
				'required': false,
				'desc': {
					'en': 'the suffix icon from the imported font library',
					'fr': 'Missing @doc',
				},
			}, {
				'name': 'suffixIcon',
				'type': 'Orion.Icon',
				'required': false,
				'desc': {
					'en': 'the suffix icon',
					'fr': 'définit l\'icône de suffixe',
				},
			}, {
				'name': 'type',
				'defaultValue': '\'text\'',
				'type': 'string | Orion.DatepickerType',
				'required': false,
				'desc': {
					'en': 'type of the input',
					'fr': 'type of the input',
				},
			}, {
				'name': 'validation',
				'defaultValue': 'undefined',
				'type': 'string | ((val: any) => boolean) | Orion.Validator.Rule | Orion.Validation.Rule | boolean',
				'required': false,
				'desc': {
					'en': 'the validation for the field',
					'fr': 'la validation du champ',
				},
			}, {
				'name': 'validationErrorMessage',
				'defaultValue': 'undefined',
				'type': 'string',
				'required': false,
				'desc': {
					'en': 'the error message displayed after input\'s validation.',
					'fr': 'le message d\'erreur affiché en cas d\'erreur lors de la validation',
				},
			}],
			publicInstance: [{
				'name': 'hasBeenFocus',
				'type': '() => boolean',
			}, {
				'name': 'isFocus',
				'type': '() => boolean',
			}, {
				'name': 'focus',
				'type': '() => void',
			}, {
				'name': 'blur',
				'type': 'Lodash.debounce',
			}, {
				'name': 'clear',
				'type': '() => void',
			}, {
				'name': 'setHasBeenFocus',
				'type': '(value: boolean) => void',
			}, {
				'name': 'isValid',
				'type': '() => boolean',
			}, {
				'name': '_el',
				'type': '() => HTMLElement | undefined',
			}],
		},
	],
	[
		'FooterFixed',
		{
			localTypes: {},
			events: [],
			provide: [],
			slots: [{
				'name': 'default',
				'desc': {
					'en': 'the content of the footer',
					'fr': 'contenu du pied de page',
				},
				'bindings': [],
			}],
			props: [{
				'name': 'title',
				'defaultValue': 'undefined',
				'type': 'string',
				'required': false,
				'desc': {
					'en': 'title of the footer',
					'fr': 'Missing @doc',
				},
			}, {
				'name': 'visible',
				'defaultValue': false,
				'type': 'boolean',
				'required': false,
				'desc': {
					'en': 'if set, displays the footer',
					'fr': 'si défini, affiche le composant',
				},
			}],
			publicInstance: [{
				'name': '_el',
				'type': '() => HTMLElement | undefined',
			}],
		},
	],
	[
		'HorizontalScroll',
		{
			localTypes: {},
			events: [],
			provide: [],
			slots: [{
				'name': 'default',
				'desc': {
					'en': 'The content of the scroll',
					'fr': 'Contenu du composant',
				},
				'bindings': [],
			}],
			props: [{
				'name': 'dropShadow',
				'defaultValue': 'false',
				'type': 'boolean',
				'required': false,
				'desc': {
					'en': 'if set, hides the shadow on the extremities of the scroll',
					'fr': 'si défini, masque l\'ombre aux extrémités du composant',
				},
			}, {
				'name': 'hideButton',
				'defaultValue': false,
				'type': 'boolean',
				'required': false,
				'desc': {
					'en': 'if set, hides the buttons to slide left or right',
					'fr': 'si défini, masque les bouttons permettant de glisser vers gauche ou vers la droite.',
				},
			}, {
				'name': 'scrollStep',
				'defaultValue': 'null',
				'type': '() => number | Array<HTMLElement>',
				'required': false,
				'desc': {
					'en': 'defines the targets of the scroll step',
					'fr': 'défini le pas du scroll, ou un tableau d\'éléments dans le DOM pour le calculer automatiquement',
				},
			}, {
				'name': 'shadowColor',
				'defaultValue': '\'grey-lighter\'',
				'type': 'string',
				'required': false,
				'desc': {
					'en': 'the color of the shadow on the extremities of the scroll',
					'fr': 'couleur de l\'ombre aux extrémités du composant',
				},
			}, {
				'name': 'targets',
				'defaultValue': 'undefined',
				'type': '() => Array<HTMLElement>',
				'required': false,
				'desc': {
					'en': 'if set, shows a preview of the items contained is the scroll. The function must return an array of DOM elements which are in the scroll area.',
					'fr': 'si défini, affiche un aperçu des éléments contenus dans le scroll. Cette fonction doit renvoyer un tableau d\'éléments du DOM.',
				},
			}, {
				'name': 'tolerance',
				'defaultValue': '1',
				'type': 'number',
				'required': false,
				'desc': {
					'en': 'set the scroll tolerance that trigger the shadow\'s display',
					'fr': 'défini la tolérence pour le déclenchement de l\'apparition ou de la disparation de l\'ombre',
				},
			}],
			publicInstance: [{
				'name': '_el',
				'type': '() => HTMLElement | undefined',
			}],
		},
	],
	[
		'Icon',
		{
			localTypes: {},
			events: [{
				'name': 'marker-click',
				'payload': 'undefined',
				'optional': false,
				'desc': {
					'en': 'emitted on marker click',
					'fr': 'émis au moment du click sur le marqueur',
				},
			}],
			provide: [],
			slots: [],
			props: [{
				'name': 'button',
				'defaultValue': 'undefined',
				'type': 'Orion.Color',
				'required': false,
				'desc': {
					'en': 'adds a background color',
					'fr': 'ajouter une couleur en arrière plan',
				},
			}, {
				'name': 'fontIcon',
				'type': 'string',
				'required': false,
				'desc': {
					'en': 'the icon of the component, from the imported font library',
					'fr': 'l\'icône du composant, de la librairie de police importée',
				},
			}, {
				'name': 'icon',
				'type': 'Orion.Icon',
				'required': false,
				'desc': {
					'en': 'the icon of the component',
					'fr': 'définit l\'icône',
				},
			}, {
				'name': 'loading',
				'defaultValue': false,
				'type': 'boolean',
				'required': false,
				'desc': {
					'en': 'if set, blocks the click on the icon',
					'fr': 'si défini, bloque le click sur l\'icône',
				},
			}, {
				'name': 'marker',
				'defaultValue': 'undefined',
				'type': 'boolean | number',
				'required': false,
				'desc': {
					'en': 'adds a visual marker, can be used as a notification marker',
					'fr': 'ajoute un marqueur visuel, qui peut être utilisé comme un marqueur de notification',
				},
			}, {
				'name': 'markerColor',
				'defaultValue': '\'danger\'',
				'type': 'Orion.Color',
				'required': false,
				'desc': {
					'en': 'the color of the marker',
					'fr': 'couleur du marqueur',
				},
			}, {
				'name': 'markerPosition',
				'defaultValue': '\'top right\'',
				'type': 'string',
				'required': false,
				'desc': {
					'en': 'the position of the marker',
					'fr': 'position du marqueur',
				},
			}, {
				'name': 'onMarkerClick',
				'defaultValue': 'undefined',
				'type': '(e: MouseEvent) => void',
				'required': false,
				'desc': {
					'en': 'Missing @doc',
					'fr': 'Missing @doc',
				},
			}, {
				'name': 'ripple',
				'defaultValue': 'undefined',
				'type': 'Orion.Color',
				'required': false,
				'desc': {
					'en': 'emits a wave on the click and adds an hover color',
					'fr': 'émet une onde au moment du click et ajoute un style au moment du survol',
				},
			}],
			publicInstance: [{
				'name': '_el',
				'type': '() => HTMLElement | undefined',
			}],
		},
	],
	[
		'IconSection',
		{
			localTypes: {},
			events: [],
			provide: [],
			slots: [{
				'name': 'default',
				'desc': {
					'en': 'the content of the description',
					'fr': 'contenu de la description',
				},
				'bindings': [],
			}],
			props: [{
				'name': 'center',
				'defaultValue': false,
				'type': 'boolean',
				'required': false,
				'desc': {
					'en': 'centers the content',
					'fr': 'centre le contenu',
				},
			}, {
				'name': 'fontIcon',
				'type': 'string',
				'required': false,
				'desc': {
					'en': 'the icon of the component, from the imported font library',
					'fr': 'l\'icône du composant, de la librairie de police importée',
				},
			}, {
				'name': 'icon',
				'type': 'Orion.Icon',
				'required': false,
				'desc': {
					'en': 'the icon of the component',
					'fr': 'définit l\'icône',
				},
			}, {
				'name': 'title',
				'defaultValue': 'undefined',
				'type': 'string',
				'required': false,
				'desc': {
					'en': 'title of the section',
					'fr': 'titre de la section',
				},
			}],
			publicInstance: [{
				'name': '_el',
				'type': '() => HTMLElement | undefined',
			}],
		},
	],
	[
		'Input',
		{
			localTypes: {
				'VModelType': 'Nil<string | number>',
				'FieldEmit': '{\n  (e: \'focus\', payload: FocusEvent): void;\n  (e: \'blur\', payload?: FocusEvent): void;\n  (e: \'input\', payload: VModelType): void;\n  (e: \'change\', val?: VModelType): void;\n  (e: \'update:modelValue\', payload: VModelType): void;\n  (e: \'clear\'): void;\n}',
			},
			events: [{
				'name': 'focus',
				'payload': 'FocusEvent',
				'optional': false,
				'desc': {
					'en': 'emitted on focus',
					'fr': 'émis lors du focus',
				},
			}, {
				'name': 'blur',
				'payload': 'FocusEvent',
				'optional': true,
				'desc': {
					'en': 'emitted when the focus leaves the field',
					'fr': 'émis quand le focus quitte le champ',
				},
			}, {
				'name': 'input',
				'payload': 'VModelType',
				'optional': false,
				'desc': {
					'en': 'emitted when the value of the field changes',
					'fr': 'émis lorsque la valeur est modifiée',
				},
			}, {
				'name': 'change',
				'payload': 'VModelType',
				'optional': true,
				'desc': {
					'en': 'emitted when the value of the field changes',
					'fr': 'émis lorsque la valeur est modifiée',
				},
			}, {
				'name': 'update:modelValue',
				'payload': 'VModelType',
				'optional': false,
				'desc': {
					'en': 'emitted to update the field value',
					'fr': 'émis pour mettre à jour la valeur',
				},
			}, {
				'name': 'clear',
				'payload': 'undefined',
				'optional': false,
				'desc': {
					'en': 'emitted when the field is cleared',
					'fr': 'émis quand le champ est vidé',
				},
			}],
			provide: [],
			slots: [],
			props: [{
				'name': 'allowNegative',
				'defaultValue': false,
				'type': 'boolean',
				'required': false,
				'desc': {
					'en': 'Missing @doc',
					'fr': 'Missing @doc',
				},
			}, {
				'name': 'autocomplete',
				'defaultValue': 'undefined',
				'type': 'string',
				'required': false,
				'desc': {
					'en': 'provides automated assistance in filling out form field values from native html input',
					'fr': 'fournit une assitance automatique de remplissage du champ',
				},
			}, {
				'name': 'autofocus',
				'defaultValue': false,
				'type': 'boolean',
				'required': false,
				'desc': {
					'en': 'autofocus the field when mounted.',
					'fr': 'focus automatiquement le champ lorsqu\'il est monté.',
				},
			}, {
				'name': 'clearable',
				'defaultValue': false,
				'type': 'boolean',
				'required': false,
				'desc': {
					'en': 'defines if the field can be cleared.',
					'fr': 'définit si le champ peut être vidé.',
				},
			}, {
				'name': 'clearToNull',
				'defaultValue': false,
				'type': 'boolean',
				'required': false,
				'desc': {
					'en': 'sets the value to null when the field is cleared',
					'fr': 'lorsque que le champ est vidé, sa valeur vaut `null`',
				},
			}, {
				'name': 'cleave',
				'defaultValue': 'undefined',
				'type': 'Object',
				'required': false,
				'desc': {
					'en': 'Missing @doc',
					'fr': 'Missing @doc',
				},
			}, {
				'name': 'disabled',
				'defaultValue': false,
				'type': 'boolean',
				'required': false,
				'desc': {
					'en': 'disables the field',
					'fr': 'désactive le champ',
				},
			}, {
				'name': 'donetyping',
				'defaultValue': '0',
				'type': 'number',
				'required': false,
				'desc': {
					'en': 'define the debounce duration before updating the value (useful for search field)',
					'fr': 'défini la durée du debounce avant de mettre à jour la valeur (utile pour les champs de recherche)',
				},
			}, {
				'name': 'forceLabelFloating',
				'defaultValue': false,
				'type': 'boolean',
				'required': false,
				'desc': {
					'en': 'allows floating label',
					'fr': 'permet au label de se placer au dessus du champ lorsqu\'il possède une valeur',
				},
			}, {
				'name': 'inheritValidationState',
				'defaultValue': 'undefined',
				'type': 'boolean',
				'required': false,
				'desc': {
					'en': 'defines if the validation comes from its parent',
					'fr': 'définit si la validation provient du parent',
				},
			}, {
				'name': 'label',
				'defaultValue': 'undefined',
				'type': 'string',
				'required': false,
				'desc': {
					'en': 'label of the field',
					'fr': 'le label du champ',
				},
			}, {
				'name': 'mask',
				'defaultValue': 'undefined',
				'type': 'string | InputMask',
				'required': false,
				'desc': {
					'en': 'the mask applied on the input',
					'fr': 'masque appliqué sur le champ',
				},
			}, {
				'name': 'maskFormat',
				'defaultValue': 'undefined',
				'type': 'string',
				'required': false,
				'desc': {
					'en': 'Missing @doc',
					'fr': 'Missing @doc',
				},
			}, {
				'name': 'maskHourFormat',
				'defaultValue': '\'24h\'',
				'type': 'string',
				'required': false,
				'desc': {
					'en': 'the hour format',
					'fr': 'format de l\'heure',
				},
			}, {
				'name': 'maskHourSeparator',
				'defaultValue': '\':\'',
				'type': 'string',
				'required': false,
				'desc': {
					'en': 'hour separator',
					'fr': 'sépérateur d\'heures',
				},
			}, {
				'name': 'maxLength',
				'defaultValue': 'undefined',
				'type': 'number',
				'required': false,
				'desc': {
					'en': 'maximum length of the input',
					'fr': 'longueur maximum du champ',
				},
			}, {
				'name': 'maxValue',
				'defaultValue': 'undefined',
				'type': 'number',
				'required': false,
				'desc': {
					'en': 'maximum value of the input',
					'fr': 'valeur maximale du champ',
				},
			}, {
				'name': 'minValue',
				'defaultValue': 'undefined',
				'type': 'number',
				'required': false,
				'desc': {
					'en': 'minimum value of the input',
					'fr': 'valeur minimale du champ',
				},
			}, {
				'name': 'modelValue',
				'type': 'T',
				'required': false,
				'desc': {
					'en': 'modelValue of the component',
					'fr': 'modelValue du composant',
				},
			}, {
				'name': 'prefixFontIcon',
				'type': 'string',
				'required': false,
				'desc': {
					'en': 'the prefix icon from the imported font library',
					'fr': 'définit l\'icône de préfixe à partir de la librairie de police importée',
				},
			}, {
				'name': 'prefixIcon',
				'type': 'Orion.Icon',
				'required': false,
				'desc': {
					'en': 'the prefix icon',
					'fr': 'définit l\'icône de préfixe',
				},
			}, {
				'name': 'readonly',
				'defaultValue': false,
				'type': 'boolean',
				'required': false,
				'desc': {
					'en': 'sets the field to read-only mode',
					'fr': 'définit le champ comme étant en lecture seule',
				},
			}, {
				'name': 'required',
				'defaultValue': false,
				'type': 'boolean',
				'required': false,
				'desc': {
					'en': 'sets the field required',
					'fr': 'indique que le champ est obligatoire',
				},
			}, {
				'name': 'selectOnFocus',
				'defaultValue': false,
				'type': 'boolean',
				'required': false,
				'desc': {
					'en': 'select the field content when focused.',
					'fr': 'sélectionne le contenu du champ lorsqu\'il est focus.',
				},
			}, {
				'name': 'size',
				'defaultValue': '\'md\'',
				'type': 'Orion.Size',
				'required': false,
				'sharedDefaultValue': '\'md\'',
				'desc': {
					'en': 'define the size',
					'fr': 'définit la taille',
				},
			}, {
				'name': 'suffixFontIcon',
				'type': 'string',
				'required': false,
				'desc': {
					'en': 'the suffix icon from the imported font library',
					'fr': 'Missing @doc',
				},
			}, {
				'name': 'suffixIcon',
				'type': 'Orion.Icon',
				'required': false,
				'desc': {
					'en': 'the suffix icon',
					'fr': 'définit l\'icône de suffixe',
				},
			}, {
				'name': 'type',
				'defaultValue': '\'text\'',
				'type': 'string | Orion.DatepickerType',
				'required': false,
				'desc': {
					'en': 'type of the input',
					'fr': 'type of the input',
				},
			}, {
				'name': 'validation',
				'defaultValue': 'undefined',
				'type': 'string | ((val: any) => boolean) | Orion.Validator.Rule | Orion.Validation.Rule | boolean',
				'required': false,
				'desc': {
					'en': 'the validation for the field',
					'fr': 'la validation du champ',
				},
			}, {
				'name': 'validationErrorMessage',
				'defaultValue': 'undefined',
				'type': 'string',
				'required': false,
				'desc': {
					'en': 'the error message displayed after input\'s validation.',
					'fr': 'le message d\'erreur affiché en cas d\'erreur lors de la validation',
				},
			}],
			publicInstance: [{
				'name': 'hasBeenFocus',
				'type': '() => boolean',
			}, {
				'name': 'isFocus',
				'type': '() => boolean',
			}, {
				'name': 'focus',
				'type': '() => void',
			}, {
				'name': 'blur',
				'type': 'Lodash.debounce',
			}, {
				'name': 'clear',
				'type': '() => void',
			}, {
				'name': 'setHasBeenFocus',
				'type': '(value: boolean) => void',
			}, {
				'name': 'isValid',
				'type': '() => boolean',
			}, {
				'name': '_el',
				'type': '() => HTMLElement | undefined',
			}],
		},
	],
	[
		'InputRange',
		{
			localTypes: {
				'VModelType': 'Nil<number[] | number>',
				'FieldEmit': '{\n  (e: \'focus\', payload: FocusEvent): void;\n  (e: \'blur\', payload?: FocusEvent): void;\n  (e: \'input\', payload: VModelType): void;\n  (e: \'change\', val?: VModelType): void;\n  (e: \'update:modelValue\', payload: VModelType): void;\n  (e: \'clear\'): void;\n}',
			},
			events: [{
				'name': 'focus',
				'payload': 'FocusEvent',
				'optional': false,
				'desc': {
					'en': 'emitted on focus',
					'fr': 'émis lors du focus',
				},
			}, {
				'name': 'blur',
				'payload': 'FocusEvent',
				'optional': true,
				'desc': {
					'en': 'emitted when the focus leaves the field',
					'fr': 'émis quand le focus quitte le champ',
				},
			}, {
				'name': 'input',
				'payload': 'VModelType',
				'optional': false,
				'desc': {
					'en': 'emitted when the value of the field changes',
					'fr': 'émis lorsque la valeur est modifiée',
				},
			}, {
				'name': 'change',
				'payload': 'VModelType',
				'optional': true,
				'desc': {
					'en': 'emitted when the value of the field changes',
					'fr': 'émis lorsque la valeur est modifiée',
				},
			}, {
				'name': 'update:modelValue',
				'payload': 'VModelType',
				'optional': false,
				'desc': {
					'en': 'emitted to update the field value',
					'fr': 'émis pour mettre à jour la valeur',
				},
			}, {
				'name': 'clear',
				'payload': 'undefined',
				'optional': false,
				'desc': {
					'en': 'emitted when the field is cleared',
					'fr': 'émis quand le champ est vidé',
				},
			}],
			provide: [],
			slots: [],
			props: [{
				'name': 'autofocus',
				'defaultValue': false,
				'type': 'boolean',
				'required': false,
				'desc': {
					'en': 'autofocus the field when mounted.',
					'fr': 'focus automatiquement le champ lorsqu\'il est monté.',
				},
			}, {
				'name': 'clearable',
				'defaultValue': false,
				'type': 'boolean',
				'required': false,
				'desc': {
					'en': 'defines if the field can be cleared.',
					'fr': 'définit si le champ peut être vidé.',
				},
			}, {
				'name': 'clearToNull',
				'defaultValue': false,
				'type': 'boolean',
				'required': false,
				'desc': {
					'en': 'sets the value to null when the field is cleared',
					'fr': 'lorsque que le champ est vidé, sa valeur vaut `null`',
				},
			}, {
				'name': 'color',
				'defaultValue': '\'default\'',
				'type': 'Orion.Color',
				'required': false,
				'sharedDefaultValue': '\'default\'',
				'desc': {
					'en': 'defines the color',
					'fr': 'définit la couleur',
				},
			}, {
				'name': 'disabled',
				'defaultValue': false,
				'type': 'boolean',
				'required': false,
				'desc': {
					'en': 'disables the field',
					'fr': 'désactive le champ',
				},
			}, {
				'name': 'donetyping',
				'defaultValue': '0',
				'type': 'number',
				'required': false,
				'desc': {
					'en': 'define the debounce duration before updating the value (useful for search field)',
					'fr': 'défini la durée du debounce avant de mettre à jour la valeur (utile pour les champs de recherche)',
				},
			}, {
				'name': 'forceLabelFloating',
				'defaultValue': false,
				'type': 'boolean',
				'required': false,
				'desc': {
					'en': 'allows floating label',
					'fr': 'permet au label de se placer au dessus du champ lorsqu\'il possède une valeur',
				},
			}, {
				'name': 'inheritValidationState',
				'defaultValue': 'undefined',
				'type': 'boolean',
				'required': false,
				'desc': {
					'en': 'defines if the validation comes from its parent',
					'fr': 'définit si la validation provient du parent',
				},
			}, {
				'name': 'label',
				'defaultValue': 'undefined',
				'type': 'string',
				'required': false,
				'desc': {
					'en': 'label of the field',
					'fr': 'le label du champ',
				},
			}, {
				'name': 'maxValue',
				'defaultValue': '100',
				'type': 'number',
				'required': false,
				'desc': {
					'en': 'maximum value of the input range',
					'fr': 'valeur maximum qui peut être sélectionnée',
				},
			}, {
				'name': 'minValue',
				'defaultValue': '0',
				'type': 'number',
				'required': false,
				'desc': {
					'en': 'minimum value of the input range',
					'fr': 'valeur minimale qui peut être sélectionnée',
				},
			}, {
				'name': 'modelValue',
				'type': 'T',
				'required': false,
				'desc': {
					'en': 'modelValue of the component',
					'fr': 'modelValue du composant',
				},
			}, {
				'name': 'prefixFontIcon',
				'type': 'string',
				'required': false,
				'desc': {
					'en': 'the prefix icon from the imported font library',
					'fr': 'définit l\'icône de préfixe à partir de la librairie de police importée',
				},
			}, {
				'name': 'prefixIcon',
				'type': 'Orion.Icon',
				'required': false,
				'desc': {
					'en': 'the prefix icon',
					'fr': 'définit l\'icône de préfixe',
				},
			}, {
				'name': 'readonly',
				'defaultValue': false,
				'type': 'boolean',
				'required': false,
				'desc': {
					'en': 'sets the field to read-only mode',
					'fr': 'définit le champ comme étant en lecture seule',
				},
			}, {
				'name': 'required',
				'defaultValue': false,
				'type': 'boolean',
				'required': false,
				'desc': {
					'en': 'sets the field required',
					'fr': 'indique que le champ est obligatoire',
				},
			}, {
				'name': 'selectOnFocus',
				'defaultValue': false,
				'type': 'boolean',
				'required': false,
				'desc': {
					'en': 'select the field content when focused.',
					'fr': 'sélectionne le contenu du champ lorsqu\'il est focus.',
				},
			}, {
				'name': 'size',
				'defaultValue': '\'md\'',
				'type': 'Orion.Size',
				'required': false,
				'sharedDefaultValue': '\'md\'',
				'desc': {
					'en': 'define the size',
					'fr': 'définit la taille',
				},
			}, {
				'name': 'step',
				'defaultValue': '1',
				'type': 'number',
				'required': false,
				'desc': {
					'en': 'step of the slider',
					'fr': 'pas du curseur',
				},
			}, {
				'name': 'suffixFontIcon',
				'type': 'string',
				'required': false,
				'desc': {
					'en': 'the suffix icon from the imported font library',
					'fr': 'Missing @doc',
				},
			}, {
				'name': 'suffixIcon',
				'type': 'Orion.Icon',
				'required': false,
				'desc': {
					'en': 'the suffix icon',
					'fr': 'définit l\'icône de suffixe',
				},
			}, {
				'name': 'type',
				'defaultValue': '\'text\'',
				'type': 'string | Orion.DatepickerType',
				'required': false,
				'desc': {
					'en': 'type of the input',
					'fr': 'type of the input',
				},
			}, {
				'name': 'validation',
				'defaultValue': 'undefined',
				'type': 'string | ((val: any) => boolean) | Orion.Validator.Rule | Orion.Validation.Rule | boolean',
				'required': false,
				'desc': {
					'en': 'the validation for the field',
					'fr': 'la validation du champ',
				},
			}, {
				'name': 'validationErrorMessage',
				'defaultValue': 'undefined',
				'type': 'string',
				'required': false,
				'desc': {
					'en': 'the error message displayed after input\'s validation.',
					'fr': 'le message d\'erreur affiché en cas d\'erreur lors de la validation',
				},
			}],
			publicInstance: [{
				'name': 'hasBeenFocus',
				'type': '() => boolean',
			}, {
				'name': 'isFocus',
				'type': '() => boolean',
			}, {
				'name': 'focus',
				'type': '() => void',
			}, {
				'name': 'blur',
				'type': 'Lodash.debounce',
			}, {
				'name': 'clear',
				'type': '() => void',
			}, {
				'name': 'setHasBeenFocus',
				'type': '(value: boolean) => void',
			}, {
				'name': 'isValid',
				'type': '() => boolean',
			}, {
				'name': '_el',
				'type': '() => HTMLElement | undefined',
			}],
		},
	],
	[
		'Label',
		{
			localTypes: {},
			events: [],
			provide: [],
			slots: [{
				'name': 'default',
				'desc': {
					'en': 'the content of the label',
					'fr': 'contenu du label',
				},
				'bindings': [],
			}],
			props: [{
				'name': 'color',
				'defaultValue': '\'default\'',
				'type': 'Orion.ColorExtendedAndGreys',
				'required': false,
				'sharedDefaultValue': '\'default\'',
				'desc': {
					'en': 'defines the color',
					'fr': 'définit la couleur',
				},
			}, {
				'name': 'outline',
				'defaultValue': false,
				'type': 'boolean',
				'required': false,
				'desc': {
					'en': 'adds an outline style on the label',
					'fr': 'ajoute un contraste sur le label',
				},
			}, {
				'name': 'size',
				'defaultValue': '\'md\'',
				'type': 'Orion.Size',
				'required': false,
				'sharedDefaultValue': '\'md\'',
				'desc': {
					'en': 'define the size',
					'fr': 'définit la taille',
				},
			}],
			publicInstance: [{
				'name': '_el',
				'type': '() => HTMLElement | undefined',
			}],
		},
	],
	[
		'Layout',
		{
			localTypes: {},
			events: [],
			provide: [],
			slots: [{
				'name': 'nav-main-item-prepend',
				'desc': {
					'en': 'displays content before the main navigation',
					'fr': 'affiche du contenu avant la navigation principale',
				},
				'bindings': [],
			}, {
				'name': 'nav-main-item-append',
				'desc': {
					'en': 'displays content after the main navigation',
					'fr': 'affiche du contenu après la navigation principale',
				},
				'bindings': [],
			}, {
				'name': 'nav-top-left',
				'desc': {
					'en': 'displays content on the left part of the top navigation',
					'fr': 'affiche du contenu à gauche de la navitation du haut',
				},
				'bindings': [],
			}, {
				'name': 'nav-top-additional',
				'desc': {
					'en': 'displays additional content in the top navigation',
					'fr': 'affiche du contenu additionnel dans la navitation du haut',
				},
				'bindings': [],
			}, {
				'name': 'nav-top-right',
				'desc': {
					'en': 'displays content on the right part of the top navigation',
					'fr': 'affiche du contenu à droite de la navitation du haut',
				},
				'bindings': [],
			}, {
				'name': 'default',
				'desc': {
					'en': 'displays the main content of your application',
					'fr': 'affiche le contenu principal de votre application',
				},
				'bindings': [],
			}, {
				'name': 'footer',
				'desc': {
					'en': 'displays the footer content of your application',
					'fr': 'affiche le contenu du pied de page de votre application',
				},
				'bindings': [],
			}],
			props: [{
				'name': 'navMain',
				'defaultValue': 'undefined',
				'type': 'OrionNavMain.Props',
				'required': false,
				'desc': {
					'en': 'these props will be applied to the layout\'s `<o-nav-main>` component',
					'fr': 'ces props seront passées au composant `<o-nav-main>` du layout',
				},
			}, {
				'name': 'navTabs',
				'defaultValue': 'undefined',
				'type': 'OrionNavTabs.Props',
				'required': false,
				'desc': {
					'en': 'these props will be applied to the layout\'s `<o-nav-tabs>` component',
					'fr': 'ces props seront passées au composant `<o-nav-tabs>` du layout',
				},
			}, {
				'name': 'navTop',
				'defaultValue': 'undefined',
				'type': 'OrionNavTop.Props',
				'required': false,
				'desc': {
					'en': 'these props will be applied to the layout\'s `<o-nav-top>` component',
					'fr': 'ces props seront passées au composant `<o-nav-top>` du layout',
				},
			}],
			publicInstance: [{
				'name': '_el',
				'type': '() => HTMLElement | undefined',
			}],
		},
	],
	[
		'List',
		{
			localTypes: {},
			events: [{
				'name': 'update:page',
				'payload': 'Orion.ListPage',
				'optional': false,
				'desc': {
					'en': 'emitted to update the page of the list',
					'fr': 'émis pour mettre à jour l\'élément `page` de la liste',
				},
			}, {
				'name': 'update:selected',
				'payload': 'any[]',
				'optional': false,
				'desc': {
					'en': 'emitted to update the selected items',
					'fr': 'émis pour mettre à jour les éléments sélectionés',
				},
			}, {
				'name': 'clear-selection',
				'payload': 'undefined',
				'optional': false,
				'desc': {
					'en': 'emitted to clear the selected items',
					'fr': 'émis pour effacer la sélection des éléments',
				},
			}, {
				'name': 'paginate',
				'payload': 'number',
				'optional': false,
				'desc': {
					'en': 'emitted to update the page index of the list',
					'fr': 'émis pour mettre à jour l\'index de la liste',
				},
			}],
			provide: [],
			slots: [{
				'name': 'default',
				'desc': {
					'en': 'content of each item of the list',
					'fr': 'le contenu de chaque élément de la liste',
				},
				'bindings': [],
			}, {
				'name': 'default',
				'desc': {
					'en': 'content of each item of the list',
					'fr': 'le contenu de chaque élément de la liste',
				},
				'bindings': [],
			}, {
				'name': 'footer-selected-actions',
				'desc': {
					'en': 'actions displayed in the selection footer',
					'fr': 'actions affichées dans le footer de sélection',
				},
				'bindings': [],
			}],
			props: [{
				'name': 'bindRouter',
				'defaultValue': 'undefined',
				'type': 'string',
				'required': false,
				'desc': {
					'en': 'the key used in the url query to bind the current page to the pagination component (ex: ...url/my-list?**page**=2 • *bindRouter = **page***)',
					'fr': 'représente la clé utilisée dans l\'url pour binder la page courante au composant de pagination (ex: ...url/my-list?**page**=2 • *bindRouter = **page***)',
				},
			}, {
				'name': 'cellClass',
				'defaultValue': '\'col-sm-6 col-lg-4 col-xl-3\'',
				'type': 'string',
				'required': false,
				'desc': {
					'en': 'class applied to the list\'s cells when the layout is `grid`',
					'fr': 'classe appliquée aux cellules de la liste quand la disposition est sous forme de `grid`',
				},
			}, {
				'name': 'gridClass',
				'defaultValue': '\'row row--grid\'',
				'type': 'string',
				'required': false,
				'desc': {
					'en': 'class applied to the list when the layout is `grid`',
					'fr': 'classe appliquée à la liste quand la disposition est sous forme de `grid`',
				},
			}, {
				'name': 'itemAdjective',
				'defaultValue': 'undefined',
				'type': 'string',
				'required': false,
				'desc': {
					'en': 'the adjective used for the item selection (to customize the selection footer)',
					'fr': 'l\'adjectif utilisé pour les élements sélectionnés (pour personnaliser le footer de sélection)',
				},
			}, {
				'name': 'itemType',
				'defaultValue': 'undefined',
				'type': 'string',
				'required': false,
				'desc': {
					'en': 'item type of the list (to customize the selection footer)',
					'fr': 'type d\'élément de la liste (pour personnaliser le footer de sélection)',
				},
			}, {
				'name': 'layout',
				'defaultValue': '\'grid\'',
				'type': '\'grid\' | \'row\'',
				'required': false,
				'desc': {
					'en': 'layout of the list',
					'fr': 'disposition de la liste',
				},
			}, {
				'name': 'list',
				'defaultValue': '(): any[] => []',
				'type': 'any[]',
				'required': false,
				'desc': {
					'en': 'items of the list',
					'fr': 'élements de la liste',
				},
			}, {
				'name': 'page',
				'defaultValue': '(): Orion.ListPage => ({\n\t\t\t\tsize: 20,\n\t\t\t\tindex: 1,\n\t\t\t})',
				'type': 'Orion.ListPage',
				'required': false,
				'desc': {
					'en': 'configuration of the list\'s pagination (size: number of items per page, index: current page)',
					'fr': 'configuration de la pagination de la liste (size: nombre d\'éléments par page, index: page actuelle)',
				},
			}, {
				'name': 'selected',
				'defaultValue': '(): any[] => []',
				'type': 'any[]',
				'required': false,
				'desc': {
					'en': 'array of the selected items',
					'fr': 'tableau contenant les élements sélectionnés',
				},
			}, {
				'name': 'total',
				'defaultValue': '0',
				'type': 'number',
				'required': false,
				'desc': {
					'en': 'total number of items in the list',
					'fr': 'nombre total d\'éléments dans la liste',
				},
			}, {
				'name': 'trackKey',
				'defaultValue': '\'id\'',
				'type': 'string',
				'required': false,
				'desc': {
					'en': 'determine the `key` used for the v-for in the list loop',
					'fr': 'détermine la `key` utilisée pour le v-for dans la boucle de la liste',
				},
			}, {
				'name': 'useAutoPagination',
				'defaultValue': false,
				'type': 'boolean',
				'required': false,
				'desc': {
					'en': 'use OrionList\'s pagination system. Useful if you pass the full list in props',
					'fr': 'utilise le système de pagination d\'OrionList. Utile si vous pasez la liste compl!te en props',
				},
			}, {
				'name': 'useFooterSelected',
				'defaultValue': 'true',
				'type': 'boolean',
				'required': false,
				'desc': {
					'en': 'displays a footer when any items of the list are selected (useful for batch action on selected items)',
					'fr': 'affiche un pied de page quand des éléments de la liste sont sélectionnés (utile en cas d\'action groupée sur les éléments sélectionnés)',
				},
			}, {
				'name': 'usePaginationBottom',
				'defaultValue': 'true',
				'type': 'boolean',
				'required': false,
				'desc': {
					'en': 'displays pagination at the bottom of the list',
					'fr': 'affiche une pagination en bas de la liste',
				},
			}, {
				'name': 'usePaginationTop',
				'defaultValue': 'true',
				'type': 'boolean',
				'required': false,
				'desc': {
					'en': 'displays pagination at the top of the list',
					'fr': 'affiche une pagination en haut de la liste',
				},
			}],
			publicInstance: [{
				'name': '_el',
				'type': '() => HTMLElement | undefined',
			}],
		},
	],
	[
		'Loader',
		{
			localTypes: {},
			events: [],
			provide: [],
			slots: [],
			props: [{
				'name': 'color',
				'defaultValue': '\'brand\'',
				'type': 'Orion.Color',
				'required': false,
				'sharedDefaultValue': '\'default\'',
				'desc': {
					'en': 'defines the color',
					'fr': 'définit la couleur',
				},
			}, {
				'name': 'global',
				'defaultValue': false,
				'type': 'boolean',
				'required': false,
				'desc': {
					'en': 'displays a fullpage loader',
					'fr': 'affiche un loader sur toute la page',
				},
			}, {
				'name': 'message',
				'defaultValue': 'undefined',
				'type': 'string',
				'required': false,
				'desc': {
					'en': 'message under the loader',
					'fr': 'message qui apparaît sous l\'icône de chargement',
				},
			}, {
				'name': 'size',
				'defaultValue': '\'md\'',
				'type': 'Orion.Size',
				'required': false,
				'sharedDefaultValue': '\'md\'',
				'desc': {
					'en': 'define the size',
					'fr': 'définit la taille',
				},
			}, {
				'name': 'visible',
				'defaultValue': false,
				'type': 'boolean',
				'required': false,
				'desc': {
					'en': 'if set, shows the loader',
					'fr': 'si défini, affiche le loader',
				},
			}],
			publicInstance: [{
				'name': 'show',
				'type': '(newText?: string | undefined) => void',
			}, {
				'name': 'hide',
				'type': '() => void',
			}, {
				'name': '_el',
				'type': '() => HTMLElement | undefined',
			}],
		},
	],
	[
		'Modal',
		{
			localTypes: { 'ModalEmit': '{\n\t(e: \'enter-start\'): void;\n\t(e: \'enter-end\'): void;\n\t(e: \'leave-start\'): void;\n\t(e: \'leave-end\'): void;\n\t(e: \'cancel\'): void;\n\t(e: \'confirm\'): void;\n}' },
			events: [{
				'name': 'enter-start',
				'payload': 'undefined',
				'optional': false,
				'desc': {
					'en': 'the modal begins its enter transition',
					'fr': 'la modal commence sa transition d\'arrivée',
				},
			}, {
				'name': 'enter-end',
				'payload': 'undefined',
				'optional': false,
				'desc': {
					'en': 'the modal ends its enter transition',
					'fr': 'la modal a fini sa transition d\'entrée',
				},
			}, {
				'name': 'leave-start',
				'payload': 'undefined',
				'optional': false,
				'desc': {
					'en': 'the modal begins its leave transition',
					'fr': 'la modal commence sa transition de départ',
				},
			}, {
				'name': 'leave-end',
				'payload': 'undefined',
				'optional': false,
				'desc': {
					'en': 'the modal ends its leave transition',
					'fr': 'la modal a fini sa tansition de départ',
				},
			}, {
				'name': 'cancel',
				'payload': 'undefined',
				'optional': false,
				'desc': {
					'en': 'Missing @doc',
					'fr': 'Missing @doc',
				},
			}, {
				'name': 'confirm',
				'payload': 'undefined',
				'optional': false,
				'desc': {
					'en': 'Missing @doc',
					'fr': 'Missing @doc',
				},
			}],
			provide: [{
				'name': '_modal',
				'data': 'publicInstance',
			}],
			slots: [{
				'name': 'footer',
				'desc': {
					'en': 'the content on the bottom, useful for actions',
					'fr': 'contenu en bas, pratique pour les actions',
				},
				'bindings': [{
					'bind': 'close',
					'type': '() => void',
					'desc': {
						'en': 'to close the modal',
						'fr': 'fonction pour fermer la modal',
					},
				}],
			}, {
				'name': 'default',
				'desc': {
					'en': 'the content of the modal',
					'fr': 'contenu de la modal',
				},
				'bindings': [{
					'bind': 'close',
					'type': '() => void',
					'desc': {
						'en': 'to close the modal',
						'fr': 'fonction pour fermer la modal',
					},
				}],
			}],
			props: [{
				'name': 'display',
				'defaultValue': false,
				'type': 'boolean',
				'required': false,
				'desc': {
					'en': 'if set, displays the component',
					'fr': 'Missing @doc',
				},
			}, {
				'name': 'options',
				'defaultValue': '() => {}',
				'type': 'Partial<Orion.Modal.Options>',
				'required': false,
				'desc': {
					'en': 'options of the modal',
					'fr': 'options de la modal',
				},
			}],
			publicInstance: [{
				'name': 'slotFooter',
				'type': 'string',
			}, {
				'name': '_loader',
				'type': '() => OrionLoader',
			}, {
				'name': 'uid',
				'type': 'number',
			}, {
				'name': 'bus',
				'type': 'Bus',
			}, {
				'name': 'state',
				'type': '{\n\tisClosing: boolean;\n\tisOpening: boolean;\n\tisMounted: boolean;\n\tvisible: boolean;\n}',
			}, {
				'name': 'options',
				'type': 'Orion.Popable.Options',
			}, {
				'name': 'open',
				'type': '(keepInQueue?: boolean) => Promise<void>',
			}, {
				'name': 'close',
				'type': '(options?: Orion.Popable.CloseOptions | undefined) => Promise<void>',
			}, {
				'name': 'trigger',
				'type': '(eventName: string, params?: any) => void',
			}, {
				'name': 'animateAsync',
				'type': '(enter: boolean) => Promise<void>',
			}, {
				'name': 'removeProgrammatic',
				'type': '() => void',
			}, {
				'name': 'isLastOpenedPopable',
				'type': '() => boolean',
			}, {
				'name': '_el',
				'type': '() => HTMLElement | undefined',
			}],
		},
	],
	[
		'Notif',
		{
			localTypes: { 'NotifEmit': '{\n\t(e: \'enter-start\'): void,\n\t(e: \'enter-end\'): void,\n\t(e: \'leave-start\'): void,\n\t(e: \'leave-end\'): void,\n}' },
			events: [{
				'name': 'enter-start',
				'payload': 'undefined',
				'optional': false,
				'desc': {
					'en': 'the notification begins its enter transition',
					'fr': 'Missing @doc',
				},
			}, {
				'name': 'enter-end',
				'payload': 'undefined',
				'optional': false,
				'desc': {
					'en': 'the notification ends its enter transition',
					'fr': 'Missing @doc',
				},
			}, {
				'name': 'leave-start',
				'payload': 'undefined',
				'optional': false,
				'desc': {
					'en': 'the notification begins its leave transition',
					'fr': 'Missing @doc',
				},
			}, {
				'name': 'leave-end',
				'payload': 'undefined',
				'optional': false,
				'desc': {
					'en': 'the notification ends its leave transition',
					'fr': 'Missing @doc',
				},
			}],
			provide: [{
				'name': '_notif',
				'data': 'publicInstance',
			}],
			slots: [],
			props: [{
				'name': 'display',
				'defaultValue': false,
				'type': 'boolean',
				'required': false,
				'desc': {
					'en': 'if set, displays the component',
					'fr': 'Missing @doc',
				},
			}, {
				'name': 'options',
				'defaultValue': '() => {}',
				'type': 'Partial<Orion.Notif.Options>',
				'required': false,
				'desc': {
					'en': 'options of the notification',
					'fr': 'Missing @doc',
				},
			}],
			publicInstance: [{
				'name': 'resetTimer',
				'type': '() => void',
			}, {
				'name': '_loader',
				'type': '() => OrionLoader',
			}, {
				'name': 'uid',
				'type': 'number',
			}, {
				'name': 'bus',
				'type': 'Bus',
			}, {
				'name': 'state',
				'type': '{\n\tisClosing: boolean;\n\tisOpening: boolean;\n\tisMounted: boolean;\n\tvisible: boolean;\n}',
			}, {
				'name': 'options',
				'type': 'Orion.Popable.Options',
			}, {
				'name': 'open',
				'type': '(keepInQueue?: boolean) => Promise<void>',
			}, {
				'name': 'close',
				'type': '(options?: Orion.Popable.CloseOptions | undefined) => Promise<void>',
			}, {
				'name': 'trigger',
				'type': '(eventName: string, params?: any) => void',
			}, {
				'name': 'animateAsync',
				'type': '(enter: boolean) => Promise<void>',
			}, {
				'name': 'removeProgrammatic',
				'type': '() => void',
			}, {
				'name': 'isLastOpenedPopable',
				'type': '() => boolean',
			}, {
				'name': '_el',
				'type': '() => HTMLElement | undefined',
			}],
		},
	],
	[
		'Otp',
		{
			localTypes: { 'Emits': '{(e: \'filled\', val: string): void}' },
			events: [{
				'name': 'filled',
				'payload': 'string',
				'optional': false,
				'desc': {
					'en': 'emitted when the code is completed',
					'fr': 'émis lorsque le code est complété',
				},
			}],
			provide: [],
			slots: [],
			props: [{
				'name': 'dataType',
				'defaultValue': '\'text\'',
				'type': '\'number\' | \'text\'',
				'required': false,
				'desc': {
					'en': 'defines the type of the code',
					'fr': 'definit le type du code',
				},
			}, {
				'name': 'readonly',
				'defaultValue': false,
				'type': 'boolean',
				'required': false,
				'desc': {
					'en': 'if set, the code will be on read-only mode',
					'fr': 'si défini, le code sera en mode read-only',
				},
			}, {
				'name': 'size',
				'defaultValue': '4',
				'type': 'number',
				'required': false,
				'desc': {
					'en': 'defines the size of the code',
					'fr': 'définit la taille du code',
				},
			}, {
				'name': 'value',
				'defaultValue': 'undefined',
				'type': 'string',
				'required': false,
				'desc': {
					'en': 'the string value of the code, if it is prefilled',
					'fr': 'valeur du code sous forme de chaîne de caractères, s\'il est pré-rempli',
				},
			}],
			publicInstance: [{
				'name': 'reset',
				'type': '() => void',
			}, {
				'name': 'focus',
				'type': '() => void',
			}, {
				'name': 'code',
				'type': '() => Code',
			}, {
				'name': 'readableCode',
				'type': '() => string',
			}, {
				'name': '_el',
				'type': '() => HTMLElement | undefined',
			}],
		},
	],
	[
		'Overlay',
		{
			localTypes: {},
			events: [],
			provide: [],
			slots: [],
			props: [{
				'name': 'global',
				'defaultValue': false,
				'type': 'boolean',
				'required': false,
				'desc': {
					'en': 'defines if the overlay is fullpage',
					'fr': 'Missing @doc',
				},
			}],
			publicInstance: [{
				'name': 'show',
				'type': '() => void',
			}, {
				'name': 'hide',
				'type': '() => void',
			}, {
				'name': '_el',
				'type': '() => HTMLElement | undefined',
			}],
		},
	],
	[
		'Page',
		{
			localTypes: {},
			events: [],
			provide: [],
			slots: [{
				'name': 'actions',
				'desc': {
					'en': 'actions of the page, on the top right',
					'fr': 'actions de la page, situées en haut à droite',
				},
				'bindings': [],
			}, {
				'name': 'subactions',
				'desc': {
					'en': 'secondary actions, below the main actions',
					'fr': 'actions secondaires, placées en dessous des actions principales',
				},
				'bindings': [],
			}, {
				'name': 'default',
				'desc': {
					'en': 'the content of the page',
					'fr': 'contenu de la page',
				},
				'bindings': [],
			}],
			props: [{
				'name': 'stickySubactions',
				'defaultValue': false,
				'type': 'boolean',
				'required': false,
				'desc': {
					'en': 'make the subactions div sticky when scrolling for easy access',
					'fr': 'rend les actions secondaires sticky lors du scroll pour y faciliter l\'accès',
				},
			}, {
				'name': 'subtitle',
				'defaultValue': 'undefined',
				'type': 'string',
				'required': false,
				'desc': {
					'en': 'subtitle of the page',
					'fr': 'sous-titre de la page',
				},
			}, {
				'name': 'subtitleEllipsis',
				'defaultValue': false,
				'type': 'boolean',
				'required': false,
				'desc': {
					'en': 'adds an ellipsis on the subtitle if it is too long',
					'fr': 'aajoute une ellipse au niveau du sous-titre s\'il est trop long',
				},
			}, {
				'name': 'title',
				'defaultValue': 'undefined',
				'type': 'string',
				'required': false,
				'desc': {
					'en': 'title of the page',
					'fr': 'titre de la page',
				},
			}, {
				'name': 'titleEllipsis',
				'defaultValue': false,
				'type': 'boolean',
				'required': false,
				'desc': {
					'en': 'adds an ellipsis on the title if the title is too long',
					'fr': 'ajoute une ellipse au niveau du titre s\'il est trop long',
				},
			}],
			publicInstance: [{
				'name': '_el',
				'type': '() => HTMLElement | undefined',
			}],
		},
	],
	[
		'Paginate',
		{
			localTypes: {},
			events: [{
				'name': 'update:modelValue',
				'payload': 'number',
				'optional': false,
				'desc': {
					'en': 'emitted to update the active page index',
					'fr': 'émis pour mettre à jour l\'index de la page active',
				},
			}, {
				'name': 'paginate',
				'payload': 'number',
				'optional': false,
				'desc': {
					'en': 'emitted on page changement',
					'fr': 'émis au changement de page',
				},
			}],
			provide: [],
			slots: [],
			props: [{
				'name': 'bindRouter',
				'defaultValue': 'undefined',
				'type': 'string',
				'required': false,
				'desc': {
					'en': 'the key used in the url query to get the current active page (ex: ...url/my-list?**page**=2 • *bindRouter = **page***)',
					'fr': 'représente la clé utilisée dans l\'url pour déterminer la page active actuelle (ex: ...url/my-list?**page**=2 • *bindRouter = **page***)',
				},
			}, {
				'name': 'modelValue',
				'type': 'number',
				'required': true,
				'desc': {
					'en': 'active page index',
					'fr': 'index de la page active',
				},
			}, {
				'name': 'size',
				'type': 'number',
				'required': true,
				'desc': {
					'en': 'number of elements to display on each page',
					'fr': 'nombre d\'éléments à afficher sur chaque page',
				},
			}, {
				'name': 'total',
				'type': 'number',
				'required': true,
				'desc': {
					'en': 'total number of element which are paginated',
					'fr': 'nombre total d\'éléments',
				},
			}],
			publicInstance: [{
				'name': '_el',
				'type': '() => HTMLElement | undefined',
			}],
		},
	],
	[
		'Password',
		{
			localTypes: {
				'VModelType': 'Nil<string>',
				'FieldEmit': '{\n  (e: \'focus\', payload: FocusEvent): void;\n  (e: \'blur\', payload?: FocusEvent): void;\n  (e: \'input\', payload: VModelType): void;\n  (e: \'change\', val?: VModelType): void;\n  (e: \'update:modelValue\', payload: VModelType): void;\n  (e: \'clear\'): void;\n}',
			},
			events: [{
				'name': 'focus',
				'payload': 'FocusEvent',
				'optional': false,
				'desc': {
					'en': 'emitted on focus',
					'fr': 'émis lors du focus',
				},
			}, {
				'name': 'blur',
				'payload': 'FocusEvent',
				'optional': true,
				'desc': {
					'en': 'emitted when the focus leaves the field',
					'fr': 'émis quand le focus quitte le champ',
				},
			}, {
				'name': 'input',
				'payload': 'VModelType',
				'optional': false,
				'desc': {
					'en': 'emitted when the value of the field changes',
					'fr': 'émis lorsque la valeur est modifiée',
				},
			}, {
				'name': 'change',
				'payload': 'VModelType',
				'optional': true,
				'desc': {
					'en': 'emitted when the value of the field changes',
					'fr': 'émis lorsque la valeur est modifiée',
				},
			}, {
				'name': 'update:modelValue',
				'payload': 'VModelType',
				'optional': false,
				'desc': {
					'en': 'emitted to update the field value',
					'fr': 'émis pour mettre à jour la valeur',
				},
			}, {
				'name': 'clear',
				'payload': 'undefined',
				'optional': false,
				'desc': {
					'en': 'emitted when the field is cleared',
					'fr': 'émis quand le champ est vidé',
				},
			}],
			provide: [],
			slots: [],
			props: [{
				'name': 'autofocus',
				'defaultValue': false,
				'type': 'boolean',
				'required': false,
				'desc': {
					'en': 'autofocus the field when mounted.',
					'fr': 'focus automatiquement le champ lorsqu\'il est monté.',
				},
			}, {
				'name': 'clearable',
				'defaultValue': false,
				'type': 'boolean',
				'required': false,
				'desc': {
					'en': 'defines if the field can be cleared.',
					'fr': 'définit si le champ peut être vidé.',
				},
			}, {
				'name': 'clearToNull',
				'defaultValue': false,
				'type': 'boolean',
				'required': false,
				'desc': {
					'en': 'sets the value to null when the field is cleared',
					'fr': 'lorsque que le champ est vidé, sa valeur vaut `null`',
				},
			}, {
				'name': 'disabled',
				'defaultValue': false,
				'type': 'boolean',
				'required': false,
				'desc': {
					'en': 'disables the field',
					'fr': 'désactive le champ',
				},
			}, {
				'name': 'donetyping',
				'defaultValue': '0',
				'type': 'number',
				'required': false,
				'desc': {
					'en': 'define the debounce duration before updating the value (useful for search field)',
					'fr': 'défini la durée du debounce avant de mettre à jour la valeur (utile pour les champs de recherche)',
				},
			}, {
				'name': 'forceLabelFloating',
				'defaultValue': false,
				'type': 'boolean',
				'required': false,
				'desc': {
					'en': 'allows floating label',
					'fr': 'permet au label de se placer au dessus du champ lorsqu\'il possède une valeur',
				},
			}, {
				'name': 'inheritValidationState',
				'defaultValue': 'undefined',
				'type': 'boolean',
				'required': false,
				'desc': {
					'en': 'defines if the validation comes from its parent',
					'fr': 'définit si la validation provient du parent',
				},
			}, {
				'name': 'label',
				'defaultValue': 'undefined',
				'type': 'string',
				'required': false,
				'desc': {
					'en': 'label of the field',
					'fr': 'le label du champ',
				},
			}, {
				'name': 'modelValue',
				'type': 'T',
				'required': false,
				'desc': {
					'en': 'modelValue of the component',
					'fr': 'modelValue du composant',
				},
			}, {
				'name': 'passwordToConfirm',
				'defaultValue': 'undefined',
				'type': 'Undef<string | boolean>',
				'required': false,
				'desc': {
					'en': 'if specified, checks the match with the password value',
					'fr': 'si spécifié, vérifie la correspondance avec le champ de mot de passe dans le cas d\'une confirmation',
				},
			}, {
				'name': 'passwordTooltip',
				'defaultValue': false,
				'type': 'boolean',
				'required': false,
				'desc': {
					'en': 'shows the tooltip with the password\'s rules',
					'fr': 'affiche la une tooltip avec les règles à respecter',
				},
			}, {
				'name': 'prefixFontIcon',
				'type': 'string',
				'required': false,
				'desc': {
					'en': 'the prefix icon from the imported font library',
					'fr': 'définit l\'icône de préfixe à partir de la librairie de police importée',
				},
			}, {
				'name': 'prefixIcon',
				'type': 'Orion.Icon',
				'required': false,
				'desc': {
					'en': 'the prefix icon',
					'fr': 'définit l\'icône de préfixe',
				},
			}, {
				'name': 'readonly',
				'defaultValue': false,
				'type': 'boolean',
				'required': false,
				'desc': {
					'en': 'sets the field to read-only mode',
					'fr': 'définit le champ comme étant en lecture seule',
				},
			}, {
				'name': 'required',
				'defaultValue': false,
				'type': 'boolean',
				'required': false,
				'desc': {
					'en': 'sets the field required',
					'fr': 'indique que le champ est obligatoire',
				},
			}, {
				'name': 'selectOnFocus',
				'defaultValue': false,
				'type': 'boolean',
				'required': false,
				'desc': {
					'en': 'select the field content when focused.',
					'fr': 'sélectionne le contenu du champ lorsqu\'il est focus.',
				},
			}, {
				'name': 'size',
				'defaultValue': '\'md\'',
				'type': 'Orion.Size',
				'required': false,
				'sharedDefaultValue': '\'md\'',
				'desc': {
					'en': 'define the size',
					'fr': 'définit la taille',
				},
			}, {
				'name': 'suffixFontIcon',
				'type': 'string',
				'required': false,
				'desc': {
					'en': 'the suffix icon from the imported font library',
					'fr': 'Missing @doc',
				},
			}, {
				'name': 'suffixIcon',
				'type': 'Orion.Icon',
				'required': false,
				'desc': {
					'en': 'the suffix icon',
					'fr': 'définit l\'icône de suffixe',
				},
			}, {
				'name': 'type',
				'defaultValue': '\'password\'',
				'type': 'string',
				'required': false,
				'desc': {
					'en': 'type of the input',
					'fr': 'type du champ',
				},
			}, {
				'name': 'validation',
				'defaultValue': 'undefined',
				'type': 'string | ((val: any) => boolean) | Orion.Validator.Rule | Orion.Validation.Rule | boolean',
				'required': false,
				'desc': {
					'en': 'the validation for the field',
					'fr': 'la validation du champ',
				},
			}, {
				'name': 'validationErrorMessage',
				'defaultValue': 'undefined',
				'type': 'string',
				'required': false,
				'desc': {
					'en': 'the error message displayed after input\'s validation.',
					'fr': 'le message d\'erreur affiché en cas d\'erreur lors de la validation',
				},
			}],
			publicInstance: [{
				'name': 'hasBeenFocus',
				'type': '() => boolean',
			}, {
				'name': 'isFocus',
				'type': '() => boolean',
			}, {
				'name': 'focus',
				'type': '() => void',
			}, {
				'name': 'blur',
				'type': 'Lodash.debounce',
			}, {
				'name': 'clear',
				'type': '() => void',
			}, {
				'name': 'setHasBeenFocus',
				'type': '(value: boolean) => void',
			}, {
				'name': 'isValid',
				'type': '() => boolean',
			}, {
				'name': '_el',
				'type': '() => HTMLElement | undefined',
			}],
		},
	],
	[
		'Phone',
		{
			localTypes: {
				'VModelType': 'Nil<{\n  phoneNumber: Nil<string>;\n  phoneCountryCode: Nil<Orion.Country[\'code\']>;\n}>',
				'OrionPhoneEmit': '{\n  (e: \'focus\', payload: FocusEvent): void;\n  (e: \'blur\', payload?: FocusEvent): void;\n  (e: \'input\', payload: VModelType): void;\n  (e: \'change\', val?: VModelType): void;\n  (e: \'update:modelValue\', payload: VModelType): void;\n  (e: \'update:phoneNumber\', payload?: string): void;\n  (e: \'update:phoneCountryCode\', payload?: Orion.Country[\'code\']): void;\n  (e: \'clear\'): void;\n}',
			},
			events: [{
				'name': 'focus',
				'payload': 'FocusEvent',
				'optional': false,
				'desc': {
					'en': 'emitted on focus',
					'fr': 'émis lors du focus',
				},
			}, {
				'name': 'blur',
				'payload': 'FocusEvent',
				'optional': true,
				'desc': {
					'en': 'emitted when the focus leaves the field',
					'fr': 'émis quand le focus quitte le champ',
				},
			}, {
				'name': 'input',
				'payload': 'VModelType',
				'optional': false,
				'desc': {
					'en': 'emitted when the value of the field changes',
					'fr': 'émis lorsque la valeur est modifiée',
				},
			}, {
				'name': 'change',
				'payload': 'VModelType',
				'optional': true,
				'desc': {
					'en': 'emitted when the value of the field changes',
					'fr': 'émis lorsque la valeur est modifiée',
				},
			}, {
				'name': 'update:modelValue',
				'payload': 'VModelType',
				'optional': false,
				'desc': {
					'en': 'emitted to update the field value',
					'fr': 'émis pour mettre à jour la valeur',
				},
			}, {
				'name': 'update:phoneNumber',
				'payload': 'string',
				'optional': true,
				'desc': {
					'en': 'Missing @doc',
					'fr': 'Missing @doc',
				},
			}, {
				'name': 'update:phoneCountryCode',
				'payload': 'Orion.Country[\'code\']',
				'optional': true,
				'desc': {
					'en': 'Missing @doc',
					'fr': 'Missing @doc',
				},
			}, {
				'name': 'clear',
				'payload': 'undefined',
				'optional': false,
				'desc': {
					'en': 'emitted when the field is cleared',
					'fr': 'émis quand le champ est vidé',
				},
			}],
			provide: [],
			slots: [],
			props: [{
				'name': 'autofocus',
				'defaultValue': false,
				'type': 'boolean',
				'required': false,
				'desc': {
					'en': 'autofocus the field when mounted.',
					'fr': 'focus automatiquement le champ lorsqu\'il est monté.',
				},
			}, {
				'name': 'clearable',
				'defaultValue': false,
				'type': 'boolean',
				'required': false,
				'desc': {
					'en': 'defines if the field can be cleared.',
					'fr': 'définit si le champ peut être vidé.',
				},
			}, {
				'name': 'clearToNull',
				'defaultValue': false,
				'type': 'boolean',
				'required': false,
				'desc': {
					'en': 'sets the value to null when the field is cleared',
					'fr': 'lorsque que le champ est vidé, sa valeur vaut `null`',
				},
			}, {
				'name': 'disabled',
				'defaultValue': false,
				'type': 'boolean',
				'required': false,
				'desc': {
					'en': 'disables the field',
					'fr': 'désactive le champ',
				},
			}, {
				'name': 'donetyping',
				'defaultValue': '0',
				'type': 'number',
				'required': false,
				'desc': {
					'en': 'define the debounce duration before updating the value (useful for search field)',
					'fr': 'défini la durée du debounce avant de mettre à jour la valeur (utile pour les champs de recherche)',
				},
			}, {
				'name': 'forceLabelFloating',
				'defaultValue': false,
				'type': 'boolean',
				'required': false,
				'desc': {
					'en': 'allows floating label',
					'fr': 'permet au label de se placer au dessus du champ lorsqu\'il possède une valeur',
				},
			}, {
				'name': 'inheritValidationState',
				'defaultValue': 'undefined',
				'type': 'boolean',
				'required': false,
				'desc': {
					'en': 'defines if the validation comes from its parent',
					'fr': 'définit si la validation provient du parent',
				},
			}, {
				'name': 'label',
				'defaultValue': 'undefined',
				'type': 'string',
				'required': false,
				'desc': {
					'en': 'label of the field',
					'fr': 'le label du champ',
				},
			}, {
				'name': 'mobile',
				'defaultValue': false,
				'type': 'boolean',
				'required': false,
				'desc': {
					'en': 'defines if the number is a mobile phone',
					'fr': 'définit si le numéro correspond à un portable',
				},
			}, {
				'name': 'modelValue',
				'type': 'T',
				'required': false,
				'desc': {
					'en': 'modelValue of the component',
					'fr': 'modelValue du composant',
				},
			}, {
				'name': 'phoneCountryCode',
				'defaultValue': 'undefined',
				'type': 'string',
				'required': false,
				'desc': {
					'en': 'the country code string, isolated from its parent object',
					'fr': 'le code pays, isolé de son objet parent',
				},
			}, {
				'name': 'phoneNumber',
				'defaultValue': 'undefined',
				'type': 'string',
				'required': false,
				'desc': {
					'en': 'the phoneNumber string, isolated from its parent object',
					'fr': 'le numéro de téléphone, isolé de son objet parent',
				},
			}, {
				'name': 'prefixFontIcon',
				'type': 'string',
				'required': false,
				'desc': {
					'en': 'the prefix icon from the imported font library',
					'fr': 'définit l\'icône de préfixe à partir de la librairie de police importée',
				},
			}, {
				'name': 'prefixIcon',
				'type': 'Orion.Icon',
				'required': false,
				'desc': {
					'en': 'the prefix icon',
					'fr': 'définit l\'icône de préfixe',
				},
			}, {
				'name': 'readonly',
				'defaultValue': false,
				'type': 'boolean',
				'required': false,
				'desc': {
					'en': 'sets the field to read-only mode',
					'fr': 'définit le champ comme étant en lecture seule',
				},
			}, {
				'name': 'required',
				'defaultValue': false,
				'type': 'boolean',
				'required': false,
				'desc': {
					'en': 'sets the field required',
					'fr': 'indique que le champ est obligatoire',
				},
			}, {
				'name': 'selectOnFocus',
				'defaultValue': false,
				'type': 'boolean',
				'required': false,
				'desc': {
					'en': 'select the field content when focused.',
					'fr': 'sélectionne le contenu du champ lorsqu\'il est focus.',
				},
			}, {
				'name': 'size',
				'defaultValue': '\'md\'',
				'type': 'Orion.Size',
				'required': false,
				'sharedDefaultValue': '\'md\'',
				'desc': {
					'en': 'define the size',
					'fr': 'définit la taille',
				},
			}, {
				'name': 'suffixFontIcon',
				'type': 'string',
				'required': false,
				'desc': {
					'en': 'the suffix icon from the imported font library',
					'fr': 'Missing @doc',
				},
			}, {
				'name': 'suffixIcon',
				'type': 'Orion.Icon',
				'required': false,
				'desc': {
					'en': 'the suffix icon',
					'fr': 'définit l\'icône de suffixe',
				},
			}, {
				'name': 'type',
				'defaultValue': '\'tel\'',
				'type': 'string',
				'required': false,
				'desc': {
					'en': 'the type of the input',
					'fr': 'type du champ',
				},
			}, {
				'name': 'validation',
				'defaultValue': 'undefined',
				'type': 'string | ((val: any) => boolean) | Orion.Validator.Rule | Orion.Validation.Rule | boolean',
				'required': false,
				'desc': {
					'en': 'the validation for the field',
					'fr': 'la validation du champ',
				},
			}, {
				'name': 'validationErrorMessage',
				'defaultValue': 'undefined',
				'type': 'string',
				'required': false,
				'desc': {
					'en': 'the error message displayed after input\'s validation.',
					'fr': 'le message d\'erreur affiché en cas d\'erreur lors de la validation',
				},
			}],
			publicInstance: [{
				'name': 'hasBeenFocus',
				'type': '() => boolean',
			}, {
				'name': 'isFocus',
				'type': '() => boolean',
			}, {
				'name': 'focus',
				'type': '() => void',
			}, {
				'name': 'blur',
				'type': 'Lodash.debounce',
			}, {
				'name': 'clear',
				'type': '() => void',
			}, {
				'name': 'setHasBeenFocus',
				'type': '(value: boolean) => void',
			}, {
				'name': 'isValid',
				'type': '() => boolean',
			}, {
				'name': '_el',
				'type': '() => HTMLElement | undefined',
			}],
		},
	],
	[
		'PopConfirm',
		{
			localTypes: { 'PopConfirmEmit': '{\n\t(e: \'confirm\'): void;\n\t(e: \'cancel\'): void;\n}' },
			events: [{
				'name': 'confirm',
				'payload': 'undefined',
				'optional': false,
				'desc': {
					'en': 'emitted when the confirm button is clicked',
					'fr': 'émis quand le bouton `confirm` est clické',
				},
			}, {
				'name': 'cancel',
				'payload': 'undefined',
				'optional': false,
				'desc': {
					'en': 'emitted when the cancel button is clicked',
					'fr': 'émis quand le bouton `cancel` est clické',
				},
			}],
			provide: [],
			slots: [{
				'name': 'default',
				'desc': {
					'en': 'the element that will trigger the popup',
					'fr': 'l\'élément qui va déclencher la popup',
				},
				'bindings': [],
			}, {
				'name': 'content',
				'desc': {
					'en': 'the title of the popconfirm',
					'fr': 'titre de la popup',
				},
				'bindings': [],
			}, {
				'name': 'actions',
				'desc': {
					'en': 'actions of the popconfirm',
					'fr': 'actions de la popup',
				},
				'bindings': [{
					'bind': 'close',
					'type': 'function',
					'desc': {
						'en': 'to close the popconfirm',
						'fr': 'fonction pour fermer la popup',
					},
				}, {
					'bind': 'confirm',
					'type': 'function',
					'desc': {
						'en': 'to confirm the action',
						'fr': 'pour confirmer l\'action',
					},
				}, {
					'bind': 'cancel',
					'type': 'function',
					'desc': {
						'en': 'to cancel the action',
						'fr': 'pour annuler l\'action',
					},
				}],
			}],
			props: [{
				'name': 'title',
				'defaultValue': 'undefined',
				'type': 'string',
				'required': false,
				'desc': {
					'en': 'title of the confirm popup',
					'fr': 'titre de la popup de confirmation',
				},
			}],
			publicInstance: [{
				'name': '_el',
				'type': '() => HTMLElement | undefined',
			}],
		},
	],
	[
		'ProgressBar',
		{
			localTypes: {},
			events: [],
			provide: [],
			slots: [{
				'name': 'default',
				'desc': {
					'en': 'the label of the progress bar',
					'fr': 'le label de la barre de progression',
				},
				'bindings': [],
			}],
			props: [{
				'name': 'color',
				'defaultValue': '\'info\'',
				'type': 'Orion.Color',
				'required': false,
				'sharedDefaultValue': '\'default\'',
				'desc': {
					'en': 'defines the color',
					'fr': 'définit la couleur',
				},
			}, {
				'name': 'label',
				'defaultValue': 'undefined',
				'type': 'string',
				'required': false,
				'desc': {
					'en': 'label of the progress bar',
					'fr': 'label de la barre de progression',
				},
			}, {
				'name': 'value',
				'defaultValue': '0',
				'type': 'number',
				'required': false,
				'desc': {
					'en': 'value of the progress bar',
					'fr': 'valeur de la barre de progression',
				},
			}, {
				'name': 'width',
				'defaultValue': '10',
				'type': 'number',
				'required': false,
				'desc': {
					'en': 'width of the progress bar',
					'fr': 'épaisseur de la barre de progression',
				},
			}],
			publicInstance: [{
				'name': '_el',
				'type': '() => HTMLElement | undefined',
			}],
		},
	],
	[
		'ProgressCircle',
		{
			localTypes: {},
			events: [],
			provide: [],
			slots: [{
				'name': 'default',
				'desc': {
					'en': 'the label of the progress circle',
					'fr': 'le label du cercle',
				},
				'bindings': [],
			}],
			props: [{
				'name': 'color',
				'defaultValue': '\'info\'',
				'type': 'Orion.Color',
				'required': false,
				'sharedDefaultValue': '\'default\'',
				'desc': {
					'en': 'defines the color',
					'fr': 'définit la couleur',
				},
			}, {
				'name': 'label',
				'defaultValue': 'undefined',
				'type': 'string',
				'required': false,
				'desc': {
					'en': 'the label',
					'fr': 'label du cercle',
				},
			}, {
				'name': 'pathWidth',
				'defaultValue': '2',
				'type': 'number',
				'required': false,
				'desc': {
					'en': 'width of the path line',
					'fr': 'épaisseur du cercle',
				},
			}, {
				'name': 'size',
				'defaultValue': '50',
				'type': 'number',
				'required': false,
				'desc': {
					'en': 'size of the progress circle',
					'fr': 'taille du cercle',
				},
			}, {
				'name': 'value',
				'defaultValue': '0',
				'type': 'number',
				'required': false,
				'desc': {
					'en': 'value of the progress circle',
					'fr': 'valeur du cercle',
				},
			}, {
				'name': 'valueWidth',
				'defaultValue': '4',
				'type': 'number',
				'required': false,
				'desc': {
					'en': 'width of the value line',
					'fr': 'épaisseur de la ligne qui représente la progression',
				},
			}],
			publicInstance: [{
				'name': '_el',
				'type': '() => HTMLElement | undefined',
			}],
		},
	],
	[
		'Radio',
		{
			localTypes: {
				'VModelType': 'Nil<any[] | boolean | number | Record<string, any> | string>',
				'FieldEmit': '{\n  (e: \'focus\', payload: FocusEvent): void;\n  (e: \'blur\', payload?: FocusEvent): void;\n  (e: \'input\', payload: VModelType): void;\n  (e: \'change\', val?: VModelType): void;\n  (e: \'update:modelValue\', payload: VModelType): void;\n  (e: \'clear\'): void;\n}',
			},
			events: [{
				'name': 'focus',
				'payload': 'FocusEvent',
				'optional': false,
				'desc': {
					'en': 'emitted on focus',
					'fr': 'émis lors du focus',
				},
			}, {
				'name': 'blur',
				'payload': 'FocusEvent',
				'optional': true,
				'desc': {
					'en': 'emitted when the focus leaves the field',
					'fr': 'émis quand le focus quitte le champ',
				},
			}, {
				'name': 'input',
				'payload': 'VModelType',
				'optional': false,
				'desc': {
					'en': 'emitted when the value of the field changes',
					'fr': 'émis lorsque la valeur est modifiée',
				},
			}, {
				'name': 'change',
				'payload': 'VModelType',
				'optional': true,
				'desc': {
					'en': 'emitted when the value of the field changes',
					'fr': 'émis lorsque la valeur est modifiée',
				},
			}, {
				'name': 'update:modelValue',
				'payload': 'VModelType',
				'optional': false,
				'desc': {
					'en': 'emitted to update the field value',
					'fr': 'émis pour mettre à jour la valeur',
				},
			}, {
				'name': 'clear',
				'payload': 'undefined',
				'optional': false,
				'desc': {
					'en': 'emitted when the field is cleared',
					'fr': 'émis quand le champ est vidé',
				},
			}],
			provide: [],
			slots: [{
				'name': 'default',
				'desc': {
					'en': 'content of the radio to replace the default label.',
					'fr': 'contenu pour remplacer le label par défaut.',
				},
				'bindings': [],
			}],
			props: [{
				'name': 'autofocus',
				'defaultValue': false,
				'type': 'boolean',
				'required': false,
				'desc': {
					'en': 'autofocus the field when mounted.',
					'fr': 'focus automatiquement le champ lorsqu\'il est monté.',
				},
			}, {
				'name': 'clearable',
				'defaultValue': false,
				'type': 'boolean',
				'required': false,
				'desc': {
					'en': 'defines if the field can be cleared.',
					'fr': 'définit si le champ peut être vidé.',
				},
			}, {
				'name': 'clearToNull',
				'defaultValue': false,
				'type': 'boolean',
				'required': false,
				'desc': {
					'en': 'sets the value to null when the field is cleared',
					'fr': 'lorsque que le champ est vidé, sa valeur vaut `null`',
				},
			}, {
				'name': 'color',
				'defaultValue': '\'default\'',
				'type': 'Orion.Color',
				'required': false,
				'sharedDefaultValue': '\'default\'',
				'desc': {
					'en': 'defines the color',
					'fr': 'définit la couleur',
				},
			}, {
				'name': 'disabled',
				'defaultValue': false,
				'type': 'boolean',
				'required': false,
				'desc': {
					'en': 'disables the field',
					'fr': 'désactive le champ',
				},
			}, {
				'name': 'donetyping',
				'defaultValue': '0',
				'type': 'number',
				'required': false,
				'desc': {
					'en': 'define the debounce duration before updating the value (useful for search field)',
					'fr': 'défini la durée du debounce avant de mettre à jour la valeur (utile pour les champs de recherche)',
				},
			}, {
				'name': 'forceLabelFloating',
				'defaultValue': false,
				'type': 'boolean',
				'required': false,
				'desc': {
					'en': 'allows floating label',
					'fr': 'permet au label de se placer au dessus du champ lorsqu\'il possède une valeur',
				},
			}, {
				'name': 'iconCheck',
				'defaultValue': 'undefined',
				'type': 'Orion.Icon',
				'required': false,
				'desc': {
					'en': 'the icon when the radio button is checked',
					'fr': 'l\'icône lorsque le bouton est coché',
				},
			}, {
				'name': 'inheritValidationState',
				'defaultValue': 'undefined',
				'type': 'boolean',
				'required': false,
				'desc': {
					'en': 'defines if the validation comes from its parent',
					'fr': 'définit si la validation provient du parent',
				},
			}, {
				'name': 'inline',
				'defaultValue': false,
				'type': 'boolean',
				'required': false,
				'desc': {
					'en': 'set the property `display` on `inline-flex` instead of `flex`',
					'fr': 'défini la propriété `display` à `inline-flex` à la place `flex`',
				},
			}, {
				'name': 'inputValue',
				'defaultValue': 'undefined',
				'type': 'string | boolean | number | string[] | undefined',
				'required': false,
				'desc': {
					'en': 'value of the radio button',
					'fr': 'valeur du bouton radio',
				},
			}, {
				'name': 'label',
				'defaultValue': 'undefined',
				'type': 'string',
				'required': false,
				'desc': {
					'en': 'label of the field',
					'fr': 'le label du champ',
				},
			}, {
				'name': 'modelValue',
				'type': 'T',
				'required': false,
				'desc': {
					'en': 'modelValue of the component',
					'fr': 'modelValue du composant',
				},
			}, {
				'name': 'prefixFontIcon',
				'type': 'string',
				'required': false,
				'desc': {
					'en': 'the prefix icon from the imported font library',
					'fr': 'définit l\'icône de préfixe à partir de la librairie de police importée',
				},
			}, {
				'name': 'prefixIcon',
				'type': 'Orion.Icon',
				'required': false,
				'desc': {
					'en': 'the prefix icon',
					'fr': 'définit l\'icône de préfixe',
				},
			}, {
				'name': 'readonly',
				'defaultValue': false,
				'type': 'boolean',
				'required': false,
				'desc': {
					'en': 'sets the field to read-only mode',
					'fr': 'définit le champ comme étant en lecture seule',
				},
			}, {
				'name': 'required',
				'defaultValue': false,
				'type': 'boolean',
				'required': false,
				'desc': {
					'en': 'sets the field required',
					'fr': 'indique que le champ est obligatoire',
				},
			}, {
				'name': 'reverse',
				'defaultValue': false,
				'type': 'boolean',
				'required': false,
				'desc': {
					'en': 'displays the label first',
					'fr': 'affiche en premier le label',
				},
			}, {
				'name': 'selectOnFocus',
				'defaultValue': false,
				'type': 'boolean',
				'required': false,
				'desc': {
					'en': 'select the field content when focused.',
					'fr': 'sélectionne le contenu du champ lorsqu\'il est focus.',
				},
			}, {
				'name': 'size',
				'defaultValue': '\'md\'',
				'type': 'Orion.Size',
				'required': false,
				'sharedDefaultValue': '\'md\'',
				'desc': {
					'en': 'define the size',
					'fr': 'définit la taille',
				},
			}, {
				'name': 'suffixFontIcon',
				'type': 'string',
				'required': false,
				'desc': {
					'en': 'the suffix icon from the imported font library',
					'fr': 'Missing @doc',
				},
			}, {
				'name': 'suffixIcon',
				'type': 'Orion.Icon',
				'required': false,
				'desc': {
					'en': 'the suffix icon',
					'fr': 'définit l\'icône de suffixe',
				},
			}, {
				'name': 'type',
				'defaultValue': '\'radio\'',
				'type': 'string',
				'required': false,
				'desc': {
					'en': 'type of the input',
					'fr': 'type du champ',
				},
			}, {
				'name': 'validation',
				'defaultValue': 'undefined',
				'type': 'string | ((val: any) => boolean) | Orion.Validator.Rule | Orion.Validation.Rule | boolean',
				'required': false,
				'desc': {
					'en': 'the validation for the field',
					'fr': 'la validation du champ',
				},
			}, {
				'name': 'validationErrorMessage',
				'defaultValue': 'undefined',
				'type': 'string',
				'required': false,
				'desc': {
					'en': 'the error message displayed after input\'s validation.',
					'fr': 'le message d\'erreur affiché en cas d\'erreur lors de la validation',
				},
			}],
			publicInstance: [{
				'name': 'hasBeenFocus',
				'type': '() => boolean',
			}, {
				'name': 'isFocus',
				'type': '() => boolean',
			}, {
				'name': 'focus',
				'type': '() => void',
			}, {
				'name': 'blur',
				'type': 'Lodash.debounce',
			}, {
				'name': 'clear',
				'type': '() => void',
			}, {
				'name': 'setHasBeenFocus',
				'type': '(value: boolean) => void',
			}, {
				'name': 'isValid',
				'type': '() => boolean',
			}, {
				'name': '_el',
				'type': '() => HTMLElement | undefined',
			}],
		},
	],
	[
		'Rate',
		{
			localTypes: { 'RateEmit': '{\n\t(e: \'input\', val: number): void,\n\t(e: \'update:modelValue\', val: number): void,\n}' },
			events: [{
				'name': 'input',
				'payload': 'number',
				'optional': false,
				'desc': {
					'en': 'emitted on model value change',
					'fr': 'émis lorsque le modelValue change',
				},
			}, {
				'name': 'update:modelValue',
				'payload': 'number',
				'optional': false,
				'desc': {
					'en': 'emitted to update the model value',
					'fr': 'émis pour mettre à jour le modelValue',
				},
			}],
			provide: [],
			slots: [{
				'name': 'default',
				'desc': {
					'en': 'legend of the rating',
					'fr': 'légende de la notation',
				},
				'bindings': [{
					'bind': 'rateNumber',
					'type': 'number',
					'desc': {
						'en': 'number of total rates ( = prop `numberOfRates`)',
						'fr': 'le nombre total d\'évaluations ( = prop `numberOfRates`)',
					},
				}],
			}],
			props: [{
				'name': 'color',
				'defaultValue': '\'warning\'',
				'type': 'Orion.Color',
				'required': false,
				'desc': {
					'en': 'The color of filled icons',
					'fr': 'couleur des icônes',
				},
			}, {
				'name': 'disabled',
				'defaultValue': false,
				'type': 'boolean',
				'required': false,
				'desc': {
					'en': 'If set, make the component read-only.',
					'fr': 'si défini, le composant sera en lecture seule',
				},
			}, {
				'name': 'fontIcon',
				'defaultValue': 'undefined',
				'type': 'string',
				'required': false,
				'desc': {
					'en': 'Icon of the component, from the imported font',
					'fr': 'icône du composant, s\'il s\'agit d\'une librairie de police importée',
				},
			}, {
				'name': 'icon',
				'defaultValue': '\'circle_check\'',
				'type': 'Orion.Icon',
				'required': false,
				'desc': {
					'en': 'Icon of the component',
					'fr': 'icône du composant',
				},
			}, {
				'name': 'modelValue',
				'defaultValue': 'undefined',
				'type': 'number',
				'required': false,
				'desc': {
					'en': 'Value of the component',
					'fr': 'valeur du composant',
				},
			}, {
				'name': 'numberOfRates',
				'defaultValue': 'null',
				'type': 'number',
				'required': false,
				'desc': {
					'en': 'The total number of rates',
					'fr': 'nombre total de votes',
				},
			}],
			publicInstance: [{
				'name': '_el',
				'type': '() => HTMLElement | undefined',
			}],
		},
	],
	[
		'Section',
		{
			localTypes: {},
			events: [{
				'name': 'update:collapsed',
				'payload': 'boolean',
				'optional': false,
				'desc': {
					'en': 'update the v-model:collapse value',
					'fr': 'met à jour la valeur de la prop v-model:collapse',
				},
			}],
			provide: [],
			slots: [{
				'name': 'actions',
				'desc': {
					'en': 'actions of the section',
					'fr': 'actions de la section',
				},
				'bindings': [],
			}, {
				'name': 'default',
				'desc': {
					'en': 'the content of the section',
					'fr': 'contenu de la section',
				},
				'bindings': [],
			}],
			props: [{
				'name': 'align',
				'defaultValue': 'undefined',
				'type': '\'left\' | \'center\' | \'right\' | \'stretch\'',
				'required': false,
				'desc': {
					'en': 'alignment of inside elements (convenient for buttons)',
					'fr': 'alignement des éléments à l\'intérieur (pratique pour les boutons)',
				},
			}, {
				'name': 'collapsed',
				'defaultValue': 'false',
				'type': 'boolean',
				'required': false,
				'desc': {
					'en': 'if the prop `collapsible` is set to `true`, defines this initial state',
					'fr': 'si la prop `collapsible` est à `true`, déinit l\'état initial',
				},
			}, {
				'name': 'collapsible',
				'defaultValue': 'false',
				'type': 'boolean',
				'required': false,
				'desc': {
					'en': 'defines if the section can be collapsed',
					'fr': 'définit si la section peut se rétracter',
				},
			}, {
				'name': 'gap',
				'defaultValue': '\'md\'',
				'type': 'Orion.Size',
				'required': false,
				'desc': {
					'en': 'define the space with the previous sibling `<o-section>`',
					'fr': 'définit l\'écart avec la `<o-section>` voisine précédente',
				},
			}, {
				'name': 'subtitle',
				'defaultValue': 'undefined',
				'type': 'Nil<string> | Ref<Nil<string>>',
				'required': false,
				'desc': {
					'en': 'subtitle of the section',
					'fr': 'sous-titre de la section',
				},
			}, {
				'name': 'title',
				'defaultValue': 'undefined',
				'type': 'Nil<string> | Ref<Nil<string>>',
				'required': false,
				'desc': {
					'en': 'title of the section',
					'fr': 'titre de la section',
				},
			}],
			publicInstance: [{
				'name': '_el',
				'type': '() => HTMLElement | undefined',
			}],
		},
	],
	[
		'Select',
		{
			localTypes: {
				'BaseVModelType': 'string | number | boolean | Record<string, any>',
				'VModelType': 'BaseVModelType | BaseVModelType[] | null | undefined',
				'SelectEmit': '{\n  (e: \'focus\', payload: FocusEvent): void;\n  (e: \'blur\', payload?: FocusEvent): void;\n  (e: \'input\', payload: VModelType): void;\n  (e: \'input-keydown-tab\'): void;\n  (e: \'change\', val?: VModelType): void;\n  (e: \'update:modelValue\', payload: VModelType): void;\n  (e: \'clear\'): void;\n\t(e: \'add\', payload: BaseVModelType): void;\n\t(e: \'remove\', payload: BaseVModelType): void;\n\t(e: \'select\', payload: BaseVModelType): void;\n\t(e: \'fetch-start\', payload?: string): void;\n\t(e: \'fetch-end\', payload: BaseVModelType[]): void;\n\t(e: \'fetch-search-clear\'): void;\n}',
			},
			events: [{
				'name': 'focus',
				'payload': 'FocusEvent',
				'optional': false,
				'desc': {
					'en': 'emitted on focus',
					'fr': 'émis lors du focus',
				},
			}, {
				'name': 'blur',
				'payload': 'FocusEvent',
				'optional': true,
				'desc': {
					'en': 'emitted when the focus leaves the field',
					'fr': 'émis quand le focus quitte le champ',
				},
			}, {
				'name': 'input',
				'payload': 'VModelType',
				'optional': false,
				'desc': {
					'en': 'emitted when the value of the field changes',
					'fr': 'émis lorsque la valeur est modifiée',
				},
			}, {
				'name': 'input-keydown-tab',
				'payload': 'undefined',
				'optional': false,
				'desc': {
					'en': 'emitted when pressing Tab key from the search field',
					'fr': 'émis lors de l\'appui sur la touche Tab depuis le champ de recherche',
				},
			}, {
				'name': 'change',
				'payload': 'VModelType',
				'optional': true,
				'desc': {
					'en': 'emitted when the value of the field changes',
					'fr': 'émis lorsque la valeur est modifiée',
				},
			}, {
				'name': 'update:modelValue',
				'payload': 'VModelType',
				'optional': false,
				'desc': {
					'en': 'emitted to update the field value',
					'fr': 'émis pour mettre à jour la valeur',
				},
			}, {
				'name': 'clear',
				'payload': 'undefined',
				'optional': false,
				'desc': {
					'en': 'emitted when the field is cleared',
					'fr': 'émis quand le champ est vidé',
				},
			}, {
				'name': 'add',
				'payload': 'BaseVModelType',
				'optional': false,
				'desc': {
					'en': 'emitted when a value is added from a multiple select',
					'fr': 'émis lorsqu\'une valeur est ajoutée à partir d\'un select multiple',
				},
			}, {
				'name': 'remove',
				'payload': 'BaseVModelType',
				'optional': false,
				'desc': {
					'en': 'emitted when a value is removed from a multiple select',
					'fr': 'émis lorsqu\'une valeur est retirée à partir d\'un select multiple',
				},
			}, {
				'name': 'select',
				'payload': 'BaseVModelType',
				'optional': false,
				'desc': {
					'en': 'emitted when a value is selected from a simple select',
					'fr': 'émis lorsqu\'une valeur est sélectionnée à partir d\'un select simple',
				},
			}, {
				'name': 'fetch-start',
				'payload': 'string',
				'optional': true,
				'desc': {
					'en': 'emitted when the fetch research starts',
					'fr': 'émis lorsque la récupération des options commence',
				},
			}, {
				'name': 'fetch-end',
				'payload': 'BaseVModelType[]',
				'optional': false,
				'desc': {
					'en': 'emitted when the fetch research ends',
					'fr': 'émis quand la récupération des options est finie',
				},
			}, {
				'name': 'fetch-search-clear',
				'payload': 'undefined',
				'optional': false,
				'desc': {
					'en': 'Missing @doc',
					'fr': 'Missing @doc',
				},
			}],
			provide: [],
			slots: [{
				'name': 'value',
				'desc': {
					'en': 'The selected value if single select, each value if multiple select',
					'fr': 'La valeur sélectionnée s\'il s\'agit d\'un select simple, sinon chaque valeur s\'il s\'agit d\'un select multiple',
				},
				'bindings': [{
					'bind': 'item',
					'type': 'any',
					'desc': {
						'en': 'The selected item, typed any to avoid linter errors',
						'fr': 'l\'élément sélectionné, typé `any` pour éviter des erreur du linter',
					},
				}, {
					'bind': 'display',
					'type': 'any',
					'desc': {
						'en': 'The selected item display value (display-key)',
						'fr': 'La valeur d’affichage de l’élément sélectionné (display-key)',
					},
				}],
			}, {
				'name': 'value',
				'desc': {
					'en': 'The selected value if single select, each value if multiple select',
					'fr': 'La valeur sélectionnée s\'il s\'agit d\'un select simple, sinon chaque valeur s\'il s\'agit d\'un select multiple',
				},
				'bindings': [{
					'bind': 'item',
					'type': 'any',
					'desc': {
						'en': 'The selected item, typed any to avoid linter errors',
						'fr': 'l\'élément sélectionné, typé `any` pour éviter des erreur du linter',
					},
				}, {
					'bind': 'display',
					'type': 'any',
					'desc': {
						'en': 'The selected item display value (display-key)',
						'fr': 'La valeur d’affichage de l’élément sélectionné (display-key)',
					},
				}],
			}, {
				'name': 'before-options',
				'desc': {
					'en': 'Content before the select options in the popover',
					'fr': 'Contenu de la tooltip avant la liste des options',
				},
				'bindings': [{
					'bind': 'options',
					'type': 'BaseVModelType[]',
					'desc': {
						'en': 'Options available in the dropdown list',
						'fr': 'Options disponibles dans la liste déroulante',
					},
				}],
			}, {
				'name': 'option',
				'desc': {
					'en': 'Content of each option in the dropdown list',
					'fr': 'Contenu de chaque option dans la liste déroulante',
				},
				'bindings': [{
					'bind': 'item',
					'type': 'any',
					'desc': {
						'en': 'The option item, typed any to avoid linter errors',
						'fr': 'Missing @doc',
					},
				}, {
					'bind': 'index',
					'type': 'number',
					'desc': {
						'en': 'The option\'s index in dropdown list',
						'fr': 'L\'index de l\'option dans la liste déroulante',
					},
				}, {
					'bind': 'marked-search',
					'type': '(content: string) => string',
					'desc': {
						'en': 'Function to highlight search term in options list',
						'fr': 'Fonction permettant de mettre en surbrillance le terme recherché dans les options',
					},
				}],
			}, {
				'name': 'after-options',
				'desc': {
					'en': 'Content after the select options in the popover',
					'fr': 'Contenu de la popover situé après la liste des options',
				},
				'bindings': [{
					'bind': 'options',
					'type': 'BaseVModelType[]',
					'desc': {
						'en': 'Options available in the dropdown list',
						'fr': 'Options disponibles dans la liste déroulante',
					},
				}],
			}],
			props: [{
				'name': 'autocomplete',
				'defaultValue': false,
				'type': 'boolean',
				'required': false,
				'desc': {
					'en': 'adds the possibility to write in the select field',
					'fr': 'permet à l\'utilisateur d\'écrire dans le champ',
				},
			}, {
				'name': 'autofocus',
				'defaultValue': false,
				'type': 'boolean',
				'required': false,
				'desc': {
					'en': 'autofocus the field when mounted.',
					'fr': 'focus automatiquement le champ lorsqu\'il est monté.',
				},
			}, {
				'name': 'clearable',
				'defaultValue': false,
				'type': 'boolean',
				'required': false,
				'desc': {
					'en': 'defines if the field can be cleared.',
					'fr': 'définit si le champ peut être vidé.',
				},
			}, {
				'name': 'clearToNull',
				'defaultValue': false,
				'type': 'boolean',
				'required': false,
				'desc': {
					'en': 'sets the value to null when the field is cleared',
					'fr': 'lorsque que le champ est vidé, sa valeur vaut `null`',
				},
			}, {
				'name': 'customFetch',
				'defaultValue': 'undefined',
				'type': '(searchTerm?: string) => BaseVModelType[]',
				'required': false,
				'desc': {
					'en': 'allows you to custom the fetch function',
					'fr': 'permet de personnaliser la fonction de récupération des options',
				},
			}, {
				'name': 'customSearch',
				'defaultValue': 'undefined',
				'type': 'Function',
				'required': false,
				'desc': {
					'en': 'allows you to custom the search function',
					'fr': 'permet de personnaliser la fonction de recherche',
				},
			}, {
				'name': 'disabled',
				'defaultValue': false,
				'type': 'boolean',
				'required': false,
				'desc': {
					'en': 'disables the field',
					'fr': 'désactive le champ',
				},
			}, {
				'name': 'disabledKey',
				'defaultValue': 'undefined',
				'type': 'string',
				'required': false,
				'desc': {
					'en': 'disables the selection of the value',
					'fr': 'empêche la sélection d\'un élément s\'il possède cette clé',
				},
			}, {
				'name': 'displayKey',
				'defaultValue': 'undefined',
				'type': 'string',
				'required': false,
				'desc': {
					'en': 'key used to display the value in the field',
					'fr': 'clé qui sera affiché au niveau du champ',
				},
			}, {
				'name': 'donetyping',
				'defaultValue': '600',
				'type': 'number',
				'required': false,
				'desc': {
					'en': 'the duration to trigger the fetch',
					'fr': 'indique après combien de temps après la dernière frappe, la fonction de récupération des options est appelée',
				},
			}, {
				'name': 'fetchInitialOptions',
				'defaultValue': '() => []',
				'type': 'Array',
				'required': false,
				'desc': {
					'en': 'initial options before first fetch (when using fetch mecanism)',
					'fr': 'options intiales avant le premier fetch (lors de l\'utilisation du mécanisme de fetch des options)',
				},
			}, {
				'name': 'fetchKey',
				'defaultValue': '\'search\'',
				'type': 'string',
				'required': false,
				'desc': {
					'en': 'key used to pass the research field value as a parameter to fetch the options',
					'fr': 'clé utilisée pour passer la valeur du champ de recherche comme paramètre pour récupérer les options',
				},
			}, {
				'name': 'fetchMethod',
				'defaultValue': '\'GET\'',
				'type': '\'GET\' | \'POST\'',
				'required': false,
				'desc': {
					'en': 'Method used to fetch the options',
					'fr': 'Méthode utilisée pour récupérer les options',
				},
			}, {
				'name': 'fetchMinSearch',
				'defaultValue': '1',
				'type': 'number',
				'required': false,
				'desc': {
					'en': 'minimum number of caracters to trigger the fetch',
					'fr': 'nombre de caractères nécessaire pour déclencher l\'appel pour récupérer les options',
				},
			}, {
				'name': 'fetchUrl',
				'defaultValue': 'undefined',
				'type': 'string',
				'required': false,
				'desc': {
					'en': 'URL to fetch the options',
					'fr': 'URL pour récupérer les options',
				},
			}, {
				'name': 'forceLabelFloating',
				'defaultValue': false,
				'type': 'boolean',
				'required': false,
				'desc': {
					'en': 'allows floating label',
					'fr': 'permet au label de se placer au dessus du champ lorsqu\'il possède une valeur',
				},
			}, {
				'name': 'inheritValidationState',
				'defaultValue': 'undefined',
				'type': 'boolean',
				'required': false,
				'desc': {
					'en': 'defines if the validation comes from its parent',
					'fr': 'définit si la validation provient du parent',
				},
			}, {
				'name': 'label',
				'defaultValue': 'undefined',
				'type': 'string',
				'required': false,
				'desc': {
					'en': 'label of the field',
					'fr': 'le label du champ',
				},
			}, {
				'name': 'modelValue',
				'type': 'T',
				'required': false,
				'desc': {
					'en': 'modelValue of the component',
					'fr': 'modelValue du composant',
				},
			}, {
				'name': 'multiple',
				'defaultValue': false,
				'type': 'boolean',
				'required': false,
				'desc': {
					'en': 'defines if multiple values can be select in the select',
					'fr': 'définit si plusieurs valeurs peuvent être sélectionnées',
				},
			}, {
				'name': 'options',
				'defaultValue': '() => []',
				'type': 'BaseVModelType[]',
				'required': false,
				'desc': {
					'en': 'options of the select',
					'fr': 'options du select',
				},
			}, {
				'name': 'prefillSearch',
				'defaultValue': 'undefined',
				'type': 'string',
				'required': false,
				'desc': {
					'en': 'prefill the search field',
					'fr': 'pré-rempli le champ de recherche',
				},
			}, {
				'name': 'prefixFontIcon',
				'type': 'string',
				'required': false,
				'desc': {
					'en': 'the prefix icon from the imported font library',
					'fr': 'définit l\'icône de préfixe à partir de la librairie de police importée',
				},
			}, {
				'name': 'prefixIcon',
				'type': 'Orion.Icon',
				'required': false,
				'desc': {
					'en': 'the prefix icon',
					'fr': 'définit l\'icône de préfixe',
				},
			}, {
				'name': 'readonly',
				'defaultValue': false,
				'type': 'boolean',
				'required': false,
				'desc': {
					'en': 'sets the field to read-only mode',
					'fr': 'définit le champ comme étant en lecture seule',
				},
			}, {
				'name': 'required',
				'defaultValue': false,
				'type': 'boolean',
				'required': false,
				'desc': {
					'en': 'sets the field required',
					'fr': 'indique que le champ est obligatoire',
				},
			}, {
				'name': 'searchable',
				'defaultValue': false,
				'type': 'boolean',
				'required': false,
				'desc': {
					'en': 'adds a search tooltip',
					'fr': 'ajoute un champ de recherche',
				},
			}, {
				'name': 'selectOnFocus',
				'defaultValue': false,
				'type': 'boolean',
				'required': false,
				'desc': {
					'en': 'select the field content when focused.',
					'fr': 'sélectionne le contenu du champ lorsqu\'il est focus.',
				},
			}, {
				'name': 'size',
				'defaultValue': '\'md\'',
				'type': 'Orion.Size',
				'required': false,
				'sharedDefaultValue': '\'md\'',
				'desc': {
					'en': 'define the size',
					'fr': 'définit la taille',
				},
			}, {
				'name': 'suffixFontIcon',
				'type': 'string',
				'required': false,
				'desc': {
					'en': 'the suffix icon from the imported font library',
					'fr': 'Missing @doc',
				},
			}, {
				'name': 'suffixIcon',
				'type': 'Orion.Icon',
				'required': false,
				'desc': {
					'en': 'the suffix icon',
					'fr': 'définit l\'icône de suffixe',
				},
			}, {
				'name': 'trackKey',
				'defaultValue': '\'id\'',
				'type': 'string',
				'required': false,
				'desc': {
					'en': 'unique key item',
					'fr': 'clé unique qui va différencier les options',
				},
			}, {
				'name': 'type',
				'defaultValue': '\'text\'',
				'type': 'string | Orion.DatepickerType',
				'required': false,
				'desc': {
					'en': 'type of the input',
					'fr': 'type of the input',
				},
			}, {
				'name': 'validation',
				'defaultValue': 'undefined',
				'type': 'string | ((val: any) => boolean) | Orion.Validator.Rule | Orion.Validation.Rule | boolean',
				'required': false,
				'desc': {
					'en': 'the validation for the field',
					'fr': 'la validation du champ',
				},
			}, {
				'name': 'validationErrorMessage',
				'defaultValue': 'undefined',
				'type': 'string',
				'required': false,
				'desc': {
					'en': 'the error message displayed after input\'s validation.',
					'fr': 'le message d\'erreur affiché en cas d\'erreur lors de la validation',
				},
			}, {
				'name': 'valueKey',
				'defaultValue': 'undefined',
				'type': 'string',
				'required': false,
				'desc': {
					'en': 'key used as field value',
					'fr': 'clé qui réprésente la valeur d\'un élément',
				},
			}],
			publicInstance: [{
				'name': 'getSearchTerm',
				'type': '() => string | undefined',
			}, {
				'name': 'setSearchTerm',
				'type': '(val?: string) => string | undefined',
			}, {
				'name': 'hasBeenFocus',
				'type': '() => boolean',
			}, {
				'name': 'isFocus',
				'type': '() => boolean',
			}, {
				'name': 'focus',
				'type': '() => void',
			}, {
				'name': 'blur',
				'type': 'Lodash.debounce',
			}, {
				'name': 'clear',
				'type': '() => void',
			}, {
				'name': 'setHasBeenFocus',
				'type': '(value: boolean) => void',
			}, {
				'name': 'isValid',
				'type': '() => boolean',
			}, {
				'name': '_el',
				'type': '() => HTMLElement | undefined',
			}],
		},
	],
	[
		'Sticker',
		{
			localTypes: {},
			events: [],
			provide: [],
			slots: [{
				'name': 'thumbnail',
				'desc': {
					'en': 'sticker\'s thumbnail content on the left of the sticker',
					'fr': 'contenu de la vignette à gauche du sticker',
				},
				'bindings': [],
			}, {
				'name': 'default',
				'desc': {
					'en': 'sticker\'s content',
					'fr': 'contenu du sticker',
				},
				'bindings': [],
			}, {
				'name': 'actions',
				'desc': {
					'en': 'sticker\'s actions',
					'fr': 'actions du sticker',
				},
				'bindings': [],
			}],
			props: [{
				'name': 'hideActions',
				'defaultValue': false,
				'type': 'boolean',
				'required': false,
				'desc': {
					'en': 'hides the sticker\'s actions',
					'fr': 'masque les actions du sticker',
				},
			}, {
				'name': 'hoverElevation',
				'defaultValue': '1',
				'type': 'number',
				'required': false,
				'desc': {
					'en': 'elevation level on mouse hover',
					'fr': 'niveau d\'élévation au survol de la souris',
				},
			}, {
				'name': 'muted',
				'defaultValue': false,
				'type': 'boolean',
				'required': false,
				'desc': {
					'en': 'adds a disabled style',
					'fr': 'ajoute un style `disabled`',
				},
			}, {
				'name': 'selected',
				'defaultValue': false,
				'type': 'boolean',
				'required': false,
				'desc': {
					'en': 'adds a selected style on the sticker',
					'fr': 'ajoute le style `selected` sur le sticker',
				},
			}, {
				'name': 'selectedColor',
				'defaultValue': '\'info\'',
				'type': 'Orion.Color',
				'required': false,
				'desc': {
					'en': 'the color of the selected style',
					'fr': 'la couleur du style `selected`',
				},
			}, {
				'name': 'title',
				'defaultValue': 'undefined',
				'type': 'string',
				'required': false,
				'desc': {
					'en': 'title of the sticker',
					'fr': 'titre du sticker',
				},
			}],
			publicInstance: [{
				'name': '_el',
				'type': '() => HTMLElement | undefined',
			}],
		},
	],
	[
		'Swipe',
		{
			localTypes: {},
			events: [],
			provide: [],
			slots: [{
				'name': 'actions',
				'desc': {
					'en': 'actions of the swipe',
					'fr': 'actions du swipe',
				},
				'bindings': [],
			}, {
				'name': 'default',
				'desc': {
					'en': 'content of the swipe',
					'fr': 'contenu du swipe',
				},
				'bindings': [],
			}],
			props: [{
				'name': 'direction',
				'defaultValue': '\'left\'',
				'type': 'SwipeDirection',
				'required': false,
				'desc': {
					'en': 'direction of the swipe animation',
					'fr': 'direction de l\'animation du swipe',
				},
			}],
			publicInstance: [{
				'name': '_el',
				'type': '() => HTMLElement | undefined',
			}],
		},
	],
	[
		'TabPane',
		{
			localTypes: {},
			events: [],
			provide: [],
			slots: [{
				'name': 'default',
				'desc': {
					'en': 'the content of the pane',
					'fr': 'contenu de l\'onglet',
				},
				'bindings': [],
			}],
			props: [{
				'name': 'disabled',
				'defaultValue': false,
				'type': 'boolean',
				'required': false,
				'desc': {
					'en': 'disabled the pane',
					'fr': 'désactive le panneau',
				},
			}, {
				'name': 'fontIcon',
				'type': 'string',
				'required': false,
				'desc': {
					'en': 'the icon of the component, from the imported font library',
					'fr': 'l\'icône du composant, de la librairie de police importée',
				},
			}, {
				'name': 'icon',
				'type': 'Orion.Icon',
				'required': false,
				'desc': {
					'en': 'the icon of the component',
					'fr': 'définit l\'icône',
				},
			}, {
				'name': 'label',
				'defaultValue': 'undefined',
				'type': 'string',
				'required': false,
				'desc': {
					'en': 'the label of the tab',
					'fr': 'le label de l\'onglet',
				},
			}, {
				'name': 'lazy',
				'defaultValue': false,
				'type': 'boolean',
				'required': false,
				'desc': {
					'en': 'the content of the tab is mounted each time the tab becomes active',
					'fr': 'le contenu de l\'onglet est monté à chaque fois qu\'il devient actif',
				},
			}, {
				'name': 'lazyOnce',
				'defaultValue': false,
				'type': 'boolean',
				'required': false,
				'desc': {
					'en': 'the content of the tab is only mounted once, the first time the tab is active',
					'fr': 'le contenu de l\'onglet est uniquement monté une fois, la première fois qu\'il est actif',
				},
			}, {
				'name': 'marker',
				'defaultValue': 'undefined',
				'type': 'boolean | number',
				'required': false,
				'desc': {
					'en': 'adds a visual marker, can be used as a notification marker',
					'fr': 'ajoute un marqueur visuel, qui peut être utilisé comme marqueur de notification',
				},
			}, {
				'name': 'markerColor',
				'defaultValue': '\'danger\'',
				'type': 'Orion.Color',
				'required': false,
				'desc': {
					'en': 'the color of the marker',
					'fr': 'la couleur du marqueur',
				},
			}, {
				'name': 'name',
				'type': 'string',
				'required': true,
				'desc': {
					'en': 'the name of the tab',
					'fr': 'le nom de l\'onglet',
				},
			}],
			publicInstance: [{
				'name': 'disabled',
				'type': 'boolean',
			}, {
				'name': 'name',
				'type': 'string',
			}, {
				'name': '_el',
				'type': '() => HTMLElement | undefined',
			}],
		},
	],
	[
		'Tabs',
		{
			localTypes: { 'TabsEmit': '{\n\t(e: \'input\', payload: string): void\n\t(e: \'tab-click\', ...payload: [OrionTabPane, MouseEvent]): void\n\t(e: \'update:modelValue\', payload: string): void\n}' },
			events: [{
				'name': 'input',
				'payload': 'string',
				'optional': false,
				'desc': {
					'en': 'emitted when the value of the input changes',
					'fr': 'émis quand on change d\'onglet',
				},
			}, {
				'name': 'tab-click',
				'payload': '[OrionTabPane, MouseEvent]',
				'optional': true,
				'desc': {
					'en': 'emitted on tab click',
					'fr': 'émis au moment du click sur un tab',
				},
			}, {
				'name': 'update:modelValue',
				'payload': 'string',
				'optional': false,
				'desc': {
					'en': 'emitted to update the model value',
					'fr': 'émis pour mettre à jour la valeur du modelValue',
				},
			}],
			provide: [{
				'name': '_tabs',
				'data': 'publicInstance',
			}],
			slots: [],
			props: [{
				'name': 'loader',
				'defaultValue': 'undefined',
				'type': 'string | boolean',
				'required': false,
				'desc': {
					'en': 'adds a loader on the tab',
					'fr': 'ajoute une icône de chargement sur l\'onglet',
				},
			}, {
				'name': 'modelValue',
				'defaultValue': 'undefined',
				'type': 'string',
				'required': false,
				'desc': {
					'en': 'model value',
					'fr': 'modelValue du composant',
				},
			}, {
				'name': 'routerViewName',
				'defaultValue': 'undefined',
				'type': 'string',
				'required': false,
				'desc': {
					'en': 'the name of the `<router-view/>` when using `use-router` prop',
					'fr': 'le nom du `<router-view/>` lors de l\'utilisation de la prop `use-router`',
				},
			}, {
				'name': 'useRouter',
				'defaultValue': false,
				'type': 'boolean',
				'required': false,
				'desc': {
					'en': 'connect the tabs to the router to bind active tab to current route and use `<router-view/>` component',
					'fr': 'connecte les tabs au router pour synchroniser la tab active avec la router actuelle et utiliser le composant `<router-view/>`',
				},
			}],
			publicInstance: [{
				'name': '_loader',
				'type': '() => OrionLoader',
			}, {
				'name': 'panes',
				'type': 'Orion.Private.TsxTabPane[]',
			}, {
				'name': 'getValue',
				'type': '() => string | undefined',
			}, {
				'name': 'useRouter',
				'type': 'boolean',
			}, {
				'name': '_el',
				'type': '() => HTMLElement | undefined',
			}],
		},
	],
	[
		'Textarea',
		{
			localTypes: {
				'VModelType': 'Nil<string>',
				'FieldEmit': '{\n  (e: \'focus\', payload: FocusEvent): void;\n  (e: \'blur\', payload?: FocusEvent): void;\n  (e: \'submit\', payload: VModelType): void;\n  (e: \'input\', payload: VModelType): void;\n  (e: \'change\', val?: VModelType): void;\n  (e: \'update:modelValue\', payload: VModelType): void;\n  (e: \'clear\'): void;\n}',
			},
			events: [{
				'name': 'focus',
				'payload': 'FocusEvent',
				'optional': false,
				'desc': {
					'en': 'emitted on focus',
					'fr': 'émis lors du focus',
				},
			}, {
				'name': 'blur',
				'payload': 'FocusEvent',
				'optional': true,
				'desc': {
					'en': 'emitted when the focus leaves the field',
					'fr': 'émis quand le focus quitte le champ',
				},
			}, {
				'name': 'submit',
				'payload': 'VModelType',
				'optional': false,
				'desc': {
					'en': 'emitted when the enter key is pressed',
					'fr': 'émis lorsque la touche `entrée` est appuyée',
				},
			}, {
				'name': 'input',
				'payload': 'VModelType',
				'optional': false,
				'desc': {
					'en': 'emitted when the value of the field changes',
					'fr': 'émis lorsque la valeur est modifiée',
				},
			}, {
				'name': 'change',
				'payload': 'VModelType',
				'optional': true,
				'desc': {
					'en': 'emitted when the value of the field changes',
					'fr': 'émis lorsque la valeur est modifiée',
				},
			}, {
				'name': 'update:modelValue',
				'payload': 'VModelType',
				'optional': false,
				'desc': {
					'en': 'emitted to update the field value',
					'fr': 'émis pour mettre à jour la valeur',
				},
			}, {
				'name': 'clear',
				'payload': 'undefined',
				'optional': false,
				'desc': {
					'en': 'emitted when the field is cleared',
					'fr': 'émis quand le champ est vidé',
				},
			}],
			provide: [],
			slots: [],
			props: [{
				'name': 'autofocus',
				'defaultValue': false,
				'type': 'boolean',
				'required': false,
				'desc': {
					'en': 'autofocus the field when mounted.',
					'fr': 'focus automatiquement le champ lorsqu\'il est monté.',
				},
			}, {
				'name': 'clearable',
				'defaultValue': false,
				'type': 'boolean',
				'required': false,
				'desc': {
					'en': 'defines if the field can be cleared.',
					'fr': 'définit si le champ peut être vidé.',
				},
			}, {
				'name': 'clearToNull',
				'defaultValue': false,
				'type': 'boolean',
				'required': false,
				'desc': {
					'en': 'sets the value to null when the field is cleared',
					'fr': 'lorsque que le champ est vidé, sa valeur vaut `null`',
				},
			}, {
				'name': 'disabled',
				'defaultValue': false,
				'type': 'boolean',
				'required': false,
				'desc': {
					'en': 'disables the field',
					'fr': 'désactive le champ',
				},
			}, {
				'name': 'donetyping',
				'defaultValue': '0',
				'type': 'number',
				'required': false,
				'desc': {
					'en': 'define the debounce duration before updating the value (useful for search field)',
					'fr': 'défini la durée du debounce avant de mettre à jour la valeur (utile pour les champs de recherche)',
				},
			}, {
				'name': 'forceLabelFloating',
				'defaultValue': false,
				'type': 'boolean',
				'required': false,
				'desc': {
					'en': 'allows floating label',
					'fr': 'permet au label de se placer au dessus du champ lorsqu\'il possède une valeur',
				},
			}, {
				'name': 'inheritValidationState',
				'defaultValue': 'undefined',
				'type': 'boolean',
				'required': false,
				'desc': {
					'en': 'defines if the validation comes from its parent',
					'fr': 'définit si la validation provient du parent',
				},
			}, {
				'name': 'label',
				'defaultValue': 'undefined',
				'type': 'string',
				'required': false,
				'desc': {
					'en': 'label of the field',
					'fr': 'le label du champ',
				},
			}, {
				'name': 'maxLength',
				'defaultValue': 'undefined',
				'type': 'number',
				'required': false,
				'desc': {
					'en': 'maximal length of the input',
					'fr': 'taille maximale de l\'entrée',
				},
			}, {
				'name': 'modelValue',
				'type': 'T',
				'required': false,
				'desc': {
					'en': 'modelValue of the component',
					'fr': 'modelValue du composant',
				},
			}, {
				'name': 'prefixFontIcon',
				'type': 'string',
				'required': false,
				'desc': {
					'en': 'the prefix icon from the imported font library',
					'fr': 'définit l\'icône de préfixe à partir de la librairie de police importée',
				},
			}, {
				'name': 'prefixIcon',
				'type': 'Orion.Icon',
				'required': false,
				'desc': {
					'en': 'the prefix icon',
					'fr': 'définit l\'icône de préfixe',
				},
			}, {
				'name': 'readonly',
				'defaultValue': false,
				'type': 'boolean',
				'required': false,
				'desc': {
					'en': 'sets the field to read-only mode',
					'fr': 'définit le champ comme étant en lecture seule',
				},
			}, {
				'name': 'required',
				'defaultValue': false,
				'type': 'boolean',
				'required': false,
				'desc': {
					'en': 'sets the field required',
					'fr': 'indique que le champ est obligatoire',
				},
			}, {
				'name': 'selectOnFocus',
				'defaultValue': false,
				'type': 'boolean',
				'required': false,
				'desc': {
					'en': 'select the field content when focused.',
					'fr': 'sélectionne le contenu du champ lorsqu\'il est focus.',
				},
			}, {
				'name': 'showLength',
				'defaultValue': false,
				'type': 'boolean',
				'required': false,
				'desc': {
					'en': 'show input\'s value length',
					'fr': 'affiche le nombre de caractères',
				},
			}, {
				'name': 'size',
				'defaultValue': '\'md\'',
				'type': 'Orion.Size',
				'required': false,
				'sharedDefaultValue': '\'md\'',
				'desc': {
					'en': 'define the size',
					'fr': 'définit la taille',
				},
			}, {
				'name': 'suffixFontIcon',
				'type': 'string',
				'required': false,
				'desc': {
					'en': 'the suffix icon from the imported font library',
					'fr': 'Missing @doc',
				},
			}, {
				'name': 'suffixIcon',
				'type': 'Orion.Icon',
				'required': false,
				'desc': {
					'en': 'the suffix icon',
					'fr': 'définit l\'icône de suffixe',
				},
			}, {
				'name': 'type',
				'defaultValue': '\'text\'',
				'type': 'string | Orion.DatepickerType',
				'required': false,
				'desc': {
					'en': 'type of the input',
					'fr': 'type of the input',
				},
			}, {
				'name': 'validation',
				'defaultValue': 'undefined',
				'type': 'string | ((val: any) => boolean) | Orion.Validator.Rule | Orion.Validation.Rule | boolean',
				'required': false,
				'desc': {
					'en': 'the validation for the field',
					'fr': 'la validation du champ',
				},
			}, {
				'name': 'validationErrorMessage',
				'defaultValue': 'undefined',
				'type': 'string',
				'required': false,
				'desc': {
					'en': 'the error message displayed after input\'s validation.',
					'fr': 'le message d\'erreur affiché en cas d\'erreur lors de la validation',
				},
			}],
			publicInstance: [{
				'name': 'hasBeenFocus',
				'type': '() => boolean',
			}, {
				'name': 'isFocus',
				'type': '() => boolean',
			}, {
				'name': 'focus',
				'type': '() => void',
			}, {
				'name': 'blur',
				'type': 'Lodash.debounce',
			}, {
				'name': 'clear',
				'type': '() => void',
			}, {
				'name': 'setHasBeenFocus',
				'type': '(value: boolean) => void',
			}, {
				'name': 'isValid',
				'type': '() => boolean',
			}, {
				'name': '_el',
				'type': '() => HTMLElement | undefined',
			}],
		},
	],
	[
		'Timeline',
		{
			localTypes: { 'TimelineEmit': '{\n\t(e: \'input\', payload: string | number): void\n\t(e: \'pill-click\', ...payload: [OrionTimelinePane, MouseEvent]): void\n\t(e: \'update:modelValue\', payload: string | number): void\n}' },
			events: [{
				'name': 'input',
				'payload': 'string | number',
				'optional': false,
				'desc': {
					'en': 'emitted when the value of the timeline changes',
					'fr': 'émis quand la valeur de la timeline change',
				},
			}, {
				'name': 'pill-click',
				'payload': '[OrionTimelinePane, MouseEvent]',
				'optional': true,
				'desc': {
					'en': 'emitted when a pill is clicked',
					'fr': 'émis au moment du click sur une vignette',
				},
			}, {
				'name': 'update:modelValue',
				'payload': 'string | number',
				'optional': false,
				'desc': {
					'en': 'emitted to update the model value',
					'fr': 'émis pour mettre à jour le modelValue',
				},
			}],
			provide: [{
				'name': '_timeline',
				'data': 'publicInstance',
			}],
			slots: [],
			props: [{
				'name': 'horizontal',
				'defaultValue': false,
				'type': 'boolean',
				'required': false,
				'desc': {
					'en': 'the orientation of the component',
					'fr': 'l\'orientation du composant',
				},
			}, {
				'name': 'loader',
				'defaultValue': 'undefined',
				'type': 'string | boolean',
				'required': false,
				'desc': {
					'en': 'displays a loader on the timeline',
					'fr': 'affiche un loader sur la timeline',
				},
			}, {
				'name': 'modelValue',
				'defaultValue': 'undefined',
				'type': 'string | number',
				'required': false,
				'desc': {
					'en': 'the model value',
					'fr': 'le modelValue',
				},
			}, {
				'name': 'scrollable',
				'defaultValue': false,
				'type': 'boolean',
				'required': false,
				'desc': {
					'en': 'displays an horizontal scroll on the timeline pills if it does not fit in its container',
					'fr': 'affiche un scroll horizontal au niveau de la timeline si elle dépasse de son conteneur.',
				},
			}],
			publicInstance: [{
				'name': '_loader',
				'type': '() => OrionLoader',
			}, {
				'name': 'panes',
				'type': 'Orion.Private.TsxTimelinePane[]',
			}, {
				'name': 'getValue',
				'type': '() => string | number | undefined',
			}, {
				'name': 'getCurrent',
				'type': '() => string | number | undefined',
			}, {
				'name': 'setCurrent',
				'type': '(name: string | number) => void',
			}, {
				'name': '_el',
				'type': '() => HTMLElement | undefined',
			}],
		},
	],
	[
		'TimelinePane',
		{
			localTypes: {},
			events: [],
			provide: [],
			slots: [{
				'name': 'default',
				'desc': {
					'en': 'the content of the timeline pane',
					'fr': 'contenu du panneau',
				},
				'bindings': [],
			}],
			props: [{
				'name': 'complete',
				'defaultValue': 'undefined',
				'type': 'boolean',
				'required': false,
				'desc': {
					'en': 'adds a complete style and defines the pill as clickable',
					'fr': 'ajoute le style `complete` et permet de cliquer sur la vignette',
				},
			}, {
				'name': 'disabled',
				'defaultValue': false,
				'type': 'boolean',
				'required': false,
				'desc': {
					'en': 'disables the pane',
					'fr': 'désactive le panneau',
				},
			}, {
				'name': 'fontIcon',
				'type': 'string',
				'required': false,
				'desc': {
					'en': 'the icon of the component, from the imported font library',
					'fr': 'l\'icône du composant, de la librairie de police importée',
				},
			}, {
				'name': 'icon',
				'type': 'Orion.Icon',
				'required': false,
				'desc': {
					'en': 'the icon of the component',
					'fr': 'définit l\'icône',
				},
			}, {
				'name': 'lazy',
				'defaultValue': false,
				'type': 'boolean',
				'required': false,
				'desc': {
					'en': 'the content of the pane is only loaded when the tab is active',
					'fr': 'le contenu du panneau est seulement chargé quand il est actif',
				},
			}, {
				'name': 'lazyOnce',
				'defaultValue': false,
				'type': 'boolean',
				'required': false,
				'desc': {
					'en': 'the content of the pane is only loading once, the first time the pane is active',
					'fr': 'le contenu du panneau est seulement chargé une fois, la première fois que le panneau est actif',
				},
			}, {
				'name': 'marker',
				'defaultValue': 'undefined',
				'type': 'boolean | number',
				'required': false,
				'desc': {
					'en': 'adds  visual marker which can be used as a notification marker',
					'fr': 'ajoute un marqueur visuel, qui peut être utilisé comme marqueur de notification',
				},
			}, {
				'name': 'markerColor',
				'defaultValue': '\'danger\'',
				'type': 'Orion.Color',
				'required': false,
				'desc': {
					'en': 'color of the marker',
					'fr': 'couleur du marqueur',
				},
			}, {
				'name': 'name',
				'type': 'string | number',
				'required': true,
				'desc': {
					'en': 'the name of the pane',
					'fr': 'nom du panneau',
				},
			}, {
				'name': 'pill',
				'defaultValue': 'undefined',
				'type': 'string',
				'required': false,
				'desc': {
					'en': 'the content displayed on the pill',
					'fr': 'contenu affiché sur la vignette',
				},
			}],
			publicInstance: [{
				'name': 'disabled',
				'type': 'boolean',
			}, {
				'name': 'name',
				'type': 'string | number',
			}, {
				'name': '_el',
				'type': '() => HTMLElement | undefined',
			}],
		},
	],
	[
		'Toggle',
		{
			localTypes: { 'FieldEmit': '{\n  (e: \'focus\', payload: FocusEvent): void;\n  (e: \'blur\', payload?: FocusEvent): void;\n  (e: \'input\', payload: boolean): void;\n  (e: \'change\', val?: boolean): void;\n  (e: \'update:modelValue\', payload: boolean): void;\n  (e: \'clear\'): void;\n}' },
			events: [{
				'name': 'focus',
				'payload': 'FocusEvent',
				'optional': false,
				'desc': {
					'en': 'emitted on focus',
					'fr': 'émis lors du focus',
				},
			}, {
				'name': 'blur',
				'payload': 'FocusEvent',
				'optional': true,
				'desc': {
					'en': 'emitted when the focus leaves the field',
					'fr': 'émis quand le focus quitte le champ',
				},
			}, {
				'name': 'input',
				'payload': 'boolean',
				'optional': false,
				'desc': {
					'en': 'emitted when the value of the field changes',
					'fr': 'émis lorsque la valeur est modifiée',
				},
			}, {
				'name': 'change',
				'payload': 'boolean',
				'optional': true,
				'desc': {
					'en': 'emitted when the value of the field changes',
					'fr': 'émis lorsque la valeur est modifiée',
				},
			}, {
				'name': 'update:modelValue',
				'payload': 'boolean',
				'optional': false,
				'desc': {
					'en': 'emitted to update the field value',
					'fr': 'émis pour mettre à jour la valeur',
				},
			}, {
				'name': 'clear',
				'payload': 'undefined',
				'optional': false,
				'desc': {
					'en': 'emitted when the field is cleared',
					'fr': 'émis quand le champ est vidé',
				},
			}],
			provide: [],
			slots: [{
				'name': 'default',
				'desc': {
					'en': 'content of the toggle to replace the default label.',
					'fr': 'contenu pour remplacer le label par défaut.',
				},
				'bindings': [],
			}],
			props: [{
				'name': 'autofocus',
				'defaultValue': false,
				'type': 'boolean',
				'required': false,
				'desc': {
					'en': 'autofocus the field when mounted.',
					'fr': 'focus automatiquement le champ lorsqu\'il est monté.',
				},
			}, {
				'name': 'clearable',
				'defaultValue': false,
				'type': 'boolean',
				'required': false,
				'desc': {
					'en': 'defines if the field can be cleared.',
					'fr': 'définit si le champ peut être vidé.',
				},
			}, {
				'name': 'clearToNull',
				'defaultValue': false,
				'type': 'boolean',
				'required': false,
				'desc': {
					'en': 'sets the value to null when the field is cleared',
					'fr': 'lorsque que le champ est vidé, sa valeur vaut `null`',
				},
			}, {
				'name': 'color',
				'defaultValue': '\'default\'',
				'type': 'Orion.Color',
				'required': false,
				'sharedDefaultValue': '\'default\'',
				'desc': {
					'en': 'defines the color',
					'fr': 'définit la couleur',
				},
			}, {
				'name': 'disabled',
				'defaultValue': false,
				'type': 'boolean',
				'required': false,
				'desc': {
					'en': 'disables the field',
					'fr': 'désactive le champ',
				},
			}, {
				'name': 'donetyping',
				'defaultValue': '0',
				'type': 'number',
				'required': false,
				'desc': {
					'en': 'define the debounce duration before updating the value (useful for search field)',
					'fr': 'défini la durée du debounce avant de mettre à jour la valeur (utile pour les champs de recherche)',
				},
			}, {
				'name': 'forceLabelFloating',
				'defaultValue': false,
				'type': 'boolean',
				'required': false,
				'desc': {
					'en': 'allows floating label',
					'fr': 'permet au label de se placer au dessus du champ lorsqu\'il possède une valeur',
				},
			}, {
				'name': 'inheritValidationState',
				'defaultValue': 'undefined',
				'type': 'boolean',
				'required': false,
				'desc': {
					'en': 'defines if the validation comes from its parent',
					'fr': 'définit si la validation provient du parent',
				},
			}, {
				'name': 'inline',
				'defaultValue': false,
				'type': 'boolean',
				'required': false,
				'desc': {
					'en': 'set the property `display` on `inline-flex` instead of `flex`',
					'fr': 'défini la propriété `display` à `inline-flex` à la place `flex`',
				},
			}, {
				'name': 'label',
				'defaultValue': 'undefined',
				'type': 'string',
				'required': false,
				'desc': {
					'en': 'label of the field',
					'fr': 'le label du champ',
				},
			}, {
				'name': 'modelValue',
				'type': 'T',
				'required': false,
				'desc': {
					'en': 'modelValue of the component',
					'fr': 'modelValue du composant',
				},
			}, {
				'name': 'prefixFontIcon',
				'type': 'string',
				'required': false,
				'desc': {
					'en': 'the prefix icon from the imported font library',
					'fr': 'définit l\'icône de préfixe à partir de la librairie de police importée',
				},
			}, {
				'name': 'prefixIcon',
				'type': 'Orion.Icon',
				'required': false,
				'desc': {
					'en': 'the prefix icon',
					'fr': 'définit l\'icône de préfixe',
				},
			}, {
				'name': 'readonly',
				'defaultValue': false,
				'type': 'boolean',
				'required': false,
				'desc': {
					'en': 'sets the field to read-only mode',
					'fr': 'définit le champ comme étant en lecture seule',
				},
			}, {
				'name': 'required',
				'defaultValue': false,
				'type': 'boolean',
				'required': false,
				'desc': {
					'en': 'sets the field required',
					'fr': 'indique que le champ est obligatoire',
				},
			}, {
				'name': 'reverse',
				'defaultValue': false,
				'type': 'boolean',
				'required': false,
				'desc': {
					'en': 'displays the label first',
					'fr': 'affiche d\'abord le label',
				},
			}, {
				'name': 'selectOnFocus',
				'defaultValue': false,
				'type': 'boolean',
				'required': false,
				'desc': {
					'en': 'select the field content when focused.',
					'fr': 'sélectionne le contenu du champ lorsqu\'il est focus.',
				},
			}, {
				'name': 'size',
				'defaultValue': '\'md\'',
				'type': 'Orion.Size',
				'required': false,
				'sharedDefaultValue': '\'md\'',
				'desc': {
					'en': 'define the size',
					'fr': 'définit la taille',
				},
			}, {
				'name': 'suffixFontIcon',
				'type': 'string',
				'required': false,
				'desc': {
					'en': 'the suffix icon from the imported font library',
					'fr': 'Missing @doc',
				},
			}, {
				'name': 'suffixIcon',
				'type': 'Orion.Icon',
				'required': false,
				'desc': {
					'en': 'the suffix icon',
					'fr': 'définit l\'icône de suffixe',
				},
			}, {
				'name': 'type',
				'defaultValue': '\'toggle\'',
				'type': 'string',
				'required': false,
				'desc': {
					'en': 'type of the input',
					'fr': 'type du champ',
				},
			}, {
				'name': 'validation',
				'defaultValue': 'undefined',
				'type': 'string | ((val: any) => boolean) | Orion.Validator.Rule | Orion.Validation.Rule | boolean',
				'required': false,
				'desc': {
					'en': 'the validation for the field',
					'fr': 'la validation du champ',
				},
			}, {
				'name': 'validationErrorMessage',
				'defaultValue': 'undefined',
				'type': 'string',
				'required': false,
				'desc': {
					'en': 'the error message displayed after input\'s validation.',
					'fr': 'le message d\'erreur affiché en cas d\'erreur lors de la validation',
				},
			}, {
				'name': 'value',
				'defaultValue': false,
				'type': 'boolean',
				'required': false,
				'desc': {
					'en': 'value of the toggle',
					'fr': 'valeur du toggle',
				},
			}],
			publicInstance: [{
				'name': 'hasBeenFocus',
				'type': '() => boolean',
			}, {
				'name': 'isFocus',
				'type': '() => boolean',
			}, {
				'name': 'focus',
				'type': '() => void',
			}, {
				'name': 'blur',
				'type': 'Lodash.debounce',
			}, {
				'name': 'clear',
				'type': '() => void',
			}, {
				'name': 'setHasBeenFocus',
				'type': '(value: boolean) => void',
			}, {
				'name': 'isValid',
				'type': '() => boolean',
			}, {
				'name': '_el',
				'type': '() => HTMLElement | undefined',
			}],
		},
	],
	[
		'Tour',
		{
			localTypes: {},
			events: [],
			provide: [{
				'name': '_tour',
				'data': 'publicInstance',
			}],
			slots: [],
			props: [{
				'name': 'callback',
				'defaultValue': 'undefined',
				'type': 'Function',
				'required': false,
				'desc': {
					'en': 'function executed when the tour is stopped',
					'fr': 'fonction exécutée quand le tour est arrêté',
				},
			}, {
				'name': 'value',
				'defaultValue': 'undefined',
				'type': 'number',
				'required': false,
				'desc': {
					'en': 'current step index of the tour',
					'fr': 'index courant du tour',
				},
			}],
			publicInstance: [{
				'name': 'steps',
				'type': '{\n\tprops: {\n\t\tsize: string;\n\t\ttarget: string | boolean | Function;\n\t\ttimeout: number;\n\t\tclosable: boolean;\n\t\thideFinish: boolean;\n\t\ttitle?: string | undefined;\n\t\tnext?: Record<string, any> | undefined;\n\t\tend?: Record<string, any> | undefined;\n\t\tprevious?: Record<string, any> | undefined;\n\t\tclickable?: boolean | Function | undefined;\n\t};\n}[]',
			}, {
				'name': 'getCurrentIndex',
				'type': '() => number',
			}, {
				'name': 'setCurrent',
				'type': '(val: number) => void',
			}, {
				'name': 'setCurrentStepPublicInstance',
				'type': '(instance: Undef<{\n\tprevious: () => Promise<void>;\n\tnext: () => Promise<void>;\n\tstop: (fromTour?: boolean) => Promise<void>;\n\t_el: () => HTMLElement | undefined;\n}>) => void',
			}, {
				'name': 'start',
				'type': '(index?: number) => void',
			}, {
				'name': 'stop',
				'type': '() => void',
			}, {
				'name': '_el',
				'type': '() => HTMLElement | undefined',
			}],
		},
	],
	[
		'TourStep',
		{
			localTypes: {},
			events: [],
			provide: [],
			slots: [{
				'name': 'default',
				'desc': {
					'en': 'content of the step',
					'fr': 'contenu de l\'étape',
				},
				'bindings': [],
			}, {
				'name': 'actions',
				'desc': {
					'en': 'actions of the step',
					'fr': 'actions de l\'étape',
				},
				'bindings': [{
					'bind': 'next',
					'type': '() => void',
					'desc': {
						'en': 'go to next step',
						'fr': 'aller à l\'étape suivante',
					},
				}, {
					'bind': 'previous',
					'type': '() => void',
					'desc': {
						'en': 'go to previous step',
						'fr': 'aller à l\'étape précédente',
					},
				}],
			}],
			props: [{
				'name': 'clickable',
				'defaultValue': 'undefined',
				'type': 'boolean | function',
				'required': false,
				'desc': {
					'en': 'if there is a target, it allows the user to click on the target (if the target is a button for example). It also ends the tour.',
					'fr': 's\'il y a une cible, permet de clicker sur la cible  (si c\'est un bouton par exemple). Cela met aussi fin au tour.',
				},
			}, {
				'name': 'closable',
				'defaultValue': 'true',
				'type': 'boolean',
				'required': false,
				'desc': {
					'en': 'defines if the step can be closable',
					'fr': 'définit si l\'étape peut être fermée à l\'aide de la croix',
				},
			}, {
				'name': 'end',
				'defaultValue': 'undefined',
				'type': 'Object',
				'required': false,
				'desc': {
					'en': 'object which contains a label, and a callback and clean functions for the final step',
					'fr': 'objet contenant un label, et des fonction `callback` et `clean` pour l\'étape finale',
				},
			}, {
				'name': 'hideFinish',
				'defaultValue': 'false',
				'type': 'boolean',
				'required': false,
				'desc': {
					'en': 'hides the Finish button',
					'fr': 'masque le bouton pour terminer le tour',
				},
			}, {
				'name': 'next',
				'defaultValue': 'undefined',
				'type': 'Object',
				'required': false,
				'desc': {
					'en': 'object which contains a label, and a callback and clean functions for the next step',
					'fr': 'objet contenant un label, et des fonction `callback` et `clean` pour l\'étape suivante',
				},
			}, {
				'name': 'previous',
				'defaultValue': 'undefined',
				'type': 'Object',
				'required': false,
				'desc': {
					'en': 'object which contains a label, and a callback and clean functions for the previous step',
					'fr': 'objet contenant un label, et des fonction `callback` et `clean` pour l\'étape précédente',
				},
			}, {
				'name': 'size',
				'defaultValue': '\'md\'',
				'type': 'string',
				'required': false,
				'desc': {
					'en': 'the size of the step',
					'fr': 'taille de l\'étape',
				},
			}, {
				'name': 'target',
				'defaultValue': 'false',
				'type': 'string | function | boolean',
				'required': false,
				'desc': {
					'en': 'possibility to target a DOM element. If it is a `string`, it must represent an `id` in the DOM. If `false`, no target will be selected',
					'fr': 'Permet de cibler un élément dans le DOM. S\'il s\'agit d\'une string, elle doit correspondre à l\'id de cet élément. Si elle est définie à `false` l\'étape se placera au centre de la page, sans cible.',
				},
			}, {
				'name': 'timeout',
				'defaultValue': '3000',
				'type': 'number',
				'required': false,
				'desc': {
					'en': 'when a target can not be find in DOM, a modal appears after a certain time defined with this attribut',
					'fr': 'quand la cible n\'est pas trouvée dans le DOM, une modal appararaît après le temps spécifié',
				},
			}, {
				'name': 'title',
				'defaultValue': 'undefined',
				'type': 'string',
				'required': false,
				'desc': {
					'en': 'title of the step',
					'fr': 'titre de l\'étape',
				},
			}],
			publicInstance: [{
				'name': 'previous',
				'type': '() => Promise<void>',
			}, {
				'name': 'next',
				'type': '() => Promise<void>',
			}, {
				'name': 'stop',
				'type': '(fromTour?: boolean) => Promise<void>',
			}, {
				'name': '_el',
				'type': '() => HTMLElement | undefined',
			}],
		},
	],
	[
		'Upload',
		{
			localTypes: {
				'VModelType': 'Nil<File[]>',
				'FieldEmit': '{\n  (e: \'focus\', payload: FocusEvent): void;\n  (e: \'blur\', payload?: FocusEvent): void;\n  (e: \'input\', payload: VModelType): void;\n  (e: \'change\', val?: VModelType): void;\n  (e: \'update:modelValue\', payload: VModelType): void;\n  (e: \'clear\'): void;\n}',
			},
			events: [{
				'name': 'focus',
				'payload': 'FocusEvent',
				'optional': false,
				'desc': {
					'en': 'emitted on focus',
					'fr': 'émis lors du focus',
				},
			}, {
				'name': 'blur',
				'payload': 'FocusEvent',
				'optional': true,
				'desc': {
					'en': 'emitted when the focus leaves the field',
					'fr': 'émis quand le focus quitte le champ',
				},
			}, {
				'name': 'input',
				'payload': 'VModelType',
				'optional': false,
				'desc': {
					'en': 'emitted when the value of the field changes',
					'fr': 'émis lorsque la valeur est modifiée',
				},
			}, {
				'name': 'change',
				'payload': 'VModelType',
				'optional': true,
				'desc': {
					'en': 'emitted when the value of the field changes',
					'fr': 'émis lorsque la valeur est modifiée',
				},
			}, {
				'name': 'update:modelValue',
				'payload': 'VModelType',
				'optional': false,
				'desc': {
					'en': 'emitted to update the field value',
					'fr': 'émis pour mettre à jour la valeur',
				},
			}, {
				'name': 'clear',
				'payload': 'undefined',
				'optional': false,
				'desc': {
					'en': 'emitted when the field is cleared',
					'fr': 'émis quand le champ est vidé',
				},
			}],
			provide: [],
			slots: [{
				'name': 'default',
				'desc': {
					'en': 'the label displayed in the drop area',
					'fr': 'contenu pour remplacer le label par défaut',
				},
				'bindings': [],
			}],
			props: [{
				'name': 'autofocus',
				'defaultValue': false,
				'type': 'boolean',
				'required': false,
				'desc': {
					'en': 'autofocus the field when mounted.',
					'fr': 'focus automatiquement le champ lorsqu\'il est monté.',
				},
			}, {
				'name': 'clearable',
				'defaultValue': false,
				'type': 'boolean',
				'required': false,
				'desc': {
					'en': 'defines if the field can be cleared.',
					'fr': 'définit si le champ peut être vidé.',
				},
			}, {
				'name': 'clearToNull',
				'defaultValue': false,
				'type': 'boolean',
				'required': false,
				'desc': {
					'en': 'sets the value to null when the field is cleared',
					'fr': 'lorsque que le champ est vidé, sa valeur vaut `null`',
				},
			}, {
				'name': 'disabled',
				'defaultValue': false,
				'type': 'boolean',
				'required': false,
				'desc': {
					'en': 'disables the field',
					'fr': 'désactive le champ',
				},
			}, {
				'name': 'donetyping',
				'defaultValue': '0',
				'type': 'number',
				'required': false,
				'desc': {
					'en': 'define the debounce duration before updating the value (useful for search field)',
					'fr': 'défini la durée du debounce avant de mettre à jour la valeur (utile pour les champs de recherche)',
				},
			}, {
				'name': 'fileMaxSize',
				'defaultValue': '4',
				'type': 'number',
				'required': false,
				'desc': {
					'en': 'the maximal size of the uploaded file (Mo)',
					'fr': 'taille maximale d\'un fichier (Mo)',
				},
			}, {
				'name': 'fileTypes',
				'defaultValue': '() => [\'image/jpeg\', \'image/png\', \'image/gif\', \'application/pdf\']',
				'type': 'string[]',
				'required': false,
				'desc': {
					'en': 'Missing @doc',
					'fr': 'Missing @doc',
				},
			}, {
				'name': 'forceLabelFloating',
				'defaultValue': false,
				'type': 'boolean',
				'required': false,
				'desc': {
					'en': 'allows floating label',
					'fr': 'permet au label de se placer au dessus du champ lorsqu\'il possède une valeur',
				},
			}, {
				'name': 'inheritValidationState',
				'defaultValue': 'undefined',
				'type': 'boolean',
				'required': false,
				'desc': {
					'en': 'defines if the validation comes from its parent',
					'fr': 'définit si la validation provient du parent',
				},
			}, {
				'name': 'label',
				'defaultValue': 'undefined',
				'type': 'string',
				'required': false,
				'desc': {
					'en': 'label of the field',
					'fr': 'le label du champ',
				},
			}, {
				'name': 'modelValue',
				'type': 'T',
				'required': false,
				'desc': {
					'en': 'modelValue of the component',
					'fr': 'modelValue du composant',
				},
			}, {
				'name': 'multiple',
				'defaultValue': false,
				'type': 'boolean',
				'required': false,
				'desc': {
					'en': 'allows multiple files upload.',
					'fr': 'permet le chargement de plusieurs fichiers.',
				},
			}, {
				'name': 'prefixFontIcon',
				'type': 'string',
				'required': false,
				'desc': {
					'en': 'the prefix icon from the imported font library',
					'fr': 'définit l\'icône de préfixe à partir de la librairie de police importée',
				},
			}, {
				'name': 'prefixIcon',
				'type': 'Orion.Icon',
				'required': false,
				'desc': {
					'en': 'the prefix icon',
					'fr': 'définit l\'icône de préfixe',
				},
			}, {
				'name': 'readonly',
				'defaultValue': false,
				'type': 'boolean',
				'required': false,
				'desc': {
					'en': 'sets the field to read-only mode',
					'fr': 'définit le champ comme étant en lecture seule',
				},
			}, {
				'name': 'required',
				'defaultValue': false,
				'type': 'boolean',
				'required': false,
				'desc': {
					'en': 'sets the field required',
					'fr': 'indique que le champ est obligatoire',
				},
			}, {
				'name': 'selectOnFocus',
				'defaultValue': false,
				'type': 'boolean',
				'required': false,
				'desc': {
					'en': 'select the field content when focused.',
					'fr': 'sélectionne le contenu du champ lorsqu\'il est focus.',
				},
			}, {
				'name': 'showPreview',
				'defaultValue': 'true',
				'type': 'boolean',
				'required': false,
				'desc': {
					'en': 'shows a preview of the selected file',
					'fr': 'montre un apperçu du fichier chargé',
				},
			}, {
				'name': 'size',
				'defaultValue': '\'md\'',
				'type': 'Orion.Size',
				'required': false,
				'sharedDefaultValue': '\'md\'',
				'desc': {
					'en': 'define the size',
					'fr': 'définit la taille',
				},
			}, {
				'name': 'suffixFontIcon',
				'type': 'string',
				'required': false,
				'desc': {
					'en': 'the suffix icon from the imported font library',
					'fr': 'Missing @doc',
				},
			}, {
				'name': 'suffixIcon',
				'type': 'Orion.Icon',
				'required': false,
				'desc': {
					'en': 'the suffix icon',
					'fr': 'définit l\'icône de suffixe',
				},
			}, {
				'name': 'type',
				'defaultValue': '\'text\'',
				'type': 'string | Orion.DatepickerType',
				'required': false,
				'desc': {
					'en': 'type of the input',
					'fr': 'type of the input',
				},
			}, {
				'name': 'validation',
				'defaultValue': 'undefined',
				'type': 'string | ((val: any) => boolean) | Orion.Validator.Rule | Orion.Validation.Rule | boolean',
				'required': false,
				'desc': {
					'en': 'the validation for the field',
					'fr': 'la validation du champ',
				},
			}, {
				'name': 'validationErrorMessage',
				'defaultValue': 'undefined',
				'type': 'string',
				'required': false,
				'desc': {
					'en': 'the error message displayed after input\'s validation.',
					'fr': 'le message d\'erreur affiché en cas d\'erreur lors de la validation',
				},
			}],
			publicInstance: [{
				'name': 'hasBeenFocus',
				'type': '() => boolean',
			}, {
				'name': 'isFocus',
				'type': '() => boolean',
			}, {
				'name': 'focus',
				'type': '() => void',
			}, {
				'name': 'blur',
				'type': 'Lodash.debounce',
			}, {
				'name': 'clear',
				'type': '() => void',
			}, {
				'name': 'setHasBeenFocus',
				'type': '(value: boolean) => void',
			}, {
				'name': 'isValid',
				'type': '() => boolean',
			}, {
				'name': '_el',
				'type': '() => HTMLElement | undefined',
			}],
		},
	],
]);

export default packagesDocData;
