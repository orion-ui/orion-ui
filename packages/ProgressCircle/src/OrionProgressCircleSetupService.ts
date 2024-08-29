import { SharedPropsColor } from 'lib/shared-props';
import SharedSetupService from '../../Shared/SharedSetupService';

export type OrionProgressCircleEmits = {}
export type OrionProgressCircleProps = SharedPropsColor & {
	// @doc props/label the label
	// @doc/fr props/label label du cercle
	label?: string,
	// @doc props/pathWidth width of the path line
	// @doc/fr props/pathWidth épaisseur du cercle
	pathWidth: number,
	// @doc props/size size of the progress circle
	// @doc/fr props/size taille du cercle
	size: number,
	// @doc props/value value of the progress circle
	// @doc/fr props/value valeur du cercle
	value: number,
	// @doc props/valueWidth width of the value line
	// @doc/fr props/valueWidth épaisseur de la ligne qui représente la progression
	valueWidth: number,
};

export default class OrionProgressCircleSetupService extends SharedSetupService {
	static readonly defaultProps = {
		color: 'info' as Orion.Color,
		pathWidth: 2,
		size: 50,
		value: 0,
		valueWidth: 4,
	};

	get coord () {
		return this.props.size / 2;
	}

	get radius () {
		return this.props.size / 2 - this.props.valueWidth;
	}

	get perimeter () {
		return this.radius * 2 * Math.PI;
	}

	get progress () {
		return this.perimeter - (this.perimeter * this.props.value / 100);
	}


	constructor (protected props: OrionProgressCircleProps, protected emits: OrionProgressCircleEmits) {
		super();
	}
}
