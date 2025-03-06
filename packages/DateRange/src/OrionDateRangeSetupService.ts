import { reactive, ref, nextTick, ModelRef } from 'vue';
import SharedSetupService from '../../Shared/SharedSetupService';

export type OrionDateRangeProps = {
	displayWeekNumber: boolean,
	minDate?: Date,
	maxDate?: Date,
}
export type OrionDateRangeEmits = {
	(e: 'select-range', payload: Orion.DateRange): void
}

export default class OrionDateRangeSetupService extends SharedSetupService {
	static readonly defaultProps = {};

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
		if (this.dateRangeSameMonth) {
			endDate.setMonth(endDate.getMonth() + 1);
		}

		if (startDate.getFullYear() < endDate.getFullYear()) {
			if (startDate.getFullYear() === endDate.getFullYear() - 1) {
				if (startDate.getMonth() === 11 && endDate.getMonth() === 0) {
					return false;
				}
			}
			return true;
		}

		return startDate.getFullYear() < endDate.getFullYear() || startDate.getMonth() < (endDate.getMonth() - 1);
	}

	get canGoNextMonth () {
		if (!this._start?.value || !this.vModelProxy?.start) return this.allowMiddleNextOrPrevMonth;

		return this.allowMiddleNextOrPrevMonth &&
			(this._start.value.getCurrentMonth() < this.vModelProxy.start.getMonth()
			|| this._start.value.getCurrentYear() < this.vModelProxy.start.getFullYear());
	}

	get canGoPrevMonth () {
		if (!this._end?.value || !this.vModelProxy?.start) return this.allowMiddleNextOrPrevMonth;

		return this.allowMiddleNextOrPrevMonth &&
			(this._end.value.getCurrentMonth() > this.vModelProxy.start.getMonth() || this._end.value.getCurrentYear() > this.vModelProxy.start.getFullYear());
	}

	get vModelProxy () {
		return this.vModel.value;
	}

	set vModelProxy (val) {
		this.vModel.value = val;

		if (!!val?.start && !!val.end) {
			this.emits('select-range', val);
		} else {
			nextTick(() => {
				if (!!val?.start && !val.end && this._end.value && this._end.value.getCurrentDate().valueOf() <= val.start.valueOf()) {
					const start = new Date(val.start.getFullYear(), val.start.getMonth()+1, 1);
					this._end.value?.selectYear(start.getFullYear());
					this._end.value?.selectMonth(start.getMonth());
				}
			});
		}
	}

	get dateRangeSameMonth () {
		return !!this.vModel.value && !!this.vModel.value.start && !!this.vModel.value.end
		&& this.vModel.value.start?.getMonth() === this.vModel.value.end?.getMonth()
		&& this.vModel.value.start?.getFullYear() === this.vModel.value.end?.getFullYear();
	}

	constructor (protected props: OrionDateRangeProps, protected emits: OrionDateRangeEmits, protected vModel: ModelRef<Nil<Orion.DateRange>>) {
		super();
	}

	protected async onBeforeMount () {
		if (!this.vModel.value) {
			this.vModelProxy = {};
		}
	}


	handleChangeMonth (from: 'start' | 'end') {
		nextTick(() => {
			if (!this._start.value || !this._end.value) return;

			if (this.vModelProxy?.selecting
				&& this.vModelProxy.start
				&& this.vModelProxy.start.valueOf() > this._start.value?.getCurrentDate().valueOf()) {
				if (from === 'start') {
					this._end.value.selectYear(this.vModelProxy.start.getFullYear());
					this._end.value.selectMonth(this.vModelProxy.start.getMonth());
				} else if (from === 'end') {
					this._start.value.selectYear(this.vModelProxy.start.getFullYear());
					this._start.value.selectMonth(this.vModelProxy.start.getMonth());
				}
			}
		});
	}
}
