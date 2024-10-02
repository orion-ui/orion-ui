<template>
	<orion-field
		v-bind="setup.orionFieldBinding"
		:label-is-floating="false"
		:class="[
			`orion-radio--${color}`,
			{ 'orion-radio--checked': setup.isChecked },
			{ 'orion-radio--reverse': reverse },
			{ 'orion-radio--inline': inline },
		]"
		input-type="radio"
		@click="setup.handleClick()">
		<slot v-if="label === undefined"/>

		<input
			:ref="setup._input"
			class="orion-radio__input"
			type="radio"
			:value="inputValue"
			:checked="setup.isChecked"
			v-bind="{ ...$attrs, disabled: disabled }">

		<span class="orion-radio__check-container">
			<orion-icon
				v-if="iconCheck"
				:icon="iconCheck"
				@click="setup.handleClick()"/>
			<span
				v-else
				class="orion-radio__check-marker"/>
		</span>
	</orion-field>
</template>

<script setup lang="ts">
import './OrionRadio.less';
import { OrionField } from 'packages/Field';
import { OrionIcon } from 'packages/Icon';
import OrionRadioSetupService from './OrionRadioSetupService';
import type { OrionRadioProps, OrionRadioEmits, VModelType } from './OrionRadioSetupService';
const emits = defineEmits<OrionRadioEmits>() as OrionRadioEmits;
const vModel = defineModel<VModelType>();
const props = withDefaults(defineProps<OrionRadioProps>(), OrionRadioSetupService.defaultProps);
const setup = new OrionRadioSetupService(props, emits, vModel);
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
 * @doc slot/default content of the radio to replace the default label.
 * @doc/fr slot/default contenu pour remplacer le label par défaut.
 */
</script>
