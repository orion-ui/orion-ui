<template>
	<o-list
		v-bind="state"
		v-model:page="state.page"
		v-model:size="state.size"
		v-model:selected="selectedItems"
		:list="list"
		:total="fullList.length"
		:bind-router-page="routerPageBinding"
		:bind-router-size="routerSizeBinding">
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
				v-model.number="state.size"
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
</template>

<script setup lang="ts">
import { faker } from '@faker-js/faker';
import { getUid } from 'lib';
import { computed, reactive } from 'vue';

const routerPageBinding: Undef<string> = 'myPage';
const routerSizeBinding: Undef<string> = 'mySize';

const selectedItems = reactive<any[]>([]);
const fullList = seedList();
const list = computed(() => {
	return fullList.slice(state.size * (state.page - 1), state.size * state.page);
});

const state = reactive({
	page: 4,
	size: 6,
	layout: 'grid' as 'grid' | 'row',
	usePaginationBottom: true,
	usePaginationTop: true,
	useFooterSelected: true,
	paginationVariant: 'default' as 'default' | 'detailed',
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
