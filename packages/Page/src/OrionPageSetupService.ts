import SharedSetupService from '../../Shared/SharedSetupService';

type Props = SetupProps<typeof OrionPageSetupService.props>

export default class OrionPageSetupService extends SharedSetupService<Props> {
	static props = {
		// @doc props/stickySubactions make the subactions div sticky when scrolling for easy access
		// @doc/fr props/stickySubactions rend les actions secondaires sticky lors du scroll pour y faciliter l'accès
		stickySubactions: Boolean,
		// @doc props/titleEllipsis adds an ellipsis on the title if the title is too long
		// @doc/fr props/titleEllipsis ajoute une ellipse au niveau du titre s'il est trop long
		titleEllipsis: Boolean,
		// @doc props/subtitleEllipsis adds an ellipsis on the subtitle if it is too long
		// @doc/fr props/subtitleEllipsis aajoute une ellipse au niveau du sous-titre s'il est trop long
		subtitleEllipsis: Boolean,
		// @doc props/title title of the page
		// @doc/fr props/title titre de la page
		title: {
			type: String,
			default: undefined,
		},
		// @doc props/subtitle subtitle of the page
		// @doc/fr props/subtitle sous-titre de la page
		subtitle: {
			type: String,
			default: undefined,
		},
	};

	constructor (props: Props) {
		super(props);
	}
}
