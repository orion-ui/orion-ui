import { PropType, ref } from 'vue';

import SharedProps from '../../Shared/SharedProps';
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

	readonly _el = ref<RefDom>();
	readonly _navAside = ref<OrionAside>();

	readonly baseClass = 'orion-nav-tabs';

	get items () {
		return this.props.items;
	}


	constructor (props: Props) {
		super(props);
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
