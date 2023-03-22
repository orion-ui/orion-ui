<template>
	<o-page title="Alert">
		<o-button @click="visible=!visible">
			show footer
		</o-button>
		<o-alert
			v-for="(color, index) in colors"
			:key="index"
			:color="color"
			:title="faker.lorem.words(4)"
			close>
			{{ faker.lorem.sentence() }}
		</o-alert>
		<o-footer-fixed :visible="visible">
			rignreiongfezneizo
		</o-footer-fixed>
	</o-page>
</template>

<script setup lang="ts">
import { faker } from '@faker-js/faker';
import { colors } from 'lib';
import { ref } from 'vue';

const visible = ref(false);
</script>

<style scoped lang="less">
.orion-alert {
	margin-top: 20px;
}
</style>
