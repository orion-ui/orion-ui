import { reactive, watch } from 'vue';
import SharedSetupService from '../../Shared/SharedSetupService';
import { SharedPropsIcon } from '../../Shared/SharedProps';

export type OrionTimelinePaneEmits = {}
export type OrionTimelinePaneProps = SharedPropsIcon & {
	// @doc props/centeredPill centers the pill and the #after slot
	// @doc/fr props/centeredPill centre la vignette et le slot #after
	centeredPill?: boolean,
	// @doc props/complete adds a complete style and defines the pill as clickable
	// @doc/fr props/complete ajoute le style `complete` et permet de cliquer sur la vignette
	complete?: boolean,
	// @doc props/disabled disables the pane
	// @doc/fr props/disabled désactive le panneau
	disabled?: boolean,
	// @doc props/lazy the content of the pane is only loaded when the tab is active
	// @doc/fr props/lazy le contenu du panneau est seulement chargé quand il est actif
	lazy?: boolean,
	// @doc props/lazyOnce the content of the pane is only loading once, the first time the pane is active
	// @doc/fr props/lazyOnce le contenu du panneau est seulement chargé une fois, la première fois que le panneau est actif
	lazyOnce?: boolean,
	// @doc props/marker adds  visual marker which can be used as a notification marker
	// @doc/fr props/marker ajoute un marqueur visuel, qui peut être utilisé comme marqueur de notification
	marker?: boolean | number,
	// @doc props/markerColor color of the marker
	// @doc/fr props/markerColor couleur du marqueur
	markerColor?: Orion.Color,
	// @doc props/name the name of the pane
	// @doc/fr props/name nom du panneau
	name?: string | number,
	// @doc props/pill the content displayed on the pill
	// @doc/fr props/pill contenu affiché sur la vignette
	pill?: string,
};

export default class OrionTimelinePaneSetupService extends SharedSetupService {
	static readonly defaultProps = {
		centeredPill: false,
		disabled: false,
		lazy: false,
		lazyOnce: false,
		markerColor: 'danger' as Orion.Color,
	};

	private _timeline?: OrionTimeline;
	private state = reactive({ hasBeenActive: false });

	get shouldBeInDom () {
		if (this.props.lazy || this.props.lazyOnce) {
			return this.state.hasBeenActive;
		} else {
			return true;
		}
	}

	get active () {
		return this._timeline?.getCurrent() === this.props.name;
	}

	get publicInstance () {
		return {
			...super.publicInstance,
			disabled: this.props.disabled,
			name: this.props.name,
		};
	}

	constructor (protected props: OrionTimelinePaneProps, protected emits: OrionTimelinePaneEmits, _timeline?: OrionTimeline) {
		super();
		this._timeline = _timeline;

		watch(() => this.active, (val) => {
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
		this.state.hasBeenActive = this._timeline?.getCurrent() === this.props.name;
	}
}
