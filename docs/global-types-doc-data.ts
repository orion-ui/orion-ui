/* eslint-disable max-len */

/**
 * Auto generated file using cli command
 * _> node cli.cjs doc
 * Manual changes will be overwritten
 */

const globalTypesDocData = {

	'global': [{
		'ns': 'global',
		'type': 'Nullable',
		'generic': 'T',
		'description': 'T | null; \n',
	}, {
		'ns': 'global',
		'type': 'Undef',
		'generic': 'T',
		'description': 'T | undefined; \n',
	}, {
		'ns': 'global',
		'type': 'Nil',
		'generic': 'T',
		'description': 'T | undefined | null; \n',
	}, {
		'ns': 'global',
		'type': 'RefDom',
		'generic': 'T = HTMLElement',
		'description': 'undefined | HTMLElement & T; \n',
	}, {
		'ns': 'global',
		'type': 'SetupProps',
		'generic': 'T',
		'description': 'Readonly<import(\'vue\').ExtractPropTypes<T>> \n',
	}, {
		'ns': 'global',
		'type': 'OrionValidator',
		'generic': 'T extends Record<string, any>',
		'description': 'ReturnType<typeof useValidation<T, ValidationArrayType<T>>>; \n',
	}, {
		'ns': 'global',
		'type': 'OrionValidatorRule',
		'generic': '',
		'description': 'ReturnType<ReturnType<typeof useValidation>[\'rule\']>; \n',
	}, {
		'ns': 'global',
		'type': 'OrionValidatorMessages',
		'generic': '',
		'description': 'Partial<{ \n\t\t[key in keyof ReturnType<typeof useValidation>[\'rulesRegistry\']]: string; \n\t}> \n \n\ttype AsideAnimationHookType = \n\t| \'asideEnterBefore\' \n\t| \'asideEnterStart\' \n\t| \'asideEnterEnd\' \n\t| \'asideLeaveBefore\' \n\t| \'asideLeaveStart\' \n\t| \'asideLeaveEnd\' \n\t; \n \n\ttype ModalAnimationHookType = \n\t| \'modalEnterBefore\' \n\t| \'modalEnterStart\' \n\t| \'modalEnterEnd\' \n\t| \'modalLeaveBefore\' \n\t| \'modalLeaveStart\' \n\t| \'modalLeaveEnd\' \n\t; \n \n\ttype NotifAnimationHookType = \n\t| \'notifEnterBefore\' \n\t| \'notifEnterStart\' \n\t| \'notifEnterEnd\' \n\t| \'notifLeaveBefore\' \n\t| \'notifLeaveStart\' \n\t| \'notifLeaveEnd\' \n\t; \n',
	}],

	'Orion': [{
		'ns': 'Orion',
		'type': 'AppServiceConfig',
		'generic': '',
		'description': '{ \n\t\t\tprefix: string; \n\t\t\tuse: (\'components\' | \'monkeyPatching\')[]; \n\t\t\tlang: keyof typeof import(\'../lang\')[\'default\']; \n\t\t\trouter: Router; \n\t\t\tpopableAnimationHooks: \n\t\t\t\t& Record<AsideAnimationHookType, (instance?: OrionAside) => Promise<void>> \n\t\t\t\t& Record<ModalAnimationHookType, (instance?: OrionModal) => Promise<void>> \n\t\t\t\t& Record<NotifAnimationHookType, (instance?: OrionNotif) => Promise<void>> \n\t\t} \n',
	}, {
		'ns': 'Orion',
		'type': 'Config',
		'generic': '',
		'description': 'Partial<AppServiceConfig> \n',
	}, {
		'ns': 'Orion',
		'type': 'Icon',
		'generic': '',
		'description': 'typeof coolicons[number]; \n',
	}, {
		'ns': 'Orion',
		'type': 'Theme',
		'generic': '',
		'description': '\'dark\' | \'light\' | \'auto\'; \n',
	}, {
		'ns': 'Orion',
		'type': 'Size',
		'generic': '',
		'description': '\'xs\' | \'sm\' | \'md\' | \'lg\' | \'xl\'; \n',
	}, {
		'ns': 'Orion',
		'type': 'Color',
		'generic': '',
		'description': '\'brand\' | \'default\' | \'info\' | \'success\' | \'warning\' | \'danger\' | \'inverse\' | \'pink\'; \n',
	}, {
		'ns': 'Orion',
		'type': 'ColorAlt',
		'generic': '',
		'description': '\'brand-alt\' | \'info-alt\' | \'success-alt\' | \'warning-alt\' | \'danger-alt\' | \'pink-alt\'; \n',
	}, {
		'ns': 'Orion',
		'type': 'ColorExtended',
		'generic': '',
		'description': 'Color | ColorAlt; \n',
	}, {
		'ns': 'Orion',
		'type': 'ColorExtendedAndGreys',
		'generic': '',
		'description': 'Color | ColorAlt | Grey; \n',
	}, {
		'ns': 'Orion',
		'type': 'Grey',
		'generic': '',
		'description': '\'grey-darker\' | \'grey-dark\' | \'grey\' | \'grey-light\' |\'grey-lighter\'; \n',
	}, {
		'ns': 'Orion',
		'type': 'DatepickerType',
		'generic': '',
		'description': '\'date\' | \'range\' | \'week\'; \n',
	}, {
		'ns': 'Orion',
		'type': 'Phone',
		'generic': '',
		'description': '{ \n\t\t\tphoneNumber?: Nil<string>; \n\t\t\tphoneCountryCode?: Nil<Orion.Country[\'code\']>; \n\t\t} \n',
	}, {
		'ns': 'Orion',
		'type': 'DateRange',
		'generic': '',
		'description': '{ \n\t\t\tstart?: Date; \n\t\t\tend?: Date; \n\t\t\tweekNumber?: number; \n\t\t\tyear?: number; \n\t\t\tselecting?: boolean; \n\t\t} \n',
	}, {
		'ns': 'Orion',
		'type': 'DailyCalendarTask',
		'generic': '',
		'description': '{ \n\t\t\tid: number; \n\t\t\tstart: Date; \n\t\t\tend: Date; \n\t\t\ttitle: string; \n\t\t\tcolor: Orion.Color; \n\t\t\tcolumn?: number; \n\t\t\tcallback?: (task: DailyCalendarTask) => void; \n\t\t} \n',
	}, {
		'ns': 'Orion',
		'type': 'DndData',
		'generic': '',
		'description': '{ \n\t\t\tdata: Object & { __uid: number }; \n\t\t\tfrom: number; \n\t\t\tto: Nullable<number>; \n\t\t\tindex: Nullable<number>; \n\t\t\tcanDrop: boolean; \n\t\t\tfromAsideOrModal: Nullable<Number>; \n\t\t} \n',
	}, {
		'ns': 'Orion',
		'type': 'DndValidation',
		'generic': '',
		'description': '{ \n\t\t\tmethod: (payload?: DndData) => boolean; \n\t\t\tnotif: (payload?: any) => void; \n\t\t} \n',
	}, {
		'ns': 'Orion',
		'type': 'Period',
		'generic': '',
		'description': '{ \n\t\t\tisStart: boolean; \n\t\t\tisEnd: boolean; \n\t\t\tstart: Date; \n\t\t\tend: Date; \n\t\t\tlabel: string; \n\t\t\tcolor: Orion.Color; \n\t\t\tcallback?: () => void; \n\t\t\tspecific: { \n\t\t\t\tcolor: Orion.Color \n\t\t\t\tdate: Date; \n\t\t\t\texclude: boolean; \n\t\t\t}[]; \n\t\t} \n',
	}, {
		'ns': 'Orion',
		'type': 'Country',
		'generic': '',
		'description': '{ \n\t\t\tcode: Uppercase<`${Private.Letter}${Private.Letter}`>; \n\t\t\tname: string; \n\t\t\tareaCode: string; \n\t\t} \n',
	}, {
		'ns': 'Orion',
		'type': 'LayoutConfig',
		'generic': '',
		'description': '{ \n\t\t\tnavMain?: OrionNavMain.Props; \n\t\t\tnavTop?: OrionNavTop.Props; \n\t\t\tnavTabs?: OrionNavTabs.Props; \n\t\t} \n',
	}, {
		'ns': 'Orion',
		'type': 'List',
		'generic': 'T',
		'description': 'Omit<OrionList.Props, \'list\' | \'selected\'> & { \n\t\t\tlist: T[]; \n\t\t\tselected?: T[]; \n\t\t} \n',
	}, {
		'ns': 'Orion',
		'type': 'ListPage',
		'generic': '',
		'description': '{ \n\t\t\tsize: number; \n\t\t\tindex: number; \n\t\t} \n',
	}, {
		'ns': 'Orion',
		'type': 'NavItem',
		'generic': '',
		'description': 'Partial<{ \n\t\t\talways: boolean; \n\t\t\tbackLabel: string; \n\t\t\tcallback: (item: NavItem, ev: MouseEvent | TouchEvent) => any; \n\t\t\tchildren: NavItem[]; \n\t\t\tclass: string; \n\t\t\texpand: boolean; \n\t\t\tfontIcon: string; \n\t\t\ticon: Orion.Icon; \n\t\t\tid: string; \n\t\t\tif: boolean | (() => boolean); \n\t\t\tlabel: string; \n\t\t\tline: boolean; \n\t\t\tparent: NavItem; \n\t\t\treload: boolean; \n\t\t\treplace: boolean; \n\t\t\troot: boolean; \n\t\t\tsectionTitle: boolean; \n\t\t\tshowCarret: boolean; \n\t\t\ttag: string; \n\t\t\tto: RouteLocationRaw; \n\t\t\twrapperClass: string; \n\t\t\tactiveWhenExact: boolean; \n\t\t}> \n',
	}, {
		'ns': 'Orion',
		'type': 'NavSection',
		'generic': '',
		'description': '{ \n\t\t\tslug: string; \n\t\t\titems: NavItem[]; \n\t\t\tif?: boolean | (() => boolean); \n\t\t} \n',
	}],

	'Orion.Popable': [{
		'ns': 'Orion.Popable',
		'type': 'Name',
		'generic': '',
		'description': '\'OrionAside\' | \'OrionModal\' | \'OrionNotif\'; \n \n\t\t\ttype PublicIntance = \n\t\t\t\t| OrionAsideSetupService[\'publicInstance\'] \n\t\t\t\t| OrionModalSetupService[\'publicInstance\'] \n\t\t\t\t| OrionNotifSetupService[\'publicInstance\'] \n',
	}, {
		'ns': 'Orion.Popable',
		'type': 'Options',
		'generic': '',
		'description': '{ \n\t\t\t\tuid: number; \n\t\t\t\tNested: Component | null; \n\t\t\t\tNestedProps: Record<string, any>; \n\t\t\t\tcustomClass: string; \n\t\t\t\tprogrammatic: boolean; \n\t\t\t\topenauto: boolean; \n\t\t\t\tsize: string; \n\t\t\t\thideClose: boolean; \n\t\t\t\thideOnOverlayClick: boolean; \n\t\t\t\thideOnEsc: boolean; \n\t\t\t\toverlay: boolean; \n\t\t\t\tzIndex: number; \n\t\t\t\tevents?: Record<string, (popable: OrionAside | OrionModal | OrionNotif, params: any) => void>; \n\t\t\t}; \n',
	}, {
		'ns': 'Orion.Popable',
		'type': 'CloseOptions',
		'generic': '',
		'description': '{ \n\t\t\t\tkeepInQueue?: boolean; \n\t\t\t\thandleQueue?: boolean; \n\t\t\t\tflush?: boolean; \n\t\t\t};',
	}],

	'Orion.Aside': [{
		'ns': 'Orion.Aside',
		'type': 'Options',
		'generic': '',
		'description': 'Popable.Options & { \n\t\t\t\tevents?: Record<string, (aside: OrionAside, params: any) => void>; \n\t\t\t}',
	}],

	'Orion.Modal': [{
		'ns': 'Orion.Modal',
		'type': 'Options',
		'generic': '',
		'description': 'Popable.Options & { \n\t\t\t\ttitle: Nil<string>; \n\t\t\t\tmessage: Nil<string>; \n\t\t\t\tevents?: Record<string, (modal: OrionModal, params: any) => void>; \n\t\t\t\tactions?: Partial<ActionsParams>[]; \n\t\t\t\tprompt?: Partial<Prompt>; \n\t\t\t}; \n',
	}, {
		'ns': 'Orion.Modal',
		'type': 'ActionsParams',
		'generic': '',
		'description': 'OrionButton.Props & { \n\t\t\t\tlabel: string; \n\t\t\t\tcallback: (modal: OrionModal, prompt?: Prompt) => void; \n\t\t\t} \n',
	}, {
		'ns': 'Orion.Modal',
		'type': 'PromptType',
		'generic': '',
		'description': '\'input\' | \'textarea\' | \'password\' | \'select\' | \'phone\' | \'upload\' | \'datepicker\'; \n',
	}, {
		'ns': 'Orion.Modal',
		'type': 'Prompt',
		'generic': 'T = any',
		'description': '{ \n\t\t\t\ttype: PromptType; \n\t\t\t\tvalue: Nil<T>; \n\t\t\t\tfieldProps: Partial<OrionField.Props> & Record<string, any>; \n\t\t\t\tconfirm(): void; \n\t\t\t\tcancel(): void; \n\t\t\t} \n',
	}, {
		'ns': 'Orion.Modal',
		'type': 'PromptResolveType',
		'generic': 'T',
		'description': '{ \n\t\t\t\tconfirm: boolean; \n\t\t\t\tvalue: Nil<T>; \n\t\t\t\tmodal: OrionModal; \n\t\t\t}',
	}],

	'Orion.Notif': [{
		'ns': 'Orion.Notif',
		'type': 'Options',
		'generic': '',
		'description': 'Popable.Options & { \n\t\t\t\ttitle: Nil<string>; \n\t\t\t\tmessage: Nil<string>; \n\t\t\t\tduration?: Nil<number>; \n\t\t\t\ticon?: Orion.Icon; \n\t\t\t\tfontIcon?: string; \n\t\t\t\tcolor?: \'info\' | \'success\' | \'warning\' | \'danger\' ; \n\t\t\t\tevents?: Record<string, (notif: OrionNotif, params: any) => void>; \n\t\t\t};',
	}],

	'Orion.Chat': [{
		'ns': 'Orion.Chat',
		'type': 'Config',
		'generic': '',
		'description': '{ \n\t\t\t\tuser: User; \n\t\t\t\tallowMessageStatus: boolean; \n\t\t\t\tallowDiscussionCreation: boolean; \n\t\t\t\tallowDiscussionSearch: boolean; \n\t\t\t\tdiscussionSearchTimer: number; \n\t\t\t\t// eslint-disable-next-line max-len \n\t\t\t\tdiscussionFetcherAsync?: (params: { oldestDiscussionId?: number, oldestDiscussionUpdatedDate?: Date, searchTerm?: string, searchTermHasChanged?: boolean }) => Promise<Discussion[]>; \n\t\t\t\tdiscussionTitleFormatter?: (discussion: OrionChatEntity) => string; \n\t\t\t\tdiscussionInterlocutorsFormatter?: (discussion: OrionChatEntity) => User[]; \n\t\t\t\tdiscussionUnreadMessagesCounter?: (params: {discussion: OrionChatEntity, discussionId: number, messages: OrionChatMessageEntity[] }) => number; \n\t\t\t\tmessageFetcherAsync: (params: { discussion: OrionChatEntity, discussionId: number, oldestMessageId?: number }) => Promise<Message[]>; \n\t\t\t\tonMessageReadAsync: (message: OrionChatMessageEntity) => void; \n\t\t\t\tonNewMessageAsync: (message: OrionChatMessageEntity, registerMessage: () => void) => void; \n\t\t\t\tonActiveDiscussionChange: (discussionId?: number, oldDiscussionId?: number) => void; \n\t\t\t} \n',
	}, {
		'ns': 'Orion.Chat',
		'type': 'Options',
		'generic': '',
		'description': 'Partial<Config> & { \n\t\t\t\tuser: User; \n\t\t\t}; \n',
	}, {
		'ns': 'Orion.Chat',
		'type': 'User',
		'generic': '',
		'description': '{ \n\t\t\t\tid: number; \n\t\t\t\tname: string; \n\t\t\t\tavatar: string; \n\t\t\t\tavatarProps?: Record<string, any>; \n\t\t\t}; \n',
	}, {
		'ns': 'Orion.Chat',
		'type': 'Discussion',
		'generic': '',
		'description': '{ \n\t\t\t\tid: number; \n\t\t\t\tcreatedDate: Date; \n\t\t\t\tupdatedDate?: Date; \n\t\t\t\tparticipants: User[]; \n\t\t\t\tlastMessage?: Message; \n\t\t\t\tmessages: Message[]; \n\t\t\t} \n',
	}, {
		'ns': 'Orion.Chat',
		'type': 'Message',
		'generic': '',
		'description': '{ \n\t\t\t\tdiscussionId: number; \n\t\t\t\tid: number; \n\t\t\t\tcontent?: string; \n\t\t\t\tcreatedDate: Date; \n\t\t\t\tupdatedDate?: Date; \n\t\t\t\tdeletedDate?: Date; \n\t\t\t\ttype?: number | string; \n\t\t\t\tmetaData?: string | Record<string, any>; \n\t\t\t\tauthor: User; \n\t\t\t\tisRead: boolean; \n\t\t\t} \n',
	}, {
		'ns': 'Orion.Chat',
		'type': 'NewMessage',
		'generic': '',
		'description': '{ \n\t\t\t\tmessage: string; \n\t\t\t\tdiscussionId: number; \n\t\t\t}',
	}],

	'Orion.Private': [{
		'ns': 'Orion.Private',
		'type': 'Number',
		'generic': '',
		'description': '0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9; \n',
	}, {
		'ns': 'Orion.Private',
		'type': 'Letter',
		'generic': '',
		'description': '\'a\' | \'b\' | \'c\' | \'d\' | \'e\' | \'f\' | \'g\' | \'h\' | \'i\' \n\t\t\t\t| \'j\' | \'k\' | \'l\' | \'m\' | \'n\' | \'o\' | \'p\' | \'q\' | \'r\' \n\t\t\t\t| \'s\' | \'t\' | \'u\' | \'v\' | \'w\' | \'x\' | \'y\' | \'z\'; \n',
	}, {
		'ns': 'Orion.Private',
		'type': 'TsxTabPane',
		'generic': '',
		'description': '{ \n\t\t\t\tprops: OrionTabPane.Props & { \n\t\t\t\t\t\'font-icon\': string; \n\t\t\t\t\t\'marker-color\': string; \n\t\t\t\t}; \n\t\t\t\tchildren: { \n\t\t\t\t\tdefault: Slot; \n\t\t\t\t\tlabel?: Slot; \n\t\t\t\t}; \n\t\t\t} \n',
	}, {
		'ns': 'Orion.Private',
		'type': 'TsxTimelinePane',
		'generic': '',
		'description': '{ \n\t\t\t\tprops: OrionTimelinePane.Props & { \n\t\t\t\t\t\'font-icon\': string; \n\t\t\t\t\t\'marker-color\': string; \n\t\t\t\t}; \n\t\t\t\tchildren: { \n\t\t\t\t\tdefault: Slot; \n\t\t\t\t\tafter?: Slot; \n\t\t\t\t\tbefore?: Slot; \n\t\t\t\t}; \n\t\t\t} \n',
	}, {
		'ns': 'Orion.Private',
		'type': 'TsxTourStep',
		'generic': '',
		'description': '{ \n\t\t\t\tprops : OrionTourStep.Props \n\t\t\t}',
	}],
};

export default globalTypesDocData;
