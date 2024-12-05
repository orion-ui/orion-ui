import { SharedPropsSize, SharedPropsColorExtentedAndGreys } from 'lib/shared-props';
import SharedSetupService from '../../Shared/SharedSetupService';

export type OrionLabelEmits = {}
export type OrionLabelProps =
	SharedPropsSize &
	SharedPropsColorExtentedAndGreys & {
	// @doc props/outline adds an outline style on the label
	// @doc/fr props/outline ajoute un contraste sur le label
	outline: boolean,
};

export default class OrionLabelSetupService extends SharedSetupService {
	static readonly defaultProps = {
		outline: false,
		color: 'default' as Orion.ColorExtendedAndGreys,
		size: 'md' as Orion.Size,
	};

	constructor (protected props: OrionLabelProps, protected emits: OrionLabelEmits) {
		super();
	}
}
