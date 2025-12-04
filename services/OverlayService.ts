import { Log } from 'utils/Log';

export class OverlayService {
	private globalOverlay?: OrionOverlay;


	constructor () {
		Log.orion(`OverlayService activated`);
	}

	/**
	 * @desc adds a global overlay on the application. Used by **Orion** to set the main overlay
	 * @param {object} overlayInstance instance of the orion overlay
	 * @return void
	 */
	setGlobalOverlay (overlayInstance: OrionOverlay) {
		this.globalOverlay = overlayInstance;
	}

	private guard () {
		if (!this.globalOverlay) throw `Orion global overlay not set`;
	}

	/**
	 * @desc if the global overlay is set, shows the overlay
	 * @return void
	 */
	show () {
		this.guard();
		this.globalOverlay?.show();
	}

	/**
	 * @desc if the global overlay is set, hides the overlay
	 * @return void
	 */
	hide () {
		this.guard();
		this.globalOverlay?.hide();
	}
}

const serviceInstance = new OverlayService();

export default function useOverlay () {
	return serviceInstance;
};
