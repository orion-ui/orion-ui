import { PropType, ref } from 'vue';
import anime from 'animejs';
import SharedPopableSetupService, { PopableEmit } from '../../Shared/SharedPopableSetupService';
import orionAppService from 'utils/Orion';

type Props = SetupProps<typeof OrionAsideSetupService.props>

export default class OrionAsideSetupService extends SharedPopableSetupService<Props> {
	static props = {
		...SharedPopableSetupService.props,
		// @doc props/options options of the aside
		// @doc/fr props/options options de l'aside
		options: {
			type: Object as PropType<Partial<Orion.Aside.Options>>,
			default: () => {},
		},
	};

	protected name = 'OrionAside' as const;
	protected emit: PopableEmit;

	readonly _actions = ref<RefDom>();

	get slotPoster () { return `#OrionAside-${this.uid}__poster`;}
	get slotFooter () { return `#OrionAside-${this.uid}__footer`;}
	get slotActions () { return `#OrionAside-${this.uid}__actions`;}
	get slotHeader () { return `#OrionAside-${this.uid}__header`;}

	get publicInstance () {
		return {
			...super.publicInstance,
			slotPoster: this.slotPoster,
			slotFooter: this.slotFooter,
			slotActions: this.slotActions,
			slotHeader: this.slotHeader,
		};
	}

	constructor (props: Props, emit: PopableEmit) {
		super(props);
		this.emit = emit;
	}

	async animateAsync (enter: boolean) {
		return new Promise<void>(async (resolve) => {
			if (enter) {
				this.state.visible = true;

				await orionAppService.popableAnimationHooks.asideEnterBefore?.(this.publicInstance);

				anime({
					targets: this._el.value,
					opacity: [0, 1],
					translateX: ['100%', 0],
					scale: [1.3, 1],
					duration: 400,
					easing: 'easeOutQuad',
					begin: async () => {
						await orionAppService.popableAnimationHooks.asideEnterStart?.(this.publicInstance);
						this.emit('enter-start');
						this.trigger('enter-start');
						this.animateActions();
					},
					complete: async () => {
						await orionAppService.popableAnimationHooks.asideEnterEnd?.(this.publicInstance);
						resolve();
						this.emit('enter-end');
						this.trigger('enter-end');
					},
				});
			} else {
				await orionAppService.popableAnimationHooks.asideLeaveBefore?.(this.publicInstance);

				anime({
					targets: this._el.value,
					opacity: 0,
					translateX: ['30%'],
					duration: 200,
					easing: 'linear',
					begin: async () => {
						await orionAppService.popableAnimationHooks.asideLeaveStart?.(this.publicInstance);
						this.emit('leave-start');
						this.trigger('leave-start');
					},
					complete: async () => {
						this.state.visible = false;
						await orionAppService.popableAnimationHooks.asideLeaveEnd?.(this.publicInstance);
						resolve();
						this.emit('leave-end');
						this.trigger('leave-end');
					},
				});
			}
		});
	}

	private animateActions () {
		const targets = this._actions.value?.children;

		if (targets) {
			anime({
				targets,
				opacity: [0, 1],
				right: ['-3rem', 0],
				duration: 300,
				easing: 'easeOutCubic',
				delay: anime.stagger(300 / targets.length, { start: 100 }),
			});
		}
	}
}
