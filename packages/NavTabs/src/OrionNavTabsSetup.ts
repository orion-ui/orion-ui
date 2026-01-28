import { ref } from 'vue';

import { SharedNavSetup } from '../../Shared/SharedNavSetup';
import { SharedProps, type SharedPropsNav } from '../../Shared/SharedProps';

export type OrionNavTabsEmits = {};
export type OrionNavTabsProps = SharedPropsNav & {
	navAside?: OrionNavAside.Props
};

export class OrionNavTabsSetup extends SharedNavSetup {

	static readonly defaultProps = { ...SharedProps.navDefault };

	readonly _el = ref<RefDom>();
	readonly _navAside = ref<OrionAside>();

	readonly baseClass = 'orion-nav-tabs';

	get items () { return this.props.items }

	constructor (
		protected props: OrionNavTabsProps & typeof OrionNavTabsSetup.defaultProps,
		protected emits: OrionNavTabsEmits) {
		super();
	}

	protected onMounted () {
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

	private closeAsideNav () {
		this._navAside.value?.close();
	}

}
