import { ref } from 'vue';

import SharedNavSetupService from '../../Shared/SharedNavSetupService';
import SharedProps, { SharedPropsNav } from '../../Shared/SharedProps';

export type OrionNavTabsEmits = {}
export type OrionNavTabsProps = SharedPropsNav & {
	navAside?: OrionNavAside.Props
}
export default class OrionNavTabsSetupService extends SharedNavSetupService {
	static readonly defaultProps = { ...SharedProps.navDefault };

	readonly _el = ref<RefDom>();
	readonly _navAside = ref<OrionAside>();

	readonly baseClass = 'orion-nav-tabs';

	get items () {
		return this.props.items;
	}


	constructor (
		protected props: OrionNavTabsProps & typeof OrionNavTabsSetupService.defaultProps,
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

	closeAsideNav () {
		this._navAside.value?.close();
	}
}
