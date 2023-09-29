<template>
	<o-swipe :direction="state.direction">
		<template #actions>
			<o-button
				v-tooltip="`Add an action`"
				color="success"
				prefix-icon="add_plus"
				@click="state.display = true"/>
			<o-button
				color="info"
				prefix-icon="redo"/>
			<o-button
				v-if="state.display"
				v-tooltip="`Remove an action`"
				color="danger"
				prefix-icon="remove_minus"
				@click="removeButton()"/>
		</template>

		<o-card title="Card">
			Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras gravida orci a nulla auctor,
			in tempus erat elementum. Nullam ac tincidunt dolor. Sed sapien massa, commodo sed feugiat ac,
			auctor sed lectus.
		</o-card>
	</o-swipe>

	<hr>

	<div class="row row--gutter row--middle">
		Direction :
		<o-radio
			v-model="state.direction"
			input-value="left"
			label="Left"/>
		<o-radio
			v-model="state.direction"
			input-value="right"
			label="Right"/>
	</div>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
type SwipeDirection = 'left' | 'right';

const state = reactive({
	direction: 'left' as SwipeDirection,
	display: false,
});

function removeButton () {
	state.display = false;
}
</script>

@hl {2,44-47}

### Playground

