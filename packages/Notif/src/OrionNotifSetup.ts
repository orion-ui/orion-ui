import anime from 'animejs';
import { isNil } from 'lodash-es';
import { Reactive } from 'utils/decorators';
import { ref } from 'vue';
import { SharedPopableSetup, type SharedPopableSetupEmits, type SharedPopableSetupProps } from '../../Shared/SharedPopableSetup';

export type OrionNotifEmits = SharedPopableSetupEmits & {};
export type OrionNotifProps = SharedPopableSetupProps & {
	// @doc props/display if set, displays the component
	// @doc/fr props/display si défini, affiche le composant
	display?: boolean
	// @doc props/options options of the notification
	// @doc/fr props/options options de la notification
	options?: Partial<Orion.Notif.Options>
};

export class OrionNotifSetup extends SharedPopableSetup {

	static readonly defaultProps = { ...SharedPopableSetup.defaultProps };

	protected readonly name = 'OrionNotif' as const;

	readonly _timerProgress = ref<HTMLElement>();

	@Reactive readonly options: Orion.Notif.Options = {
		...this.baseOptions,
		overlay: false,
		title: undefined,
	};

	private timerValue = ref<Nil<number>>();
	private timerInterval?: NodeJS.Timeout;

	get timer () { return this.timerValue.value }
	get publicInstance () {
		return {
			...super.publicInstance,
			resetTimer: this.resetTimer.bind(this),
		};
	}

	constructor (
		protected props: OrionNotifProps & Omit<typeof OrionNotifSetup.defaultProps, 'options'> & { options: Partial<Orion.Popable.Options> },
		protected emits: OrionNotifEmits) {
		super(props, emits);

		Object.assign(this.options, props.options);
	}

	protected onMounted () {
		super.onMounted();
		this.handleTimer();
	}

	protected async animateAsync (enter: boolean) {
		return new Promise<void>(async (resolve) => {
			if (enter === this.state.visible) {
				resolve();
				return;
			}

			if (enter) {
				this.state.visible = true;

				anime({
					targets: this._el.value,
					opacity: [0, 1],
					translateY: [200, 0],
					duration: 600,
					easing: 'easeOutCubic',
					'begin': async () => {
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
					'complete': async () => {
						resolve();
						this.emits('enter-end');
						this.trigger('enter-end');
					},
				});
			}
			else {
				anime({
					targets: this._el.value,
					opacity: 0,
					translateY: 200,
					duration: 500,
					easing: 'easeOutCubic',
					'begin': async () => {
						this.emits('leave-start');
						this.trigger('leave-start');
					},
					'complete': async () => {
						this.state.visible = false;
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

	private resetTimer () {
		if (this._timerProgress.value) {
			this._timerProgress.value.style.animationName = 'none';
		}

		this.timerValue.value = this.props.options.duration;

		setTimeout(() => {
			if (this._timerProgress.value) {
				this._timerProgress.value.style.animationName = 'scale-x-to-zero';
			}
		}, 0);
	}

}
