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
			:id="`orion-toggle_${setup._uid}`"
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
import { OrionField } from 'packages/Field';
import './OrionToggle.less';
import type { OrionToggleEmits, OrionToggleProps } from './OrionToggleSetupService';
import OrionToggleSetupService from './OrionToggleSetupService';
const emits = defineEmits<OrionToggleEmits>() as OrionToggleEmits;
const vModel = defineModel<boolean>({ required: true });
const props = withDefaults(defineProps<OrionToggleProps>(), OrionToggleSetupService.defaultProps);
const setup = new OrionToggleSetupService(props, emits, vModel);
defineExpose(setup.publicInstance);

/** Doc
 * @doc vModel/vModel component's vModel
 * @doc/fr vModel/vModel vModel du composant
 *
 * @doc slot/default content of the toggle to replace the default label.
 * @doc/fr slot/default contenu pour remplacer le label par défaut.
 */
</script>
