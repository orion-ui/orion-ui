import { ref } from 'vue';
import SharedSetupService from '../../Shared/SharedSetupService';
import SharedProps, { SharedPropsColor, SharedPropsPrefixIcon, SharedPropsSize, SharedPropsSuffixIcon } from '../../Shared/SharedProps';

export type OrionButtonEmits = {}
export type OrionButtonProps =
SharedPropsSize &
SharedPropsPrefixIcon &
SharedPropsSuffixIcon &
SharedPropsColor & {
	// @doc props/autofocus if set, focus the button
	// @doc/fr props/autofocus si défini, le focus sera placé sur le bouton
	autofocus?: boolean,
	// @doc props/block defines the button's width to 100%
	// @doc/fr props/block définie la largeur du bouton à 100%
	block?: boolean,
	// @doc props/disabled determines if the button is disabled
	// @doc/fr props/disabled désactive le bouton
	disabled?: boolean,
	// @doc props/loading adds a loading icon and disables the button
	// @doc/fr props/loading ajoute une icône de chargement et désactive le bouton
	loading?: boolean,
	// @doc props/nude removes the background color
	// @doc/fr props/nude masque la couleur en arrière plan
	nude?: boolean,
	// @doc props/outline adds an outline on the button
	// @doc/fr props/outline ajoute un contraste sur le bouton
	outline?: boolean,
};

export default class OrionButtonSetupService extends SharedSetupService {
	static readonly defaultProps = {
		...SharedProps.color,
		...SharedProps.size,
		autofocus: false,
		block: false,
		disabled: false,
		loading: false,
		nude: false,
		outline: false,
	};

	_el = ref<RefDom>();

	uid = this.getUid();

	constructor (
		protected props: OrionButtonProps & typeof OrionButtonSetupService.defaultProps,
		protected emits: OrionButtonEmits) {
		super();
	}

	onMounted () {
		if (this.props.autofocus) {
			setTimeout(() => this._el.value?.focus(), 100);
		}
	}

	visualClick (e: MouseEvent) {
		const event = e as MouseEvent & { layerX: number, layerY: number };
		const visualClick = this.document?.createElement('div');
		if (!visualClick) return;

		this._el.value?.appendChild(visualClick);
		visualClick.classList.add('orion-button__ripple');

		const offset = visualClick.getBoundingClientRect().width / 2;
		visualClick.style.left = `${event.layerX - offset}px`;
		visualClick.style.top = `${event.layerY - offset}px`;

		visualClick.onanimationend = () => {
			this._el.value?.removeChild(visualClick);
			visualClick.remove();
		};
	}
}
