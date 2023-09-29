<template>
	<o-page title="Button">
		<o-section align="left">
			<o-radio
				v-model="state.style"
				input-value="plain"
				label="plain"/>
			<o-radio
				v-model="state.style"
				input-value="outline"
				label="outline"/>
			<o-radio
				v-model="state.style"
				input-value="nude"
				label="nude"/>

			<o-checkbox
				v-model="state.prefixIcon"
				label="prefixIcon"/>
			<o-checkbox
				v-model="state.suffixIcon"
				label="suffixIcon"/>
			<o-checkbox
				v-model="state.loading"
				label="loading"/>
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
					<o-button
						v-for="(color, index) in colors"
						:key="index"
						:color="color"
						:size="state.size"
						:loading="state.loading"
						:outline="state.style === 'outline'"
						:nude="state.style === 'nude'"
						:prefix-icon="state.prefixIcon ? 'alarm' : undefined"
						:suffix-icon="state.suffixIcon ? 'bulb' : undefined">
						{{ color }}
					</o-button>

					<o-button prefix-icon="add_plus"/>
				</div>
			</o-card>
		</o-section>
	</o-page>
</template>

<script setup lang="ts">
import { colors, sizes } from 'lib';
import { reactive } from 'vue';

const state = reactive({
	style: 'plain' as 'plain' | 'outline' | 'nude',
	size: 'md' as Orion.Size,
	prefixIcon: true,
	suffixIcon: false,
	loading: false,
});
</script>
