import { Log } from 'utils/Log';

class TourService {
	state: Record<string, OrionTour> = {};
	tour?: OrionTour;


	constructor () {
		Log.orion(`TourService activated`);
	}

	/**
	 * @desc registers the tour in the instance
	 * @param {string} name name of the tour
	 * @param {Component} [tour] tour to register
	 * @return object
	 */
	register (name: string, tour?: OrionTour) {
		if (!!tour) {
			this.state[name] = tour;
			return tour;
		}
	}

	/**
	 * @desc starts the tour at the position given in parameter (0 by default)
	 * @param {number} [index=0] index of the step to target
	 * @return void
	 */
	start (index = 0) {
		this.tour?.start(index);
	}

	/**
	 * @desc stops the tour
	 * @return void
	 */
	stop () {
		this.tour?.stop();
	}
}

// @tree-shaking lazy initialization
let tourServiceSingleton: TourService;

export function useTour (name: string, tourComponent?: OrionTour) {
	if (!tourServiceSingleton) {
		tourServiceSingleton = new TourService();
	}
	tourServiceSingleton.tour = tourServiceSingleton.state[name] ?? tourServiceSingleton.register(name, tourComponent);
	return tourServiceSingleton;
};
