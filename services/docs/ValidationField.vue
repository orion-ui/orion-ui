<template>
	<div>
		<!-- Field validation with rules -->
		<o-input
			v-model="mail"
			label="Test mail required"
			validation="required|email"/>

		<!-- Field validation with custom fuction -->
		<o-input
			v-model="input"
			label="Check field length > 5"
			:validation="validateField"/>
	</div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const input = ref('');
const mail = ref('');
const validateField = () => input.value?.length > 5;

</script>

@hmr services/Validation.md

@hl {7,13,20-22}

@lang:en
### Example
@lang

@lang:fr
### Exemple
@lang
