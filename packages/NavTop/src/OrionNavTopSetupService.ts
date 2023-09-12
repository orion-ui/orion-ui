import { reactive, ref } from 'vue';
import { throttle } from 'lodash-es';
import SharedNavSetupService from '../../Shared/SharedNavSetupService';
import SharedProps from '../../Shared/SharedProps';

type Props = SetupProps<typeof OrionNavTopSetupService.props>

export default class OrionNavTopSetupService extends SharedNavSetupService<Props> {
	static props = { ...SharedProps.nav() };

	readonly _el = ref<RefDom>();

	readonly baseClass = 'orion-nav-top';

	readonly scrollSpy = throttle(() => {
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
