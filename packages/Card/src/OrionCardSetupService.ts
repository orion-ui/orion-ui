import SharedSetupService from '../../Shared/SharedSetupService';
import SharedProps, { SharedPropsSize } from '../../Shared/SharedProps';

export type OrionCardEmits = {
	// @doc event/header-click/desc emitted on header click
	// @doc/fr event/header-click/desc émis lors du click sur l'en-tête
	(e: 'header-click'): void
	// @doc event/body-click/desc emitted on body click
	// @doc/fr event/body-click/desc émis lors du click sur le body de la carte
	(e: 'body-click'): void
}

export type OrionCardProps =
	SharedPropsSize & {
	// @doc props/actionsLine displays a line between the body and the actions of the card
	// @doc/fr props/actionsLine affiche une line de sépération entre les slots `default` et `actions` de la carte
	actionsLine?: boolean,
	// @doc props/gradient adds a gradient in the backgroung of the card
	// @doc/fr props/gradient ajoute un dégradé sur l'arrière plan de la carte
	gradient?: string,
	// @doc props/headerLine displays a line between the header and the body of the card
	// @doc/fr props/headerLine affiche une line de sépération entre les slots `header` et `default` de la carte
	headerLine?: boolean,
	// @doc props/hoverElevation elevation level on mouse hover
	// @doc/fr props/hoverElevation niveau d'élévation au survol de la souris
	hoverElevation?: number,
	// @doc props/selected adds a selected style on the card
	// @doc/fr props/selected ajoute le style `selected` sur la carte
	selected?: boolean,
	// @doc props/selectedColor changes the color of the selected style
	// @doc/fr props/selectedColor définit la couleur du style `selected`
	selectedColor?: Orion.Color,
	// @doc props/title the title of the card
	// @doc/fr props/title titre de la carte
	title?: string,
	// @doc props/subtitle the subtitle of the card
	// @doc/fr props/subtitle sous-titre de la carte
	subtitle?: string,
};

export default class OrionCardSetupService extends SharedSetupService {
	static readonly defaultProps = {
		...SharedProps.size,
		hoverElevation: 1,
		selectedColor: 'info' as Orion.Color,
	};

	constructor (
		protected props: OrionCardProps & typeof OrionCardSetupService.defaultProps,
		protected emits: OrionCardEmits) {
		super();
	}
}
