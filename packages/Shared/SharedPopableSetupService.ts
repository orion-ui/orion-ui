import { nextTick, reactive, ref, render, watch } from 'vue';
import mitt from 'mitt';
import anime from 'animejs';

import SharedSetupService from './SharedSetupService';
import useOverlay from 'services/OverlayService';
import usePopableQueueService from 'services/PopableQueueService';
import { toggleGlobalListener } from 'utils/tools';
import { devtool } from 'devtool';
import orionAppService from 'utils/Orion';
import { Reactive } from 'utils/decorators';


type Popable = OrionAside | OrionNotif | OrionModal;

export type SharedPopableSetupServiceEmits = {
	// @doc event/enter-start/desc the aside begins its enter transition
	// @doc/fr event/enter-start/desc l'aside commence son animation d'arrivée
	(e: 'enter-start'): void;
	// @doc event/enter-end/desc the aside ends its enter transition
	// @doc/fr event/enter-end/desc l'aside a fini son animation d'arrivée
	(e: 'enter-end'): void;
	// @doc event/leave-start/desc the aside begins its leave transition
	// @doc/fr event/leave-start/desc l'aside commence sa transition de départ
	(e: 'leave-start'): void;
	// @doc event/leave-end/desc the aside ends its leave transition
	// @doc/fr event/leave-end/desc l'aside a fini sa transition de départ
	(e: 'leave-end'): void;
}

export type SharedPopableSetupServiceProps = {
	// @doc props/display if set, displays the component
	display?: boolean,
	// @doc props/options options of the component
	options?: Partial<Orion.Popable.Options>
}


export default abstract class SharedPopableSetupService extends SharedSetupService {
	static readonly defaultProps = { options: () => ({}) as Partial<Orion.Popable.Options> };

	protected abstract name: Orion.Popable.Name;

	_el = ref<RefDom>();
	_loader = ref<OrionLoader>();
	bus = mitt();

	@Reactive protected readonly state = {
		isClosing: false,
		isOpening: false,
		isMounted: false,
		visible: false,
	};

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

	protected get pendingQueue () { return usePopableQueueService().queue[this.name] as (typeof this.publicInstance)[]; }

	get uid () { return this.options.uid; }
	get visible () { return this.state.visible; }
	get isMounted () { return this.state.isMounted; }
	get isLastOpenedPopable () { return usePopableQueueService().queueIds.slice(-1)[0] === this.uid; }

	get zIndexBumper (): number {
		return usePopableQueueService().queueIds.findIndex(x => x === this.uid);
	}

	get domStyle (): Record<string, any> {
		return { zIndex: 100 + 1 + this.zIndexBumper + this.options.zIndex };
	}

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
			isLastOpenedPopable: () => this.isLastOpenedPopable,
		};
	}


	constructor (
		protected props: SharedPopableSetupServiceProps
			& Omit<typeof SharedPopableSetupService.defaultProps, 'options'>
			& {options: Partial<Orion.Popable.Options>},
		protected emits: SharedPopableSetupServiceEmits) {
		super();

		Object.assign(this.options, this.options);

		usePopableQueueService().register(this.options.uid, this.publicInstance as Orion.Popable.PublicIntance);

		watch(() => this.props.display, (val) => {
			if (val) {
				this.open();
			} else {
				this.close();
			}
		});
	}

	protected onMounted () {
		if (this.name !== 'OrionNotif') {
			this.bus.on('enter-start', () => {
				this._el.value?.setAttribute('tabindex', '-1');
				nextTick(() => {
					this._el.value?.focus();
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
					this.options.events[event](this.publicInstance as Popable, params);
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
		this.close();
		toggleGlobalListener(this.uid);

		if (this.options.programmatic) {
			devtool?.on.visitComponentTree((payload: any) => {
				if (payload.treeNode.uid === orionAppService.appInstance?.uid) {
					const index = payload.treeNode.children.findIndex((x: any) => (x as any).orionUid === this.uid);
					if (index > -1) payload.treeNode.children.splice(index, 1);
				}
			});
		}
	}


	abstract animateAsync(enter: boolean): Promise<void>

	private setGlobalEventListener () {
		toggleGlobalListener('keydown', (e: Event) => {
			if ((e as KeyboardEvent).key === 'Escape' && this.visible && this.isLastOpenedPopable) {
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

		// Hide current popable
		await this.animateAsync(false);

		// If we don't want to keep it in the queue
		if (!options.keepInQueue || flush) this.unqueue();

		// If we want to clean the queue
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
		if (this.name !== 'OrionNotif') usePopableQueueService().queueIds.push(this.uid);
	}

	private unqueue () {
		// On sort le popable de la queue
		const index = this.pendingQueue.findIndex(x => x.uid === this.uid);
		this.pendingQueue.splice(index, 1);
		this.removeFromQueueIds(this.uid);

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
		if (!usePopableQueueService().asideQueue.length && !usePopableQueueService().modalQueue.length) {
			useOverlay().hide();
		}
	}

	removeProgrammatic () {
		if (!this.document) return;

		const targetWrapper = this.document.getElementById(`${this.name}-wrapper-${this.options.uid}`);

		// Render null to parentNode to trigger "unmounted" event
		if (targetWrapper) render(null, targetWrapper);

		targetWrapper?.remove();
		usePopableQueueService().unregister(this.uid);
		this.removeFromQueueIds(this.uid);
	}

	private removeFromQueueIds (id: number) {
		const idIndex = usePopableQueueService().queueIds.findIndex(x => x === id);
		if (idIndex > -1) usePopableQueueService().queueIds.splice(idIndex, 1);
	}

	trigger (eventName: string, params?: any) {
		this.bus.emit(eventName, params);
	}
}
