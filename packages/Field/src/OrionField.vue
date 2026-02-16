<template>
	<div
		:ref="setup._el"
		:class="[setup.baseClass, setup.additionalClass]">
		<label
			v-if="(label || placeholder) && floatingLabel"
			:for="`orion-${inputType}_${_uid}`"
			:class="setup.labelClass"
			@click.prevent
			v-html="setup.labelValue"/>

		<orion-icon
			v-if="prefixIcon || prefixFontIcon"
			:icon="prefixIcon"
			:font-icon="prefixFontIcon"
			:class="[
				`${setup.baseClass}__icon`,
				`${setup.baseClass}__icon--prefix`,
			]"/>

		<slot/>

		<span
			v-if="!['checkbox', 'radio', 'toggle'].includes(inputType) && setup._suffixPictos.value?.children.length"
			:ref="setup._suffixPictos"
			:class="`${setup.baseClass}__pictos`">
			<orion-icon
				v-if="(showError
					|| showWarning
					|| showSuccess
				) && !['checkbox', 'radio', 'toggle'].includes(inputType)"
				:icon="setup.validationIcon"
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
import { OrionIcon } from 'packages/Icon';
import './OrionField.less';
import { OrionFieldSetup, type OrionFieldEmits, type OrionFieldProps } from './OrionFieldSetup';
const emits = defineEmits<OrionFieldEmits>() as OrionFieldEmits;
const props = withDefaults(defineProps<OrionFieldProps>(), OrionFieldSetup.defaultProps);
const setup = new OrionFieldSetup(props, emits);
defineExpose(setup.publicInstance);
</script>
