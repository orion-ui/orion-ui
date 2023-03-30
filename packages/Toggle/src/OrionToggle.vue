<template>
	<orion-field
		v-bind="setup.orionFieldBinding"
		:label-is-floating="false"
		:class="[
			`orion-toggle--${setup.props.color}`,
			`orion-toggle--${setup.props.size}`,
			{ 'orion-toggle--checked': setup.vModel },
			{ 'orion-toggle--reverse': setup.props.reverse },
			{ 'orion-toggle--inline': setup.props.inline },
		]"
		input-type="toggle"
		@click="setup.handleClick()">
		<slot v-if="label === undefined"/>

		<input
			:ref="setup._input"
			v-model="setup.vModel"
			class="orion-toggle__input"
			type="checkbox"
			:checked="setup.vModel"
			v-bind="{ ...$attrs, disabled: setup.props.disabled }">

		<div
			class="orion-toggle__core"
			:style="setup.coreStyle">
			<div
				class="orion-toggle__core-button"
				:style="setup.buttonStyle"/>
		</div>
	</orion-field>
</template>

<script setup lang="ts">
import './OrionToggle.less';
import { OrionField } from 'packages/Field';
import OrionToggleSetupService from './OrionToggleSetupService';
type FieldEmit = {
  (e: 'focus', payload: FocusEvent): void;
  (e: 'blur', payload?: FocusEvent): void;
  (e: 'input', payload: boolean): void;
  (e: 'change', val?: boolean): void;
  (e: 'update:modelValue', payload: boolean): void;
  (e: 'clear'): void;
}
const emit = defineEmits<FieldEmit>();
const props = defineProps(OrionToggleSetupService.props);
const setup = new OrionToggleSetupService(props, emit);
defineExpose(setup.publicInstance);

/** Doc
 * @doc event/focus/desc emitted on focus
 * @doc/fr event/focus/desc émis lors du focus
 *
 * @doc event/blur/desc emitted when the focus leaves the field
 * @doc/fr event/blur/desc émis quand le focus quitte le champ
 *
 * @doc event/input/desc emitted when the value of the field changes
 * @doc/fr event/input/desc émis lorsque la valeur est modifiée
 *
 * @doc event/change/desc emitted when the value of the field changes
 * @doc/fr event/change/desc émis lorsque la valeur est modifiée
 *
 * @doc event/update:modelValue/desc emitted to update the field value
 * @doc/fr event/update:modelValue/desc émis pour mettre à jour la valeur
 *
 * @doc event/clear/desc emitted when the field is cleared
 * @doc/fr event/clear/desc émis quand le champ est vidé
 *
 * @doc slot/default content of the toggle to replace the default label.
 * @doc/fr slot/default contenu pour remplacer le label par défaut.
 */
</script>
