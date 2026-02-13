import { isArray } from 'lodash-es';
import { SharedProps, type SharedPropsColor } from 'packages/Shared/SharedProps';
import { type OrionToggleButtonProps } from 'packages/ToggleButton/src/OrionToggleButtonSetup';
import { useMonkey } from 'services/MonkeyService';
import { isDefineOrTrue } from 'utils/tools';
import { type ModelRef, type Slots, type VNode } from 'vue';
import { SharedSetup } from '../../Shared/SharedSetup';

export type OrionToggleButtonGroupEmits = {
	// @doc event/click/desc emitted on button click
	// @doc/fr event/click/desc émis lors du click sur le bouton
	(e: 'button-click', button: OrionToggleButton, event: MouseEvent): void
};

export type OrionToggleButtonGroupProps = SharedPropsColor & {
	// @doc props/childProps properties to pass to each toggle button
	// @doc/fr props/childProps propriétés à passer à chaque toggle button
	childProps?: Partial<OrionToggleButtonProps>
	// @doc props/multiple allows multiple toggle buttons to be active
	// @doc/fr props/multiple permet la sélection de plusieurs toggle buttons
	multiple?: boolean
};

export class OrionToggleButtonGroupSetup extends SharedSetup {

	static readonly defaultProps = {
		...SharedProps.color,
		multiple: false,
		childProps: () => ({ nude: true }) as Partial<OrionToggleButtonProps>,
	};

	get slotsItem () {
		const defaultSlot = this.slots.default?.();
		return defaultSlot?.map((vnode) => {
			// Handle Fragement created by v-for
			if (typeof vnode.type === 'symbol' && isArray(vnode.children)) {
				return vnode.children as VNode[];
			}
			return vnode;
		})
			.flat()
			.filter((item: VNode) => item?.type && (item.type as any).__name === 'OrionToggleButton');
	}

	constructor (
		protected props: OrionToggleButtonGroupProps
		  & Omit<typeof OrionToggleButtonGroupSetup.defaultProps, 'childProps'>
		  & { childProps?: Partial<OrionToggleButtonProps> },
		protected emits: OrionToggleButtonGroupEmits,
		protected slots: Slots,
		protected vModel: ModelRef<string | number | (string | number)[] | undefined>,
	) {
		super();
	}

	buttonIsActive (button: OrionToggleButton) {
		if (this.props.multiple && Array.isArray(this.vModel.value))
			return this.vModel.value.includes(button.props.name);
		else
			return this.vModel.value === button.props?.name;
	}

	onButtonClick (button: OrionToggleButton, event: MouseEvent) {
		if (isDefineOrTrue(button.disabled)) return;

		if (this.props.multiple && Array.isArray(this.vModel.value)) {
			this.vModel.value = useMonkey(this.vModel.value).toggle(button.props.name);
		}
		else {
			if (this.vModel.value === button.props.name)
				this.vModel.value = undefined;
			else
				this.vModel.value = button.props.name;

		}

		this.emits('button-click', button, event);
	}

}
