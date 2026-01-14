import SharedSetupService from '../../Shared/SharedSetupService';

export type OrionBadgeEmits = {}

export type OrionBadgeType = 'dot' | 'square' | 'rounded';
export type OrionBadgeColor = 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'highlight';

export type OrionBadgeProps = {
	// @doc props/type badge style variant
	// @doc/fr props/type variante de style du badge
	type?: OrionBadgeType,
	// @doc props/color badge color variant
	// @doc/fr props/color variante de couleur du badge
	color?: OrionBadgeColor,
};

export default class OrionBadgeSetupService extends SharedSetupService {
	static readonly defaultProps = {
		type: 'square' as OrionBadgeType,
		color: 'default' as OrionBadgeColor,
	};

	constructor (
		protected props: OrionBadgeProps & typeof OrionBadgeSetupService.defaultProps,
		protected emits: OrionBadgeEmits,
	) {
		super();
	}
}
