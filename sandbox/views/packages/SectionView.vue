<template>
	<o-page title="Section">
		<pre>Section</pre>

		<pre>{{ state }}</pre>

		<o-section
			v-model:collapsed="state.fisrtSectionCollapsed"
			title="The section"
			subtitle="The subtitle"
			collapsible>
			Lorem ipsum dolor sit amet consectetur, adipisicing elit.
			Lorem ipsum dolor sit amet consectetur, adipisicing elit.
			Lorem ipsum dolor sit amet consectetur, adipisicing elit.
			Lorem ipsum dolor sit amet consectetur, adipisicing elit.
			Lorem ipsum dolor sit amet consectetur, adipisicing elit.
			Lorem ipsum dolor sit amet consectetur, adipisicing elit.
			Lorem ipsum dolor sit amet consectetur, adipisicing elit.
			Lorem ipsum dolor sit amet consectetur, adipisicing elit.
			Lorem ipsum dolor sit amet consectetur, adipisicing elit.
			Lorem ipsum dolor sit amet consectetur, adipisicing elit.
			Lorem ipsum dolor sit amet consectetur, adipisicing elit.
			Lorem ipsum dolor sit amet consectetur, adipisicing elit.
			Lorem ipsum dolor sit amet consectetur, adipisicing elit.
			Lorem ipsum dolor sit amet consectetur, adipisicing elit.
			Lorem ipsum dolor sit amet consectetur, adipisicing elit.
			Lorem ipsum dolor sit amet consectetur, adipisicing elit.
			Lorem ipsum dolor sit amet consectetur, adipisicing elit.
			Lorem ipsum dolor sit amet consectetur, adipisicing elit.
			Lorem ipsum dolor sit amet consectetur, adipisicing elit.
			Lorem ipsum dolor sit amet consectetur, adipisicing elit.
			Lorem ipsum dolor sit amet consectetur, adipisicing elit.
			Lorem ipsum dolor sit amet consectetur, adipisicing elit.
			Lorem ipsum dolor sit amet consectetur, adipisicing elit.
			Lorem ipsum dolor sit amet consectetur, adipisicing elit.
			Lorem ipsum dolor sit amet consectetur, adipisicing elit.
			Lorem ipsum dolor sit amet consectetur, adipisicing elit.
			Lorem ipsum dolor sit amet consectetur, adipisicing elit.
			Lorem ipsum dolor sit amet consectetur, adipisicing elit.
			Lorem ipsum dolor sit amet consectetur, adipisicing elit.
			Lorem ipsum dolor sit amet consectetur, adipisicing elit.
			Lorem ipsum dolor sit amet consectetur, adipisicing elit.
			Lorem ipsum dolor sit amet consectetur, adipisicing elit.
			Lorem ipsum dolor sit amet consectetur, adipisicing elit.
			Lorem ipsum dolor sit amet consectetur, adipisicing elit.
			Lorem ipsum dolor sit amet consectetur, adipisicing elit.
			Lorem ipsum dolor sit amet consectetur, adipisicing elit.
			Lorem ipsum dolor sit amet consectetur, adipisicing elit.
			Lorem ipsum dolor sit amet consectetur, adipisicing elit.
			Lorem ipsum dolor sit amet consectetur, adipisicing elit.
			Lorem ipsum dolor sit amet consectetur, adipisicing elit.
			Lorem ipsum dolor sit amet consectetur, adipisicing elit.
			Lorem ipsum dolor sit amet consectetur, adipisicing elit.
			Lorem ipsum dolor sit amet consectetur, adipisicing elit.
			Lorem ipsum dolor sit amet consectetur, adipisicing elit.
			Lorem ipsum dolor sit amet consectetur, adipisicing elit.
			Lorem ipsum dolor sit amet consectetur, adipisicing elit.
			Lorem ipsum dolor sit amet consectetur, adipisicing elit.
			Lorem ipsum dolor sit amet consectetur, adipisicing elit.
			Lorem ipsum dolor sit amet consectetur, adipisicing elit.
			Lorem ipsum dolor sit amet consectetur, adipisicing elit.
			Lorem ipsum dolor sit amet consectetur, adipisicing elit.
			Lorem ipsum dolor sit amet consectetur, adipisicing elit.
			Lorem ipsum dolor sit amet consectetur, adipisicing elit.
			Lorem ipsum dolor sit amet consectetur, adipisicing elit.
			Lorem ipsum dolor sit amet consectetur, adipisicing elit.
			Lorem ipsum dolor sit amet consectetur, adipisicing elit.
			Lorem ipsum dolor sit amet consectetur, adipisicing elit.
			Lorem ipsum dolor sit amet consectetur, adipisicing elit.
			Lorem ipsum dolor sit amet consectetur, adipisicing elit.
			Lorem ipsum dolor sit amet consectetur, adipisicing elit.
			Lorem ipsum dolor sit amet consectetur, adipisicing elit.
			Lorem ipsum dolor sit amet consectetur, adipisicing elit.
			Lorem ipsum dolor sit amet consectetur, adipisicing elit.
			Lorem ipsum dolor sit amet consectetur, adipisicing elit.
			Lorem ipsum dolor sit amet consectetur, adipisicing elit.
			Lorem ipsum dolor sit amet consectetur, adipisicing elit.
			Lorem ipsum dolor sit amet consectetur, adipisicing elit.
			Lorem ipsum dolor sit amet consectetur, adipisicing elit.
			Lorem ipsum dolor sit amet consectetur, adipisicing elit.
			Lorem ipsum dolor sit amet consectetur, adipisicing elit.
			Lorem ipsum dolor sit amet consectetur, adipisicing elit.
			Lorem ipsum dolor sit amet consectetur, adipisicing elit.
		</o-section>
		<br>
		<o-card>
			<o-section
				collapsible
				title="The section"
				subtitle="The subtitle">
				Lorem ipsum dolor sit amet consectetur, adipisicing elit.
				Lorem ipsum dolor sit amet consectetur, adipisicing elit.
			</o-section>

			<o-section
				title="The section"
				subtitle="The subtitle">
				Lorem ipsum dolor sit amet consectetur, adipisicing elit.

				<template #actions>
					<o-button>action</o-button>
				</template>
			</o-section>
		</o-card>
	</o-page>
</template>

<script setup lang="ts">
import { reactive } from 'vue';

// Section
const state = reactive({ fisrtSectionCollapsed: true });
</script>
