import { PropType, reactive, watch } from 'vue';
import SharedSetupService from '../../Shared/SharedSetupService';
import SharedProps from '../../Shared/SharedProps';

type Props = SetupProps<typeof OrionTabPaneSetupService.props>

export default class OrionTabPaneSetupService extends SharedSetupService<Props> {
	static props = {
		...SharedProps.icon(),
		// @doc props/disabled disabled the pane
		// @doc/fr props/disabled désactive le panneau
		disabled: Boolean,
		// @doc props/lazy the content of the tab is mounted each time the tab becomes active
		// @doc/fr props/lazy le contenu de l'onglet est monté à chque fois qu'il devient actif
		lazy: Boolean,
		// @doc props/lazyOnce the content of the tab is only mounted once, the first time the tab is active
		// @doc/fr props/lazyOnce le contenu de l'onglet est uniquement monté une fois, la première fois qu'il est actif
		lazyOnce: Boolean,
		// @doc props/name the name of the tab
		// @doc/fr props/name le nom de l'onglet
		name: {
			type: String,
			required: true as const,
		},
		// @doc props/label the label of the tab
		// @doc/fr props/label le label de l'onglet
		label: {
			type: String,
			default: undefined,
		},
		// @doc props/marker adds a visual marker, can be used as a notification marker
		// @doc/fr props/marker ajoute un marqueur visuel, qui peut être utilisé comme marqueur de notification
		marker: {
			type: [Boolean, Number],
			default: undefined,
		},
		// @doc props/markerColor the color of the marker
		// @doc/fr props/markerColor la couleur du marqueur
		markerColor: {
			type: String as PropType<Orion.Color>,
			default: 'danger',
		},
	};

	private _tabs?: OrionTabs;
	private state = reactive({ hasBeenActive: false });

	get shouldBeInDom () {
		if (this.props.lazy || this.props.lazyOnce) {
			return this.state.hasBeenActive;
		} else {
			return true;
		}
	}

	get active () {
		return this._tabs?.getValue() === this.props.name;
	}

	get publicInstance () {
		return {
			...super.publicInstance,
			disabled: this.props.disabled,
			name: this.props.name,
		};
	}


	constructor (props: Props, _tabs?: OrionTabs) {
		super(props);
		this._tabs = _tabs;

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
		this.state.hasBeenActive = this._tabs?.getValue() === this.props.name;
	}
}
