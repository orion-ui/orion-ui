import { reactive, watch } from 'vue';
import SharedSetupService from '../../Shared/SharedSetupService';

export type OrionCarouselItemEmits = {}
export type OrionCarouselItemProps = {
	// @doc props/lazy the content of the item is mounted each time the item becomes active
	// @doc/fr props/lazy le contenu de l'élément est monté à chaque fois qu'il devient actif
	lazy?: boolean,
	// @doc props/lazyOnce the content of the item is only mounted once, the first time the item is active
	// @doc/fr props/lazyOnce le contenu de l'élément est uniquement monté une fois, la première fois qu'il est actif
	lazyOnce?: boolean,
	// @doc props/name step identifier
	// @doc/fr props/name identifiant de l'élément
	name?: number | string,
};

export default class OrionCarouselItemSetupService extends SharedSetupService {
	static readonly defaultProps = {};

	private _carousel?: OrionCarousel;
	private state = reactive({ hasBeenActive: false });

	get stepsLength () { return this._carousel?.stepsLength; }
	get isActive () { return this._carousel?.step() === this.props.name; }

	get shouldBeInDom () {
		if (this.props.lazy || this.props.lazyOnce) {
			return this.state.hasBeenActive;
		} else {
			return true;
		}
	}

	constructor (
		protected props: OrionCarouselItemProps & typeof OrionCarouselItemSetupService.defaultProps,
		protected emits: OrionCarouselItemEmits,
		_carousel?: OrionCarousel) {
		super();
		this._carousel = _carousel;

		watch(() => this.isActive, (val) => {
			if (val) {
				this.state.hasBeenActive = val;
			} else {
				if (this.props.lazy) {
					this.state.hasBeenActive = val;
				}
			}
		});
	}


	protected onMounted () {
		this.state.hasBeenActive = this._carousel?.step() === this.props.name;
	}
}
