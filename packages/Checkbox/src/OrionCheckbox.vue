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
				:icon="iconCheck || 'check'"
				@click="setup.handleClick()"/>
		</span>
	</orion-field>
</template>

<script setup lang="ts">
import './OrionCheckbox.less';
import { OrionField } from 'packages/Field';
import { OrionIcon } from 'packages/Icon';
import OrionCheckboxSetupService from './OrionCheckboxSetupService';
import type { OrionCheckboxProps,
	OrionCheckboxEmits } from './OrionCheckboxSetupService';
const emits = defineEmits<OrionCheckboxEmits<any>>() as OrionCheckboxEmits<any>;
const vModel = defineModel<any[] | boolean | null | undefined>();
const props = withDefaults(
	defineProps<OrionCheckboxProps>(),
	OrionCheckboxSetupService.defaultProps,
);
const setup = new OrionCheckboxSetupService(props, emits, vModel);
defineExpose(setup.publicInstance);

/** Doc
 * @doc vModel/vModel component's vModel
 * @doc/fr vModel/vModel vModel du composant
 *
 * @doc slot/default content of the checkbox to replace the default label.
 * @doc slot/default contenu de la case à cocher qui va remplacer le label par défaut.
 */
</script>
