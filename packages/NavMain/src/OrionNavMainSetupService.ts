import { reactive, ref } from 'vue';
import { _RouteLocationBase } from 'vue-router';
import { concat } from 'lodash-es';

import SharedNavSetupService from '../../Shared/SharedNavSetupService';
import SharedProps, { SharedPropsNav } from '../../Shared/SharedProps';

export type OrionNavMainEmits = {}

export type OrionNavMainProps = SharedPropsNav & {
		navTop?: OrionNavTop.Props
};

export default class OrionNavMainSetupService extends SharedNavSetupService {
	static readonly defaultProps = { ...SharedProps.navDefault };

	readonly _el = ref<RefDom>();
	readonly _wrapper = ref<RefDom>();
	readonly _children = ref<RefDom>();

	readonly baseClass = 'orion-nav-main';

	private state = reactive({ menuHistory: [] as Orion.NavItem[][] });

	get items () { return this.props.items; }

	get itemsToDisplay () {
		let itemsToDisplay = this.state.menuHistory.slice(-1)[0]?.filter((x) => {
			return typeof x.if === 'function'
				? !x.always && x.if()
				: !x.always && x.if !== false;
		}) as Orion.NavItem[];

		if (this.state.menuHistory.length > 1) {
			let backLink = itemsToDisplay.find(x => !!x.backLabel);
			const hasBackLink = !!backLink;

			if (backLink) {
				backLink.label = backLink.backLabel;
			} else {
				backLink = { label: this.lang.BACK };
			}

			backLink.icon = 'chevron_left';
			backLink.callback = this.goBack.bind(this);

			if (!hasBackLink) {
				itemsToDisplay.unshift(backLink);
			}
		}

		itemsToDisplay = concat(this.props.items.filter((x) => {
			return typeof x.if === 'function'
				? x.always && x.if()
				: x.always && x.if !== false;
		}), itemsToDisplay);

		return itemsToDisplay;
	}

	get itemsToDisplayTop () {
		return this.props.navTop?.items?.filter((x: Orion.NavItem) => {
			return typeof x.if === 'function'
				? x.if()
				: x.if !== false;
		});
	}


	constructor (
		protected props: OrionNavMainProps & typeof OrionNavMainSetupService.defaultProps,
		protected emits: OrionNavMainEmits) {
		super();
	}


	protected async onBeforeMount () {
		this.state.menuHistory.push(this.props.items);
	}

	protected onMounted () {
		//this.findActiveItem();
		this.Bus.on('navMain.refresh', this.findActiveItem.bind(this));
	}

	protected onUnmounted () {
		this.Bus.off('navMain.refresh', this.findActiveItem.bind(this));
	}


	goBack () {
		if (this.state.menuHistory.length > 1) {
			this.state.menuHistory.splice(this.state.menuHistory.length - 1, 1);
		}
	}

	handleClick (item: Orion.NavItem, ev: MouseEvent | TouchEvent) {
		if (item.children) {
			if (item.replace) this.state.menuHistory.push(item.children);
			else item.expand = !item.expand;
		}

		if (item.root) this.state.menuHistory.splice(1);
		super.handleClick(item, ev);
	}

	itemIsActive (item: Orion.NavItem) {
		const target = item.to as _RouteLocationBase | string;
		const route = this.router.currentRoute.value;
		return target === this.window?.location.pathname || (typeof target === 'object' && target?.name === route?.name);
	}

	async findActiveItem () {
		// Recherche de l'item actif dans l'arborescence
		const loopInItems = (items: Orion.NavItem[]): Undef<Orion.NavItem> => {
			let item: Undef<Orion.NavItem> = undefined;

			const recursiveLoop = (items: Orion.NavItem[], parent: Nullable<Orion.NavItem>) => {
				for (const x of items) {
					// Servira à remonter l'arborescence
					if (parent && !x.line) x.parent = parent;

					if (this.itemIsActive(x) && !item) {
						item = x;
					} else if (x.children) {
						recursiveLoop(x.children, x);
					}
				}
			};

			recursiveLoop(items, null);

			return item;
		};

		const activeItem = await loopInItems(this.props.items);

		if (activeItem?.parent?.replace) {
			const menuToPushInHistory = activeItem.parent.children as Orion.NavItem[];
			this.state.menuHistory.push(menuToPushInHistory);
		} else if (activeItem?.parent) {
			activeItem.parent.expand = true;
		}

		// Trigger re-render
		this.ui.update();
	}
}
