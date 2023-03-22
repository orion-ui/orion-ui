import { PropType, ref } from 'vue';
import anime from 'animejs';

import SharedSetupService from '../../Shared/SharedSetupService';


type Props = SetupProps<typeof OrionLayoutSetupService.props>

export default class OrionLayoutSetupService extends SharedSetupService<Props> {
	static props = {
		// @doc props/navMain these props will be applied to the layout's `<o-nav-main>` component
		// @doc/fr props/navMain ces props seront passées au composant `<o-nav-main>` du layout
		navMain: {
			type: Object as PropType<OrionNavMain.Props>,
			default: undefined,
		},
		// @doc props/navTop these props will be applied to the layout's `<o-nav-top>` component
		// @doc/fr props/navTop ces props seront passées au composant `<o-nav-top>` du layout
		navTop: {
			type: Object as PropType<OrionNavTop.Props>,
			default: undefined,
		},
		// @doc props/navTabs these props will be applied to the layout's `<o-nav-tabs>` component
		// @doc/fr props/navTabs ces props seront passées au composant `<o-nav-tabs>` du layout
		navTabs: {
			type: Object as PropType<OrionNavTabs.Props>,
			default: undefined,
		},
	};

	_main = ref<RefDom>();


	constructor (props: Props) {
		super(props);
	}

	protected onMounted () {
		if (this._main.value) {
			anime({
				targets: this._main.value,
				opacity: [0, 1],
				duration: 600,
				delay: 1000,
				easing: 'easeInOutQuad',
				complete: () => {
					this._main.value?.removeAttribute('style');
				},
			});
		}
	}
}
