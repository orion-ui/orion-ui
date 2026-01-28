import { type Private } from 'lib/private';
import { SharedSetup } from '../../Shared/SharedSetup';

export type OrionTabNavEmits = {};

export type OrionTabNavProps = {
	value?: string
	panes: Private.TsxTabPane[]
	floatingTabs?: boolean
	onTabClick: (...val: [OrionTabPane, MouseEvent]) => void
};

export class OrionTabNavSetup extends SharedSetup {

	static readonly defaultProps = { panes: () => [] as Private.TsxTabPane[] };

	constructor (protected props: OrionTabNavProps, protected emits: OrionTabNavEmits) {
		super();
	}

	paneIsActive (pane: Private.TsxTabPane, useRouter = false): boolean {
		return this.props.value === pane.props.name
		  || (useRouter && ((this.router.currentRoute.value.name === pane.props.name)
		    || (this.router.currentRoute.value.matched.some(x => x.name === pane.props.name))));
	}

}
