import { PropType } from 'vue';
import { isArray } from 'lodash-es';
import SharedFieldSetupService, { FieldEmit } from '../../Shared/SharedFieldSetupService';
import SharedProps from '../../Shared/SharedProps';

type Props = SetupProps<typeof OrionCheckboxSetupService.props>
type VModelType = any[] | boolean | null | undefined;

export default class OrionCheckboxSetupService extends SharedFieldSetupService<Props, VModelType> {
	static props = {
		...SharedFieldSetupService.props,
		...SharedProps.color(),
		// @doc props/inline set the property `display` on `inline-flex` instead of `flex`
		// @doc/fr props/inline défini la propriété `display` à `inline-flex` à la place `flex`
		inline: Boolean,
		// @doc props/reverse displays the label first
		// @doc/fr props/reverse affiche d'abord le label puis la case à cocher
		reverse: Boolean,
		// @doc props/multiple allows to select multiples checkbox values, related to v-model array
		// @doc/fr props/multiple permet de selectionner plusieurs cases à cocher, dans le cas où le v-model est un tableau
		multiple: Boolean,
		// @doc props/inputValue the value of the checkbox
		// @doc/fr props/inputValue valeur de la case à cocher
		inputValue: {
			type: [Array, Boolean, Number, Object, String] as PropType<VModelType> as PropType<string | number | string[] | undefined>,
			default: undefined,
		},
		// @doc props/iconCheck the icon when the checkbox is checked
		// @doc/fr props/iconCheck l'icône lorsque la case est cochée
		iconCheck: {
			type: String as PropType<Orion.Icon>,
			default: undefined,
		},
		// @doc props/type the type of the input
		// @doc/fr props/type type du champ
		type: {
			type: String,
			default: 'checkbox',
		},
	};

	protected inputType = 'checkbox';

	protected get isValidCustom () {
		if (this.props.required) {
			return !!this.props.modelValue;
		}
		return true;
	}

	protected get showStateCustom () {
		return this.props.required;
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


	constructor (props: Props, emit: FieldEmit<VModelType>) {
		super(props, emit);
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

			this.emit('input', this.vModel);
		}
	}
}
