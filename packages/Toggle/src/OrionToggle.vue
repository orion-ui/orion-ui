<template>
	<orion-field
		v-bind="setup.orionFieldBinding"
		:label-is-floating="false"
		:class="[
			`orion-toggle--${color}`,
			`orion-toggle--${size}`,
			{ 'orion-toggle--checked': vModel },
			{ 'orion-toggle--reverse': reverse },
			{ 'orion-toggle--inline': inline },
		]"
		input-type="toggle"
		@click="setup.handleClick()">
		<slot v-if="label === undefined"/>

		<input
			:ref="setup._input"
			v-model="vModel"
			class="orion-toggle__input"
			type="checkbox"
			:checked="vModel"
			v-bind="{ ...$attrs, disabled: disabled }">

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
import type { OrionToggleProps, OrionToggleEmits } from './OrionToggleSetupService';
const emits = defineEmits<OrionToggleEmits>() as OrionToggleEmits;
const vModel = defineModel<boolean>({ required: true });
const props = withDefaults(defineProps<OrionToggleProps>(), OrionToggleSetupService.defaultProps);
const setup = new OrionToggleSetupService(props, emits, vModel);
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
