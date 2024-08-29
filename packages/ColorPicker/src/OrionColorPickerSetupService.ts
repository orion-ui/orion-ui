import { reactive, watch } from 'vue';
import { debounce, DebouncedFunc } from 'lodash-es';
import SharedFieldSetupService, { SharedFieldSetupServiceProps, SharedFieldSetupServiceEmits } from '../../Shared/SharedFieldSetupService';

export type OrionColorPickerEmits = SharedFieldSetupServiceEmits<Nil<string>> & {
	(e: 'picked', payload: ColorValue): void;
}
export type OrionColorPickerProps =  SharedFieldSetupServiceProps & {
	// @doc props/debounce the debounce interval
	// @doc/fr props/debounce définits la durée selon laquelle la valeur va se mettre à jour
	debounce: number,
	// @doc props/format the format of the color definition
	// @doc/fr props/format format de la couleur
	format: ColorFormat,
	// @doc props/hideHex hides the hexadecimal value
	// @doc/fr props/hideHex masque la valeur hexadécimale
	hideHex: boolean,
	// @doc props/hideRgba hides the rgba value
	// @doc/fr props/hideRgba masque la valeur rgba
	hideRgba: boolean,
	// @doc props/startValue the default value
	// @doc/fr props/startValue la valeur par défaut
	startValue?: string,
};

type ColorFormat = 'rgba' | 'hsv' | 'hex';

type ColorValue = {
  rgba: {
    r: number;
    g: number;
    b: number;
    a: number;
  };
  hsv: {
    h: number;
    s: number;
    v: number;
  };
  hex: string;
}

export default class OrionColorPickerSetupService extends SharedFieldSetupService<OrionColorPickerProps, string> {
	static readonly defaultProps = {
		...SharedFieldSetupService.defaultProps,
		debounce: 300,
		hideHex: false,
		hideRgba: false,
		format: 'hex' as ColorFormat,
	};


	protected state = reactive({
		...this.sharedState,
		color: '',
		pickedColor: undefined as Undef<ColorValue>,
	});

	changeColor: DebouncedFunc<(pickedColor?: ColorValue) => void>;

	get color () {
		return this.state.color;
	}


	constructor (protected props: OrionColorPickerProps, protected emits: OrionColorPickerEmits) {
		super(props, emits);

		this.changeColor = this.init();

		watch(() => this.props.debounce, () => this.changeColor = this.init());
		watch(() => this.props.format, () => {
			this.changeColor = this.init();
			this.changeColor(this.state.pickedColor);
		});
	}

	protected async onBeforeMount () {
		this.state.color = this.props.startValue ?? this.vModel ?? '';
	}


	init () {
		return debounce((pickedColor?: ColorValue) => {
			if (!pickedColor) return;

			this.state.pickedColor = pickedColor;

			if (this.props.format === 'rgba') {
				const { r, g, b, a } = pickedColor.rgba;
				this.state.color = `rgba(${r}, ${g}, ${b}, ${a})`;
			} else if (this.props.format === 'hsv') {
				const { h, s, v } = pickedColor.hsv;
				this.state.color = `hsv(${h}, ${s}, ${v})`;
			} else {
				this.state.color = pickedColor.hex;
			}

			this.vModel = this.state.color;
			this.emits('picked', pickedColor);
		}, this.props.debounce);
	}
}
