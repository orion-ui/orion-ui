import { PropType, reactive, ref } from 'vue';
import anime from 'animejs';
import SharedPopableSetupService, { PopableEmit } from '../../Shared/SharedPopableSetupService';
import orionAppService from 'utils/Orion';

type Props = SetupProps<typeof OrionNotifSetupService.props>

export default class OrionNotifSetupService extends SharedPopableSetupService<Props> {
	static props = {
		...SharedPopableSetupService.props,
		// @doc props/options options of the notification
		options: {
			type: Object as PropType<Partial<Orion.Notif.Options>>,
			default: () => {},
		},
	};

	protected name = 'OrionNotif' as const;
	protected emit: PopableEmit;

	options = reactive<Orion.Notif.Options>({
		...this.baseOptions,
		overlay: false,
		title: null,
	});

	private timerValue = ref<Nil<number>>();
	private timerInterval?: NodeJS.Timer;

	get timer () {
		return this.timerValue.value;
	}


	constructor (props: Props, emit: PopableEmit) {
		super(props);
		this.emit = emit;
		Object.assign(this.options, props.options);
	}

	protected onMounted () {
		super.onMounted();
		this.handleTimer();
	}


	async animateAsync (enter: boolean) {
		return new Promise<void>(async (resolve) => {
			if (enter === this.state.visible) {
				resolve();
				return;
			}

			if (enter) {
				this.state.visible = true;

				await orionAppService.popableAnimationHooks.notifEnterBefore?.(this.publicInstance);

				anime({
					targets: this._el.value,
					opacity: [0, 1],
					translateY: [200, 0],
					duration: 600,
					easing: 'easeOutCubic',
					begin: async () => {
						await orionAppService.popableAnimationHooks.notifEnterStart?.(this.publicInstance);
						this.emit('enter-start');
						this.trigger('enter-start');

						if (this.props.options.duration) {
							this.timerInterval = setInterval(() => {
								if (this.timerValue.value) {
									this.timerValue.value--;
									if (!this.timerValue.value) {
										setTimeout(() => this.close(), 500);
										if (this.timerInterval) clearInterval(this.timerInterval);
									}
								}
							}, 1000);
						}
					},
					complete: async () => {
						await orionAppService.popableAnimationHooks.notifEnterEnd?.(this.publicInstance);
						resolve();
						this.emit('enter-end');
						this.trigger('enter-end');
					},
				});
			} else {
				await orionAppService.popableAnimationHooks.notifLeaveBefore?.(this.publicInstance);

				anime({
					targets: this._el.value,
					opacity: 0,
					translateY: 200,
					duration: 500,
					easing: 'easeOutCubic',
					begin: async () => {
						await orionAppService.popableAnimationHooks.notifLeaveStart?.(this.publicInstance);
						this.emit('leave-start');
						this.trigger('leave-start');
					},
					complete: async () => {
						this.state.visible = false;
						await orionAppService.popableAnimationHooks.notifLeaveEnd?.(this.publicInstance);
						resolve();
						this.emit('leave-end');
						this.trigger('leave-end');
					},
				});
			}
		});
	}

	private handleTimer () {
		if (this.props.options.duration) {
			this.timerValue.value = this.props.options.duration;
		}
	}
}
