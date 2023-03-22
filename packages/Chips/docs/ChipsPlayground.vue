<template>
	<o-chips
		v-bind="state"
		@close="closeCb()">
		{{ state.content }}
		<template
			v-if="state.dual"
			#dual>
			dual slot
		</template>
	</o-chips>

	<hr>

	<div class="row row--gutter">
		<div class="col-sm-4">
			<o-input
				v-model="state.content"
				label="Content"
				clearable/>
		</div>
		<div class="col-sm-4">
			<color-selection v-model="state.color"/>
		</div>
		<div class="col-sm-4">
			<size-selection v-model="state.size"/>
		</div>
	</div>

	<div class="row row--grid row--toggles">
		<div class="col-sm-4">
			<o-toggle
				v-model="state.close"
				label="Close"/>
		</div>
		<div class="col-sm-4">
			<o-toggle
				v-model="state.dual"
				label="dual"/>
		</div>
		<div class="col-sm-4">
			<o-toggle
				v-model="state.outline"
				label="Outline"/>
		</div>
	</div>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import { useNotif } from 'lib';

const state = reactive({
	content: 'Duis mollis est',
	color: 'info' as Orion.Color,
	close: true,
	dual: false,
	outline: false,
	size: 'md' as Orion.Size,
});

function closeCb () {
	useNotif.info(`Chips component closed`);
}
</script>

@hl {3,53-60}

### Playground
