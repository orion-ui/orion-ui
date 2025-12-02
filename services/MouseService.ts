import { reactive } from 'vue';
import { Log } from 'utils';
import useWindow from './WindowService';

export class MouseService {
	private state = reactive({
		eventListenerAdded: false,
		lastClickPosition: {
			x: 0,
			y: 0,
		},
	});

	get lastClickPosition () {
		return this.state.lastClickPosition;
	}


	constructor () {
		Log.orion(`MouseService activated`);

		useWindow()?.addEventListener('mousedown', (event) => {
			this.setLastClickPosition(event.clientX, event.clientY);
		});
	}


	setLastClickPosition (x: number, y: number) {
		this.state.lastClickPosition.x = x;
		this.state.lastClickPosition.y = y;
	}
}

const serviceInstance = new MouseService();

export default function useMouse () {
	return serviceInstance;
};
