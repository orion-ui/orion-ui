<template>
	<o-page title="List">
		<o-list
			v-model:selected="selectedItems"
			use-auto-pagination
			:list="fullList"
			:page="page"
			:total="fullList.length">
			<template #default="{ item, selected }">
				<o-card
					:selected="selected"
					@click="toggleItemSelection(item)">
					<pre>{{ item.id }}</pre>
					<pre>{{ item.name }}</pre>
					<pre>{{ item.lastname }}</pre>
				</o-card>
			</template>
		</o-list>
	</o-page>
</template>

<script setup lang="ts">
import { faker } from '@faker-js/faker';
import { computed, reactive } from 'vue';
import { getUid } from 'lib';

const fullList = seedList();
const page = reactive<Orion.ListPage>({
	size: 10,
	index: 1,
});

const selectedItems = reactive<any[]>([]);

const list = computed(() => fullList.slice(page.size * (page.index - 1), page.size * page.index));

function seedList (qty = 50) {
	const items = [];
	for (let index = 0; index < qty; index++) {
		items.push({
			id: getUid(),
			name: faker.person.firstName(),
			lastname: faker.person.lastName(),
		});
	}

	return items;
}

function toggleItemSelection (item: any) {
	const index = selectedItems.findIndex(x => x.id === item.id);
	if (index > -1) {
		selectedItems.splice(index, 1);
	} else {
		selectedItems.push(item);
	}
}
</script>
