<template>
	<div class="flex fd-c g-16">
		<div class="flex fd-c g-8">
			<h4>Default</h4>
			<o-paginate
				v-model:page="state.page"
				:total="state.total"
				:size="state.size"
				:max-pagination-buttons="state.maxPaginationButtons"
				:show-page-size-select="state.showPageSizeSelect"
				@paginate="notifPageUpdate"/>
		</div>

		<div class="flex fd-c g-8">
			<h4>Detailed</h4>
			<div class="flex ai-c">
				<div class="orion-paginate__detail-text mr-a">
					{{ selectedItems.length }} / {{ state.total }}
					selected {{ `${'line'.pluralize(selectedItems.length, false)}` }}
				</div>
				<o-paginate
					v-model:page="state.page"
					v-model:size="state.size"
					:total="state.total"
					variant="detailed"
					:show-page-size-select="state.showPageSizeSelect"
					:show-page-info="state.showPageInfo"
					:size-options="sizeOptions"
					:max-pagination-buttons="state.maxPaginationButtons"
					@paginate="notifPageUpdate"/>
			</div>
		</div>

		<o-list
			v-model:page="state.page"
			v-model:size="state.size"
			v-model:selected="selectedItems"
			v-bind="listState"
			:total="state.total"
			:list="list">
			<template #default="{ item, selected }">
				<div @click="toggleItemSelection(item)">
					<o-card
						:selected="selected"
						:title="item.title">
						{{ item.description }}
					</o-card>
				</div>
			</template>
		</o-list>
	</div>

	<hr>

	<div class="row row--grid row--middle">
		<div class="col-sm-4">
			<o-input
				v-model.number="state.page"
				label="Index"
				type="number"/>
		</div>
		<div class="col-sm-4">
			<o-input
				v-model.number="state.total"
				label="Total"
				type="number"/>
		</div>
		<div class="col-sm-4">
			<o-input
				v-model.number="state.size"
				label="Size"
				type="number"/>
		</div>
		<div class="col-sm-4">
			<o-input
				v-model.number="state.maxPaginationButtons"
				label="Max Pagination Buttons"
				:min-value="3"
				mask="integer"
				type="number"/>
		</div>
		<div class="col-sm-4">
			<o-toggle
				v-model="state.showPageSizeSelect"
				label="Show page size select"/>
		</div>
		<div class="col-sm-4">
			<o-toggle
				v-model="state.showPageInfo"
				label="Show page info"/>
		</div>
	</div>
</template>

<script setup lang="ts">
import { faker } from '@faker-js/faker';
import { getUid, useNotif } from 'lib';
import { computed, reactive, ref, watch } from 'vue';

const fullList = ref(seedList());
const list = computed(() => fullList.value.slice(state.size * (state.page - 1), state.size * state.page));
const selectedItems = reactive<any[]>([]);

const state = reactive({
	total: fullList.value.length,
	size: 3,
	page: 1,
	showPageSizeSelect: true,
	showPageInfo: true,
	maxPaginationButtons: 5,
});

const sizeOptions = [1, 2, 4, 8, 1000];

const listState = reactive({
	usePaginationBottom: false,
	usePaginationTop: false,
});

function seedList (qty = 36) {
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

function notifPageUpdate ({ page, size }: { page: number, size: number }) {
	useNotif.info(`Active page is now ${page}`);
}

function toggleItemSelection (item: any) {
	const index = selectedItems.findIndex(x => x.id === item.id);
	index > -1
		? selectedItems.splice(index, 1)
		: selectedItems.push(item);
}

watch(
	() => state.total,
	val => fullList.value = seedList(val),
);
</script>

### Playground
