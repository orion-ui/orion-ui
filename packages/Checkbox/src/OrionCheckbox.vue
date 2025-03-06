<template>
	<orion-field
		v-bind="setup.orionFieldBinding"
		:label-is-floating="false"
		:class="[
			`orion-checkbox--${color}`,
			{ 'orion-checkbox--checked': setup.isChecked },
			{ 'orion-checkbox--reverse': reverse },
			{ 'orion-checkbox--inline': inline },
		]"
		input-type="checkbox"
		@click="setup.handleClick()">
		<slot v-if="label === undefined"/>

		<input
			:ref="setup._input"
			class="orion-checkbox__input"
			type="checkbox"
			:value="inputValue"
			:checked="setup.isChecked"
			v-bind="{ ...$attrs, disabled: disabled }">

		<span class="orion-checkbox__check-container">
			<orion-icon
				v-if="iconCheck"
				:icon="iconCheck"
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
import type { OrionCheckboxProps, OrionCheckboxEmits } from './OrionCheckboxSetupService';
const emits = defineEmits<OrionCheckboxEmits<any>>() as OrionCheckboxEmits<any>;
const vModel = defineModel<any[] | boolean | null | undefined>();
const props = withDefaults(defineProps<OrionCheckboxProps>(), OrionCheckboxSetupService.defaultProps);
const setup = new OrionCheckboxSetupService(props, emits, vModel);
defineExpose(setup.publicInstance);

/** Doc
 * @doc vModel/vModel component's vModel
 * @doc/fr vModel/vModel vModel du composant
 *
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
 * @doc event/clear/desc emitted when the checkbox is cleared
 * @doc/fr event/clear/desc
 *
 * @doc slot/default content of the checkbox to replace the default label.
 * @doc slot/default contenu de la case à cocher qui va remplacer le label par défaut.
 */
</script>
