import { ref } from 'vue';
import SharedFieldSetupService, { FieldEmit } from '../../Shared/SharedFieldSetupService';
import SharedProps from '../../Shared/SharedProps';

type Props = SetupProps<typeof OrionInputRangeSetupService.props>
type VModelType = number[] | number;

export default class OrionInputRangeSetupService extends SharedFieldSetupService<Props, VModelType> {
	static props = {
		...SharedFieldSetupService.props,
		...SharedProps.color(),
		// @doc props/step step of the slider
		// @doc/fr props/step pas du curseur
		step: {
			type: Number,
			default: 1,
		},
		// @doc props/minValue minimum value of the input range
		// @doc/fr props/minValue valeur minimale qui peut être sélectionnée
		minValue: {
			type: Number,
			default: 0,
		},
		// @doc props/maxValue maximum value of the input range
		// @doc/fr props/maxValue valeur maximum qui peut être sélectionnée
		maxValue: {
			type: Number,
			default: 100,
		},
	};

	_minInput = ref<RefDom>();
	_maxInput = ref<RefDom>();

	private circleSize = 20;

	get multiple () {
		return typeof this.vModel !== 'number';
	}

	get leftAlign () {
		return (this.circleSize/2)
			* ((100 / (this.props.maxValue - this.props.minValue)
			* (this.minFieldValue - this.props.minValue)) / 100);
	}

	get rightAlign () {
		return (this.circleSize/2) - (this.circleSize/2)
			* ((100 / (this.props.maxValue - this.props.minValue)
			* (this.maxFieldValue - this.minFieldValue))/100);
	}

	get progressBarStyle () {
		return {
			width: `calc(100% / ${
				this.props.maxValue - this.props.minValue
			} * ${
				this.minFieldValue - this.props.minValue
			} + ${
				(this.circleSize / 2 - this.leftAlign)
			}px)`,
		};
	}

	get inputRangeStyle () {
		return {
			width: `calc(100% / ${
				this.props.maxValue - this.props.minValue
			} * ${
				this.maxFieldValue - this.minFieldValue
			} + ${this.rightAlign}px)`,
			left: `calc(100% / ${
				this.props.maxValue - this.props.minValue
			} * ${
				this.minFieldValue - this.props.minValue
			} - ${this.leftAlign}px)`,
		};
	}

	get minFieldValue () {
		if (typeof this.vModel === 'number') {
			return this.vModel;
		} else {
			return this.vModel[0];
		}
	}

	set minFieldValue (value) {
		if (this.multiple) {
			this.vModel = [this.verifyMin(+value), this.maxFieldValue];
		} else {
			this.vModel = +value;
		}
	}

	get maxFieldValue () {
		if (typeof this.vModel === 'number') {
			return this.vModel;
		} else {
			return this.vModel[1];
		}
	}

	set maxFieldValue (value) {
		if (this.multiple) {
			this.vModel = [this.minFieldValue, this.verifyMax(+value)];
		} else {
			this.vModel = +value;
		}
	}


	constructor (props: Props, emit: FieldEmit<VModelType>) {
		super(props, emit);
	}


	verifyMin (value: number) {
		if (value < this.maxFieldValue) {
			return value;
		} else {
			return this.maxFieldValue - this.props.step;
		}
	}

	verifyMax (value: number) {
		if (value > this.minFieldValue) {
			return value;
		} else {
			return this.minFieldValue + this.props.step;
		}
	}
}
