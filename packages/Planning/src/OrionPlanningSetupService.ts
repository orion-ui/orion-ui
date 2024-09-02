import { reactive, ref, PropType } from 'vue';
import SharedSetupService from '../../Shared/SharedSetupService';
import SharedProps from '../../Shared/SharedProps';
import { debounce } from 'lodash-es';
import { useMonkey } from 'services';
import { getUid } from 'lib';

type Props = SetupProps<typeof OrionPlanningSetupService.props>;
type PlanningEmit = {
	(e: 'update:dateRange', payload: Orion.Planning.DateRangeType): void;
};

export default class OrionPlanningSetupService extends SharedSetupService<Props> {
	static props = {
		// @doc props/loading adds a loading icon and disables the button
		// @doc/fr props/loading ajoute une icône de chargement et désactive le bouton
		name: String,

		dayStart: {
			type: Date,
			required: true as const,
			default: new Date(),
		},

		dayEnd: {
			type: Date,
			required: true as const,
			default: new Date(),
		},

		date: {
			type: Date,
			required: true as const,
			default: new Date(),
		},

		dateRange: {
			type: String as PropType<Orion.Planning.DateRangeType>,
			default: 'day',
		},

		items: {
			type: Array<Orion.Planning.Item>,
			required: true as const,
		},
	};

	get activePeriod () { return this.getDisplayDates();};
	get baseRect () { return document.getElementsByClassName('orion-planning-day')[0].getBoundingClientRect();}
	protected emit: PlanningEmit;

	uid = this.getUid();

	public state = reactive({ showContextMenu: false });

	get lastItemId () { return useMonkey(this.props.items).last()?.id;}
	get showContextMenu () { return this.state.showContextMenu; }
	set showContextMenu (val) { this.state.showContextMenu = val; }

	getDates (startDate: Date, stopDate: Date) {
		const activeDays = [];
		const currentDate = startDate;
		while (currentDate < stopDate) {
			activeDays.push(new Date(currentDate));
			currentDate.setDate(currentDate.getDate() + 1);
		}
		return activeDays;
	}

	getDisplayDates () {
		let dayStart: Date;
		let dayEnd: Date;
		switch (this.props.dateRange) {
		case 'day':
			return [ this.props.date ];
		case 'week':
			dayStart = new Date(this.props.date);
			while (dayStart.getDay() !== 1) {
				dayStart.setDate(dayStart.getDate() - 1);
			}
			dayEnd = new Date(dayStart);
			dayEnd.setDate(dayEnd.getDate() + 7);
			return this.getDates(dayStart, dayEnd);
		case 'month':
			dayStart = new Date(this.props.date);
			dayStart.setDate(1);
			dayEnd = new Date(dayStart);
			dayEnd.setMonth(dayEnd.getMonth() + 1);
			return this.getDates(dayStart, dayEnd);
		}
	}

	placeItemInPlanning = debounce(async () => {
		//const datesElts = document.getElementsByClassName('orion-planning-day');

		if (!this.baseRect) return;
		//const rectBase = datesElts[0].getBoundingClientRect();

		let currentTop = 48;

		this.props.items.forEach((item) => {
			currentTop = this.placeItem(item, this.baseRect.left, currentTop);

			let currentsubItem = item.subItem;
			while (currentsubItem) {
				currentTop = this.placeItem(currentsubItem, this.baseRect.left, currentTop);
				currentsubItem = currentsubItem.subItem;
			}

		});
	}, 17);

	placeItem (item: Orion.Planning.Item, leftBase: number, currentTop: number) {
		const itemElt = document.getElementById('item-' + item.id);
		const beginElt = document.getElementById(`date-${useMonkey(item.begin).toReadable('$DD-$MM-$YYYY')}`);
		const endElt = document.getElementById(`date-${useMonkey(item.end).toReadable('$DD-$MM-$YYYY')}`);
		let beginPos = -16;

		if (!itemElt) return currentTop;
		itemElt.style.display = 'flex';
		if (!beginElt && !endElt) {
			itemElt.style.display = 'none';
			return currentTop;
		}
		if (!beginElt) itemElt.style.left = '-1rem';
		else {
			const rectBegin = beginElt.getBoundingClientRect();
			itemElt.style.left = rectBegin.left - leftBase + 'px';
			beginPos = rectBegin.left - leftBase;
		}
		if (!endElt) itemElt.style.right = '-1rem';
		else {
			const rectEnd = endElt.getBoundingClientRect();
			itemElt.style.width = rectEnd.right - beginPos - leftBase + 'px';
		}

		itemElt.style.top = currentTop + 'px';
		currentTop += itemElt.getBoundingClientRect().height + 4;

		return currentTop;
	}

	enableDropping (e: DragEvent) {
		e.preventDefault();
	}

	handleDragStart (itemEltId: string) {
		return (e: DragEvent) => {
			this.showContextMenu = false;
			e.dataTransfer?.setData('text', itemEltId);
		};
	}

	handleDragEnterEvent (e: DragEvent) {
		if (!(e.target as HTMLElement).classList.contains('orion-planning-day__content--drag-active')) {
			(e.target as HTMLElement).className += ' orion-planning-day__content--drag-active';
		}
	}

	handleDragExitEvent (e: DragEvent) {
		const elt = e.target as HTMLElement;
		elt.className = elt.className.replace('orion-planning-day__content--drag-active', '');
	}

	handleDropEvent (e: DragEvent) {
		const elt = e.target as HTMLElement;
		elt.className = elt.className.replace('orion-planning-day__content--drag-active', '');

		const idItem = e.dataTransfer?.getData('text');
		if (!idItem) return;
		const itemElt = document.getElementById(idItem);
		if (!itemElt) return;

		itemElt.style.left = elt.getBoundingClientRect().left - document.getElementsByClassName('orion-planning-day')[0].getBoundingClientRect().left + 'px';
		/* const id = +idItem.substring(idItem.indexOf('-')+1);
		this.props.items.forEach((evt) => {
			if (evt.id = id) {
				evt.begin = new Date(elt.id.substring(5));
				console.log(evt);
			}
		}); */
	}

	createItem () {
		const newItem = {} as Orion.Planning.Item;
		newItem.begin = new Date();
		newItem.end = new Date();
		newItem.label = 'test';
		newItem.id = getUid();
		newItem.color = 'info';
		this.props.items.push(newItem);
		this.placeItemInPlanning();
	}

	onBeforeMounted () {
		super.onBeforeMount();
	}

	onMounted () {
		this.placeItemInPlanning();
		window.addEventListener('resize', this.debouncePlaceItemInPlanning.bind(this));

		if (this._el.value) {
			this._el.value.addEventListener('contextmenu', (e) => {
				this.showContextMenu = true;
				const contextMenuElt = document.getElementById(`context-menu-planning-${this.uid}`);
				if (!contextMenuElt) return;
				else {
					e.preventDefault();
					contextMenuElt.style.left = e.pageX + 'px';
					contextMenuElt.style.top = e.pageY + 'px';
				}
			});
		}

		this.document?.addEventListener('click', () => { this.showContextMenu = false;});
	}

	onUnmounted () {
		this.window?.removeEventListener('resize', this.debouncePlaceItemInPlanning.bind(this));
	};

	debouncePlaceItemInPlanning () {
		this.placeItemInPlanning();
	}

	isSameDay (d1 : Date, d2 : Date) {
		return d1.getDate() === d2.getDate() &&
				d1.getMonth() === d2.getMonth() &&
				d1.getFullYear() === d2.getFullYear();
	}

	changeDateRange (dateRange: Orion.Planning.DateRangeType) {
		this.emit('update:dateRange', dateRange);
		this.debouncePlaceItemInPlanning();
	}

	constructor (props: Props, emit: PlanningEmit) {
		super(props);
		this.emit = emit;
	}
}
