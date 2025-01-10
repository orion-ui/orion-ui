import { Private } from 'lib/private';
import SharedSetupService from '../../Shared/SharedSetupService';
import { OrionTimelinePaneProps } from 'packages/TimelinePane';

export type OrionTimelinePillEmits = {}
export type OrionTimelinePillProps = {
	disabled?: boolean,
	centeredPill?: boolean,
	scrollable?: boolean,
	value?: string | number,
	current?: string | number,
	panes?: Private.TsxTimelinePane[],
	onPillClick: (...val: [Private.TsxTimelinePane['props'], MouseEvent]) => void,
}

export default class OrionTimelinePillSetupService extends SharedSetupService {
	static readonly defaultProps = {
		disabled: false,
		centeredPill: false,
		scrollable: false,
		panes: () => [] as Private.TsxTimelinePane[],
	};

	constructor (protected props: OrionTimelinePillProps, protected emits: OrionTimelinePillEmits) {
		super();
	}
}
