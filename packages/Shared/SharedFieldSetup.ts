import { debounce, type DebouncedFunc, isNil } from 'lodash-es';
import { useValidation } from 'services/ValidationService';
import { useWindow } from 'services/WindowService';
import { Validator } from 'utils/Validator';
import { computed, type ModelRef, reactive, ref } from 'vue';
import { SharedProps, type SharedPropsFieldSize, type SharedPropsPrefixIcon, type SharedPropsSuffixIcon } from './SharedProps';
import { SharedSetup } from './SharedSetup';

export type SharedFieldSetupEmits<T = any | null | undefined> = {
	// @doc event/focus/desc emitted on field focus
	// @doc/fr event/focus/desc émis lors du focus
	(e: 'focus', payload: FocusEvent): void
	// @doc event/blur/desc emitted when the focus leaves the field
	// @doc/fr event/blur/desc émis quand le focus quitte la case à cocher
	(e: 'blur', payload?: FocusEvent): void
	// @doc event/input/desc emitted when the value of the field changes
	// @doc/fr event/input/desc émis lorsque la valeur est modifiée
	(e: 'input', payload: T): void
	// @doc event/change/desc emitted when the value of the field changes
	// @doc/fr event/change/desc  émis lorsque la valeur est modifiée
	(e: 'change', val?: T): void
	// @doc event/clear/desc emitted when the field is cleared
	// @doc/fr event/clear/desc
	(e: 'clear'): void
};

export type SharedFieldSetupProps = SharedPropsPrefixIcon & SharedPropsSuffixIcon & SharedPropsFieldSize & {
	// @doc props/class additional css class to apply to the field wrapper
	// @doc/fr props/class class css supplémentaire à appliquer au wrapper du champ
	class?: string | Record<string, boolean> | (string | Record<string, boolean>)[]
	// @doc props/autofocus autofocus the field when mounted.
	// @doc/fr props/autofocus focus automatiquement le champ lorsqu'il est monté.
	autofocus?: boolean
	// @doc props/clearable defines if the field can be cleared.
	// @doc/fr props/clearable définit si le champ peut être vidé.
	clearable?: boolean
	// @doc props/readonly sets the field to read-only mode
	// @doc/fr props/readonly définit le champ comme étant en lecture seule
	readonly?: boolean
	// @doc props/required sets the field required
	// @doc/fr props/required indique que le champ est obligatoire
	required?: boolean
	// @doc props/disabled disables the field
	// @doc/fr props/disabled désactive le champ
	disabled?: boolean
	// @doc props/selectOnFocus select the field content when focused.
	// @doc/fr props/selectOnFocus sélectionne le contenu du champ lorsqu'il est focus.
	selectOnFocus?: boolean
	// @doc props/floatingLabel enable floating label behavior
	// @doc/fr props/floatingLabel active le comportement de label flottant
	floatingLabel?: boolean
	// @doc props/forceLabelFloating force floating label even without focus or value
	// @doc/fr props/forceLabelFloating force le label à se placer au dessus du champ même sans focus ni valeur
	forceLabelFloating?: boolean
	// @doc props/hint hint text displayed below the field
	// @doc/fr props/hint texte d'aide affiché sous le champ
	hint?: string
	// @doc props/clearToNull sets the value to null when the field is cleared
	// @doc/fr props/clearToNull lorsque que le champ est vidé, sa valeur vaut `null`
	clearToNull?: boolean
	// @doc props/label label of the field
	// @doc/fr props/label le label du champ
	label?: string
	// @doc props/placeholder placeholder of the field
	// @doc/fr props/placeholder le placeholder du champ
	placeholder?: string
	// @doc props/type type of the input
	// @doc/fr props/type type of the input
	type?: string | Orion.DatepickerType
	// @doc props/donetyping define the debounce duration before updating the value (useful for search field)
	// @doc/fr props/donetyping défini la durée du debounce avant de mettre à jour la valeur (utile pour les champs de recherche)
	donetyping?: number
	// @doc props/validation the validation for the field
	// @doc/fr props/validation la validation du champ
	validation?: string | ((val: any) => boolean) | Orion.Validator.Rule | Orion.Validation.Rule | boolean
	// @doc props/validationErrorMessage the error message displayed after input's validation.
	// @doc/fr props/validationErrorMessage le message d'erreur affiché en cas d'erreur lors de la validation
	validationErrorMessage?: string
};

export abstract class SharedFieldSetup<P, T, E extends SharedFieldSetupEmits = SharedFieldSetupEmits> extends SharedSetup {

	static readonly defaultProps = {
		...SharedProps.fieldSize,
		type: 'text',
		donetyping: 0,
		floatingLabel: true,
		validation: undefined,
	} as {}; // bypass "is not assignable to type 'InferDefault<LooseRequired<__component__Props>>" in Orion__field__.vue

	readonly _orionInput = ref<HTMLInputElement>();
	_uid?: number;

	abstract readonly inputType: string;

	protected handleInputDebounce: DebouncedFunc<(callback: any) => void>;

	readonly sharedState = {
		hasBeenFocus: false,
		isFocus: false,
		isAutoFilled: false,
	};

	protected state = reactive({ ...this.sharedState });

	readonly isValid = computed(() => {
		if (!isNil(this.props.validation)) {
			if (typeof this.props.validation === 'object') {
				// using a this.props.validation instance
				return this.props.validation.validate();
			}
			else if (typeof this.props.validation === 'function') {
				// using a standalone validation function
				return Validator.convertToValidatorResult(this.props.validation(this.vModel?.value)).result;
			}
			else if (typeof this.props.validation === 'string') {
				// using string base validation
				return useValidation().check(this.vModel?.value, this.props.validation);
			}
			else if (typeof this.props.validation === 'boolean') {
				// using boolean base validation
				return this.props.validation;
			}
		}
		else if (!isNil(this.isValidCustom)) {
			return this.isValidCustom;
		}
		else if (this.props.required) {
			return this.hasValue;
		}
		return true;
	});

	readonly validationResults = computed<Orion.Validator.RuleResult[]>(() => {
		if (typeof this.props.validation === 'object') {
			if (this.props.validation.definition instanceof Validator) {
				return this.props.validation.definition.validate(this.vModel?.value);
			}
			else if (typeof this.props.validation.definition === 'function') {
				return [Validator.convertToValidatorResult(this.props.validation.definition(this.vModel?.value))];
			}
		}
		else if (typeof this.props.validation === 'function') {
			return [Validator.convertToValidatorResult(this.props.validation(this.vModel?.value))];
		}
		return [];
	});

	protected get hasValue (): boolean { return this.vModel?.value !== null && this.vModel?.value !== undefined && this.vModel?.value !== '' }
	protected get isValidCustom (): boolean | undefined {
		// Can be customized in each field type to act as default validator
		return;
	}

	get labelIsFloating () {
		return this.state.isFocus
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
						? `<div class="orion-field__validation-message--danger">${x.message}</div>`
						: `<div class="orion-field__validation-message--warning">${x.message}</div>`;
				})
			: [];

		if (!!this.props.validationErrorMessage) {
			res.push(`<div class="orion-field__validation-message--danger">${this.props.validationErrorMessage}</div>`);
		}

		return res.join('\n');
	}

	get showSuccess () { return this.isValid.value && this.showState }
	get showError () {
		if (!this.showState) return false;

		if (this.validationResults.value.length) {
			return !!this.validationResults.value.filter(x => x.level === 'error' && x.result === false).length;
		}
		else {
			return this.isValid.value === false;
		}
	}

	get showWarning () {
		if (!this.showState) return false;
		if (this.showError || this.showSuccess) return false;

		if (this.validationResults.value.length) {
			return !this.showError && !!this.validationResults.value.filter(x => x.level === 'warning' && x.result === false).length;
		}
		else {
			return false;
		}
	}

	get showState () {
		if (this.state.hasBeenFocus) {
			return !isNil(this.props.validation) || (this.isRequired && (!this.hasValue || this.isValidCustom));
		}
		else if (typeof this.props.validation === 'object') {
			return this.props.validation.showStatus ?? false;
		}
	}

	get isFocus () { return this.state.isFocus }
	get isRequired () {
		return this.props.required
		  || !!(typeof this.props.validation === 'string' && this.props.validation.includes('required'));
	}

	get orionFieldBinding (): OrionField.Props {
		return {
			_uid: this._uid,
			class: this.props.class,
			label: this.props.label,
			size: this.props.size,
			required: this.isRequired,
			readonly: this.props.readonly,
			disabled: this.props.disabled,
			clearable: this.props.clearable,
			floatingLabel: this.props.floatingLabel,
			labelIsFloating: this.labelIsFloating,
			inputType: this.inputType,
			hasValue: this.hasValue,
			isFocus: this.state.isFocus,
			showError: this.showError,
			showWarning: this.showWarning,
			showSuccess: this.showSuccess,
			placeholder: this.props.placeholder,
			prefixIcon: this.props.prefixIcon,
			prefixFontIcon: this.props.prefixFontIcon,
			suffixIcon: this.props.suffixIcon,
			suffixFontIcon: this.props.suffixFontIcon,
			hint: this.props.hint,
			validationHtmlMessages: this.validationHtmlMessages,
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
			_input: () => this._orionInput.value,
		};
	}

	constructor (
		protected props: SharedFieldSetupProps & P & typeof SharedFieldSetup.defaultProps,
		protected emits: E,
		protected vModel: ModelRef<Nil<T>>) {
		super();

		this._uid = this.getUid();

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
				if (this._orionInput.value?.parentElement?.querySelector('input:-webkit-autofill') === this._orionInput.value) {
					this.state.isAutoFilled = true;
				}
			}, 400);
		}
	}

	protected blur = debounce(() => {
		this.emits('blur', new FocusEvent('blur'));
		this._orionInput.value?.blur();
	}, 50, {
		leading: true,
		trailing: false,
	});

	protected handleAutoFocus () {
		const delay = this._orionInput.value?.closest?.('.orion-aside, .orion-modal') ? 600 : 100;
		setTimeout(() => {
			this.focus();
		}, delay);
	}

	protected focus () {
		this._orionInput.value?.focus();
		this.emits('focus', new FocusEvent('focus'));
	}

	handleFocus (e: FocusEvent) {
		if (this.props.disabled || this.props.readonly) return;
		this.state.isFocus = true;

		if (this.props.selectOnFocus && this._orionInput.value) {
			const input = this._orionInput.value;
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
		this._orionInput?.value?.blur();
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
