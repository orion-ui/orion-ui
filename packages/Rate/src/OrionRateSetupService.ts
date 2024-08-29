import SharedSetupService from '../../Shared/SharedSetupService';
import { ref } from 'vue';

export type OrionRateEmits = {
	(e: 'input', val: number): void,
	(e: 'update:modelValue', val: number): void,
}
export type OrionRateProps = {
	// @doc props/color The color of filled icons
	// @doc/fr props/color couleur des icônes
	color: Orion.Color,
	// @doc props/disabled If set, make the component read-only.
	// @doc/fr props/disabled si défini, le composant sera en lecture seule
	disabled: boolean,
	// @doc props/fontIcon Icon of the component, from the imported font
	// @doc/fr props/fontIcon icône du composant, s'il s'agit d'une librairie de police importée
	fontIcon: string,
	// @doc props/icon Icon of the component
	// @doc/fr props/icon icône du composant
	icon: Orion.Icon,
	// @doc props/modelValue Value of the component
	// @doc/fr props/modelValue valeur du composant
	modelValue?: number,
	// @doc props/numberOfRates The total number of rates
	// @doc/fr props/numberOfRates nombre total de votes
	numberOfRates?: number,
};

export default class OrionRateSetupService extends SharedSetupService {
	static readonly defaultProps = {
		color: 'warning' as Orion.Color,
		disabled: false,
		icon: 'circle_check' as Orion.Icon,
	};

	private rate = ref<Undef<number>>();

	_uid: number;

	get value () {
		return this.props.modelValue;
	}

	get icon () {
		return this.props.icon;
	}

	get color () {
		return this.props.color;
	}

	get fontIcon () {
		return this.props.fontIcon;
	}

	get numberOfRates () {
		return this.props.numberOfRates;
	}

	get rateRounded () {
		if (this.rate.value !== undefined)
			return Math.round((this.rate.value));
	}

	set rateRounded (val) {
		this.rate.value = val;
	}


	constructor (protected props: OrionRateProps, protected emits: OrionRateEmits) {
		super();
		this.rate.value = this.props.modelValue;
		this._uid = this.getUid();
	}


	emitUpdate (value: number) {
		this.emits('input', value);
		this.emits('update:modelValue', value);
	};

	starColor (value: number) {
		const classList= [];
		if (this.props.modelValue !== undefined) {
			if (value <= this.props.modelValue || (value - this.props.modelValue) < 0.25) {
				classList.push(`text--${this.props.color}`);
			}
			if (value > this.props.modelValue && (value - this.props.modelValue) < 0.75 && (value - this.props.modelValue) > 0.25) {
				classList.push(`half--${this.props.color}`);
			}
		}
		return classList;
	};
}
