<template>
	<div class="flex fd-c g-16">
		<div class="flex fd-c g-8">
			<h4>Default</h4>
			<o-paginate
				v-model="state.index"
				:total="state.total"
				:size="state.size"
				@paginate="notifPageUpdate"/>
		</div>

		<div class="flex fd-c g-8">
			<h4>Detailed</h4>
			<div class="flex ai-c g-16">
				<div class="orion-paginate__detail-text mr-a">
					{{ selectedItems.length }} / {{ state.total }} ligne(s) sélectionnée(s)
				</div>
				<o-paginate
					v-model="state.index"
					:total="state.total"
					:size="state.size"
					variant="detailed"
					:show-per-page="state.showPerPage"
					:show-page-info="state.showPageInfo"
					:size-options="sizeOptions"
					@paginate="notifPageUpdate"
					@update:size="handleSizeUpdate"/>
			</div>
		</div>

		<o-list
			v-model:page="state"
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

	<div class="row row--grid">
		<div class="col-sm-3">
			<o-input
				v-model="state.total"
				label="Total"
				type="number"/>
		</div>
		<div class="col-sm-3">
			<o-input
				v-model="state.size"
				label="Size"
				type="number"/>
		</div>
		<div class="col-sm-3 flex ai-c">
			<o-toggle
				v-model="state.showPerPage"
				label="Show per page"/>
		</div>
		<div class="col-sm-3 flex ai-c">
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
const list = computed(() => fullList.value.slice(state.size * (state.index - 1), state.size * state.index));
const selectedItems = reactive<any[]>([]);

const state = reactive({
	total: fullList.value.length,
	size: 4,
	index: 1,
	showPerPage: true,
	showPageInfo: true,
});

const sizeOptions = [1, 2, 4, 8];

const listState = reactive({
	trackKey: 'id',
	usePaginationBottom: false,
	usePaginationTop: false,
});

function seedList (qty = 20) {
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

function notifPageUpdate (index: number) {
	useNotif.info(`Active page index is now ${index}`);
}

function handleSizeUpdate (size: number) {
	state.size = size;
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
