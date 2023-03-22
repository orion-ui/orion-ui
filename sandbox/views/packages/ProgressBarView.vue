<template>
	<o-page title="ProgressBar">
		<o-card size="xl">
			<o-section
				v-for="(color, index) in colors"
				:key="index"
				size="sm">
				<o-progress-bar
					:color="color"
					:label="`Toto - ${value}%`"
					:value="value"/>
			</o-section>
		</o-card>
	</o-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { colors } from 'lib';

const value = ref(35);
</script>
