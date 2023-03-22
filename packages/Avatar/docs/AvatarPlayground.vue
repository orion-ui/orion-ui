<template>
	<div class="row row--center">
		<o-avatar
			v-bind="state"
			:avatar="avatar"
			:update-function="update"/>
	</div>

	<hr>

	<div class="row row--gutter row--middle">
		<div class="col-sm-4">
			<o-input
				v-model="state.name"
				label="Name"
				clearable/>
		</div>
		<div class="col-sm-4">
			<o-input
				v-model="state.tooltip"
				label="Tooltip text"
				clearable/>
		</div>
		<div class="col-sm-4">
			<size-selection v-model="state.size"/>
		</div>
		<div class="col-sm-4">
			<color-selection v-model="state.color"/>
		</div>
		<div class="col-sm-4">
			<o-toggle
				v-model="state.square"
				label="Square"/>
		</div>
	</div>
</template>

<script setup lang="ts">
import { reactive, computed } from 'vue';
import { useNotif } from 'lib';

const avatar = computed(() => {
	return state.color === 'image' ? 'https://picsum.photos/id/1011/200' : undefined;
});

const state = reactive({
	size: 'md'as Orion.Size,
	color: 'info' as Orion.Color & 'image',
	square: false,
	tooltip: 'Update your avatar',
	name: 'Toto',
});

function update () {
	useNotif.info('Create your update function');
}
</script>

@hl {4,47-53}

### Playground
