import { SharedNavSetup } from '../../Shared/SharedNavSetup';

export type OrionNavMainItemEmits = {
	(e: 'clickLabel', val: [Orion.NavItem, MouseEvent]): void
};
export type OrionNavMainItemProps = {
	item: Orion.NavItem
};

export class OrionNavMainItemSetup extends SharedNavSetup {

	static readonly defaultProps = {};

	// eslint-disable-next-line orion-rules/private-property-if-only-in-template
	readonly baseClass = 'orion-nav-main';

	get items () {
		return !this.props.item.replace
			? this.props.item?.children ?? []
			: [];
	}

	protected get expand () { return this.props.item.expand }

	constructor (protected props: OrionNavMainItemProps, protected emits: OrionNavMainItemEmits) {
		super();
	}

}
