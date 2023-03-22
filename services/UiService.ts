import { reactive } from 'vue';
import { getUid } from '../utils/tools';

class UiService {
	state = reactive({ token: getUid() });

	get token () {
		return this.state.token;
	}

	update () {
		this.state.token = getUid();
	}
}

const uiServiceSingleton = new UiService();

export default function useUi () {
	return uiServiceSingleton;
}
