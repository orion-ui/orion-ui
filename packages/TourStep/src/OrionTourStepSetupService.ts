import { arrow, autoPlacement, autoUpdate, computePosition, offset, shift } from '@floating-ui/dom';
import anime from 'animejs';
import { debounce } from 'lodash-es';
import { useConfirm } from 'services/ConfirmService';
import { useLoader } from 'services/LoaderService';
import { toggleGlobalListener } from 'utils/tools';
import { nextTick, onMounted, onUnmounted, reactive, ref, watch } from 'vue';
import SharedSetupService from '../../Shared/SharedSetupService';

export type OrionTourStepEmits = {}
export type OrionTourStepProps = {
	// @doc props/clickable if there is a target, it allows the user to click on the target (if the target is a button for example). It also ends the tour.
	// @doc/fr props/clickable s'il y a une cible, permet de clicker sur la cible  (si c'est un bouton par exemple). Cela met aussi fin au tour.
	clickable?: boolean | Function,
	// @doc props/closable defines if the step can be closable
	// @doc/fr props/closable définit si l'étape peut être fermée à l'aide de la croix
	closable?: boolean,
	// @doc props/end object which contains a label, and a callback and clean functions for the final step
	// @doc/fr props/end objet contenant un label, et des fonction `callback` et `clean` pour l'étape finale
	end?: Orion.Tour.TourObject,
	// @doc props/hideFinish hides the Finish button
	// @doc/fr props/hideFinish masque le bouton pour terminer le tour
	hideFinish?: boolean,
	// @doc props/next object which contains a label, and a callback and clean functions for the next step
	// @doc/fr props/next objet contenant un label, et des fonction `callback` et `clean` pour l'étape suivante
	next?: Orion.Tour.TourObject,
	// @doc props/previous object which contains a label, and a callback and clean functions for the previous step
	// @doc/fr props/previous objet contenant un label, et des fonction `callback` et `clean` pour l'étape précédente
	previous?: Orion.Tour.TourObject,
	// @doc props/size the size of the step
	// @doc/fr props/size taille de l'étape
	size?: string,
	// @doc props/target possibility to target a DOM element. If it is a `string`, it must represent an `id` in the DOM. If `false`, no target will be selected
	// @doc/fr props/target Permet de cibler un élément dans le DOM. S'il s'agit d'une string, elle doit correspondre à l'id de cet élément. Si elle est définie à `false` l'étape se placera au centre de la page, sans cible.
	target?: string | Function | boolean,
	// @doc props/timeout when a target can not be find in DOM, a modal appears after a certain time defined with this attribut
	// @doc/fr props/timeout quand la cible n'est pas trouvée dans le DOM, une modal appararaît après le temps spécifié
	timeout?: number,
	// @doc props/title title of the step
	// @doc/fr props/title titre de l'étape
	title?: string,
};

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

export default class OrionTourStepSetupService extends SharedSetupService {
	static readonly defaultProps = {
		closable: true,
		size: 'md',
		timeout: 3000,
	};

	private _tour?: OrionTour;
	private cleanup?: () => void;

	private state = reactive({
		bodyOverflowStyle: [] as Array<string>,
		globalEscEvent: undefined as Undef<number>,
	});

	readonly _el = ref<RefDom>();
	readonly _stepHighlighter = ref<RefDom | null>();
	readonly _stepTarget = ref<RefDom | null>();

	private readonly clickableTargetHandler = async () => {
		if (this.props.clickable) {
			if (typeof this.props.clickable === 'function') {
				await this.props.clickable();
			}
			stop();
		}
	};

	private readonly debouncedWindowResizeHandler = () => {
		if (this._stepTarget.value) {
			this.windowResizeHandler();
		}
	};

	get steps () {
		return this._tour?.steps;
	}

	get publicInstance () {
		return {
			...super.publicInstance,
			previous: () => this.goPreviousStep(),
			next: () => this.goNextStep(),
			stop: (fromTour = false) => this.stop(fromTour),
		};
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

	constructor (protected props: OrionTourStepProps, protected emits: OrionTourStepEmits, _tour?: OrionTour) {
		super();
		this._tour = _tour;

		watch(() => this.currentIndex, async () => {
			if (this.currentIndex === -1) await this.stop();
		});

		watch(() => props.target, () => {
			this.showTooltip();
		});

		onMounted(() => {
			this._tour?.setCurrentStepPublicInstance(this.publicInstance);
			this.showTooltip();
			this.window?.addEventListener('resize', this.debouncedWindowResizeHandler);

			this.state.globalEscEvent = toggleGlobalListener('keydown', (event: any) => {
				if ((event as KeyboardEvent).key === 'Escape') this.stop();
			}) as number;

			if (this._stepTarget.value && this._el.value) {
				this.cleanup = autoUpdate(
					this._stepTarget.value,
					this._el.value,
					this.calculateTooltipPosition.bind(this),
				);
			}
		});

		onUnmounted(() => {
			this.window?.removeEventListener('resize', this.debouncedWindowResizeHandler);
			this._stepTarget.value?.removeEventListener('click', this.clickableTargetHandler);
			this.cleanup?.();
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

	async showTooltip () {
		try {
			this.cleanPreviousStep();

			if (this.props.target) {
				await this.getTarget();
				if (this._stepTarget.value) {
					this._stepTarget.value?.addEventListener('click', this.clickableTargetHandler);
					await this.calculateTooltipPosition();
					this.addOverlay();
					this.addHighlighter();
				} else {
					this.showTimeoutModal();
				}

			} else {
				this.calculateTooltipPosition();
			}
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		} catch (e: any) {
			this.showTimeoutModal();
		}
	}

	async calculateTooltipPosition () {
		if (this.props.target) {
			await this.getTarget();
			if (this._stepTarget.value && this._el.value && this.window) {
				const value = this._stepTarget.value.getBoundingClientRect();

				if (value.bottom > this.window.innerHeight - 60 || value.top < 50) {
					await this.scrollToTarget(this._stepTarget.value as HTMLElement);
				}

				const arrowElement = document.querySelector('#orion-tour-tooltip__arrow') as HTMLElement;

				if (!this._stepTarget.value || !this._el.value) return;

				const { x, y, middlewareData, placement } = await computePosition(this._stepTarget.value, this._el.value, {
					strategy: 'fixed',
					middleware: [
						autoPlacement(),
						offset({ mainAxis: 10 }),
						shift({ padding: 16 }),
						arrow({
							element: arrowElement,
							padding: 10,
						}),
					],
				});
				const side = placement.split('-')[0];
				const staticSide = {
					top: 'bottom',
					right: 'left',
					bottom: 'top',
					left: 'right',
				}[side];

				if (this._el.value) {
					Object.assign(this._el.value.style, {
						left: `${x}px`,
						top: `${y}px`,
						opacity: '1',
					});

					if (middlewareData.arrow && staticSide && arrowElement) {
						const { x, y } = middlewareData.arrow;
						Object.assign(arrowElement.style, {
							left: x != null ? `${x}px` : '',
							top: y != null ? `${y}px` : '',
							[staticSide]: `${-5}px`,
							display: 'unset',
							transform: 'rotate(45deg)',
						});
					}
				}


			}
		} else {
			nextTick(() => {
				if (!this.window) return;
				const arrowElement = document.querySelector('#orion-tour-tooltip__arrow') as HTMLElement;
				const boundingClient = this._el.value?.getBoundingClientRect();
				if (boundingClient && this._el.value) {
					Object.assign(this._el.value.style, {
						left: `${this.window.innerWidth/2 - boundingClient?.width / 2 }px`,
						top: `${this.window.innerHeight/2 - boundingClient.height /2}px`,
						opacity: '1',
					});
					Object.assign(arrowElement.style, {
						left: `0`,
						top: `0`,
						display: 'none',
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
			const highlighters = this.document.body.getElementsByClassName('orion-tour-step-highlighter');
			while (highlighters[0]) {
				highlighters[0].parentNode?.removeChild(highlighters[0]);
			}
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
			const targetScroll = target?.getBoundingClientRect().bottom > 50 ? target?.getBoundingClientRect().top - 50 + this.window.scrollY : 0;

			anime({
				targets: scrollCoords,
				y: targetScroll,
				translateY: targetScroll,
				duration: 600,
				easing: 'easeOutQuad',
				update: () => {
					target.scrollIntoView({ block: 'center' });
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
		this._tour?.setCurrentStepPublicInstance(this.publicInstance);

		if (typeof this.props.previous?.clean !== 'undefined') {
			this.props.previous?.clean();
		}
	}

	async goNextStep () {
		this.cleanPreviousStep();
		if (typeof this.props.next?.callback !== 'undefined') {
			await this.props.next?.callback();
		}
		if (this.currentIndex !== -1 && this.currentIndex !== undefined && this.steps
		&& (this.currentIndex < this.steps?.length - 1)) {
			this._tour?.setCurrent(this.currentIndex + 1);
			this._tour?.setCurrentStepPublicInstance(this.publicInstance);
		}
		if (typeof this.props.next?.clean !== 'undefined') {
			this.props.next?.clean();
		}
	}

	cleanPreviousStep () {
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
			let returnElement = this.document?.getElementById(element) ?? null;

			if (returnElement) {
				resolve(returnElement);
			} else {
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
			}
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

	async stop (fromTour = false) {
		this.cleanPreviousStep();
		this.removeOverlay();

		if (typeof this.props.end?.callback !== 'undefined' && !fromTour) {
			await this.props.end?.callback();
		}

		if (!fromTour) {
			this._tour?.stop();
		}
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
}
