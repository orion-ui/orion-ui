import { Directive, nextTick, PropType, watch } from 'vue';
import { isString } from 'lodash-es';
import Cleave from 'cleave.js';

import SharedFieldSetupService, { FieldEmit } from '../../Shared/SharedFieldSetupService';
import useValidation from 'services/ValidationService';
import { hoursToNumber } from 'utils/tools';
import { useMonkey } from 'services';

type Props = SetupProps<typeof OrionInputSetupService.props>
type VModelType = Nil<string | number>;
type InputMask = 'integer' | 'decimal' | 'hour' | {
	value: (val: any) => VModelType;
	display: (val: any) => VModelType;
};
type CleaveElement = HTMLInputElement & {
	cleave: Cleave;
}

export default class OrionInputSetupService extends SharedFieldSetupService<Props, VModelType> {
	static props = {
		...SharedFieldSetupService.props,
		// @doc props/allowNegative allow negative values
		// @doc/fr props/allowNegative autorise les valeurs négatives
		allowNegative: Boolean,
		// @doc props/selectOnFocus select the input value on focus
		// @doc/fr props/selectOnFocus sélectionne la valeur du champ au focus
		selectOnFocus: Boolean,
		// @doc props/autocomplete provides automated assistance in filling out form field values from native html input
		// @doc/fr props/autocomplete fournit une assitance automatique de remplissage du champ
		autocomplete: {
			type: String,
			default: undefined,
		},
		// @doc props/mask the mask applied on the input
		// @doc/fr props/mask masque appliqué sur le champ
		mask: {
			type: [String, Object] as PropType<string | InputMask>,
			default: undefined,
		},
		maskFormat: {
			type: String as PropType<string>,
			default: undefined,
		},
		// @doc props/maskHourFormat the hour format
		// @doc/fr props/maskHourFormat format de l'heure
		maskHourFormat: {
			type: String,
			default: '24h',
		},
		// @doc props/maskHourSeparator hour separator
		// @doc/fr props/maskHourSeparator sépérateur d'heures
		maskHourSeparator: {
			type: String,
			default: ':',
		},
		// @doc props/maxLength maximum length of the input
		// @doc/fr props/maxLength longueur maximum du champ
		maxLength: {
			type: Number,
			default: undefined,
		},
		// @doc props/maxValue maximum value of the input
		// @doc/fr props/maxValue valeur maximale du champ
		maxValue: {
			type: Number,
			default: undefined,
		},
		// @doc props/minValue minimum value of the input
		// @doc/fr props/minValue valeur minimale du champ
		minValue: {
			type: Number,
			default: undefined,
		},
		cleave: {
			type: Object,
			default: undefined,
		},
	};

	static cleaveDirective: Directive = {
		mounted: (el, binding) => {
			if (!binding.value) return;
			el.cleave = new Cleave(el, binding.value ?? {});
		},
		updated: (el: CleaveElement) => {
			if (!el.cleave) return;
			const event = new Event('input', { bubbles: true });
			el.cleave.setRawValue(el.value);
			el.value = el.cleave.properties.result;
			el.dispatchEvent(event);
		},
	};

	protected get isValidCustom () {
		if (this.props.type === 'email') {
			return useValidation().check(this.vModel, 'email');
		}
	}

	get vModel () {
		const value = this.props.modelValue;

		if (this.props.mask) {
			if (typeof this.props.mask === 'object') {
				return this.props.mask.display(value);
			}

			if (this.props.mask === 'integer' && value && !Number.isNaN(Number(value))) {
				return Math.round(Number(value));
			}

			if (this.props.mask === 'hour' && Number.isFinite(value)) {
				const valueToReturn = useMonkey(Number(value)).toHoursMinutes(this.props.maskHourSeparator);
				const cursorPosition = this._input.value?.selectionStart ?? 0;
				const charAtZero = this._input.value?.value.charAt(0);
				const charAtCursor = this._input.value?.value.charAt(cursorPosition);
				const separatorIndex = valueToReturn.indexOf(this.props.maskHourSeparator);
				const maskHourSetted = this.props.maskHourFormat === '24h'
					&& Number(valueToReturn.split(this.props.maskHourSeparator)[0]) > 2
					&& cursorPosition - separatorIndex <= 1;

				if (cursorPosition) {
					nextTick(() => {
						if (maskHourSetted) {
							this._input.value?.setSelectionRange(3, 3);
						} else if (charAtCursor === '' && cursorPosition === 1) {
							this._input.value?.setSelectionRange(2, 2);
						} else if (
							(charAtZero === '0' && charAtCursor === this.props.maskHourSeparator) ||
							(cursorPosition === 2 && charAtZero === '0' && charAtCursor === '0')
						) {
							this._input.value?.setSelectionRange(cursorPosition - 1, cursorPosition - 1);
						} else {
							this._input.value?.setSelectionRange(cursorPosition, cursorPosition);
						}
					});
				}
				return valueToReturn;
			}
		}

		if (isString(value) && this.props.maxLength) {
			return value.slice(0, this.props.maxLength);
		}

		return value as VModelType;
	}

	set vModel (value) {
		this.handleInputDebounce(() => {
			// value will always be a string when coming from the input
			value = value?.toString();

			if (value) {
				if (this.props.cleave?.phone) {
					value = value.replace(/\s*/g, '');
				}

				if (this.props.type === 'email') {
					value = value.normalize('NFD').replace(/[\u0300-\u036f ]/g, '');
				} else if (typeof this.props.mask === 'string' && ['integer', 'decimal'].includes(this.props.mask) && value !== '-') {
					value = value.replace(/[^0-9.-]/g, '');

					if (!Number.isNaN(Number(value))) {
						value = value.length ? Number(value) : null;
					}
				} else if (this.props.mask === 'hour') {
					value = hoursToNumber(value, this.props.maskHourSeparator);

					if (this.props.maskHourFormat === '24h') {
						const maxValue = hoursToNumber('23:59');
						value = value > maxValue ? maxValue : value;
					}
				} else if (typeof this.props.mask === 'object' && this.props.mask) {
					if (this._input.value) {
						this._input.value.value = String(this.props.mask.display(value));
					}

					value = typeof this.props.mask.value === 'function'
						? this.props.mask.value(value)
						: this.props.mask.display(value);
				}

				if (value && this.props.maxValue && Number(value) > this.props.maxValue) {
					value = this.props.maxValue;
					if (this._input.value) {
						this._input.value.value = String(value);
					}
				}
			} else {
				value = this.props.clearToNull ? null : undefined;
			}

			if (value === this.vModel) return;

			this.emit('update:modelValue', value);
			this.emit('input', value);
		});
	}

	get publicInstance () {
		return { ...super.publicInstance };
	}


	constructor (props: Props, emit: FieldEmit<VModelType>) {
		super(props, emit);

		watch(() => props.cleave, (val) => {
			const input = this._input.value as CleaveElement;
			input.cleave.destroy();
			input.cleave = new Cleave(input, val ?? {});
		});
	}


	handleBlurCustom (event: FocusEvent) {
		if (this._input.value?.value && this.props.minValue && (hoursToNumber(this._input.value.value, this.props.maskHourSeparator)) < this.props.minValue) {
			this.emit('update:modelValue', this.props.minValue);
			this.emit('input', this.props.minValue);
		}

		this.handleBlur(event);
	}

	handleKeydownGuard (e: KeyboardEvent) {
		if (this.props.mask) {
			const numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
			const arrows = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'];
			const misc = ['Backspace', 'Delete', 'Tab'];
			const numeric = [... numbers, ...arrows, ...misc];
			const inputValueBeforeCursor = this._input.value!.value.slice(0, this._input.value!.selectionStart ?? 0);
			const inputValueAfterCursor = this._input.value!.value.slice(this._input.value!.selectionEnd ?? 0);

			if (e.metaKey || e.ctrlKey) return;

			if (e.key === '-'
				&& this._input.value
				&& this.props.allowNegative
				&& typeof this.props.mask === 'string'
				&& ['integer', 'decimal'].includes(this.props.mask)) {
				const inputValueLength = this._input.value.value.length;
				const inputValueSelectionLength = (this._input.value.selectionEnd ?? 0) - (this._input.value.selectionStart ?? 0);
				if (inputValueLength && inputValueSelectionLength === inputValueLength) return;

				e.preventDefault();

				this._input.value.value.includes('-')
					? this._input.value.value = this._input.value.value.replace(/-/g, '')
					: this._input.value.value = '-' + this._input.value.value;

				if (typeof this.vModel === 'number' && this._input.value.value !== '-') {
					this.vModel = -this.vModel;
				} else if (typeof this.vModel === 'string' && this._input.value.value !== '-') {
					this.vModel = '-' + this.vModel;
				}
			}

			if (this.props.mask === 'integer') {
				if (!numeric.includes(e.key)) e.preventDefault();
			}

			if (this.props.mask === 'decimal') {
				if (![...numeric, '.'].includes(e.key)) e.preventDefault();

				if (e.key === '.' && this._input.value?.value.includes('.')) e.preventDefault();

				if ([',', '.'].includes(e.key) && this._input.value && !this._input.value.value.includes('.')) {
					e.preventDefault();

					this._input.value.value = this._input.value.value.length
						? inputValueBeforeCursor + '.' + inputValueAfterCursor
						: '0.';

					if (this._input.value.value !== '0.') {
						this.vModel = Number(this._input.value.value);
					}

					setTimeout(() => {
						if (this._input.value?.value === '0.') {
							this._input.value?.setSelectionRange(this._input.value.value.length, this._input.value.value.length);
						} else {
							this._input.value?.setSelectionRange(inputValueBeforeCursor.length + 1, inputValueBeforeCursor.length + 1);
						}
					});
				}

				if (['Backspace', 'Delete'].includes(e.key) && this._input.value?.value.includes('.')) {
					if (
						(e.key === 'Backspace' && /\.\d$/.test(inputValueBeforeCursor) && !/^\d$/.test(inputValueAfterCursor)) ||
						(e.key === 'Delete' && /\d*\.$/.test(inputValueBeforeCursor) && /^\d$/.test(inputValueAfterCursor))
					) {
						setTimeout(() => this._input.value!.value += '.', 1);
					}
				}
			}

			if (this.props.mask === 'hour') {
				if (![...numeric, this.props.maskHourSeparator].includes(e.key)) e.preventDefault();

				const input = e.target as HTMLInputElement;
				const selectionStart = input.selectionStart ?? 0;
				const separatorIndex = input.value.indexOf(this.props.maskHourSeparator);
				const hours = input.value.split(this.props.maskHourSeparator)[0];
				const minutes = input.value.split(this.props.maskHourSeparator)[1];
				const hasTwoMinuteDigits = minutes?.length === 2;

				// If the separator is present
				if (separatorIndex > -1) {
					// If user type the separator, place the cursor after separator
					if (e.key === this.props.maskHourSeparator) {
						e.preventDefault();
						input.setSelectionRange(separatorIndex + 1, separatorIndex + 1);
					}

					if (numbers.includes(e.key)) {
						// If the user type more than 2 digits for the minutes
						if (selectionStart - separatorIndex > 2) e.preventDefault();

						// If the user type the minutes
						if (selectionStart > separatorIndex) {
							if (hasTwoMinuteDigits) {
								input.setSelectionRange(selectionStart, selectionStart + 1);
							}

							// If the user type the first digit of the minutes
							if (selectionStart === separatorIndex + 1) {
								input.setSelectionRange(selectionStart, selectionStart + 2);
								if (Number(e.key) > 5) {
									input.value = hours + this.props.maskHourSeparator + 0;
									input.setSelectionRange(separatorIndex + 2, separatorIndex + 2);
								}
							}
						}
					}
				}
			}
		}

		if (this.props.type === 'email') {
			if (!/[.+@a-zA-Z0-9_-]/.test(e.key)) e.preventDefault();
			if (e.key === '@'
				&& typeof this.vModel === 'string'
				&& this.vModel?.includes('@')
			) e.preventDefault();
		}
	}
}
