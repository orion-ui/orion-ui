import { PropType, reactive, ref } from 'vue';
import SharedSetupService from '../../Shared/SharedSetupService';
import SharedProps from '../../Shared/SharedProps';

type Props = SetupProps<typeof OrionPeriodSetupService.props>

export default class OrionPeriodSetupService extends SharedSetupService<Props> {
	static props = {
		// @doc props/loading adds a loading icon and disables the button
		// @doc/fr props/loading ajoute une icône de chargement et désactive le bouton
		label: String,

		begin: {
			type: Date,
			required: true as const,
		},

		end: {
			type: Date,
			required: true as const,
		},

		taskCount: Number,

		taskDone: Number,

		color: { type: String as PropType<Orion.Color> },
	};

	_el = ref<RefDom>();

	uid = this.getUid();

	private state = reactive({ onHover: false });

	get onHover () { return this.state.onHover; }
	set onHover (val) { this.state.onHover = val; }

	constructor (props: Props) {
		super(props);
	}
}
