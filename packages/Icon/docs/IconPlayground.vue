<template>
	<div class="icon-playground flex jc-c mt-sm mb-lg">
		<o-icon v-bind="state"/>
	</div>

	<div class="row row--middle row--gutter">
		<div class="col-sm-4">
			<o-select
				v-model="state.icon"
				label="icon"
				:options="icons">
				<template #value="{ item }">
					<div class="icon-select-option flex ai-c g-xs">
						<i :class="`orion-icon icon ci-${item}`"/>
						{{ item }}
					</div>
				</template>

				<template #before-options>
					<o-alert
						class="mb-xs"
						color="info"
						center>
						Just a preview of<br>
						the 410+ icons
					</o-alert>
				</template>

				<template #option="{ item }">
					<div class="icon-select-option flex ai-c g-xs">
						<i :class="`orion-icon icon ci-${item}`"/>
						{{ item }}
					</div>
				</template>
			</o-select>
		</div>
		<div class="col-sm-4">
			<o-toggle
				v-model="state.loading"
				label="loading"/>
		</div>
	</div>

	<div class="row row--middle row--gutter">
		<div class="col-sm-4">
			<color-selection
				v-model="state.ripple"
				label="Ripple"/>
		</div>
		<div class="col-sm-4">
			<color-selection
				v-model="state.button"
				label="Button"/>
		</div>
	</div>

	<div class="row row--middle row--gutter">
		<div class="col-sm-4">
			<o-select
				v-model="state.markerPosition"
				label="Marker position"
				:options="markerPosition"/>
		</div>
		<div class="col-sm-4">
			<o-select
				v-model="state.marker"
				label="Marker"
				:options="marker"/>
		</div>
		<div class="col-sm-4">
			<color-selection
				v-model="state.markerColor"
				label="Marker"/>
		</div>
	</div>
</template>

<script setup lang="ts">
import { reactive, computed } from 'vue';
import { coolicons } from 'lib';

const state = reactive({
	icon: 'notification' as Orion.Icon,
	markerColor: undefined,
	ripple: undefined,
	button: undefined,
	loading: false,
	markerPosition: 'top right',
	marker: false,
});

const markerPosition = [
	'top left',
	'top',
	'top right',
	'right',
	'bottom right',
	'bottom',
	'bottom left',
	'left',
];

const marker = [
	true,
	1,
	2,
	3,
	4,
];

const icons = computed(() => {
	return coolicons.slice(0, 50);
});
</script>

<style lang="less" scoped>
.icon-playground {
	.orion-icon {
		font-size: 2.5rem;
	}
}

.icon-select-option {
	.orion-icon {
		font-size: 1.25rem;
	}
}
</style>

### Playground
