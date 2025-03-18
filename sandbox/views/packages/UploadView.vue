<template>
	<o-page title="Upload">
		<o-upload
			v-model="testValidation.files"
			:file-max-size="20"
			:file-types="['application/pdf', 'image/jpeg']"
			multiple
			required
			:validation="validator.rule('files')"/>

		<o-button @click="validate()">
			Validate
		</o-button>
	</o-page>
</template>

<script setup lang="ts">
import { useValidation } from 'services';
import { reactive } from 'vue';

const testValidation = reactive({ files: [] as File[] });
const validator = useValidation(testValidation, {
	files: val => ({
		level: 'error',
		message: 'Choose a file',
		result: (val?.length ?? 0) > 0,
	}),
});

function validate () {
	validator.validateAndShowState();
}
</script>
