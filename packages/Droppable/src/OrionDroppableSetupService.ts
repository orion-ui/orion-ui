import mitt from 'mitt';
import { watch, nextTick } from 'vue';
import SharedSetupService from '../../Shared/SharedSetupService';
import useDragNDrop from 'services/DragNDropService';
import useMonkey from 'services/MonkeyService';
import { toggleGlobalListener } from 'utils/tools';

export type OrionDroppableEmits = {
	(e: 'dropIn', payload: any): void ;
	(e: 'dragOver'): void ;
	(e: 'dragLeave'): void ;
	(e: 'reorder', payload: any): void ;
	(e: 'dropOut', payload: any): void ;
	(e: 'update:datalist', payload: any): void ;}

export type OrionDroppableProps = {
	// @doc props/datalist datas of the component
	// @doc/fr props/datalist liste d'objets du composant
	datalist?: DataListItem[],
	// @doc props/tag the tag or component of the droppable area
	// @doc/fr props/tag tag ou composant qui représentera la zone de drop
	tag: string,
	// @doc props/validation allows you to add a validation before the item drops
	// @doc/fr props/validation permet d'ajouter une validation avant de déposer un objet dans la zone
	validation?: Orion.DndValidation,
};

type DataListItem = Record<string, any>;

export default class OrionDroppableSetupService extends SharedSetupService {
	static readonly defaultProps = { tag: 'div' };

	isHovering = false;
	isMounted = false;
	validationState = undefined as Undef<boolean>;
	globalMouseEventUid = undefined as Undef<number>;
	globalTouchEventUid = undefined as Undef<number>;

	uid = this.getUid();

	private _modal?: OrionModal;
	private _aside?: OrionAside;

	private dnd = useDragNDrop();

	private bus = mitt<{
		dropIn: any;
		dragOver: any;
		dragLeave: any;
		reorder: any;
		dropOut: any;
	}>();

	get datalist () { return this.props.datalist; }

	get publicInstance () {
		return {
			...super.publicInstance,
			uid: this.uid,
		};
	}

	get $el () {
		return this.document?.getElementById(`orion-droppable-${this.uid}`);
	}

	get canHandle () {
		const popableUid = useMonkey(this.dnd.registry.items)?.last()?.fromAsideOrModal;

		if (!popableUid) { // pas de popable
			return true;
		} else {
			return (this._modal?.uid === popableUid || this._aside?.uid===popableUid);
			//|| !this.$overlay.visible;
		}
	}

	get tag () {
		return this.props.tag;
	}

	get canDrop () {
		if (useMonkey(this.dnd.registry?.items)?.last()?.from === this.uid) return true;
		const lastItem = useMonkey(this.dnd.registry.items).last() as Orion.DndData;
		if (lastItem)
			return this.props.validation?.method(lastItem) ?? true;
		return false;
	}

	get isDragging (): boolean {
		return this.dnd.registry.isDragging;
	}

	get isDraggingOver (): boolean {

		if (!this.canHandle) return false;
		// Si le drag element vient d'une aside ou modal, vérifie si la zone de drop est dans l'aside
		if (this.isMounted) {
			const { x, y } = this.dnd.registry.cursor;
			if (x !== null && y !== null && this.$el) {
				const { top, bottom, left, right } = this.$el?.getBoundingClientRect();
				return (x >= left) && (x <= right) && (y >= top) && (y <= bottom);
			}
		}
		return false;
	}

	constructor (protected props: OrionDroppableProps, protected emits: OrionDroppableEmits, _modal?: OrionModal, _aside?: OrionAside) {
		super();

		this._modal = _modal;
		this._aside = _aside;

		this.bus.on('*', (type, e) => this.emits(type as any, e as any));

		this.emits('update:datalist', this.datalist?.map(x => ({
			...x,
			__uid: this.getUid(),
		})));

		watch(() => this.isDraggingOver, (val) => {
			const lastItem = useMonkey(this.dnd.registry.items)?.last();
			if (val && lastItem) {
				lastItem.to = this.uid;
				this.bus.emit('dragOver');
			} else if (lastItem) {
				lastItem.to = null;
				this.bus.emit('dragLeave');
				this.dnd.emitDragLeave();
			}
		});
	}

	protected onMounted () {
		// bypass non reactive this.$el in isDraggingOver computed
		this.isMounted = true;

		this.bus.on('dropIn', (val: DataListItem) => {
			this.document?.querySelector('.orion-dragging')?.remove();
			const lastItem = useMonkey(this.dnd.registry.items).last();
			if (!lastItem)
				return;

			const { index } = lastItem;
			if (typeof index === 'number') {
				const toEmit = this.datalist;
				toEmit?.splice(index, 0, val);
				this.emits('update:datalist', toEmit);
			}
		});

		this.bus.on('dropOut', (val: DataListItem) => {
			if (!this.datalist) return;
			const toEmit = useMonkey(this.datalist).delete(val);
			this.emits('update:datalist', toEmit);
		});

		this.bus.on('reorder', (val: DataListItem) => {
			if (!this.datalist) return;
			const toEmit = useMonkey(this.datalist).delete(val, '__uid');
			const lastItem = useMonkey(this.dnd.registry.items).last();

			if (!lastItem) return;

			const { index } = lastItem;
			if (typeof index === 'number') {
				toEmit.splice(index, 0, val);
				this.emits('update:datalist', toEmit);
			}
		});

		this.dnd.bus.on('dragStart', () => {
			this.globalMouseEventUid = toggleGlobalListener('mousemove', () => {
				if (this.isDraggingOver) {
					this.handleDragOver();
				}
			});
			this.globalTouchEventUid = toggleGlobalListener('touchmove', () => {
				if (this.isDraggingOver) {
					this.handleDragOver();
				}
			});
		});

		this.dnd.bus.on('dragEnd', () => {
			toggleGlobalListener(this.globalMouseEventUid as number);
			toggleGlobalListener(this.globalTouchEventUid as number);
		});

		this.dnd.bus.on('drop', async (payload: Orion.DndData | undefined) => {
			if (!payload || payload.index === null) return;

			if (payload.from === payload.to && this.datalist?.find(x => x.__uid === payload.data.__uid)) {
				this.bus.emit('reorder', payload.data);
			} else if (this.uid === payload.to) {
				this.handleDrop(payload);
			} else if (this.uid === payload.from) {
				if (payload.canDrop) {
					nextTick(() => {
						this.bus.emit('dropOut', payload.data);
					});
				}
			}
		});
	}


	handleDrop (payload: Orion.DndData) {
		if (this.canDrop) {
			this.bus.emit('dropIn', payload.data);
		} else {
			this.props.validation?.notif(useMonkey(this.dnd.registry.items).last()?.data);
		}
	};

	handleDragOver () {
		if (!this.document) return;

		const lastItem = useMonkey(this.dnd.registry.items).last();

		if (!lastItem || this.dnd.registry.cursor.y === null) return;
		lastItem.canDrop = this.canDrop;

		if (!this.canDrop)
			return;

		lastItem.to = this.uid;

		const { index, element: elementAfter, siblings } = this.getDraggedContext((this.$el as HTMLElement), this.dnd.registry.cursor.y);
		if (this.dnd.registry.items.length && lastItem)
			lastItem.index = index;

		const dragged = this.document.querySelector('.orion-dragging');
		if (!dragged) return;

		const dropzone = this.$el?.querySelector('.orion-droppable-dropzone');
		if (siblings?.length) {
			const lastSibling = siblings[siblings.length - 1];

			if (elementAfter) {
				lastSibling.parentNode?.insertBefore(dragged, elementAfter);
			} else {
				lastSibling.parentNode?.insertBefore(dragged, lastSibling.nextSibling);
			}
		} else {
			dropzone?.parentElement?.insertBefore(dragged, dropzone);
		}
	};

	getDraggedContext (container: HTMLElement, y: number) {
		const siblings = [ ...container.querySelectorAll('.orion-draggable:not(.orion-dragging)')];
		let closest = {
			offset: Number.NEGATIVE_INFINITY,
			index: null as Nullable<number>,
			element: null as Nullable<Element>,
			siblings: null as Nullable<Element[]>,
		};
		siblings.forEach((element, index) => {
			const { top, height } = element.getBoundingClientRect();
			const offset = y - top - height/2;
			if (offset < 0 && offset > closest.offset) {
				closest = {
					offset,
					index,
					element,
					siblings,
				};
			}
		});

		if (closest.index !== null) {
			return closest;
		} else {
			closest = {
				...closest,
				element: null,
				index: siblings.length,
				siblings,
			};
			return closest;
		}
	};
}
