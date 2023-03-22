import { PropType } from 'vue';
import SharedNavSetupService from '../../Shared/SharedNavSetupService';

type Props = SetupProps<typeof OrionNavMainItemSetupService.props>

export default class OrionNavMainItemSetupService extends SharedNavSetupService<Props> {
	static props = {
		item: {
			type: Object as PropType<Orion.NavItem>,
			required: true as const,
		},
	};

	baseClass = 'orion-nav-main';

	get items () {
		return !this.props.item.replace
			? this.props.item?.children ?? []
			: [];
	}

	get expand () {
		return this.props.item.expand;
	}


	constructor (props: Props) {
		super(props);
	}
}
