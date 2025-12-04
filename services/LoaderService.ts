export class LoaderService {
	private globalLoader?: OrionLoader;

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

// @tree-shaking lazy initialization
let loaderServiceSingleton: LoaderService;

export function useLoader () {
	if (!loaderServiceSingleton) {
		loaderServiceSingleton = new LoaderService();
	}
	return loaderServiceSingleton;
};
