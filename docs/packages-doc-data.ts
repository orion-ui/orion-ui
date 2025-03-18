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
			events: [],
			provide: [],
			slots: [{
				'name': 'default',
				'desc': {
					'en': 'the content of the alert',
					'fr': 'contenu de l\'alerte',
				},
				'bindings': [],
			}],
			vModel: [],
			props: [{
				'name': 'center',
				'type': 'boolean',
				'desc': {
					'en': 'Defines if the content must be centered in the component',
					'fr': 'Défini si le contenu doit être centré dans le composant',
				},
			}, {
				'name': 'close',
				'type': 'boolean',
				'desc': {
					'en': 'Defines if the alert can be closed',
					'fr': 'Si défini, une croix permet de fermer l\'alert',
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
				'name': 'title',
				'type': 'string',
				'desc': {
					'en': 'Title of the alert',
					'fr': 'Titre de l\'alert',
				},
			}],
			publicInstance: undefined,
		},
	],
	[
		'Aside',
		{
			localTypes: {},
			events: [],
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
			vModel: [],
			props: [{
				'name': 'display',
				'type': 'boolean',
				'desc': {
					'en': 'if set, displays the component',
					'fr': 'Missing @doc',
				},
			}, {
				'name': 'options',
				'type': 'any',
				'desc': {
					'en': 'options of the aside',
					'fr': 'options de l\'aside',
				},
				'defaultValue': '() => ({}) as Partial<Orion.Popable.Options>',
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
				'type': '(options?: Orion.Popable.CloseOptions) => Promise<void>',
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
			vModel: [],
			props: [{
				'name': 'avatar',
				'type': 'string | number | { id: number; }',
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
				'defaultValue': '\'brand\' ',
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
				'type': 'any',
				'desc': {
					'en': 'define the size',
					'fr': 'définit la taille',
				},
				'defaultValue': 'SharedProps.size[\'size\'] ',
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
			publicInstance: undefined,
		},
	],
	[
		'Button',
		{
			localTypes: {},
			events: [],
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
			publicInstance: undefined,
		},
	],
	[
		'Card',
		{
			localTypes: {},
			events: [],
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
			vModel: [],
			props: [{
				'name': 'actionsLine',
				'type': 'boolean',
				'desc': {
					'en': 'displays a line between the body and the actions of the card',
					'fr': 'affiche une line de sépération entre les slots `default` et `actions` de la carte',
				},
			}, {
				'name': 'gradient',
				'type': 'string',
				'desc': {
					'en': 'adds a gradient in the backgroung of the card',
					'fr': 'ajoute un dégradé sur l\'arrière plan de la carte',
				},
			}, {
				'name': 'headerLine',
				'type': 'boolean',
				'desc': {
					'en': 'displays a line between the header and the body of the card',
					'fr': 'affiche une line de sépération entre les slots `header` et `default` de la carte',
				},
			}, {
				'name': 'hoverElevation',
				'type': 'number',
				'desc': {
					'en': 'elevation level on mouse hover',
					'fr': 'niveau d\'élévation au survol de la souris',
				},
				'defaultValue': '1',
			}, {
				'name': 'selected',
				'type': 'boolean',
				'desc': {
					'en': 'adds a selected style on the card',
					'fr': 'ajoute le style `selected` sur la carte',
				},
			}, {
				'name': 'selectedColor',
				'type': 'Orion.Color',
				'desc': {
					'en': 'changes the color of the selected style',
					'fr': 'définit la couleur du style `selected`',
				},
				'defaultValue': '\'info\' ',
			}, {
				'name': 'size',
				'type': 'Orion.Size',
				'desc': {
					'en': 'define the size',
					'fr': 'définit la taille',
				},
				'defaultValue': '\'md\' ',
			}, {
				'name': 'title',
				'type': 'string',
				'desc': {
					'en': 'the title of the card',
					'fr': 'titre de la carte',
				},
			}],
			publicInstance: undefined,
		},
	],
	[
		'Carousel',
		{
			localTypes: {},
			events: [],
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
			vModel: [{
				'name': 'vModel',
				'type': 'Undef<number | string>',
				'desc': {
					'en': 'refers to the active step\'s **name** prop',
					'fr': 'correspond à la prop **name** de l\'élément actif',
				},
				'defaultValue': 'undefined',
			}],
			props: [{
				'name': 'color',
				'type': 'any',
				'desc': {
					'en': 'defines the color',
					'fr': 'définit la couleur',
				},
				'defaultValue': '\'brand\' ',
			}, {
				'name': 'hideNavigationButtons',
				'type': 'boolean',
				'desc': {
					'en': 'hide the navigation buttons around the dots',
					'fr': 'masque les boutons de navigation autour des points',
				},
			}, {
				'name': 'hideNavigationDots',
				'type': 'boolean',
				'desc': {
					'en': 'hide the navigation dots',
					'fr': 'masque les points de navigation',
				},
			}, {
				'name': 'loop',
				'type': 'boolean',
				'desc': {
					'en': 'enable the "loop" mode',
					'fr': 'active le mode "en boucle"',
				},
			}, {
				'name': 'pauseOnHover',
				'type': 'boolean',
				'desc': {
					'en': 'pause timer when hovering the carousel',
					'fr': 'met au pause le minuteur lors du survol du carrousel',
				},
			}, {
				'name': 'stepTimer',
				'type': 'number',
				'desc': {
					'en': 'apply a timer to automatically switch to the next item',
					'fr': 'applique un minuteur pour passer automatiquement à l\'élément suivant',
				},
			}],
			publicInstance: [{
				'name': 'step',
				'type': '() => Undef<string | number>',
			}, {
				'name': 'stepsLength',
				'type': '() => number',
			}, {
				'name': 'stepIndex',
				'type': '() => number',
			}, {
				'name': 'shouldLoop',
				'type': '() => boolean | undefined',
			}, {
				'name': 'goToStep',
				'type': '(step: (typeof this.steps)[number]) => void',
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
			vModel: [],
			props: [{
				'name': 'lazy',
				'type': 'boolean',
				'desc': {
					'en': 'the content of the item is mounted each time the item becomes active',
					'fr': 'le contenu de l\'élément est monté à chaque fois qu\'il devient actif',
				},
			}, {
				'name': 'lazyOnce',
				'type': 'boolean',
				'desc': {
					'en': 'the content of the item is only mounted once, the first time the item is active',
					'fr': 'le contenu de l\'élément est uniquement monté une fois, la première fois qu\'il est actif',
				},
			}, {
				'name': 'name',
				'type': 'string | number',
				'desc': {
					'en': 'step identifier',
					'fr': 'identifiant de l\'élément',
				},
			}],
			publicInstance: undefined,
		},
	],
	[
		'Chat',
		{
			localTypes: {},
			events: [],
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
			vModel: [],
			props: [{
				'name': 'chat',
				'type': 'import("services/ChatService").ChatService',
				'desc': {
					'en': 'instance of the chat service',
					'fr': 'instance du service `chat`',
				},
			}, {
				'name': 'discussionId',
				'type': 'number',
				'desc': {
					'en': 'id of the discussion',
					'fr': 'id de la discussion',
				},
			}, {
				'name': 'focusOnOpen',
				'type': 'boolean',
				'desc': {
					'en': 'focused the input field chat the chat opens',
					'fr': 'place le focus sur la zone de texte quand le chat s\'ouvre',
				},
			}, {
				'name': 'hideSearch',
				'type': 'boolean',
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
			localTypes: {},
			events: [],
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
			vModel: [],
			props: [{
				'name': 'chat',
				'type': 'import("services/ChatService").ChatService',
				'desc': {
					'en': 'instance of the chat service',
					'fr': 'instance du service `chat`',
				},
			}],
			publicInstance: undefined,
		},
	],
	[
		'ChatMessage',
		{
			localTypes: {},
			events: [],
			provide: [],
			slots: [],
			vModel: [],
			props: [{
				'name': 'chat',
				'type': 'import("services/ChatService").ChatService',
				'desc': {
					'en': 'instance of the chat',
					'fr': 'instance du service `chat`',
				},
			}, {
				'name': 'discussion',
				'type': 'import("/Users/julie/Documents/projet/orion-github/packages/Chat/src/OrionChatEntity").default',
				'desc': {
					'en': 'the discussion related to the message',
					'fr': 'discussion relative au message',
				},
			}, {
				'name': 'message',
				'type': 'import("/Users/julie/Documents/projet/orion-github/packages/ChatMessage/src/OrionChatMessageEntity").default',
				'desc': {
					'en': 'message object',
					'fr': 'Objet représentant le message',
				},
			}],
			publicInstance: undefined,
		},
	],
	[
		'Checkbox',
		{
			localTypes: {},
			events: [],
			provide: [],
			slots: [{
				'name': 'default',
				'desc': {
					'en': 'content of the checkbox to replace the default label.',
					'fr': 'Missing @doc',
				},
				'bindings': [],
			}],
			vModel: [{
				'name': 'vModel',
				'type': 'any[] | boolean | null | undefined',
				'desc': {
					'en': 'component\'s vModel',
					'fr': 'vModel du composant',
				},
				'defaultValue': 'undefined',
			}],
			props: [{
				'name': 'autofocus',
				'type': 'boolean',
				'desc': {
					'en': 'autofocus the field when mounted.',
					'fr': 'focus automatiquement le champ lorsqu\'il est monté.',
				},
			}, {
				'name': 'clearable',
				'type': 'boolean',
				'desc': {
					'en': 'defines if the field can be cleared.',
					'fr': 'définit si le champ peut être vidé.',
				},
			}, {
				'name': 'clearToNull',
				'type': 'boolean',
				'desc': {
					'en': 'sets the value to null when the field is cleared',
					'fr': 'lorsque que le champ est vidé, sa valeur vaut `null`',
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
					'en': 'disables the field',
					'fr': 'désactive le champ',
				},
			}, {
				'name': 'donetyping',
				'type': 'number',
				'desc': {
					'en': 'define the debounce duration before updating the value (useful for search field)',
					'fr': 'défini la durée du debounce avant de mettre à jour la valeur (utile pour les champs de recherche)',
				},
			}, {
				'name': 'forceLabelFloating',
				'type': 'boolean',
				'desc': {
					'en': 'allows floating label',
					'fr': 'permet au label de se placer au dessus du champ lorsqu\'il possède une valeur',
				},
			}, {
				'name': 'iconCheck',
				'type': 'Orion.Icon',
				'desc': {
					'en': 'the icon when the checkbox is checked',
					'fr': 'l\'icône lorsque la case est cochée',
				},
			}, {
				'name': 'inheritValidationState',
				'type': 'boolean',
				'desc': {
					'en': 'defines if the validation comes from its parent',
					'fr': 'définit si la validation provient du parent',
				},
			}, {
				'name': 'inline',
				'type': 'boolean',
				'desc': {
					'en': 'set the property `display` on `inline-flex` instead of `flex`',
					'fr': 'défini la propriété `display` à `inline-flex` à la place `flex`',
				},
			}, {
				'name': 'inputValue',
				'type': 'string | number | boolean | Object | any[] | Date',
				'desc': {
					'en': 'the value of the checkbox',
					'fr': 'valeur de la case à cocher',
				},
			}, {
				'name': 'label',
				'type': 'string',
				'desc': {
					'en': 'label of the field',
					'fr': 'le label du champ',
				},
			}, {
				'name': 'multiple',
				'type': 'boolean',
				'desc': {
					'en': 'allows to select multiples checkbox values, related to v-model array',
					'fr': 'permet de selectionner plusieurs cases à cocher, dans le cas où le v-model est un tableau',
				},
			}, {
				'name': 'placeholder',
				'type': 'string',
				'desc': {
					'en': 'placeholder of the field',
					'fr': 'le placeholder du champ',
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
				'name': 'readonly',
				'type': 'boolean',
				'desc': {
					'en': 'sets the field to read-only mode',
					'fr': 'définit le champ comme étant en lecture seule',
				},
			}, {
				'name': 'required',
				'type': 'boolean',
				'desc': {
					'en': 'sets the field required',
					'fr': 'indique que le champ est obligatoire',
				},
			}, {
				'name': 'reverse',
				'type': 'boolean',
				'desc': {
					'en': 'displays the label first',
					'fr': 'affiche d\'abord le label puis la case à cocher',
				},
			}, {
				'name': 'selectOnFocus',
				'type': 'boolean',
				'desc': {
					'en': 'select the field content when focused.',
					'fr': 'sélectionne le contenu du champ lorsqu\'il est focus.',
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
			}, {
				'name': 'type',
				'type': 'any',
				'desc': {
					'en': 'the type of the input',
					'fr': 'type du champ',
				},
				'defaultValue': '\'checkbox\'',
			}, {
				'name': 'validation',
				'type': 'any',
				'desc': {
					'en': 'the validation for the field',
					'fr': 'la validation du champ',
				},
			}, {
				'name': 'validationErrorMessage',
				'type': 'string',
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
				'name': '_input',
				'type': '() => HTMLInputElement | undefined',
			}, {
				'name': 'sharedState',
				'type': '() => {\n\thasBeenFocus: boolean;\n\tisFocus: boolean;\n\tisAutoFilled: boolean;\n}',
			}],
		},
	],
	[
		'Chips',
		{
			localTypes: {},
			events: [],
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
			vModel: [],
			props: [{
				'name': 'close',
				'type': 'boolean',
				'desc': {
					'en': 'Defines if the chips can be closed',
					'fr': 'définit si le chips peut être fermée',
				},
			}, {
				'name': 'color',
				'type': 'Orion.ColorExtendedAndGreys',
				'desc': {
					'en': 'defines the color',
					'fr': 'définit la couleur',
				},
				'defaultValue': '\'default\' ',
			}, {
				'name': 'outline',
				'type': 'boolean',
				'desc': {
					'en': 'Adds an outline style on the chips',
					'fr': 'modifie le style en ajoutant un contraste',
				},
			}, {
				'name': 'size',
				'type': 'Orion.Size',
				'desc': {
					'en': 'define the size',
					'fr': 'définit la taille',
				},
				'defaultValue': '\'md\' ',
			}],
			publicInstance: undefined,
		},
	],
	[
		'ColorPicker',
		{
			localTypes: {},
			events: [],
			provide: [],
			slots: [],
			vModel: [{
				'name': 'vModel',
				'type': 'Nil<string>',
				'desc': {
					'en': 'component\'s vModel',
					'fr': 'vModel du composant',
				},
				'defaultValue': 'undefined',
			}],
			props: [{
				'name': 'autofocus',
				'type': 'boolean',
				'desc': {
					'en': 'autofocus the field when mounted.',
					'fr': 'focus automatiquement le champ lorsqu\'il est monté.',
				},
			}, {
				'name': 'clearable',
				'type': 'boolean',
				'desc': {
					'en': 'defines if the field can be cleared.',
					'fr': 'définit si le champ peut être vidé.',
				},
			}, {
				'name': 'clearToNull',
				'type': 'boolean',
				'desc': {
					'en': 'sets the value to null when the field is cleared',
					'fr': 'lorsque que le champ est vidé, sa valeur vaut `null`',
				},
			}, {
				'name': 'debounce',
				'type': 'number',
				'desc': {
					'en': 'the debounce interval',
					'fr': 'définits la durée selon laquelle la valeur va se mettre à jour',
				},
				'defaultValue': '300',
			}, {
				'name': 'disabled',
				'type': 'boolean',
				'desc': {
					'en': 'disables the field',
					'fr': 'désactive le champ',
				},
			}, {
				'name': 'donetyping',
				'type': 'number',
				'desc': {
					'en': 'define the debounce duration before updating the value (useful for search field)',
					'fr': 'défini la durée du debounce avant de mettre à jour la valeur (utile pour les champs de recherche)',
				},
			}, {
				'name': 'forceLabelFloating',
				'type': 'boolean',
				'desc': {
					'en': 'allows floating label',
					'fr': 'permet au label de se placer au dessus du champ lorsqu\'il possède une valeur',
				},
			}, {
				'name': 'format',
				'type': 'ColorFormat',
				'desc': {
					'en': 'the format of the color definition',
					'fr': 'format de la couleur',
				},
				'defaultValue': '\'hex\' as ColorFormat',
			}, {
				'name': 'hideHex',
				'type': 'boolean',
				'desc': {
					'en': 'hides the hexadecimal value',
					'fr': 'masque la valeur hexadécimale',
				},
			}, {
				'name': 'hideRgba',
				'type': 'boolean',
				'desc': {
					'en': 'hides the rgba value',
					'fr': 'masque la valeur rgba',
				},
			}, {
				'name': 'inheritValidationState',
				'type': 'boolean',
				'desc': {
					'en': 'defines if the validation comes from its parent',
					'fr': 'définit si la validation provient du parent',
				},
			}, {
				'name': 'label',
				'type': 'string',
				'desc': {
					'en': 'label of the field',
					'fr': 'le label du champ',
				},
			}, {
				'name': 'placeholder',
				'type': 'string',
				'desc': {
					'en': 'placeholder of the field',
					'fr': 'le placeholder du champ',
				},
			}, {
				'name': 'prefixFontIcon',
				'type': 'string',
				'desc': {
					'en': 'Missing @doc',
					'fr': 'Missing @doc',
				},
			}, {
				'name': 'prefixIcon',
				'type': 'Orion.Icon',
				'desc': {
					'en': 'Missing @doc',
					'fr': 'Missing @doc',
				},
			}, {
				'name': 'readonly',
				'type': 'boolean',
				'desc': {
					'en': 'sets the field to read-only mode',
					'fr': 'définit le champ comme étant en lecture seule',
				},
			}, {
				'name': 'required',
				'type': 'boolean',
				'desc': {
					'en': 'sets the field required',
					'fr': 'indique que le champ est obligatoire',
				},
			}, {
				'name': 'selectOnFocus',
				'type': 'boolean',
				'desc': {
					'en': 'select the field content when focused.',
					'fr': 'sélectionne le contenu du champ lorsqu\'il est focus.',
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
				'name': 'startValue',
				'type': 'string',
				'desc': {
					'en': 'the default value',
					'fr': 'la valeur par défaut',
				},
			}, {
				'name': 'suffixFontIcon',
				'type': 'string',
				'desc': {
					'en': 'Missing @doc',
					'fr': 'Missing @doc',
				},
			}, {
				'name': 'suffixIcon',
				'type': 'Orion.Icon',
				'desc': {
					'en': 'Missing @doc',
					'fr': 'Missing @doc',
				},
			}, {
				'name': 'type',
				'type': 'any',
				'desc': {
					'en': 'type of the input',
					'fr': 'type of the input',
				},
			}, {
				'name': 'validation',
				'type': 'any',
				'desc': {
					'en': 'the validation for the field',
					'fr': 'la validation du champ',
				},
			}, {
				'name': 'validationErrorMessage',
				'type': 'string',
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
				'name': '_input',
				'type': '() => HTMLInputElement | undefined',
			}, {
				'name': 'sharedState',
				'type': '() => {\n\thasBeenFocus: boolean;\n\tisFocus: boolean;\n\tisAutoFilled: boolean;\n}',
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
			vModel: [],
			props: [{
				'name': 'circle',
				'type': 'boolean',
				'desc': {
					'en': 'define if the shape of the cropper is a circle (otherwise a square)',
					'fr': 'définit si le recadrage prend la forme d\'unn cercle (un rectangle sinon)',
				},
			}, {
				'name': 'cropHeight',
				'type': 'number',
				'desc': {
					'en': 'the height of the cropped image',
					'fr': 'la hauteur de l\'image recadrée',
				},
				'defaultValue': '300',
			}, {
				'name': 'cropWidth',
				'type': 'number',
				'desc': {
					'en': 'the width of the cropped image',
					'fr': 'la largeur de l\'image recadrée',
				},
				'defaultValue': '300',
			}, {
				'name': 'file',
				'type': 'File',
				'desc': {
					'en': 'the file',
					'fr': 'le fichier à recadrer',
				},
			}, {
				'name': 'options',
				'type': 'Object',
				'desc': {
					'en': 'options of the cropper',
					'fr': 'les options du cropper',
				},
			}, {
				'name': 'zoomMax',
				'type': 'number',
				'desc': {
					'en': 'the maximum zoom',
					'fr': 'le zoom maximum',
				},
				'defaultValue': '3',
			}, {
				'name': 'zoomMin',
				'type': 'number',
				'desc': {
					'en': 'the minimal zoom',
					'fr': 'le zoom minimum',
				},
				'defaultValue': '0.01',
			}, {
				'name': 'zoomStep',
				'type': 'number',
				'desc': {
					'en': 'the step of the zoom',
					'fr': 'le pas du zoom',
				},
				'defaultValue': '0.01',
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
			localTypes: {},
			events: [],
			provide: [],
			slots: [],
			vModel: [{
				'name': 'date',
				'type': 'Date',
				'desc': {
					'en': 'the selected date.',
					'fr': 'la date sélectionnée.',
				},
				'defaultValue': 'undefined',
			}],
			props: [{
				'name': 'dayTasks',
				'type': 'Orion.DailyCalendarTask[]',
				'desc': {
					'en': 'tasks array',
					'fr': 'le tableau de qui contient les tâches du jour',
				},
			}, {
				'name': 'range',
				'type': 'number[]',
				'desc': {
					'en': 'hour range displayed.',
					'fr': 'la plage horaire affichée.',
				},
				'defaultValue': '() => ([\n\t\t\t8,\n\t\t\t18,\n\t\t])',
			}],
			publicInstance: undefined,
		},
	],
	[
		'DateTable',
		{
			localTypes: {},
			events: [],
			provide: [],
			slots: [],
			vModel: [{
				'name': 'vModel',
				'type': 'Nil<Date>',
				'desc': {
					'en': 'Missing @doc',
					'fr': 'Missing @doc',
				},
				'defaultValue': 'undefined',
			}, {
				'name': 'range',
				'type': 'Nil<Orion.DateRange>',
				'desc': {
					'en': 'the vModel if the type is set to `range`',
					'fr': 'vModel du composant si la prop `type` est `range`',
				},
				'defaultValue': 'undefined',
			}, {
				'name': 'multiple',
				'type': 'Nil<Date[]>',
				'desc': {
					'en': 'the vModel if the type is set to `multiple`',
					'fr': 'vModel du composant si la prop `type` est `multiple`',
				},
				'defaultValue': 'undefined',
			}, {
				'name': 'dayHover',
				'type': 'Nil<Date>',
				'desc': {
					'en': 'the value of the hovered day',
					'fr': 'valeur du jour survolé',
				},
				'defaultValue': 'undefined',
			}],
			props: [{
				'name': 'canGoNextMonth',
				'type': 'boolean',
				'desc': {
					'en': 'allows the navigation to the next month',
					'fr': 'permet la navigation vers le mois suivant',
				},
				'defaultValue': 'true',
			}, {
				'name': 'canGoPrevMonth',
				'type': 'boolean',
				'desc': {
					'en': 'allows the navigation to the previous month',
					'fr': 'permet la navigation vers le mois précédent',
				},
				'defaultValue': 'true',
			}, {
				'name': 'dateRangeSameMonth',
				'type': 'boolean',
				'desc': {
					'en': 'when the component is used in a OrionDatepicker component with type \'range\', specified if the daterange is in one month',
					'fr': 'quand le composant est utilisé dans un OrionDatepicker de type \'range\', défini si la période sélectionnée se situe sur un seul même mois.',
				},
			}, {
				'name': 'dateSelected',
				'type': 'Date',
				'desc': {
					'en': 'the selected date',
					'fr': 'la date selectionée',
				},
			}, {
				'name': 'disableMonthAndYear',
				'type': 'boolean',
				'desc': {
					'en': 'disabled month and year selection on top',
					'fr': 'désactive la sélection du mois et de l\'année en haut du calendrier',
				},
			}, {
				'name': 'displayWeekNumber',
				'type': 'boolean',
				'desc': {
					'en': 'if true, displays week number on each row',
					'fr': 'si true, affiche le numéro de semaine sur chaque ligne',
				},
			}, {
				'name': 'maxDate',
				'type': 'Date',
				'desc': {
					'en': 'the maximum date which can be selected',
					'fr': 'la date maximum qui peut être sélectionnée',
				},
			}, {
				'name': 'minDate',
				'type': 'Date',
				'desc': {
					'en': 'the minimum date which can be selected',
					'fr': 'la date minimum qui peut être selectionée',
				},
			}, {
				'name': 'month',
				'type': 'boolean',
				'desc': {
					'en': 'if set, displays only months',
					'fr': 'si défini, affiche uniquement les mois',
				},
			}, {
				'name': 'periods',
				'type': 'Orion.Period[]',
				'desc': {
					'en': 'periods to display on the table',
					'fr': 'périodes à afficher',
				},
			}, {
				'name': 'rangeEnd',
				'type': 'boolean',
				'desc': {
					'en': 'if set, defines the range end value as the current value',
					'fr': 'si définie, la date selectionnée est la fin de la période',
				},
			}, {
				'name': 'rangeStart',
				'type': 'boolean',
				'desc': {
					'en': 'if set, defines the range start value as the current value',
					'fr': 'si définie, la date sélectionnée est le début de la période',
				},
			}, {
				'name': 'type',
				'type': 'Orion.DateTableType',
				'desc': {
					'en': 'the type of the vModel',
					'fr': 'le type de vModel',
				},
				'defaultValue': '\'date\' ',
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
			localTypes: {},
			events: [],
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
			}, {
				'name': 'popper',
				'desc': {
					'en': 'Missing @doc',
					'fr': 'Missing @doc',
				},
				'bindings': [],
			}],
			vModel: [{
				'name': 'vModel',
				'type': 'Nil<Date>',
				'desc': {
					'en': 'the vModel if the type is set to `date`',
					'fr': 'le vModel si le type est défini à `date`',
				},
				'defaultValue': 'undefined',
			}, {
				'name': 'range',
				'type': 'Nil<Orion.DateRange>',
				'desc': {
					'en': 'the vModel if the type is set to `range`',
					'fr': 'le vModel si le type est défini à `range`',
				},
				'defaultValue': 'undefined',
			}, {
				'name': 'multiple',
				'type': 'Nil<Date[]>',
				'desc': {
					'en': 'the vModel if the type is set to `multiple`',
					'fr': 'le vModel si le type est défini à `multiple`',
				},
				'defaultValue': 'undefined',
			}],
			props: [{
				'name': 'autofocus',
				'type': 'boolean',
				'desc': {
					'en': 'autofocus the field when mounted.',
					'fr': 'focus automatiquement le champ lorsqu\'il est monté.',
				},
			}, {
				'name': 'clearable',
				'type': 'boolean',
				'desc': {
					'en': 'defines if the field can be cleared.',
					'fr': 'définit si le champ peut être vidé.',
				},
			}, {
				'name': 'clearToNull',
				'type': 'boolean',
				'desc': {
					'en': 'sets the value to null when the field is cleared',
					'fr': 'lorsque que le champ est vidé, sa valeur vaut `null`',
				},
			}, {
				'name': 'disabled',
				'type': 'boolean',
				'desc': {
					'en': 'disables the field',
					'fr': 'désactive le champ',
				},
			}, {
				'name': 'disablePopover',
				'type': 'boolean',
				'desc': {
					'en': 'if you don\'t want to use the calendar popover',
					'fr': 'si vous ne souhaitez pas utiliser la popover avec le calendrier',
				},
			}, {
				'name': 'displayWeekNumber',
				'type': 'boolean',
				'desc': {
					'en': 'if true, displays week number on each row',
					'fr': 'si true, affiche le numéro de semaine sur chaque ligne',
				},
			}, {
				'name': 'donetyping',
				'type': 'number',
				'desc': {
					'en': 'define the debounce duration before updating the value (useful for search field)',
					'fr': 'défini la durée du debounce avant de mettre à jour la valeur (utile pour les champs de recherche)',
				},
			}, {
				'name': 'forceLabelFloating',
				'type': 'boolean',
				'desc': {
					'en': 'allows floating label',
					'fr': 'permet au label de se placer au dessus du champ lorsqu\'il possède une valeur',
				},
			}, {
				'name': 'hideDisabled',
				'type': 'boolean',
				'desc': {
					'en': 'hide disabled dates (currently for type="week" only)',
					'fr': 'cache les dates désactivées (actuellement uniquement avec type="week")',
				},
			}, {
				'name': 'inheritValidationState',
				'type': 'boolean',
				'desc': {
					'en': 'defines if the validation comes from its parent',
					'fr': 'définit si la validation provient du parent',
				},
			}, {
				'name': 'label',
				'type': 'string',
				'desc': {
					'en': 'label of the field',
					'fr': 'le label du champ',
				},
			}, {
				'name': 'maxDate',
				'type': 'Date',
				'desc': {
					'en': 'the maximum date which can be selected',
					'fr': 'la date maximum qui peut être sélectionnée',
				},
			}, {
				'name': 'minDate',
				'type': 'Date',
				'desc': {
					'en': 'the minimum date which can be selected',
					'fr': 'la date minimum qui peut être sélectionnée',
				},
			}, {
				'name': 'multipleLabelColor',
				'type': 'Orion.ColorExtendedAndGreys',
				'desc': {
					'en': 'color of the displayed dates is the type is set to `multiple`',
					'fr': 'couleurs des dates affichées si le type est défini à `multiple`',
				},
				'defaultValue': '\'default\' ',
			}, {
				'name': 'placeholder',
				'type': 'string',
				'desc': {
					'en': 'placeholder of the field',
					'fr': 'le placeholder du champ',
				},
			}, {
				'name': 'prefixFontIcon',
				'type': 'string',
				'desc': {
					'en': 'Missing @doc',
					'fr': 'Missing @doc',
				},
			}, {
				'name': 'prefixIcon',
				'type': 'Orion.Icon',
				'desc': {
					'en': 'Missing @doc',
					'fr': 'Missing @doc',
				},
			}, {
				'name': 'preserveTime',
				'type': 'boolean',
				'desc': {
					'en': 'keep the current time value when changing date',
					'fr': 'conserve la valeur actuelle de l\'heure lors du changement de date',
				},
			}, {
				'name': 'readonly',
				'type': 'boolean',
				'desc': {
					'en': 'sets the field to read-only mode',
					'fr': 'définit le champ comme étant en lecture seule',
				},
			}, {
				'name': 'required',
				'type': 'boolean',
				'desc': {
					'en': 'sets the field required',
					'fr': 'indique que le champ est obligatoire',
				},
			}, {
				'name': 'selectOnFocus',
				'type': 'boolean',
				'desc': {
					'en': 'select the field content when focused.',
					'fr': 'sélectionne le contenu du champ lorsqu\'il est focus.',
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
					'en': 'Missing @doc',
					'fr': 'Missing @doc',
				},
			}, {
				'name': 'suffixIcon',
				'type': 'Orion.Icon',
				'desc': {
					'en': 'Missing @doc',
					'fr': 'Missing @doc',
				},
			}, {
				'name': 'time',
				'type': 'boolean',
				'desc': {
					'en': 'displays also hours/minutes',
					'fr': 'affiche aussi les heures/minutes',
				},
			}, {
				'name': 'type',
				'type': 'any',
				'desc': {
					'en': 'the type of the vModel',
					'fr': 'le type de vModel',
				},
				'defaultValue': '\'date\' ',
			}, {
				'name': 'validation',
				'type': 'any',
				'desc': {
					'en': 'the validation for the field',
					'fr': 'la validation du champ',
				},
			}, {
				'name': 'validationErrorMessage',
				'type': 'string',
				'desc': {
					'en': 'the error message displayed after input\'s validation.',
					'fr': 'le message d\'erreur affiché en cas d\'erreur lors de la validation',
				},
			}, {
				'name': 'valueDisplayFormat',
				'type': '(val: Date) => string',
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
				'name': '_input',
				'type': '() => HTMLInputElement | undefined',
			}, {
				'name': 'sharedState',
				'type': '() => {\n\thasBeenFocus: boolean;\n\tisFocus: boolean;\n\tisAutoFilled: boolean;\n}',
			}],
		},
	],
	[
		'Draggable',
		{
			localTypes: {},
			events: [],
			provide: [],
			slots: [{
				'name': 'default',
				'desc': {
					'en': 'the content of the draggable component',
					'fr': 'contenu de l\'élément',
				},
				'bindings': [],
			}],
			vModel: [{
				'name': 'disabled',
				'type': 'boolean',
				'desc': {
					'en': 'if set, the item will not be draggable',
					'fr': 'si défini, l\'élément ne sera pas déplaçable',
				},
				'defaultValue': 'false',
			}],
			props: [{
				'name': 'data',
				'type': 'Orion.DndData',
				'desc': {
					'en': 'datas of the draggable item',
					'fr': 'données de l\'élément',
				},
			}, {
				'name': 'tag',
				'type': 'string',
				'desc': {
					'en': 'the tag or component of the draggable item',
					'fr': 'tag ou composant qui réprésentera l\'élément',
				},
				'defaultValue': '\'div\'',
			}],
			publicInstance: undefined,
		},
	],
	[
		'Droppable',
		{
			localTypes: {},
			events: [],
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
			vModel: [{
				'name': 'datalist',
				'type': 'Undef<DataListItem[]>',
				'desc': {
					'en': 'datas of the component',
					'fr': 'liste d\'objets du composant',
				},
				'defaultValue': 'undefined',
			}],
			props: [{
				'name': 'tag',
				'type': 'string',
				'desc': {
					'en': 'the tag or component of the droppable area',
					'fr': 'tag ou composant qui représentera la zone de drop',
				},
				'defaultValue': '\'div\'',
			}, {
				'name': 'validation',
				'type': 'Orion.DndValidation',
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
			localTypes: {},
			events: [],
			provide: [],
			slots: [],
			vModel: [{
				'name': 'vModel',
				'type': 'Nil<string>',
				'desc': {
					'en': 'Missing @doc',
					'fr': 'Missing @doc',
				},
				'defaultValue': 'undefined',
			}, {
				'name': 'json',
				'type': 'JSONContent | undefined',
				'desc': {
					'en': 'the json format of the editor value',
					'fr': 'valeur de l\'éditeur au format JSON',
				},
				'defaultValue': 'undefined',
			}],
			props: [{
				'name': 'autofocus',
				'type': 'boolean',
				'desc': {
					'en': 'autofocus the field when mounted.',
					'fr': 'focus automatiquement le champ lorsqu\'il est monté.',
				},
			}, {
				'name': 'clearable',
				'type': 'boolean',
				'desc': {
					'en': 'defines if the field can be cleared.',
					'fr': 'définit si le champ peut être vidé.',
				},
			}, {
				'name': 'clearToNull',
				'type': 'boolean',
				'desc': {
					'en': 'sets the value to null when the field is cleared',
					'fr': 'lorsque que le champ est vidé, sa valeur vaut `null`',
				},
			}, {
				'name': 'disabled',
				'type': 'boolean',
				'desc': {
					'en': 'disables the field',
					'fr': 'désactive le champ',
				},
			}, {
				'name': 'disableFeatures',
				'type': 'EditorFeature[]',
				'desc': {
					'en': 'disable some editor\'s features',
					'fr': 'désactive des fonctions de l\'éditeur',
				},
				'defaultValue': '() => []',
			}, {
				'name': 'donetyping',
				'type': 'number',
				'desc': {
					'en': 'define the debounce duration before updating the value (useful for search field)',
					'fr': 'défini la durée du debounce avant de mettre à jour la valeur (utile pour les champs de recherche)',
				},
			}, {
				'name': 'forceLabelFloating',
				'type': 'boolean',
				'desc': {
					'en': 'allows floating label',
					'fr': 'permet au label de se placer au dessus du champ lorsqu\'il possède une valeur',
				},
			}, {
				'name': 'imgFileTypes',
				'type': 'string[]',
				'desc': {
					'en': 'authorized image file formats',
					'fr': 'type de fichier autorisé pour les images',
				},
				'defaultValue': '() => [\'image/jpeg\', \'image/png\', \'image/gif\']',
			}, {
				'name': 'imgMaxSize',
				'type': 'number',
				'desc': {
					'en': 'maximum size of the imported image',
					'fr': 'taille maximum d\'une image importée',
				},
				'defaultValue': '1500',
			}, {
				'name': 'inheritValidationState',
				'type': 'boolean',
				'desc': {
					'en': 'defines if the validation comes from its parent',
					'fr': 'définit si la validation provient du parent',
				},
			}, {
				'name': 'label',
				'type': 'string',
				'desc': {
					'en': 'label of the field',
					'fr': 'le label du champ',
				},
			}, {
				'name': 'placeholder',
				'type': 'string',
				'desc': {
					'en': 'place holder',
					'fr': 'placeholder',
				},
			}, {
				'name': 'prefixFontIcon',
				'type': 'string',
				'desc': {
					'en': 'Missing @doc',
					'fr': 'Missing @doc',
				},
			}, {
				'name': 'prefixIcon',
				'type': 'Orion.Icon',
				'desc': {
					'en': 'Missing @doc',
					'fr': 'Missing @doc',
				},
			}, {
				'name': 'readonly',
				'type': 'boolean',
				'desc': {
					'en': 'sets the field to read-only mode',
					'fr': 'définit le champ comme étant en lecture seule',
				},
			}, {
				'name': 'required',
				'type': 'boolean',
				'desc': {
					'en': 'sets the field required',
					'fr': 'indique que le champ est obligatoire',
				},
			}, {
				'name': 'selectOnFocus',
				'type': 'boolean',
				'desc': {
					'en': 'select the field content when focused.',
					'fr': 'sélectionne le contenu du champ lorsqu\'il est focus.',
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
					'en': 'Missing @doc',
					'fr': 'Missing @doc',
				},
			}, {
				'name': 'suffixIcon',
				'type': 'Orion.Icon',
				'desc': {
					'en': 'Missing @doc',
					'fr': 'Missing @doc',
				},
			}, {
				'name': 'type',
				'type': 'any',
				'desc': {
					'en': 'type of the input',
					'fr': 'type of the input',
				},
			}, {
				'name': 'validation',
				'type': 'any',
				'desc': {
					'en': 'the validation for the field',
					'fr': 'la validation du champ',
				},
			}, {
				'name': 'validationErrorMessage',
				'type': 'string',
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
				'name': '_input',
				'type': '() => HTMLInputElement | undefined',
			}, {
				'name': 'sharedState',
				'type': '() => {\n\thasBeenFocus: boolean;\n\tisFocus: boolean;\n\tisAutoFilled: boolean;\n}',
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
			vModel: [],
			props: [{
				'name': 'title',
				'type': 'string',
				'desc': {
					'en': 'title of the footer',
					'fr': 'Missing @doc',
				},
			}, {
				'name': 'visible',
				'type': 'boolean',
				'desc': {
					'en': 'if set, displays the footer',
					'fr': 'si défini, affiche le composant',
				},
			}],
			publicInstance: undefined,
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
			vModel: [],
			props: [{
				'name': 'dropShadow',
				'type': 'boolean',
				'desc': {
					'en': 'if set, hides the shadow on the extremities of the scroll',
					'fr': 'si défini, masque l\'ombre aux extrémités du composant',
				},
			}, {
				'name': 'hideButton',
				'type': 'boolean',
				'desc': {
					'en': 'if set, hides the buttons to slide left or right',
					'fr': 'si défini, masque les bouttons permettant de glisser vers gauche ou vers la droite.',
				},
			}, {
				'name': 'scrollStep',
				'type': '() => number | HTMLElement[]',
				'desc': {
					'en': 'defines the targets of the scroll step',
					'fr': 'défini le pas du scroll, ou un tableau d\'éléments dans le DOM pour le calculer automatiquement',
				},
			}, {
				'name': 'shadowColor',
				'type': 'string',
				'desc': {
					'en': 'the color of the shadow on the extremities of the scroll',
					'fr': 'couleur de l\'ombre aux extrémités du composant',
				},
				'defaultValue': '\'grey-lighter\'',
			}, {
				'name': 'targets',
				'type': '() => HTMLElement[]',
				'desc': {
					'en': 'if set, shows a preview of the items contained is the scroll. The function must return an array of DOM elements which are in the scroll area.',
					'fr': 'si défini, affiche un aperçu des éléments contenus dans le scroll. Cette fonction doit renvoyer un tableau d\'éléments du DOM.',
				},
			}, {
				'name': 'tolerance',
				'type': 'number',
				'desc': {
					'en': 'set the scroll tolerance that trigger the shadow\'s display',
					'fr': 'défini la tolérence pour le déclenchement de l\'apparition ou de la disparation de l\'ombre',
				},
				'defaultValue': '1',
			}],
			publicInstance: undefined,
		},
	],
	[
		'Icon',
		{
			localTypes: {},
			events: [],
			provide: [],
			slots: [],
			vModel: [],
			props: [{
				'name': 'button',
				'type': 'Orion.Color',
				'desc': {
					'en': 'adds a background color',
					'fr': 'ajouter une couleur en arrière plan',
				},
			}, {
				'name': 'fontIcon',
				'type': 'string',
				'desc': {
					'en': 'Missing @doc',
					'fr': 'Missing @doc',
				},
			}, {
				'name': 'icon',
				'type': 'Orion.Icon',
				'desc': {
					'en': 'Missing @doc',
					'fr': 'Missing @doc',
				},
			}, {
				'name': 'loading',
				'type': 'boolean',
				'desc': {
					'en': 'if set, blocks the click on the icon',
					'fr': 'si défini, bloque le click sur l\'icône',
				},
			}, {
				'name': 'marker',
				'type': 'number | boolean',
				'desc': {
					'en': 'adds a visual marker, can be used as a notification marker',
					'fr': 'ajoute un marqueur visuel, qui peut être utilisé comme un marqueur de notification',
				},
				'defaultValue': 'false ',
			}, {
				'name': 'markerColor',
				'type': 'Orion.Color',
				'desc': {
					'en': 'the color of the marker',
					'fr': 'couleur du marqueur',
				},
				'defaultValue': '\'danger\' ',
			}, {
				'name': 'markerPosition',
				'type': 'string',
				'desc': {
					'en': 'the position of the marker',
					'fr': 'position du marqueur',
				},
				'defaultValue': '\'top right\'',
			}, {
				'name': 'onMarkerClick',
				'type': '(e: MouseEvent) => void',
				'desc': {
					'en': 'Missing @doc',
					'fr': 'Missing @doc',
				},
			}, {
				'name': 'ripple',
				'type': 'Orion.Color',
				'desc': {
					'en': 'emits a wave on the click and adds an hover color',
					'fr': 'émet une onde au moment du click et ajoute un style au moment du survol',
				},
			}],
			publicInstance: undefined,
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
			vModel: [],
			props: [{
				'name': 'center',
				'type': 'boolean',
				'desc': {
					'en': 'centers the content',
					'fr': 'centre le contenu',
				},
			}, {
				'name': 'fontIcon',
				'type': 'string',
				'desc': {
					'en': 'Missing @doc',
					'fr': 'Missing @doc',
				},
			}, {
				'name': 'icon',
				'type': 'Orion.Icon',
				'desc': {
					'en': 'Missing @doc',
					'fr': 'Missing @doc',
				},
			}, {
				'name': 'title',
				'type': 'string',
				'desc': {
					'en': 'title of the section',
					'fr': 'titre de la section',
				},
			}],
			publicInstance: undefined,
		},
	],
	[
		'Input',
		{
			localTypes: {},
			events: [],
			provide: [],
			slots: [],
			vModel: [{
				'name': 'vModel',
				'type': 'Nil<string | number>',
				'desc': {
					'en': 'component\'s vModel',
					'fr': 'vModel du composant',
				},
				'defaultValue': 'undefined',
			}],
			props: [{
				'name': 'allowNegative',
				'type': 'boolean',
				'desc': {
					'en': 'allow negative values',
					'fr': 'autorise les valeurs négatives',
				},
			}, {
				'name': 'autocomplete',
				'type': 'string',
				'desc': {
					'en': 'provides automated assistance in filling out form field values from native html input',
					'fr': 'fournit une assitance automatique de remplissage du champ',
				},
			}, {
				'name': 'autofocus',
				'type': 'boolean',
				'desc': {
					'en': 'autofocus the field when mounted.',
					'fr': 'focus automatiquement le champ lorsqu\'il est monté.',
				},
			}, {
				'name': 'clearable',
				'type': 'boolean',
				'desc': {
					'en': 'defines if the field can be cleared.',
					'fr': 'définit si le champ peut être vidé.',
				},
			}, {
				'name': 'clearToNull',
				'type': 'boolean',
				'desc': {
					'en': 'sets the value to null when the field is cleared',
					'fr': 'lorsque que le champ est vidé, sa valeur vaut `null`',
				},
			}, {
				'name': 'disabled',
				'type': 'boolean',
				'desc': {
					'en': 'disables the field',
					'fr': 'désactive le champ',
				},
			}, {
				'name': 'donetyping',
				'type': 'number',
				'desc': {
					'en': 'define the debounce duration before updating the value (useful for search field)',
					'fr': 'défini la durée du debounce avant de mettre à jour la valeur (utile pour les champs de recherche)',
				},
			}, {
				'name': 'forceLabelFloating',
				'type': 'boolean',
				'desc': {
					'en': 'allows floating label',
					'fr': 'permet au label de se placer au dessus du champ lorsqu\'il possède une valeur',
				},
			}, {
				'name': 'inheritValidationState',
				'type': 'boolean',
				'desc': {
					'en': 'defines if the validation comes from its parent',
					'fr': 'définit si la validation provient du parent',
				},
			}, {
				'name': 'label',
				'type': 'string',
				'desc': {
					'en': 'label of the field',
					'fr': 'le label du champ',
				},
			}, {
				'name': 'mask',
				'type': 'string | { value: (val: any) => Nil<string | number>; display: (val: any) => Nil<string | number>; }',
				'desc': {
					'en': 'the mask applied on the input',
					'fr': 'masque appliqué sur le champ',
				},
			}, {
				'name': 'maskHourFormat',
				'type': 'string',
				'desc': {
					'en': 'the hour format',
					'fr': 'format de l\'heure',
				},
				'defaultValue': '\'24h\'',
			}, {
				'name': 'maskHourSeparator',
				'type': 'string',
				'desc': {
					'en': 'hour separator',
					'fr': 'sépérateur d\'heures',
				},
				'defaultValue': '\':\'',
			}, {
				'name': 'maxLength',
				'type': 'number',
				'desc': {
					'en': 'maximum length of the input',
					'fr': 'longueur maximum du champ',
				},
			}, {
				'name': 'maxValue',
				'type': 'number',
				'desc': {
					'en': 'maximum value of the input',
					'fr': 'valeur maximale du champ',
				},
			}, {
				'name': 'minValue',
				'type': 'number',
				'desc': {
					'en': 'minimum value of the input',
					'fr': 'valeur minimale du champ',
				},
			}, {
				'name': 'placeholder',
				'type': 'string',
				'desc': {
					'en': 'placeholder of the field',
					'fr': 'le placeholder du champ',
				},
			}, {
				'name': 'prefixFontIcon',
				'type': 'string',
				'desc': {
					'en': 'Missing @doc',
					'fr': 'Missing @doc',
				},
			}, {
				'name': 'prefixIcon',
				'type': 'Orion.Icon',
				'desc': {
					'en': 'Missing @doc',
					'fr': 'Missing @doc',
				},
			}, {
				'name': 'readonly',
				'type': 'boolean',
				'desc': {
					'en': 'sets the field to read-only mode',
					'fr': 'définit le champ comme étant en lecture seule',
				},
			}, {
				'name': 'required',
				'type': 'boolean',
				'desc': {
					'en': 'sets the field required',
					'fr': 'indique que le champ est obligatoire',
				},
			}, {
				'name': 'selectOnFocus',
				'type': 'boolean',
				'desc': {
					'en': 'select the input value on focus',
					'fr': 'sélectionne la valeur du champ au focus',
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
				'name': 'staticMask',
				'type': 'boolean',
				'desc': {
					'en': 'Determines if the mask should be present all the time, even if the field is empty',
					'fr': 'Détermine si le masque doit être présent en permanence, même si le champ est vide',
				},
				'defaultValue': 'true',
			}, {
				'name': 'suffixFontIcon',
				'type': 'string',
				'desc': {
					'en': 'Missing @doc',
					'fr': 'Missing @doc',
				},
			}, {
				'name': 'suffixIcon',
				'type': 'Orion.Icon',
				'desc': {
					'en': 'Missing @doc',
					'fr': 'Missing @doc',
				},
			}, {
				'name': 'type',
				'type': 'any',
				'desc': {
					'en': 'type of the input',
					'fr': 'type of the input',
				},
			}, {
				'name': 'validation',
				'type': 'any',
				'desc': {
					'en': 'the validation for the field',
					'fr': 'la validation du champ',
				},
			}, {
				'name': 'validationErrorMessage',
				'type': 'string',
				'desc': {
					'en': 'the error message displayed after input\'s validation.',
					'fr': 'le message d\'erreur affiché en cas d\'erreur lors de la validation',
				},
			}],
			publicInstance: [{
				'name': 'valueDisplay',
				'type': '() => string',
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
				'name': '_input',
				'type': '() => HTMLInputElement | undefined',
			}, {
				'name': 'sharedState',
				'type': '() => {\n\thasBeenFocus: boolean;\n\tisFocus: boolean;\n\tisAutoFilled: boolean;\n}',
			}],
		},
	],
	[
		'InputRange',
		{
			localTypes: {},
			events: [],
			provide: [],
			slots: [],
			vModel: [{
				'name': 'vModel',
				'type': 'number | number[]',
				'desc': {
					'en': 'component\'s vModel',
					'fr': 'vModel du composant',
				},
				'defaultValue': 'undefined',
			}],
			props: [{
				'name': 'autofocus',
				'type': 'boolean',
				'desc': {
					'en': 'autofocus the field when mounted.',
					'fr': 'focus automatiquement le champ lorsqu\'il est monté.',
				},
			}, {
				'name': 'clearable',
				'type': 'boolean',
				'desc': {
					'en': 'defines if the field can be cleared.',
					'fr': 'définit si le champ peut être vidé.',
				},
			}, {
				'name': 'clearToNull',
				'type': 'boolean',
				'desc': {
					'en': 'sets the value to null when the field is cleared',
					'fr': 'lorsque que le champ est vidé, sa valeur vaut `null`',
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
					'en': 'disables the field',
					'fr': 'désactive le champ',
				},
			}, {
				'name': 'donetyping',
				'type': 'number',
				'desc': {
					'en': 'define the debounce duration before updating the value (useful for search field)',
					'fr': 'défini la durée du debounce avant de mettre à jour la valeur (utile pour les champs de recherche)',
				},
			}, {
				'name': 'forceLabelFloating',
				'type': 'boolean',
				'desc': {
					'en': 'allows floating label',
					'fr': 'permet au label de se placer au dessus du champ lorsqu\'il possède une valeur',
				},
			}, {
				'name': 'inheritValidationState',
				'type': 'boolean',
				'desc': {
					'en': 'defines if the validation comes from its parent',
					'fr': 'définit si la validation provient du parent',
				},
			}, {
				'name': 'label',
				'type': 'string',
				'desc': {
					'en': 'label of the field',
					'fr': 'le label du champ',
				},
			}, {
				'name': 'maxValue',
				'type': 'number',
				'desc': {
					'en': 'maximum value of the input range',
					'fr': 'valeur maximum qui peut être sélectionnée',
				},
				'defaultValue': '100',
			}, {
				'name': 'minValue',
				'type': 'number',
				'desc': {
					'en': 'minimum value of the input range',
					'fr': 'valeur minimale qui peut être sélectionnée',
				},
				'defaultValue': '0',
			}, {
				'name': 'placeholder',
				'type': 'string',
				'desc': {
					'en': 'placeholder of the field',
					'fr': 'le placeholder du champ',
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
				'name': 'readonly',
				'type': 'boolean',
				'desc': {
					'en': 'sets the field to read-only mode',
					'fr': 'définit le champ comme étant en lecture seule',
				},
			}, {
				'name': 'required',
				'type': 'boolean',
				'desc': {
					'en': 'sets the field required',
					'fr': 'indique que le champ est obligatoire',
				},
			}, {
				'name': 'selectOnFocus',
				'type': 'boolean',
				'desc': {
					'en': 'select the field content when focused.',
					'fr': 'sélectionne le contenu du champ lorsqu\'il est focus.',
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
				'name': 'step',
				'type': 'number',
				'desc': {
					'en': 'step of the slider',
					'fr': 'pas du curseur',
				},
				'defaultValue': '1',
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
			}, {
				'name': 'type',
				'type': 'any',
				'desc': {
					'en': 'type of the input',
					'fr': 'type of the input',
				},
			}, {
				'name': 'validation',
				'type': 'any',
				'desc': {
					'en': 'the validation for the field',
					'fr': 'la validation du champ',
				},
			}, {
				'name': 'validationErrorMessage',
				'type': 'string',
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
				'name': '_input',
				'type': '() => HTMLInputElement | undefined',
			}, {
				'name': 'sharedState',
				'type': '() => {\n\thasBeenFocus: boolean;\n\tisFocus: boolean;\n\tisAutoFilled: boolean;\n}',
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
			vModel: [],
			props: [{
				'name': 'color',
				'type': 'Orion.ColorExtendedAndGreys',
				'desc': {
					'en': 'defines the color',
					'fr': 'définit la couleur',
				},
				'defaultValue': '\'default\' ',
			}, {
				'name': 'outline',
				'type': 'boolean',
				'desc': {
					'en': 'adds an outline style on the label',
					'fr': 'ajoute un contraste sur le label',
				},
			}, {
				'name': 'size',
				'type': 'Orion.Size',
				'desc': {
					'en': 'define the size',
					'fr': 'définit la taille',
				},
				'defaultValue': '\'md\' ',
			}],
			publicInstance: undefined,
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
			vModel: [],
			props: [{
				'name': 'navMain',
				'type': 'OrionNavMain.Props',
				'desc': {
					'en': 'these props will be applied to the layout\'s `<o-nav-main>` component',
					'fr': 'ces props seront passées au composant `<o-nav-main>` du layout',
				},
			}, {
				'name': 'navTabs',
				'type': 'OrionNavTabs.Props',
				'desc': {
					'en': 'these props will be applied to the layout\'s `<o-nav-tabs>` component',
					'fr': 'ces props seront passées au composant `<o-nav-tabs>` du layout',
				},
			}, {
				'name': 'navTop',
				'type': 'OrionNavTop.Props',
				'desc': {
					'en': 'these props will be applied to the layout\'s `<o-nav-top>` component',
					'fr': 'ces props seront passées au composant `<o-nav-top>` du layout',
				},
			}],
			publicInstance: undefined,
		},
	],
	[
		'List',
		{
			localTypes: {},
			events: [],
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
			vModel: [{
				'name': 'page',
				'type': 'Orion.ListPage',
				'desc': {
					'en': 'configuration of the list\'s pagination (size: number of items per page, index: current page)',
					'fr': 'configuration de la pagination de la liste (size: nombre d\'éléments par page, index: page actuelle)',
				},
				'defaultValue': '{\n\t\tsize: 20,\n\t\tindex: 1,\n\t}',
			}, {
				'name': 'selected',
				'type': 'T[]',
				'desc': {
					'en': 'array of the selected items',
					'fr': 'tableau contenant les élements sélectionnés',
				},
				'defaultValue': '(): T[] => []',
			}],
			props: [{
				'name': 'bindRouter',
				'type': 'string',
				'desc': {
					'en': 'the key used in the url query to bind the current page to the pagination component (ex: ...url/my-list?**page**=2 • *bindRouter = **page***)',
					'fr': 'représente la clé utilisée dans l\'url pour binder la page courante au composant de pagination (ex: ...url/my-list?**page**=2 • *bindRouter = **page***)',
				},
			}, {
				'name': 'cellClass',
				'type': 'string',
				'desc': {
					'en': 'class applied to the list\'s cells when the layout is `grid`',
					'fr': 'classe appliquée aux cellules de la liste quand la disposition est sous forme de `grid`',
				},
				'defaultValue': '\'col-sm-6 col-lg-4 col-xl-3\'',
			}, {
				'name': 'gridClass',
				'type': 'string',
				'desc': {
					'en': 'class applied to the list when the layout is `grid`',
					'fr': 'classe appliquée à la liste quand la disposition est sous forme de `grid`',
				},
				'defaultValue': '\'row row--grid\'',
			}, {
				'name': 'itemAdjective',
				'type': 'string',
				'desc': {
					'en': 'the adjective used for the item selection (to customize the selection footer)',
					'fr': 'l\'adjectif utilisé pour les élements sélectionnés (pour personnaliser le footer de sélection)',
				},
			}, {
				'name': 'itemType',
				'type': 'string',
				'desc': {
					'en': 'item type of the list (to customize the selection footer)',
					'fr': 'type d\'élément de la liste (pour personnaliser le footer de sélection)',
				},
			}, {
				'name': 'layout',
				'type': 'Orion.ListLayout',
				'desc': {
					'en': 'layout of the list',
					'fr': 'disposition de la liste',
				},
				'defaultValue': '\'grid\' ',
			}, {
				'name': 'list',
				'type': 'T[]',
				'desc': {
					'en': 'items of the list',
					'fr': 'élements de la liste',
				},
				'defaultValue': '() => []',
			}, {
				'name': 'total',
				'type': 'number',
				'desc': {
					'en': 'total number of items in the list',
					'fr': 'nombre total d\'éléments dans la liste',
				},
				'defaultValue': '0',
			}, {
				'name': 'trackKey',
				'type': 'string',
				'desc': {
					'en': 'determine the `key` used for the v-for in the list loop',
					'fr': 'détermine la `key` utilisée pour le v-for dans la boucle de la liste',
				},
				'defaultValue': '\'id\'',
			}, {
				'name': 'useAutoPagination',
				'type': 'boolean',
				'desc': {
					'en': 'use OrionList\'s pagination system. Useful if you pass the full list in props',
					'fr': 'utilise le système de pagination d\'OrionList. Utile si vous pasez la liste compl!te en props',
				},
			}, {
				'name': 'useFooterSelected',
				'type': 'boolean',
				'desc': {
					'en': 'displays a footer when any items of the list are selected (useful for batch action on selected items)',
					'fr': 'affiche un pied de page quand des éléments de la liste sont sélectionnés (utile en cas d\'action groupée sur les éléments sélectionnés)',
				},
				'defaultValue': 'true',
			}, {
				'name': 'usePaginationBottom',
				'type': 'boolean',
				'desc': {
					'en': 'displays pagination at the bottom of the list',
					'fr': 'affiche une pagination en bas de la liste',
				},
				'defaultValue': 'true',
			}, {
				'name': 'usePaginationTop',
				'type': 'boolean',
				'desc': {
					'en': 'displays pagination at the top of the list',
					'fr': 'affiche une pagination en haut de la liste',
				},
				'defaultValue': 'true',
			}],
			publicInstance: undefined,
		},
	],
	[
		'Loader',
		{
			localTypes: {},
			events: [],
			provide: [],
			slots: [],
			vModel: [],
			props: [{
				'name': 'color',
				'type': 'Orion.Color',
				'desc': {
					'en': 'defines the color',
					'fr': 'définit la couleur',
				},
				'defaultValue': '\'default\' ',
			}, {
				'name': 'global',
				'type': 'boolean',
				'desc': {
					'en': 'displays a fullpage loader',
					'fr': 'affiche un loader sur toute la page',
				},
			}, {
				'name': 'message',
				'type': 'string',
				'desc': {
					'en': 'message under the loader',
					'fr': 'message qui apparaît sous l\'icône de chargement',
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
				'name': 'visible',
				'type': 'boolean',
				'desc': {
					'en': 'if set, shows the loader',
					'fr': 'si défini, affiche le loader',
				},
			}],
			publicInstance: [{
				'name': 'show',
				'type': '(newText?: string) => void',
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
			localTypes: {},
			events: [],
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
			vModel: [],
			props: [{
				'name': 'display',
				'type': 'boolean',
				'desc': {
					'en': 'if set, displays the component',
					'fr': 'Missing @doc',
				},
			}, {
				'name': 'options',
				'type': 'any',
				'desc': {
					'en': 'options of the modal',
					'fr': 'options de la modal',
				},
				'defaultValue': '() => ({}) as Partial<Orion.Popable.Options>',
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
				'type': '(options?: Orion.Popable.CloseOptions) => Promise<void>',
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
			localTypes: {},
			events: [],
			provide: [{
				'name': '_notif',
				'data': 'publicInstance',
			}],
			slots: [],
			vModel: [],
			props: [{
				'name': 'display',
				'type': 'boolean',
				'desc': {
					'en': 'if set, displays the component',
					'fr': 'Missing @doc',
				},
			}, {
				'name': 'options',
				'type': 'any',
				'desc': {
					'en': 'options of the notification',
					'fr': 'Missing @doc',
				},
				'defaultValue': '() => ({}) as Partial<Orion.Popable.Options>',
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
				'type': '(options?: Orion.Popable.CloseOptions) => Promise<void>',
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
			localTypes: {},
			events: [],
			provide: [],
			slots: [],
			vModel: [],
			props: [{
				'name': 'dataType',
				'type': '"number" | "text"',
				'desc': {
					'en': 'defines the type of the code',
					'fr': 'definit le type du code',
				},
				'defaultValue': '\'text\' ',
			}, {
				'name': 'readonly',
				'type': 'boolean',
				'desc': {
					'en': 'if set, the code will be on read-only mode',
					'fr': 'si défini, le code sera en mode read-only',
				},
			}, {
				'name': 'size',
				'type': 'number',
				'desc': {
					'en': 'define the size',
					'fr': 'définit la taille',
				},
				'defaultValue': '4',
			}, {
				'name': 'value',
				'type': 'string',
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
			vModel: [],
			props: [{
				'name': 'global',
				'type': 'boolean',
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
			vModel: [],
			props: [{
				'name': 'stickySubactions',
				'type': 'boolean',
				'desc': {
					'en': 'make the subactions div sticky when scrolling for easy access',
					'fr': 'rend les actions secondaires sticky lors du scroll pour y faciliter l\'accès',
				},
			}, {
				'name': 'subtitle',
				'type': 'string',
				'desc': {
					'en': 'subtitle of the page',
					'fr': 'sous-titre de la page',
				},
			}, {
				'name': 'subtitleEllipsis',
				'type': 'boolean',
				'desc': {
					'en': 'adds an ellipsis on the subtitle if it is too long',
					'fr': 'aajoute une ellipse au niveau du sous-titre s\'il est trop long',
				},
			}, {
				'name': 'title',
				'type': 'string',
				'desc': {
					'en': 'title of the page',
					'fr': 'titre de la page',
				},
			}, {
				'name': 'titleEllipsis',
				'type': 'boolean',
				'desc': {
					'en': 'adds an ellipsis on the title if the title is too long',
					'fr': 'ajoute une ellipse au niveau du titre s\'il est trop long',
				},
			}],
			publicInstance: undefined,
		},
	],
	[
		'Paginate',
		{
			localTypes: {},
			events: [],
			provide: [],
			slots: [],
			vModel: [{
				'name': 'vModel',
				'type': 'number',
				'desc': {
					'en': 'component\'s vModel',
					'fr': 'vModel du composant',
				},
				'defaultValue': 'undefined',
			}],
			props: [{
				'name': 'bindRouter',
				'type': 'string',
				'desc': {
					'en': 'the key used in the url query to get the current active page (ex: ...url/my-list?**page**=2 • *bindRouter = **page***)',
					'fr': 'représente la clé utilisée dans l\'url pour déterminer la page active actuelle (ex: ...url/my-list?**page**=2 • *bindRouter = **page***)',
				},
			}, {
				'name': 'size',
				'type': 'number',
				'desc': {
					'en': 'define the size',
					'fr': 'définit la taille',
				},
				'defaultValue': '\'md\' ',
			}, {
				'name': 'total',
				'type': 'number',
				'desc': {
					'en': 'total number of element which are paginated',
					'fr': 'nombre total d\'éléments',
				},
			}],
			publicInstance: undefined,
		},
	],
	[
		'Password',
		{
			localTypes: {},
			events: [],
			provide: [],
			slots: [],
			vModel: [{
				'name': 'vModel',
				'type': 'Nil<string>',
				'desc': {
					'en': 'component\'s vModel',
					'fr': 'vModel du composant',
				},
				'defaultValue': 'undefined',
			}],
			props: [{
				'name': 'autofocus',
				'type': 'boolean',
				'desc': {
					'en': 'autofocus the field when mounted.',
					'fr': 'focus automatiquement le champ lorsqu\'il est monté.',
				},
			}, {
				'name': 'clearable',
				'type': 'boolean',
				'desc': {
					'en': 'defines if the field can be cleared.',
					'fr': 'définit si le champ peut être vidé.',
				},
			}, {
				'name': 'clearToNull',
				'type': 'boolean',
				'desc': {
					'en': 'sets the value to null when the field is cleared',
					'fr': 'lorsque que le champ est vidé, sa valeur vaut `null`',
				},
			}, {
				'name': 'disabled',
				'type': 'boolean',
				'desc': {
					'en': 'disables the field',
					'fr': 'désactive le champ',
				},
			}, {
				'name': 'donetyping',
				'type': 'number',
				'desc': {
					'en': 'define the debounce duration before updating the value (useful for search field)',
					'fr': 'défini la durée du debounce avant de mettre à jour la valeur (utile pour les champs de recherche)',
				},
			}, {
				'name': 'forceLabelFloating',
				'type': 'boolean',
				'desc': {
					'en': 'allows floating label',
					'fr': 'permet au label de se placer au dessus du champ lorsqu\'il possède une valeur',
				},
			}, {
				'name': 'inheritValidationState',
				'type': 'boolean',
				'desc': {
					'en': 'defines if the validation comes from its parent',
					'fr': 'définit si la validation provient du parent',
				},
			}, {
				'name': 'label',
				'type': 'string',
				'desc': {
					'en': 'label of the field',
					'fr': 'le label du champ',
				},
			}, {
				'name': 'passwordToConfirm',
				'type': 'string | boolean',
				'desc': {
					'en': 'if specified, checks the match with the password value',
					'fr': 'si spécifié, vérifie la correspondance avec le champ de mot de passe dans le cas d\'une confirmation',
				},
			}, {
				'name': 'passwordTooltip',
				'type': 'boolean',
				'desc': {
					'en': 'shows the tooltip with the password\'s rules',
					'fr': 'affiche la une tooltip avec les règles à respecter',
				},
			}, {
				'name': 'placeholder',
				'type': 'string',
				'desc': {
					'en': 'placeholder of the field',
					'fr': 'le placeholder du champ',
				},
			}, {
				'name': 'prefixFontIcon',
				'type': 'string',
				'desc': {
					'en': 'Missing @doc',
					'fr': 'Missing @doc',
				},
			}, {
				'name': 'prefixIcon',
				'type': 'Orion.Icon',
				'desc': {
					'en': 'Missing @doc',
					'fr': 'Missing @doc',
				},
			}, {
				'name': 'readonly',
				'type': 'boolean',
				'desc': {
					'en': 'sets the field to read-only mode',
					'fr': 'définit le champ comme étant en lecture seule',
				},
			}, {
				'name': 'required',
				'type': 'boolean',
				'desc': {
					'en': 'sets the field required',
					'fr': 'indique que le champ est obligatoire',
				},
			}, {
				'name': 'selectOnFocus',
				'type': 'boolean',
				'desc': {
					'en': 'select the field content when focused.',
					'fr': 'sélectionne le contenu du champ lorsqu\'il est focus.',
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
					'en': 'Missing @doc',
					'fr': 'Missing @doc',
				},
			}, {
				'name': 'suffixIcon',
				'type': 'Orion.Icon',
				'desc': {
					'en': 'Missing @doc',
					'fr': 'Missing @doc',
				},
			}, {
				'name': 'type',
				'type': 'any',
				'desc': {
					'en': 'type of the input',
					'fr': 'type du champ',
				},
				'defaultValue': '\'password\'',
			}, {
				'name': 'validation',
				'type': 'any',
				'desc': {
					'en': 'the validation for the field',
					'fr': 'la validation du champ',
				},
			}, {
				'name': 'validationErrorMessage',
				'type': 'string',
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
				'name': '_input',
				'type': '() => HTMLInputElement | undefined',
			}, {
				'name': 'sharedState',
				'type': '() => {\n\thasBeenFocus: boolean;\n\tisFocus: boolean;\n\tisAutoFilled: boolean;\n}',
			}],
		},
	],
	[
		'Phone',
		{
			localTypes: {},
			events: [],
			provide: [],
			slots: [],
			vModel: [{
				'name': 'vModel',
				'type': 'VModelType',
				'desc': {
					'en': 'component\'s vModel',
					'fr': 'vModel du composant',
				},
				'defaultValue': 'undefined',
			}, {
				'name': 'phoneCountryCode',
				'type': 'string | undefined',
				'desc': {
					'en': 'the country code string, isolated from its parent object',
					'fr': 'le code pays, isolé de son objet parent',
				},
				'defaultValue': 'undefined',
			}, {
				'name': 'phoneNumber',
				'type': 'string | undefined',
				'desc': {
					'en': 'the phoneNumber string, isolated from its parent object',
					'fr': 'le numéro de téléphone, isolé de son objet parent',
				},
				'defaultValue': 'undefined',
			}],
			props: [{
				'name': 'autofocus',
				'type': 'boolean',
				'desc': {
					'en': 'autofocus the field when mounted.',
					'fr': 'focus automatiquement le champ lorsqu\'il est monté.',
				},
			}, {
				'name': 'clearable',
				'type': 'boolean',
				'desc': {
					'en': 'defines if the field can be cleared.',
					'fr': 'définit si le champ peut être vidé.',
				},
			}, {
				'name': 'clearToNull',
				'type': 'boolean',
				'desc': {
					'en': 'sets the value to null when the field is cleared',
					'fr': 'lorsque que le champ est vidé, sa valeur vaut `null`',
				},
			}, {
				'name': 'disabled',
				'type': 'boolean',
				'desc': {
					'en': 'disables the field',
					'fr': 'désactive le champ',
				},
			}, {
				'name': 'donetyping',
				'type': 'number',
				'desc': {
					'en': 'define the debounce duration before updating the value (useful for search field)',
					'fr': 'défini la durée du debounce avant de mettre à jour la valeur (utile pour les champs de recherche)',
				},
			}, {
				'name': 'flag',
				'type': 'boolean',
				'desc': {
					'en': 'Allow to display or not the flag of the selected country',
					'fr': 'Permet d\'afficher le drapeau du pays choisi',
				},
			}, {
				'name': 'forceLabelFloating',
				'type': 'boolean',
				'desc': {
					'en': 'allows floating label',
					'fr': 'permet au label de se placer au dessus du champ lorsqu\'il possède une valeur',
				},
			}, {
				'name': 'inheritValidationState',
				'type': 'boolean',
				'desc': {
					'en': 'defines if the validation comes from its parent',
					'fr': 'définit si la validation provient du parent',
				},
			}, {
				'name': 'label',
				'type': 'string',
				'desc': {
					'en': 'label of the field',
					'fr': 'le label du champ',
				},
			}, {
				'name': 'mobile',
				'type': 'boolean',
				'desc': {
					'en': 'defines if the number is a mobile phone',
					'fr': 'définit si le numéro correspond à un portable',
				},
			}, {
				'name': 'placeholder',
				'type': 'string',
				'desc': {
					'en': 'placeholder of the field',
					'fr': 'le placeholder du champ',
				},
			}, {
				'name': 'prefixFontIcon',
				'type': 'string',
				'desc': {
					'en': 'Missing @doc',
					'fr': 'Missing @doc',
				},
			}, {
				'name': 'prefixIcon',
				'type': 'Orion.Icon',
				'desc': {
					'en': 'Missing @doc',
					'fr': 'Missing @doc',
				},
			}, {
				'name': 'readonly',
				'type': 'boolean',
				'desc': {
					'en': 'sets the field to read-only mode',
					'fr': 'définit le champ comme étant en lecture seule',
				},
			}, {
				'name': 'required',
				'type': 'boolean',
				'desc': {
					'en': 'sets the field required',
					'fr': 'indique que le champ est obligatoire',
				},
			}, {
				'name': 'selectOnFocus',
				'type': 'boolean',
				'desc': {
					'en': 'select the field content when focused.',
					'fr': 'sélectionne le contenu du champ lorsqu\'il est focus.',
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
					'en': 'Missing @doc',
					'fr': 'Missing @doc',
				},
			}, {
				'name': 'suffixIcon',
				'type': 'Orion.Icon',
				'desc': {
					'en': 'Missing @doc',
					'fr': 'Missing @doc',
				},
			}, {
				'name': 'type',
				'type': 'any',
				'desc': {
					'en': 'the type of the input',
					'fr': 'type du champ',
				},
				'defaultValue': '\'tel\'',
			}, {
				'name': 'validation',
				'type': 'any',
				'desc': {
					'en': 'the validation for the field',
					'fr': 'la validation du champ',
				},
			}, {
				'name': 'validationErrorMessage',
				'type': 'string',
				'desc': {
					'en': 'the error message displayed after input\'s validation.',
					'fr': 'le message d\'erreur affiché en cas d\'erreur lors de la validation',
				},
			}],
			publicInstance: [{
				'name': 'isValidMobile',
				'type': '() => boolean',
			}, {
				'name': '_country',
				'type': '() => {\n\tgetSearchTerm: () => string | undefined;\n\tsetSearchTerm: (val?: string) => string | undefined;\n\tsetFavoritesOptions: (val: unknown[]) => unknown[];\n\ttriggerSearchAsync: (term?: string) => Promise<void>;\n\tblur: import("lodash").DebouncedFuncLeading<(e?: FocusEvent, selection?: boolean) => false | undefined>;\n\thasBeenFocus: () => boolean;\n\tisFocus: () => boolean;\n\tfocus: () => void;\n\tclear: () => void;\n\tsetHasBeenFocus: (value: boolean) => void;\n\tisValid: () => boolean;\n\t_input: () => HTMLInputElement | undefined;\n\tsharedState: () => {\n\t\thasBeenFocus: boolean;\n\t\tisFocus: boolean;\n\t\tisAutoFilled: boolean;\n\t};\n} | undefined',
			}, {
				'name': '_orionInput',
				'type': '() => (HTMLInputElement & {\n\tvalueDisplay: () => string;\n\thasBeenFocus: () => boolean;\n\tisFocus: () => boolean;\n\tfocus: () => void;\n\tblur: import("lodash").DebouncedFuncLeading<() => void>;\n\tclear: () => void;\n\tsetHasBeenFocus: (value: boolean) => void;\n\tisValid: () => boolean;\n\t_input: () => HTMLInputElement | undefined;\n\tsharedState: () => {\n\t\thasBeenFocus: boolean;\n\t\tisFocus: boolean;\n\t\tisAutoFilled: boolean;\n\t};\n}) | undefined',
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
				'name': '_input',
				'type': '() => HTMLInputElement | undefined',
			}, {
				'name': 'sharedState',
				'type': '() => {\n\thasBeenFocus: boolean;\n\tisFocus: boolean;\n\tisAutoFilled: boolean;\n}',
			}],
		},
	],
	[
		'PopConfirm',
		{
			localTypes: {},
			events: [],
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
			vModel: [],
			props: [{
				'name': 'title',
				'type': 'string',
				'desc': {
					'en': 'title of the confirm popup',
					'fr': 'titre de la popup de confirmation',
				},
			}],
			publicInstance: [],
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
			vModel: [],
			props: [{
				'name': 'color',
				'type': 'Orion.Color',
				'desc': {
					'en': 'defines the color',
					'fr': 'définit la couleur',
				},
				'defaultValue': '\'info\' ',
			}, {
				'name': 'label',
				'type': 'string',
				'desc': {
					'en': 'label of the progress bar',
					'fr': 'label de la barre de progression',
				},
			}, {
				'name': 'value',
				'type': 'number',
				'desc': {
					'en': 'value of the progress bar',
					'fr': 'valeur de la barre de progression',
				},
				'defaultValue': '0',
			}, {
				'name': 'width',
				'type': 'number',
				'desc': {
					'en': 'width of the progress bar',
					'fr': 'épaisseur de la barre de progression',
				},
				'defaultValue': '10',
			}],
			publicInstance: undefined,
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
			vModel: [],
			props: [{
				'name': 'color',
				'type': 'Orion.Color',
				'desc': {
					'en': 'defines the color',
					'fr': 'définit la couleur',
				},
				'defaultValue': '\'info\' ',
			}, {
				'name': 'label',
				'type': 'string',
				'desc': {
					'en': 'the label',
					'fr': 'label du cercle',
				},
			}, {
				'name': 'pathWidth',
				'type': 'number',
				'desc': {
					'en': 'width of the path line',
					'fr': 'épaisseur du cercle',
				},
				'defaultValue': '2',
			}, {
				'name': 'size',
				'type': 'number',
				'desc': {
					'en': 'define the size',
					'fr': 'définit la taille',
				},
				'defaultValue': '50',
			}, {
				'name': 'value',
				'type': 'number',
				'desc': {
					'en': 'value of the progress circle',
					'fr': 'valeur du cercle',
				},
				'defaultValue': '0',
			}, {
				'name': 'valueWidth',
				'type': 'number',
				'desc': {
					'en': 'width of the value line',
					'fr': 'épaisseur de la ligne qui représente la progression',
				},
				'defaultValue': '4',
			}],
			publicInstance: undefined,
		},
	],
	[
		'Radio',
		{
			localTypes: {},
			events: [],
			provide: [],
			slots: [{
				'name': 'default',
				'desc': {
					'en': 'content of the radio to replace the default label.',
					'fr': 'contenu pour remplacer le label par défaut.',
				},
				'bindings': [],
			}],
			vModel: [{
				'name': 'vModel',
				'type': 'VModelType',
				'desc': {
					'en': 'component\'s vModel',
					'fr': 'vModel du composant',
				},
				'defaultValue': 'undefined',
			}],
			props: [{
				'name': 'autofocus',
				'type': 'boolean',
				'desc': {
					'en': 'autofocus the field when mounted.',
					'fr': 'focus automatiquement le champ lorsqu\'il est monté.',
				},
			}, {
				'name': 'clearable',
				'type': 'boolean',
				'desc': {
					'en': 'defines if the field can be cleared.',
					'fr': 'définit si le champ peut être vidé.',
				},
			}, {
				'name': 'clearToNull',
				'type': 'boolean',
				'desc': {
					'en': 'sets the value to null when the field is cleared',
					'fr': 'lorsque que le champ est vidé, sa valeur vaut `null`',
				},
			}, {
				'name': 'color',
				'type': 'Orion.Color',
				'desc': {
					'en': 'defines the color',
					'fr': 'définit la couleur',
				},
				'defaultValue': '\'info\' ',
			}, {
				'name': 'disabled',
				'type': 'boolean',
				'desc': {
					'en': 'disables the field',
					'fr': 'désactive le champ',
				},
			}, {
				'name': 'donetyping',
				'type': 'number',
				'desc': {
					'en': 'define the debounce duration before updating the value (useful for search field)',
					'fr': 'défini la durée du debounce avant de mettre à jour la valeur (utile pour les champs de recherche)',
				},
			}, {
				'name': 'forceLabelFloating',
				'type': 'boolean',
				'desc': {
					'en': 'allows floating label',
					'fr': 'permet au label de se placer au dessus du champ lorsqu\'il possède une valeur',
				},
			}, {
				'name': 'iconCheck',
				'type': 'Orion.Icon',
				'desc': {
					'en': 'the icon when the radio button is checked',
					'fr': 'l\'icône lorsque le bouton est coché',
				},
			}, {
				'name': 'inheritValidationState',
				'type': 'boolean',
				'desc': {
					'en': 'defines if the validation comes from its parent',
					'fr': 'définit si la validation provient du parent',
				},
			}, {
				'name': 'inline',
				'type': 'boolean',
				'desc': {
					'en': 'set the property `display` on `inline-flex` instead of `flex`',
					'fr': 'défini la propriété `display` à `inline-flex` à la place `flex`',
				},
			}, {
				'name': 'inputValue',
				'type': 'string | number | boolean | string[]',
				'desc': {
					'en': 'value of the radio button',
					'fr': 'valeur du bouton radio',
				},
			}, {
				'name': 'label',
				'type': 'string',
				'desc': {
					'en': 'label of the field',
					'fr': 'le label du champ',
				},
			}, {
				'name': 'placeholder',
				'type': 'string',
				'desc': {
					'en': 'placeholder of the field',
					'fr': 'le placeholder du champ',
				},
			}, {
				'name': 'prefixFontIcon',
				'type': 'string',
				'desc': {
					'en': 'Missing @doc',
					'fr': 'Missing @doc',
				},
			}, {
				'name': 'prefixIcon',
				'type': 'Orion.Icon',
				'desc': {
					'en': 'Missing @doc',
					'fr': 'Missing @doc',
				},
			}, {
				'name': 'readonly',
				'type': 'boolean',
				'desc': {
					'en': 'sets the field to read-only mode',
					'fr': 'définit le champ comme étant en lecture seule',
				},
			}, {
				'name': 'required',
				'type': 'boolean',
				'desc': {
					'en': 'sets the field required',
					'fr': 'indique que le champ est obligatoire',
				},
			}, {
				'name': 'reverse',
				'type': 'boolean',
				'desc': {
					'en': 'displays the label first',
					'fr': 'affiche en premier le label',
				},
			}, {
				'name': 'selectOnFocus',
				'type': 'boolean',
				'desc': {
					'en': 'select the field content when focused.',
					'fr': 'sélectionne le contenu du champ lorsqu\'il est focus.',
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
					'en': 'Missing @doc',
					'fr': 'Missing @doc',
				},
			}, {
				'name': 'suffixIcon',
				'type': 'Orion.Icon',
				'desc': {
					'en': 'Missing @doc',
					'fr': 'Missing @doc',
				},
			}, {
				'name': 'type',
				'type': 'any',
				'desc': {
					'en': 'type of the input',
					'fr': 'type du champ',
				},
				'defaultValue': '\'radio\'',
			}, {
				'name': 'validation',
				'type': 'any',
				'desc': {
					'en': 'the validation for the field',
					'fr': 'la validation du champ',
				},
			}, {
				'name': 'validationErrorMessage',
				'type': 'string',
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
				'name': '_input',
				'type': '() => HTMLInputElement | undefined',
			}, {
				'name': 'sharedState',
				'type': '() => {\n\thasBeenFocus: boolean;\n\tisFocus: boolean;\n\tisAutoFilled: boolean;\n}',
			}],
		},
	],
	[
		'Rate',
		{
			localTypes: {},
			events: [],
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
			vModel: [{
				'name': 'vModel',
				'type': 'number',
				'desc': {
					'en': 'component\'s vModel',
					'fr': 'vModel du composant',
				},
				'defaultValue': 'undefined',
			}],
			props: [{
				'name': 'color',
				'type': 'Orion.Color',
				'desc': {
					'en': 'defines the color',
					'fr': 'définit la couleur',
				},
				'defaultValue': '\'warning\' ',
			}, {
				'name': 'disabled',
				'type': 'boolean',
				'desc': {
					'en': 'If set, make the component read-only.',
					'fr': 'si défini, le composant sera en lecture seule',
				},
			}, {
				'name': 'fontIcon',
				'type': 'string',
				'desc': {
					'en': 'Icon of the component, from the imported font',
					'fr': 'icône du composant, s\'il s\'agit d\'une librairie de police importée',
				},
			}, {
				'name': 'icon',
				'type': 'Orion.Icon',
				'desc': {
					'en': 'Icon of the component',
					'fr': 'icône du composant',
				},
				'defaultValue': '\'circle_check\' ',
			}, {
				'name': 'numberOfRates',
				'type': 'number',
				'desc': {
					'en': 'The total number of rates',
					'fr': 'nombre total de votes',
				},
			}],
			publicInstance: undefined,
		},
	],
	[
		'Section',
		{
			localTypes: {},
			events: [],
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
			vModel: [{
				'name': 'collapsed',
				'type': 'boolean',
				'desc': {
					'en': 'if the prop `collapsible` is set to `true`, defines this initial state',
					'fr': 'si la prop `collapsible` est à `true`, déinit l\'état initial',
				},
				'defaultValue': 'false',
			}],
			props: [{
				'name': 'align',
				'type': '"left" | "center" | "right" | "stretch"',
				'desc': {
					'en': 'alignment of inside elements (convenient for buttons)',
					'fr': 'alignement des éléments à l\'intérieur (pratique pour les boutons)',
				},
			}, {
				'name': 'collapsible',
				'type': 'boolean',
				'desc': {
					'en': 'defines if the section can be collapsed',
					'fr': 'définit si la section peut se rétracter',
				},
			}, {
				'name': 'gap',
				'type': 'Orion.Size',
				'desc': {
					'en': 'define the space with the previous sibling `<o-section>`',
					'fr': 'définit l\'écart avec la `<o-section>` voisine précédente',
				},
				'defaultValue': '\'md\' ',
			}, {
				'name': 'subtitle',
				'type': 'Nil<string>',
				'desc': {
					'en': 'subtitle of the section',
					'fr': 'sous-titre de la section',
				},
			}, {
				'name': 'title',
				'type': 'Nil<string>',
				'desc': {
					'en': 'title of the section',
					'fr': 'titre de la section',
				},
			}],
			publicInstance: undefined,
		},
	],
	[
		'Select',
		{
			localTypes: { 'ObjectKeyValidator': '<' },
			events: [],
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
				'name': 'multiple-value',
				'desc': {
					'en': 'The content of the select if the props multiple is set',
					'fr': 'Contenu du select si la props multiple est définie',
				},
				'bindings': [{
					'bind': 'value',
					'type': 'BaseVModelType[]',
					'desc': {
						'en': 'value of the vModel',
						'fr': 'valeur du vModel',
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
			vModel: [{
				'name': 'vModel',
				'type': 'VModelType<T>',
				'desc': {
					'en': 'component\'s vModel',
					'fr': 'vModel du composant',
				},
				'defaultValue': 'undefined',
			}, {
				'name': 'favoritesOptions',
				'type': 'O[]',
				'desc': {
					'en': 'your favorites options',
					'fr': 'options favorites du select, elles apparaissent avant les options',
				},
				'defaultValue': '[] as O[]',
			}],
			props: [{
				'name': 'autocomplete',
				'type': 'boolean',
				'desc': {
					'en': 'adds the possibility to write in the select field',
					'fr': 'permet à l\'utilisateur d\'écrire dans le champ',
				},
			}, {
				'name': 'autofocus',
				'type': 'boolean',
				'desc': {
					'en': 'autofocus the field when mounted.',
					'fr': 'focus automatiquement le champ lorsqu\'il est monté.',
				},
			}, {
				'name': 'clearable',
				'type': 'boolean',
				'desc': {
					'en': 'defines if the field can be cleared.',
					'fr': 'définit si le champ peut être vidé.',
				},
			}, {
				'name': 'clearToNull',
				'type': 'boolean',
				'desc': {
					'en': 'sets the value to null when the field is cleared',
					'fr': 'lorsque que le champ est vidé, sa valeur vaut `null`',
				},
			}, {
				'name': 'customFetch',
				'type': '(searchTerm?: string) => Promise<O[]>',
				'desc': {
					'en': 'allows you to custom the fetch function',
					'fr': 'permet de personnaliser la fonction de récupération des options',
				},
			}, {
				'name': 'customSearch',
				'type': 'Function',
				'desc': {
					'en': 'allows you to custom the search function',
					'fr': 'permet de personnaliser la fonction de recherche',
				},
			}, {
				'name': 'disabled',
				'type': 'boolean',
				'desc': {
					'en': 'disables the field',
					'fr': 'désactive le champ',
				},
			}, {
				'name': 'disabledKey',
				'type': 'string',
				'desc': {
					'en': 'disables the selection of the value',
					'fr': 'empêche la sélection d\'un élément s\'il possède cette clé',
				},
			}, {
				'name': 'displayKey',
				'type': 'DKey | keyof O',
				'desc': {
					'en': 'key used to display the value in the field',
					'fr': 'clé qui sera affiché au niveau du champ',
				},
			}, {
				'name': 'donetyping',
				'type': 'number',
				'desc': {
					'en': 'the duration to trigger the fetch',
					'fr': 'indique après combien de temps après la dernière frappe, la fonction de récupération des options est appelée',
				},
				'defaultValue': '600',
			}, {
				'name': 'favoriteIcon',
				'type': 'Orion.Icon',
				'desc': {
					'en': 'key used to choice the favorite icon',
					'fr': 'clé qui permet de choisir l\'icône des favoris',
				},
				'defaultValue': '\'star\' ',
			}, {
				'name': 'dropdownOptions',
				'defaultValue': 'undefined',
				'type': 'Partial<Orion.VDropdown>',
				'required': false,
				'desc': {
					'en': 'options to configure the dropdown [go to Floating Vue doc for more details](https://floating-vue.starpad.dev/api/#component-props)',
					'fr': 'options pour configurer la dropdown [Voir la documentation de Floating Vue pour plus de détails](https://floating-vue.starpad.dev/api/#component-props)',
				},
			}, {
				'name': 'fetchInitialOptions',
				'type': 'O[]',
				'desc': {
					'en': 'initial options before first fetch (when using fetch mecanism)',
					'fr': 'options intiales avant le premier fetch (lors de l\'utilisation du mécanisme de fetch des options)',
				},
				'defaultValue': '() => []',
			}, {
				'name': 'fetchKey',
				'type': 'string',
				'desc': {
					'en': 'key used to pass the research field value as a parameter to fetch the options',
					'fr': 'clé utilisée pour passer la valeur du champ de recherche comme paramètre pour récupérer les options',
				},
				'defaultValue': '\'search\'',
			}, {
				'name': 'fetchMethod',
				'type': '"GET" | "POST"',
				'desc': {
					'en': 'Method used to fetch the options',
					'fr': 'Méthode utilisée pour récupérer les options',
				},
				'defaultValue': '\'GET\' ',
			}, {
				'name': 'fetchMinSearch',
				'type': 'number',
				'desc': {
					'en': 'minimum number of caracters to trigger the fetch',
					'fr': 'nombre de caractères nécessaire pour déclencher l\'appel pour récupérer les options',
				},
				'defaultValue': '1',
			}, {
				'name': 'fetchUrl',
				'type': 'string',
				'desc': {
					'en': 'URL to fetch the options',
					'fr': 'URL pour récupérer les options',
				},
			}, {
				'name': 'forceLabelFloating',
				'type': 'boolean',
				'desc': {
					'en': 'allows floating label',
					'fr': 'permet au label de se placer au dessus du champ lorsqu\'il possède une valeur',
				},
			}, {
				'name': 'inheritValidationState',
				'type': 'boolean',
				'desc': {
					'en': 'defines if the validation comes from its parent',
					'fr': 'définit si la validation provient du parent',
				},
			}, {
				'name': 'label',
				'type': 'string',
				'desc': {
					'en': 'label of the field',
					'fr': 'le label du champ',
				},
			}, {
				'name': 'multiple',
				'type': 'boolean',
				'desc': {
					'en': 'defines if multiple values can be select in the select',
					'fr': 'définit si plusieurs valeurs peuvent être sélectionnées',
				},
			}, {
				'name': 'options',
				'type': 'O[]',
				'desc': {
					'en': 'options of the select',
					'fr': 'options du select',
				},
				'defaultValue': '() => []',
			}, {
				'name': 'placeholder',
				'type': 'string',
				'desc': {
					'en': 'placeholder of the field',
					'fr': 'le placeholder du champ',
				},
			}, {
				'name': 'prefillSearch',
				'type': 'string',
				'desc': {
					'en': 'prefill the search field',
					'fr': 'pré-rempli le champ de recherche',
				},
			}, {
				'name': 'prefixFontIcon',
				'type': 'string',
				'desc': {
					'en': 'Missing @doc',
					'fr': 'Missing @doc',
				},
			}, {
				'name': 'prefixIcon',
				'type': 'Orion.Icon',
				'desc': {
					'en': 'Missing @doc',
					'fr': 'Missing @doc',
				},
			}, {
				'name': 'readonly',
				'type': 'boolean',
				'desc': {
					'en': 'sets the field to read-only mode',
					'fr': 'définit le champ comme étant en lecture seule',
				},
			}, {
				'name': 'required',
				'type': 'boolean',
				'desc': {
					'en': 'sets the field required',
					'fr': 'indique que le champ est obligatoire',
				},
			}, {
				'name': 'searchable',
				'type': 'boolean',
				'desc': {
					'en': 'adds a search tooltip',
					'fr': 'ajoute un champ de recherche',
				},
			}, {
				'name': 'selectOnFocus',
				'type': 'boolean',
				'desc': {
					'en': 'select the field content when focused.',
					'fr': 'sélectionne le contenu du champ lorsqu\'il est focus.',
				},
			}, {
				'name': 'showFavoriteIcon',
				'type': 'boolean',
				'desc': {
					'en': 'key used to display or not an icon new to the favorites options',
					'fr': 'clé qui permet ou non d\'afficher un icône pour les favoris',
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
					'en': 'Missing @doc',
					'fr': 'Missing @doc',
				},
			}, {
				'name': 'suffixIcon',
				'type': 'Orion.Icon',
				'desc': {
					'en': 'Missing @doc',
					'fr': 'Missing @doc',
				},
			}, {
				'name': 'trackKey',
				'type': 'keyof O',
				'desc': {
					'en': 'unique key item',
					'fr': 'clé unique qui va différencier les options',
				},
				'defaultValue': '\'id\' as any',
			}, {
				'name': 'type',
				'type': 'any',
				'desc': {
					'en': 'type of the input',
					'fr': 'type of the input',
				},
			}, {
				'name': 'validation',
				'type': 'any',
				'desc': {
					'en': 'the validation for the field',
					'fr': 'la validation du champ',
				},
			}, {
				'name': 'validationErrorMessage',
				'type': 'string',
				'desc': {
					'en': 'the error message displayed after input\'s validation.',
					'fr': 'le message d\'erreur affiché en cas d\'erreur lors de la validation',
				},
			}, {
				'name': 'valueKey',
				'type': 'VKey',
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
				'name': 'setFavoritesOptions',
				'type': '(val: O[]) => O[]',
			}, {
				'name': 'triggerSearchAsync',
				'type': '(term?: string) => Promise<void>',
			}, {
				'name': 'blur',
				'type': 'Lodash.debounce',
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
				'name': 'clear',
				'type': '() => void',
			}, {
				'name': 'setHasBeenFocus',
				'type': '(value: boolean) => void',
			}, {
				'name': 'isValid',
				'type': '() => boolean',
			}, {
				'name': '_input',
				'type': '() => HTMLInputElement | undefined',
			}, {
				'name': 'sharedState',
				'type': '() => {\n\thasBeenFocus: boolean;\n\tisFocus: boolean;\n\tisAutoFilled: boolean;\n}',
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
			vModel: [],
			props: [{
				'name': 'hideActions',
				'type': 'boolean',
				'desc': {
					'en': 'hides the sticker\'s actions',
					'fr': 'masque les actions du sticker',
				},
			}, {
				'name': 'hoverElevation',
				'type': 'number',
				'desc': {
					'en': 'elevation level on mouse hover',
					'fr': 'niveau d\'élévation au survol de la souris',
				},
				'defaultValue': '1',
			}, {
				'name': 'muted',
				'type': 'boolean',
				'desc': {
					'en': 'adds a disabled style',
					'fr': 'ajoute un style `disabled`',
				},
			}, {
				'name': 'selected',
				'type': 'boolean',
				'desc': {
					'en': 'adds a selected style on the sticker',
					'fr': 'ajoute le style `selected` sur le sticker',
				},
			}, {
				'name': 'selectedColor',
				'type': 'Orion.Color',
				'desc': {
					'en': 'the color of the selected style',
					'fr': 'la couleur du style `selected`',
				},
				'defaultValue': '\'info\' ',
			}, {
				'name': 'title',
				'type': 'string',
				'desc': {
					'en': 'title of the sticker',
					'fr': 'titre du sticker',
				},
			}],
			publicInstance: undefined,
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
			vModel: [],
			props: [{
				'name': 'direction',
				'type': 'SwipeDirection',
				'desc': {
					'en': 'direction of the swipe animation',
					'fr': 'direction de l\'animation du swipe',
				},
				'defaultValue': '\'left\' ',
			}],
			publicInstance: undefined,
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
			vModel: [],
			props: [{
				'name': 'disabled',
				'type': 'boolean',
				'desc': {
					'en': 'disabled the pane',
					'fr': 'désactive le panneau',
				},
			}, {
				'name': 'fontIcon',
				'type': 'string',
				'desc': {
					'en': 'Missing @doc',
					'fr': 'Missing @doc',
				},
			}, {
				'name': 'icon',
				'type': 'Orion.Icon',
				'desc': {
					'en': 'Missing @doc',
					'fr': 'Missing @doc',
				},
			}, {
				'name': 'label',
				'type': 'string',
				'desc': {
					'en': 'the label of the tab',
					'fr': 'le label de l\'onglet',
				},
			}, {
				'name': 'lazy',
				'type': 'boolean',
				'desc': {
					'en': 'the content of the tab is mounted each time the tab becomes active',
					'fr': 'le contenu de l\'onglet est monté à chaque fois qu\'il devient actif',
				},
			}, {
				'name': 'lazyOnce',
				'type': 'boolean',
				'desc': {
					'en': 'the content of the tab is only mounted once, the first time the tab is active',
					'fr': 'le contenu de l\'onglet est uniquement monté une fois, la première fois qu\'il est actif',
				},
			}, {
				'name': 'marker',
				'type': 'number | boolean',
				'desc': {
					'en': 'adds a visual marker, can be used as a notification marker',
					'fr': 'ajoute un marqueur visuel, qui peut être utilisé comme marqueur de notification',
				},
			}, {
				'name': 'markerColor',
				'type': 'Orion.Color',
				'desc': {
					'en': 'the color of the marker',
					'fr': 'la couleur du marqueur',
				},
				'defaultValue': '\'danger\' ',
			}, {
				'name': 'name',
				'type': 'string',
				'desc': {
					'en': 'the name of the tab',
					'fr': 'le nom de l\'onglet',
				},
			}],
			publicInstance: [{
				'name': 'disabled',
				'type': 'boolean | undefined',
			}, {
				'name': 'name',
				'type': 'string | undefined',
			}, {
				'name': '_el',
				'type': '() => HTMLElement | undefined',
			}],
		},
	],
	[
		'Tabs',
		{
			localTypes: {},
			events: [],
			provide: [],
			slots: [],
			vModel: [],
			props: [{
				'name': 'loader',
				'type': 'string | boolean',
				'desc': {
					'en': 'adds a loader on the tab',
					'fr': 'ajoute une icône de chargement sur l\'onglet',
				},
			}, {
				'name': 'routerViewName',
				'type': 'string',
				'desc': {
					'en': 'the name of the `<router-view/>` when using `use-router` prop',
					'fr': 'le nom du `<router-view/>` lors de l\'utilisation de la prop `use-router`',
				},
			}, {
				'name': 'useRouter',
				'type': 'boolean',
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
				'type': 'Private.TsxTabPane[]',
			}, {
				'name': 'getValue',
				'type': '() => string | undefined',
			}, {
				'name': 'useRouter',
				'type': 'boolean | undefined',
			}, {
				'name': '_el',
				'type': '() => HTMLElement | undefined',
			}],
		},
	],
	[
		'Textarea',
		{
			localTypes: {},
			events: [],
			provide: [],
			slots: [],
			vModel: [{
				'name': 'vModel',
				'type': 'Nil<string>',
				'desc': {
					'en': 'component\'s vModel',
					'fr': 'vModel du composant',
				},
				'defaultValue': 'undefined',
			}],
			props: [{
				'name': 'autofocus',
				'type': 'boolean',
				'desc': {
					'en': 'autofocus the field when mounted.',
					'fr': 'focus automatiquement le champ lorsqu\'il est monté.',
				},
			}, {
				'name': 'clearable',
				'type': 'boolean',
				'desc': {
					'en': 'defines if the field can be cleared.',
					'fr': 'définit si le champ peut être vidé.',
				},
			}, {
				'name': 'clearToNull',
				'type': 'boolean',
				'desc': {
					'en': 'sets the value to null when the field is cleared',
					'fr': 'lorsque que le champ est vidé, sa valeur vaut `null`',
				},
			}, {
				'name': 'disabled',
				'type': 'boolean',
				'desc': {
					'en': 'disables the field',
					'fr': 'désactive le champ',
				},
			}, {
				'name': 'donetyping',
				'type': 'number',
				'desc': {
					'en': 'define the debounce duration before updating the value (useful for search field)',
					'fr': 'défini la durée du debounce avant de mettre à jour la valeur (utile pour les champs de recherche)',
				},
			}, {
				'name': 'forceLabelFloating',
				'type': 'boolean',
				'desc': {
					'en': 'allows floating label',
					'fr': 'permet au label de se placer au dessus du champ lorsqu\'il possède une valeur',
				},
			}, {
				'name': 'inheritValidationState',
				'type': 'boolean',
				'desc': {
					'en': 'defines if the validation comes from its parent',
					'fr': 'définit si la validation provient du parent',
				},
			}, {
				'name': 'label',
				'type': 'string',
				'desc': {
					'en': 'label of the field',
					'fr': 'le label du champ',
				},
			}, {
				'name': 'maxLength',
				'type': 'number',
				'desc': {
					'en': 'maximal length of the input',
					'fr': 'taille maximale de l\'entrée',
				},
			}, {
				'name': 'placeholder',
				'type': 'string',
				'desc': {
					'en': 'placeholder of the field',
					'fr': 'le placeholder du champ',
				},
			}, {
				'name': 'prefixFontIcon',
				'type': 'string',
				'desc': {
					'en': 'Missing @doc',
					'fr': 'Missing @doc',
				},
			}, {
				'name': 'prefixIcon',
				'type': 'Orion.Icon',
				'desc': {
					'en': 'Missing @doc',
					'fr': 'Missing @doc',
				},
			}, {
				'name': 'readonly',
				'type': 'boolean',
				'desc': {
					'en': 'sets the field to read-only mode',
					'fr': 'définit le champ comme étant en lecture seule',
				},
			}, {
				'name': 'required',
				'type': 'boolean',
				'desc': {
					'en': 'sets the field required',
					'fr': 'indique que le champ est obligatoire',
				},
			}, {
				'name': 'selectOnFocus',
				'type': 'boolean',
				'desc': {
					'en': 'select the field content when focused.',
					'fr': 'sélectionne le contenu du champ lorsqu\'il est focus.',
				},
			}, {
				'name': 'showLength',
				'type': 'boolean',
				'desc': {
					'en': 'show input\'s value length',
					'fr': 'affiche le nombre de caractères',
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
					'en': 'Missing @doc',
					'fr': 'Missing @doc',
				},
			}, {
				'name': 'suffixIcon',
				'type': 'Orion.Icon',
				'desc': {
					'en': 'Missing @doc',
					'fr': 'Missing @doc',
				},
			}, {
				'name': 'type',
				'type': 'any',
				'desc': {
					'en': 'type of the input',
					'fr': 'type of the input',
				},
			}, {
				'name': 'validation',
				'type': 'any',
				'desc': {
					'en': 'the validation for the field',
					'fr': 'la validation du champ',
				},
			}, {
				'name': 'validationErrorMessage',
				'type': 'string',
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
				'name': '_input',
				'type': '() => HTMLInputElement | undefined',
			}, {
				'name': 'sharedState',
				'type': '() => {\n\thasBeenFocus: boolean;\n\tisFocus: boolean;\n\tisAutoFilled: boolean;\n}',
			}],
		},
	],
	[
		'Timeline',
		{
			localTypes: {},
			events: [],
			provide: [],
			slots: [],
			vModel: [],
			props: [{
				'name': 'centeredPill',
				'type': 'boolean',
				'desc': {
					'en': 'centers the pill and the #after slot',
					'fr': 'centre la vignette et le slot #after',
				},
			}, {
				'name': 'horizontal',
				'type': 'boolean',
				'desc': {
					'en': 'the orientation of the component',
					'fr': 'l\'orientation du composant',
				},
			}, {
				'name': 'loader',
				'type': 'string | boolean',
				'desc': {
					'en': 'displays a loader on the timeline',
					'fr': 'affiche un loader sur la timeline',
				},
			}, {
				'name': 'scrollable',
				'type': 'boolean',
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
				'type': 'Private.TsxTimelinePane[]',
			}, {
				'name': 'getValue',
				'type': '() => Undef<string | number>',
			}, {
				'name': 'getCurrent',
				'type': '() => Undef<string | number>',
			}, {
				'name': 'setCurrent',
				'type': '(name?: string | number) => void',
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
			vModel: [],
			props: [{
				'name': 'centeredPill',
				'type': 'boolean',
				'desc': {
					'en': 'centers the pill and the #after slot',
					'fr': 'centre la vignette et le slot #after',
				},
			}, {
				'name': 'complete',
				'type': 'boolean',
				'desc': {
					'en': 'adds a complete style and defines the pill as clickable',
					'fr': 'ajoute le style `complete` et permet de cliquer sur la vignette',
				},
			}, {
				'name': 'disabled',
				'type': 'boolean',
				'desc': {
					'en': 'disables the pane',
					'fr': 'désactive le panneau',
				},
			}, {
				'name': 'fontIcon',
				'type': 'string',
				'desc': {
					'en': 'Missing @doc',
					'fr': 'Missing @doc',
				},
			}, {
				'name': 'icon',
				'type': 'Orion.Icon',
				'desc': {
					'en': 'Missing @doc',
					'fr': 'Missing @doc',
				},
			}, {
				'name': 'lazy',
				'type': 'boolean',
				'desc': {
					'en': 'the content of the pane is only loaded when the tab is active',
					'fr': 'le contenu du panneau est seulement chargé quand il est actif',
				},
			}, {
				'name': 'lazyOnce',
				'type': 'boolean',
				'desc': {
					'en': 'the content of the pane is only loading once, the first time the pane is active',
					'fr': 'le contenu du panneau est seulement chargé une fois, la première fois que le panneau est actif',
				},
			}, {
				'name': 'marker',
				'type': 'number | boolean',
				'desc': {
					'en': 'adds  visual marker which can be used as a notification marker',
					'fr': 'ajoute un marqueur visuel, qui peut être utilisé comme marqueur de notification',
				},
			}, {
				'name': 'markerColor',
				'type': 'Orion.Color',
				'desc': {
					'en': 'color of the marker',
					'fr': 'couleur du marqueur',
				},
				'defaultValue': '\'danger\' ',
			}, {
				'name': 'name',
				'type': 'string | number',
				'desc': {
					'en': 'the name of the pane',
					'fr': 'nom du panneau',
				},
			}, {
				'name': 'pill',
				'type': 'string',
				'desc': {
					'en': 'the content displayed on the pill',
					'fr': 'contenu affiché sur la vignette',
				},
			}],
			publicInstance: [{
				'name': 'disabled',
				'type': 'boolean | undefined',
			}, {
				'name': 'name',
				'type': 'string | number | undefined',
			}, {
				'name': '_el',
				'type': '() => HTMLElement | undefined',
			}],
		},
	],
	[
		'Toggle',
		{
			localTypes: {},
			events: [],
			provide: [],
			slots: [{
				'name': 'default',
				'desc': {
					'en': 'content of the toggle to replace the default label.',
					'fr': 'contenu pour remplacer le label par défaut.',
				},
				'bindings': [],
			}],
			vModel: [{
				'name': 'vModel',
				'type': 'boolean',
				'desc': {
					'en': 'component\'s vModel',
					'fr': 'vModel du composant',
				},
				'defaultValue': 'undefined',
			}],
			props: [{
				'name': 'autofocus',
				'type': 'boolean',
				'desc': {
					'en': 'autofocus the field when mounted.',
					'fr': 'focus automatiquement le champ lorsqu\'il est monté.',
				},
			}, {
				'name': 'clearable',
				'type': 'boolean',
				'desc': {
					'en': 'defines if the field can be cleared.',
					'fr': 'définit si le champ peut être vidé.',
				},
			}, {
				'name': 'clearToNull',
				'type': 'boolean',
				'desc': {
					'en': 'sets the value to null when the field is cleared',
					'fr': 'lorsque que le champ est vidé, sa valeur vaut `null`',
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
					'en': 'disables the field',
					'fr': 'désactive le champ',
				},
			}, {
				'name': 'donetyping',
				'type': 'number',
				'desc': {
					'en': 'define the debounce duration before updating the value (useful for search field)',
					'fr': 'défini la durée du debounce avant de mettre à jour la valeur (utile pour les champs de recherche)',
				},
			}, {
				'name': 'forceLabelFloating',
				'type': 'boolean',
				'desc': {
					'en': 'allows floating label',
					'fr': 'permet au label de se placer au dessus du champ lorsqu\'il possède une valeur',
				},
			}, {
				'name': 'inheritValidationState',
				'type': 'boolean',
				'desc': {
					'en': 'defines if the validation comes from its parent',
					'fr': 'définit si la validation provient du parent',
				},
			}, {
				'name': 'inline',
				'type': 'boolean',
				'desc': {
					'en': 'set the property `display` on `inline-flex` instead of `flex`',
					'fr': 'défini la propriété `display` à `inline-flex` à la place `flex`',
				},
			}, {
				'name': 'label',
				'type': 'string',
				'desc': {
					'en': 'label of the field',
					'fr': 'le label du champ',
				},
			}, {
				'name': 'placeholder',
				'type': 'string',
				'desc': {
					'en': 'placeholder of the field',
					'fr': 'le placeholder du champ',
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
				'name': 'readonly',
				'type': 'boolean',
				'desc': {
					'en': 'sets the field to read-only mode',
					'fr': 'définit le champ comme étant en lecture seule',
				},
			}, {
				'name': 'required',
				'type': 'boolean',
				'desc': {
					'en': 'sets the field required',
					'fr': 'indique que le champ est obligatoire',
				},
			}, {
				'name': 'reverse',
				'type': 'boolean',
				'desc': {
					'en': 'displays the label first',
					'fr': 'affiche d\'abord le label',
				},
			}, {
				'name': 'selectOnFocus',
				'type': 'boolean',
				'desc': {
					'en': 'select the field content when focused.',
					'fr': 'sélectionne le contenu du champ lorsqu\'il est focus.',
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
			}, {
				'name': 'type',
				'type': 'any',
				'desc': {
					'en': 'type of the input',
					'fr': 'type du champ',
				},
				'defaultValue': '\'toggle\'',
			}, {
				'name': 'validation',
				'type': 'any',
				'desc': {
					'en': 'the validation for the field',
					'fr': 'la validation du champ',
				},
			}, {
				'name': 'validationErrorMessage',
				'type': 'string',
				'desc': {
					'en': 'the error message displayed after input\'s validation.',
					'fr': 'le message d\'erreur affiché en cas d\'erreur lors de la validation',
				},
			}, {
				'name': 'value',
				'type': 'boolean',
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
				'name': '_input',
				'type': '() => HTMLInputElement | undefined',
			}, {
				'name': 'sharedState',
				'type': '() => {\n\thasBeenFocus: boolean;\n\tisFocus: boolean;\n\tisAutoFilled: boolean;\n}',
			}],
		},
	],
	[
		'Tour',
		{
			localTypes: {},
			events: [],
			provide: [],
			slots: [],
			vModel: [],
			props: [{
				'name': 'callback',
				'type': 'Function',
				'desc': {
					'en': 'function executed when the tour is stopped',
					'fr': 'fonction exécutée quand le tour est arrêté',
				},
			}, {
				'name': 'value',
				'type': 'number',
				'desc': {
					'en': 'current step index of the tour',
					'fr': 'index courant du tour',
				},
			}],
			publicInstance: [{
				'name': 'steps',
				'type': '{\n\tprops: {\n\t\tclickable?: (boolean | Function) | undefined;\n\t\tclosable?: boolean | undefined;\n\t\tend?: {\n\t\t\tlabel?: string | undefined;\n\t\t\tcallback?: (() => any) | undefined;\n\t\t\tclean?: (() => any) | undefined;\n\t\t} | undefined;\n\t\thideFinish?: boolean | undefined;\n\t\tnext?: {\n\t\t\tlabel?: string | undefined;\n\t\t\tcallback?: (() => any) | undefined;\n\t\t\tclean?: (() => any) | undefined;\n\t\t} | undefined;\n\t\tprevious?: {\n\t\t\tlabel?: string | undefined;\n\t\t\tcallback?: (() => any) | undefined;\n\t\t\tclean?: (() => any) | undefined;\n\t\t} | undefined;\n\t\tsize?: string | undefined;\n\t\ttarget?: (string | Function | boolean) | undefined;\n\t\ttimeout?: number | undefined;\n\t\ttitle?: string | undefined;\n\t};\n}[]',
			}, {
				'name': 'getCurrentIndex',
				'type': '() => number',
			}, {
				'name': 'setCurrent',
				'type': '(val: number) => void',
			}, {
				'name': 'setCurrentStepPublicInstance',
				'type': '(instance: Undef<OrionTourStepSetupService["publicInstance"]>) => void',
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
			vModel: [],
			props: [{
				'name': 'clickable',
				'type': 'boolean | Function',
				'desc': {
					'en': 'if there is a target, it allows the user to click on the target (if the target is a button for example). It also ends the tour.',
					'fr': 's\'il y a une cible, permet de clicker sur la cible  (si c\'est un bouton par exemple). Cela met aussi fin au tour.',
				},
			}, {
				'name': 'closable',
				'type': 'boolean',
				'desc': {
					'en': 'defines if the step can be closable',
					'fr': 'définit si l\'étape peut être fermée à l\'aide de la croix',
				},
				'defaultValue': 'true',
			}, {
				'name': 'end',
				'type': 'Orion.Tour.TourObject',
				'desc': {
					'en': 'object which contains a label, and a callback and clean functions for the final step',
					'fr': 'objet contenant un label, et des fonction `callback` et `clean` pour l\'étape finale',
				},
			}, {
				'name': 'hideFinish',
				'type': 'boolean',
				'desc': {
					'en': 'hides the Finish button',
					'fr': 'masque le bouton pour terminer le tour',
				},
			}, {
				'name': 'next',
				'type': 'Orion.Tour.TourObject',
				'desc': {
					'en': 'object which contains a label, and a callback and clean functions for the next step',
					'fr': 'objet contenant un label, et des fonction `callback` et `clean` pour l\'étape suivante',
				},
			}, {
				'name': 'previous',
				'type': 'Orion.Tour.TourObject',
				'desc': {
					'en': 'object which contains a label, and a callback and clean functions for the previous step',
					'fr': 'objet contenant un label, et des fonction `callback` et `clean` pour l\'étape précédente',
				},
			}, {
				'name': 'size',
				'type': 'string',
				'desc': {
					'en': 'define the size',
					'fr': 'définit la taille',
				},
				'defaultValue': '\'md\'',
			}, {
				'name': 'target',
				'type': 'string | boolean | Function',
				'desc': {
					'en': 'possibility to target a DOM element. If it is a `string`, it must represent an `id` in the DOM. If `false`, no target will be selected',
					'fr': 'Permet de cibler un élément dans le DOM. S\'il s\'agit d\'une string, elle doit correspondre à l\'id de cet élément. Si elle est définie à `false` l\'étape se placera au centre de la page, sans cible.',
				},
			}, {
				'name': 'timeout',
				'type': 'number',
				'desc': {
					'en': 'when a target can not be find in DOM, a modal appears after a certain time defined with this attribut',
					'fr': 'quand la cible n\'est pas trouvée dans le DOM, une modal appararaît après le temps spécifié',
				},
				'defaultValue': '3000',
			}, {
				'name': 'title',
				'type': 'string',
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
			localTypes: {},
			events: [],
			provide: [],
			slots: [{
				'name': 'default',
				'desc': {
					'en': 'the label displayed in the drop area',
					'fr': 'contenu pour remplacer le label par défaut',
				},
				'bindings': [],
			}],
			vModel: [{
				'name': 'vModel',
				'type': 'File[] | undefined',
				'desc': {
					'en': 'component\'s vModel',
					'fr': 'vModel du composant',
				},
				'defaultValue': 'undefined',
			}],
			props: [{
				'name': 'autofocus',
				'type': 'boolean',
				'desc': {
					'en': 'autofocus the field when mounted.',
					'fr': 'focus automatiquement le champ lorsqu\'il est monté.',
				},
			}, {
				'name': 'clearable',
				'type': 'boolean',
				'desc': {
					'en': 'defines if the field can be cleared.',
					'fr': 'définit si le champ peut être vidé.',
				},
			}, {
				'name': 'clearToNull',
				'type': 'boolean',
				'desc': {
					'en': 'sets the value to null when the field is cleared',
					'fr': 'lorsque que le champ est vidé, sa valeur vaut `null`',
				},
			}, {
				'name': 'disabled',
				'type': 'boolean',
				'desc': {
					'en': 'disables the field',
					'fr': 'désactive le champ',
				},
			}, {
				'name': 'donetyping',
				'type': 'number',
				'desc': {
					'en': 'define the debounce duration before updating the value (useful for search field)',
					'fr': 'défini la durée du debounce avant de mettre à jour la valeur (utile pour les champs de recherche)',
				},
			}, {
				'name': 'fileMaxSize',
				'type': 'number',
				'desc': {
					'en': 'the maximal size of the uploaded file (Mo)',
					'fr': 'taille maximale d\'un fichier (Mo)',
				},
				'defaultValue': '4',
			}, {
				'name': 'fileTypes',
				'type': 'string[]',
				'desc': {
					'en': 'Missing @doc',
					'fr': 'Missing @doc',
				},
				'defaultValue': '() => [\'image/jpeg\', \'image/png\', \'image/gif\', \'application/pdf\']',
			}, {
				'name': 'forceLabelFloating',
				'type': 'boolean',
				'desc': {
					'en': 'allows floating label',
					'fr': 'permet au label de se placer au dessus du champ lorsqu\'il possède une valeur',
				},
			}, {
				'name': 'inheritValidationState',
				'type': 'boolean',
				'desc': {
					'en': 'defines if the validation comes from its parent',
					'fr': 'définit si la validation provient du parent',
				},
			}, {
				'name': 'label',
				'type': 'string',
				'desc': {
					'en': 'label of the field',
					'fr': 'le label du champ',
				},
			}, {
				'name': 'multiple',
				'type': 'boolean',
				'desc': {
					'en': 'allows multiple files upload.',
					'fr': 'permet le chargement de plusieurs fichiers.',
				},
			}, {
				'name': 'placeholder',
				'type': 'string',
				'desc': {
					'en': 'placeholder of the field',
					'fr': 'le placeholder du champ',
				},
			}, {
				'name': 'prefixFontIcon',
				'type': 'string',
				'desc': {
					'en': 'Missing @doc',
					'fr': 'Missing @doc',
				},
			}, {
				'name': 'prefixIcon',
				'type': 'Orion.Icon',
				'desc': {
					'en': 'Missing @doc',
					'fr': 'Missing @doc',
				},
			}, {
				'name': 'readonly',
				'type': 'boolean',
				'desc': {
					'en': 'sets the field to read-only mode',
					'fr': 'définit le champ comme étant en lecture seule',
				},
			}, {
				'name': 'required',
				'type': 'boolean',
				'desc': {
					'en': 'sets the field required',
					'fr': 'indique que le champ est obligatoire',
				},
			}, {
				'name': 'selectOnFocus',
				'type': 'boolean',
				'desc': {
					'en': 'select the field content when focused.',
					'fr': 'sélectionne le contenu du champ lorsqu\'il est focus.',
				},
			}, {
				'name': 'showPreview',
				'type': 'boolean',
				'desc': {
					'en': 'shows a preview of the selected file',
					'fr': 'montre un apperçu du fichier chargé',
				},
				'defaultValue': 'true',
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
					'en': 'Missing @doc',
					'fr': 'Missing @doc',
				},
			}, {
				'name': 'suffixIcon',
				'type': 'Orion.Icon',
				'desc': {
					'en': 'Missing @doc',
					'fr': 'Missing @doc',
				},
			}, {
				'name': 'type',
				'type': 'any',
				'desc': {
					'en': 'type of the input',
					'fr': 'type of the input',
				},
			}, {
				'name': 'validation',
				'type': 'any',
				'desc': {
					'en': 'the validation for the field',
					'fr': 'la validation du champ',
				},
			}, {
				'name': 'validationErrorMessage',
				'type': 'string',
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
				'name': '_input',
				'type': '() => HTMLInputElement | undefined',
			}, {
				'name': 'sharedState',
				'type': '() => {\n\thasBeenFocus: boolean;\n\tisFocus: boolean;\n\tisAutoFilled: boolean;\n}',
			}],
		},
	],
]);

export default packagesDocData;
