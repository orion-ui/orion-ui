import { reactive } from 'vue';
import SharedSetupService from '../../Shared/SharedSetupService';
import useDragNDrop from 'services/DragNDropService';
import useMonkey from 'services/MonkeyService';
import { toggleGlobalListener } from 'utils/tools';

export type OrionDraggableEmits = {(e: 'update:disabled', payload: boolean): void;}
export type OrionDraggableProps = {
	// @doc props/data datas of the draggable item
	// @doc/fr props/data données de l'élément
	data?: Orion.DndData['data'],
	// @doc props/disabled if set, the item will not be draggable
	// @doc/fr props/disabled si défini, l'élément ne sera pas déplaçable
	disabled: boolean,
	// @doc props/tag the tag or component of the draggable item
	// @doc/fr props/tag tag ou composant qui réprésentera l'élément
	tag: string,
};

export default class OrionDraggableSetupService extends SharedSetupService {
	static readonly defaultProps = {
		disabled: false,
		tag: 'div',
	};

	private _droppable? : OrionDroppable;
	private state = reactive({ isDragging: false });

	private relativeX = 0;
	private relativeY = 0;
	private ghost = null as Nullable<HTMLElement>;
	private anchor = null as Nullable<HTMLElement>;
	private dropZone = null as Nullable<HTMLElement>;
	private globalMouseEventUid = undefined as Undef<number>;
	private globalTouchEventUid = undefined as Undef<number>;

	private _aside?: OrionAside;
	private _modal?: OrionModal;

	uid = this.getUid();
	private __uid = this.getUid();

	private dnd = useDragNDrop();

	get disabled () {
		return this.props.disabled;
	}

	set disabled (val) {
		this.emits('update:disabled', val);
	}

	get tag () {
		return this.props.tag;
	}

	get isDragging () { return this.state.isDragging; }
	set isDragging (val) { this.state.isDragging = val; }

	get $el () {
		return this.document?.getElementById(`orion-draggable-${this.uid}`);
	}

	constructor (
		protected props: OrionDraggableProps,
		protected emits: OrionDraggableEmits,
		_droppable?: OrionDroppable,
		_aside?: OrionAside,
		_modal?: OrionModal) {

		super();

		this._droppable = _droppable;
		this._aside = _aside;
		this._modal = _modal;
	}

	startGlobalEvent () {
		if (!this.document) return;

		const stopGlobalListener = () => {
			if (this.globalMouseEventUid) toggleGlobalListener(this.globalMouseEventUid);
			if (this.globalTouchEventUid) toggleGlobalListener(this.globalTouchEventUid);

			this.document?.removeEventListener('mouseup', stopGlobalListener);
			this.document?.removeEventListener('touchend', stopGlobalListener);
			this.document?.removeEventListener('touchcancel', stopGlobalListener);

			this.document?.body.classList.remove('body--orion-dragging');
			this.document?.body.removeAttribute('style');
			this.handleDragEnd();
		};

		this.document.addEventListener('mouseup', stopGlobalListener, { once: true });
		this.document.addEventListener('touchend', stopGlobalListener, { once: true });
		this.document.addEventListener('touchcancel', stopGlobalListener, { once: true });

		this.globalMouseEventUid = toggleGlobalListener('mousemove', (event) => {
			const { clientX, clientY } = event as MouseEvent;
			this.handleDrag(clientX, clientY);
		});

		this.globalTouchEventUid = toggleGlobalListener('touchmove', (event) => {
			if (!this.document) return;

			this.document.body.style.overflow = 'hidden';
			const { touches } = event as TouchEvent;
			const touch = touches.item(0);
			if (touch) this.handleDrag(touch.clientX, touch.clientY);
		});
	};

	handleMouseDown (event: MouseEvent | TouchEvent) {
		if (!this.document || this.dnd.registry.isDragging || this.props.disabled) return;

		this.document.body.classList.add('body--orion-dragging');
		if (this.props.disabled) return;
		if (event instanceof MouseEvent) {
			this.document.addEventListener('mousemove', this.handleDragStart, {
				once: true,
				passive: false,
			});
		} else if (event instanceof TouchEvent) {
			this.document.addEventListener('touchmove', this.handleDragStart, {
				once: true,
				passive: false,
			});
		}
	};

	handleMouseUp () {
		if (!this.document || this.props.disabled) return;

		this.document.removeEventListener('mousemove', this.handleDragStart);
		this.document.removeEventListener('touchmove', this.handleDragStart);
		this.document.body.classList.remove('body--orion-dragging');
	};

	private readonly handleDragStart = async (event: MouseEvent | TouchEvent) => {
		if (this.dnd.registry.isDragging) return;
		this.dnd.bus.on('dragLeave', this.goToInitialPlace.bind(this, undefined));
		event.preventDefault();
		this.isDragging = true;
		const _el = this.$el;

		if (_el?.getBoundingClientRect().left && _el?.getBoundingClientRect().top) {
			if (event instanceof MouseEvent) {
				this.relativeX = event.clientX - _el?.getBoundingClientRect().left;
				this.relativeY = event.clientY - _el?.getBoundingClientRect().top;
				this.createGhost(event.clientX, event.clientY);
			} else {
				const touch = event.touches.item(0);
				if (touch) {
					this.relativeX = touch.clientX - _el?.getBoundingClientRect().left;
					this.relativeY = touch.clientY - _el?.getBoundingClientRect().top;
					this.createGhost(touch.clientX, touch.clientY);
				}
			}
		}

		this.startGlobalEvent();

		this.dropZone = _el?.parentNode as HTMLElement;
		this.anchor = _el?.nextSibling as HTMLElement;

		if (this._droppable)
			this.dnd.registerDrag({
				data: this.props.data as Orion.DndData['data'],
				from: this._droppable.uid,
				to: null,
				index: null,
				canDrop: false,
				fromAsideOrModal: (this._aside?.uid) ?? (this._modal?.uid) ?? null,
			});
		this.dnd.emitDragStart();
	};

	createDragOrigin () {
		if (!this.document) return;

		const dragOrigin = this.document.createElement('div');
		dragOrigin.id = `dragOrigin-${this.uid}`;
		dragOrigin.style.display = 'none';
		this.$el?.parentNode?.insertBefore(dragOrigin as Node, this.$el);
	};

	createGhost (x: number, y: number) {
		if (!this.document) return;

		const boundingDraggedElement = this.$el?.getBoundingClientRect();
		this.ghost = this.$el?.cloneNode(true) as HTMLElement;
		this.ghost.classList.add('orion-draggable-clone');
		this.ghost.style.width = `${boundingDraggedElement?.width}px`;
		this.ghost.style.height = `${boundingDraggedElement?.height}px`;
		this.document.body.appendChild(this.ghost);
		this.handleDrag(x, y);
	};

	handleDrag (x: number, y: number) {
		if (this.ghost) {
			this.dnd.registry.cursor.x = x;
			this.dnd.registry.cursor.y = y;
			this.ghost.style.zIndex = '1000';
			this.ghost.style.transform = `translate3d(
				${x - this.relativeX}px,
				${y - this.relativeY}px,
				0
			)`;
		}
	};

	async handleDragEnd () {
		const draggedItem = useMonkey(this.dnd.registry.items).last();
		if (!draggedItem) return;

		if (draggedItem.to) this.dnd.emitDrop();

		if (!draggedItem.canDrop || !draggedItem.to) {
			await this.animateGhostBack();
		}

		this.removeGhost();
		this.dnd.bus.off('dragLeave', this.goToInitialPlace.bind(this, draggedItem));
		this.dnd.cleanRegistry();
		this.dnd.emitDragEnd();
	};

	animateGhostBack () {
		return new Promise((resolve) => {
			if (this.ghost) {
				if (this.anchor) {
					this.anchor.parentNode?.insertBefore(this.$el as Node, this.anchor);
				}

				this.ghost.addEventListener('transitionend', () => resolve(true), { once: true });
				const elementDraggingStyle = this.$el?.getBoundingClientRect();
				this.ghost.style.transition = 'all 0.3s ease-in-out';

				if (elementDraggingStyle && this.window) {
					this.ghost.style.top = `${elementDraggingStyle.top + this.window.scrollY}px`;
					this.ghost.style.left = `${elementDraggingStyle.left + this.window.scrollX}px`;
					this.ghost.style.transform = `translate3d(
						${0 - this.window.scrollX}px,
						${0 - this.window.scrollY}px,
						0
					)`;
				}
			} else {
				resolve(true);
			}
		});
	};

	removeGhost () {
		this.isDragging = false;
		this.ghost?.remove();
	};

	goToInitialPlace (payload: Orion.DndData | undefined) {
		if (payload)
			if (payload.data.__uid === this.props.data?.__uid) {
				const ghost = document?.querySelector('.orion-dragging:not(.orion-draggable-clone)');
				if (ghost) {
					this.anchor?.parentNode?.insertBefore(ghost, this.anchor);
				}
			}
	};
}
