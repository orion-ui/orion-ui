import SharedSetupService from '../../Shared/SharedSetupService';

export type OrionStickerEmits = {}
export type OrionStickerProps = {
	// @doc props/hideActions hides the sticker's actions
	// @doc/fr props/hideActions masque les actions du sticker
	hideActions: boolean,
	// @doc props/hoverElevation elevation level on mouse hover
	// @doc/fr props/hoverElevation niveau d'élévation au survol de la souris
	hoverElevation: number,
	// @doc props/muted adds a disabled style
	// @doc/fr props/muted ajoute un style `disabled`
	muted: boolean,
	// @doc props/selected adds a selected style on the sticker
	// @doc/fr props/selected ajoute le style `selected` sur le sticker
	selected: boolean,
	// @doc props/selectedColor the color of the selected style
	// @doc/fr props/selectedColor la couleur du style `selected`
	selectedColor: Orion.Color,
	// @doc props/title title of the sticker
	// @doc/fr props/title titre du sticker
	title?: string,
};

export default class OrionStickerSetupService extends SharedSetupService {
	static readonly defaultProps = {
		hideActions: false,
		hoverElevation: 1,
		muted: false,
		selected: false,
		selectedColor: 'info' as Orion.Color,
	};

	constructor (protected props: OrionStickerProps, protected emits: OrionStickerEmits) {
		super();
	}
}
