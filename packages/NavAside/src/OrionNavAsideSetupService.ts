import { PropType, watch } from 'vue';
import { useRoute } from 'vue-router';
import SharedSetupService from '../../Shared/SharedSetupService';

type Props = SetupProps<typeof OrionNavAsideSetupService.props>

export default class OrionNavAsideSetupService extends SharedSetupService<Props> {
	static props = {
		navMain: {
			type: Object as PropType<OrionNavMain.Props>,
			default: undefined,
		},
		navTop: {
			type: Object as PropType<OrionNavTop.Props>,
			default: undefined,
		},
	};

	get publicInstance () {
		return {};
	}

	constructor (props: Props, _aside?: OrionAside) {
		super(props);

		const route = useRoute();
		watch(route, () => _aside?.close());
	}
}
