import { Private } from 'lib/private';
import SharedSetupService from '../../Shared/SharedSetupService';

export type OrionTimelinePillEmits = {}
export type OrionTimelinePillProps = {
	// @doc props/disabled disables the pill
	// @doc/fr props/disabled désactive la vignette
	disabled?: boolean,
	// @doc props/centeredPill centers the pill and the #after slot
	// @doc/fr props/centeredPill centre la vignette et le slot #after
	centeredPill?: boolean,
	// @doc/private props/pillOnly
	pillOnly?: boolean,
	// @doc/private props/scrollable
	scrollable?: boolean,
	// @doc/private props/value
	value?: string | number,
	// @doc/private props/current
	current?: string | number,
	// @doc/private props/panes
	panes?: Private.TsxTimelinePane[] | OrionTimelinePill[],
	// @doc/private props/onPillClick
	onPillClick?: (...val: [Private.TsxTimelinePane['props'] | OrionTimelinePillProps, MouseEvent]) => void,
	// @doc props/color color of the pill
	// @doc/fr props/color couleur de la pastille
	color?: Orion.ColorExtendedAndGreys,
	// @doc props/popperOptions options for the dropdown popper
	// @doc/fr props/popperOptions options pour le dropdown popper
	popperOptions?: Partial<Orion.VDropdown>,
}




export default class OrionTimelinePillSetupService extends SharedSetupService {
	static readonly defaultProps = { panes: () => [] as Private.TsxTimelinePane[] };

	constructor (protected props: OrionTimelinePillProps, protected emits: OrionTimelinePillEmits) {
		super();
	}
}
