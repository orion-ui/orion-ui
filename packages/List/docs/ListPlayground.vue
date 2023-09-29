<template>
	<o-list
		v-model:page="page"
		v-model:selected="selectedItems"
		v-bind="state"
		:list="list"
		:total="fullList.length">
		<template #default="{ item, selected }">
			<o-card
				:selected="selected"
				:title="item.title">
				{{ item.description }}
				<template #actions>
					<o-icon icon="image_01"/>
					<o-icon icon="redo"/>
					<o-icon
						icon="check_big"
						ripple="info"
						@click="toggleItemSelection(item)"/>
				</template>
			</o-card>
		</template>

		<template #footer-selected-actions>
			<o-button>
				Footer button
			</o-button>
		</template>
	</o-list>

	<hr>

	<div class="row row--middle row--gutter">
		<div class="col-sm-4">
			<o-toggle
				v-model="state.usePaginationTop"
				label="Use Pagination top"/>
		</div>
		<div class="col-sm-4">
			<o-toggle
				v-model="state.usePaginationBottom"
				label="Use Pagination bottom"/>
		</div>
		<div class="col-sm-4">
			<o-toggle
				v-model="state.useFooterSelected"
				label="Use footer selected"/>
		</div>
	</div>
	<div class="mt-xs row row--middle row--gutter">
		<div class="col-sm-4">
			<o-input
				v-model="page.size"
				type="number"
				label="List size"/>
		</div>
		<div class="col-sm-4">
			<o-radio
				v-model="state.layout"
				input-value="grid"
				label="Grid layout"/>
		</div>
		<div class="col-sm-4">
			<o-radio
				v-model="state.layout"
				input-value="row"
				label="Row layout"/>
		</div>
	</div>
</template>

<script setup lang="ts">
import { reactive, computed } from 'vue';
import { getUid } from 'lib';
import { faker } from '@faker-js/faker';

const fullList = seedList();
const list = computed(() => fullList.slice(page.size * (page.index - 1), page.size * page.index));
const selectedItems = reactive<any[]>([]);
const page = reactive<Orion.ListPage>({
	size: 4,
	index: 1,
});

const state = reactive({
	trackKey: 'id',
	layout: 'grid' as 'grid' | 'row',
	usePaginationBottom: true,
	usePaginationTop: true,
	useFooterSelected: true,
});

function seedList (qty = 50) {
	const items = [];
	for (let index = 0; index < qty; index++) {
		items.push({
			id: getUid(),
			title: faker.music.songName(),
			description: faker.lorem.sentence(),
		});
	}

	return items;
}

function toggleItemSelection (item: any) {
	const index = selectedItems.findIndex(x => x.id === item.id);
	index > -1
		? selectedItems.splice(index, 1)
		: selectedItems.push(item);
}
</script>

### Playground
