<template>
	<o-page :title="`Icon - ${coolicons.length}`">
		<o-section>
			<o-toggle
				v-model="state.loading"
				label="Loading"/>
			<o-icon
				style="font-size: 24px;"
				icon="camera"
				:loading="state.loading"/>
		</o-section>

		<div
			class="my-xl flex ai-c"
			style="background-color:antiquewhite;">
			<o-icon
				style="font-size:1.5rem"
				icon="camera"/>
			<o-icon
				style="font-size:1.5rem"
				icon="camera"
				button="brand"/>
		</div>

		<o-section>
			<div class="demo-icon-wrapper">
				<div
					v-for="icon in coolicons"
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
import { reactive } from 'vue';
import { getUid } from 'lib';
import { coolicons } from 'assets/fonts/coolicons';
const state = reactive({ loading: false });
</script>

<style lang="less" scoped>
.demo-icon-wrapper {
	display: flex;
	align-items: flex-start;
	flex-wrap: wrap;
	gap: 30px;
}

.demo-icon {
	flex: 180px 0 0;
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 15px;
	background: white;
	padding: 20px;

	.orion-icon {
		display: block;
		font-size: 24px;
	}
}

[data-orion-theme='dark']
.demo-icon {
	background: var(--background-neutral-moderate);
}
</style>
