<template>
	<div
		:ref="setup._el"
		:class="[setup.baseClass, setup.additionalClass]">
		<label
			v-if="label || placeholder"
			:class="setup.labelClass"
			v-html="setup.labelValue"/>

		<slot/>

		<orion-icon
			v-if="prefixIcon || prefixFontIcon"
			:icon="prefixIcon"
			:font-icon="prefixFontIcon"
			:class="[
				`${setup.baseClass}__icon`,
				`${setup.baseClass}__icon--prefix`,
			]"/>

		<span
			:ref="setup._suffixPictos"
			:class="`${setup.baseClass}__pictos`">
			<orion-icon
				v-if="(showError
					|| showWarning
					|| showSuccess
				) && !['checkbox', 'radio', 'toggle'].includes(inputType)"
				:class="setup.validationClass"/>

			<span
				v-if="clearable && hasValue && !readonly && !disabled"
				:class="`${setup.baseClass}__clearable`"
				@click="emits('clear')"/>

			<orion-icon
				v-if="suffixIcon || suffixFontIcon"
				:icon="suffixIcon"
				:font-icon="suffixFontIcon"
				:class="[
					`${setup.baseClass}__icon`,
					`${setup.baseClass}__icon--suffix`,
				]"/>

			<slot name="icon-suffix"/>
		</span>
	</div>
</template>

<script setup lang="ts">
import './OrionField.less';
import { OrionIcon } from 'packages/Icon';
import OrionFieldSetupService from './OrionFieldSetupService';
import type { OrionFieldProps, OrionFieldEmits } from './OrionFieldSetupService';
const emits = defineEmits<OrionFieldEmits>() as OrionFieldEmits;
const props = withDefaults(defineProps<OrionFieldProps>(), OrionFieldSetupService.defaultProps);
const setup = new OrionFieldSetupService(props, emits);
defineExpose(setup.publicInstance);
</script>
