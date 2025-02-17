import SharedSetupService from '../../Shared/SharedSetupService';
import SharedProps, { SharedPropsColorExtentedAndGreys, SharedPropsSize } from '../../Shared/SharedProps';

export type OrionLabelEmits = {}
export type OrionLabelProps =
	SharedPropsSize &
	SharedPropsColorExtentedAndGreys & {
	// @doc props/outline adds an outline style on the label
	// @doc/fr props/outline ajoute un contraste sur le label
	outline?: boolean,
};

export default class OrionLabelSetupService extends SharedSetupService {
	static readonly defaultProps = {
		...SharedProps.colorExtendedAndGreys,
		...SharedProps.size,
		outline: false,
	};

	constructor (protected props: OrionLabelProps, protected emits: OrionLabelEmits) {
		super();
	}
}
