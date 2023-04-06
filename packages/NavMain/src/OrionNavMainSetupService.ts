import { PropType, reactive, ref } from 'vue';
import { _RouteLocationBase } from 'vue-router';
import { concat } from 'lodash-es';

import SharedNavSetupService from '../../Shared/SharedNavSetupService';
import SharedProps from '../../Shared/SharedProps';

type Props = SetupProps<typeof OrionNavMainSetupService.props>

export default class OrionNavMainSetupService extends SharedNavSetupService<Props> {
	static props = {
		...SharedProps.nav(),
		navTop: {
			type: Object as PropType<OrionNavTop.Props>,
			default: undefined,
		},
	};

	_el = ref<RefDom>();
	_wrapper = ref<RefDom>();
	_children = ref<RefDom>();

	baseClass = 'orion-nav-main';

	private state = reactive({ menuHistory: [] as Orion.NavItem[][] });

	get items () { return this.props.items; }

	get itemsToDisplay () {
		let itemsToDisplay = this.state.menuHistory.slice(-1)[0]?.filter(x => x.if !== false && !x.always) as Orion.NavItem[];

		if (this.state.menuHistory.length > 1) {
			let backLink = itemsToDisplay.find(x => !!x.backLabel);
			const hasBackLink = !!backLink;

			if (backLink) {
				backLink.label = backLink.backLabel;
			} else {
				backLink = { label: this.lang.BACK };
			}

			backLink.icon = 'chevron_big_left';
			backLink.callback = this.goBack.bind(this);

			if (!hasBackLink) {
				itemsToDisplay.unshift(backLink);
			}
		}

		itemsToDisplay = concat(this.props.items.filter(x => x.always && x.if !== false), itemsToDisplay);

		return itemsToDisplay;
	}

	get itemsToDisplayTop () {
		return this.props.navTop?.items?.filter(x => x.if !== false);
	}


	constructor (props: Props) {
		super(props);
	}


	protected async onBeforeMount () {
		this.state.menuHistory.push(this.props.items);
	}

	protected onMounted () {
		this.findActiveItem();
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

	handleClick (item: Orion.NavItem) {
		if (item.children) {
			if (item.replace) this.state.menuHistory.push(item.children);
			else item.expand = !item.expand;
		}

		if (item.root) this.state.menuHistory.splice(1);
		super.handleClick(item);
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
