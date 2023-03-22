import { PropType, reactive, ref, Slots } from 'vue';
import SharedSetupService from '../../Shared/SharedSetupService';

type Props = SetupProps<typeof OrionSwipeSetupService.props>
type SwipeDirection = 'left' | 'right';

export default class OrionSwipeSetupService extends SharedSetupService<Props> {
	static props = {
		// @doc props/direction direction of the swipe animation
		// @doc/fr props/direction direction de l'animation du swipe
		direction: {
			type: String as PropType<SwipeDirection>,
			default: 'left',
			validator: (val: string) => ['left', 'right'].includes(val),
		},
	};

	_actions = ref<RefDom>();

	private slots: Slots;
	private state = reactive({
		offset: 0,
		offsetTriggerValue: 60,
		offsetOrigin: 0,
		actionsCount: 0,
		isTouch: false,
		isSwiping: false,
		touchStart: 0,
		touchStartY: 0,
		touchEnd: null,
		isClicked: false,
	});

	get cssOffset () {
		let offsetVar = this.state.offset;
		if (this.props.direction === 'left' && !this.state.isSwiping) {
			offsetVar = -offsetVar;
		}
		return offsetVar + 'px';
	}

	get actionsPosition () {
		return this.props.direction === 'left' ? 'right' : 'left';
	}

	get isTouch () {
		return this.state.isTouch;
	}


	constructor (props: Props, slots: Slots) {
		super(props);
		this.slots = slots;
	}

	protected onMounted () {
		this.window?.addEventListener('touchstart', () => {
			if (!this.state.isClicked) this.state.offset = 0;
		});
		this.setActionsCount();
	}

	protected onUpdated () {
		this.setActionsCount();
	}


	private setActionsCount () {
		if (this.slots.actions) {
			this.state.actionsCount = this.slots.actions().length ?? 0;
			if (this.state.offset && !this.state.isSwiping && !this.state.isTouch) {
				this.handleHover();
			}
		}
	}

	touchCallback () {
		this.state.isClicked = true;
		setTimeout(() => {
			this.state.isClicked = false;
		}, 50);
	}

	handleHover (reset = false) {
		if (reset) {
			this.state.offset = 0;
		} else {
			this.state.offset = this._actions.value?.getBoundingClientRect().width ?? 0;
		}
	}

	handleTouchStart (event: any) {
		if (!this._actions.value) return;

		if (event !== null) {
			this.state.touchStart = event.touches[0].clientX;
			this.state.touchStartY = event.touches[0].clientY;
			this.state.offsetOrigin = this.props.direction === 'right' ? this.state.offset : -this.state.offset;
		}
	}

	handleTouchMove (event: any) {
		if (!this._actions.value) return;

		if ((event.touches[0].clientY > this.state.touchStartY + 100) || (event.touches[0].clientY < this.state.touchStartY - 100)) {
			this.state.offset = 0;
			return;
		}
		this.state.isTouch = true;
		this.state.isSwiping = true;
		const targetOffset = this.state.offsetOrigin + event.touches[0].clientX - this.state.touchStart;

		if (this.props.direction === 'right' && targetOffset < -this.state.offsetTriggerValue) return;
		if (this.props.direction === 'right' && targetOffset > (this._actions.value.getBoundingClientRect().width + 25)) return;
		if (this.props.direction === 'left' && targetOffset > this.state.offsetTriggerValue) return;
		if (this.props.direction === 'left' && targetOffset < -(this._actions.value.getBoundingClientRect().width + 25)) return;

		this.state.offset = targetOffset;
	}

	handleTouchEnd () {
		if (!this._actions.value) return;

		this.state.isTouch = false;
		this.state.offset = (Math.abs(this.state.offset) > this.state.offsetTriggerValue && this.state.isSwiping)
			|| (this.state.offset === 0 && !this.state.isSwiping)
			? this._actions.value.getBoundingClientRect().width
			: 0;

		this.state.isSwiping = false;
	}
}
