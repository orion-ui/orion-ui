import { PropType } from 'vue';
import SharedSetupService from '../../Shared/SharedSetupService';

type Props = SetupProps<typeof OrionTabNavSetupService.props>

export default class OrionTabNavSetupService extends SharedSetupService<Props> {
	static props = {
		value: {
			type: String,
			default: undefined,
		},
		panes: {
			type: Array as PropType<Orion.Private.TsxTabPane[]>,
			default: () => [],
		},
		onTabClick: {
			type: Function as PropType<(...val: [OrionTabPane, MouseEvent]) => void>,
			required: true as const,
		},
	};

	constructor (props: Props) {
		super(props);
	}
}
