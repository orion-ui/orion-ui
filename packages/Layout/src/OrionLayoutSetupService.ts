import { ref } from 'vue';
import anime from 'animejs';

import SharedSetupService from '../../Shared/SharedSetupService';


export type OrionLayoutEmits = {}
export type OrionLayoutProps = {
	// @doc props/navMain these props will be applied to the layout's `<o-nav-main>` component
	// @doc/fr props/navMain ces props seront passées au composant `<o-nav-main>` du layout
	navMain: OrionNavMain.Props,
	// @doc props/navTabs these props will be applied to the layout's `<o-nav-tabs>` component
	// @doc/fr props/navTabs ces props seront passées au composant `<o-nav-tabs>` du layout
	navTabs: OrionNavTabs.Props,
	// @doc props/navTop these props will be applied to the layout's `<o-nav-top>` component
	// @doc/fr props/navTop ces props seront passées au composant `<o-nav-top>` du layout
	navTop: OrionNavTop.Props,
};

export default class OrionLayoutSetupService extends SharedSetupService {
	static readonly defaultProps = {};

	_main = ref<RefDom>();


	constructor (protected props: OrionLayoutProps, protected emits: OrionLayoutEmits) {
		super();
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
