<template>
	<o-page :title="`Icon - ${materialIcons.length}`">
		<o-section>
			<o-toggle
				v-model="state.loading"
				label="Loading"/>
			<o-icon
				style="font-size: 1.5rem;"
				icon="camera"
				:loading="state.loading"/>
		</o-section>

		<div
			class="my-xl flex ai-c"
			style="background-color: antiquewhite;">
			<o-icon
				style="font-size: 1.5rem;"
				icon="camera"/>
			<o-icon
				style="font-size: 1.5rem;"
				icon="camera"
				button="primary"/>
		</div>

		<o-section>
			<div class="demo-icon-wrapper">
				<div
					v-for="icon in materialIcons"
					:key="`${icon}-${getUid()}`"
					class="demo-icon">
					<o-icon :icon="icon"/>
					{{ icon }}
				</div>
			</div>
		</o-section>
	</o-page>
</template>

<script setup lang="ts">
import { materialIcons } from 'assets/fonts/materialIcons';
import { getUid } from 'lib';
import { reactive } from 'vue';
const state = reactive({ loading: false });
</script>

<style lang="less" scoped>
.demo-icon-wrapper {
	display: flex;
	flex-wrap: wrap;
	gap: 1.875rem;
	align-items: flex-start;
}

.demo-icon {
	display: flex;
	flex: 11.25rem 0 0;
	flex-direction: column;
	gap: 1rem;
	align-items: center;
	padding: 1.25rem;
	background: var(--o-background-neutral-default);

	.orion-icon {
		display: block;
		font-size: 1.5rem;
	}
}
</style>
