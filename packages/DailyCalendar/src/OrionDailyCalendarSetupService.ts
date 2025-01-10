import SharedSetupService from '../../Shared/SharedSetupService';
import { ModelRef, nextTick, reactive, ref, watch } from 'vue';
import { cloneDeep } from 'lodash-es';
import useMonkey from 'services/MonkeyService';
import { useLang } from 'services';

export type OrionDailyCalendarEmits = {}
export type OrionDailyCalendarProps = {
	// @doc props/dayTasks tasks array
	// @doc/fr props/dayTasks le tableau de qui contient les tâches du jour
	dayTasks?: Orion.DailyCalendarTask[],
	// @doc props/range hour range displayed.
	// @doc/fr props/range la plage horaire affichée.
	range?: number[],
};
export default class OrionDailyCalendarSetupService extends SharedSetupService {
	static readonly defaultProps = {
		range: () => ([
			8,
			18,
		]),
	};

	_calendar = ref<RefDom>();

	uid = this.getUid();

	private state = reactive({
		hourNow: null as Nullable<string>,
		calendarRange: [8, 18],
		elementsAreHidden: false as Nullable<boolean>,
	});

	get hourNow () { return this.state.hourNow; }
	set hourNow (val) { this.state.hourNow = val; }

	get calendarRange () { return this.state.calendarRange; }
	set calendarRange (val) { this.state.calendarRange = val; }

	get elementsAreHidden () { return this.state.elementsAreHidden; }
	set elementsAreHidden (val) { this.state.elementsAreHidden = val; }

	get today () {
		return useMonkey(new Date(this.date.value)).toMidnight().valueOf() === useMonkey(new Date()).toMidnight().valueOf();
	}

	get readableDate () {
		return useMonkey(this.date.value).toReadable();
	}

	get taskOfTheDay () {
		const taskOfTheDay = this.props.dayTasks?.filter(
			task => useMonkey(task.start).toReadable() === useMonkey(new Date(this.date.value)).toReadable());

		const tasksToReturn: Orion.DailyCalendarTask[] = [];
		const tasksBufferArray: Orion.DailyCalendarTask[][] = [];

		function tasksAreIntersecting (taskA: Orion.DailyCalendarTask, taskB: Orion.DailyCalendarTask) {
			return (taskB.start.valueOf() >= taskA.start.valueOf() && taskB.start.valueOf() < taskA.end.valueOf())
					|| (taskB.end.valueOf() > taskA.start.valueOf() && taskB.start.valueOf() < taskA.end.valueOf());
		}

		function taskIntersectWithTaskInArr (task: Orion.DailyCalendarTask, arr: Orion.DailyCalendarTask[]) {
			return arr.findIndex(arrTask => tasksAreIntersecting(arrTask, task)) > -1;
		}

		if (!taskOfTheDay) return;
		for (const task of taskOfTheDay) {
			if (!tasksBufferArray.length) {
				tasksBufferArray.push([task]);
			} else {
				for (let index = 0; index < tasksBufferArray.length; index++) {
					const taskArr = tasksBufferArray[index];
					if (taskIntersectWithTaskInArr(task, taskArr)) {
						if ((tasksBufferArray[index + 1] !== undefined)) {
							continue;
						}
						tasksBufferArray.push([task]);
						break;
					} else {
						taskArr.push(task);
						break;
					}
				}
			}
		}

		tasksBufferArray.forEach((arr, i) => {
			arr.forEach((task) => {
				task.column = i;
				tasksToReturn.push(task);
			});
		});

		return tasksToReturn;
	}

	// @doc vModel/date the selected date.
	// @doc/fr vModel/date la date sélectionnée.
	constructor (protected props: OrionDailyCalendarProps & Omit<typeof OrionDailyCalendarSetupService.defaultProps, 'range'> & {range:  number[]},
		protected emits: OrionDailyCalendarEmits,
		protected date: ModelRef<Date>) {
		super();

		watch(() => this.taskOfTheDay, () => {
			nextTick(() => {
				this.elementsAreHidden = false;
				this.setCalendarRange();
				this.observeHiddenTasks();
			});
		});

		watch(() => this.props.range, () => {
			this.setCalendarRange();
			this.scrollToRange();
		});

	};

	protected onMounted () {
		this.setCalendarRange();
		this.observeHiddenTasks();
		setInterval(() => {
			const date = new Date();
			const hour = (date.getHours().toString().length < 2) ? `0${date.getHours()}` : date.getHours();
			const minutes = (date.getMinutes().toString().length < 2) ? `0${date.getMinutes()}` : date.getMinutes();
			this.hourNow = `${hour}:${minutes}`;
		}, 1000);
		this.scrollToRange();
	};


	taskTooltip (task : Orion.DailyCalendarTask): object {
		const taskStartHour = useMonkey(task.start).toReadable('$hh:$mm $a');
		const taskEndHour = useMonkey(task.end).toReadable('$hh:$mm $a');
		const taskHourLabel = useLang().HOUR_FROM_TO
			.replace('$start', taskStartHour)
			.replace('$end', taskEndHour);

		return {
			html: true,
			content: `<b style="display: block; margin-bottom: 0.5rem;">${taskHourLabel}</b> 
			<div style="max-width: calc(200rem / 16);">${task?.title}</div>`,
		};
	};

	scrollToRange () {
		const calendar = this.document?.getElementById('calendar-' + this.uid);
		if (calendar)
			calendar.scrollTop =(this.props.range[0] - this.calendarRange[0]) * 50;
	}

	setCalendarRange () {
		this.calendarRange = cloneDeep(this.props.range);
		this.props.dayTasks?.forEach((task) => {
			const start = new Date(task.start).getHours();
			const end = new Date(task.end).getHours();
			const first = useMonkey(this.calendarRange).first();
			const last = useMonkey(this.calendarRange).last();
			if (first && start < first) {
				this.calendarRange[0] = start;
			}
			if (last && end > last) {
				this.calendarRange[1] = end;
			}
		});
	};

	scrollDown () {
		const calendar = this.document?.getElementById('calendar-' + this.uid) as HTMLElement;
		calendar.style.scrollBehavior = 'smooth';
		calendar.scrollTop = calendar.scrollHeight;
		this.observeHiddenTasks();
	};

	observeHiddenTasks () {
		if (!this.document) return;

		const tasks = this.document.querySelectorAll(`.orion-daily-calendar-${this.uid}__task`);
		const calendar = this.document?.getElementById('calendar-' + this.uid) as HTMLElement;
		let testHidden = false;

		for (const task of tasks) {
			if (task.getBoundingClientRect().top > (calendar.getBoundingClientRect().bottom)) {
				testHidden = true;
				break;
			}
			testHidden = false;
		}

		this.elementsAreHidden = testHidden;
	};

	handleTaskClick (task: Orion.DailyCalendarTask) {
		if (!task.callback) return;
		task.callback(task);
	};

	getNextDay () {
		const date = new Date(this.date.value);
		this.date.value = new Date(date.setDate(date.getDate() + 1));
	};

	getPreviousDay () {
		const date = new Date(this.date.value);
		this.date.value = new Date(date.setDate(date.getDate() - 1));
	};

	isNearFromNow (hour: number) {
		if (!this.today) return undefined;
		const hourToDisplay = this.toHourDisplay(hour + this.calendarRange[0] - 1);
		const difference = this.hourToDecimal(hourToDisplay) - this.hourToDecimal(this.hourNow);
		if (difference < 0.2 && difference > -0.2) return 'opacity: 0;';
		else return 'opacity: 1;';
	};

	toHourDisplay (hour: number) {
		const hourToString = hour.toString();
		return (hourToString.length > 1) ? `${hourToString}:00` : `0${hourToString}:00`;
	};

	taskStyle (task: Orion.DailyCalendarTask) {
		const startHour = new Date(task.start).getHours().toString().padStart(2, '0') + ':' + new Date(task.start).getMinutes().toString().padStart(2, '0');
		const taskGroupNumber = task.column ?? 0;
		const taskHoursNumber = (task.end.valueOf() - task.start.valueOf()) / (60*60*1000);
		let last = undefined;
		if (this.taskOfTheDay)
			last = useMonkey(this.taskOfTheDay).last();
		let numberOfColumn = 0;

		if (last) numberOfColumn = (last.column ?? 0) + 1;

		const style = {
			left: `${(100 / numberOfColumn) * taskGroupNumber}%`,
			width: `${100 / numberOfColumn}%`,
			height: `calc(${taskHoursNumber * 51}rem / 16)`,
			top: `calc((${(this.hourToDecimal(startHour) - this.calendarRange[0]) * 51}rem / 16) + (25rem / 16))`,
			overflow: 'hidden',
		};
		return style;
	};

	taskParagraphStyle (task: Orion.DailyCalendarTask) {
		const numberOfLines = ((((task.end.valueOf() - task.start.valueOf()) / (60*60*1000)) * 50) - 10) / 14;
		return {
			textOverflow: 'ellipsis',
			display: '-webkit-box',
			webkitBoxOrient: 'vertical',
			webkitLineClamp: Math.round(numberOfLines),
			overflow: 'hidden',
		};
	};

	hourToDecimal (hour: Nullable<string>) {
		if (!hour) return 0;
		const hourSplited = {
			heure: hour.split(':')[0],
			min: hour.split(':')[1],
		};
		const minToDecimal = (Math.floor((Number(hourSplited.min ?? 0) / 60)*100));
		const hourToDecimal = `${parseInt(hourSplited.heure)}.${minToDecimal.toString().padStart(2, '0')}`;
		return parseFloat(hourToDecimal);
	};

}
