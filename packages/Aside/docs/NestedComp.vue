<template>
	<o-section
		:title="`${title} ${uid ?? ''}`"
		subtitle="This is a nested component inside an aside.">
		<p>
			Etiam porta sem malesuada magna mollis euismod.
			Etiam porta sem malesuada magna mollis euismod.
			Aenean lacinia bibendum nulla sed consectetur.
			Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
			Cras justo odio, dapibus ac facilisis in, egestas eget quam.
		</p>

		<p>
			Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
			Eget lacinia odio sem nec elit.
			Cras justo odio, dapibus ac facilisis in, egestas eget quam.
			Vestibulum id ligula porta felis euismod semper.
			Nulla vitae elit libero, a pharetra augue.
		</p>

		<teleport :to="_aside?.slotActions">
			<o-button
				v-if="uid"
				color="warning"
				outline
				@click="_aside?.close({ flush: true })">
				Close and flush queue
			</o-button>

			<o-button
				outline
				@click="_aside?.close()">
				Close aside
			</o-button>

			<o-button
				color="info"
				@click="openNew()">
				Open a new aside
			</o-button>
		</teleport>

		<teleport :to="_aside?.slotFooter">
			This is the footer from the nested component.
		</teleport>
	</o-section>
</template>

<script setup lang="ts">
import { getUid, useAside } from 'lib';
import { inject } from 'vue';
import NestedComp from './NestedComp.vue';

defineProps<{ title: string, uid?: number }>();
const _aside = inject<OrionAside>('_aside');

function openNew () {
	useAside({
		Nested: NestedComp,
		NestedProps: {
			title: `Queued aside`,
			uid: getUid(),
		},
	});
}
</script>
