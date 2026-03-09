<template>
	<o-page title="List">
		<o-list
			v-model:selected="selectedItems"
			use-auto-pagination
			:list="fullList"
			:page="pagination.page"
			:size="pagination.size"
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
import { getUid } from 'lib';
import { computed, reactive } from 'vue';

type item = {
	id: number
	name: string
	lastname: string
};

const fullList = seedList();
const pagination = reactive({
	size: 10,
	page: 1,
});

const selectedItems = reactive<item[]>([]);

const list = computed(() => fullList.slice(pagination.size * (pagination.page - 1), pagination.size * pagination.page));

function seedList (qty = 100) {
	const items: item[] = [];
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
	}
	else {
		selectedItems.push(item);
	}
}
</script>
