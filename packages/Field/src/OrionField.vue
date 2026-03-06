<template>
	<div
		:ref="setup._el"
		:class="[props.class, setup.fieldClass]"
		:style="`--o-field-suffix-picto-space: ${setup.suffixPictosWidth}`">
		<label
			v-if="setup.displayLabel"
			:for="`orion-${inputType}_${_uid}`"
			:class="setup.labelClass"
			@click.prevent>
			<slot name="label">
				<span v-html="label"/>
			</slot>
		</label>

		<div class="orion-field__input">
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
				v-if="setup.showSuffixPicto"
				:ref="setup._suffixPictos"
				:class="`${setup.baseClass}__pictos`">
				<orion-icon
					v-if="showError || showWarning || showSuccess"
					:icon="setup.validationIcon"
					:class="`${setup.baseClass}__validation-pictos`"/>

				<span
					v-if="clearable && hasValue && !readonly && !disabled"
					:class="`${setup.baseClass}__clearable`"
					@click="emits('clear')"/>

				<slot name="icon-suffix"/>
			</span>

			<orion-icon
				v-if="suffixIcon || suffixFontIcon"
				:icon="suffixIcon"
				:font-icon="suffixFontIcon"
				:class="[
					`${setup.baseClass}__icon`,
					`${setup.baseClass}__icon--suffix`,
				]"/>
		</div>

		<div
			v-if="setup.displayHint"
			class="orion-field__hint">
			<slot name="hint">
				<span v-html="hint"/>
			</slot>
		</div>

		<div
			v-if="setup.displayValidation"
			class="orion-field__validation-messages"
			v-html="validationHtmlMessages"/>
	</div>
</template>

<script setup lang="ts">
import OrionIcon from 'packages/Icon/src/OrionIcon.vue';
import './OrionField.less';
import { OrionFieldSetup, type OrionFieldEmits, type OrionFieldProps } from './OrionFieldSetup';
const slots = defineSlots<{
	default: () => any
	label: () => any
	hint: () => any
	'icon-suffix': () => any
}>();
const emits = defineEmits<OrionFieldEmits>() as OrionFieldEmits;
const props = withDefaults(defineProps<OrionFieldProps>(), OrionFieldSetup.defaultProps);
const setup = new OrionFieldSetup(props, emits, slots);
defineExpose(setup.publicInstance);
</script>

<style lang="less" scoped>
.orion-field {
	&__input > {
		:deep(input),
		:deep(textarea) {
			margin-right: var(--o-field-suffix-picto-space);
		}
	}
}
</style>
