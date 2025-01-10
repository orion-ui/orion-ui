import { reactive, watch } from 'vue';
import SharedSetupService from '../../Shared/SharedSetupService';
import { SharedPropsIcon } from 'packages/Shared/SharedProps';

export type OrionTabPaneEmits = {}
export type OrionTabPaneProps = SharedPropsIcon & {
	// @doc props/disabled disabled the pane
	// @doc/fr props/disabled désactive le panneau
	disabled?: boolean,
	// @doc props/label the label of the tab
	// @doc/fr props/label le label de l'onglet
	label?: string,
	// @doc props/lazy the content of the tab is mounted each time the tab becomes active
	// @doc/fr props/lazy le contenu de l'onglet est monté à chaque fois qu'il devient actif
	lazy?: boolean,
	// @doc props/lazyOnce the content of the tab is only mounted once, the first time the tab is active
	// @doc/fr props/lazyOnce le contenu de l'onglet est uniquement monté une fois, la première fois qu'il est actif
	lazyOnce?: boolean,
	// @doc props/marker adds a visual marker, can be used as a notification marker
	// @doc/fr props/marker ajoute un marqueur visuel, qui peut être utilisé comme marqueur de notification
	marker?: boolean | number,
	// @doc props/markerColor the color of the marker
	// @doc/fr props/markerColor la couleur du marqueur
	markerColor?: Orion.Color,
	// @doc props/name the name of the tab
	// @doc/fr props/name le nom de l'onglet
	name?: string,
};

export default class OrionTabPaneSetupService extends SharedSetupService {
	static readonly defaultProps = {
		disabled: false,
		lazy: false,
		lazyOnce: false,
		markerColor: 'danger' as Orion.Color,
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


	constructor (protected props: OrionTabPaneProps, protected emits: OrionTabPaneEmits, _tabs?: OrionTabs) {
		super();
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
