import SharedSetupService from '../../Shared/SharedSetupService';
import SharedProps, { SharedPropsColorExtentedAndGreys, SharedPropsPrefixIcon, SharedPropsSize, SharedPropsSuffixIcon } from '../../Shared/SharedProps';

export type OrionChipsEmits = {
	// @doc event/close/desc Emitted when closing the chips
	// @doc/fr event/close/desc Émis lors de la fermeture de la chips
	(e: 'close'): void
}

export type OrionChipsProps =
	SharedPropsSize &
	SharedPropsPrefixIcon &
	SharedPropsSuffixIcon &
	SharedPropsColorExtentedAndGreys & {
		// @doc props/nude Removes background and add border on the chips
		// @doc/fr props/nude supprime le fond et ajoute une bordure sur la chips
		nude?: boolean,
		// @doc props/outline Adds an outline style on the chips
		// @doc/fr props/outline modifie le style en ajoutant un contraste
		outline?: boolean,
		// @doc props/close Defines if the chips can be closed
		// @doc/fr props/close définit si le chips peut être fermée
		close?: boolean,
		// @doc props/rounded Adds rounded style on the chips
		// @doc/fr props/rounded ajoute un style arrondi sur la chips
		round?: boolean,
};

export default class OrionChipsSetupService extends SharedSetupService {
	static readonly defaultProps = {
		...SharedProps.colorExtendedAndGreys,
		...SharedProps.size,
	};

	constructor (
		protected props: OrionChipsProps & typeof OrionChipsSetupService.defaultProps,
		protected emits: OrionChipsEmits) {
		super();
	}
}
