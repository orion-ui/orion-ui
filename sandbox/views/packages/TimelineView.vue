<template>
	<o-page title="Timeline">
		<pre>value: {{ activePane }} --- current: {{ timeline?.getCurrent() }}</pre>
		<o-select
			v-model="pillIcon"
			:options="pillIconOptions"/>
		<o-card size="xl">
			<o-timeline
				ref="timeline"
				v-model="activePane"
				scrollable
				horizontal
				centered-pill>
				<o-timeline-pane
					name="pane1"
					label="huhuhuuuuu"
					pill="1"
					:icon="pillIcon"
					:marker="5">
					<h3>pane1</h3>
					<!-- <template #before>
					<div><b>22/08/2020</b></div>
					<div>08h38</div>
				</template> -->
					<template #after>
						Commande de 2 intérimaires déposée
					</template>
				</o-timeline-pane>
				<o-timeline-pane
					name="pane2"
					label="Oh yEah pane 2"
					pill="2"
					marker>
					<h3>pane2</h3>
					<!-- <template #before>
					<div><b>22/08/2020</b></div>
					<div>09h43</div>
					<div>Minim elit enim enim minim nostrud ad occaecat pariatur ad.</div>
				</template> -->
					<template #after>
						Des intérimaires répondant à vos critères de recherche ont été trouvés.
					</template>
				</o-timeline-pane>
				<o-timeline-pane
					name="pane3"
					pill="3"
					lazy>
					<nested-comp/>
				</o-timeline-pane>
				<o-timeline-pane
					name="pane4"
					lazy-once
					icon="check_circle">
					<nested-comp/>
				</o-timeline-pane>
				<o-timeline-pane
					name="pane5"
					pill="5">
					<h3>pane5</h3>
					<template #after>
						Commande de 2 intérimaires déposée
					</template>
				</o-timeline-pane>
			</o-timeline>

			<o-button
				@click="timeline?.setCurrent('pane4')">
				setCurrent to 4
			</o-button>
		</o-card>

		<hr>

		<!-- <o-card size="xl">
			<o-button @click="tutu.push(tutu.length + 1)">
				add an entry
			</o-button>
			<pre>{{ tutu }}</pre>
			<o-timeline>
				<o-timeline-pane
					v-for="step in tutu"
					:key="step"
					:name="`pane${step}`"
					:pill="step.toString()"
					:complete="step < 3">
					{{ step + 'tutuuuu' }}
					<template #before>
						<div><b>22/08/2020</b></div>
						<div>08h38</div>
					</template>
					<template #after>
						Commande de 2 intérimaires déposée
					</template>
				</o-timeline-pane>
			</o-timeline>
		</o-card> -->
	</o-page>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import NestedComp from 'sandbox/NestedComp.vue';

const timeline = ref<OrionTimeline>();

const activePane = ref('pane3');
const tutu = reactive([1, 2, 3, 4]);
const pillIcon = ref<Orion.Icon>('alarm');
const pillIconOptions: Orion.Icon[] = ['palette', 'link', 'shield', 'view_column', 'table_rows', 'add_to_queue'];
</script>
