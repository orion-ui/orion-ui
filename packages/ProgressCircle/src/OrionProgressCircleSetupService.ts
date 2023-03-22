import SharedSetupService from '../../Shared/SharedSetupService';
import SharedProps from '../../Shared/SharedProps';

type Props = SetupProps<typeof OrionProgressCircleSetupService.props>

export default class OrionProgressCircleSetupService extends SharedSetupService<Props> {
	static props = {
		...SharedProps.color('info'),
		// @doc props/label the label
		// @doc/fr props/label label du cercle
		label: {
			type: String,
			default: undefined,
		},
		// @doc props/size size of the progress circle
		// @doc/fr props/size taille du cercle
		size: {
			type: Number,
			default: 50,
		},
		// @doc props/value value of the progress circle
		// @doc/fr props/value valeur du cercle
		value: {
			type: Number,
			default: 0,
		},
		// @doc props/pathWidth width of the path line
		// @doc/fr props/pathWidth épaisseur du cercle
		pathWidth: {
			type: Number,
			default: 2,
		},
		// @doc props/valueWidth width of the value line
		// @doc/fr props/valueWidth épaisseur de la ligne qui représente la progression
		valueWidth: {
			type: Number,
			default: 4,
		},
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


	constructor (props: Props) {
		super(props);
	}
}
