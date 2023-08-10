import SharedSetupService from '../../Shared/SharedSetupService';
import SharedProps from '../../Shared/SharedProps';
import { PropType } from 'vue';

type Props = SetupProps<typeof OrionCardSetupService.props>

export default class OrionCardSetupService extends SharedSetupService<Props> {
	static props = {
		...SharedProps.size(),
		// @doc props/headerLine displays a line between the header and the body of the card
		// @doc/fr props/headerLine affiche une line de sépération entre les slots `header` et `default` de la carte
		headerLine: {
			type: Boolean,
			default: false,
		},
		// @doc props/actionsLine displays a line between the body and the actions of the card
		// @doc/fr props/actionsLine affiche une line de sépération entre les slots `default` et `actions` de la carte
		actionsLine: {
			type: Boolean,
			default: false,
		},
		// @doc props/selected adds a selected style on the card
		// @doc/fr props/selected ajoute le style `selected` sur la carte
		selected: {
			type: Boolean,
			default: false,
		},
		// @doc props/gradient adds a gradient in the backgroung of the card
		// @doc/fr props/gradient ajoute un dégradé sur l'arrière plan de la carte
		gradient: {
			type: String,
			default: undefined,
			validator: (value: string): boolean => ['info', 'success', 'warning', 'pink', 'brand'].includes(value),
		},
		// @doc props/selectedColor changes the color of the selected style
		// @doc/fr props/selectedColor définit la couleur du style `selected`
		selectedColor: {
			type: String as PropType<Orion.Color>,
			default: 'info',
			validator: (value: string): boolean => ['brand', 'info', 'success', 'warning', 'danger'].includes(value),
		},
		// @doc props/title the title of the card
		// @doc/fr props/title titre de la carte
		title: {
			type: String,
			default: undefined,
		},
		// @doc props/hoverElevation elevation level on mouse hover
		// @doc/fr props/hoverElevation niveau d'élévation au survol de la souris
		hoverElevation: {
			type: Number,
			default: 1,
		},
	};

	constructor (props: Props) {
		super(props);
	}
}
