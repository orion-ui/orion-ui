import { nextTick, PropType, reactive, ref, render, watch } from 'vue';
import mitt from 'mitt';
import anime from 'animejs';

import SharedSetupService from './SharedSetupService';
import useOverlay from 'services/OverlayService';
import { toggleGlobalListener } from 'utils/tools';

type Props = SetupProps<typeof SharedPopableSetupService.props>

export type PopableEmit = {
	(e: 'enter-start'): void;
	(e: 'enter-end'): void;
	(e: 'leave-start'): void;
	(e: 'leave-end'): void;
}

export const _popables: Record<number, OrionAside | OrionNotif | OrionModal> = {};
export const _queue = reactive({
	OrionAside: [] as OrionAside[],
	OrionModal: [] as OrionModal[],
	OrionNotif: [] as OrionNotif[],
});

export default abstract class SharedPopableSetupService<P extends Props> extends SharedSetupService<P> {
	static props = {
		// @doc props/display if set, displays the component
		display: Boolean,
		// @doc props/options options of the component
		options: {
			type: Object as PropType<Partial<Orion.Popable.Options>>,
			default: () => {},
		},
	};

	protected abstract name: Orion.Popable.Name;
	protected abstract emit: ReturnType<typeof defineEmits>;

	_el = ref<RefDom>();
	_loader = ref<OrionLoader>();
	bus = mitt();

	protected state = reactive({
		isClosing: false,
		isOpening: false,
		isMounted: false,
		visible: false,
	});

	protected baseOptions = {
		uid: this.getUid(),
		Nested: null,
		NestedProps: {},
		customClass: '',
		programmatic: false,
		openauto: false,
		message: null,
		size: 'md',
		hideClose: false,
		hideOnOverlayClick: true,
		hideOnEsc: true,
		overlay: true,
		zIndex: 0,
	};

	options = reactive<Orion.Popable.Options>({ ...this.baseOptions });

	protected get pendingQueue () { return _queue[this.name]; }

	get uid () { return this.options.uid; }
	get visible () { return this.state.visible; }
	get isMounted () { return this.state.isMounted; }

	get publicInstance () {
		return {
			...super.publicInstance,
			_loader: () => this._loader.value,
			uid: this.uid,
			bus: this.bus,
			state: this.state,
			options: this.options,
			open: this.open.bind(this),
			close: this.close.bind(this),
			trigger: this.trigger.bind(this),
			animateAsync: this.animateAsync.bind(this),
			removeProgrammatic: this.removeProgrammatic.bind(this),
		};
	}


	constructor (props: P) {
		super(props);

		Object.assign(this.options, props.options);

		_popables[this.options.uid] = this.publicInstance;

		watch(() => this.props.display, (val) => {
			if (val) {
				this.open();
			} else {
				this.close();
			}
		});
	}

	protected onMounted () {
		if (this.name === 'OrionAside') {
			this.bus.on('enter-start', () => {
				(this._el.value as HTMLDivElement).setAttribute('tabindex', '-1');
				nextTick(() => {
					(this._el.value as HTMLDivElement).focus();
				});
			});
		}

		if (this.options.openauto || this.props.display) {
			setTimeout(() => {
				nextTick(() => this.open());
			}, 50);
		}

		for (const event in this.options.events) {
			this.bus.on(event, (params) => {
				if (this.options.events && this.options.events[event]) {
					this.options.events[event](this.publicInstance, params);
				}
			});
		}

		this.state.isMounted = true;

		this.Bus.on(`flush.${name}`, () => {
			if (this.options.programmatic && this.state.visible) {
				this.close({ flush: true });
			}
		});

		if (this.options.hideOnEsc) {
			this.setGlobalEventListener();
		}
	}

	protected onUnmounted () {
		toggleGlobalListener(this.uid);
	}


	abstract animateAsync(enter: boolean): Promise<void>

	private setGlobalEventListener () {
		toggleGlobalListener('keydown', (e: Event) => {
			if ((e as KeyboardEvent).key === 'Escape' && this.visible) {
				this.close();
			};
		}, { uid: this.uid });
	}

	async open (keepInQueue = true) {
		if (this.state.isOpening) return;

		this.state.isOpening = true;
		// Hide current visible Popable
		if (this.pendingQueue.length && this.name !== 'OrionNotif' && this.pendingQueue[0].uid !== this.uid) {
			await this.pendingQueue[0].close({
				keepInQueue,
				handleQueue: false,
			});
		}
		// Add Popable to the queue
		this.queue();

		// Handle queue
		await this.handleQueue();
		this.state.isOpening = false;
	}

	async close (options?: Orion.Popable.CloseOptions) {
		if (this.state.isClosing || !this.state.visible) return;
		options = {
			keepInQueue: false,
			handleQueue: true,
			flush: false,
			...options,
		};

		this.trigger('close');
		this.state.isClosing = true;

		const { flush } = options;
		// On cache le popable courante
		await this.animateAsync(false);
		// Si on ne veut pas la conserver dans la queue,
		if (!options.keepInQueue || flush) this.unqueue();
		// Si il faut nettoyer la queue
		if (typeof flush === 'number' && isFinite(flush)) {
			const toRemove = this.pendingQueue.splice(0, flush);
			toRemove.forEach(x => x.removeProgrammatic());
		} else if (flush) {
			const toRemove = this.pendingQueue.splice(0, this.pendingQueue.length);
			toRemove.forEach(x => x.removeProgrammatic());
		}
		// On traite la queue
		if (options.handleQueue) await this.handleQueue();
		this.state.isClosing = false;

		nextTick(() => {
			this.bus.emit('queueHandled');
		});
	}

	private queue () {
		// On vérifie si le popable est déjà dans la queue
		const index = this.pendingQueue.findIndex(x => x.uid === this.uid);
		// Si oui on la sort pour la remettre en premier
		if (index > -1) {
			this.unqueue();
		}

		// On ajout le popable en premier dans la queue
		this.pendingQueue.unshift(this.publicInstance);
	}

	private unqueue () {
		// On sort le popable de la queue
		const index = this.pendingQueue.findIndex(x => x.uid === this.uid);
		this.pendingQueue.splice(index, 1);

		if (this.options.programmatic) {
			setTimeout(() => {
				this.removeProgrammatic();
			}, 400);
		}
	}

	private async handleQueue () {
		if (this.pendingQueue.length) {
			this.options.overlay
				? useOverlay().show()
				: useOverlay().hide();

			// Replacement des OrionNotif
			if (this.name === 'OrionNotif') {
				let bottom = 0;
				nextTick(() => {
					this.pendingQueue.forEach((x) => {

						nextTick(() => {
							if (!this.document) return;
							const el = this.document.getElementById(`OrionNotif-${x.uid}`);
							bottom += 30;
							anime({
								targets: el,
								bottom,
								duration: 300,
								easing: 'easeOutCubic',
							});
							bottom += (this.document.getElementById(`OrionNotif-${x.uid}`)?.offsetHeight ?? 0);
						});
					});
				});
			}

			// Si il y a des entrées dans la queue, on affiche la première
			const nextPending = this.pendingQueue[0];
			nextPending.options.overlay
				? useOverlay().show()
				: useOverlay().hide();
			await nextPending.animateAsync(true);
		}

		// Vérification si les queue Aside et Modal sont vide, on masque l'overlay
		if (!_queue.OrionAside.length && !_queue.OrionModal.length) {
			useOverlay().hide();
		}
	}

	removeProgrammatic () {
		if (!this.document) return;

		const targetDom = this.document.getElementById(`${this.name}-${this.uid}`);
		const parentNode = targetDom?.parentNode;
		// Render null to parentNode to trigger "unmounted" event
		render(null, parentNode as Element);
		this.document.body.removeChild(parentNode as Node);
		delete _popables[this.uid];
	}

	trigger (eventName: string, params?: any) {
		this.bus.emit(eventName, params);
	}
}
