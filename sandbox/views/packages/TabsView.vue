<template>
	<o-page title="Tabs">
		<o-select
			v-model="pillIcon"
			:options="pillIconOptions"/>
		<o-tabs v-model="activeTab">
			<o-tab-pane
				name="toto"
				label="Toto"
				:icon="pillIcon"
				marker>
				contenu de toto
			</o-tab-pane>
			<o-tab-pane
				name="tutu"
				label="Tutu"
				lazy>
				<nested-comp/>
			</o-tab-pane>
			<o-tab-pane
				name="tata"
				label="Tata"
				disabled>
				contenu de tata
			</o-tab-pane>
		</o-tabs>

		<hr>

		<o-card size="xl">
			<o-button @click="tutu.push(tutu.length + 1)">
				add an entry
			</o-button>
			<pre>{{ tutu }}</pre>
			<o-tabs v-model="activeTatab">
				<o-tab-pane
					v-for="step in tutu"
					:key="step"
					:name="`pane${step}`"
					:label="`pane${step}`">
					{{ step + 'tutuuuu' }}
				</o-tab-pane>
			</o-tabs>
		</o-card>
	</o-page>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import NestedComp from 'sandbox/NestedComp.vue';

const activeTab = ref('toto');
const activeTatab = ref('pane1');
const tutu = reactive([1, 2, 3, 4]);
const pillIcon = ref<Orion.Icon>('adobe_xd');
const pillIconOptions: Orion.Icon[] = [
	'Figma', 'LinkedIn', 'Sketch', 'add_column', 'add_row', 'add_to_queue',
];
</script>
