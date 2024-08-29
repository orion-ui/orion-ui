import { reactive, ref } from 'vue';
import { throttle } from 'lodash-es';
import SharedNavSetupService from '../../Shared/SharedNavSetupService';
import { SharedPropsNav } from 'lib/shared-props';

export type OrionNavTopEmits = {}
export type OrionNavTopProps = SharedPropsNav & {}

export default class OrionNavTopSetupService extends SharedNavSetupService {
	static defaultProps = { };

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


	constructor (protected props: OrionNavTopProps, protected emits: OrionNavTopEmits) {
		super();
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
