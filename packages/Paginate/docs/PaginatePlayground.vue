<template>
	<div class="flex fd-c g-16">
		<o-paginate
			v-model="state.index"
			:total="state.total"
			:size="state.size"
			@paginate="notifPageUpdate($event)"/>

		<o-list
			v-model:page="state"
			v-bind="listState"
			:list="list">
			<template #default="{ item }">
				<o-card :title="item.title">
					{{ item.description }}
				</o-card>
			</template>
		</o-list>
	</div>

	<hr>

	<div class="row row--grid">
		<div class="col-sm-4">
			<o-input
				v-model="state.total"
				label="Total"
				type="number"/>
		</div>
		<div class="col-sm-4">
			<o-input
				v-model="state.size"
				label="Size"
				type="number"/>
		</div>
		<div class="col-sm-4">
			<o-input
				v-model="state.index"
				label="Index"
				type="number"/>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, watch } from 'vue';
import { getUid, useNotif } from 'lib';
import { faker } from '@faker-js/faker';

const fullList = ref(seedList());
const list = computed(() => fullList.value.slice(state.size * (state.index - 1), state.size * state.index));

const state = reactive({
	total: fullList.value.length,
	size: 4,
	index: 1,
});

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

watch(
	() => state.total,
	val => fullList.value = seedList(val),
);
</script>

### Playground
