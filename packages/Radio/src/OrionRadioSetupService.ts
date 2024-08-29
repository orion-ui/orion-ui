import { SharedPropsColor } from 'lib/shared-props';
import SharedFieldSetupService, { SharedFieldSetupServiceEmits, SharedFieldSetupServiceProps } from '../../Shared/SharedFieldSetupService';

export type OrionRadioEmits = SharedFieldSetupServiceEmits<VModelType> & {}
export type OrionRadioProps =
	SharedFieldSetupServiceProps<VModelType> &
	SharedPropsColor & {
	// @doc props/iconCheck the icon when the radio button is checked
	// @doc/fr props/iconCheck l'icône lorsque le bouton est coché
	iconCheck: Orion.Icon,
	// @doc props/inline set the property `display` on `inline-flex` instead of `flex`
	// @doc/fr props/inline défini la propriété `display` à `inline-flex` à la place `flex`
	inline: boolean,
	// @doc props/inputValue value of the radio button
	// @doc/fr props/inputValue valeur du bouton radio
	inputValue: string | boolean | number | string[] | undefined,
	// @doc props/reverse displays the label first
	// @doc/fr props/reverse affiche en premier le label
	reverse: boolean,
	// @doc props/type type of the input
	// @doc/fr props/type type du champ
	type: string,
};
type VModelType = any[] | boolean | number | Record<string, any> | string | undefined | null;

export default class OrionRadioSetupService extends SharedFieldSetupService<OrionRadioProps, VModelType> {
	static readonly defaultProps = {
		...SharedFieldSetupService.defaultProps,
		color: 'info' as Orion.Color,
		inline: false,
		reverse: false,
		type: 'radio',
	};

	protected inputType = 'radio';

	protected get isValidCustom () {
		if (this.props.required) {
			return (this.props.modelValue === this.props.inputValue);
		}
		return true;
	}

	get isChecked () {
		return this.vModel === this.props.inputValue;
	}


	constructor (protected props: OrionRadioProps, protected emits: OrionRadioEmits) {
		super(props, emits);
	}


	handleClick () {
		if (!this.props.disabled && !this.props.readonly) {
			this.state.hasBeenFocus = true;
			this.vModel = this.props.inputValue;
			this.emits('input', this.props.inputValue);
		}
	}
}
