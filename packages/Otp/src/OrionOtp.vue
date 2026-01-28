<template>
	<div
		:ref="setup._el"
		class="orion-otp">
		<orion-input
			v-for="index in size"
			:ref="setup._inputs"
			:key="index"
			v-model="setup.code[index]"
			select-on-focus
			:pattern="dataType !== 'text' ? '[0-9]*' : undefined"
			type="text"
			:onkeypress="dataType !== 'text' ? 'return /[0-9]/i.test(event.key)' : undefined"
			:readonly="readonly"
			autocomplete="one-time-code"
			class="orion-otp__input"
			@input="setup.handleInput($event, index)"
			@keydown.delete="setup.handleDelete(index)"/>
	</div>
</template>

<script setup lang="ts">
import OrionInput from 'packages/Input/src/OrionInput.vue';
import './OrionOtp.less';
import { OrionOtpSetup, type OrionOtpEmits, type OrionOtpProps } from './OrionOtpSetup';
const emits = defineEmits<OrionOtpEmits>() as OrionOtpEmits;
const props = withDefaults(defineProps<OrionOtpProps>(), OrionOtpSetup.defaultProps);
const setup = new OrionOtpSetup(props, emits);
defineExpose(setup.publicInstance);

</script>
