import { PropType, ref } from 'vue';

import SharedProps from '../../Shared/SharedProps';
import anime from 'animejs';
import SharedNavSetupService from '../../Shared/SharedNavSetupService';

type Props = SetupProps<typeof OrionNavTabsSetupService.props>

export default class OrionNavTabsSetupService extends SharedNavSetupService<Props> {
	static props = {
		...SharedProps.nav(),
		navAside: {
			type: Object as PropType<OrionNavAside.Props>,
			default: undefined,
		},
	};

	_el = ref<RefDom>();

	_navAside = ref<OrionAside>();

	baseClass = 'orion-nav-tabs';

	get items () {
		return this.props.items;
	}


	constructor (props: Props) {
		super(props);
	}


	protected onMounted () {
		anime({
			targets: this._el.value?.getElementsByClassName('orion-nav-tabs__item'),
			translateY: ['4rem', 0],
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

		this.Bus.on('navAside:show', this.openAsideNav);
		this.Bus.on('navAside:hide', this.closeAsideNav);
	}

	protected onUnmounted () {
		this.Bus.off('navAside:show', this.openAsideNav);
		this.Bus.off('navAside:hide', this.closeAsideNav);
	}


	openAsideNav () {
		this._navAside.value?.open();
	}

	closeAsideNav () {
		this._navAside.value?.close();
	}
}
