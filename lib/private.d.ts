import { OrionTimelinePaneProps } from 'packages/TimelinePane/src/OrionTimelinePaneSetupService';
import { Slot } from 'vue';

declare namespace Private {

	type TsxTabPane = {
		props: OrionTabPane.Props & {
			'font-icon': string;
			'marker-color': string;
		};
		children: {
			default: Slot;
			label?: Slot;
		};
	}

	type TsxTimelinePane = {
		props: OrionTimelinePaneProps & {
			'font-icon': string;
			'marker-color': string;
			'centered-pill': string;
		};
		children: {
			default: Slot;
			after?: Slot;
			before?: Slot;
		};
	}

	type TsxTourStep = {
		props : OrionTourStep.Props
	}
}
