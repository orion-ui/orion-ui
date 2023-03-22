<template>
	<o-page title="Chips">
		<o-section align="left">
			<o-toggle
				v-model="state.dual"
				label="dual"/>

			<o-toggle
				v-model="state.outline"
				label="outline"/>

			<o-toggle
				v-model="state.close"
				label="close"/>
		</o-section>

		<o-section align="left">
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
					<o-chips
						v-for="(color, index) in colorsExtended"
						:key="index"
						:color="color"
						v-bind="state">
						{{ color }}
						<template
							v-if="state.dual"
							#dual>
							{{ index }}
						</template>
					</o-chips>
				</div>
			</o-card>
		</o-section>
	</o-page>
</template>

<script setup lang="ts">
import { colorsExtended, sizes } from 'lib';
import { reactive } from 'vue';
const state = reactive({
	dual: true,
	outline: false,
	close: false,
	size: 'md' as Orion.Size,
});
</script>
