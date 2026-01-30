import anime from 'animejs';
import { nextTick, ref, type SetupContext, watch } from 'vue';
import { type SharedPropsIcon } from '../../Shared/SharedProps';
import { SharedSetup } from '../../Shared/SharedSetup';

export type OrionIconEmits = {
	// @doc event/marker-click/desc emitted on marker click
	// @doc/fr event/marker-click/desc émis au moment du click sur le marqueur
	(e: 'marker-click'): void
};
export type OrionIconProps = SharedPropsIcon & {
	// @doc props/button adds a background color
	// @doc/fr props/button ajouter une couleur en arrière plan
	button?: Orion.Color
	// @doc props/loading if set, blocks the click on the icon
	// @doc/fr props/loading si défini, bloque le click sur l'icône
	loading?: boolean
	// @doc props/marker adds a visual marker, can be used as a notification marker
	// @doc/fr props/marker ajoute un marqueur visuel, qui peut être utilisé comme un marqueur de notification
	marker?: boolean | number
	// @doc props/markerColor the color of the marker
	// @doc/fr props/markerColor couleur du marqueur
	markerColor?: Orion.Color
	// @doc props/markerPosition the position of the marker
	// @doc/fr props/markerPosition position du marqueur
	markerPosition?: string
	// @doc props/onMarkerClick callback when the marker is clicked
	// @doc/fr props/onMarkerClick callback au moment du click sur le marqueur
	onMarkerClick?: (e: MouseEvent) => void
	// @doc props/ripple emits a wave on the click and adds an hover color
	// @doc/fr props/ripple émet une onde au moment du click et ajoute un style au moment du survol
	ripple?: Orion.Color
};

export class OrionIconSetup extends SharedSetup {

	static readonly defaultProps = {
		marker: false as OrionIconProps['marker'],
		markerColor: 'danger' as Orion.Color,
		markerPosition: 'top right',
	};

	_el = ref<RefDom>();
	_elRipple = ref<RefDom>();
	_elSpinner = ref<RefDom>();

	private attrs!: SetupContext['attrs'];

	get isClickable () { return !!this.attrs.onClick }
	private get isMarkerClickable () { return !!this.props.onMarkerClick }
	get onMarkerClick () { return this.attrs.onMarkerClick as () => void }
	get positionClass () {
		const positionArray = this.props.markerPosition.split(' ');
		const positionClass = positionArray.map(x => `orion-icon__marker--${x}`);
		return positionClass;
	}

	constructor (
		protected props: OrionIconProps & typeof OrionIconSetup.defaultProps,
		protected emits: OrionIconEmits, attrs: SetupContext['attrs']) {
		super();
		this.attrs = attrs;

		watch(() => this.props.loading, () => this.setSpinnerDimensions());
	}

	handleClick (event: MouseEvent | TouchEvent) {
		if (this.props.loading) return;

		if (this.props.ripple) {
			if (this._elRipple.value) {
				anime({
					targets: this._elRipple.value.lastElementChild,
					opacity: [1, 0],
					scale: [1, 3],
					duration: 600,
					easing: 'easeOutSine',
				});
			}
		}

		if (this.isClickable) {
			event.stopPropagation();
		}
	}

	handleMarkerClick (event: MouseEvent) {
		if (this.isMarkerClickable) {
			event.stopPropagation();
			this.props.onMarkerClick?.(event);
			this.emits('marker-click');
		}
	}

	private setSpinnerDimensions () {
		if (this._el.value) {
			const { fontSize, color } = getComputedStyle(this._el.value);

			nextTick(() => {
				if (this._elSpinner.value) {
					this._elSpinner.value.style.width = fontSize;
					this._elSpinner.value.style.height = fontSize;
					this._elSpinner.value.style.stroke = color;
				}
			});
		}
	}

}
