import { SharedProps, type SharedPropsColor } from '../../Shared/SharedProps';
import { SharedSetup } from '../../Shared/SharedSetup';

export type OrionBadgeEmits = {
	// @doc event/clicked/desc emitted when the badge is clicked
	// @doc/fr event/clicked/desc emis lorsque le badge est cliqué
	(e: 'clicked', event: MouseEvent): void
};

export type OrionBadgeProps = SharedPropsColor & {
	// @doc props/type badge style variant
	// @doc/fr props/type variante de style du badge
	type?: Orion.BadgeType
};

export class OrionBadgeSetup extends SharedSetup {

	static readonly defaultProps = {
		...SharedProps.color,
		type: 'square' as Orion.BadgeType,
	};

	constructor (
		protected props: OrionBadgeProps & typeof OrionBadgeSetup.defaultProps,
		protected emits: OrionBadgeEmits,
	) {
		super();
	}

}
