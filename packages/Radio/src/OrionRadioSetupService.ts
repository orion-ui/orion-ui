import { PropType } from 'vue';
import SharedFieldSetupService, { FieldEmit } from '../../Shared/SharedFieldSetupService';
import SharedProps from '../../Shared/SharedProps';

type Props = SetupProps<typeof OrionRadioSetupService.props>
type VModelType = any[] | boolean | number | Record<string, any> | string | undefined | null;

export default class OrionRadioSetupService extends SharedFieldSetupService<Props, VModelType> {
	static props = {
		...SharedFieldSetupService.props,
		...SharedProps.color(),
		// @doc props/inline set the property `display` on `inline-flex` instead of `flex`
		// @doc/fr props/inline défini la propriété `display` à `inline-flex` à la place `flex`
		inline: Boolean,
		// @doc props/reverse displays the label first
		// @doc/fr props/reverse affiche en premier le label
		reverse: Boolean,
		// @doc props/inputValue value of the radio button
		// @doc/fr props/inputValue valeur du bouton radio
		inputValue: {
			type: [Array, Boolean, Number, Object, String] as PropType<VModelType> as PropType<string | boolean | number | string[] | undefined>,
			default: undefined,
		},
		// @doc props/iconCheck the icon when the radio button is checked
		// @doc/fr props/iconCheck l'icône lorsque le bouton est coché
		iconCheck: {
			type: String as PropType<Orion.Icon>,
			default: undefined,
		},
		// @doc props/type type of the input
		// @doc/fr props/type type du champ
		type: {
			type: String,
			default: 'radio',
		},
	};

	protected inputType = 'radio';

	protected get isValidCustom () {
		if (this.props.required) {
			return (this.props.modelValue === this.props.inputValue);
		}
		return true;
	}

	protected get showStateCustom () {
		return this.props.required;
	}

	get isChecked () {
		return this.vModel === this.props.inputValue;
	}


	constructor (props: Props, emit: FieldEmit<VModelType>) {
		super(props, emit);
	}


	handleClick () {
		if (!this.props.disabled && !this.props.readonly) {
			this.state.hasBeenFocus = true;
			this.vModel = this.props.inputValue;
			this.emit('input', this.props.inputValue);
		}
	}
}
