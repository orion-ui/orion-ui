import { isArray } from 'lodash-es';
import SharedFieldSetupService, { SharedFieldSetupServiceEmits, SharedFieldSetupServiceProps } from '../../Shared/SharedFieldSetupService';
import { ModelRef } from 'vue';
import { SharedPropsColor } from '../../Shared/SharedProps';

export type OrionCheckboxEmits<T> = SharedFieldSetupServiceEmits<T> & {}
export type OrionCheckboxProps = SharedFieldSetupServiceProps &
	SharedPropsColor & {
	// @doc props/iconCheck the icon when the checkbox is checked
	// @doc/fr props/iconCheck l'icône lorsque la case est cochée
	iconCheck?: Orion.Icon,
	// @doc props/inline set the property `display` on `inline-flex` instead of `flex`
	// @doc/fr props/inline défini la propriété `display` à `inline-flex` à la place `flex`
	inline?: boolean,
	// @doc props/inputValue the value of the checkbox
	// @doc/fr props/inputValue valeur de la case à cocher
	inputValue?: string | boolean | number | Object | any[] | Date | undefined,
	// @doc props/multiple allows to select multiples checkbox values, related to v-model array
	// @doc/fr props/multiple permet de selectionner plusieurs cases à cocher, dans le cas où le v-model est un tableau
	multiple?: boolean,
	// @doc props/reverse displays the label first
	// @doc/fr props/reverse affiche d'abord le label puis la case à cocher
	reverse?: boolean,
	// @doc props/type the type of the input
	// @doc/fr props/type type du champ
	type?: string,
};
type VModelType = any[] | boolean | null | undefined;

export default class OrionCheckboxSetupService extends SharedFieldSetupService<OrionCheckboxProps, VModelType, OrionCheckboxEmits<VModelType>> {
	static readonly defaultProps = {
		...SharedFieldSetupService.defaultProps,
		color: 'info' as Orion.Color,
		type: 'checkbox',
	};

	protected inputType = 'checkbox';

	protected get isValidCustom () {
		if (this.props.required) {
			return !!this.vModel?.value;
		}
		return true;
	}

	get hasValue () {
		if (isArray(this.vModel?.value)) return !!this.vModel?.value.length;
		return !!this.vModel?.value;
	}

	get isChecked () {
		if (this.props.multiple) {
			return isArray(this.vModel?.value) && this.vModel.value?.includes(this.props.inputValue);
		} else {
			return !!this.vModel?.value;
		}
	}

	constructor (
		protected props: OrionCheckboxProps & typeof OrionCheckboxSetupService.defaultProps,
		protected emits: OrionCheckboxEmits<VModelType>,
		protected vModel: ModelRef<VModelType>) {
		super(props, emits, vModel);
	}


	handleClick () {
		if (!this.props.disabled && !this.props.readonly) {
			this.state.hasBeenFocus = true;

			if (this.props.multiple && isArray(this.vModel?.value)) {
				if (this.vModel?.value.includes(this.props.inputValue)) {
					this.vModel?.value.splice(this.vModel.value.indexOf(this.props.inputValue), 1);
				} else {
					this.vModel?.value.push(this.props.inputValue);
				}
			} else {
				this.vModel.value = !this.vModel.value;
			}
		}
	}
}
