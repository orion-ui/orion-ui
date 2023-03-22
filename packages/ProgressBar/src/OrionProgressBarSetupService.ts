import SharedSetupService from '../../Shared/SharedSetupService';
import SharedProps from '../../Shared/SharedProps';

type Props = SetupProps<typeof OrionProgressBarSetupService.props>

export default class OrionProgressBarSetupService extends SharedSetupService<Props> {
	static props = {
		...SharedProps.color('info'),
		// @doc props/label label of the progress bar
		// @doc/fr props/label label de la barre de progression
		label: {
			type: String,
			default: undefined,
		},
		// @doc props/width width of the progress bar
		// @doc/fr props/width épaisseur de la barre de progression
		width: {
			type: Number,
			default: 10,
		},
		// @doc props/value value of the progress bar
		// @doc/fr props/value valeur de la barre de progression
		value: {
			type: Number,
			default: 0,
		},
	};

	constructor (props: Props) {
		super(props);
	}
}
