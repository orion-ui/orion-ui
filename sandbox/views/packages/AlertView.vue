<template>
	<o-page title="Alert">
		<o-button
			id="button-to-highlight"
			@click="visible=!visible">
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
import { highlightDomElement } from 'utils/tools';
import { onMounted } from 'vue';
import { ref } from 'vue';

const visible = ref(false);

onMounted(() => {
	setTimeout(() => {
		highlightDomElement('button-to-highlight', {
			padding: 5,
			delay: 600,
		});
	}, 2000);
});
</script>

<style scoped lang="less">
.orion-alert {
	margin-top: 20px;
}
</style>
