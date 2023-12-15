import SharedSetupService from '../../Shared/SharedSetupService';
import { isArray, throttle, debounce } from 'lodash-es';
import { nextTick, onMounted, onUnmounted, PropType, reactive, ref, watch } from 'vue';
import useDragNDrop from 'services/DragNDropService';

type Props = SetupProps<typeof OrionHorizontalScrollSetupService.props>

type PreviewDatas = {
	visibility?: number,
	isHidingLeft?: boolean,
}

export default class OrionHorizontalScrollSetupService extends SharedSetupService<Props> {
	static props = {
		// @doc props/shadowColor the color of the shadow on the extremities of the scroll
		// @doc/fr props/shadowColor couleur de l'ombre aux extrémités du composant
		shadowColor: {
			type: String,
			default: 'grey-lighter',
		},
		// @doc props/dropShadow if set, hides the shadow on the extremities of the scroll
		// @doc/fr props/dropShadow si défini, masque l'ombre aux extrémités du composant
		dropShadow: {
			type: Boolean,
			default: false,
		},
		// @doc props/tolerance set the scroll tolerance that trigger the shadow's display
		// @doc/fr props/tolerance défini la tolérence pour le déclenchement de l'apparition ou de la disparation de l'ombre
		tolerance: {
			type: Number,
			default: 1,
		},
		// @doc props/scrollStep defines the targets of the scroll step
		// @doc/fr props/scrollStep défini le pas du scroll, ou un tableau d'éléments dans le DOM pour le calculer automatiquement
		scrollStep: {
			type: Function as PropType<() => number | Array<HTMLElement>>,
			default: null,
		},
		// eslint-disable-next-line max-len
		// @doc props/targets if set, shows a preview of the items contained is the scroll. The function must return an array of DOM elements which are in the scroll area.
		// @doc/fr props/targets si défini, affiche un aperçu des éléments contenus dans le scroll. Cette fonction doit renvoyer un tableau d'éléments du DOM.
		targets: {
			type: Function as PropType<() => Array<HTMLElement>>,
			default: undefined,
		},
		// @doc props/hideButton if set, hides the buttons to slide left or right
		// @doc/fr props/hideButton si défini, masque les bouttons permettant de glisser vers gauche ou vers la droite.
		hideButton: Boolean,
	};

	_el = ref<RefDom>();
	_slider = ref<RefDom>();
	_previewContainer = ref<RefDom>();
	_previewValues = ref<RefDom[]>([]);

	private dnd = useDragNDrop();
	private throttledHandleScrollWhileDragging = throttle(() => this.handleScrollWhileDragging(), 100);
	private debouncedObserverCallback = debounce(() => this.setShadows(), 17);
	private state = reactive({
		mutationObserver: null as Nullable<MutationObserver>,
		resizeObserver: null as Nullable<ResizeObserver>,
		width: 0,
		sliderScrollWidth: 0,
		showLeftShadow: false,
		showRightShadow: false,
		dragScrollRight: 0,
		dragScrollLeft: 0,
		dragScrollTop: 0,
		dragScrollBottom: 0,
		dragInterval: null as Nullable<number>,
		elements: [] as HTMLElement[],
		pourcentage: 0,
		visibilityValues: [] as PreviewDatas[],
		useNaturalScroll: false,
	});


	get shadowColor () { return this.props.shadowColor; }
	get dropShadow () { return this.props.dropShadow; }
	get showLeftShadow () { return this.state.showLeftShadow; }
	get showRightShadow () { return this.state.showRightShadow; }
	get scrollLeft () { return Math.round(this._slider.value?.scrollLeft ?? 0); }
	get maxScrollLeft () { return this.state.sliderScrollWidth - this.state.width; }
	get pourcentage () { return this.state.pourcentage;}
	get visibilityValues () { return this.state.visibilityValues;}

	get elements () { return this.state.elements;}

	windowResizeHandler = debounce(async () => {
		this.getElementInPreviewSize();
		this.getVisibility();
	}, 17);

	constructor (props: Props) {
		super(props);

		onMounted(async () => {
			this.setShadows();

			this.state.mutationObserver = new MutationObserver(this.debouncedObserverCallback);
			this.state.mutationObserver.observe(this._el.value as Node, {
				childList: true,
				subtree: true,
				attributeFilter: ['class', 'id', 'style'],
			});

			this.state.resizeObserver = new ResizeObserver(this.debouncedObserverCallback);
			this.state.resizeObserver.observe(this._el.value as Element);
			nextTick(() => this.getElements());
			this.getElementInPreviewSize();
			setTimeout(() => this.getVisibility(), 200);

			this.window?.addEventListener('resize', this.debouncedWindowResizeHandler.bind(this));
		});

		onUnmounted(() => {
			this.window?.removeEventListener('resize', this.debouncedWindowResizeHandler.bind(this));
		});

		watch(() => this.state.dragScrollRight, () => {
			this.throttledHandleScrollWhileDragging();
		});
		watch(() => this.state.dragScrollLeft, () => {
			this.throttledHandleScrollWhileDragging();
		});
		watch(() => this.state.dragScrollTop, () => {
			this.throttledHandleScrollWhileDragging();
		});
		watch(() => this.state.dragScrollBottom, () => {
			this.throttledHandleScrollWhileDragging();
		});
	};

	setShadows () {
		const _el = this._el?.value;
		if (!this._slider?.value) return;

		this.state.width = Math.round(_el?.getBoundingClientRect().width ?? 0);
		this.state.sliderScrollWidth = Math.round(this._slider.value?.scrollWidth ?? 0);

		this.handleShadows();
	}

	slide (direction: 'left' | 'right') {
		if (!this._slider.value) return;

		const currentScroll = this._slider.value.scrollLeft;
		this._slider.value.style.scrollBehavior = 'smooth';

		if (this._el.value === undefined)
			return;

		const overflowGradientWidth = +(getComputedStyle(this._el.value, ':before').width?.replace('px', '') ?? 0);

		if (typeof this.props.scrollStep === 'function' && Number.isFinite(this.props.scrollStep())) {
			const stepper = this.props.scrollStep() as number;
			const sliderDelta = stepper - overflowGradientWidth;
			const stepDelta = currentScroll % stepper;
			let targetStep = Math.ceil(currentScroll / stepper);

			if (direction === 'right') {
				if (stepDelta === 0 || stepDelta >= sliderDelta) targetStep++;
			} else {
				if (stepDelta <= sliderDelta) targetStep--;
			}

			const targetScroll = targetStep * stepper - overflowGradientWidth;

			this._slider.value.scrollLeft = targetScroll;

		} else if (typeof this.props.scrollStep === 'function' && isArray(this.props.scrollStep())) {
			const stepper = (this.props.scrollStep() as HTMLElement[]);
			let i = 0;

			if (direction === 'right') {
				for (const step of stepper) {
					if (step.offsetLeft > currentScroll + overflowGradientWidth) break;
					i++;
				}
			} else {
				for (const step of stepper.reverse()) {
					if (step.offsetLeft < currentScroll + overflowGradientWidth) break;
					i++;
				}
			}
			const target = stepper[i];
			this._slider.value.scrollLeft = target.offsetLeft - overflowGradientWidth;

		} else {
			this._slider.value.scrollLeft = direction === 'left'
				? 0
				: this.state.sliderScrollWidth + 10;
		}

		nextTick(() => {
			if (this._slider.value)
				this._slider.value.style.scrollBehavior = 'unset';
		});

		const shadowInterval = setInterval(this.debouncedObserverCallback, 17);
		setTimeout(() => {
			clearInterval(shadowInterval);
			this.getVisibility();
		}, 400);
	};

	handleScrollWhileDragging () {
		clearInterval(this.state.dragInterval as number);
		if (this.state.dragScrollRight || this.state.dragScrollLeft || this.state.dragScrollTop || this.state.dragScrollBottom) {
			const ratio = 5;

			this.state.dragInterval = setInterval(() => {
				// #region Horizontal
				const containerRight = this._el.value?.getBoundingClientRect().right;
				const containerLeft = this._el.value?.getBoundingClientRect().left;

				if (!this.window || containerRight === undefined || containerLeft === undefined) return;

				if (containerRight > this.window.innerWidth || containerLeft < 0) {
					if (this.state.dragScrollRight <= 100) {
						this.window.scrollBy({ left: (100 - this.state.dragScrollRight) / ratio });
					}
					if (this.state.dragScrollLeft <= 100) {
						this.window.scrollBy({ left: -(100 - this.state.dragScrollLeft) / ratio });
					}
				} else {
					if (!this._slider.value) return;

					if (this.state.dragScrollRight <= 100) {
						this._slider.value.scrollLeft += (100 - this.state.dragScrollRight) / ratio;
					}
					if (this.state.dragScrollLeft <= 100) {
						this._slider.value.scrollLeft -= (100 - this.state.dragScrollLeft) / ratio;
					}
				}
				// #endregion

				// #region Vertical
				const containerTop = this._el.value?.getBoundingClientRect().top;
				const containerBottom = this._el.value?.getBoundingClientRect().bottom;

				if (containerTop === undefined || containerBottom === undefined || this._el.value === undefined)
					return;

				if (containerTop < 0 || containerBottom > this.window.innerHeight) {
					if (this.state.dragScrollTop <= 100) {
						this.window.scrollBy({ top: -(100 - this.state.dragScrollTop) / ratio });
					}
					if (this.state.dragScrollBottom <= 100) {
						this.window.scrollBy({ top: (100 - this.state.dragScrollBottom) / ratio });
					}
				} else {
					if (this.state.dragScrollTop <= 100) {
						this._el.value.scrollTop -= (100 - this.state.dragScrollTop) / ratio;
					}
					if (this.state.dragScrollBottom <= 100) {
						this._el.value.scrollTop += (100 - this.state.dragScrollBottom) / ratio;
					}
				}
				// #endregion
			}, 17) as unknown as number;
		}
		this.handleShadows();
		this.getVisibility();
	};

	resetDragScroll () {
		clearInterval(this.state.dragInterval as number);
		this.state.dragScrollRight = 0;
		this.state.dragScrollLeft = 0;
		this.state.dragScrollTop = 0;
		this.state.dragScrollBottom = 0;
	};

	handleDragScroll (event: TouchEvent | MouseEvent) {
		if (!this.window) return;

		if (!this.dnd.registry.isDragging) {
			this.handleShadows();
			return;
		}

		event.preventDefault();
		this.handleShadows();

		if (this._el.value === undefined) return;

		// #region Horizontal
		const windowWidth = this.window.innerWidth;

		const containerRight = this._el.value.getBoundingClientRect().right;
		const limitRight = containerRight > windowWidth ? windowWidth : containerRight;

		const containerLeft = this._el.value.getBoundingClientRect().left;
		const limitLeft = containerLeft < 0 ? 0 : containerLeft;

		const touchX = Math.round(this.dnd.registry.cursor.x ?? 0);

		this.state.dragScrollRight = limitRight - touchX;
		this.state.dragScrollLeft = Math.abs(limitLeft - touchX);
		// #endregion

		// #region Vertical
		const windowHeight = this.window.innerHeight;

		const containerTop = this._el.value.getBoundingClientRect().top;
		const limitTop = containerTop < 0 ? 0 : containerTop;

		const containerBottom = this._el.value.getBoundingClientRect().bottom;
		const limitBottom = containerBottom > windowHeight ? windowHeight : containerBottom;

		const touchY = Math.round(this.dnd.registry.cursor.y ?? 0);

		this.state.dragScrollTop = Math.abs(limitTop - touchY);
		this.state.dragScrollBottom = limitBottom - touchY;
		// #endregion
	};

	handleScroll (event: UIEvent) {
		if (event.target !== this._slider.value) {
			this.state.useNaturalScroll = true;
			this.handleScrollEnd();
		}
	}

	handleScrollEnd = debounce(() => this.state.useNaturalScroll = false, 100);

	handleWheel = throttle((event: WheelEvent) => {
		if (this.state.useNaturalScroll) return;

		if (this._el.value === undefined) return;
		if (!this._slider.value) return;
		if (this.state.width - this.state.sliderScrollWidth >= 0) return;


		if (this._el.value.scrollHeight <= this._el.value.offsetHeight) {
			this._slider.value.scrollLeft += event.deltaY + event.deltaX;
			event.preventDefault();
		}

		this.handleShadows();
		this.getVisibility();
	}, 8, { leading: false });

	debouncedWindowResizeHandler () : void {
		this.windowResizeHandler();
	}

	handleShadows () {
		this.state.showLeftShadow = this.scrollLeft - this.props.tolerance > 0;
		this.state.showRightShadow = this.scrollLeft + this.props.tolerance < this.maxScrollLeft;
	};

	getElements () {
		if (this.props.targets) {
			Object.assign(this.state.elements, this.props.targets());
		}
	}

	getElementInPreviewSize () {
		const containerSize = this._previewContainer.value?.clientWidth;
		const targetTotalSize = this._slider.value?.firstElementChild?.clientWidth;

		if (containerSize && targetTotalSize) {
			this.state.pourcentage = ((containerSize * 100) / targetTotalSize) / 100;
		}
	}

	getVisibility () {
		if (!this._slider.value) return;

		this.state.visibilityValues.length = 0;

		this.state.elements.forEach((element) => {
			if (!this._slider.value) return;

			const elementCoords = element.getBoundingClientRect();
			const sliderCoords = this._slider.value.getBoundingClientRect();


			let visibility = 100;
			let isHidingLeft = false;

			if (elementCoords.x < sliderCoords.x || (this.showLeftShadow && elementCoords.x < sliderCoords.x + 40)) {
				const shadowOffset = this.showLeftShadow ? 40 : 0;
				const diff = sliderCoords.x + shadowOffset - elementCoords.x;
				const visiblePart = elementCoords.width - diff;
				visibility = (visiblePart * 100) / elementCoords.width;
				isHidingLeft = true;

			} else if (elementCoords.x > sliderCoords.right) {
				visibility = 0;
				isHidingLeft = false;
			} else if (elementCoords.right > sliderCoords.right || (this.showRightShadow && elementCoords.right > sliderCoords.right - 40)) {
				const shadowOffset = this.showRightShadow ? 40 : 0;
				const diff = elementCoords.right - sliderCoords.right + shadowOffset;
				const visiblePart = elementCoords.width - diff;
				visibility = (visiblePart * 100) / elementCoords.width;
				isHidingLeft = false;
			}


			this.state.visibilityValues.push({
				visibility,
				isHidingLeft,
			});
		});
	}

	scrollTo (element: HTMLElement) {
		element.scrollIntoView({
			behavior: 'smooth',
			block: 'nearest',
		});
		setTimeout(() => this.getVisibility(), 500);
	}

}
