import { ComponentPublicInstance, nextTick, ref, watch } from 'vue';
import { cloneDeep, debounce, DebouncedFunc, get, isArray, isEmpty, isNil, isObject, upperFirst } from 'lodash-es';
import { Dropdown } from 'floating-vue';
import mitt from 'mitt';
import anime from 'animejs';

import SharedFieldSetupService, { SharedFieldSetupServiceEmits, SharedFieldSetupServiceProps } from '../../Shared/SharedFieldSetupService';
import Log from 'utils/Log';
import useNotif from 'services/NotifService';
import useMonkey from 'services/MonkeyService';
import { addPopoverBackdropCloseAbility } from 'utils/tools';
import { ModelRef } from 'vue';
import { Reactive } from 'utils/decorators';

export type OrionSelectEmits<T, O> = SharedFieldSetupServiceEmits<VModelType<T>> & {
	(e: 'focus', payload: FocusEvent): void;
  (e: 'blur', payload?: FocusEvent): void;
  (e: 'input', payload: VModelType<T>): void;
  (e: 'input-keydown-tab'): void;
  (e: 'change', val?: VModelType<T>): void;
  (e: 'clear'): void;
	(e: 'add', payload: O): void;
	(e: 'remove', payload: O): void;
	(e: 'select', payload: O): void;
	(e: 'fetch-start', payload?: string): void;
	(e: 'fetch-end', payload: O[]): void;
	(e: 'fetch-search-clear'): void;
}
export type OrionSelectProps<O, DKey extends keyof O, VKey extends keyof O> = SharedFieldSetupServiceProps & {
	// @doc props/autocomplete adds the possibility to write in the select field
	// @doc/fr props/autocomplete permet à l'utilisateur d'écrire dans le champ
	autocomplete?: boolean,
	// @doc props/customFetch allows you to custom the fetch function
	// @doc/fr props/customFetch permet de personnaliser la fonction de récupération des options
	customFetch?: (searchTerm?: string) => Promise<O[]>,
	// @doc props/customSearch allows you to custom the search function
	// @doc/fr props/customSearch permet de personnaliser la fonction de recherche
	customSearch?: Function,
	// @doc props/disabledKey disables the selection of the value
	// @doc/fr props/disabledKey empêche la sélection d'un élément s'il possède cette clé
	disabledKey?: string,
	// @doc props/displayKey key used to display the value in the field
	// @doc/fr props/displayKey clé qui sera affiché au niveau du champ
	displayKey?: DKey extends keyof O ? DKey : string,
	// @doc props/donetyping the duration to trigger the fetch
	// @doc/fr props/donetyping indique après combien de temps après la dernière frappe, la fonction de récupération des options est appelée
	donetyping?: number,
	// @doc props/fetchInitialOptions initial options before first fetch (when using fetch mecanism)
	// @doc/fr props/fetchInitialOptions options intiales avant le premier fetch (lors de l'utilisation du mécanisme de fetch des options)
	fetchInitialOptions?: O[],
	// @doc props/fetchKey key used to pass the research field value as a parameter to fetch the options
	// @doc/fr props/fetchKey clé utilisée pour passer la valeur du champ de recherche comme paramètre pour récupérer les options
	fetchKey?: string,
	// @doc props/fetchMethod Method used to fetch the options
	// @doc/fr props/fetchMethod Méthode utilisée pour récupérer les options
	fetchMethod?: 'GET' | 'POST',
	// @doc props/fetchMinSearch minimum number of caracters to trigger the fetch
	// @doc/fr props/fetchMinSearch nombre de caractères nécessaire pour déclencher l'appel pour récupérer les options
	fetchMinSearch?: number,
	// @doc props/fetchUrl URL to fetch the options
	// @doc/fr props/fetchUrl URL pour récupérer les options
	fetchUrl?: string,
	// @doc props/multiple defines if multiple values can be select in the select
	// @doc/fr props/multiple définit si plusieurs valeurs peuvent être sélectionnées
	multiple?: boolean,
	// @doc props/options options of the select
	// @doc/fr props/options options du select
	options?: O[],
	// @doc props/prefillSearch prefill the search field
	// @doc/fr props/prefillSearch pré-rempli le champ de recherche
	prefillSearch?: string,
	// @doc props/searchable adds a search tooltip
	// @doc/fr props/searchable ajoute un champ de recherche
	searchable?: boolean,
	// @doc props/trackKey unique key item
	// @doc/fr props/trackKey clé unique qui va différencier les options
	trackKey?: O extends Record<string, any> ? keyof O : string,
	// @doc props/valueKey key used as field value
	// @doc/fr props/valueKey clé qui réprésente la valeur d'un élément
	valueKey?: VKey extends keyof O ? VKey : string,
};

export type VModelType<T> = T | T[] | undefined | null;

export default class OrionSelectSetupService<
	T, O, DKey extends keyof O, VKey extends keyof O
> extends SharedFieldSetupService<OrionSelectProps<O, DKey, VKey>, VModelType<T>> {
	static readonly defaultProps = {
		...SharedFieldSetupService.defaultProps,
		autocomplete: false,
		donetyping: 600,
		fetchInitialOptions: () => [],
		fetchKey: 'search',
		fetchMethod: 'GET' as OrionSelectProps<any, any, any>['fetchMethod'],
		fetchMinSearch: 1,
		multiple: false,
		options: () => [],
		searchable: false,
		trackKey: 'id' as any, // avoid typing error in OrionSelect.vue
	};

	private bus = mitt<{
		input: T;
		select: O;
		add: O;
		remove: T | O;
	}>();

	private fetchSearchDebounce: DebouncedFunc<(term?: string) => void>;

	@Reactive protected readonly state = {
		...this.sharedState,
		valueToSearch: undefined as string | undefined,
		lastValue: undefined as Nil<VModelType<T>>,
		indexNav: -1,
		isFetching: false,
		fetchResult: [] as O[],
	};

	readonly _popover = ref<InstanceType<typeof Dropdown>>();
	readonly _popoverinner = ref<RefDom>();
	readonly _optionscontainer = ref<RefDom>();
	readonly _autocomplete = ref<RefDom<HTMLInputElement>>();
	readonly _optionssearchinput = ref<OrionInput>();
	readonly _items = ref<(Element | ComponentPublicInstance)[]>([]);
	readonly isArray = isArray;
	readonly get = get;

	get valueToSearch () { return this.state.valueToSearch; }
	set valueToSearch (value) {
		this.state.valueToSearch = value;
		if (!value?.length) {
			this.emits('fetch-search-clear');
		}

		if (this.props.fetchUrl || this.props.customFetch) {
			this.fetchSearchDebounce(value);
		} else {
			nextTick(this.animate.bind(this));
		}
	}

	get indexNav () { return this.state.indexNav; }
	set indexNav (value) { this.state.indexNav = value; }

	get isFetching () {
		return this.state.isFetching;
	}

	get optionsDisplay (): O[] {
		this._items.value.length = 0;
		if (this.props.fetchUrl || this.props.customFetch) {
			return this.fetchOptions;
		} else if ((this.props.searchable || this.props.autocomplete) && !isEmpty(this.state.valueToSearch)) {
			if (this.props.customSearch) {
				return this.props.options.filter(x => this.props.customSearch?.(x, this.state.valueToSearch));
			} else {
				return this.props.options.filter((x) => {
					if (!this.state.valueToSearch) return true;
					const target = (this.itemIsObject(x) && this.props.displayKey) ? x[this.props.displayKey as unknown as keyof O] : String(x);
					return this.normalizeString(target).indexOf(this.normalizeString(this.state.valueToSearch)) !== -1;
				});
			}
		} else {
			return this.props.options;
		}
	}

	get fetchOptions (): O[] {
		return !!this.state.fetchResult.length
			? this.state.fetchResult as O[]
			: this.props.fetchInitialOptions as O[];
	}

	get hasValue () {
		return this.vModel.value !== ''
			&& (
				(!this.props.multiple && !isNil(this.vModel.value))
				|| (this.props.multiple && isArray(this.vModel.value) && !!this.vModel.value.length)
			);
	}

	get labelIsFloating () {
		return (this.hasValue
			|| this.props.forceLabelFloating
			|| (this.props.autocomplete && this.state.isFocus)
			|| !!this.valueToSearch?.length && !this._optionssearchinput.value);
	}

	get isObjectType () {
		return (!isArray(this.vModel.value) && isObject(this.vModel.value))
			|| (isArray(this.vModel.value) && isObject(this.vModel.value[0]))
			|| (isArray(this.props.options) && isObject(this.props.options[0]))
			|| (isArray(this.fetchOptions) && isObject(this.fetchOptions[0]));
	}

	get showPopover () {
		return (!this.props.autocomplete && this.state.isFocus)
			|| (this.props.autocomplete && this.state.isFocus)
			|| (this.props.autocomplete && this.responsive.onPhone && this.state.isFocus);
	}

	get showPopoverSearch () {
		if (this.props.autocomplete && !this.responsive.onPhone) return false;

		return (this.props.autocomplete && this.responsive.onPhone)
		|| this.props.fetchUrl
		|| this.props.customFetch
		|| (this.props.searchable && this.props.options.length > 1);
	}

	get publicInstance () {
		return {
			...super.publicInstance,
			getSearchTerm: () => this.state.valueToSearch,
			setSearchTerm: (val?: string) => this.valueToSearch = val,
			triggerSearchAsync: async (term?: string) => await this.fetchSearchAsync(term),
			blur: this.handleBlur.bind(this),
		};
	}


	constructor (
		protected props: OrionSelectProps<O, DKey, VKey> & Omit<typeof OrionSelectSetupService.defaultProps, 'options' | 'fetchInitialOptions'> & {
			options: O[],
			fetchInitialOptions: O[]
		},
		protected emits: OrionSelectEmits<T, O>,
		protected vModel: ModelRef<VModelType<T>>) {
		super(props, emits, vModel);

		this.bus.on('*', (type, e) => this.emits(type as any, e as any));
		this.fetchSearchDebounce = debounce((term?: string) => {
			this.fetchSearchAsync(term);
		}, this.props.donetyping);

		watch(() => this.isObjectType, () => {
			this.checkProps();
		});

		if (this.props.prefillSearch) {
			this.state.valueToSearch = this.props.prefillSearch;
		}
	}

	protected async onBeforeMount () {
		this.handleFieldEvents();
		this.checkProps();
	}


	private checkProps () {
		if (this.props.multiple && !isNil(this.vModel.value) && !isArray(this.vModel.value)) {
			// eslint-disable-next-line max-len
			Log.error(`orion-select - prop "multiple" on orion-select requires a v-model of type Array, type ${upperFirst(typeof this.vModel)} detected`);
		}

		if (this.isObjectType && !this.props.trackKey) {
			// eslint-disable-next-line max-len
			Log.error(`orion-select - items of prop "options" are of type Object but the prop "track-key" is missing`);
		}
	}

	private itemMatchOption (option: O, item: T) {
		if (this.isObjectType && this.itemIsObject(option)) {
			if (this.props.valueKey) {
				return !isNil(item)
					? item === option[this.props.valueKey]
					: false;
			} else {
				return !isNil(item) && this.itemIsObject(item)
					? item[this.props.trackKey] === option[this.props.trackKey]
					: false;
			}
		} else {
			return item as any === option;
		}
	}

	private async fetchSearchAsync (term?: string) {
		if (!isNil(term)
			&& this.props.fetchMinSearch
			&& term.length
			&& term.length < this.props.fetchMinSearch
		) return;

		this.state.isFetching = true;
		this.emits('fetch-start', term);

		if (this.props.fetchUrl) {
			const params: Record<string, any> = {};
			params[this.props.fetchKey] = this.state.valueToSearch?.trim();

			const url = new URL(this.props.fetchUrl);

			if (this.props.fetchMethod === 'GET') {
				url.search = new URLSearchParams(params).toString();
			}

			const resp = await fetch(url, {
				method: this.props.fetchMethod,
				credentials: 'include',
				headers: {
					'Content-Type': 'application/json',
					'Cache-Control': 'no-cache',
				},
				body: this.props.fetchMethod === 'POST' ? JSON.stringify(params) : undefined,
			});

			this.state.fetchResult = await resp.json();
		} else if (this.props.customFetch) {
			this.state.fetchResult = await this.props.customFetch(term);
		}

		this.state.isFetching = false;
		this.emits('fetch-end', this.state.fetchResult);

		nextTick(this.animate.bind(this));
	}

	private handleFieldEvents () {
		this.bus.on('select', (val) => {
			!!val && this.itemIsObject(val) && this.props.valueKey
				? this.emitValue(val[this.props.valueKey])
				: this.emitValue(val as any);

			if (this.props.autocomplete) {
				nextTick(() => {
					this._autocomplete.value?.blur();
				});
			}
		});

		this.bus.on('add', (val) => {
			let valueToEmit = cloneDeep(this.vModel.value);

			if (!isArray(valueToEmit)) valueToEmit = [];
			(valueToEmit as any[]).push(
				this.props.valueKey && this.itemIsObject(val)
					? val[this.props.valueKey]
					: val,
			);

			if (this.props.autocomplete) {
				this.state.valueToSearch = undefined;
			}

			this.emitValue(valueToEmit);
		});

		this.bus.on('remove', (val) => {
			let valueToEmit = cloneDeep(this.vModel.value as T[]);
			let index;

			if (this.props.valueKey && this.itemIsObject(val)) {
				val = val[this.props.valueKey];
			}

			if (!valueToEmit?.length) {
				valueToEmit = [];
			} else {
				if (this.isObjectType && !this.props.valueKey) {
					index = valueToEmit.findIndex((x: VModelType<T>) =>
						this.itemIsObject(x) &&
						this.itemIsObject(val) &&
						x[this.props.trackKey] === val[this.props.trackKey]);
				} else {
					index = valueToEmit.findIndex((x: VModelType<T>) => x === val);
				}

				if (index > -1) {
					valueToEmit.splice(index, 1);
				} else {
					useNotif.danger(this.lang.ORION_SELECT__REMOVE_VALUE_ERROR);
				}
			}

			this.emitValue(valueToEmit);
		});
	}

	private emitValue (valueToEmit: Nil<VModelType<T>>) {
		this.state.lastValue = valueToEmit;
		this.vModel.value = valueToEmit;
	}

	private animate () {
		if (this.props.options.length > 30) {
			this._items.value.forEach(el => (el as HTMLElement).style.opacity = '1');
		} else {
			anime({
				targets: this._items.value.filter(x => !!x),
				opacity: [0, 1],
				translateY: ['-0.5rem', 0],
				easing: 'easeOutSine',
				duration: 450,
				delay: anime.stagger(30),
				update: (anim) => {
					anim.animatables
						.filter(x => x.target.classList.contains('disabled'))
						.forEach((x) => {
							if (Number(x.target.style.opacity) > 0.5) {
								x.target.style.opacity = '0.5';
							}
						});
				},
				complete: (anim) => {
					anim.animatables.forEach(x => x.target.removeAttribute('style'));
				},
			});
		}
	}

	itemIsObject (item: O | VModelType<T>): item is Extract<O, Record<string, any>> {
		return typeof item === 'object' && item !== null;
	}

	valueDisplay (item?: Nil<T>): any {
		const optionsToSearchIn = (this.props.fetchUrl || this.props.customFetch) ? this.fetchOptions : this.props.options;
		const currentValue = optionsToSearchIn.find((x) => {
			return this.itemIsObject(x)
				&& this.props.valueKey
				&& x[this.props.valueKey] === item;
		});

		if (!currentValue) return {
			display: item,
			item,
		};

		if (this.props.valueKey && this.props.displayKey) {
			return this.itemIsObject(currentValue) && currentValue[this.props.displayKey]
				? {
					display: currentValue[this.props.displayKey] as O[DKey],
					item: currentValue as Nil<O>,
				} : {
					display: item,
					item,
				};
		} else if (this.props.displayKey) {
			return item && this.itemIsObject(item) && item[this.props.displayKey]
				? {
					display: item[this.props.displayKey] as O[DKey],
					item: item as Nil<T>,
				} : {
					display: item,
					item: currentValue as Nil<O>,
				};
		} else {
			return item && this.props.valueKey
				? {
					display: this.itemIsObject(currentValue) && currentValue[this.props.valueKey]
						? currentValue[this.props.valueKey] as O[VKey]
						: undefined as Nil<T>,
					item: currentValue as Nil<O>,
				} : {
					display: item,
					item,
				};
		}
	}

	optionIsSelected (option: O) {
		let isSelect = false;

		if (this.props.multiple) {
			if (isArray(this.vModel.value)) {
				const index = this.vModel.value.findIndex(item => this.itemMatchOption(option, item));
				isSelect = index > -1;
			}
		} else {
			isSelect = this.itemMatchOption(option, this.vModel.value as T);
		}

		return isSelect;
	}

	handlePopoverShow () {
		addPopoverBackdropCloseAbility(this._popover, () => this.handleBlur(undefined, true));

		if (isArray(this._items.value)) {
			this.state.indexNav = this._items.value.findIndex(x => (x as HTMLElement).classList.contains('selected'));
			this.animate();
		}

		nextTick(() => {
			this._autocomplete.value?.focus();
			this._optionssearchinput.value?.focus();
		});
	}

	handleFocus (e: FocusEvent) {
		super.handleFocus(e);
		nextTick(() => {
			this._autocomplete.value?.focus();
		});
	}

	handleMousedownOnPopper (e: MouseEvent) {
		e.preventDefault();
	}

	handleBlur = debounce((e?: FocusEvent, selection?: boolean) => {
		if (e?.relatedTarget) {
			const el = e.relatedTarget as HTMLElement;
			if (el.parentElement?.classList.contains('orion-select__popover-search-input')
					|| (el === this._autocomplete.value)) {
				return false;
			}

		}

		this.state.hasBeenFocus = true;
		this.state.indexNav = -1;

		if (this.props.autocomplete)
			this._autocomplete.value?.blur();

		if (!this.responsive.onPhone || selection) {
			this.state.isFocus = false;
		}

		this.blur();
	}, 50, {
		leading: true,
		trailing: false,
	});

	handleKeydown (direction: 'down' | 'up') {
		const popoverInner = this._popoverinner.value;
		const optionsHtml = this._optionscontainer.value;
		if (!optionsHtml || !popoverInner) return;

		if (this.state.indexNav === -1) {
			this.state.indexNav = 0;
			popoverInner.scrollTop = 0;
			return false;
		}

		const boundingOptions = popoverInner.getBoundingClientRect();
		const bottomOptions = boundingOptions.bottom;
		const topOptions = boundingOptions.top;

		if (direction === 'down' && this.state.indexNav < this.optionsDisplay.length - 1) {
			this.state.indexNav++;
		} else if (direction === 'up' && this.state.indexNav > 0) {
			this.state.indexNav--;
		}

		const boundingItem = (optionsHtml.children[this.state.indexNav] as HTMLElement).getBoundingClientRect();
		const itemBottom = boundingItem.bottom;
		const itemTop = boundingItem.top;

		if (direction === 'down' && itemBottom > bottomOptions) {
			popoverInner.scrollTop = popoverInner.scrollTop + (itemBottom - bottomOptions);
		} else if (direction === 'up' && itemTop < topOptions) {
			popoverInner.scrollTop = popoverInner.scrollTop - (topOptions - itemTop);
		}
	}

	handleScroll () {
		if (this.responsive.onPhone) {
			this._optionssearchinput.value?.blur();
		}
	}

	handleTabEvent () {
		this.emits('input-keydown-tab');
		if (this.props.searchable || this.props.fetchUrl)
			this._input.value?.focus();
	}

	handleInputMousedown () {
		if (this.showPopover) {
			setTimeout(() => this._input.value?.blur(), 50);
		}
	}

	selectItem (value: O) {
		if (this.props.readonly) return;
		if (this.props.disabledKey && !!get(value, this.props.disabledKey, false)) return;

		if (this.props.multiple) {
			if (this.optionIsSelected(value)) {
				this.bus.emit('remove', value);
			} else {
				this.bus.emit('add', value);
			}
		} else {
			this.bus.emit('select', value);
			this.valueToSearch = undefined;
			this.handleBlur(undefined, true);
		}
	}

	selectItemFromEnter () {
		if (this.state.indexNav >= 0 && this.state.indexNav < this.optionsDisplay.length) {
			const value = this.optionsDisplay[this.state.indexNav];
			this.selectItem(value);
			if (this.state.isFocus && !this.props.multiple) {
				this.handleBlur();
			}
		}

		if (this.responsive.onPhone) {
			this._optionssearchinput.value?.blur();
		}
	}

	resetIndex () {
		this.state.indexNav = -1;
	}

	removeIndex (index: number) {
		if (isArray(this.vModel.value)) {
			const removedValue = this.vModel.value[index];
			this.bus.emit('remove', removedValue);
		}
	}

	markedSearch (content?: string) {
		if (!this.state.valueToSearch || !content || typeof content !== 'string') return content;
		return useMonkey(content).mark(this.state.valueToSearch) as string;
	}

	normalizeString (str: string) {
		return str.toLowerCase().normalize('NFD').replace(/\p{Diacritic}/gu, '');
	}
}
