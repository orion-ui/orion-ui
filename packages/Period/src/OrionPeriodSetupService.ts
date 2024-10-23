import { PropType, reactive, ref } from 'vue';
import SharedSetupService from '../../Shared/SharedSetupService';
import SharedProps from '../../Shared/SharedProps';
import { base } from '@faker-js/faker';

type Props = SetupProps<typeof OrionPeriodSetupService.props>
type PeriodEmits = {
	(e: 'update-begin', date: Date | undefined): void,
	(e: 'update-end', date: Date | undefined): void,
};

export default class OrionPeriodSetupService extends SharedSetupService<Props> {
	static props = {
		// @doc props/loading adds a loading icon and disables the button
		// @doc/fr props/loading ajoute une icône de chargement et désactive le bouton
		label: String,

		begin: {
			type: Date,
			required: true as const,
		},

		end: {
			type: Date,
			required: true as const,
		},

		taskCount: Number,

		taskDone: Number,

		color: { type: String as PropType<Orion.Color> },
	};

	_el = ref<RefDom>();

	uid = this.getUid();

	private state = reactive({});

	protected emit: PeriodEmits;

	onMounted () {
		super.onMounted();

		if (this._el.value) {
			console.log(+(this._el.value?.style.width.substring(0, this._el.value.style.width.length-2))
				/(this.props.end.getDate() - this.props.begin.getDate() + 1));
		}
	}

	get columns () { return this.document?.querySelectorAll('[id^="date-"]'); }
	get baseColumnLeft () {
		const columns = this.columns;
		if (columns && columns.length > 0) {
			return (columns[0] as HTMLElement).getBoundingClientRect().left;
		}
		return -1;
	}

	get columnWidth () {
		const columns = this.columns;
		if (columns && columns.length > 0) {
			return (columns[0] as HTMLElement).offsetWidth;
		}
		return -1;
	}

	constructor (props: Props, emit: PeriodEmits) {
		super(props);
		this.emit = emit;
	}

	newDateFromX (posX: number) {
		const columns = this.columns;
		if (columns && columns.length > 0) {
			const baseColumnLeft = (columns[0] as HTMLElement).getBoundingClientRect().left;
			const columnWidth = (columns[0] as HTMLElement).offsetWidth;
			const index = Math.floor((posX - baseColumnLeft) / columnWidth);
			const newDate = new Date(columns[index].id.substring(5));
			return newDate;
		}
	}

	stretchBegin (event: Event) {
		event.preventDefault();
		if (this._el.value) {
			const resizedElt = document.getElementById(this._el.value.id);
			if (resizedElt && this.document) {
				this.document.onmousemove = (e) => {
					const OldLeft = resizedElt.style.left;
					const baseLeft = this.baseColumnLeft;
					const maxLeft = parseInt(resizedElt.style.width) + parseInt(OldLeft) - this.columnWidth;
					console.log(Math.min((Math.max(e.pageX, baseLeft) - baseLeft), maxLeft), Math.max(e.pageX, baseLeft) - baseLeft);
					resizedElt.style.left = Math.min((Math.max(e.pageX, baseLeft) - baseLeft), maxLeft) + 'px';
					resizedElt.style.width = (parseInt(resizedElt.style.width) + (parseInt(OldLeft) - e.pageX + baseLeft)) + 'px';
				};
				this.document.onmouseup = (e) => {
					const newDate = this.newDateFromX(e.pageX);
					this.emit('update-begin', newDate);
					//faire un event
					/* const resizeHandleElt = document.getElementById(this._el.value?.id); */
					if (this.document) {
						this.document.onmousemove = null;
						this.document.onmouseup = null;
					}
				};
			}
		}
	}

	stretchEnd (event: Event) {
		event.preventDefault();
		if (this._el.value) {
			const resizedElt = document.getElementById(this._el.value.id);
			if (resizedElt && this.document) {
				this.document.onmousemove = (e) => {
					const baseLeft = this.baseColumnLeft;
					resizedElt.style.width = Math.max(e.pageX - parseInt(resizedElt.style.left) - baseLeft, this.columnWidth) + 'px';
				};
				this.document.onmouseup = (e) => {
					const newDate = this.newDateFromX(e.pageX);
					this.emit('update-end', newDate);
					//faire un event
					/* const resizeHandleElt = document.getElementById(this._el.value?.id); */
					if (this.document) {
						this.document.onmousemove = null;
						this.document.onmouseup = null;
					}
				};
			}
		}
	}
}
