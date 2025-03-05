import SharedFieldSetupService, { SharedFieldSetupServiceEmits, SharedFieldSetupServiceProps } from '../../Shared/SharedFieldSetupService';
import { ModelRef, reactive } from 'vue';
import SharedProps, { SharedPropsColor } from '../../Shared/SharedProps';

export type OrionToggleEmits = SharedFieldSetupServiceEmits<boolean> & {}
export type OrionToggleProps =
	SharedFieldSetupServiceProps &
	SharedPropsColor & {
	// @doc props/inline set the property `display` on `inline-flex` instead of `flex`
	// @doc/fr props/inline défini la propriété `display` à `inline-flex` à la place `flex`
	inline?: boolean,
	// @doc props/reverse displays the label first
	// @doc/fr props/reverse affiche d'abord le label
	reverse?: boolean,
	// @doc props/type type of the input
	// @doc/fr props/type type du champ
	type?: string,
	// @doc props/value value of the toggle
	// @doc/fr props/value valeur du toggle
	value?: boolean,
};

export default class OrionToggleSetupService extends SharedFieldSetupService<OrionToggleProps, boolean> {
	static readonly defaultProps = {
		...SharedFieldSetupService.defaultProps,
		...SharedProps.color,
		type: 'toggle',
	};

	protected inputType = 'toggle';

	protected state = reactive({
		...this.sharedState,
		margin: 2,
	});

	protected get width () {
		switch (this.props.size) {
		case 'xs':
			return 30;
		case 'sm':
			return 37;
		case 'md':
			return 45;
		case 'lg':
			return 52;
		case 'xl':
			return 60;
		default:
			return 45;
		}
	}

	protected get height () {
		return Math.round(this.width / 1.75);
	}

	protected get buttonRadius () {
		return this.height - this.state.margin * 2;
	}

	protected get distance () {
		return this.px(this.width - this.height + this.state.margin);
	}

	protected get isValidCustom () {
		if (this.props.required)
			return !!this.vModel.value;
	}

	get coreStyle () {
		return {
			width: this.px(this.width),
			minWidth: this.px(this.width),
			height: this.px(this.height),
			borderRadius: this.px(this.height),
		};
	}

	get buttonStyle () {
		const cssMargin = this.px(this.state.margin);
		const transform = this.vModel.value
			? this.translate3d(this.distance, cssMargin)
			: this.translate3d(cssMargin, cssMargin);

		return {
			width: this.px(this.buttonRadius),
			height: this.px(this.buttonRadius),
			transform,
		};
	}


	constructor (
		protected props: OrionToggleProps & typeof OrionToggleSetupService.defaultProps,
		protected emits: OrionToggleEmits,
		protected vModel: ModelRef<boolean>) {
		super(props, emits, vModel);
	}


	private px (v: number) {
		return `calc(${v}rem / 16)`;
	}

	private translate3d (x: string, y: string, z = '0') {
		return `translate3d(${x}, ${y}, ${z})`;
	};

	handleClick () {
		if (!this.props.disabled && !this.props.readonly) {
			this.state.hasBeenFocus = true;
			this.vModel.value = !this.vModel.value;
		}
	}
}
