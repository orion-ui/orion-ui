import { reactive, ref } from 'vue';
import { isNil } from 'lodash-es';
import anime from 'animejs';
import SharedPopableSetupService, { SharedPopableSetupServiceEmits, SharedPopableSetupServiceProps } from '../../Shared/SharedPopableSetupService';
import orionAppService from 'utils/Orion';

export type OrionNotifEmits = SharedPopableSetupServiceEmits & {}
export type OrionNotifProps = SharedPopableSetupServiceProps & {
	// @doc props/display if set, displays the component
	// @doc/fr props/display Missing @doc
	display?: boolean,
	// @doc props/options options of the notification
	// @doc/fr props/options Missing @doc
	options?: Partial<Orion.Notif.Options>,
};

export default class OrionNotifSetupService extends SharedPopableSetupService {
	static readonly defaultProps = {
		...SharedPopableSetupService.defaultProps,
		display: false,
	};

	protected name = 'OrionNotif' as const;


	_timerProgress = ref<HTMLElement>();
	options = reactive<Orion.Notif.Options>({
		...this.baseOptions,
		overlay: false,
		title: null,
	});

	private timerValue = ref<Nil<number>>();
	private timerInterval?: NodeJS.Timeout;

	get timer () {
		return this.timerValue.value;
	}

	get publicInstance () {
		return {
			...super.publicInstance,
			resetTimer: this.resetTimer.bind(this),
		};
	}


	constructor (
		protected props: OrionNotifProps & Omit<typeof OrionNotifSetupService.defaultProps, 'options'> & {options: Partial<Orion.Popable.Options>},
		protected emits: OrionNotifEmits) {
		super(props, emits);

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
						this.emits('enter-start');
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
						this.emits('enter-end');
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
						this.emits('leave-start');
						this.trigger('leave-start');
					},
					complete: async () => {
						this.state.visible = false;
						await orionAppService.popableAnimationHooks.notifLeaveEnd?.(this.publicInstance);
						resolve();
						this.emits('leave-end');
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

	showTimer (): this is { timer: number } {
		return !isNil(this.timer);
	}

	resetTimer () {
		if (this._timerProgress.value) {
			this._timerProgress.value.style.animationName = 'none';
		}

		this.timerValue.value = this.props.options.duration;

		setTimeout(() => {
			if (this._timerProgress.value) {
				this._timerProgress.value.style.animationName = 'scaleXtoZero';
			}
		}, 0);
	}
}
