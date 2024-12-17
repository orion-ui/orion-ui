import SharedSetupService from '../../Shared/SharedSetupService';
import SharedProps, { SharedPropsColor } from 'packages/Shared/SharedProps';

export type OrionAlertEmits = { (e: 'close'): void;}
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
};

export default class OrionAlertSetupService extends SharedSetupService {
	static readonly defaultProps =  {
		...SharedProps.color,
		center: false,
		close: false,
	};

	constructor (
		protected props: OrionAlertProps & typeof OrionAlertSetupService.defaultProps,
		protected emits: OrionAlertEmits) {
		super();
	}
}
