import { SharedPropsColor } from '../../Shared/SharedProps';
import SharedFieldSetupService, { SharedFieldSetupServiceEmits, SharedFieldSetupServiceProps } from '../../Shared/SharedFieldSetupService';
import { ModelRef } from 'vue';

export type OrionRadioEmits = SharedFieldSetupServiceEmits<VModelType> & {}
export type OrionRadioProps = SharedFieldSetupServiceProps &
	SharedPropsColor & {
	// @doc props/iconCheck the icon when the radio button is checked
	// @doc/fr props/iconCheck l'icône lorsque le bouton est coché
	iconCheck?: Orion.Icon,
	// @doc props/inline set the property `display` on `inline-flex` instead of `flex`
	// @doc/fr props/inline défini la propriété `display` à `inline-flex` à la place `flex`
	inline?: boolean,
	// @doc props/inputValue value of the radio button
	// @doc/fr props/inputValue valeur du bouton radio
	inputValue?: string | boolean | number | string[],
	// @doc props/reverse displays the label first
	// @doc/fr props/reverse affiche en premier le label
	reverse?: boolean,
	// @doc props/type type of the input
	// @doc/fr props/type type du champ
	type?: string,
};
export type VModelType = any[] | boolean | number | Record<string, any> | string | undefined | null;

export default class OrionRadioSetupService extends SharedFieldSetupService<OrionRadioProps, VModelType> {
	static readonly defaultProps = {
		...SharedFieldSetupService.defaultProps,
		color: 'info' as Orion.Color,
		type: 'radio',
	};

	protected inputType = 'radio';

	protected get isValidCustom () {
		if (this.props.required) {
			return (this.vModel.value === this.props.inputValue);
		}
		return true;
	}

	get isChecked () {
		return this.vModel.value === this.props.inputValue;
	}

	constructor (
		protected props: OrionRadioProps & typeof OrionRadioSetupService.defaultProps,
		protected emits: OrionRadioEmits,
		protected vModel: ModelRef<VModelType>) {
		super(props, emits, vModel);
	}


	handleClick () {
		if (!this.props.disabled && !this.props.readonly) {
			this.state.hasBeenFocus = true;
			this.vModel.value = this.props.inputValue;
			this.emits('input', this.props.inputValue);
		}
	}
}
