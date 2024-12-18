import { ref } from 'vue';
import SharedSetupService from '../../Shared/SharedSetupService';
import SharedProps from '../../Shared/SharedProps';

type Props = SetupProps<typeof OrionFieldSetupService.props>

export default class OrionFieldSetupService extends SharedSetupService<Props> {
	static props = {
		...SharedProps.prefixIcon(),
		...SharedProps.suffixIcon(),
		...SharedProps.size(),
		readonly: Boolean,
		disabled: Boolean,
		required: Boolean,
		clearable: Boolean,
		isFocus: Boolean,
		hasValue: Boolean,
		labelIsFloating: Boolean,
		showError: Boolean,
		showWarning: Boolean,
		showSuccess: Boolean,
		inputType: {
			type: String,
			default: 'input',
		},
		label: {
			type: String,
			default: undefined,
		},
		placeholder: {
			type: String,
			default: undefined,
		},
	};

	readonly _el = ref<RefDom>();
	readonly _suffixPictos = ref<RefDom>();

	get baseClass () {
		return `orion-${this.props.inputType}`;
	}

	get additionalClass () {
		const cls = [`${this.baseClass}--${this.props.size}`];

		if (this.props.showError) cls.push(`${this.baseClass}--error`);
		if (this.props.showWarning) cls.push(`${this.baseClass}--warning`);
		if (this.props.showSuccess) cls.push(`${this.baseClass}--success`);
		if (this.props.prefixIcon || this.props.prefixFontIcon) cls.push(`${this.baseClass}--prefix-icon`);
		if (this.props.suffixIcon || this.props.suffixFontIcon) cls.push(`${this.baseClass}--suffix-icon`);
		if (this.props.clearable) cls.push(`${this.baseClass}--clearable`);
		if (this.props.isFocus) cls.push(`${this.baseClass}--focused`);
		if (this.props.disabled) cls.push(`${this.baseClass}--disabled`);
		if (this.props.required) cls.push(`${this.baseClass}--required`);
		if (this.props.readonly) cls.push(`${this.baseClass}--readonly`);

		return cls;
	}

	get labelClass () {
		const cls = [`${this.baseClass}__label`];

		if (this.props.labelIsFloating) cls.push(`${this.baseClass}__label--floating`);

		return cls;
	}

	get labelValue () {
		if (this.props.hasValue) {
			return this.props.label;
		} else {
			return this.props.placeholder ?? this.props.label;
		}
	}

	get validationClass () {
		return [
			`${this.baseClass}__validation`,
			{ 'ci-check': this.props.showSuccess },
			{ 'orion-input__validation--success': this.props.showSuccess },
			{ 'ci-triangle_warning': this.props.showError },
			{ 'orion-input__validation--error': this.props.showError },
			{ 'ci-triangle_warning': this.props.showWarning },
			{ 'orion-input__validation--warning': this.props.showWarning },
		];
	}


	constructor (props: Props) {
		super(props);
	}

	protected onUpdated () {
		if (this._suffixPictos.value && this._suffixPictos.value.childElementCount > 0) {
			const target = this._el.value?.querySelectorAll(':scope > .orion-input__input')[0];
			if (target) (target as HTMLElement).style.paddingRight = this._suffixPictos.value.offsetWidth + 'px';
		}
	}
}
