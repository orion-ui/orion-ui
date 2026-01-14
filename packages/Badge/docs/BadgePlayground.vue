<template>
	<o-badge
		:type="badgeType"
		:color="state.color">
		{{ badgeLabel }}
	</o-badge>

	<hr>

	<div class="row row--gutter">
		<div class="col-sm-4">
			<o-input
				v-model="state.label"
				label="Label"
				clearable/>
		</div>
		<div class="col-sm-4">
			<color-selection v-model="state.color"/>
		</div>
	</div>

	<div class="row row--grid row--toggles">
		<div class="col-sm-3">
			<o-toggle
				v-model="state.dot"
				label="Dot"/>
		</div>
		<div class="col-sm-3">
			<o-toggle
				v-model="state.rounded"
				label="Rounded"/>
		</div>
	</div>
</template>

<script setup lang="ts">
import { computed, reactive, watch } from 'vue';

const state = reactive({
	label: '99+',
	color: 'primary' as Orion.Color,
	showLabel: true,
	dot: false,
	rounded: false,
});

watch(() => state.dot, (value) => {
	if (value) state.rounded = false;
});

watch(() => state.rounded, (value) => {
	if (value) state.dot = false;
});

const badgeType = computed(() => {
	if (state.dot) return 'dot';
	if (state.rounded) return 'rounded';
	return 'square';
});

const badgeLabel = computed(() => {
	return state.showLabel ? state.label : '';
});
</script>

@hl {3-4,25-33}

### Playground
