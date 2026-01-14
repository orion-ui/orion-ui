import SharedSetupService from '../../Shared/SharedSetupService';
import SharedProps, { SharedPropsColor } from '../../Shared/SharedProps';

export type OrionBadgeEmits = {
	// @doc event/clicked/desc emitted when the badge is clicked
	// @doc/fr event/clicked/desc emis lorsque le badge est clique
	(e: 'clicked', event: MouseEvent): void
}

export type OrionBadgeType = 'dot' | 'square' | 'rounded';

export type OrionBadgeProps =
SharedPropsColor & {
	// @doc props/type badge style variant
	// @doc/fr props/type variante de style du badge
	type?: OrionBadgeType,
};

export default class OrionBadgeSetupService extends SharedSetupService {
	static readonly defaultProps = {
		...SharedProps.color,
		type: 'square' as OrionBadgeType,
	};

	constructor (
		protected props: OrionBadgeProps & typeof OrionBadgeSetupService.defaultProps,
		protected emits: OrionBadgeEmits,
	) {
		super();
	}
}
