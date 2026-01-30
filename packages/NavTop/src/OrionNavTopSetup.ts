import { throttle } from 'lodash-es';
import { reactive, ref } from 'vue';
import { SharedNavSetup } from '../../Shared/SharedNavSetup';
import { SharedProps, type SharedPropsNav } from '../../Shared/SharedProps';

export type OrionNavTopEmits = {};
export type OrionNavTopProps = SharedPropsNav & {};

export class OrionNavTopSetup extends SharedNavSetup {

	static readonly defaultProps = { ...SharedProps.navDefault };

	readonly _el = ref<RefDom>();

	readonly baseClass = 'orion-nav-top';

	private readonly scrollSpy = throttle(() => {
		this.handleScroll();
	}, 100);

	private state = reactive({ isSticky: false });

	get isSticky () { return this.state.isSticky }
	get items () { return this.props.items }

	constructor (
		protected props: OrionNavTopProps & Omit<typeof OrionNavTopSetup.defaultProps, 'items'> & { items: Orion.NavItem[] },
		protected emits: OrionNavTopEmits) {
		super();
	}

	protected onMounted () {
		this.window?.addEventListener('scroll', this.scrollSpy);
	}

	private handleScroll () {
		if (!this.window) return;

		if (this.window.scrollY > 80 || (this.responsive.onTabletLandscape && this.window.scrollY > 140)) {
			this.state.isSticky = true;
		}
		else {
			this.state.isSticky = false;
		}
	}

}
