/// <reference path="packages.d.ts"/>

import { Component } from 'vue';
import { RouteLocationRaw, Router } from 'vue-router';
import { coolicons } from '../assets/fonts/coolicons';
import OrionChatEntity from '../packages/Chat/src/OrionChatEntity';
import OrionChatMessageEntity from '../packages/ChatMessage/src/OrionChatMessageEntity';
import type { OrionAsideSetupService, OrionListProps, OrionModalSetupService, OrionNotifSetupService } from '../packages';
import useValidation from '../services/ValidationService';
import { Validator as ValidatorClass } from '../utils/Validator';
import { CountryCode } from 'libphonenumber-js';
import { OrionAvatarProps } from 'packages/Avatar/src/OrionAvatarSetupService';

declare global {
	type Nullable<T> = T | null;

	type Undef<T> = T | undefined;

	type Nil<T> = T | undefined | null;

	type RefDom<T = HTMLElement> = undefined | HTMLElement & T;

	type SetupProps<T> = Readonly<import('vue').ExtractPropTypes<T>>

	type AsideAnimationHookType =
	| 'asideEnterBefore'
	| 'asideEnterStart'
	| 'asideEnterEnd'
	| 'asideLeaveBefore'
	| 'asideLeaveStart'
	| 'asideLeaveEnd'
	;

	type ModalAnimationHookType =
	| 'modalEnterBefore'
	| 'modalEnterStart'
	| 'modalEnterEnd'
	| 'modalLeaveBefore'
	| 'modalLeaveStart'
	| 'modalLeaveEnd'
	;

	type NotifAnimationHookType =
	| 'notifEnterBefore'
	| 'notifEnterStart'
	| 'notifEnterEnd'
	| 'notifLeaveBefore'
	| 'notifLeaveStart'
	| 'notifLeaveEnd'
	;

	namespace Orion {
		type AppServiceConfig = {
			prefix: string;
			use: ('components' | 'monkeyPatching')[];
			lang: keyof typeof import('../lang')['default'];
			router: Router;
			popableAnimationHooks:
				& Record<AsideAnimationHookType, (instance?: OrionAside) => Promise<void>>
				& Record<ModalAnimationHookType, (instance?: OrionModal) => Promise<void>>
				& Record<NotifAnimationHookType, (instance?: OrionNotif) => Promise<void>>
		}

		type Config = Partial<AppServiceConfig>

		type Icon = typeof coolicons[number];

		type Theme = 'dark' | 'light' | 'auto';

		type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

		type Color = 'brand' | 'default' | 'info' | 'success' | 'warning' | 'danger' | 'inverse' | 'pink';

		type ColorAlt = 'brand-alt' | 'info-alt' | 'success-alt' | 'warning-alt' | 'danger-alt' | 'pink-alt';

		type ColorExtended = Color | ColorAlt;

		type ColorExtendedAndGreys = Color | ColorAlt | Grey;

		type Grey = 'grey-darker' | 'grey-dark' | 'grey' | 'grey-light' |'grey-lighter';

		type DatepickerType = 'date' | 'range' | 'week' | 'multiple' | 'month';

		type DateTableType = 'date' | 'range' | 'multiple' | 'month';

		type ListLayout = 'grid' | 'row';

		// eslint-disable-next-line max-len
		type VDropdownPlacement = 'auto' | 'auto-start' | 'auto-end' | 'top' | 'top-start' | 'top-end' | 'bottom' | 'bottom-start' | 'bottom-end' | 'left' | 'left-start' | 'left-end' | 'right' | 'right-start' | 'right-end';

		type Phone = {
			phoneNumber?: Nil<string>;
			phoneCountryCode?: Nil<Orion.Country['code']>;
		}

		type DateRange = {
			start?: Date;
			end?: Date;
			weekNumber?: number;
			year?: number;
			monthNumber?: number;
			selecting?: boolean;
		}

		type DailyCalendarTask = {
			id: number;
			start: Date;
			end: Date;
			title: string;
			color: Orion.Color;
			column?: number;
			callback?: (task: DailyCalendarTask) => void;
		}

		type DndData = {
			data: Object & { __uid: number };
			from: number;
			to: Nullable<number>;
			index: Nullable<number>;
			canDrop: boolean;
			fromAsideOrModal: Nullable<Number>;
		}

		type DndValidation = {
			method: (payload?: DndData) => boolean;
			notif: (payload?: any) => void;
		}

		type Period = {
			isStart: boolean;
			isEnd: boolean;
			start: Date;
			end: Date;
			label: string;
			color: Orion.ColorExtendedAndGreys;
			callback?: () => void;
			customClass?: string;
			specific: {
				color: Orion.ColorExtendedAndGreys
				date: Date;
				exclude: boolean;
			}[];
		}

		type Country = {
			code: CountryCode;
			name: string;
			areaCode: string;
		}

		type LayoutConfig = {
			navMain?: OrionNavMain.Props;
			navTop?: OrionNavTop.Props;
			navTabs?: OrionNavTabs.Props;
		}

		type List<T extends Record<string, any>> = Omit<OrionListProps<T>, 'list' | 'selected'> & {
			list: T[];
			selected?: T[];
		}

		type ListPage = {
			size: number;
			index: number;
		}

		type NavItem = Partial<{
			always: boolean;
			backLabel: string;
			callback: (item: NavItem, ev: MouseEvent | TouchEvent) => any;
			children: NavItem[];
			class: string;
			expand: boolean;
			fontIcon: string;
			icon: Orion.Icon;
			id: string;
			if: boolean | (() => boolean);
			label: string;
			line: boolean;
			parent: NavItem;
			reload: boolean;
			replace: boolean;
			root: boolean;
			sectionTitle: boolean;
			showCarret: boolean;
			tag: string;
			to: RouteLocationRaw;
			wrapperClass: string;
			activeWhenExact: boolean;
		}>

		type NavSection = {
			slug: string;
			items: NavItem[];
			if?: boolean | (() => boolean);
		}

		type VDropdown = {
			placement?: VDropdownPlacement;
			distance?: number;
			skidding?: number;
			arrowPadding?: number;
		}

		namespace DateTable {
			type Type ='date' | 'range' | 'multiple' | 'month';

			type Marker = {
				date: Date;
				color: Orion.ColorExtendedAndGreys;
			}
		}

		namespace Popable {
			type Name = 'OrionAside' | 'OrionModal' | 'OrionNotif';

			type PublicIntance =
				| OrionAsideSetupService['publicInstance']
				| OrionModalSetupService['publicInstance']
				| OrionNotifSetupService['publicInstance']

			type Options = {
				uid: number;
				Nested: Component | null;
				NestedProps: Record<string, any>;
				customClass: string;
				programmatic: boolean;
				openauto: boolean;
				size: string;
				hideClose: boolean;
				hideOnOverlayClick: boolean;
				hideOnEsc: boolean;
				overlay: boolean;
				zIndex: number;
				events?: Record<string, (popable: OrionAside | OrionModal | OrionNotif, params: any) => void>;
			};

			type CloseOptions = {
				keepInQueue?: boolean;
				handleQueue?: boolean;
				flush?: boolean;
			};
		}

		namespace Aside {
			type Options = Popable.Options & {
				events?: Record<string, (aside: OrionAside, params: any) => void>;
			}
		}

		namespace Modal {
			type Options = Popable.Options & {
				title: Nil<string>;
				message: Nil<string>;
				events?: Record<string, (modal: OrionModal, params: any) => void>;
				actions?: Partial<ActionsParams>[];
				prompt?: Partial<Prompt>;
			};

			type ActionsParams = OrionButton.Props & {
				label: string;
				callback: (modal: OrionModal, prompt?: Prompt) => void;
			}

			type PromptType = 'input' | 'textarea' | 'password' | 'select' | 'phone' | 'upload' | 'datepicker';

			type Prompt<T = any> = {
				type: PromptType;
				value: Nil<T>;
				fieldProps: Partial<OrionField.Props> & Record<string, any>;
				confirm(): void;
				cancel(): void;
			}

			type PromptResolveType<T> = {
				confirm: boolean;
				value: Nil<T>;
				modal: OrionModal;
			}
		}

		namespace Notif {
			type Options = Popable.Options & {
				title: Nil<string>;
				message: Nil<string>;
				duration?: Nil<number>;
				icon?: Orion.Icon;
				fontIcon?: string;
				color?: 'info' | 'success' | 'warning' | 'danger' ;
				events?: Record<string, (notif: OrionNotif, params: any) => void>;
			};
		}

		namespace Chat {
			type Config = {
				user: User;
				allowMessageStatus: boolean;
				allowDiscussionCreation: boolean;
				allowDiscussionSearch: boolean;
				discussionSearchTimer: number;
				// eslint-disable-next-line max-len
				discussionFetcherAsync?: (params: { oldestDiscussionId?: number, oldestDiscussionUpdatedDate?: Date, searchTerm?: string, searchTermHasChanged?: boolean }) => Promise<Discussion[]>;
				discussionTitleFormatter?: (discussion: OrionChatEntity) => string;
				discussionInterlocutorsFormatter?: (discussion: OrionChatEntity) => User[];
				discussionUnreadMessagesCounter?: (params: {discussion: OrionChatEntity, discussionId: number, messages: OrionChatMessageEntity[] }) => number;
				messageFetcherAsync: (params: { discussion: OrionChatEntity, discussionId: number, oldestMessageId?: number }) => Promise<Message[]>;
				onMessageReadAsync: (message: OrionChatMessageEntity) => void;
				onNewMessageAsync: (message: OrionChatMessageEntity, registerMessage: () => void) => void;
				onActiveDiscussionChange: (discussionId?: number, oldDiscussionId?: number) => void;
			}

			type Options = Partial<Config> & {
				user: User;
			};

			type User = {
				id: number;
				name: string;
				avatar: string;
				avatarProps?: Partial<OrionAvatarProps>;
			};

			type Discussion = {
				id: number;
				createdDate: Date;
				updatedDate?: Date;
				participants: User[];
				lastMessage?: Message;
				messages: Message[];
			}

			type Message = {
				discussionId: number;
				id: number;
				content?: string;
				createdDate: Date;
				updatedDate?: Date;
				deletedDate?: Date;
				type?: number | string;
				metaData?: string | Record<string, any>;
				author: User;
				isRead: boolean;
			}

			type NewMessage = {
				message: string;
				discussionId: number;
			}
		}

		namespace Tour {
			type TourObject = {
				label?: string,
				callback?: () => any;
				clean?: () => any
			}
		}

		namespace Validation {
			type Rule = ReturnType<ReturnType<typeof useValidation<any, any>>['rule']>;
			type RuleResult<T> = string | boolean | ((val: T) => boolean | Validator.RuleResult) | ValidatorClass<T>;
			type Rules<T> = {
				[K in keyof T]?: RuleResult<T[K]>;
			}
		}

		namespace Validator {
			type Rule<T = any> = ((value: T) => Orion.Validator.RuleResult);
			type RuleFunction = ((...args: any[]) => (value?: any) => boolean);
			type RuleResult = {
				result: boolean
				level: 'warning' | 'error'
				message?: string
				meta?: any,
			}
		}

	}
}
