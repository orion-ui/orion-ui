import { PropType, reactive, ref } from 'vue';
import { debounce, isNil } from 'lodash-es';
import SharedProps from './SharedProps';
import SharedSetupService from './SharedSetupService';
import useValidation from 'services/ValidationService';
import useWindow from 'services/WindowService';

type Props = SetupProps<typeof SharedFieldSetupService.props>
export type FieldEmit<T = any | null | undefined> = {
  (e: 'focus', payload: FocusEvent): void;
  (e: 'blur', payload?: FocusEvent): void;
  (e: 'input', payload: T): void;
  (e: 'change', val?: T): void;
  (e: 'update:modelValue', payload: T): void;
  (e: 'clear'): void;
}

export default abstract class SharedFieldSetupService<P, T, E extends FieldEmit = FieldEmit> extends SharedSetupService<Props & P> {
	static props = {
		...SharedProps.vModel(),
		...SharedProps.prefixIcon(),
		...SharedProps.suffixIcon(),
		...SharedProps.size(),
		// @doc props/autofocus autofocus the field when mounted.
		// @doc/fr props/autofocus focus automatiquement le champ lorsqu'il est monté.
		autofocus: Boolean,
		// @doc props/clearable defines if the field can be cleared.
		// @doc/fr props/clearable définit si le champ peut être vidé.
		clearable: Boolean,
		// @doc props/readonly sets the field to read-only mode
		// @doc/fr props/readonly définit le champ comme étant en lecture seule
		readonly: Boolean,
		// @doc props/required sets the field required
		// @doc/fr props/required indique que le champ est obligatoire
		required: Boolean,
		// @doc props/disabled disables the field
		// @doc/fr props/disabled désactive le champ
		disabled: Boolean,
		// @doc props/selectOnFocus select the field content when focused.
		// @doc/fr props/selectOnFocus sélectionne le contenu du champ lorsqu'il est focus.
		selectOnFocus: Boolean,
		// @doc props/forceLabelFloating allows floating label
		// @doc/fr props/forceLabelFloating permet au label de se placer au dessus du champ lorsqu'il possède une valeur
		forceLabelFloating: Boolean,
		// @doc props/inheritValidationState defines if the validation comes from its parent
		// @doc/fr props/inheritValidationState définit si la validation provient du parent
		inheritValidationState: Boolean,
		// @doc props/clearToNull sets the value to null when the field is cleared
		// @doc/fr props/clearToNull lorsque que le champ est vidé, sa valeur vaut `null`
		clearToNull: Boolean,
		// @doc props/label label of the field
		// @doc/fr props/label le label du champ
		label: {
			type: String,
			default: undefined as string | undefined,
		},
		// @doc props/type type of the input
		// @doc/fr props/type type of the input
		type: {
			type: String as PropType<string | Orion.DatepickerType>,
			default: 'text',
		},
		// @doc props/donetyping define the debounce duration before updating the value (useful for search field)
		// @doc/fr props/donetyping défini la durée du debounce avant de mettre à jour la valeur (utile pour les champs de recherche)
		donetyping: {
			type: Number,
			default: 0,
		},
		// @doc props/validationMessages displays informations about the validation error
		// @doc/fr props/validationMessages affiche un message concernant l'erreur lors de la validation
		validationMessages: {
			type: Object as PropType<OrionValidatorMessages>,
			default: undefined,
		},
		// @doc props/validation the validation for the field
		// @doc/fr props/validation la validation du champ
		validation: {
			type: [String, Function, Object, Boolean] as PropType<string | Function | OrionValidatorRule | boolean>,
			default: undefined,
		},
	};

	_input = ref<HTMLInputElement>();

	protected inputType = 'input';

	protected emit: E;

	protected handleInputDebounce = debounce((callback) => {
		if (typeof callback === 'function') {
			callback();
		}
	}, this.props.donetyping);

	protected sharedState = {
		hasBeenFocus: false,
		isFocus: false,
		isAutoFilled: false,
	};

	protected state = reactive({ ...this.sharedState });

	protected get hasValue () {
		return this.props.modelValue !== null && this.props.modelValue !== undefined && this.props.modelValue !== '';
	}

	private get isValidDefault () : boolean {
		if (!isNil(this.props.validation)) {
			if (typeof this.props.validation === 'object') {
				// using a this.props.validation instance
				return this.props.validation.validate();
			} else if (typeof this.props.validation === 'function') {
				// using a standalone validation function
				return this.props.validation();
			} else if (typeof this.props.validation === 'string') {
				// using string base validation
				return useValidation().checkRuleParams(this.props.modelValue, this.props.validation);
			} else if (typeof this.props.validation === 'boolean') {
				// using boolean base validation
				return this.props.validation;
			}
		} else if (!isNil(this.isValidCustom)) {
			return this.isValidCustom;
		} else if (this.props.required) {
			return this.hasValue;
		}
		return true;
	}

	protected get isValidCustom (): boolean | undefined {
		return;
	}

	protected get showStateCustom () {
		return false;
	}

	protected get validationMessagesToDisplay () {
		if (this.props.validationMessages) {
			return (Object.keys(this.props.validationMessages) as (keyof typeof this.props.validationMessages)[])
				.map(rule => ({
					message: this.props.validationMessages?.[rule],
					valid: useValidation().checkRuleParams(this.props.modelValue, rule),
				}));
		} else return [];
	}

	protected get labelIsFloating () {
		return this.state.isFocus || this.hasValue || this.props.forceLabelFloating || this.state.isAutoFilled;
	}

	get showError () {
		return this.isValid === false && this.showState;
	}

	get showSuccess () {
		return this.isValid && this.showState;
	}

	get showState () {
		return (this.isRequired && this.state.hasBeenFocus)
			|| ((this.props.validation as OrionValidatorRule)?.showValidationState || this.props.inheritValidationState) && this.isRequired
			|| (this.hasValue && this.state.hasBeenFocus && !this.state.isFocus && (
				(!!this.props.validation && !isNil(this.isValid)) || this.showStateCustom
				|| (this.props.type === 'tel' && this.props.modelValue !== '+33')
			));
	}

	get vModel () {
		return this.props.modelValue as T;
	}

	set vModel (val) {
		this.emit('update:modelValue', val);
		this.emit('input', val);
	}

	get isValid () {
		return this.isValidDefault;
	}

	get isFocus () {
		return this.state.isFocus;
	}

	get isRequired () {
		return this.props.required
		|| !!(typeof this.props.validation === 'string' && this.props.validation.includes('required'))
			|| !!(typeof this.props.validation === 'object'
				&& typeof this.props.validation?.validationArgs === 'string'
				&& this.props.validation.validationArgs?.includes('required'));
	}

	get orionFieldBinding (): OrionField.Props {
		return {
			clearable: this.props.clearable,
			disabled: this.props.disabled,
			hasValue: this.hasValue,
			inputType: this.inputType,
			isFocus: this.state.isFocus,
			labelIsFloating: this.labelIsFloating,
			prefixIcon: this.props.prefixIcon,
			readonly: this.props.readonly,
			required: this.isRequired,
			showError: this.showError,
			showSuccess: this.showSuccess,
			size: this.props.size,
			suffixIcon: this.props.suffixIcon,
			label: this.props.label,
			prefixFontIcon: this.props.prefixFontIcon,
			suffixFontIcon: this.props.suffixFontIcon,
		};
	}

	get publicInstance () {
		return {
			...super.publicInstance,
			hasBeenFocus: () => this.state.hasBeenFocus,
			isFocus: () => this.state.isFocus,
			focus: this.focus.bind(this),
			blur: this.blur.bind(this),
			clear: this.clear.bind(this),
			setHasBeenFocus: this.setHasBeenFocus.bind(this),
			isValid: () => this.isValid,
		};
	}


	constructor (props: Props & P, emit: E) {
		super(props);
		this.emit = emit;

		if (!!this.props.validation && typeof this.props.validation === 'object') {
			this.props.validation.registerComponentFocusState(this.publicInstance);
		}
	}

	protected onMounted () {
		if (this.props.autofocus) this.handleAutoFocus();

		// Detect Chrome autofill
		if (!!(useWindow() as Undef<any>)?.chrome) {
			setTimeout(() => {
				if (this._input.value?.parentElement?.querySelector('input:-webkit-autofill') === this._input.value) {
					this.state.isAutoFilled = true;
				}
			}, 400);
		}
	}


	protected blur = debounce(() => {
		this.emit('blur', new FocusEvent('blur'));
		this._input.value?.blur();
	}, 50, {
		leading: true,
		trailing: false,
	});

	protected handleAutoFocus () {
		const delay = this._input.value?.closest?.('.orion-aside, .orion-modal') ? 600 : 100;
		setTimeout(() => {
			this.focus();
		}, delay);
	}

	protected focus () {
		this._input.value?.focus();
		this.emit('focus', new FocusEvent('focus'));
	}

	handleFocus (e: FocusEvent) {
		if (this.props.disabled || this.props.readonly) return;
		this.state.isFocus = true;

		if (this.props.selectOnFocus && this._input.value) {
			const input = this._input.value;
			input.select();
		}

		this.emit('focus', e);
	}

	handleInput (e: Event) {
		const input = e?.target as HTMLInputElement;
		this.emit('input', input?.value);
	}

	handleChange () {
		this.emit('change');
	}

	handleBlur (e?: FocusEvent) {
		this.state.hasBeenFocus = true;
		this.state.isFocus = false;
		this._input?.value?.blur();
		this.emit('blur', e);

		if (this.props.donetyping) {
			this.handleInputDebounce.flush();
		}
	}

	clear () {
		if (this.props.disabled || this.props.readonly) return;
		this.emit('update:modelValue', this.props.clearToNull ? null : undefined);
		this.emit('input', this.props.clearToNull ? null : undefined);
		this.emit('change', this.props.clearToNull ? null : undefined);
		this.emit('clear');
	}

	setHasBeenFocus (value: boolean) {
		this.state.hasBeenFocus = value;
	}
}
