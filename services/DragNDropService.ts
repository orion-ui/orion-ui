import { forEachRight } from 'lodash-es';
import mitt from 'mitt';
import { reactive } from 'vue';
import { useMonkey } from './MonkeyService';

type DndRegistry = {
	isDragging: boolean;
	cursor: { x: Nullable<number>, y: Nullable<number> };
	items: Orion.DndData[];
}

class DragNDropService {
	bus = mitt<{
		drop: Orion.DndData | undefined;
		dragStart: Orion.DndData | undefined;
		dragEnd: Orion.DndData | undefined;
		dragLeave: Orion.DndData | void;
	}>();

	registry = reactive<DndRegistry>({
		get isDragging () {
			return this.cursor.x !== null && this.cursor.y !== null;
		},
		cursor: {
			x: null,
			y: null,
		},
		items: [],
	});

	registerDrag (payload: Orion.DndData) {
		this.registry.items.push(payload);
	}

	emitDrop () {
		this.bus.emit('drop', useMonkey(this.registry.items).last());
	}

	emitDragStart () {
		this.bus.emit('dragStart', useMonkey(this.registry.items).last());
	}

	emitDragEnd () {
		this.bus.emit('dragEnd', useMonkey(this.registry.items).last());
	}

	emitDragLeave () {
		this.bus.emit('dragLeave', useMonkey(this.registry.items).last());
	}

	cleanRegistry () {
		this.registry.cursor.x = null;
		this.registry.cursor.y = null;
		forEachRight(this.registry.items, (x, i) => {
			if (x.to === null) this.registry.items.splice(i, 1);
		});
	}
}

const serviceInstance = new DragNDropService();

export default function useDragNDrop () {
	return serviceInstance;
}
