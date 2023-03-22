import { PropType, reactive, watch } from 'vue';
import { debounce, DebouncedFunc } from 'lodash-es';
import SharedFieldSetupService, { FieldEmit } from '../../Shared/SharedFieldSetupService';

type Props = SetupProps<typeof OrionColorPickerSetupService.props>

type ColorPickerEmit = FieldEmit<string> & {
	(e: 'picked', payload: ColorValue): void;
}

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

export default class OrionColorPickerSetupService extends SharedFieldSetupService<Props, string> {
	static props = {
		...SharedFieldSetupService.props,
		// @doc props/hideHex hides the hexadecimal value
		// @doc/fr props/hideHex masque la valeur hexadécimale
		hideHex: Boolean,
		// @doc props/hideRgba hides the rgba value
		// @doc/fr props/hideRgba masque la valeur rgba
		hideRgba: Boolean,
		// @doc props/startValue the default value
		// @doc/fr props/startValue la valeur par défaut
		startValue: {
			type: String,
			default: undefined,
		},
		// @doc props/format the format of the color definition
		// @doc/fr props/format format de la couleur
		format: {
			type: String as PropType<ColorFormat>,
			default: 'hex',
			validator: (val: string) => ['hex', 'rgba', 'hsl'].includes(val),
		},
		// @doc props/debounce the debounce interval
		// @doc/fr props/debounce définits la durée selon laquelle la valeur va se mettre à jour
		debounce: {
			type: Number,
			default: 300,
		},
	};

	protected emit: ColorPickerEmit;
	protected state = reactive({
		...this.sharedState,
		color: '',
		pickedColor: undefined as Undef<ColorValue>,
	});

	changeColor: DebouncedFunc<(pickedColor?: ColorValue) => void>;

	get color () {
		return this.state.color;
	}


	constructor (props: Props, emit: ColorPickerEmit) {
		super(props, emit);
		this.emit = emit;
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
			this.emit('picked', pickedColor);
		}, this.props.debounce);
	}
}
