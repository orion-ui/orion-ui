import { PropType, reactive, watch } from 'vue';
import SharedSetupService from '../../Shared/SharedSetupService';
import SharedProps from '../../Shared/SharedProps';

type Props = SetupProps<typeof OrionTimelinePaneSetupService.props>

export default class OrionTimelinePaneSetupService extends SharedSetupService<Props> {
	static props = {
		...SharedProps.icon(),
		// @doc props/disabled disables the pane
		// @doc/fr props/disabled désactive le panneau
		disabled: Boolean,
		// @doc props/lazy the content of the pane is only loaded when the tab is active
		// @doc/fr props/lazy le contenu du panneau est seulement chargé quand il est actif
		lazy: Boolean,
		// @doc props/lazyOnce the content of the pane is only loading once, the first time the pane is active
		// @doc/fr props/lazyOnce le contenu du panneau est seulement chargé une fois, la première fois que le panneau est actif
		lazyOnce: Boolean,
		// @doc props/complete adds a complete style and defines the pill as clickable
		// @doc/fr props/complete ajoute le style `complete` et permet de cliquer sur la vignette
		complete: {
			type: Boolean,
			default: undefined,
		},
		// @doc props/name the name of the pane
		// @doc/fr props/name nom du panneau
		name: {
			type: [String, Number],
			required: true as const,
		},
		// @doc props/pill the content displayed on the pill
		// @doc/fr props/pill contenu affiché sur la vignette
		pill: {
			type: String,
			default: undefined,
		},
		// @doc props/marker adds  visual marker which can be used as a notification marker
		// @doc/fr props/marker ajoute un marqueur visuel, qui peut être utilisé comme marqueur de notification
		marker: {
			type: [Boolean, Number],
			default: undefined,
		},
		// @doc props/markerColor color of the marker
		// @doc/fr props/markerColor couleur du marqueur
		markerColor: {
			type: String as PropType<Orion.Color>,
			default: 'danger',
		},
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

	constructor (props: Props, _timeline?: OrionTimeline) {
		super(props);
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
