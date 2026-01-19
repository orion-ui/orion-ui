import SharedProps, { SharedPropsColor, SharedPropsPrefixIcon, SharedPropsSuffixIcon } from 'packages/Shared/SharedProps';
import SharedSetupService from '../../Shared/SharedSetupService';
import { ModelRef, ref } from 'vue';

export type OrionToggleButtonEmits = {
	// @doc event/click/desc emitted on button click
	// @doc/fr event/click/desc émis lors du click sur le bouton
	(e: 'click', event: MouseEvent): void
}

export type OrionToggleButtonProps =
SharedPropsColor &
SharedPropsPrefixIcon &
SharedPropsSuffixIcon & {
	// @doc props/size define the size
	// @doc/fr props/size définit la taille
  size?: Extract<Orion.Size, 'sm' | 'md'>,
	// @doc props/disabled determines if the button is disabled
	// @doc/fr props/disabled désactive le bouton
	disabled?: boolean,
	// @doc props/loading adds a loading icon and disables the button
	// @doc/fr props/loading ajoute une icône de chargement et désactive le bouton
	loading?: boolean,
	// @doc props/name the name of the toggle button when used in a toggle button group
	// @doc/fr props/name le nom du toggle button lorsqu'il est utilisé dans un groupe de toggle button
	name?: string | number,
	// @doc props/nude removes the background color
	// @doc/fr props/nude masque la couleur en arrière plan
	nude?: boolean,
};

export default class OrionToggleButtonSetupService extends SharedSetupService {
	static readonly defaultProps = {
		...SharedProps.size as { size: Extract<Orion.Size, 'sm' | 'md'> },
		...SharedProps.color,
	};

	_el = ref<RefDom>();

	constructor (
		protected props: OrionToggleButtonProps & typeof OrionToggleButtonSetupService.defaultProps,
		protected emits: OrionToggleButtonEmits,
		protected isActive: ModelRef<boolean>,
	) {
		super();
	}

	handleClick (e: MouseEvent) {
		if (this.props.disabled) return;
		this.isActive.value = !this.isActive.value;
		this.emits('click', e);
	}
}
