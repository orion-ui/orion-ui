import { computed, ModelRef, reactive, ref } from 'vue';
import { debounce, DebouncedFunc, isNil } from 'lodash-es';
import SharedSetupService from './SharedSetupService';
import useValidation from 'services/ValidationService';
import useWindow from 'services/WindowService';
import { Validator } from 'utils/Validator';
import SharedProps, { SharedPropsPrefixIcon, SharedPropsSize, SharedPropsSuffixIcon } from './SharedProps';

export type SharedFieldSetupServiceEmits<T = any | null | undefined> = {
	// @doc event/focus/desc emitted on field focus
	// @doc/fr event/focus/desc émis lors du focus
  (e: 'focus', payload: FocusEvent): void;
	// @doc event/blur/desc emitted when the focus leaves the field
	// @doc/fr event/blur/desc émis quand le focus quitte la case à cocher
  (e: 'blur', payload?: FocusEvent): void;
	// @doc event/input/desc emitted when the value of the field changes
	// @doc/fr event/input/desc émis lorsque la valeur est modifiée
  (e: 'input', payload: T): void;
	// @doc event/change/desc emitted when the value of the field changes
	// @doc/fr event/change/desc  émis lorsque la valeur est modifiée
  (e: 'change', val?: T): void;
	// @doc event/clear/desc emitted when the field is cleared
	// @doc/fr event/clear/desc
  (e: 'clear'): void;
}

export type SharedFieldSetupServiceProps =
	SharedPropsPrefixIcon &
	SharedPropsPrefixIcon &
	SharedPropsSuffixIcon &
	SharedPropsSuffixIcon &
	SharedPropsSize & {
	// @doc props/autofocus autofocus the field when mounted.
	// @doc/fr props/autofocus focus automatiquement le champ lorsqu'il est monté.
	autofocus?: boolean,
	// @doc props/clearable defines if the field can be cleared.
	// @doc/fr props/clearable définit si le champ peut être vidé.
	clearable?: boolean,
	// @doc props/readonly sets the field to read-only mode
	// @doc/fr props/readonly définit le champ comme étant en lecture seule
	readonly?: boolean,
	// @doc props/required sets the field required
	// @doc/fr props/required indique que le champ est obligatoire
	required?: boolean,
	// @doc props/disabled disables the field
	// @doc/fr props/disabled désactive le champ
	disabled?: boolean,
	// @doc props/selectOnFocus select the field content when focused.
	// @doc/fr props/selectOnFocus sélectionne le contenu du champ lorsqu'il est focus.
	selectOnFocus?: boolean,
	// @doc props/forceLabelFloating allows floating label
	// @doc/fr props/forceLabelFloating permet au label de se placer au dessus du champ lorsqu'il possède une valeur
	forceLabelFloating?: boolean,
	// @doc props/clearToNull sets the value to null when the field is cleared
	// @doc/fr props/clearToNull lorsque que le champ est vidé, sa valeur vaut `null`
	clearToNull?: boolean,
	// @doc props/label label of the field
	// @doc/fr props/label le label du champ
	label?: string,
	// @doc props/placeholder placeholder of the field
	// @doc/fr props/placeholder le placeholder du champ
	placeholder?: string,
	// @doc props/type type of the input
	// @doc/fr props/type type of the input
	type?: string | Orion.DatepickerType,
	// @doc props/donetyping define the debounce duration before updating the value (useful for search field)
	// @doc/fr props/donetyping défini la durée du debounce avant de mettre à jour la valeur (utile pour les champs de recherche)
	donetyping?: number,
	// @doc props/validation the validation for the field
	// @doc/fr props/validation la validation du champ
	validation?: string | ((val: any) => boolean) | Orion.Validator.Rule | Orion.Validation.Rule | boolean,
	// @doc props/validationErrorMessage the error message displayed after input's validation.
	// @doc/fr props/validationErrorMessage le message d'erreur affiché en cas d'erreur lors de la validation
	validationErrorMessage?: string,
	// @doc props/inheritValidationState defines if the validation comes from its parent
	// @doc/fr props/inheritValidationState définit si la validation provient du parent
	inheritValidationState?: boolean,
}

export default abstract class SharedFieldSetupService<P, T, E extends SharedFieldSetupServiceEmits = SharedFieldSetupServiceEmits> extends SharedSetupService {
	static readonly defaultProps = {
		...SharedProps.size,
		type: 'text',
		donetyping: 0,
		inheritValidationState: undefined as SharedFieldSetupServiceProps['inheritValidationState'],
		validation: undefined as SharedFieldSetupServiceProps['validation'],
	} as {}; // bypass "is not assignable to type 'InferDefault<LooseRequired<__component__Props>>" in Orion__field__.vue

	readonly _input = ref<HTMLInputElement>();

	protected inputType = 'input';

	protected handleInputDebounce: DebouncedFunc<(callback: any) => void>;

	sharedState = reactive({
		hasBeenFocus: false,
		isFocus: false,
		isAutoFilled: false,
	});

	protected state = reactive({ ...this.sharedState });

	readonly isValid = computed(() => {
		if (!isNil(this.props.validation)) {
			if (typeof this.props.validation === 'object') {
				// using a this.props.validation instance
				return this.props.validation.validate();
			} else if (typeof this.props.validation === 'function') {
				// using a standalone validation function
				return Validator.convertToValidatorResult(this.props.validation(this.vModel?.value)).result;
			} else if (typeof this.props.validation === 'string') {
				// using string base validation
				return useValidation().check(this.vModel?.value, this.props.validation);
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
	});

	readonly validationResults = computed<Orion.Validator.RuleResult[]>(() => {
		if (typeof this.props.validation === 'object') {
			if (this.props.validation.definition instanceof Validator) {
				return this.props.validation.definition.validate(this.vModel?.value);
			} else if (typeof this.props.validation.definition === 'function') {
				return [Validator.convertToValidatorResult(this.props.validation.definition(this.vModel?.value))];
			}
		} else if (typeof this.props.validation === 'function') {
			return [Validator.convertToValidatorResult(this.props.validation(this.vModel?.value))];
		}
		return [];
	});

	protected get hasValue (): boolean {
		return this.vModel?.value !== null && this.vModel?.value !== undefined && this.vModel?.value !== '';
	}

	protected get isValidCustom (): boolean | undefined {
		// Can be customized in each field type to act as default validator
		return;
	}

	protected get labelIsFloating () {
		return (this.state.isFocus && !(this.props.placeholder && !this.hasValue))
		|| this.hasValue
		|| this.props.forceLabelFloating
		|| this.state.isAutoFilled
		;
	}

	get validationHtmlMessages () {
		const res = this.validationResults.value.length
			? this.validationResults.value
				.filter(x => !x.result)
				.filter(x => !!x.message)
				.map((x) => {
					return x.level === 'error'
						? `<div class="text--danger">${x.message}</div>`
						: `<div class="text--warning">${x.message}</div>`;
				})
			: [];

		if (!!this.props.validationErrorMessage) {
			res.push(`<div class="text--danger">${this.props.validationErrorMessage}</div>`);
		}

		return res.join('\n');
	}

	get showError () {
		if (!this.showState) return false;

		if (this.validationResults.value.length) {
			return !!this.validationResults.value.filter(x => x.level === 'error' && x.result === false).length;
		} else {
			return this.isValid.value === false;
		}
	}

	get showWarning () {
		if (!this.showState) return false;
		if (this.showError || this.showSuccess) return false;

		if (this.validationResults.value.length) {
			return !this.showError && !!this.validationResults.value.filter(x => x.level === 'warning' && x.result === false).length;
		} else {
			return false;
		}
	}

	get showSuccess () {
		return this.isValid.value && this.showState;
	}

	get showState () {
		if (this.props.inheritValidationState !== undefined) {
			return this.props.inheritValidationState;
		}
		if (this.state.hasBeenFocus) {
			return !isNil(this.props.validation) || (this.isRequired && (!this.hasValue || this.isValidCustom));
		} else if (typeof this.props.validation === 'object') {
			return this.props.validation.showStatus ?? false;
		}
	}

	get isFocus () {
		return this.state.isFocus;
	}

	get isRequired () {
		return this.props.required
		|| !!(typeof this.props.validation === 'string' && this.props.validation.includes('required'));
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
			showWarning: this.showWarning,
			showSuccess: this.showSuccess,
			size: this.props.size,
			suffixIcon: this.props.suffixIcon,
			label: this.props.label,
			placeholder: this.props.placeholder,
			prefixFontIcon: this.props.prefixFontIcon,
			suffixFontIcon: this.props.suffixFontIcon,
		};
	}

	get publicInstance () {
		return {
			hasBeenFocus: () => this.state.hasBeenFocus,
			isFocus: () => this.state.isFocus,
			focus: this.focus.bind(this),
			blur: this.blur.bind(this),
			clear: this.clear.bind(this),
			setHasBeenFocus: this.setHasBeenFocus.bind(this),
			isValid: () => this.isValid.value,
			_input: () => this._input.value,
			sharedState: () => this.sharedState,
		};
	}

	// @doc props/vModel vModel of the component
	// @doc/fr props/vModel vModel du composant.
	constructor (
		protected props: SharedFieldSetupServiceProps & P & typeof SharedFieldSetupService.defaultProps,
		protected emits: E,
		protected vModel: ModelRef<Nil<T>>) {
		super();

		if (!!this.props.validation && typeof this.props.validation === 'object') {
			this.props.validation?.registerComponentFocusStateSetter(this.publicInstance);
		}

		this.handleInputDebounce = debounce((callback) => {
			if (typeof callback === 'function') {
				callback();
			}
		}, this.props.donetyping);
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
		this.emits('blur', new FocusEvent('blur'));
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
		this.emits('focus', new FocusEvent('focus'));
	}

	handleFocus (e: FocusEvent) {
		if (this.props.disabled || this.props.readonly) return;
		this.state.isFocus = true;

		if (this.props.selectOnFocus && this._input.value) {
			const input = this._input.value;
			input.select();
		}

		this.emits('focus', e);
	}

	handleInput (e: Event) {
		const input = e?.target as HTMLInputElement;
		this.emits('input', input?.value);
	}

	handleChange () {
		this.emits('change');
	}

	handleBlur (e?: FocusEvent) {
		this.state.hasBeenFocus = true;
		this.state.isFocus = false;
		this._input?.value?.blur();
		this.emits('blur', e);

		if (this.props.donetyping) {
			this.handleInputDebounce.flush();
		}
	}

	clear () {
		if (this.props.disabled || this.props.readonly) return;
		this.vModel.value = this.props.clearToNull ? null : undefined;
		this.emits('input', this.props.clearToNull ? null : undefined);
		this.emits('change', this.props.clearToNull ? null : undefined);
		this.emits('clear');
	}

	setHasBeenFocus (value: boolean) {
		this.state.hasBeenFocus = value;
	}
}
