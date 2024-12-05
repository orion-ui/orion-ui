import { SharedPropsSize, SharedPropsColorExtentedAndGreys } from 'lib/shared-props';
import SharedSetupService from '../../Shared/SharedSetupService';

export type OrionChipsEmits = {(e: 'close'): void}
export type OrionChipsProps =
	SharedPropsSize &
	SharedPropsColorExtentedAndGreys & {
		// @doc props/outline Adds an outline style on the chips
		// @doc/fr props/outline modifie le style en ajoutant un contraste
		outline: boolean,
		// @doc props/close Defines if the chips can be closed
		// @doc/fr props/close définit si le chips peut être fermée
		close: boolean,
};

export default class OrionChipsSetupService extends SharedSetupService {
	static readonly defaultProps = {
		color: 'default' as Orion.Color,
		size: 'md' as Orion.Size,
	};

	constructor (protected props: OrionChipsProps, protected emits: OrionChipsEmits) {
		super();
	}
}
