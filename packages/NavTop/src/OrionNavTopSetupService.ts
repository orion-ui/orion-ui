import { reactive, ref } from 'vue';
import { throttle } from 'lodash-es';
import SharedNavSetupService from '../../Shared/SharedNavSetupService';
import SharedProps from '../../Shared/SharedProps';
import anime from 'animejs';

type Props = SetupProps<typeof OrionNavTopSetupService.props>

export default class OrionNavTopSetupService extends SharedNavSetupService<Props> {
	static props = { ...SharedProps.nav() };

	_el = ref<RefDom>();

	baseClass = 'orion-nav-top';

	scrollSpy = throttle(() => {
		this.handleScroll();
	}, 100);

	private state = reactive({ isSticky: false });

	get isSticky () {
		return this.state.isSticky;
	}

	get items () {
		return this.props.items;
	}


	constructor (props: Props) {
		super(props);
	}

	protected onMounted () {
		this.window?.addEventListener('scroll', this.scrollSpy);

		anime({
			targets: [
				this._el.value?.getElementsByClassName('orion-nav-top__item'),
				this._el.value?.getElementsByClassName('orion-nav-top__slot-additional'),
			],
			translateY: ['-4rem', 0],
			opacity: [0, 1],
			duration: 600,
			delay: anime.stagger(150, { start: 800 }),
			easing: 'easeOutQuad',
			clear: true,
			complete: (anim) => {
				anim.animatables.forEach((x: Partial<Event>) => {
					const target = x.target as HTMLElement;
					target?.removeAttribute('style');
				});
			},
		});

		anime({
			targets: [
				this._el.value?.getElementsByClassName('orion-nav-top__slot-left'),
				this._el.value?.getElementsByClassName('orion-nav-top__slot-right'),
			],
			opacity: [0, 1],
			duration: 2000,
			delay: 500,
			easing: 'easeInOutQuad',
		});
	}


	handleScroll () {
		if (!this.window) return;

		if (this.window.scrollY > 80 || (this.responsive.onTabletLandscape && this.window.scrollY > 140)) {
			this.state.isSticky = true;
		} else {
			this.state.isSticky = false;
		}
	}
}
