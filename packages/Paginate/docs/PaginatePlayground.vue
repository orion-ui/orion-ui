<template>
	<div class="flex fd-c g-16">
		<o-paginate v-model="state.index" :total="state.total" :size="state.size" :show-per-page="false"
			:show-page-info="false" @paginate="notifPageUpdate($event)" @update:size="state.size = $event" />

		<o-list v-model:page="state" v-model:selected="selectedItems" v-bind="listState" :total="state.total" :list="list">
			<template #default="{ item, selected }">
				<div @click="toggleItemSelection(item)">
					<o-card :selected="selected" :title="item.title">
						{{ item.description }}
					</o-card>
				</div>
			</template>
		</o-list>
	</div>

	<hr>

	<div class="row row--grid">
		<div class="col-sm-4">
			<o-input v-model="state.total" label="Total" type="number" />
		</div>
		<div class="col-sm-4">
			<o-input v-model="state.size" label="Size" type="number" />
		</div>
		<div class="col-sm-4">
			<o-input v-model="state.index" label="Index" type="number" />
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
});

const listState = reactive({
	trackKey: 'id',
	usePaginationBottom: false,
	usePaginationTop: true,
});

function seedList(qty = 20) {
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

function notifPageUpdate(index: number) {
	useNotif.info(`Active page index is now ${index}`);
}

function toggleItemSelection(item: any) {
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
