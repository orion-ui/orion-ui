import { ref } from 'vue';
import anime from 'animejs';
import SharedPopableSetupService, { SharedPopableSetupServiceEmits, SharedPopableSetupServiceProps } from '../../Shared/SharedPopableSetupService';
import orionAppService from 'utils/Orion';

export type OrionAsideEmits = SharedPopableSetupServiceEmits & {}
export type OrionAsideProps = SharedPopableSetupServiceProps & {
	// @doc props/display if set, displays the component
	// @doc/fr props/display Missing @doc
	display: boolean,
	// @doc props/options options of the aside
	// @doc/fr props/options options de l'aside
	options: Partial<Orion.Aside.Options>,
};

export default class OrionAsideSetupService extends SharedPopableSetupService {
	static readonly defaultProps = {
		...SharedPopableSetupService.defaultProps,
		display: false,
		options: () => ({}) as SharedPopableSetupServiceProps['options'],
	};

	protected name = 'OrionAside' as const;


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

	constructor (protected props: OrionAsideProps, protected emits: OrionAsideEmits) {
		super(props, emits);
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
						this.emits('enter-start');
						this.trigger('enter-start');
						this.animateActions();
					},
					complete: async () => {
						await orionAppService.popableAnimationHooks.asideEnterEnd?.(this.publicInstance);
						resolve();
						this.emits('enter-end');
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
						this.emits('leave-start');
						this.trigger('leave-start');
					},
					complete: async () => {
						this.state.visible = false;
						await orionAppService.popableAnimationHooks.asideLeaveEnd?.(this.publicInstance);
						resolve();
						this.emits('leave-end');
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
