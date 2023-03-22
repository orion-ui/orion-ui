import SharedSetupService from '../../Shared/SharedSetupService';
import { PropType, ref } from 'vue';

type Props = SetupProps<typeof OrionRateSetupService.props>
type RateEmit = {
	(e: 'input', val: number): void,
	(e: 'update:modelValue', val: number): void,
}

export default class OrionRateSetupService extends SharedSetupService<Props> {
	static props = {
		// @doc props/disabled If set, make the component read-only.
		// @doc/fr props/disabled si défini, le composant sera en lecture seule
		disabled: Boolean,
		// @doc props/modelValue Value of the component
		// @doc/fr props/modelValue valeur du composant
		modelValue: {
			type: Number,
			default: undefined,
		},
		// @doc props/icon Icon of the component
		// @doc/fr props/icon icône du composant
		icon: {
			type: String as PropType<Orion.Icon>,
			default: 'circle_check',
		},
		// @doc props/fontIcon Icon of the component, from the imported font
		// @doc/fr props/fontIcon icône du composant, s'il s'agit d'une librairie de police importée
		fontIcon: {
			type: String,
			default: undefined,
		},
		// @doc props/numberOfRates The total number of rates
		// @doc/fr props/numberOfRates nombre total de votes
		numberOfRates: {
			type: Number,
			default: null,
		},
		// @doc props/color The color of filled icons
		// @doc/fr props/color couleur des icônes
		color: {
			type: String as PropType<Orion.Color>,
			default: 'warning',
		},
	};


	private emit: RateEmit;
	private rate = ref(this.props.modelValue);

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


	constructor (props: Props, emit: RateEmit) {
		super(props);
		this.emit = emit;
		this._uid = this.getUid();
	}


	emitUpdate (value: number) {
		this.emit('input', value);
		this.emit('update:modelValue', value);
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
