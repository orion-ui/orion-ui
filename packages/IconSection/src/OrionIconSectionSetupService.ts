import SharedSetupService from '../../Shared/SharedSetupService';
import SharedProps from '../../Shared/SharedProps';

type Props = SetupProps<typeof OrionIconSectionSetupService.props>

export default class OrionIconSectionSetupService extends SharedSetupService<Props> {
	static props = {
		...SharedProps.icon(),
		// @doc props/center centers the content
		// @doc/fr props/center centre le contenu
		center: Boolean,
		// @doc props/title title of the section
		// @doc/fr props/title titre de la section
		title: {
			type: String,
			default: undefined,
		},
	};

	constructor (props: Props) {
		super(props);
	}
}
