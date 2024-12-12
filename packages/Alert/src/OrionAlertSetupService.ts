import { SharedPropsColor } from 'lib/shared-props';
import SharedSetupService from '../../Shared/SharedSetupService';

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
	static readonly defaultProps = {
		center: false,
		close: false,
		color: 'default' as Orion.Color,
	};

	constructor (
		protected props: OrionAlertProps & typeof OrionAlertSetupService.defaultProps,
		protected emits: OrionAlertEmits) {
		super();
	}
}
