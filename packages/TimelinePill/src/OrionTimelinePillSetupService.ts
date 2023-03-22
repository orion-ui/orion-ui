import { PropType } from 'vue';
import SharedSetupService from '../../Shared/SharedSetupService';

type Props = SetupProps<typeof OrionTimelinePillSetupService.props>

export default class OrionTimelinePillSetupService extends SharedSetupService<Props> {
	static props = {
		disabled: Boolean,
		value: {
			type: [String, Number],
			default: undefined,
		},
		current: {
			type: [String, Number],
			default: undefined,
		},
		panes: {
			type: Array as PropType<Orion.Private.TsxTimelinePane[]>,
			default: () => [],
		},
		onPillClick: {
			type: Function as PropType<(...val: [OrionTimelinePane, MouseEvent]) => void>,
			required: true as const,
		},
	};

	constructor (props: Props) {
		super(props);
	}
}
