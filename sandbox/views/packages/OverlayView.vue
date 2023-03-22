<template>
	<o-page title="Overlay">
		<o-section align="left">
			<o-button @click="_overlay?.show()">
				Show card overlay
			</o-button>
			<o-button @click="_overlay?.hide()">
				Hide card overlay
			</o-button>
			<o-button @click="showGlobalOverlay()">
				Show global overlay
			</o-button>
		</o-section>

		<o-section>
			<o-card style="height:120px; overflow:auto;">
				<o-section
					:title="faker.lorem.sentence()"
					size="xs">
					{{ faker.lorem.paragraph(6) }}
				</o-section>
				<o-section
					:title="faker.lorem.sentence()"
					size="xs">
					{{ faker.lorem.paragraph(4) }}
				</o-section>
				<o-overlay ref="_overlay"/>
			</o-card>
		</o-section>

		<sections-generator :qty="2"/>
	</o-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useOverlay } from 'lib';
import { OrionOverlay } from 'packages/Overlay';
import { faker } from '@faker-js/faker';
import SectionsGenerator from '../../SectionsGenerator.vue';

const _overlay = ref<InstanceType<typeof OrionOverlay>>();
const globalOverlay = useOverlay();

function showGlobalOverlay () {
	globalOverlay.show();
	setTimeout(() => {
		// globalOverlay.hide();
	}, 2000);
}
</script>
