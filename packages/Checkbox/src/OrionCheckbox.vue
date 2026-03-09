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
			type="checkbox"
			:value="inputValue"
			:checked="setup.isChecked"
			v-bind="{ ...$attrs, disabled, readonly }">

		<span :class="`orion-${setup.inputType}__check-container`">
			<orion-icon
				v-if="iconCheck && setup.isChecked"
				:icon="iconCheck"
				@click="setup.handleClick()"/>
			<svg
				v-else-if="!iconCheck"
				viewBox="0 0 12 10">
				<polyline points="1.5 6 4.5 9 10.5 1"/>
			</svg>
		</span>
	</orion-field>
</template>

<script setup lang="ts">
import { OrionField } from 'packages/Field';
import { OrionIcon } from 'packages/Icon';
import './OrionCheckbox.less';
import { OrionCheckboxSetup, type OrionCheckboxEmits, type OrionCheckboxProps } from './OrionCheckboxSetup';
const emits = defineEmits<OrionCheckboxEmits<any>>() as OrionCheckboxEmits<any>;
const vModel = defineModel<any[] | boolean | null | undefined>();
const props = withDefaults(defineProps<OrionCheckboxProps>(), OrionCheckboxSetup.defaultProps);
const setup = new OrionCheckboxSetup(props, emits, vModel);
defineExpose(setup.publicInstance);

/** Doc
 * @doc vModel/vModel component's vModel
 * @doc/fr vModel/vModel vModel du composant
 *
 * @doc slot/default content of the checkbox to replace the default label.
 * @doc slot/default contenu de la case à cocher qui va remplacer le label par défaut.
 */
</script>
