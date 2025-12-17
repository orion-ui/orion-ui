<template>
	<div class="row row--center">
		<o-avatar-group
			v-bind="state">
			<o-avatar
				name="John Doe"
				color="primary"/>
			<o-avatar
				name="Mike Don"
				avatar="https://picsum.photos/id/1011/200"/>
			<o-avatar
				name="Lola Green"/>
			<o-avatar
				name="John Doe"
				color="primary"/>
			<o-avatar
				name="Mike Don"
				avatar="https://picsum.photos/id/1011/200"/>
			<o-avatar
				name="Lola Green"/>
		</o-avatar-group>
	</div>

	<hr>

	<div class="row row--gutter row--middle">
		<div class="col-sm-4">
			<o-input
				v-model="state.max"
				label="Max avatars"
				type="number"
				clearable/>
		</div>
		<div class="col-sm-4">
			<o-input
				v-model="state.spacing"
				label="Spacing"
				type="number"
				clearable/>
		</div>
		<div class="col-sm-4">
			<color-selection v-model="state.color"/>
		</div>
	</div>
</template>

<script setup lang="ts">
import { reactive } from 'vue';

const state = reactive({
	max: 4,
	spacing: 16,
	color: 'inverted' as Orion.Color,
});

</script>

@hl {4,47-53}

### Playground
