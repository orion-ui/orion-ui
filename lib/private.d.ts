import { OrionTimelinePaneProps } from "packages/TimelinePane/src/OrionTimelinePaneSetupService";
import { Slot } from "vue";

declare namespace Private {
	type Number = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

	type Letter = 'a' | 'b' | 'c' | 'd' | 'e' | 'f' | 'g' | 'h' | 'i'
		| 'j' | 'k' | 'l' | 'm' | 'n' | 'o' | 'p' | 'q' | 'r'
		| 's' | 't' | 'u' | 'v' | 'w' | 'x' | 'y' | 'z';

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
