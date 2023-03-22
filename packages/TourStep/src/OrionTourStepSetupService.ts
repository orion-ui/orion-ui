import { nextTick, onMounted, onUnmounted, reactive, ref, watch } from 'vue';
import anime from 'animejs';
import { debounce } from 'lodash-es';
import SharedSetupService from '../../Shared/SharedSetupService';
import { toggleGlobalListener } from 'utils/tools';
import useLoader from 'services/LoaderService';
import useConfirm from 'services/ConfirmService';

type Props = SetupProps<typeof OrionTourStepSetupService.props>

type TooltipStyleType = {
	left: string;
	top: string;
}

type ArrowStyleType = {
	transform: string;
	left: string;
	top: string;
}

type OverlayPaneCoord = {
	left: string;
	top: string;
	width?: string;
	height?: string;
	bottom?: string;
	right?: string;
}

type OverlayPaneTarget = 'top' | 'bottom' | 'left' | 'right' | 'global';

type OverlayPaneRegistry = Record<OverlayPaneTarget, Nullable<HTMLElement>>;

type OverlayCoordArray = {
	target: OverlayPaneTarget,
	coord: OverlayPaneCoord,
}[];

export default class OrionTourStepSetupService extends SharedSetupService<Props> {
	static props = {
		// @doc props/title title of the step
		// @doc/fr props/title titre de l'étape
		title: {
			type: String,
			default: undefined,
		},
		// eslint-disable-next-line max-len
		// @doc props/target possibility to target a DOM element. If it is a `string`, it must represent an `id` in the DOM. If `false`, no target will be selected'
		// eslint-disable-next-line max-len
		// @doc/fr props/target Permet de cibler un élément dans le DOM. S'il s'agit d'une string, elle doit correspondre à l'id de cet élément. Si elle est définie à `false` l'étape se placera au centre de la page, sans cible.'
		target: {
			type: [String, Function, Boolean],
			default: false,
		},
		// @doc props/next object which contains a label, and a callback and clean functions for the next step
		// @doc/fr props/next objet contenant un label, et des fonction `callback` et `clean` pour l'étape suivante
		next: {
			type: Object,
			default: undefined,
		},
		// // @doc props/next object which contains a label, and a callback and clean functions for the final step
		// @doc/fr props/next objet contenant un label, et des fonction `callback` et `clean` pour l'étape finale
		end: {
			type: Object,
			default: undefined,
		},
		// @doc props/next object which contains a label, and a callback and clean functions for the previous step
		// @doc/fr props/next objet contenant un label, et des fonction `callback` et `clean` pour l'étape précédente
		previous: {
			type: Object,
			default: undefined,
		},
		// @doc props/timeout when a target can not be find in DOM, a modal appears after a certain time defined with this attribut
		// @doc/fr props/timeout quand la cible n'est pas trouvée dans le DOM, une modal appararaît après le temps spécifié
		timeout: {
			type: Number,
			default: 3000,
		},
		// @doc props/clickable if there is a target, it allows the user to click on the target (if the target is a button for example). It also ends the tour.
		// @doc/fr props/clickable s'il y a une cible, permet de clicker sur la cible  (si c'est un bouton par exemple). Cela met aussi fin au tour.
		clickable: {
			type: [Boolean, Function],
			default: undefined,
		},
		// @doc props/closable defines if the step can be closable
		// @doc/fr props/closable définit si l'étape peut être fermée à l'aide de la croix
		closable: {
			type: Boolean,
			default: true,
		},
		// @doc props/hideFinish hides the Finish button
		// @doc/fr props/hideFinish masque le bouton pour terminer le tour
		hideFinish: {
			type: Boolean,
			default: false,
		},
		// @doc props/size the size of the step
		// @doc/fr props/size taille de l'étape
		size: {
			type: String,
			default: 'md',
		},
	};

	private _tour?: OrionTour;

	private state = reactive({
		isReady: false,
		bodyOverflowStyle: [] as Array<string>,
		globalEscEvent: undefined as Undef<number>,
		tooltipStyle: {
			left: '0',
			top: '0',
		} as TooltipStyleType,
		arrowStyle: {
			transform: '0',
			left: '0',
			top: '0',
		} as ArrowStyleType,
	});

	_el = ref<RefDom>();
	_stepHighlighter = ref<RefDom | null>();
	_stepTarget = ref<RefDom | null>();

	get steps () {
		return this._tour?.steps;
	}


	windowResizeHandler = debounce(async () => {
		await this.getTarget();
		this.calculateHighlighterPosition();
		this.calculateTooltipPosition();
		this.calculateOverlayPosition();
	}, 17);

	private overlayPanes = reactive<OverlayPaneRegistry>({
		top: null,
		bottom: null,
		left: null,
		right: null,
		global: null,
	});

	get isReady () {
		return this.state.isReady;
	}

	set isReady (val) {
		this.state.isReady = val;
	}

	get currentIndex () {
		return this._tour?.getCurrentIndex();
	};

	get nextButtonLabel () {
		return this.props.next?.label ? this.props.next?.label : this.lang.NEXT;
	};

	get previousButtonLabel () {
		return this.props.previous?.label ? this.props.previous?.label : this.lang.PREVIOUS;
	};

	get endButtonLabel () {
		return this.props.end?.label ? this.props.end?.label : this.lang.FINISH;
	};

	get tooltipStyle () {
		return this.state.tooltipStyle;
	}

	set tooltipStyle (val) {
		this.state.tooltipStyle = val;
	}


	get arrowStyle () {
		return this.state.arrowStyle;
	}

	constructor (props: Props, _tour?: OrionTour) {
		super(props);
		this._tour = _tour;

		watch(() => this.currentIndex, async () => {
			if (this.currentIndex === -1)
				await this.stop();
		});

		watch(() => props.target, () => {
			this.showTooltip();
		});

		onMounted(() => {
			// this.storeBodyOverflow();
			this.showTooltip();
			this.window?.addEventListener('resize', this.debouncedWindowResizeHandler.bind(this));

			this.state.globalEscEvent = toggleGlobalListener('keydown', (event: any) => {
				if ((event as KeyboardEvent).key === 'Escape') stop();
			}) as number;
		});

		onUnmounted(() => {
			this.window?.removeEventListener('resize', this.debouncedWindowResizeHandler.bind(this));
			this._stepTarget.value?.removeEventListener('click', this.clickableTargetHandler.bind(this));

			if (this.state.globalEscEvent) {
				toggleGlobalListener(this.state.globalEscEvent);
			}
		});
	}

	async getTarget (): Promise<void> {
		let tempTarget;
		if (typeof this.props.target === 'string') {
			tempTarget = await this.waitFor(this.props.target);
		} else if (typeof this.props.target === 'function') {
			tempTarget = await this.props.target();
		}
		this._stepTarget.value = tempTarget;
		if (this._stepTarget.value && !this.props.clickable)
			this._stepTarget.value.style.pointerEvents = 'none';
	}

	async clickableTargetHandler () : Promise<void> {
		if (this.props.clickable) {
			if (typeof this.props.clickable === 'function') {
				await this.props.clickable();
			}
			stop();
		}
	}

	debouncedWindowResizeHandler () : void {
		if (this._stepTarget.value) {
			this.windowResizeHandler();
		}
	}

	async showTooltip () {
		try {
			this.isReady = false;
			this.cleanPreviousStep();

			if (this.props.target) {
				await this.getTarget();
				if (this._stepTarget.value) {
					this._stepTarget.value?.addEventListener('click', this.clickableTargetHandler.bind(this));
					await this.calculateTooltipPosition();
					this.addOverlay();
					this.addHighlighter();
				} else {
					this.showTimeoutModal();
				}

			} else {
				this.calculateTooltipPosition(false);
			}

		} catch (e) {
			this.showTimeoutModal();
		}
	}

	async calculateTooltipPosition (target = true) {
		if (this.window && target) {
			let value = this._stepTarget.value?.getBoundingClientRect();
			if (!value) return;

			if (value.bottom > this.window.innerHeight - 60 || value.top < 60) {
				await this.scrollToTarget(this._stepTarget.value as HTMLElement);
			}

			value = this._stepTarget?.value?.getBoundingClientRect();
			if (!value) return;

			this.isReady = true;

			nextTick(async () => {
				if (!this.window) return;

				const boundingClient = this._el.value?.getBoundingClientRect();
				if (value && boundingClient) {
					const left = value?.left - boundingClient?.width;
					const right = value?.left + value.width + boundingClient?.width;
					const bottom = value?.bottom + boundingClient?.height;
					const top = value?.top - boundingClient?.height;

					// Placement normal, centré en dessous de la target
					if (bottom < this.window.innerHeight && (value?.left + value.width / 2 - boundingClient?.width / 2 > 0)
					&& (value?.left + boundingClient?.width < this.window.innerWidth)) {
						this.state.tooltipStyle = {
							left: `${value?.left + value.width / 2 - boundingClient?.width / 2 }px`,
							top: `${value?.bottom + 10}px`,
						};

						Object.assign(this.state.arrowStyle, {
							transform: `rotate(0deg)`,
							left: `${boundingClient?.width / 2}px`,
							top: `${-5 }px`,
						});
						return;
					}


					// Différent cas de dépassement de la fenêtre
					if (top < 0 && bottom > this.window.innerHeight) {
						this.tooltipStyle.top = `${value?.top}px`;
						await scrollBy(0, value.bottom - boundingClient.height + 40);

						nextTick(() => {
							if (!this.window) return;

							value = this._stepTarget.value?.getBoundingClientRect();
							if (value && boundingClient) {
								if (this.responsive.onPhone) {
									this.tooltipStyle.top = `${value?.bottom + 10 }px`;
									this.calculateHighlighterPosition();
									this.calculateOverlayPosition();
								} else {
									this.tooltipStyle.top = `${5}px`;

									if (right < this.window.innerWidth) {
										this.tooltipStyle.left = `${value?.right + 10 }px`;
										Object.assign(this.arrowStyle, {
											transform: `rotate(-90deg)`,
											left: `${- 7}px`,
											top: `${value.top}px`,
										});
									} else {
										this.tooltipStyle.left = `${value?.left - boundingClient.width - 7 }px`;
										Object.assign(this.arrowStyle, {
											transform: `rotate(90deg)`,
											left: `${boundingClient.width - 2}px`,
											top: `${value.top + 5}px`,
										});
									}
									this.calculateHighlighterPosition();
									this.calculateOverlayPosition();
								}

							}
						});
						return;
					}

					if (bottom > this.window.innerHeight) {
						this.tooltipStyle.top = `${value?.top - boundingClient?.height - 9 }px`;
						if (right >= this.window.innerWidth) {
							this.tooltipStyle.left = `${value?.left - boundingClient?.width - 10 }px`;
							this.tooltipStyle.top = `${value?.bottom - boundingClient?.height + 5 }px`;
							Object.assign(this.arrowStyle, {
								transform: `rotate(90deg)`,
								left: `${boundingClient?.width - 3}px`,
								top: `${boundingClient?.height - 15 }px`,
							});
						} else {
							this.tooltipStyle.top = `${value?.top - boundingClient?.height - 9 }px`;
							this.tooltipStyle.left = `${value?.left + value.width / 2 - boundingClient?.width / 2}px`;
							Object.assign(this.arrowStyle, {
								transform: `rotate(180deg)`,
								left: `${boundingClient?.width / 2}px`,
								top: `${boundingClient?.height }px`,
							});
						}

					}

					if (left < 0) {
						if (bottom > this.window.innerHeight) {
							if (this.responsive.onPhone) {
								this.tooltipStyle.left = `5px`;
								this.tooltipStyle.top = `${value?.top - boundingClient.height - 7}px`;

								Object.assign(this.arrowStyle, {
									transform: `rotate(180deg)`,
									left: `${value.left + value.width/2 - 10}px`,
									top: `${boundingClient?.height }px`,
								});
							} else {
								this.tooltipStyle.top = `${value?.bottom - boundingClient?.height + 5 }px`;
							}
						} else {
							if (this.responsive.onPhone) {
								this.tooltipStyle.left = `${value?.left}px`;
								this.tooltipStyle.top = `${value?.bottom + 7 }px`;
								this.arrowStyle.left = `${value?.width/2}px`;
							} else {
								this.tooltipStyle.top = `${value?.top - 2 }px`;
								this.tooltipStyle.left = `${value?.right + 10 }px`;
								Object.assign(this.arrowStyle, {
									transform: `rotate(-90deg)`,
									left: `-7px`,
									top: `${value?.height/2 }px`,
								});
							}
						}
						return;
					}

					if (right >= this.window.innerWidth) {
						if (bottom > this.window.innerHeight) {
							if (this.responsive.onPhone) {
								this.tooltipStyle.left = `${this.window.innerWidth - boundingClient.width }px`;
								this.tooltipStyle.top = `${value?.top - boundingClient.height - 7 }px`;
								Object.assign(this.arrowStyle, {
									transform: `rotate(180deg)`,
									left: `${ value.left - (this.window.innerWidth - boundingClient.width) + value.width/2 - 5}px`,
									top: `${boundingClient.height}px`,
								});
								return;
							} else {
								this.tooltipStyle.top = `${value?.bottom - boundingClient?.height }px`;
								this.tooltipStyle.left = `${value?.left - 2 - boundingClient?.width - 9}px`;
								this.arrowStyle.top = `${boundingClient.height - value.height / 2 - 2}px`;
								this.arrowStyle.left = `${boundingClient?.width - 1}px`;
							}
						} else {
							if (this.responsive.onPhone) {
								this.tooltipStyle.left = `${this.window.innerWidth - boundingClient?.width }px`;
								this.tooltipStyle.top = `${value?.bottom + 7 }px`;
								Object.assign(this.arrowStyle, {
									transform: `rotate(0deg)`,
									left: `${ value.left - (this.window.innerWidth - boundingClient.width) + value.width/2 - 5}px`,
									top: `${-5}px`,
								});
							} else {
								this.tooltipStyle.left = `${value?.left - boundingClient?.width - 8}px`;
								Object.assign(this.arrowStyle, {
									transform: `rotate(90deg)`,
									left: `${boundingClient?.width - 2}px`,
									top: `${value?.height/2 }px`,
								});
								this.tooltipStyle.top = `${value?.top - 2 }px`;
								this.arrowStyle.top = `${value?.height/2}px`;
							}
						}
					}
				}
			});
		} else {
			this.isReady = true;
			nextTick(() => {
				if (!this.window) return;

				const boundingClient = this._el.value?.getBoundingClientRect();
				if (boundingClient) {
					Object.assign(this.tooltipStyle, {
						left: `${this.window.innerWidth/2 - boundingClient?.width / 2 }px`,
						top: `${this.window.innerHeight/2 - boundingClient.height /2}px`,
					});
					Object.assign(this.arrowStyle, {
						left: `0`,
						top: `0`,
					});
				}
			});
		}
	}

	addHighlighter () {
		if (!this.document) return;

		this._stepHighlighter.value = this.document.createElement('div');
		this._stepHighlighter.value.classList.add('orion-tour-step-highlighter');
		this.calculateHighlighterPosition();
		this.document.body.appendChild(this._stepHighlighter.value);
	}

	removeHighlighter () {
		if (!this.document) return;

		if (this._stepHighlighter.value) {
			this.document.body.removeChild(this._stepHighlighter.value);
		}
		this._stepHighlighter.value = null;
	}

	calculateHighlighterPosition () {
		const target = this._stepTarget.value?.getBoundingClientRect();
		if (this.window && target && this._stepHighlighter.value) {
			this._stepHighlighter.value.style.left = `${target.left - 4}px`;
			this._stepHighlighter.value.style.top = `${target.top + this.window.scrollY - 4}px`;
			this._stepHighlighter.value.style.width = `${target.width + 8}px`;
			this._stepHighlighter.value.style.height = `${target.height + 8}px`;
		}
	}

	scrollToTarget (target: HTMLElement): Promise<DOMRect | boolean> | undefined {
		if (!target) return;

		return new Promise((resolve) => {
			if (!this.window) return;

			const scrollableParent = this.getScrollableParent(target);
			if (!target || !scrollableParent) {
				resolve(true);
				return;
			}
			const scrollCoords = { y: this.window.scrollY === 0 ? 0 : this.window.innerHeight + this.window.scrollY };
			const targetScroll = target?.getBoundingClientRect().bottom > 50 ? target?.getBoundingClientRect().top - 100 + this.window.scrollY : 0;
			anime({
				targets: scrollCoords,
				y: targetScroll,
				translateY: targetScroll,
				duration: 600,
				easing: 'easeOutQuad',
				update: () => {
					scrollableParent?.scrollTo(0, scrollCoords.y);
				},
				complete: () => {
					resolve(target.getBoundingClientRect());
					this.calculateOverlayPosition();
				},
			});
		});
	}

	getScrollableParent (target: HTMLElement) : Nullable<HTMLElement> {
		if (target == null) {
			return null;
		}
		if (target.scrollHeight > target.clientHeight) {
			return target;
		} else {
			if (target.parentNode)
				return this.getScrollableParent(target.parentNode as HTMLElement);
			else
				return null;
		}
	}

	async goPreviousStep () {
		this.cleanPreviousStep();
		if (typeof this.props.previous?.callback !== 'undefined') {
			await this.props.previous?.callback();
		}
		if (this.currentIndex && this.currentIndex > 0)
			this._tour?.setCurrent(this.currentIndex - 1);

		if (typeof this.props.previous?.clean !== 'undefined') {
			this.props.previous?.clean();
		}
	}

	async goNextStep () {
		// this.resetBodyOverflow();
		this.cleanPreviousStep();
		if (typeof this.props.next?.callback !== 'undefined') {
			await this.props.next?.callback();
		}
		if (this.currentIndex !== -1 && this.currentIndex !== undefined && this.steps
		&& (this.currentIndex < this.steps?.length - 1)) {
			this._tour?.setCurrent(this.currentIndex + 1);
		}
		if (typeof this.props.next?.clean !== 'undefined') {
			this.props.next?.clean();
		}

		// this.storeBodyOverflow();
	}

	cleanPreviousStep () {
		this.isReady = false;
		this.addOverlay(true);
		if (!!this._stepTarget.value) {
			if (!this.props.clickable) {
				this._stepTarget.value.style.pointerEvents='auto';
			}
			this._stepTarget.value = null;
		}
		this.removeHighlighter();
	}

	waitFor (element : string): Promise<HTMLElement | null> | null {
		return new Promise((resolve, reject) => {
			let returnElement = null as HTMLElement | null;
			const timeout = setTimeout(() => {
				useLoader().hide();
				reject('Element not found');
				clearInterval(interval);
			}, this.props.timeout);

			const interval = setInterval(() => {
				useLoader().show(this.lang.LOADING);
				returnElement = this.document?.getElementById(element) ?? null;

				if (returnElement) {
					useLoader().hide();
					clearInterval(interval);
					clearTimeout(timeout);
					resolve(returnElement);
				}
			}, 50);
		});
	}

	async showTimeoutModal () {
		const confirm = await useConfirm(this.lang.ORION_TOUR__ELEMENT_NOT_FOUND_MESSAGE, {
			overlay: false,
			zIndex: 99999,
			title: 'Oops...',
			events: {
				queueHandled: async () => {
					if (confirm) {
						this.showTooltip();
					} else {
						await this.stop();
					}
				},
			},
		});
	}

	async stop () {
		this.cleanPreviousStep();
		this.removeOverlay();

		if (typeof this.props.end?.callback !== 'undefined') {
			await this.props.end?.callback();
		}

		// this.resetBodyOverflow();
		this._tour?.stop();
	}

	addOverlay (global = false) {
		if (global) {
			this.removeOverlay();
			this.removeHighlighter();
			this.addOverlayPane('global');
			if (this.overlayPanes.global) {
				(this.overlayPanes.global.style as CSSStyleDeclaration & { inset: string }).inset = '0';
			}
		} else if (this._stepTarget.value) {
			this.removeOverlay('global');
			(['top', 'bottom', 'right', 'left'] as OverlayPaneTarget[]).forEach(x => this.addOverlayPane(x));
			this.calculateOverlayPosition();
		}
	}

	removeOverlay (target: Nullable<OverlayPaneTarget> = null) {
		if (!this.document) return;

		if (target) {
			this.overlayPanes[target]?.remove();
			this.overlayPanes[target] = null;
		} else {
			Array
				.from(this.document.getElementsByClassName('orion-tour-overlay'))
				.forEach((el) => {
					el.remove();
					this.overlayPanes[(el.id as OverlayPaneTarget)] = null;
				});
		}
	}

	addOverlayPane (position: OverlayPaneTarget) {
		if (!this.document) return;

		const pane = this.document.createElement('div');
		pane.id = position;
		pane.className = 'orion-tour-overlay';
		this.document.body.appendChild(pane);
		this.overlayPanes[position] = pane;
	}

	calculateOverlayPosition () {
		const target = this._stepTarget?.value?.getBoundingClientRect();
		if (target) {
			const coordArray: OverlayCoordArray = [
				{
					target: 'top',
					coord: {
						left: Math.floor(target.left - 2) + 'px',
						top: '0',
						height: Math.floor(target.top - 2) + 'px',
						width: Math.ceil(target.width + 4) + 'px',
					},
				},
				{
					target: 'bottom',
					coord: {
						left: Math.floor(target.left - 2) + 'px',
						top: Math.floor(target.bottom + 2) +'px',
						bottom: '0',
						width: Math.ceil(target.width + 4) + 'px',
					},
				},
				{
					target: 'right',
					coord: {
						left: Math.ceil(target.width + Math.floor(target.left) + 2)+'px',
						top: '0',
						bottom: '0',
						right: '0',
					},
				},
				{
					target: 'left',
					coord: {
						left: '0',
						top: '0',
						bottom: '0',
						width: Math.floor(target.left) - 2 + 'px',
					},
				},
			];

			coordArray.forEach((x) => {
				const pane = this.overlayPanes[x.target];
				if (pane) Object.assign(pane.style, x.coord);
			});

		}
	};

	/** TODO: FIXME:
	 * remove following methods and their calls
	 * if no bug detected
	 */

	/* storeBodyOverflow () {
		if (!this.document) return;

		if (this.props.next?.callback || (typeof this.props.target === 'function')) {
			setTimeout(() => {
				if (!this.document) return;
				this.state.bodyOverflowStyle.push(this.document.body.style.overflow);
				this.document.body.style.overflow = 'hidden';
			}, 300);
		} else {
			this.state.bodyOverflowStyle.push(this.document.body.style.overflow);
			this.document.body.style.overflow = 'hidden';
		}
	}; */

	/* resetBodyOverflow () {
		if (!this.document) return;
		this.document.body.style.overflow = this.state.bodyOverflowStyle[this.state.bodyOverflowStyle.length -1] ?? '';
	} */
}
