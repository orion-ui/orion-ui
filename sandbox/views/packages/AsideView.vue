<template>
	<o-page title="Aside">
		<pre>displayAside {{ displayPopable }}</pre>

		<o-textarea
			v-model="textareaVal"
			autofocus
			label="autofocus"/>

		<o-section align="left">
			<o-button @click="displayPopable = true">
				open aside
			</o-button>
			<o-button @click="_aside?.close()">
				close aside
			</o-button>
			<o-button @click="openPopableProg()">
				open aside prog
			</o-button>
		</o-section>

		<o-section title="Modal size">
			<o-radio
				v-model="asideSize"
				input-value="xs"
				label="xs"/>
			<o-radio
				v-model="asideSize"
				input-value="sm"
				label="sm"/>
			<o-radio
				v-model="asideSize"
				input-value="md"
				label="md"/>
			<o-radio
				v-model="asideSize"
				input-value="lg"
				label="lg"/>
			<o-radio
				v-model="asideSize"
				input-value="xl"
				label="xl"/>
			<o-radio
				v-model="asideSize"
				input-value="fullscreen"
				label="fullscreen"/>
		</o-section>

		<sections-generator :qty="3"/>


		<o-aside
			ref="_aside"
			:display="displayPopable"
			:options="{ overlay: false }"
			@leave-start="displayPopable = false">
			<sections-generator :qty="2"/>
		</o-aside>
	</o-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useAside } from 'lib';
import NestedCompVue from 'sandbox/NestedComp.vue';
import SectionsGenerator from 'sandbox/SectionsGenerator.vue';
const displayPopable = ref(false);
const asideSize = ref('lg');
const _aside = ref<OrionAside>();
const textareaVal = ref<string>();

function openPopableProg () {
	useAside({
		Nested: NestedCompVue,
		size: asideSize.value,
		events: {
			close: (Aside) => {
				// eslint-disable-next-line no-console
				console.log('close event for Aside', Aside.uid);
			},
		},
	});
}
</script>
