import { Log } from 'utils/Log';

export class LoaderService {
	private globalLoader?: OrionLoader;


	constructor () {
		Log.orion(`LoaderService activated`);
	}

	/**
	 * @desc adds a global loader on the application
	 * @param {object} loaderInstance instance of the orion loader
	 * @return void
	 */
	setGlobalLoader (loaderInstance: OrionLoader) {
		this.globalLoader = loaderInstance;
	}

	private guard () {
		if (!this.globalLoader) throw `Orion global loader not set`;
	}

	/**
	 * @desc if the global loader is set, shows the loader
	 * @return void
	 */
	show (message?: string) {
		this.guard();
		this.globalLoader?.show(message);
	}

	/**
	 * @desc if the global loader is set, hides the loader
	 * @return void
	 */
	hide () {
		this.guard();
		this.globalLoader?.hide();
	}
}

const serviceInstance = new LoaderService();

export default function useLoader () {
	return serviceInstance;
};
