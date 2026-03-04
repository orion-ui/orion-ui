import { Reactive } from 'utils';
import { ref, watch } from 'vue';
import { type SharedPropsFieldSize, type SharedPropsPrefixIcon, type SharedPropsSuffixIcon } from '../../Shared/SharedProps';
import { SharedSetup } from '../../Shared/SharedSetup';

export type OrionFieldEmits = {
	(e: 'clear'): void
};

export type OrionFieldProps = {
	_uid?: number
	prefixIcon?: SharedPropsPrefixIcon['prefixIcon']
	prefixFontIcon?: SharedPropsPrefixIcon['prefixFontIcon']
	suffixIcon?: SharedPropsSuffixIcon['suffixIcon']
	suffixFontIcon?: SharedPropsSuffixIcon['suffixFontIcon']
	size?: SharedPropsFieldSize['size']
	readonly?: boolean
	disabled?: boolean
	required?: boolean
	clearable?: boolean
	isFocus?: boolean
	hasValue?: boolean
	floatingLabel?: boolean
	labelIsFloating?: boolean
	showError?: boolean
	showWarning?: boolean
	showSuccess?: boolean
	inputType: string
	label?: string
	placeholder?: string
	class?: string | Record<string, boolean> | (string | Record<string, boolean>)[]
	hint?: string
	validationHtmlMessages?: string
};

export class OrionFieldSetup extends SharedSetup {

	static readonly defaultProps = {
		size: 'md' as Orion.FieldSize,
		floatingLabel: true,
	};

	readonly baseClass = 'orion-field';

	readonly _el = ref<RefDom>();
	readonly _suffixPictos = ref<RefDom>();
	private _suffixPictosObserver?: MutationObserver;

	@Reactive private readonly state = { suffixPictosWidth: 0 };

	get suffixPictosWidth () { return this.state.suffixPictosWidth + 'rem' }
	get displayHint () { return !!this.props.hint || (this._slots.hint?.()[0]?.children?.length ?? 0) > 0 }
	get displayLabel () { return !!this.props.label || (this._slots.label?.()[0]?.children?.length ?? 0) > 0 }
	get displayValidation () { return (this.props.showError || this.props.showWarning) && this.props.validationHtmlMessages?.length }
	get fieldClass () {
		const cls = [
			`orion-${this.props.inputType}`,
			this.baseClass,
			`${this.baseClass}--${this.props.size}`,
		];
		if (this.props.showError) cls.push(`${this.baseClass}--danger`);
		if (this.props.showWarning) cls.push(`${this.baseClass}--warning`);
		if (this.props.showSuccess) cls.push(`${this.baseClass}--success`);
		if (this.props.prefixIcon || this.props.prefixFontIcon) cls.push(`${this.baseClass}--prefix-icon`);
		if (this.props.suffixIcon || this.props.suffixFontIcon) cls.push(`${this.baseClass}--suffix-icon`);
		if (this.props.clearable) cls.push(`${this.baseClass}--clearable`);
		if (this.props.isFocus) cls.push(`${this.baseClass}--focused`);
		if (this.props.disabled) cls.push(`${this.baseClass}--disabled`);
		if (this.props.required) cls.push(`${this.baseClass}--required`);
		if (this.props.readonly) cls.push(`${this.baseClass}--readonly`);
		if (this.displayHint) cls.push(`${this.baseClass}--has-hint`);
		if (this.displayValidation) cls.push(`${this.baseClass}--has-validation-messages`);

		return cls;
	}

	get labelClass () {
		const cls = [`${this.baseClass}__label`];

		if (['checkbox', 'radio', 'toggle'].includes(this.props.inputType)) {
			return cls;
		}

		if (this.props.floatingLabel) cls.push(`${this.baseClass}__label--floating`);
		if (this.props.labelIsFloating && this.props.floatingLabel) cls.push(`${this.baseClass}__label--floating-active`);
		if (!this.props.floatingLabel) cls.push(`${this.baseClass}__label--static`);
		return cls;
	}

	get validationIcon () {
		if (this.props.showError) return 'error';
		if (this.props.showSuccess) return 'check';
		if (this.props.showWarning) return 'warning';
	}

	get showSuffixPicto () {
		return !['checkbox', 'radio', 'toggle'].includes(this.props.inputType ?? '') && (
			this.props.showError
			|| this.props.showSuccess
			|| this.props.showWarning
			|| this._slots['icon-suffix']
			|| (this.props.clearable && this.props.hasValue && !this.props.readonly && !this.props.disabled)
		);
	}

	constructor (
		protected props: OrionFieldProps,
		protected emits: OrionFieldEmits,
		private _slots: Record<'default' | 'label' | 'hint' | 'icon-suffix', () => any>,

	) {
		super();

		watch(
			() => this._suffixPictos.value,
			(val) => {
				!!val
					? this.watchSuffixPictosMutations()
					: this.resetSuffixPictosObservation();
			},
		);
	}

	protected onUnmounted () {
		super.onUnmounted();
		this.resetSuffixPictosObservation();
	}

	private watchSuffixPictosMutations () {
		if (!this._suffixPictos.value) return;

		const updateWidth = () => {
			const width = Math.ceil((this._suffixPictos.value?.getBoundingClientRect().width ?? 0)) / 16 + 0.25;
			this.state.suffixPictosWidth = width;
		};

		updateWidth();
		this._suffixPictosObserver?.disconnect();
		this._suffixPictosObserver = new MutationObserver(updateWidth);
		this._suffixPictosObserver.observe(this._suffixPictos.value, {
			childList: true,
			subtree: true,
			attributes: true,
		});
	}

	private resetSuffixPictosObservation () {
		this._suffixPictosObserver?.disconnect();
		this._suffixPictosObserver = undefined;
		this.state.suffixPictosWidth = 0;
	}

}
