import { ModelRef, reactive, useSlots } from 'vue';
import SharedSetupService from '../../Shared/SharedSetupService';
import { getUid } from 'utils/tools';

export type OrionCarouselEmits = {}
export type OrionCarouselProps = {
	// @doc props/centeredNavigation alignment of the navigation (between dots and buttons)
	// @doc/fr props/centeredNavigation alignement de la navigation (entre les points et les boutons)
	centeredNavigation?: boolean,
	// @doc props/color color of the dots at the carousel's bottom
	// @doc/fr props/color couleur des points au bas du carrousel
	color?: Orion.Color | Orion.ColorAlt,
	// @doc props/hideNavigationButtons hide the navigation buttons around the dots
	// @doc/fr props/hideNavigationButtons masque les boutons de navigation autour des points
	hideNavigationButtons?: boolean,
	// @doc props/hideNavigationDots hide the navigation dots
	// @doc/fr props/hideNavigationDots masque les points de navigation
	hideNavigationDots?: boolean,
	// @doc props/loop enable the "loop" mode
	// @doc/fr props/loop active le mode "en boucle"
	loop?: boolean,
	// @doc props/pauseOnHover pause timer when hovering the carousel
	// @doc/fr props/pauseOnHover met au pause le minuteur lors du survol du carrousel
	pauseOnHover?: boolean,
	// @doc props/stepTimer apply a timer to automatically switch to the next item
	// @doc/fr props/stepTimer applique un minuteur pour passer automatiquement à l'élément suivant
	stepTimer?: number,
};
type Slots = ReturnType<typeof useSlots>;

export default class OrionCarouselSetupService extends SharedSetupService {
	static readonly defaultProps = {
		centeredNavigation: true,
		color: 'primary' as Orion.ColorExtended,
	};

	private slots: Slots;
	private timer?: NodeJS.Timeout;

	private state = reactive({
		timerStart: new Date().valueOf(),
		timerRemaining: 0,
		mouseIsOver: false,
	});

	uid = this.getUid();

	get step () { return this.vModel.value; }
	set step (val) {
		this.vModel.value = val;
		if (this.props.stepTimer) {
			this.state.timerRemaining = this.props.stepTimer;
			this.state.timerStart = new Date().valueOf();
			if (!(this.props.pauseOnHover && this.state.mouseIsOver)) {
				this.startTimer();
			}
		}
	}

	get rgbColor () { return `var(--o-background-${this.props.color}-default)`; }
	get stepTimerForCss () { return this.props.stepTimer + 'ms'; }
	get shouldLoop () { return !!this.props.stepTimer || this.props.loop; }
	get stepIndex () { return this.steps.findIndex(x => x.name === this.vModel.value); }
	get stepsLength () { return this.steps.length; }

	get steps (): { name: string | number, uid: number }[] {
		const slotContent = this.slots.default?.();
		if (!slotContent || !slotContent.length) return [];

		const firstStep = slotContent[0];
		// Check if a v-for is used
		const stepsComponents = typeof firstStep.type === 'symbol' && firstStep.type.description === 'v-fgt'
			? firstStep.children as typeof slotContent
			: slotContent;

		return stepsComponents.filter((x) => {
			return !(typeof x.type === 'symbol' && x.type.description === 'v-cmt');
		}).map(x => ({
			...x.props,
			name: x.props?.name as string | number,
			uid: getUid(),
		})) ?? [];
	}

	get publicInstance () {
		return {
			...super.publicInstance,
			step: () => this.step,
			stepsLength: () => this.stepsLength,
			stepIndex: () => this.stepIndex,
			shouldLoop: () => this.shouldLoop,
			goToStep: this.goToStep.bind(this),
			goToStepIndex: this.goToStepIndex.bind(this),
			goPreviousStep: this.goPreviousStep.bind(this),
			goNextStep: this.goNextStep.bind(this),
		};
	}

	constructor (
		protected props: OrionCarouselProps & typeof OrionCarouselSetupService.defaultProps,
		protected emits: OrionCarouselEmits,
		protected vModel: ModelRef<Undef<number | string>>,
		slots: Slots,
	) {
		super();
		this.slots = slots;
	}

	protected onMounted () {
		if (this.props.stepTimer) this.startTimer();
	}


	private startTimer () {
		if (!this.props.stepTimer) return;

		clearTimeout(this.timer);
		this.timer = setTimeout(() => this.goNextStep(), this.props.stepTimer);
		this.state.timerStart = new Date().valueOf();
	}

	private stopTimer () {
		if (!this.props.stepTimer) return;

		this.state.timerRemaining = (this.state.timerRemaining || this.props.stepTimer) - (new Date().valueOf() - this.state.timerStart);
		clearTimeout(this.timer);
	}

	private restartTimer () {
		if (!this.props.stepTimer) return;

		this.timer = setTimeout(() => this.goNextStep(), this.state.timerRemaining);
		this.state.timerStart = new Date().valueOf();
	}

	handleMouseEnter () {
		if (this.state.mouseIsOver) return;

		this.state.mouseIsOver = true;

		if (!!this.props.stepTimer && this.props.pauseOnHover) {
			this.stopTimer();

			Array
				.from((this.document?.querySelectorAll(`#orion-carousel-${this.uid} .orion-carousel__dot-loader`) ?? [])as HTMLElement[])
				.forEach(el => el.style.animationPlayState = 'paused');
		}
	}

	handleMouseLeave () {
		if (!this.state.mouseIsOver) return;

		this.state.mouseIsOver = false;

		if (!!this.props.stepTimer && this.props.pauseOnHover) {
			Array
				.from((this.document?.querySelectorAll(`#orion-carousel-${this.uid} .orion-carousel__dot-loader`) ?? [])as HTMLElement[])
				.forEach(el => el.style.animationPlayState = 'running');

			this.restartTimer();
		}
	}

	goToStep (step: typeof this.steps[number]) {
		this.step = step.name;
	}

	goToStepIndex (index: number) {
		this.step = this.steps[index]?.name;
	}

	goPreviousStep () {
		const prevStep = this.steps[this.stepIndex - 1];
		if (prevStep) {
			this.step = prevStep.name;
		} else if (this.shouldLoop) {
			this.step = this.steps[this.stepsLength - 1]?.name;
		}
	}

	goNextStep () {
		const nextStep = this.steps[this.stepIndex + 1];
		if (nextStep) {
			this.step = nextStep.name;
		} else if (this.shouldLoop) {
			this.step = this.steps[0]?.name;
		}
	}
}
