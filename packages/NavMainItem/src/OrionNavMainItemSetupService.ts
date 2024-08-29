import SharedNavSetupService from '../../Shared/SharedNavSetupService';

export type OrionNavMainItemEmits = {}
export type OrionNavMainItemProps = {
	item: Orion.NavItem
}

export default class OrionNavMainItemSetupService extends SharedNavSetupService {
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
