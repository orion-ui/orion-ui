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
			:id="`orion-radio_${setup._uid}`"
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
import { OrionField } from 'packages/Field';
import { OrionIcon } from 'packages/Icon';
import './OrionRadio.less';
import type { OrionRadioEmits, OrionRadioProps, VModelType } from './OrionRadioSetupService';
import OrionRadioSetupService from './OrionRadioSetupService';
const emits = defineEmits<OrionRadioEmits>() as OrionRadioEmits;
const vModel = defineModel<VModelType>();
const props = withDefaults(defineProps<OrionRadioProps>(), OrionRadioSetupService.defaultProps);
const setup = new OrionRadioSetupService(props, emits, vModel);
defineExpose(setup.publicInstance);

/** Doc
 * @doc vModel/vModel component's vModel
 * @doc/fr vModel/vModel vModel du composant
 *
 * @doc slot/default content of the radio to replace the default label.
 * @doc/fr slot/default contenu pour remplacer le label par défaut.
 */
</script>
