import { watch } from 'vue';
import { useRoute } from 'vue-router';
import SharedSetupService from '../../Shared/SharedSetupService';

export type OrionNavAsideEmits = {}
export type OrionNavAsideProps = {
	navMain?: OrionNavMain.Props
	navTop?: OrionNavTop.Props
}

export default class OrionNavAsideSetupService extends SharedSetupService {
	static readonly defaultProps = {};

	get publicInstance () {
		return {};
	}

	constructor (protected props: OrionNavAsideProps, protected emits: OrionNavAsideEmits, _aside?: OrionAside) {
		super();

		const route = useRoute();
		watch(route, () => _aside?.close());
	}
}
