import { type ModelRef } from 'vue';
import type { SharedFieldSetupEmits, SharedFieldSetupProps } from '../../Shared/SharedFieldSetup';
import { SharedFieldSetup } from '../../Shared/SharedFieldSetup';
import { SharedProps, type SharedPropsColor } from '../../Shared/SharedProps';

export type OrionToggleEmits = SharedFieldSetupEmits<boolean> & {};
export type OrionToggleProps = SharedFieldSetupProps & SharedPropsColor & {
	// @doc props/inline set the property `display` on `inline-flex` instead of `flex`
	// @doc/fr props/inline défini la propriété `display` à `inline-flex` à la place `flex`
	inline?: boolean
	// @doc props/reverse displays the label first
	// @doc/fr props/reverse affiche d'abord le label
	reverse?: boolean
	// @doc props/value value of the toggle
	// @doc/fr props/value valeur du toggle
	value?: boolean
};

export class OrionToggleSetup extends SharedFieldSetup<OrionToggleProps, boolean> {

	static readonly defaultProps = {
		...SharedFieldSetup.defaultProps,
		...SharedProps.color,
	};

	readonly inputType = 'toggle';

	protected get isValidCustom () {
		if (this.props.required) return !!this.vModel.value;
	}

	constructor (
		protected props: OrionToggleProps
		  & typeof OrionToggleSetup.defaultProps,
		protected emits: OrionToggleEmits,
		protected vModel: ModelRef<boolean>,
	) {
		super(props, emits, vModel);
	}

	handleClick () {
		if (!this.props.disabled && !this.props.readonly) {
			this.state.hasBeenFocus = true;
			this.vModel.value = !this.vModel.value;
		}
	}

}
