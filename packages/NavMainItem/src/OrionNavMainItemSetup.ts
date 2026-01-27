import SharedNavSetup from '../../Shared/SharedNavSetup';

export type OrionNavMainItemEmits = {
	(e: 'click-label', val: [Orion.NavItem, MouseEvent]): void
}
export type OrionNavMainItemProps = {
	item: Orion.NavItem
}

export default class OrionNavMainItemSetup extends SharedNavSetup {
	static readonly defaultProps = {};

	readonly baseClass = 'orion-nav-main';

	get items () {
		return !this.props.item.replace
			? this.props.item?.children ?? []
			: [];
	}

	get expand () {
		return this.props.item.expand;
	}


	constructor (protected props: OrionNavMainItemProps, protected emits: OrionNavMainItemEmits) {
		super();
	}
}
