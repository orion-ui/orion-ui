<template>
	<o-icon-section
		class="mb-sm"
		v-bind="state">
		{{ state.content }}
	</o-icon-section>

	<div class="flex fd-c g-xs">
		<div class="row row--middle row--gutter">
			<div class="col-sm-4">
				<o-input
					v-model="state.title"
					label="Title"/>
			</div>
			<div class="col-sm-4">
				<o-input
					v-model="state.content"
					label="Content"
					clearable/>
			</div>
			<div class="col-sm-4">
				<o-select
					v-model="state.icon"
					label="icon"
					:options="icons"/>
			</div>
		</div>

		<o-toggle
			v-model="state.center"
			label="Center"/>
	</div>
</template>

<script setup lang="ts">
import { reactive, computed } from 'vue';
import { materialIcons } from 'lib';

const state = reactive({
	icon: 'image' as Orion.Icon,
	content: 'Lorem ipsum',
	title: 'Title',
	center: false,
});

const icons = computed(() => {
	return materialIcons.slice(0, 50);
});
</script>

### Playground
