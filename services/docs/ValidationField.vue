<template>
	<div class="row row--grid">
		<div class="col-sm-6">
			<!-- Field validation with rules -->
			<o-input
				v-model="mail"
				label="Test mail required"
				validation="required|email"/>
		</div>

		<div class="col-sm-6">
			<!-- Field validation with custom fuction -->
			<o-input
				v-model="input"
				label="Check field length > 5"
				:validation="validateField"/>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const input = ref<string>();
const mail = ref<string>();
const validateField = () => (input.value?.length ?? 0) > 5;
</script>

@hmr services/Validation.md

@hl {8,16,26}

@lang:en
### Simple input validation
@lang

@lang:fr
### Validation simple de champ
@lang
