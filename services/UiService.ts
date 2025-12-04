import { getUid } from 'utils/tools/uid';
import { reactive } from 'vue';

class UiService {
	state = reactive({ token: getUid() });

	get token () {
		return this.state.token;
	}

	update () {
		this.state.token = getUid();
	}
}

// @tree-shaking lazy initialization
let uiServiceSingleton: UiService;

export function useUi () {
	if (!uiServiceSingleton) {
		uiServiceSingleton = new UiService();
	}
	return uiServiceSingleton;
}
