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
import './OrionOtp.less';
import OrionInput from 'packages/Input/src/OrionInput.vue';
import OrionOtpSetupService from './OrionOtpSetupService';
type Emits = {(e: 'filled', val: string): void}
const emits = defineEmits<Emits>();
const props = defineProps(OrionOtpSetupService.props);
const setup = new OrionOtpSetupService(props, emits);
defineExpose(setup.publicInstance);

/** Doc
 * @doc event/filled/desc emitted when the code is completed
 * @doc/fr event/filled/desc émis lorsque le code est complété
 */
</script>
