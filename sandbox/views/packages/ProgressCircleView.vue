<template>
	<o-page title="ProgressCircle">
		<o-card size="xl">
			<div class="row row--grid">
				<div
					v-for="(color, index) in colors"
					:key="index"
					class="col-sm-3">
					<o-progress-circle
						:label="`${value}%`"
						:value="value"
						:color="color"
						:size="150"
						:path-width="5"
						:value-width="8"/>
				</div>
			</div>
		</o-card>
	</o-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { colors } from 'lib';

const value = ref(35);
</script>
