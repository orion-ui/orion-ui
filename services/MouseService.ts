import { Log } from 'utils/Log';
import { reactive } from 'vue';
import { useWindow } from './WindowService';

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

// @tree-shaking lazy initialization
let serviceInstance: MouseService | undefined;

export function useMouse () {
	if (!serviceInstance) {
		serviceInstance = new MouseService();
	}
	return serviceInstance;
};
