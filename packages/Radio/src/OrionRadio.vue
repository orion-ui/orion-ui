<template>
	<orion-field
		v-bind="setup.orionFieldBinding"
		:class="[
			`orion-${setup.inputType}--${color}`,
			`orion-${setup.inputType}--${size}`,
			{ [`orion-${setup.inputType}--checked`]: setup.isChecked },
			{ [`orion-${setup.inputType}--reverse`]: reverse },
			{ [`orion-${setup.inputType}--inline`]: inline },
		]"
		:tabindex="disabled ? undefined : setup._uid"
		@click="setup.handleClick()"
		@keydown.space.prevent="setup.handleClick()"
		@keydown.enter.prevent="setup.handleClick()">
		<template #label>
			<slot/>
		</template>

		<template #hint>
			<slot name="hint"/>
		</template>

		<input
			:id="`orion-${setup.inputType}_${setup._uid}`"
			:ref="setup._orionInput"
			type="radio"
			:value="inputValue"
			:checked="setup.isChecked"
			v-bind="{ ...$attrs, disabled, readonly }">

		<span :class="`orion-${setup.inputType}__check-container`">
			<orion-icon
				v-if="iconCheck && setup.isChecked"
				:icon="iconCheck"
				@click="setup.handleClick()"/>
			<span
				v-else
				:class="`orion-${setup.inputType}__check-marker`"/>
		</span>
	</orion-field>
</template>

<script setup lang="ts">
import { OrionField } from 'packages/Field';
import { OrionIcon } from 'packages/Icon';
import './OrionRadio.less';
import { OrionRadioSetup, type OrionRadioEmits, type OrionRadioProps } from './OrionRadioSetup';
const emits = defineEmits<OrionRadioEmits>() as OrionRadioEmits;
const vModel = defineModel<Orion.VModel.Radio>();
const props = withDefaults(defineProps<OrionRadioProps>(), OrionRadioSetup.defaultProps);
const setup = new OrionRadioSetup(props, emits, vModel);
defineExpose(setup.publicInstance);

/** Doc
 * @doc vModel/vModel component's vModel
 * @doc/fr vModel/vModel vModel du composant
 *
 * @doc slot/default content of the radio to replace the default label.
 * @doc/fr slot/default contenu pour remplacer le label par défaut.
 */
</script>
