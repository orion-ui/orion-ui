<template>
	<o-page title="Modal">
		<pre>displayAside {{ displayPopable }}</pre>

		<o-section align="left">
			<o-button @click="displayPopable = true">
				open modal
			</o-button>
			<o-button @click="_modal?.close()">
				close modal
			</o-button>
			<o-button @click="openPopableProg()">
				open modal prog
			</o-button>
			<o-button @click="openModalConfirm()">
				open modal confirm
			</o-button>
		</o-section>

		<o-section title="Modal size">
			<o-radio
				v-model="modalSize"
				input-value="xs"
				label="xs"/>
			<o-radio
				v-model="modalSize"
				input-value="sm"
				label="sm"/>
			<o-radio
				v-model="modalSize"
				input-value="md"
				label="md"/>
			<o-radio
				v-model="modalSize"
				input-value="lg"
				label="lg"/>
			<o-radio
				v-model="modalSize"
				input-value="xl"
				label="xl"/>
			<o-radio
				v-model="modalSize"
				input-value="fullscreen"
				label="fullscreen"/>
		</o-section>

		<o-section>
			<sections-generator :qty="5"/>
		</o-section>


		<o-modal
			ref="_modal"
			:display="displayPopable"
			:options="{ overlay: false }"
			@leave-start="displayPopable = false">
			<sections-generator :qty="5"/>

			<!-- <template #footer>
				<div class="flex g-xs">
					<o-button>Action 1</o-button>
					<o-button>Action 2</o-button>
				</div>
			</template> -->
		</o-modal>
	</o-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useConfirm, useModal, useNotif } from 'lib';
import NestedCompVue from 'sandbox/NestedComp.vue';
import SectionsGenerator from 'sandbox/SectionsGenerator.vue';

const displayPopable = ref(false);
const modalSize = ref('lg');
const _modal = ref<OrionModal>();

function openPopableProg () {
	useModal({
		title: 'Lorem dolor',
		Nested: NestedCompVue,
		size: modalSize.value,
		events: {
			close: (Modal) => {
				// eslint-disable-next-line no-console
				console.log('close event for Modal', Modal.uid);
			},
		},
		actions: [
			{ label: `Action 1` },
			{ label: `Action 2` },
		],
	});
}

async function openModalConfirm () {
	if (await useConfirm('ssuuuuuuuuuur')) {
		useNotif.success('kflh');
	} else {
		useNotif.warning('deny');
	}
}
</script>
