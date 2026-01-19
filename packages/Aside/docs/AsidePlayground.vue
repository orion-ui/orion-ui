<template>
	<o-button @click="openAside()">
		Show aside
	</o-button>

	<hr>

	<div class="row row--gutter row--middle">
		<div class="col-sm-4">
			<size-selection
				v-model="state.size"
				:options="options"/>
		</div>
		<div class="col-sm-8">
			<o-input
				v-model="state.title"
				label="Nested title"/>
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
import { useAside } from 'lib';
import { reactive } from 'vue';
import NestedComp from './NestedComp.vue';

const state = reactive({
	size: 'md',
	hideClose: false,
	hideOnOverlayClick: true,
	title: 'Lorem ipsum',
	description: 'This is a description for the aside.',
	overlay: true,
});

const options = ['lg', 'md', 'sm', 'xs'];

function openAside () {
	useAside({
		Nested: NestedComp,
		NestedProps: { title: state.title },
		...state,
	});
}

</script>

### Playground
