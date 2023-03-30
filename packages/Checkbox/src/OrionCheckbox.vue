<template>
	<orion-field
		v-bind="setup.orionFieldBinding"
		:label-is-floating="false"
		:class="[
			`orion-checkbox--${setup.props.color}`,
			{ 'orion-checkbox--checked': setup.isChecked },
			{ 'orion-checkbox--reverse': setup.props.reverse },
			{ 'orion-checkbox--inline': setup.props.inline },
		]"
		input-type="checkbox"
		@click="setup.handleClick()">
		<slot v-if="label === undefined"/>

		<input
			:ref="setup._input"
			class="orion-checkbox__input"
			type="checkbox"
			:value="setup.props.inputValue"
			:checked="setup.isChecked"
			v-bind="{ ...$attrs, disabled: setup.props.disabled }">

		<span class="orion-checkbox__check-container">
			<orion-icon
				v-if="setup.props.iconCheck"
				:icon="setup.props.iconCheck"
				@click="setup.handleClick()"/>
			<svg
				v-else
				viewBox="0 0 12 10">
				<polyline points="1.5 6 4.5 9 10.5 1"/>
			</svg>
		</span>
	</orion-field>
</template>

<script setup lang="ts">
import './OrionCheckbox.less';
import { OrionField } from 'packages/Field';
import { OrionIcon } from 'packages/Icon';
import OrionCheckboxSetupService from './OrionCheckboxSetupService';
type VModelType = any[] | boolean | null | undefined;
type FieldEmit = {
  (e: 'focus', payload: FocusEvent): void;
  (e: 'blur', payload?: FocusEvent): void;
  (e: 'input', payload: VModelType): void;
  (e: 'change', val?: VModelType): void;
  (e: 'update:modelValue', payload: VModelType): void;
  (e: 'clear'): void;
}
const emit = defineEmits<FieldEmit>();
const props = defineProps(OrionCheckboxSetupService.props);
const setup = new OrionCheckboxSetupService(props, emit);
defineExpose(setup.publicInstance);

/** Doc
 * @doc event/focus/desc emitted on checkbox focus
 * @doc/fr event/focus/desc émis lors du focus
 *
 * @doc event/blur/desc emitted when the focus leaves the checkbox
 * @doc/fr event/blur/desc émis quand le focus quitte la case à cocher
 *
 * @doc event/input/desc emitted when the value of the checkbox changes
 * @doc/fr event/input/desc émis lorsque la valeur est modifiée
 *
 * @doc event/change/desc emitted when the value of the checkbox changes
 * @doc/fr event/change/desc  émis lorsque la valeur est modifiée
 *
 * @doc event/update:modelValue/desc emitted to update the checkbox value
 * @doc/fr event/update:modelValue/desc émis pour mettre à jour la valeur
 *
 * @doc event/clear/desc emitted when the checkbox is cleared
 * @doc/fr event/clear/desc
 *
 * @doc slot/default content of the checkbox to replace the default label.
 * @doc slot/default contenu de la case à cocher qui va remplacer le label par défaut.
 */
</script>
