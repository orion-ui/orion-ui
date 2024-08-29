import SharedSetupService from '../../Shared/SharedSetupService';

export type OrionTabNavEmits = {}

export type OrionTabNavProps = {
	value?: string,
	panes: Orion.Private.TsxTabPane[],
	onTabClick:(...val: [OrionTabPane, MouseEvent]) => void,
}

export default class OrionTabNavSetupService extends SharedSetupService {
	static readonly defaultProps = { panes: () => [] as Orion.Private.TsxTabPane[] };

	constructor (protected props: OrionTabNavProps, protected emits: OrionTabNavEmits) {
		super();
	}
}
