<template>
	<o-page title="ProgressBar">
		<o-card size="xl">
			<o-section
				v-for="(color, index) in colors"
				:key="index"
				size="sm">
				<o-progress-bar
					:color="color"
					:value="value"/>
			</o-section>
			<o-progress-bar
				:color="color"
				:value="value">
				TUTU
			</o-progress-bar>
		</o-card>
	</o-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { colors } from 'lib';

const value = ref(35);
</script>
