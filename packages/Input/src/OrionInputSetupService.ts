import { ModelRef, nextTick, reactive } from 'vue';
import { isString } from 'lodash-es';

import SharedFieldSetupService, { SharedFieldSetupServiceEmits, SharedFieldSetupServiceProps } from '../../Shared/SharedFieldSetupService';
import useValidation from 'services/ValidationService';
import { hoursToNumber } from 'utils/tools';
import { useMonkey } from 'services';

export type OrionInputEmits = SharedFieldSetupServiceEmits<Nil<string | number>> & {
	// @doc event/mousedown-right/desc emitted right-click
	// @doc/fr event/clear/desc émis lors du click droit
	(e: 'mousedown-right', payload: MouseEvent): void;
}
export type OrionInputProps = SharedFieldSetupServiceProps & {
	// @doc props/allowNegative allow negative values
	// @doc/fr props/allowNegative autorise les valeurs négatives
	allowNegative?: boolean,
	// @doc props/autocomplete provides automated assistance in filling out form field values from native html input
	// @doc/fr props/autocomplete fournit une assitance automatique de remplissage du champ
	autocomplete?: string,
	// @doc props/staticMask Determines if the mask should be present all the time, even if the field is empty
	// @doc/fr props/staticMask Détermine si le masque doit être présent en permanence, même si le champ est vide
	staticMask?: boolean,
	// @doc props/mask the mask applied on the input
	// @doc/fr props/mask masque appliqué sur le champ
	mask?: string | InputMask,
	// @doc props/maskHourFormat the hour format
	// @doc/fr props/maskHourFormat format de l'heure
	maskHourFormat?: string,
	// @doc props/maskHourSeparator hour separator
	// @doc/fr props/maskHourSeparator sépérateur d'heures
	maskHourSeparator?: string,
	// @doc props/maxLength maximum length of the input
	// @doc/fr props/maxLength longueur maximum du champ
	maxLength?: number,
	// @doc props/maxValue maximum value of the input
	// @doc/fr props/maxValue valeur maximale du champ
	maxValue?: number,
	// @doc props/minValue minimum value of the input
	// @doc/fr props/minValue valeur minimale du champ
	minValue?: number,
	// @doc props/selectOnFocus select the input value on focus
	// @doc/fr props/selectOnFocus sélectionne la valeur du champ au focus
	selectOnFocus?: boolean,
};

type VModelType = Nil<string | number>;
type InputMask = 'integer' | 'decimal' | 'hour' | {
	value: (val: any) => VModelType;
	display: (val: any) => VModelType;
};

type VmodelArray = {
	value?: Undef<string>,
	mask: RegExp | 'mask',
	isValid: boolean
}

export default class OrionInputSetupService extends SharedFieldSetupService<OrionInputProps, VModelType> {
	static readonly defaultProps = {
		...SharedFieldSetupService.defaultProps,
		maskHourFormat: '24h',
		maskHourSeparator: ':',
		staticMask: true,
	};

	protected state = reactive({
		...this.sharedState,
		vmodelArray: [] as VmodelArray[],
		selection: {
			start: 0 as number | undefined | null,
			end: 0 as number | undefined | null,
		},

	});

	protected get isValidCustom () {
		if (this.props.type === 'email') {
			const emailValidation = useValidation().check(this.vModel.value, 'email');

			return this.props.required
				? emailValidation && this.hasValue
				: this.hasValue ? emailValidation : undefined;
		}
	}

	protected get labelIsFloating () {
		return (this.state.vmodelArray.length && this.props.staticMask) ? true : super.labelIsFloating;
	}

	get vmodelArray () { return this.state.vmodelArray; }
	get selection () {
		const inputElt = this._input.value;
		if (!inputElt) return;

		const start = this.state.selection.start ?? inputElt.selectionStart;
		const end = this.state.selection.end ?? inputElt.selectionEnd;

		return {
			start: start ?? 0,
			end: end ?? 0,
		};
	}

	get vModelIsValid () {return !this.vmodelArray.find(x => !x.isValid);}

	get vModelProxy () {
		const value = this.vModel.value;

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

			if (this.vmodelArray.length) {
				return this.readablevModelArray();
			}
		}

		if (isString(value) && this.props.maxLength) {
			return value.slice(0, this.props.maxLength);
		}

		return value as VModelType;
	}

	set vModelProxy (value) {
		this.handleInputDebounce(() => {
			// value will always be a string when coming from the input
			value = value?.toString();
			if (value) {
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

			if (this.vmodelArray.length) {
				value = this.getVModelWithoutMask(value?.toString());
				this.setCursorPosition();
			}

			this.vModel.value = value;
			this.emits('input', value);
		});
	}

	get publicInstance () {
		return {
			...super.publicInstance,
			valueDisplay: () => this.readablevModelArray(),
		};
	}

	constructor (
		protected props: OrionInputProps & typeof OrionInputSetupService.defaultProps,
		protected emits: OrionInputEmits,
		protected vModel: ModelRef<VModelType>,
	) {
		super(props, emits, vModel);

		this.parsePattern();
	}

	protected onMounted (): void {
		super.onMounted();

		if (this.props.mask)
			this.setVModelArray(this.vModel.value?.toString());
	}

	clear () {
		this.parsePattern();
		super.clear();
	}

	setCursorPosition (event?: MouseEvent | KeyboardEvent) {
		if (!this.vmodelArray.length) return;
		const start = (event?.target as HTMLInputElement)?.selectionStart ?? this._input.value?.selectionStart;
		const end = (event?.target as HTMLInputElement)?.selectionEnd ?? this._input.value?.selectionEnd;

		nextTick(() => {
			this.state.selection.start = start;
			this.state.selection.end = end;
			this._input.value?.setSelectionRange(start ?? 0, end ?? 0);
		});
	}

	handleFocus (e: FocusEvent): void {
		this.state.selection = {
			start: this._input.value?.selectionStart ?? 0,
			end: this._input.value?.selectionStart ?? 0,
		};
		super.handleFocus(e);
	}

	handleBlurCustom (event: FocusEvent) {
		if (this._input.value?.value && this.props.minValue && (hoursToNumber(this._input.value.value, this.props.maskHourSeparator)) < this.props.minValue) {
			this.vModel.value = this.props.minValue;
			this.emits('input', this.props.minValue);
		}

		this.handleBlur(event);
	}

	handleKeydownGuard (e: KeyboardEvent) {
		if (this.props.mask) {
			const numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
			const arrows = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'];
			const misc = ['Backspace', 'Delete', 'Tab'];
			const numeric = [... numbers, ...arrows, ...misc];

			const inputElt = this._input.value!;
			const inputValue = inputElt.value;
			const selectionStart = inputElt.selectionStart ?? 0;
			const selectionEnd = inputElt.selectionEnd ?? 0;
			const selectionLength = selectionEnd - selectionStart;
			const inputValueBeforeCursor = inputValue.slice(0, selectionStart) ?? '';
			const inputValueAfterCursor = inputValue.slice(selectionEnd) ?? '';
			const inputValueBeforeSelection = inputValue.slice(0, selectionStart);
			const inputValueAfterSelection = inputValue.slice(selectionEnd);

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

				if (typeof this.vModelProxy === 'number' && this._input.value.value !== '-') {
					this.vModelProxy = -this.vModelProxy;
				} else if (typeof this.vModelProxy === 'string' && this._input.value.value !== '-') {
					this.vModelProxy = '-' + this.vModelProxy;
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
						this.vModelProxy = Number(this._input.value.value);
					}

					setTimeout(() => {
						if (this._input.value?.value === '0.') {
							this._input.value?.setSelectionRange(this._input.value.value.length, this._input.value.value.length);
						} else {
							this._input.value?.setSelectionRange(inputValueBeforeCursor.length + 1, inputValueBeforeCursor.length + 1);
						}
					});
				}

				if (['Backspace', 'Delete'].includes(e.key)) {
					setTimeout(() => {
						if (!selectionLength) {
							if (e.key === 'Backspace') {
								this._input.value!.value = inputValueBeforeCursor.slice(0, -1) + inputValueAfterCursor;
								this._input.value?.setSelectionRange(selectionStart - 1, selectionStart - 1);
							} else {
								this._input.value!.value = inputValueBeforeCursor + inputValueAfterCursor.slice(1);
								this._input.value?.setSelectionRange(selectionStart, selectionStart);
							}
						} else {
							this._input.value!.value = inputValueBeforeSelection + inputValueAfterSelection;
						}
					}, 1);
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
			} else if (this.vmodelArray.length) {

				if (misc.includes(e.key)) {
					e.preventDefault();
					this.handleDeletionWithMask(e.key);
				}

				//exclude special keys (like shift, capsLock etc...)
				if (e.key.length > 1 || !this.selection) {
					return;
				} else if (!this.testKeyPattern(e.key, this.selection.start) && !arrows.includes(e.key)) {
					e.preventDefault();
				} else if (!arrows.includes(e.key)) {
					e.preventDefault();
					this.setVModelArray(e.key);
				}
			}
		}

		if (this.props.type === 'email') {
			if (!/[.+@a-zA-Z0-9_-]/.test(e.key)) e.preventDefault();
			if (e.key === '@'
				&& typeof this.vModelProxy === 'string'
				&& this.vModelProxy?.includes('@')
			) e.preventDefault();
		}
	}

	handleDeletionWithMask (key: string) {
		if (key === 'Backspace') {
			if (!this.state.selection.end) return;

			if (this.state.selection.start === this.state.selection.end && this.state.selection.start !==0) {
				while (this.state.selection.end > 0 && this.vmodelArray[this.state.selection.end-1].mask === 'mask') {
					if (this.state.selection.end > 0)
						this.state.selection.end -= 1;
				}
				this.state.selection.end-= 1;

				if (this.state.selection.start === 0) return;

				this.vmodelArray[this.state.selection.end].value = this.props.staticMask ? '_' : undefined;
				this.vmodelArray[this.state.selection.end].isValid = false;
				this.state.selection.start = this.state.selection.end;
				nextTick(() => {
					this._input.value?.setSelectionRange(this.state.selection.end ?? 0, this.state.selection.end ?? 0);
				});
			} else {
				while (this.state.selection.end !== this.state.selection.start && !!this.state.selection.end) {
					if (this.vmodelArray[this.state.selection.end-1].mask !== 'mask') {
						this.vmodelArray[this.state.selection.end-1].value = this.props.staticMask ? '_' : undefined;
						this.vmodelArray[this.state.selection.end-1].isValid = false;
					}
					this.state.selection.end -= 1;
				}
				nextTick(() => {
					this._input.value?.setSelectionRange(this.state.selection.start ?? 0, this.state.selection.end ?? 0);
				});
			}
		// Handle delete key
		} else {
			if (this.state.selection.start === this.state.selection.end && this.state.selection.end !== undefined) {
				//check if next elems can be shifted
				if (!this.state.selection.end) return;
				let i = this.state.selection.end;
				for (i; i < this.vmodelArray.length; i++) {
					if (this.vmodelArray[i+1].value && this.testKeyPattern(this.vmodelArray[i+1].value!, i)) {
						this.vmodelArray[i].value = this.vmodelArray[i + 1].value;
						this.vmodelArray[i].isValid = true;
					} else if (this.vmodelArray[i+1]?.mask === 'mask') {
						let j=i+1;
						for (j; j< this.vmodelArray.length; j++) {
							if (this.vmodelArray[j].mask !== 'mask') {
								break;
							}
						}
						if (this.vmodelArray[j]?.value && j !== this.vmodelArray.length) {
							this.vmodelArray[i].value = this.vmodelArray[j]?.value;
							this.vmodelArray[i].isValid = true;
						} else {
							this.vmodelArray[i].value = this.props.staticMask ? '_' : undefined;
							this.vmodelArray[i].isValid = false;
							break;
						}
						i = j-1;
					} else {
						this.vmodelArray[i].value = this.props.staticMask ? '_' : undefined;
						this.vmodelArray[i].isValid = false;
						break;
					}
				}

				nextTick(() => {
					this._input.value?.setSelectionRange(this.state.selection.start ?? 0, this.state.selection.end ?? 0);
				});
			} else {
				while (this.state.selection.end !== this.state.selection.start && !!this.state.selection.end) {
					if (this.vmodelArray[this.state.selection.end-1].mask !== 'mask') {
						this.vmodelArray[this.state.selection.end-1].value = this.props.staticMask ? '_' : undefined;
						this.vmodelArray[this.state.selection.end-1].isValid = false;
					}
					this.state.selection.end -= 1;
				}
				nextTick(() => {
					this._input.value?.setSelectionRange(this.state.selection.start ?? 0, this.state.selection.end ?? 0);
				});
			}

		}
		this.vModelProxy = this.vModelWithMask();
	}

	vModelWithMask (val?: string) {
		const inputValue = val ?? this._input.value?.value;
		if (!inputValue || !this.vmodelArray.length || !this.vModel.value) return;
		let stringToReturn = '';
		for (let i=0; i < this.vmodelArray.length; i++) {
			if (i < inputValue.length) {
				if (this.vmodelArray[i].mask === 'mask') {
					stringToReturn += this.vmodelArray[i].value;
				} else {
					stringToReturn += inputValue[i];
				}
			} else if (this.vmodelArray[i].mask === 'mask') {
				stringToReturn += this.vmodelArray[i].value;
			} else
				break;
		}
		return stringToReturn;
	}

	getVModelWithoutMask (val?: string) {
		let stringToReturn = '';

		if (!val || !this.vmodelArray.length) return;
		for (let i=0; i < val.length; i++) {
			if (this.vmodelArray[i]?.mask !== 'mask' && this.vmodelArray[i]?.value && this.vmodelArray[i].isValid)
				stringToReturn += this.vmodelArray[i].value;
		}
		return stringToReturn;
	}

	testKeyPattern (key: string, start: number, end?: number) {
		if (!this._input.value
			|| (!this._input.value?.value?.length && !key)
			|| !this.selection
		) return false;

		const patternToCheck = this.vmodelArray.slice(start, end ? end : start+1);
		if (!patternToCheck.length) return false;

		if (patternToCheck.length === 1) {
			if (key?.match(patternToCheck[0].mask)) {
				return true;
			} else if (!patternToCheck[0].value && !key?.match(patternToCheck[0].mask)) {
				return false;
			}
		}

		return false;
	}

	parsePattern () {
		if (!this.props.mask
			|| typeof this.props.mask === 'object'
			|| this.props.mask === 'hour'
			|| this.props.mask === 'decimal'
			|| this.props.mask === 'integer')
			return;
		const quantifierRegex = /\$\w{1}{(?<iteration>\d)}/;

		this.state.vmodelArray = [];
		for (let i=0; i < this.props.mask.length; i++) {
			if (this.props.mask[i] === '$') {
				//with quantifier
				const quantifier = this.props.mask.slice(i, i+5);

				if (quantifierRegex.test(quantifier)) {
					const value = this.props.mask[i + 1];
					const iteratif = quantifier.match(quantifierRegex)?.groups?.iteration;

					if (iteratif) {
						for (let j=0; j< +iteratif; j++) {
							this.convertPatternToRegex(value);
						}
					}
					i+=4;
				} else {
					this.convertPatternToRegex(this.props.mask[i+1]);
					i++;
				}
			} else {
				this.state.vmodelArray.push({
					value: this.props.mask[i],
					mask: 'mask',
					isValid: true,
				});
			}
		}

	}

	convertPatternToRegex (val: string) {
		switch (val) {
		case 'd':
		case '.':
		case 's':
			this.state.vmodelArray.push({
				value: undefined,
				mask: new RegExp(`\\${val}`),
				isValid: false,
			});
			break;
		case 'w':
			this.state.vmodelArray.push({
				value: undefined,
				mask: new RegExp(/[a-zA-Z]/),
				isValid: false,
			});
			break;
		default:
			this.state.vmodelArray.push({
				value: '$',
				mask: 'mask',
				isValid: true,
			});
			break;
		}
	}

	readablevModelArray () {
		if (this.props.staticMask) {
			return this.state.vmodelArray.map((x) => {
				return !x.value ? '_' : x.value;
			}).join('');
		} else {
			let stringToReturn = '';

			for (let i=0; i < this.state.vmodelArray.length; i++) {
				if (!this.state.vmodelArray[i]?.isValid) {
					break;
				} else if (this.state.vmodelArray[i]?.mask === 'mask') {
					while (this.state.vmodelArray[i]?.mask === 'mask') {
						stringToReturn += this.state.vmodelArray[i].value;
						if (this.state.vmodelArray[i+1]?.mask === 'mask')
							i++;
						else break;
					}
				} else {
					stringToReturn += this.state.vmodelArray[i].value;
				}
			}
			return stringToReturn;
		}
	}

	setVModelArray (key?: string) {

		if (!this.selection || !key) return;
		if (this.selection.start === this.selection.end && key.length === 1) {
			if (this.vmodelArray[this.selection.end]?.mask !== 'mask' && this.testKeyPattern(key, this.selection.start)) {
				this.vmodelArray[this.selection.end].value = key;
				this.vmodelArray[this.selection.end].isValid = true;

				this.state.selection = {
					start: this.selection.end + 1,
					end: this.selection.end + 1,
				};
				this.vModelProxy = this.readablevModelArray();

				this.setNextValidCursorPosition();
				nextTick(() => {
					this._input.value?.setSelectionRange(this.state.selection.end ?? 0, this.state.selection.end ?? 0);
				});

			}
		} else {
			let i = this.state.selection.start;
			if (i === undefined || i === null) return;

			while (key.length > 0) {
				if (!this.vmodelArray[i]) break;
				if (this.vmodelArray[i].mask !== 'mask' && this.testKeyPattern(key[0], i)) {
					this.vmodelArray[i].value = key[0];
					this.vmodelArray[i].isValid = true;
					key = key.slice(1);
				}
				i++;
			}
			this.setNextValidCursorPosition();
			nextTick(() => {
				this.state.selection = {
					start: this.state.selection.end,
					end: this.state.selection.end,
				};
				if (this.state.selection.end)
					this._input.value?.setSelectionRange(this.state.selection.end, this.state.selection.end);
			});
		}
	}

	setNextValidCursorPosition () {
		if (!this.selection?.start) return;
		let i = this.selection.start;
		for (i; i < this.vmodelArray.length; i++) {
			if (this.vmodelArray[i].mask === 'mask')
				continue;
			else {
				this.state.selection = {
					start: i,
					end: i,
				};
				return;
			}
		}
		return this.state.selection = {
			start: i,
			end: i,
		};
	}
}

