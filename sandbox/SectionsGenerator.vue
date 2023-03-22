<template>
	<o-section>
		number of sections : {{ sectionIndex }}
		<o-input-range
			v-model="sectionIndex"
			:max-value="10"/>
	</o-section>

	<o-section
		v-for="i in sectionIndex"
		:key="i">
		<!-- <o-card> -->
		<o-section
			:title="`Section ${i}`"
			:subtitle="faker.lorem.sentence()"
			gap="xs">
			{{ faker.lorem.paragraph(6) }}
		</o-section>
		<o-section
			:subtitle="faker.lorem.sentence()"
			gap="xs">
			{{ faker.lorem.paragraph(4) }}
		</o-section>
		<!-- </o-card> -->
	</o-section>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { faker } from '@faker-js/faker';

const props = defineProps({
	qty: {
		type: Number,
		default: 1,
	},
});

const sectionIndex = ref(props.qty);
</script>
