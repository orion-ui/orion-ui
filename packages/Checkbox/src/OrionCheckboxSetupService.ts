import { isArray } from 'lodash-es';
import SharedFieldSetupService, { SharedFieldSetupServiceEmits, SharedFieldSetupServiceProps } from '../../Shared/SharedFieldSetupService';
import { SharedPropsColor } from 'lib/shared-props';

export type OrionCheckboxEmits<T =VModelType> = SharedFieldSetupServiceEmits<T> & {}
export type OrionCheckboxProps = SharedFieldSetupServiceProps &
	 SharedPropsColor & {
	// @doc props/iconCheck the icon when the checkbox is checked
	// @doc/fr props/iconCheck l'icône lorsque la case est cochée
	iconCheck: Orion.Icon,
	// @doc props/inline set the property `display` on `inline-flex` instead of `flex`
	// @doc/fr props/inline défini la propriété `display` à `inline-flex` à la place `flex`
	inline: boolean,
	// @doc props/inputValue the value of the checkbox
	// @doc/fr props/inputValue valeur de la case à cocher
	inputValue: string | boolean | number | Object | any[] | Date | undefined,
	// @doc props/multiple allows to select multiples checkbox values, related to v-model array
	// @doc/fr props/multiple permet de selectionner plusieurs cases à cocher, dans le cas où le v-model est un tableau
	multiple: boolean,
	// @doc props/reverse displays the label first
	// @doc/fr props/reverse affiche d'abord le label puis la case à cocher
	reverse: boolean,
	// @doc props/type the type of the input
	// @doc/fr props/type type du champ
	type: string,
};
type VModelType = any[] | boolean | null | undefined;

export default class OrionCheckboxSetupService extends SharedFieldSetupService<OrionCheckboxProps, OrionCheckboxEmits> {
	static readonly defaultProps = {
		...SharedFieldSetupService.defaultProps,
		inline: false,
		multiple: false,
		reverse: false,
		type: 'checkbox',
		color: 'default' as Orion.Color,
	};

	protected inputType = 'checkbox';

	protected get isValidCustom () {
		if (this.props.required) {
			return !!this.props.modelValue;
		}
		return true;
	}

	get hasValue () {
		if (isArray(this.vModel)) return !!this.vModel.length;
		return !!this.vModel;
	}

	get isChecked () {
		if (this.props.multiple) {
			return isArray(this.vModel) && this.vModel.includes(this.props.inputValue);
		} else {
			return !!this.vModel;
		}
	}


	constructor (protected props: OrionCheckboxProps, protected emits: OrionCheckboxEmits) {
		super(props, emits);
	}


	handleClick () {
		if (!this.props.disabled && !this.props.readonly) {
			this.state.hasBeenFocus = true;

			if (this.props.multiple && isArray(this.vModel)) {
				if (this.vModel.includes(this.props.inputValue)) {
					this.vModel.splice(this.vModel.indexOf(this.props.inputValue), 1);
				} else {
					this.vModel.push(this.props.inputValue);
				}
			} else {
				this.vModel = !this.vModel;
			}

			this.emits('input', this.vModel);
		}
	}
}
