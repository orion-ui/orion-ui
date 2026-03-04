<template>
	<orion-field
		v-bind="setup.orionFieldBinding"
		:label-is-floating="false"
		:class="[
			`orion-${setup.inputType}--${color}`,
			`orion-${setup.inputType}--${size}`,
			{ [`orion-${setup.inputType}--checked`]: vModel },
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
			v-model="vModel"
			type="checkbox"
			:checked="vModel"
			v-bind="{ ...$attrs, disabled, readonly }">

		<div :class="`orion-${setup.inputType}__core`">
			<div :class="`orion-${setup.inputType}__core-button`"/>
		</div>
	</orion-field>
</template>

<script setup lang="ts">
import { OrionField } from 'packages/Field';
import './OrionToggle.less';
import { OrionToggleSetup, type OrionToggleEmits, type OrionToggleProps } from './OrionToggleSetup';
const emits = defineEmits<OrionToggleEmits>() as OrionToggleEmits;
const vModel = defineModel<boolean>({ required: true });
const props = withDefaults(defineProps<OrionToggleProps>(), OrionToggleSetup.defaultProps);
const setup = new OrionToggleSetup(props, emits, vModel);
defineExpose(setup.publicInstance);

/** Doc
 * @doc vModel/vModel component's vModel
 * @doc/fr vModel/vModel vModel du composant
 *
 * @doc slot/default content of the toggle to replace the default label.
 * @doc/fr slot/default contenu pour remplacer le label par défaut.
 */
</script>
