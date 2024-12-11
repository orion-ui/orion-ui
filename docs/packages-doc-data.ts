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
			slots: [{"name":"default","desc":{"en":"the content of the alert","fr":"contenu de l'alerte"},"bindings":[]}],
			props: [],
			publicInstance: undefined,
		},
	],
	[
		'Aside',
		{
			localTypes: {},
			events: [],
			provide: [{"name":"_aside","data":"publicInstance"}],
			slots: [{"name":"poster","desc":{"en":"useful to display a poster image on aside's top","fr":"utile pour afficher une image de couverture en haut de l'aside"},"bindings":[]},{"name":"header","desc":{"en":"the header of the aside","fr":"en-tête de l'aside"},"bindings":[]},{"name":"actions","desc":{"en":"content at the top left of the aside (useful for action's buttons)","fr":"contenu situé en haut à gauche de l'aside (utile pour des boutons d'actions)"},"bindings":[{"bind":"close","type":"() => void","desc":{"en":"to close the aside","fr":"fonction pour fermer l'aside"}}]},{"name":"footer","desc":{"en":"the footer of the aside","fr":"pied de page de l'aside"},"bindings":[{"bind":"close","type":"function","desc":{"en":"to close the aside","fr":"fonction pour fermer l'aside"}}]},{"name":"default","desc":{"en":"the content of the aside","fr":"contenu de l'aside"},"bindings":[{"bind":"close","type":"() => void","desc":{"en":"to close the aside","fr":"fonction pour fermer l'aside"}}]}],
			props: [],
			publicInstance: [{"name":"slotPoster","type":"string"},{"name":"slotFooter","type":"string"},{"name":"slotActions","type":"string"},{"name":"slotHeader","type":"string"},{"name":"_loader","type":"() => OrionLoader"},{"name":"uid","type":"number"},{"name":"bus","type":"Bus"},{"name":"state","type":"{\n\tisClosing: boolean;\n\tisOpening: boolean;\n\tisMounted: boolean;\n\tvisible: boolean;\n}"},{"name":"options","type":"Orion.Popable.Options"},{"name":"open","type":"(keepInQueue?: boolean) => Promise<void>"},{"name":"close","type":"(options?: Orion.Popable.CloseOptions | undefined) => Promise<void>"},{"name":"trigger","type":"(eventName: string, params?: any) => void"},{"name":"animateAsync","type":"(enter: boolean) => Promise<void>"},{"name":"removeProgrammatic","type":"() => void"},{"name":"isLastOpenedPopable","type":"() => boolean"},{"name":"_el","type":"(() => HTMLElement | undefined) | undefined"}],
		},
	],
	[
		'Avatar',
		{
			localTypes: {},
			events: [],
			provide: [],
			slots: [],
			props: [],
			publicInstance: undefined,
		},
	],
	[
		'Button',
		{
			localTypes: {},
			events: [],
			provide: [],
			slots: [{"name":"default","desc":{"en":"the content of the button","fr":"contenu du bouton"},"bindings":[]}],
			props: [],
			publicInstance: undefined,
		},
	],
	[
		'Card',
		{
			localTypes: {},
			events: [],
			provide: [],
			slots: [{"name":"poster","desc":{"en":"adds a poster at the top of the card, without any padding","fr":"ajoute un poster en haut de la carte, sans aucun padding"},"bindings":[]},{"name":"header","desc":{"en":"the header of the card","fr":"en-tête de la carte"},"bindings":[]},{"name":"default","desc":{"en":"the content of the card","fr":"contenu de la carte"},"bindings":[]},{"name":"actions","desc":{"en":"actions of the card, on the footer of the card","fr":"actions au bas de la carte"},"bindings":[]}],
			props: [],
			publicInstance: undefined,
		},
	],
	[
		'Carousel',
		{
			localTypes: {},
			events: [],
			provide: [{"name":"_carousel","data":"publicInstance"}],
			slots: [{"name":"poster","desc":{"en":"fixed placeholder no matter what slide is active","fr":"emplacement fixe peu importe le slide actif"},"bindings":[{"bind":"step","type":"number | string | undefined","desc":{"en":"active step","fr":"l'élément actif"}},{"bind":"stepIndex","type":"number","desc":{"en":"active step index","fr":"l'index de l'élément actif"}}]},{"name":"default","desc":{"en":"the content of the carousel (use o-carousel-item component)","fr":"contenu du carousel (utilisez le composant o-carousel-item)"},"bindings":[{"bind":"step","type":"number | string | undefined","desc":{"en":"active step","fr":"l'élément actif"}},{"bind":"stepIndex","type":"number","desc":{"en":"active step index","fr":"l'index de l'élément actif"}},{"bind":"goPreviousStep","type":"() => void","desc":{"en":"function to display previous step","fr":"fonction pour afficher l'élément précédent"}},{"bind":"goNextStep","type":"() => void","desc":{"en":"function to display next step","fr":"fonction pour afficher l'élément suivant"}}]},{"name":"navigation","desc":{"en":"the content of the carousel (use o-carousel-item component)","fr":"contenu du carousel (utilisez le composant o-carousel-item)"},"bindings":[{"bind":"step","type":"number | string | undefined","desc":{"en":"active step","fr":"l'élément actif"}},{"bind":"stepIndex","type":"number","desc":{"en":"active step index","fr":"l'index de l'élément actif"}},{"bind":"goPreviousStep","type":"() => void","desc":{"en":"function to display previous step","fr":"fonction pour afficher l'élément précédent"}},{"bind":"goNextStep","type":"() => void","desc":{"en":"function to display next step","fr":"fonction pour afficher l'élément suivant"}}]},{"name":"actions","desc":{"en":"display additional actions for the carousel","fr":"affiche des actions supplémentaires pour le carrousel"},"bindings":[{"bind":"step","type":"number | string | undefined","desc":{"en":"active step","fr":"l'élément actif"}},{"bind":"stepIndex","type":"number","desc":{"en":"active step index","fr":"l'index de l'élément actif"}},{"bind":"goPreviousStep","type":"() => void","desc":{"en":"function to display previous step","fr":"fonction pour afficher l'élément précédent"}},{"bind":"goNextStep","type":"() => void","desc":{"en":"function to display next step","fr":"fonction pour afficher l'élément suivant"}},{"bind":"goToStep","type":"(step: { name: number | string }) => void","desc":{"en":"function to activate specific step","fr":"fonction pour afficher un élément spécifique"}},{"bind":"goToStepIndex","type":"(index: number) => void","desc":{"en":"function to display step at specific index","fr":"fonction pour afficher un élément à l'index spécifié"}}]}],
			props: [],
			publicInstance: [{"name":"step","type":"() => Undef<string | number>"},{"name":"stepsLength","type":"() => number"},{"name":"stepIndex","type":"() => number"},{"name":"shouldLoop","type":"() => boolean"},{"name":"goToStep","type":"(step: {\n\tname: string | number;\n\tuid: number;\n}) => void"},{"name":"goToStepIndex","type":"(index: number) => void"},{"name":"goPreviousStep","type":"() => void"},{"name":"goNextStep","type":"() => void"},{"name":"_el","type":"(() => HTMLElement | undefined) | undefined"}],
		},
	],
	[
		'CarouselItem',
		{
			localTypes: {},
			events: [],
			provide: [],
			slots: [{"name":"default","desc":{"en":"the content of the item","fr":"contenu de l'élément"},"bindings":[{"bind":"isActive","type":"boolean","desc":{"en":"item is active","fr":"l'élément est actif"}}]}],
			props: [],
			publicInstance: undefined,
		},
	],
	[
		'Chat',
		{
			localTypes: {},
			events: [],
			provide: [],
			slots: [{"name":"discussion-title","desc":{"en":"title of the discussion","fr":"titre de la discussion"},"bindings":[{"bind":"discussion","type":"OrionChatEntity","desc":{"en":"Instance of the discussion entity","fr":"Instance de l'entité `discussion`"}}]},{"name":"prepend-discussion-actions","desc":{"en":"left part of the action's content","fr":"partie située avant les actions"},"bindings":[{"bind":"discussion","type":"OrionChatEntity","desc":{"en":"Instance of the discussion entity","fr":"Instance de l'entité `discussion`"}},{"bind":"showSearch","type":"boolean","desc":{"en":"`true` if the search field is displayed","fr":"`true` si le champ de recherche est affiché"}}]},{"name":"append-discussion-actions","desc":{"en":"right part of the action's content","fr":"partie située à droite des actions"},"bindings":[{"bind":"discussion","type":"OrionChatEntity","desc":{"en":"Instance of the discussion entity","fr":"Instance de l'entité `discussion`"}}]}],
			props: [],
			publicInstance: [{"name":"checkUnreadMessagesInDom","type":"() => Promise<void>"},{"name":"getDiscussionId","type":"() => number | undefined"},{"name":"_el","type":"(() => HTMLElement | undefined) | undefined"}],
		},
	],
	[
		'ChatDiscussionList',
		{
			localTypes: {},
			events: [],
			provide: [],
			slots: [{"name":"append-discussion-list-header","desc":{"en":"the bottom content of the list header","fr":"contenu situé en bas de l'en-tête de la liste"},"bindings":[]},{"name":"before-discussion-list","desc":{"en":"the content before all the discussion items","fr":"contenu placé juste avant la liste de discussions"},"bindings":[]},{"name":"discussion-item","desc":{"en":"the content of the discussion item","fr":"contenu d'un élément de la liste"},"bindings":[{"bind":"discussion","type":"OrionChatEntity","desc":{"en":"the discussion's instance","fr":"l'instance de la discussion"}}]},{"name":"append-discussion-item","desc":{"en":"the content under the discussion item","fr":"contenu situé juste après un élément de la liste"},"bindings":[]}],
			props: [],
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
			props: [],
			publicInstance: undefined,
		},
	],
	[
		'Checkbox',
		{
			localTypes: {},
			events: [],
			provide: [],
			slots: [{"name":"default","desc":{"en":"content of the checkbox to replace the default label.","fr":"Missing @doc"},"bindings":[]}],
			props: [],
			publicInstance: [{"name":"hasBeenFocus","type":"() => boolean"},{"name":"isFocus","type":"() => boolean"},{"name":"focus","type":"() => void"},{"name":"blur","type":"Lodash.debounce"},{"name":"clear","type":"() => void"},{"name":"setHasBeenFocus","type":"(value: boolean) => void"},{"name":"isValid","type":"() => boolean"},{"name":"_input","type":"() => HTMLInputElement | undefined"},{"name":"sharedState","type":"() => {\n\thasBeenFocus: boolean;\n\tisFocus: boolean;\n\tisAutoFilled: boolean;\n}"}],
		},
	],
	[
		'Chips',
		{
			localTypes: {},
			events: [],
			provide: [],
			slots: [{"name":"default","desc":{"en":"The content of the chips","fr":"Contenu de la chips"},"bindings":[]},{"name":"dual","desc":{"en":"The content of the second half of the chips","fr":"Contenu de la seconde partie de la chips"},"bindings":[]}],
			props: [],
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
			props: [],
			publicInstance: [{"name":"hasBeenFocus","type":"() => boolean"},{"name":"isFocus","type":"() => boolean"},{"name":"focus","type":"() => void"},{"name":"blur","type":"Lodash.debounce"},{"name":"clear","type":"() => void"},{"name":"setHasBeenFocus","type":"(value: boolean) => void"},{"name":"isValid","type":"() => boolean"},{"name":"_input","type":"() => HTMLInputElement | undefined"},{"name":"sharedState","type":"() => {\n\thasBeenFocus: boolean;\n\tisFocus: boolean;\n\tisAutoFilled: boolean;\n}"}],
		},
	],
	[
		'Cropper',
		{
			localTypes: {},
			events: [],
			provide: [],
			slots: [],
			props: [],
			publicInstance: [{"name":"crop","type":"() => Promise<File>"},{"name":"_el","type":"(() => HTMLElement | undefined) | undefined"}],
		},
	],
	[
		'DailyCalendar',
		{
			localTypes: {},
			events: [],
			provide: [],
			slots: [],
			props: [],
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
			props: [],
			publicInstance: [{"name":"getCurrentDate","type":"() => Date"},{"name":"getCurrentMonth","type":"() => number"},{"name":"getCurrentYear","type":"() => number"},{"name":"selectMonth","type":"(month: number) => void"},{"name":"selectYear","type":"(year: number) => void"},{"name":"_el","type":"(() => HTMLElement | undefined) | undefined"}],
		},
	],
	[
		'Datepicker',
		{
			localTypes: {},
			events: [],
			provide: [],
			slots: [{"name":"multipleDisplay","desc":{"en":"if type is `multiple`, the content inside the input","fr":"si le type est `multiple`, il s'agit du contenu de l'input"},"bindings":[{"bind":"datas","type":"Date[]","desc":{"en":"the selected dates","fr":"Missing @doc"}},{"bind":"close","type":"(date: Date) => void","desc":{"en":"remove the date","fr":"retire la date"}}]},{"name":"popper","desc":{"en":"Missing @doc","fr":"Missing @doc"},"bindings":[]}],
			props: [],
			publicInstance: [{"name":"hasBeenFocus","type":"() => boolean"},{"name":"isFocus","type":"() => boolean"},{"name":"focus","type":"() => void"},{"name":"blur","type":"Lodash.debounce"},{"name":"clear","type":"() => void"},{"name":"setHasBeenFocus","type":"(value: boolean) => void"},{"name":"isValid","type":"() => boolean"},{"name":"_input","type":"() => HTMLInputElement | undefined"},{"name":"sharedState","type":"() => {\n\thasBeenFocus: boolean;\n\tisFocus: boolean;\n\tisAutoFilled: boolean;\n}"}],
		},
	],
	[
		'Draggable',
		{
			localTypes: {},
			events: [],
			provide: [],
			slots: [{"name":"default","desc":{"en":"the content of the draggable component","fr":"contenu de l'élément"},"bindings":[]}],
			props: [],
			publicInstance: undefined,
		},
	],
	[
		'Droppable',
		{
			localTypes: {},
			events: [],
			provide: [{"name":"_droppable","data":"publicInstance"}],
			slots: [{"name":"default","desc":{"en":"The content of the component","fr":"Contenu du composant"},"bindings":[]}],
			props: [],
			publicInstance: [{"name":"uid","type":"number"},{"name":"_el","type":"(() => HTMLElement | undefined) | undefined"}],
		},
	],
	[
		'Editor',
		{
			localTypes: {},
			events: [],
			provide: [],
			slots: [],
			props: [],
			publicInstance: [{"name":"hasBeenFocus","type":"() => boolean"},{"name":"isFocus","type":"() => boolean"},{"name":"focus","type":"() => void"},{"name":"blur","type":"Lodash.debounce"},{"name":"clear","type":"() => void"},{"name":"setHasBeenFocus","type":"(value: boolean) => void"},{"name":"isValid","type":"() => boolean"},{"name":"_input","type":"() => HTMLInputElement | undefined"},{"name":"sharedState","type":"() => {\n\thasBeenFocus: boolean;\n\tisFocus: boolean;\n\tisAutoFilled: boolean;\n}"}],
		},
	],
	[
		'FooterFixed',
		{
			localTypes: {},
			events: [],
			provide: [],
			slots: [{"name":"default","desc":{"en":"the content of the footer","fr":"contenu du pied de page"},"bindings":[]}],
			props: [],
			publicInstance: undefined,
		},
	],
	[
		'HorizontalScroll',
		{
			localTypes: {},
			events: [],
			provide: [],
			slots: [{"name":"default","desc":{"en":"The content of the scroll","fr":"Contenu du composant"},"bindings":[]}],
			props: [],
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
			props: [],
			publicInstance: undefined,
		},
	],
	[
		'IconSection',
		{
			localTypes: {},
			events: [],
			provide: [],
			slots: [{"name":"default","desc":{"en":"the content of the description","fr":"contenu de la description"},"bindings":[]}],
			props: [],
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
			props: [],
			publicInstance: [{"name":"hasBeenFocus","type":"() => boolean"},{"name":"isFocus","type":"() => boolean"},{"name":"focus","type":"() => void"},{"name":"blur","type":"Lodash.debounce"},{"name":"clear","type":"() => void"},{"name":"setHasBeenFocus","type":"(value: boolean) => void"},{"name":"isValid","type":"() => boolean"},{"name":"_input","type":"() => HTMLInputElement | undefined"},{"name":"sharedState","type":"() => {\n\thasBeenFocus: boolean;\n\tisFocus: boolean;\n\tisAutoFilled: boolean;\n}"}],
		},
	],
	[
		'InputRange',
		{
			localTypes: {},
			events: [],
			provide: [],
			slots: [],
			props: [],
			publicInstance: [{"name":"hasBeenFocus","type":"() => boolean"},{"name":"isFocus","type":"() => boolean"},{"name":"focus","type":"() => void"},{"name":"blur","type":"Lodash.debounce"},{"name":"clear","type":"() => void"},{"name":"setHasBeenFocus","type":"(value: boolean) => void"},{"name":"isValid","type":"() => boolean"},{"name":"_input","type":"() => HTMLInputElement | undefined"},{"name":"sharedState","type":"() => {\n\thasBeenFocus: boolean;\n\tisFocus: boolean;\n\tisAutoFilled: boolean;\n}"}],
		},
	],
	[
		'Label',
		{
			localTypes: {},
			events: [],
			provide: [],
			slots: [{"name":"default","desc":{"en":"the content of the label","fr":"contenu du label"},"bindings":[]}],
			props: [],
			publicInstance: undefined,
		},
	],
	[
		'Layout',
		{
			localTypes: {},
			events: [],
			provide: [],
			slots: [{"name":"nav-main-item-prepend","desc":{"en":"displays content before the main navigation","fr":"affiche du contenu avant la navigation principale"},"bindings":[]},{"name":"nav-main-item-append","desc":{"en":"displays content after the main navigation","fr":"affiche du contenu après la navigation principale"},"bindings":[]},{"name":"nav-top-left","desc":{"en":"displays content on the left part of the top navigation","fr":"affiche du contenu à gauche de la navitation du haut"},"bindings":[]},{"name":"nav-top-additional","desc":{"en":"displays additional content in the top navigation","fr":"affiche du contenu additionnel dans la navitation du haut"},"bindings":[]},{"name":"nav-top-right","desc":{"en":"displays content on the right part of the top navigation","fr":"affiche du contenu à droite de la navitation du haut"},"bindings":[]},{"name":"default","desc":{"en":"displays the main content of your application","fr":"affiche le contenu principal de votre application"},"bindings":[]},{"name":"footer","desc":{"en":"displays the footer content of your application","fr":"affiche le contenu du pied de page de votre application"},"bindings":[]}],
			props: [],
			publicInstance: undefined,
		},
	],
	[
		'List',
		{
			localTypes: {},
			events: [],
			provide: [],
			slots: [{"name":"default","desc":{"en":"content of each item of the list","fr":"le contenu de chaque élément de la liste"},"bindings":[]},{"name":"default","desc":{"en":"content of each item of the list","fr":"le contenu de chaque élément de la liste"},"bindings":[]},{"name":"footer-selected-actions","desc":{"en":"actions displayed in the selection footer","fr":"actions affichées dans le footer de sélection"},"bindings":[]}],
			props: [],
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
			props: [],
			publicInstance: [{"name":"show","type":"(newText?: string | undefined) => void"},{"name":"hide","type":"() => void"},{"name":"_el","type":"(() => HTMLElement | undefined) | undefined"}],
		},
	],
	[
		'Modal',
		{
			localTypes: {},
			events: [],
			provide: [{"name":"_modal","data":"publicInstance"}],
			slots: [{"name":"footer","desc":{"en":"the content on the bottom, useful for actions","fr":"contenu en bas, pratique pour les actions"},"bindings":[{"bind":"close","type":"() => void","desc":{"en":"to close the modal","fr":"fonction pour fermer la modal"}}]},{"name":"default","desc":{"en":"the content of the modal","fr":"contenu de la modal"},"bindings":[{"bind":"close","type":"() => void","desc":{"en":"to close the modal","fr":"fonction pour fermer la modal"}}]}],
			props: [],
			publicInstance: [{"name":"slotFooter","type":"string"},{"name":"_loader","type":"() => OrionLoader"},{"name":"uid","type":"number"},{"name":"bus","type":"Bus"},{"name":"state","type":"{\n\tisClosing: boolean;\n\tisOpening: boolean;\n\tisMounted: boolean;\n\tvisible: boolean;\n}"},{"name":"options","type":"Orion.Popable.Options"},{"name":"open","type":"(keepInQueue?: boolean) => Promise<void>"},{"name":"close","type":"(options?: Orion.Popable.CloseOptions | undefined) => Promise<void>"},{"name":"trigger","type":"(eventName: string, params?: any) => void"},{"name":"animateAsync","type":"(enter: boolean) => Promise<void>"},{"name":"removeProgrammatic","type":"() => void"},{"name":"isLastOpenedPopable","type":"() => boolean"},{"name":"_el","type":"(() => HTMLElement | undefined) | undefined"}],
		},
	],
	[
		'Notif',
		{
			localTypes: {},
			events: [],
			provide: [{"name":"_notif","data":"publicInstance"}],
			slots: [],
			props: [],
			publicInstance: [{"name":"resetTimer","type":"() => void"},{"name":"_loader","type":"() => OrionLoader"},{"name":"uid","type":"number"},{"name":"bus","type":"Bus"},{"name":"state","type":"{\n\tisClosing: boolean;\n\tisOpening: boolean;\n\tisMounted: boolean;\n\tvisible: boolean;\n}"},{"name":"options","type":"Orion.Popable.Options"},{"name":"open","type":"(keepInQueue?: boolean) => Promise<void>"},{"name":"close","type":"(options?: Orion.Popable.CloseOptions | undefined) => Promise<void>"},{"name":"trigger","type":"(eventName: string, params?: any) => void"},{"name":"animateAsync","type":"(enter: boolean) => Promise<void>"},{"name":"removeProgrammatic","type":"() => void"},{"name":"isLastOpenedPopable","type":"() => boolean"},{"name":"_el","type":"(() => HTMLElement | undefined) | undefined"}],
		},
	],
	[
		'Otp',
		{
			localTypes: {},
			events: [],
			provide: [],
			slots: [],
			props: [],
			publicInstance: [{"name":"reset","type":"() => void"},{"name":"focus","type":"() => void"},{"name":"code","type":"() => Code"},{"name":"readableCode","type":"() => string"},{"name":"_el","type":"(() => HTMLElement | undefined) | undefined"}],
		},
	],
	[
		'Overlay',
		{
			localTypes: {},
			events: [],
			provide: [],
			slots: [],
			props: [],
			publicInstance: [{"name":"show","type":"() => void"},{"name":"hide","type":"() => void"},{"name":"_el","type":"(() => HTMLElement | undefined) | undefined"}],
		},
	],
	[
		'Page',
		{
			localTypes: {},
			events: [],
			provide: [],
			slots: [{"name":"actions","desc":{"en":"actions of the page, on the top right","fr":"actions de la page, situées en haut à droite"},"bindings":[]},{"name":"subactions","desc":{"en":"secondary actions, below the main actions","fr":"actions secondaires, placées en dessous des actions principales"},"bindings":[]},{"name":"default","desc":{"en":"the content of the page","fr":"contenu de la page"},"bindings":[]}],
			props: [],
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
			props: [],
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
			props: [],
			publicInstance: [{"name":"hasBeenFocus","type":"() => boolean"},{"name":"isFocus","type":"() => boolean"},{"name":"focus","type":"() => void"},{"name":"blur","type":"Lodash.debounce"},{"name":"clear","type":"() => void"},{"name":"setHasBeenFocus","type":"(value: boolean) => void"},{"name":"isValid","type":"() => boolean"},{"name":"_input","type":"() => HTMLInputElement | undefined"},{"name":"sharedState","type":"() => {\n\thasBeenFocus: boolean;\n\tisFocus: boolean;\n\tisAutoFilled: boolean;\n}"}],
		},
	],
	[
		'Phone',
		{
			localTypes: {},
			events: [],
			provide: [],
			slots: [],
			props: [],
			publicInstance: [{"name":"_country","type":"() => {\n\tgetSearchTerm: () => string | undefined;\n\tsetSearchTerm: (val?: string | undefined) => string | undefined;\n\ttriggerSearchAsync: (term?: string | undefined) => Promise<void>;\n\thasBeenFocus: () => boolean;\n\tisFocus: () => boolean;\n\tfocus: () => void;\n\tblur: import(\"lodash\").DebouncedFuncLeading<() => void>;\n\tclear: () => void;\n\tsetHasBeenFocus: (value: boolean) => void;\n\tisValid: () => boolean;\n\t_input: () => HTMLInputElement | undefined;\n\tsharedState: () => {\n\t\thasBeenFocus: boolean;\n\t\tisFocus: boolean;\n\t\tisAutoFilled: boolean;\n\t};\n} | undefined"},{"name":"_orionInput","type":"() => (HTMLInputElement & {\n\thasBeenFocus: () => boolean;\n\tisFocus: () => boolean;\n\tfocus: () => void;\n\tblur: import(\"lodash\").DebouncedFuncLeading<() => void>;\n\tclear: () => void;\n\tsetHasBeenFocus: (value: boolean) => void;\n\tisValid: () => boolean;\n\t_input: () => HTMLInputElement | undefined;\n\tsharedState: () => {\n\t\thasBeenFocus: boolean;\n\t\tisFocus: boolean;\n\t\tisAutoFilled: boolean;\n\t};\n}) | undefined"},{"name":"hasBeenFocus","type":"() => boolean"},{"name":"isFocus","type":"() => boolean"},{"name":"focus","type":"() => void"},{"name":"blur","type":"Lodash.debounce"},{"name":"clear","type":"() => void"},{"name":"setHasBeenFocus","type":"(value: boolean) => void"},{"name":"isValid","type":"() => boolean"},{"name":"_input","type":"() => HTMLInputElement | undefined"},{"name":"sharedState","type":"() => {\n\thasBeenFocus: boolean;\n\tisFocus: boolean;\n\tisAutoFilled: boolean;\n}"}],
		},
	],
	[
		'PopConfirm',
		{
			localTypes: {},
			events: [],
			provide: [],
			slots: [{"name":"default","desc":{"en":"the element that will trigger the popup","fr":"l'élément qui va déclencher la popup"},"bindings":[]},{"name":"content","desc":{"en":"the title of the popconfirm","fr":"titre de la popup"},"bindings":[]},{"name":"actions","desc":{"en":"actions of the popconfirm","fr":"actions de la popup"},"bindings":[{"bind":"close","type":"function","desc":{"en":"to close the popconfirm","fr":"fonction pour fermer la popup"}},{"bind":"confirm","type":"function","desc":{"en":"to confirm the action","fr":"pour confirmer l'action"}},{"bind":"cancel","type":"function","desc":{"en":"to cancel the action","fr":"pour annuler l'action"}}]}],
			props: [],
			publicInstance: [],
		},
	],
	[
		'ProgressBar',
		{
			localTypes: {},
			events: [],
			provide: [],
			slots: [{"name":"default","desc":{"en":"the label of the progress bar","fr":"le label de la barre de progression"},"bindings":[]}],
			props: [],
			publicInstance: undefined,
		},
	],
	[
		'ProgressCircle',
		{
			localTypes: {},
			events: [],
			provide: [],
			slots: [{"name":"default","desc":{"en":"the label of the progress circle","fr":"le label du cercle"},"bindings":[]}],
			props: [],
			publicInstance: undefined,
		},
	],
	[
		'Radio',
		{
			localTypes: {},
			events: [],
			provide: [],
			slots: [{"name":"default","desc":{"en":"content of the radio to replace the default label.","fr":"contenu pour remplacer le label par défaut."},"bindings":[]}],
			props: [],
			publicInstance: [{"name":"hasBeenFocus","type":"() => boolean"},{"name":"isFocus","type":"() => boolean"},{"name":"focus","type":"() => void"},{"name":"blur","type":"Lodash.debounce"},{"name":"clear","type":"() => void"},{"name":"setHasBeenFocus","type":"(value: boolean) => void"},{"name":"isValid","type":"() => boolean"},{"name":"_input","type":"() => HTMLInputElement | undefined"},{"name":"sharedState","type":"() => {\n\thasBeenFocus: boolean;\n\tisFocus: boolean;\n\tisAutoFilled: boolean;\n}"}],
		},
	],
	[
		'Rate',
		{
			localTypes: {},
			events: [],
			provide: [],
			slots: [{"name":"default","desc":{"en":"legend of the rating","fr":"légende de la notation"},"bindings":[{"bind":"rateNumber","type":"number","desc":{"en":"number of total rates ( = prop `numberOfRates`)","fr":"le nombre total d'évaluations ( = prop `numberOfRates`)"}}]}],
			props: [],
			publicInstance: undefined,
		},
	],
	[
		'Section',
		{
			localTypes: {},
			events: [],
			provide: [],
			slots: [{"name":"actions","desc":{"en":"actions of the section","fr":"actions de la section"},"bindings":[]},{"name":"default","desc":{"en":"the content of the section","fr":"contenu de la section"},"bindings":[]}],
			props: [],
			publicInstance: undefined,
		},
	],
	[
		'Select',
		{
			localTypes: {},
			events: [],
			provide: [],
			slots: [{"name":"value","desc":{"en":"The selected value if single select, each value if multiple select","fr":"La valeur sélectionnée s'il s'agit d'un select simple, sinon chaque valeur s'il s'agit d'un select multiple"},"bindings":[{"bind":"item","type":"any","desc":{"en":"The selected item, typed any to avoid linter errors","fr":"l'élément sélectionné, typé `any` pour éviter des erreur du linter"}},{"bind":"display","type":"any","desc":{"en":"The selected item display value (display-key)","fr":"La valeur d’affichage de l’élément sélectionné (display-key)"}}]},{"name":"value","desc":{"en":"The selected value if single select, each value if multiple select","fr":"La valeur sélectionnée s'il s'agit d'un select simple, sinon chaque valeur s'il s'agit d'un select multiple"},"bindings":[{"bind":"item","type":"any","desc":{"en":"The selected item, typed any to avoid linter errors","fr":"l'élément sélectionné, typé `any` pour éviter des erreur du linter"}},{"bind":"display","type":"any","desc":{"en":"The selected item display value (display-key)","fr":"La valeur d’affichage de l’élément sélectionné (display-key)"}}]},{"name":"multiple-value","desc":{"en":"The content of the select if the props multiple is set","fr":"Contenu du select si la props multiple est définie"},"bindings":[{"bind":"value","type":"BaseVModelType[]","desc":{"en":"value of the vModel","fr":"valeur du vModel"}}]},{"name":"before-options","desc":{"en":"Content before the select options in the popover","fr":"Contenu de la tooltip avant la liste des options"},"bindings":[{"bind":"options","type":"BaseVModelType[]","desc":{"en":"Options available in the dropdown list","fr":"Options disponibles dans la liste déroulante"}}]},{"name":"option","desc":{"en":"Content of each option in the dropdown list","fr":"Contenu de chaque option dans la liste déroulante"},"bindings":[{"bind":"item","type":"any","desc":{"en":"The option item, typed any to avoid linter errors","fr":"Missing @doc"}},{"bind":"index","type":"number","desc":{"en":"The option's index in dropdown list","fr":"L'index de l'option dans la liste déroulante"}},{"bind":"marked-search","type":"(content: string) => string","desc":{"en":"Function to highlight search term in options list","fr":"Fonction permettant de mettre en surbrillance le terme recherché dans les options"}}]},{"name":"after-options","desc":{"en":"Content after the select options in the popover","fr":"Contenu de la popover situé après la liste des options"},"bindings":[{"bind":"options","type":"BaseVModelType[]","desc":{"en":"Options available in the dropdown list","fr":"Options disponibles dans la liste déroulante"}}]}],
			props: [],
			publicInstance: [{"name":"getSearchTerm","type":"() => string | undefined"},{"name":"setSearchTerm","type":"(val?: string) => string | undefined"},{"name":"triggerSearchAsync","type":"(term?: string) => Promise<void>"},{"name":"hasBeenFocus","type":"() => boolean"},{"name":"isFocus","type":"() => boolean"},{"name":"focus","type":"() => void"},{"name":"blur","type":"Lodash.debounce"},{"name":"clear","type":"() => void"},{"name":"setHasBeenFocus","type":"(value: boolean) => void"},{"name":"isValid","type":"() => boolean"},{"name":"_input","type":"() => HTMLInputElement | undefined"},{"name":"sharedState","type":"() => {\n\thasBeenFocus: boolean;\n\tisFocus: boolean;\n\tisAutoFilled: boolean;\n}"}],
		},
	],
	[
		'Sticker',
		{
			localTypes: {},
			events: [],
			provide: [],
			slots: [{"name":"thumbnail","desc":{"en":"sticker's thumbnail content on the left of the sticker","fr":"contenu de la vignette à gauche du sticker"},"bindings":[]},{"name":"default","desc":{"en":"sticker's content","fr":"contenu du sticker"},"bindings":[]},{"name":"actions","desc":{"en":"sticker's actions","fr":"actions du sticker"},"bindings":[]}],
			props: [],
			publicInstance: undefined,
		},
	],
	[
		'Swipe',
		{
			localTypes: {},
			events: [],
			provide: [],
			slots: [{"name":"actions","desc":{"en":"actions of the swipe","fr":"actions du swipe"},"bindings":[]},{"name":"default","desc":{"en":"content of the swipe","fr":"contenu du swipe"},"bindings":[]}],
			props: [],
			publicInstance: undefined,
		},
	],
	[
		'TabPane',
		{
			localTypes: {},
			events: [],
			provide: [],
			slots: [{"name":"default","desc":{"en":"the content of the pane","fr":"contenu de l'onglet"},"bindings":[]}],
			props: [],
			publicInstance: [{"name":"disabled","type":"boolean"},{"name":"name","type":"string | undefined"},{"name":"_el","type":"(() => HTMLElement | undefined) | undefined"}],
		},
	],
	[
		'Tabs',
		{
			localTypes: {},
			events: [],
			provide: [{"name":"_tabs","data":"publicInstance"}],
			slots: [],
			props: [],
			publicInstance: [{"name":"_loader","type":"() => OrionLoader"},{"name":"panes","type":"Private.TsxTabPane[]"},{"name":"getValue","type":"() => string | undefined"},{"name":"useRouter","type":"boolean"},{"name":"_el","type":"(() => HTMLElement | undefined) | undefined"}],
		},
	],
	[
		'Textarea',
		{
			localTypes: {},
			events: [],
			provide: [],
			slots: [],
			props: [],
			publicInstance: [{"name":"hasBeenFocus","type":"() => boolean"},{"name":"isFocus","type":"() => boolean"},{"name":"focus","type":"() => void"},{"name":"blur","type":"Lodash.debounce"},{"name":"clear","type":"() => void"},{"name":"setHasBeenFocus","type":"(value: boolean) => void"},{"name":"isValid","type":"() => boolean"},{"name":"_input","type":"() => HTMLInputElement | undefined"},{"name":"sharedState","type":"() => {\n\thasBeenFocus: boolean;\n\tisFocus: boolean;\n\tisAutoFilled: boolean;\n}"}],
		},
	],
	[
		'Timeline',
		{
			localTypes: {},
			events: [],
			provide: [{"name":"_timeline","data":"publicInstance"}],
			slots: [],
			props: [],
			publicInstance: [{"name":"_loader","type":"() => OrionLoader"},{"name":"panes","type":"Private.TsxTimelinePane[]"},{"name":"getValue","type":"() => Undef<string | number>"},{"name":"getCurrent","type":"() => Undef<string | number>"},{"name":"setCurrent","type":"(name?: string | number | undefined) => void"},{"name":"_el","type":"(() => HTMLElement | undefined) | undefined"}],
		},
	],
	[
		'TimelinePane',
		{
			localTypes: {},
			events: [],
			provide: [],
			slots: [{"name":"default","desc":{"en":"the content of the timeline pane","fr":"contenu du panneau"},"bindings":[]}],
			props: [],
			publicInstance: [{"name":"disabled","type":"boolean"},{"name":"name","type":"string | number | undefined"},{"name":"_el","type":"(() => HTMLElement | undefined) | undefined"}],
		},
	],
	[
		'Toggle',
		{
			localTypes: {},
			events: [],
			provide: [],
			slots: [{"name":"default","desc":{"en":"content of the toggle to replace the default label.","fr":"contenu pour remplacer le label par défaut."},"bindings":[]}],
			props: [],
			publicInstance: [{"name":"hasBeenFocus","type":"() => boolean"},{"name":"isFocus","type":"() => boolean"},{"name":"focus","type":"() => void"},{"name":"blur","type":"Lodash.debounce"},{"name":"clear","type":"() => void"},{"name":"setHasBeenFocus","type":"(value: boolean) => void"},{"name":"isValid","type":"() => boolean"},{"name":"_input","type":"() => HTMLInputElement | undefined"},{"name":"sharedState","type":"() => {\n\thasBeenFocus: boolean;\n\tisFocus: boolean;\n\tisAutoFilled: boolean;\n}"}],
		},
	],
	[
		'Tour',
		{
			localTypes: {},
			events: [],
			provide: [{"name":"_tour","data":"publicInstance"}],
			slots: [],
			props: [],
			publicInstance: [{"name":"steps","type":"{\n\tprops: OrionTourStep.Props;\n}[]"},{"name":"getCurrentIndex","type":"() => number"},{"name":"setCurrent","type":"(val: number) => void"},{"name":"setCurrentStepPublicInstance","type":"(instance: Undef<{\n\tprevious: () => Promise<void>;\n\tnext: () => Promise<void>;\n\tstop: (fromTour?: boolean) => Promise<void>;\n\t_el?: (() => HTMLElement | undefined) | undefined;\n}>) => void"},{"name":"start","type":"(index?: number) => void"},{"name":"stop","type":"() => void"},{"name":"_el","type":"(() => HTMLElement | undefined) | undefined"}],
		},
	],
	[
		'TourStep',
		{
			localTypes: {},
			events: [],
			provide: [],
			slots: [{"name":"default","desc":{"en":"content of the step","fr":"contenu de l'étape"},"bindings":[]},{"name":"actions","desc":{"en":"actions of the step","fr":"actions de l'étape"},"bindings":[{"bind":"next","type":"() => void","desc":{"en":"go to next step","fr":"aller à l'étape suivante"}},{"bind":"previous","type":"() => void","desc":{"en":"go to previous step","fr":"aller à l'étape précédente"}}]}],
			props: [],
			publicInstance: [{"name":"previous","type":"() => Promise<void>"},{"name":"next","type":"() => Promise<void>"},{"name":"stop","type":"(fromTour?: boolean) => Promise<void>"},{"name":"_el","type":"(() => HTMLElement | undefined) | undefined"}],
		},
	],
	[
		'Upload',
		{
			localTypes: {},
			events: [],
			provide: [],
			slots: [{"name":"default","desc":{"en":"the label displayed in the drop area","fr":"contenu pour remplacer le label par défaut"},"bindings":[]}],
			props: [],
			publicInstance: [{"name":"hasBeenFocus","type":"() => boolean"},{"name":"isFocus","type":"() => boolean"},{"name":"focus","type":"() => void"},{"name":"blur","type":"Lodash.debounce"},{"name":"clear","type":"() => void"},{"name":"setHasBeenFocus","type":"(value: boolean) => void"},{"name":"isValid","type":"() => boolean"},{"name":"_input","type":"() => HTMLInputElement | undefined"},{"name":"sharedState","type":"() => {\n\thasBeenFocus: boolean;\n\tisFocus: boolean;\n\tisAutoFilled: boolean;\n}"}],
		},
	],
]);

export default packagesDocData;
