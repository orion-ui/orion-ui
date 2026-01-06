<template>
	<o-section :title="`${title} ${uid ?? ''}`">
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
	</o-section>

	<o-section align="right">
		<o-button
			v-if="uid"
			color="warning"
			outline
			@click="_modal?.close({ flush: true })">
			Close and flush queue
		</o-button>

		<o-button
			color="danger"
			outline
			@click="_modal?.close()">
			Close modal
		</o-button>

		<o-button
			color="info"
			@click="openNewModal()">
			Open a new modal
		</o-button>
	</o-section>
</template>

<script setup lang="ts">
import { inject } from 'vue';
import { useModal, getUid } from 'lib';
import NestedComp from './NestedComp.vue';

defineProps<{ title: string, uid?: number }>();

const _modal = inject<OrionModal>('_modal');

function openNewModal () {
	useModal({
		Nested: NestedComp,
		NestedProps: {
			title: `Queued modal`,
			uid: getUid(),
		},
	});
}
</script>
