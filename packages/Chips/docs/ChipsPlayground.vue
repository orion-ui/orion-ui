<template>
	<o-chips
		v-bind="{ ...state }"
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
			<color-selection
				v-model="state.color"
				show-greys/>
		</div>
		<div class="col-sm-4">
			<size-selection v-model="state.size"/>
		</div>
	</div>

	<div class="row row--grid row--toggles">
		<div class="col-sm-3">
			<o-toggle
				v-model="state.dual"
				label="dual"/>
		</div>
		<div class="col-sm-3">
			<o-toggle
				v-model="state.round"
				label="Rounded"/>
		</div>
		<div class="col-sm-3">
			<o-toggle
				v-model="state.nude"
				label="Nude"/>
		</div>
		<div class="col-sm-3">
			<o-toggle
				v-model="state.outline"
				label="Outline"/>
		</div>
	</div>
	<div class="row row--grid row--toggles">
		<div class="col-sm-3 ai-c flex">
			<o-toggle
				v-model="state.close"
				label="Close"/>
		</div>
		<div class="col-sm-3">
			<o-select
				v-model="state.prefixIcon"
				label="Prefix icon"
				clearable
				:options="icons"/>
		</div>
		<div class="col-sm-3">
			<o-select
				v-model="state.suffixIcon"
				label="Suffix icon"
				clearable
				:options="icons"/>
		</div>
	</div>
</template>

<script setup lang="ts">
import { computed, reactive } from 'vue';
import { materialIcons, useNotif } from 'lib';

const state = reactive({
	content: 'Duis mollis est',
	color: 'info' as Orion.Color,
	close: true,
	dual: false,
	round: false,
	nude: false,
	outline: false,
	prefixIcon: undefined as Undef<Orion.Icon>,
	suffixIcon: undefined as Undef<Orion.Icon>,

	size: 'md' as Orion.Size,
});

const icons = computed(() => {
	return materialIcons.slice(300, 350);
});

function closeCb () {
	useNotif.info(`Chips component closed`);
}
</script>

@hl {3,53-60}

### Playground
