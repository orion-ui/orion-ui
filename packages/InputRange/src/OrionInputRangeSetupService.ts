import SharedFieldSetupService, { SharedFieldSetupServiceProps, SharedFieldSetupServiceEmits } from '../../Shared/SharedFieldSetupService';
import { ModelRef } from 'vue';
import SharedProps, { SharedPropsColor } from '../../Shared/SharedProps';

export type OrionInputRangeEmits = SharedFieldSetupServiceEmits<Nil<number[] | number>> & {}
export type OrionInputRangeProps = SharedFieldSetupServiceProps &
	SharedPropsColor & {
	// @doc props/maxValue maximum value of the input range
	// @doc/fr props/maxValue valeur maximum qui peut être sélectionnée
	maxValue?: number,
	// @doc props/minValue minimum value of the input range
	// @doc/fr props/minValue valeur minimale qui peut être sélectionnée
	minValue?: number,
	// @doc props/step step of the slider
	// @doc/fr props/step pas du curseur
	step?: number,
};
type VModelType = number[] | number;

export default class OrionInputRangeSetupService extends SharedFieldSetupService<OrionInputRangeProps, VModelType> {
	static readonly defaultProps = {
		...SharedFieldSetupService.defaultProps,
		...SharedProps.color,
		maxValue: 100,
		minValue: 0,
		step: 1,
		color: 'default' as Orion.Color,
	};

	private circleSize = 20;

	get multiple () {
		return typeof this.vModel.value !== 'number';
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
		if (typeof this.vModel.value === 'number') {
			return this.vModel.value;
		} else {
			return this.vModel.value[0];
		}
	}

	set minFieldValue (value) {
		if (this.multiple) {
			this.vModel.value = [this.verifyMin(+value), this.maxFieldValue];
		} else {
			this.vModel.value = +value;
		}
	}

	get maxFieldValue () {
		if (typeof this.vModel.value === 'number') {
			return this.vModel.value;
		} else {
			return this.vModel.value[1];
		}
	}

	set maxFieldValue (value) {
		if (this.multiple) {
			this.vModel.value = [this.minFieldValue, this.verifyMax(+value)];
		} else {
			this.vModel.value = +value;
		}
	}


	constructor (
		protected props: OrionInputRangeProps & typeof OrionInputRangeSetupService.defaultProps,
		protected emits: OrionInputRangeEmits,
		protected vModel: ModelRef<VModelType>) {
		super(props, emits, vModel);
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
