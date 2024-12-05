import SharedSetupService from '../../Shared/SharedSetupService';

export type OrionTimelinePillEmits = {}
export type OrionTimelinePillProps = {
	disabled: boolean,
	centeredPill: boolean,
	scrollable: boolean,
	value?: string | number,

	current?: string | number,
	panes: Orion.Private.TsxTimelinePane[],
	onPillClick: (...val: [Orion.Private.TsxTimelinePane['props'], MouseEvent]) => void,
}

export default class OrionTimelinePillSetupService extends SharedSetupService {
	static readonly defaultProps = {
		disabled: false,
		centeredPill: false,
		scrollable: false,
		panes: () => [] as Orion.Private.TsxTimelinePane[],
	};

	constructor (protected props: OrionTimelinePillProps, protected emits: OrionTimelinePillEmits) {
		super();
	}
}
