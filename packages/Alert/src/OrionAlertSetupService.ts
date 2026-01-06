import SharedProps from '../../Shared/SharedProps';
import SharedSetupService from '../../Shared/SharedSetupService';
import type { SharedPropsColor } from '../../Shared/SharedProps';

export type OrionAlertEmits = {
	// @doc event/close/desc emitted when closing the alert
	// @doc/fr event/close/desc émis lors de la fermeture de l'alerte
	(e: 'close'): void;
}

export type OrionAlertProps = SharedPropsColor & {
	// @doc props/center Defines if the content must be centered in the component
	// @doc/fr props/center Défini si le contenu doit être centré dans le composant
	center?: boolean,
	// @doc props/close Defines if the alert can be closed
	// @doc/fr props/close Si défini, une croix permet de fermer l'alert
	close?: boolean,
	// @doc props/title Title of the alert
	// @doc/fr props/title Titre de l'alert
	title?: string,
	// @doc props/icon Icon to display in the alert. If true, a default icon based on the color will be used
	// @doc/fr props/icon Icône à afficher dans l'alerte. Si true, une icône par défaut basée sur la couleur sera utilisée
	icon?: boolean | Orion.Icon,
	// @doc props/fontIcon Font icon to display in the alert
	// @doc/fr props/fontIcon Icône de police à afficher dans l'alerte
	fontIcon?: string,
};

export default class OrionAlertSetupService extends SharedSetupService {
	static readonly defaultProps : Partial<OrionAlertProps> = { ...SharedProps.color };

	get icon () {
		if (this.props.icon === true) {
			switch (this.props.color) {
			case 'success':
				return 'check_circle';
			case 'warning':
				return 'warning';
			case 'danger':
				return 'error';
			default:
				return 'info';
			}
		} else if (this.props.icon) {
			return this.props.icon;
		}
		return undefined;
	}

	constructor (
		protected props: OrionAlertProps & typeof OrionAlertSetupService.defaultProps,
		protected emits: OrionAlertEmits) {
		super();
	}
}
