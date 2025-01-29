import { ref } from 'vue';
import SharedSetupService from '../../Shared/SharedSetupService';
import SharedProps from '../../Shared/SharedProps';

type Props = SetupProps<typeof OrionButtonSetupService.props>

export default class OrionButtonSetupService extends SharedSetupService<Props> {
	static props = {
		...SharedProps.size(),
		...SharedProps.color(),
		...SharedProps.prefixIcon(),
		...SharedProps.suffixIcon(),
		// @doc props/autofocus if set, focus the button
		// @doc/fr props/autofocus si défini, le focus sera placé sur le bouton
		autofocus: Boolean,
		// @doc props/disabled determines if the button is disabled
		// @doc/fr props/disabled désactive le bouton
		disabled: Boolean,
		// @doc props/loading adds a loading icon and disables the button
		// @doc/fr props/loading ajoute une icône de chargement et désactive le bouton
		loading: Boolean,
		// @doc props/outline adds an outline on the button
		// @doc/fr props/outline ajoute un contraste sur le bouton
		outline: Boolean,
		// @doc props/nude removes the background color
		// @doc/fr props/nude masque la couleur en arrière plan
		nude: Boolean,
		// @doc props/block defines the button's width to 100%
		// @doc/fr props/block définie la largeur du bouton à 100%
		block: Boolean,
	};

	_el = ref<RefDom>();

	uid = this.getUid();

	constructor (props: Props) {
		super(props);
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
	}//
}
