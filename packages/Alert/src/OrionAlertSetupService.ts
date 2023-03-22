import SharedSetupService from '../../Shared/SharedSetupService';
import SharedProps from '../../Shared/SharedProps';

type Props = SetupProps<typeof OrionAlertSetupService.props>

export default class OrionAlertSetupService extends SharedSetupService<Props> {
	static props = {
		...SharedProps.color(),
		// @doc props/center Defines if the content must be centered in the component
		// @doc/fr props/center Défini si le contenu doit être centré dans le composant
		center: Boolean,
		// @doc props/close Defines if the alert can be closed
		// @doc/fr props/close Si défini, une croix permet de fermer l'alert
		close: Boolean,
		// @doc props/title Title of the alert
		// @doc/fr props/title Titre de l'alert
		title: {
			type: String,
			default: undefined,
		},
	};

	constructor (props: Props) {
		super(props);
	}
}
