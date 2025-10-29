import { Private } from 'lib/private';
import SharedSetupService from '../../Shared/SharedSetupService';

export type OrionTabNavEmits = {}

export type OrionTabNavProps = {
	value?: string,
	panes: Private.TsxTabPane[],
	onTabClick:(...val: [OrionTabPane, MouseEvent]) => void,
}

export default class OrionTabNavSetupService extends SharedSetupService {
	static readonly defaultProps = { panes: () => [] as Private.TsxTabPane[] };

	constructor (protected props: OrionTabNavProps, protected emits: OrionTabNavEmits) {
		super();
	}

	paneIsActive (pane: Private.TsxTabPane, useRouter = false): boolean {
		return this.props.value === pane.props.name
			|| (useRouter && ((this.router.currentRoute.value.name === pane.props.name)
				|| (!!this.router.currentRoute.value.matched.find(x => x.name === this.router.currentRoute.value.name))));
	}
}
