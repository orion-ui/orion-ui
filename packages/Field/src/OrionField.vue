<template>
	<div
		:ref="setup._el"
		:class="[setup.baseClass, setup.additionalClass]">
		<label
			v-if="setup.props.label"
			:class="setup.labelClass"
			v-html="setup.props.label"/>

		<slot/>

		<orion-icon
			v-if="setup.props.prefixIcon || setup.props.prefixFontIcon"
			:icon="setup.props.prefixIcon"
			:font-icon="setup.props.prefixFontIcon"
			:class="[
				`${setup.baseClass}__icon`,
				`${setup.baseClass}__icon--prefix`,
			]"/>

		<span
			:ref="setup._suffixPictos"
			:class="`${setup.baseClass}__pictos`">
			<orion-icon
				v-if="(setup.props.showError
					|| setup.props.showWarning
					|| setup.props.showSuccess
				) && !['checkbox', 'radio', 'toggle'].includes(setup.props.inputType)"
				:class="setup.validationClass"/>

			<span
				v-if="setup.props.clearable && setup.props.hasValue && !setup.props.readonly && !setup.props.disabled"
				:class="`${setup.baseClass}__clearable`"
				@click="$emit('clear')"/>

			<orion-icon
				v-if="setup.props.suffixIcon || setup.props.suffixFontIcon"
				:icon="setup.props.suffixIcon"
				:font-icon="setup.props.suffixFontIcon"
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
defineEmits<{(e: 'clear'): void}>();
const props = defineProps(OrionFieldSetupService.props);
const setup = new OrionFieldSetupService(props);
defineExpose(setup.publicInstance);
</script>
