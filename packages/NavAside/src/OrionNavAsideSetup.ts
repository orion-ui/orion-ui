import { watch } from 'vue';
import { useRoute } from 'vue-router';
import { SharedSetup } from '../../Shared/SharedSetup';

export type OrionNavAsideEmits = {};
export type OrionNavAsideProps = {
	navMain?: OrionNavMain.Props
	navTop?: OrionNavTop.Props
};

export class OrionNavAsideSetup extends SharedSetup {

	static readonly defaultProps = {};

	get publicInstance () { return {} }

	constructor (protected props: OrionNavAsideProps, protected emits: OrionNavAsideEmits, _aside?: OrionAside) {
		super();

		const route = useRoute();
		watch(route, () => _aside?.close());
	}

}
