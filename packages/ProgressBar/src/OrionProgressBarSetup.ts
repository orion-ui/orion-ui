import { SharedPropsColor } from '../../Shared/SharedProps';
import SharedSetup from '../../Shared/SharedSetup';

export type OrionProgressBarEmits = {}
export type OrionProgressBarProps = SharedPropsColor & {
	// @doc props/label label of the progress bar
	// @doc/fr props/label label de la barre de progression
	label?: string,
	// @doc props/value value of the progress bar
	// @doc/fr props/value valeur de la barre de progression
	value?: number,
	// @doc props/width width of the progress bar
	// @doc/fr props/width épaisseur de la barre de progression
	width?: number,
};

export default class OrionProgressBarSetup extends SharedSetup {
	static readonly defaultProps = {
		color: 'primary' as Orion.Color,
		value: 0,
		width: 10,
	};

	constructor (
		protected props: OrionProgressBarProps & typeof OrionProgressBarSetup.defaultProps,
		protected emits: OrionProgressBarEmits) {
		super();
	}
}
