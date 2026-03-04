<template>
	<div class="row row--gutter">
		<o-button @click="openSimplePromptAsync()">
			Simple prompt
		</o-button>

		<o-button @click="openTextareaPromptAsync()">
			Textarea prompt
		</o-button>

		<o-button @click="openPromptActionsAsync()">
			Prompt with custom actions
		</o-button>
	</div>
</template>

<script setup lang="ts">
import { useNotif, usePrompt } from 'lib';

async function openSimplePromptAsync () {
	const res = await usePrompt<string>();
	// Note that you can specify the return type if you use TS

	if (res.confirm) {
		useNotif.success({
			title: `Prompt value`,
			message: res.value,
		});
	}
	else {
		useNotif.warning(`Prompt canceled`);
	}
}

async function openTextareaPromptAsync () {
	const res = await usePrompt({
		title: `Lorem Ipsum`,
		prompt: {
			type: 'textarea',
			fieldProps: {
				required: true,
				label: `Your message`,
				maxlength: 100,
			},
		},
	});

	if (res.confirm) {
		useNotif.success('Prompt confirmed !');
	}
}

async function openPromptActionsAsync () {
	const res = await usePrompt({
		title: `Custom actions`,
		hideClose: false,
		size: 'sm',
		prompt: {
			type: 'input',
			fieldProps: {
				required: true,
				label: `Your message`,
				maxlength: 50,
			},
		},
		actions: [
			{
				color: 'warning',
				outline: true,
				label: 'cancel',
				callback: (Modal, prompt) => prompt?.cancel(),
			},
			{
				color: 'success',
				label: 'I confirm !',
				callback: (Modal, prompt) => {
					useNotif.success('Custom callback');
					prompt?.confirm();
				},
			},
		],
	});

	if (res.confirm) {
		useNotif.success('Prompt confirmed !');
	}
}
</script>
@hl {24}

@hmr services/Prompt.md

@lang:en
## Demo
@lang

@lang:fr
### Démo
@lang
