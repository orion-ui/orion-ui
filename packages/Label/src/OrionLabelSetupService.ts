import SharedSetupService from '../../Shared/SharedSetupService';
import SharedProps from '../../Shared/SharedProps';

type Props = SetupProps<typeof OrionLabelSetupService.props>

export default class OrionLabelSetupService extends SharedSetupService<Props> {
	static props = {
		...SharedProps.size(),
		...SharedProps.colorExtended(),
		// @doc props/outline adds an outline style on the label
		// @doc/fr props/outline ajoute un contraste sur le label
		outline: Boolean,
	};

	constructor (props: Props) {
		super(props);
	}
}
