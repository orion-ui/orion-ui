import SharedSetupService from '../../Shared/SharedSetupService';
import SharedProps from '../../Shared/SharedProps';

type Props = SetupProps<typeof OrionChipsSetupService.props>

export default class OrionChipsSetupService extends SharedSetupService<Props> {
	static props = {
		...SharedProps.size(),
		...SharedProps.colorExtended(),
		// @doc props/outline Adds an outline style on the chips
		// @doc/fr props/outline modifie le style en ajoutant un contraste
		outline: Boolean,
		// @doc props/close Defines if the chips can be closed
		// @doc/fr props/close définit si le chips peut être fermée
		close: Boolean,
	};

	constructor (props: Props) {
		super(props);
	}
}
