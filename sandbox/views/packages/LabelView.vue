<template>
	<o-page title="Label">
		<o-section align="left">
			<o-radio
				v-model="state.style"
				input-value="plain"
				label="plain"/>
			<o-radio
				v-model="state.style"
				input-value="outline"
				label="outline"/>
		</o-section>

		<o-section
			size="xs"
			align="left">
			<o-radio
				v-for="(size, index) in sizes"
				:key="index"
				v-model="state.size"
				:input-value="size"
				:label="size"/>
		</o-section>

		<o-section>
			<o-card>
				<div class="flex-inline">
					<o-label
						v-for="(color, index) in colorsExtended"
						:key="index"
						:color="color"
						:outline="state.style === 'outline'"
						v-bind="state">
						{{ color }}
					</o-label>
				</div>
			</o-card>
		</o-section>
	</o-page>
</template>

<script setup lang="ts">
import { colorsExtended, sizes } from 'lib';
import { reactive } from 'vue';
const state = reactive({
	style: 'plain' as 'plain' | 'outline',
	size: 'md' as Orion.Size,
});
</script>
