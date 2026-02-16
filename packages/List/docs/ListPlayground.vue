<template>
	<o-list
		v-bind="state"
		v-model:page="state.page"
		v-model:size="state.size"
		v-model:selected="selectedItems"
		:list="list"
		:total="fullList.length"
		:bind-router-page="state.bindWithRouter ? routerPageBinding : undefined"
		:bind-router-size="state.bindWithRouter ? routerSizeBinding : undefined">
		<template #default="{ item, selected }">
			<o-card
				:selected="selected"
				:title="item.title">
				{{ item.description }}
				<template #actions>
					<o-icon icon="image"/>
					<o-icon icon="redo"/>
					<o-icon
						icon="check"
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

	<div class="mt-xs row row--middle row--gutter">
		<div class="col-sm-4">
			<o-input
				v-model.number="state.size"
				:disabled="state.bindWithRouter"
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
		<div class="col-sm-4">
			<o-toggle
				v-model="state.bindWithRouter"
				label="Bind with Router"/>
		</div>
		<div class="col-sm-4">
			<o-radio
				v-model="state.paginationVariant"
				input-value="default"
				label="Default pagination"/>
		</div>
		<div class="col-sm-4">
			<o-radio
				v-model="state.paginationVariant"
				input-value="detailed"
				label="Detailed pagination"/>
		</div>
	</div>
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
</template>

<script setup lang="ts">
import { faker } from '@faker-js/faker';
import { getUid } from 'lib';
import { computed, reactive } from 'vue';

type ListItem = {
	id: number
	title: string
	description: string
};

const routerPageBinding: Undef<string> = 'myPage';
const routerSizeBinding: Undef<string> = 'mySize';

const selectedItems = reactive<ListItem[]>([]);
const fullList = seedList();
const list = computed(() => {
	return fullList.slice(state.size * (state.page - 1), state.size * state.page);
});

const state = reactive({
	page: 2,
	size: 6,
	layout: 'grid' as 'grid' | 'row',
	usePaginationBottom: true,
	usePaginationTop: true,
	useFooterSelected: true,
	paginationVariant: 'default' as 'default' | 'detailed',
	bindWithRouter: true,
});

function seedList (qty = 50) {
	const items: ListItem[] = [];
	for (let index = 0; index < qty; index++) {
		items.push({
			id: getUid(),
			title: faker.music.songName(),
			description: faker.lorem.sentence(),
		});
	}

	return items;
}

function toggleItemSelection (item: ListItem) {
	const index = selectedItems.findIndex(x => x.id === item.id);
	index > -1
		? selectedItems.splice(index, 1)
		: selectedItems.push(item);
}
</script>

@hl {4,5,9,10,103,104,113,114,120}

### Playground
