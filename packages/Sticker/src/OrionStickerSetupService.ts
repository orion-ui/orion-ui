import { PropType } from 'vue';
import SharedSetupService from '../../Shared/SharedSetupService';

type Props = SetupProps<typeof OrionStickerSetupService.props>

export default class OrionStickerSetupService extends SharedSetupService<Props> {
	static props = {
		// @doc props/selected adds a selected style on the sticker
		// @doc/fr props/selected ajoute le style `selected` sur le sticker
		selected: Boolean,
		// @doc props/muted adds a disabled style
		// @doc/fr props/muted ajoute un style `disabled`
		muted: Boolean,
		// @doc props/hideActions hides the sticker's actions
		// @doc/fr props/hideActions masque les actions du sticker
		hideActions: Boolean,
		// @doc props/selectedColor the color of the selected style
		// @doc/fr props/selectedColor la couleur du style `selected`
		selectedColor: {
			type: String as PropType<Orion.Color>,
			default: 'info',
		},
		// @doc props/title title of the sticker
		// @doc/fr props/title titre du sticker
		title: {
			type: String,
			default: undefined,
		},
		// @doc props/useElevation apply an elevation effect on mouse hover
		// @doc/fr props/useElevation applique un effet d'élévation au survol de la souris
		useElevation: {
			type: Boolean,
			default: true,
		},
	};

	constructor (props: Props) {
		super(props);
	}
}
