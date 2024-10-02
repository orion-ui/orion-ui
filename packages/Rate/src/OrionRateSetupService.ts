import SharedSetupService from '../../Shared/SharedSetupService';
import { ModelRef, ref } from 'vue';

export type OrionRateEmits = {}
export type OrionRateProps = {
	// @doc props/color The color of filled icons
	// @doc/fr props/color couleur des icônes
	color: Orion.Color,
	// @doc props/disabled If set, make the component read-only.
	// @doc/fr props/disabled si défini, le composant sera en lecture seule
	disabled: boolean,
	// @doc props/fontIcon Icon of the component, from the imported font
	// @doc/fr props/fontIcon icône du composant, s'il s'agit d'une librairie de police importée
	fontIcon?: string,
	// @doc props/icon Icon of the component
	// @doc/fr props/icon icône du composant
	icon: Orion.Icon,
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


	constructor (protected props: OrionRateProps, protected emits: OrionRateEmits, protected vModel: ModelRef<number>) {
		super();
		this.rate.value = vModel.value;
		this._uid = this.getUid();
	}

	starColor (value: number) {
		const classList= [];
		if (this.vModel.value !== undefined) {
			if (value <= this.vModel.value || (value - this.vModel.value) < 0.25) {
				classList.push(`text--${this.props.color}`);
			}
			if (value > this.vModel.value && (value - this.vModel.value) < 0.75 && (value - this.vModel.value) > 0.25) {
				classList.push(`half--${this.props.color}`);
			}
		}
		return classList;
	};
}
