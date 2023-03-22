<template>
	<o-page title="Prompt Service">
		<o-alert>
			<pre>fieldType : {{ fieldType }}</pre>
		</o-alert>

		<o-button @click="showConfirm()">
			show confirm
		</o-button>

		<div class="row row--grid">
			<div class="col-sm-6">
				<o-card title="field type">
					<o-radio
						v-for="(type, index) in fieldTypeOptions"
						:key="index"
						v-model="fieldType"
						:label="type"
						:input-value="type"/>
				</o-card>
			</div>
			<div class="col-sm-6">
				<o-card title="execution">
					<o-button
						color="info"
						@click="triggerPrompt()">
						trigger prompt
					</o-button>
				</o-card>
			</div>
		</div>
	</o-page>
</template>

<script setup lang="ts">
import { useConfirm, usePrompt } from 'lib';
import { ref } from 'vue';

const fieldTypeOptions: Orion.Modal.PromptType[] = [
	'datepicker',
	'input',
	'password',
	'phone',
	'select',
	'textarea',
	'upload',
];

const fieldType = ref<Orion.Modal.PromptType>('input');

function showConfirm () {
	useConfirm('confirmez-vous ?');
}

async function triggerPrompt () {
	const { confirm, value } = await usePrompt({
		title: `qfdlkzdfjh`,
		prompt: {
			type: fieldType.value,
			fieldProps: { options: fieldTypeOptions },
		},
	});
	// eslint-disable-next-line no-console
	console.log(`🚀 ~ triggerPrompt`, {
		confirm,
		value,
	});
}
</script>
