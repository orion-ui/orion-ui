import { PropType, reactive, ref, nextTick } from 'vue';
import SharedSetupService from '../../Shared/SharedSetupService';

type Props = SetupProps<typeof OrionDateRangeSetupService.props>
type DateRangeEmit = {
	(e: 'update:modelValue', payload: Nil<Orion.DateRange>): void
	(e: 'select-range', payload: Orion.DateRange): void
}

export default class OrionDateRangeSetupService extends SharedSetupService<Props> {
	static props = {
		modelValue: {
			type: Object as PropType<Nil<Orion.DateRange>>,
			default: undefined,
		},
		minDate: {
			type: Date,
			default: undefined,
		},
		maxDate: {
			type: Date,
			default: undefined,
		},
	};

	private emit: DateRangeEmit;
	private state = reactive({
		selecting: false,
		dayHover: new Date(),
	});

	_start = ref<OrionDateTable>();
	_end = ref<OrionDateTable>();

	get dayHover () { return this.state.dayHover; }
	set dayHover (val) { this.state.dayHover = val; }

	get allowMiddleNextOrPrevMonth () {
		if (!this._start.value || !this._end.value) return false;

		const startDate = new Date(this._start.value.getCurrentDate());
		startDate.setDate(1);

		const endDate = new Date(this._end.value.getCurrentDate());
		endDate.setDate(1);

		return startDate.getFullYear() < endDate.getFullYear() || startDate.getMonth() < (endDate.getMonth() - 1);
	}

	get canGoNextMonth () {
		if (!this._start?.value || !this.vModel?.start) return this.allowMiddleNextOrPrevMonth;

		return this.allowMiddleNextOrPrevMonth &&
			(this._start.value.getCurrentMonth() < this.vModel.start.getMonth() || this._start.value.getCurrentYear() < this.vModel.start.getFullYear());
	}

	get canGoPrevMonth () {
		if (!this._end?.value || !this.vModel?.start) return this.allowMiddleNextOrPrevMonth;

		return this.allowMiddleNextOrPrevMonth &&
			(this._end.value.getCurrentMonth() > this.vModel.start.getMonth() || this._end.value.getCurrentYear() > this.vModel.start.getFullYear());
	}

	get vModel () {
		return this.props.modelValue;
	}

	set vModel (val) {
		this.emit('update:modelValue', val);

		if (!!val?.start && !!val.end) {
			this.emit('select-range', val);
		} else {
			nextTick(() => {
				if (!!val?.start && !val.end && this._end.value && this._end.value.getCurrentDate().valueOf() <= val.start.valueOf()) {
					const start = new Date(val.start);
					start.setMonth(start.getMonth() + 1);
					this._end.value?.selectYear(start.getFullYear());
					this._end.value?.selectMonth(start.getMonth());
				}
			});
		}
	}


	constructor (props: Props, emit: DateRangeEmit) {
		super(props);
		this.emit = emit;
	}

	protected async onBeforeMount () {
		if (!this.vModel) {
			this.vModel = {};
		}
	}


	handleChangeMonth (from: 'start' | 'end') {
		nextTick(() => {
			if (!this._start.value || !this._end.value) return;

			if (this.vModel?.selecting
				&& this.vModel.start
				&& this.vModel.start.valueOf() > this._start.value?.getCurrentDate().valueOf()) {
				if (from === 'start') {
					this._end.value.selectYear(this.vModel.start.getFullYear());
					this._end.value.selectMonth(this.vModel.start.getMonth());
				} else if (from === 'end') {
					this._start.value.selectYear(this.vModel.start.getFullYear());
					this._start.value.selectMonth(this.vModel.start.getMonth());
				}
			}
		});
	}
}
