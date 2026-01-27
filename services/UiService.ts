import { Reactive } from 'utils/decorators';
import { getUid } from 'utils/tools';

class UiService {

	@Reactive private readonly state = { token: getUid() };

	get token () { return this.state.token }

	update () {
		this.state.token = getUid();
	}

}

const uiServiceSingleton = new UiService();

export function useUi () {
	return uiServiceSingleton;
}
