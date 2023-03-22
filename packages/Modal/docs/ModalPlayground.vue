<template>
	<o-button @click="openModal()">
		Show modal
	</o-button>

	<hr>

	<div class="row row--gutter row--middle">
		<div class="col-sm-4">
			<size-selection
				v-model="state.size"
				:options="options"/>
		</div>
		<div class="col-sm-4">
			<o-input
				v-model="state.title"
				label="Title"/>
		</div>
		<div class="col-sm-4">
			<o-input
				v-model="state.message"
				label="Message"/>
		</div>
	</div>

	<div class="row row--gutter row--toggles">
		<div class="col-sm-4">
			<o-toggle
				v-model="state.hideClose"
				label="Hide close"/>
		</div>
		<div class="col-sm-4">
			<o-toggle
				v-model="state.overlay"
				label="Overlay"/>
		</div>
		<div class="col-sm-4">
			<o-toggle
				v-model="state.hideOnOverlayClick"
				label="Hide on overlay click"/>
		</div>
	</div>
</template>

<script setup lang="ts">
import { useModal, useNotif } from 'lib';
import { reactive } from 'vue';

const state = reactive({
	size: 'md',
	hideClose: false,
	hideOnOverlayClick: true,
	message: 'Lorem ipsum',
	overlay: true,
	title: 'Title',
	prompt: {
		type: 'textarea',
		fieldProps: {
			required: true,
			label: `Your custom message:`,
			maxLength: 1000,
		},
	} as Partial<Orion.Modal.Prompt>,
	actions: [{
		label: 'Accept',
		color: 'success',
		callback: () => useNotif.success('Accept from modal'),
	}] as Partial<Orion.Modal.ActionsParams>[],
});

const options = ['lg', 'md', 'sm', 'xs'];

function openModal () {
	useModal({ ...state });
}

</script>

### Playground
