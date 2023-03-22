<template>
	<div class="playground flex g-md jc-s">
		<div>
			<o-droppable
				v-model:datalist="left"
				:tag="`o-section`">
				<o-draggable
					v-for="item in left"
					:key="item.id"
					:data="item"
					:disabled="item.title === 'Item 1' ? state.disabled : false"
					:tag="state.tag">
					<div class="draggable-content">
						<o-icon icon="file_pdf"/>
						<strong>{{ item.title }}</strong>
					</div>
				</o-draggable>
			</o-droppable>
		</div>

		<div>
			<o-droppable
				v-model:datalist="middle"
				:tag="`o-section`">
				<o-draggable
					v-for="item in middle"
					:key="item.id"
					:data="item"
					:tag="state.tag">
					<div class="draggable-content">
						<o-icon icon="file_archive"/>
						<strong>{{ item.title }}</strong>
					</div>
				</o-draggable>
			</o-droppable>
		</div>

		<div>
			<o-droppable
				v-model:datalist="right"
				:tag="`o-section`"
				:validation="validation">
				<o-draggable
					v-for="item in right"
					:key="item.id"
					:data="item"
					:tag="state.tag">
					<div class="draggable-content">
						<o-icon icon="file_image"/>
						<strong>{{ item.title }}</strong>
					</div>
				</o-draggable>
			</o-droppable>
		</div>
	</div>

	<hr>

	<div class="flex g-md">
		<o-select
			v-model="state.tag"
			label="Draggabel tag"
			:options="tagOptions"/>
		<o-toggle
			v-model="state.disabled"
			label="Item 1 disabled"/>
	</div>
</template>

<script setup lang="ts">
import { useNotif, getUid } from 'lib';
import { reactive, ref } from 'vue';

const validation = {
	method: () => right.value.length < 2,
	notif: () => useNotif.warning('2 items maximum'),
};

const state = reactive({
	tag: `o-sticker`,
	disabled: true,
});

const tagOptions = [
	'o-sticker',
	'o-label',
	'o-chips',
];

const left = ref([
	{
		id: getUid(),
		title: 'Item 1',
	},
	{
		id: getUid(),
		title: 'Item 2',
	},
	{
		id: getUid(),
		title: 'Item 3',
	},
	{
		id: getUid(),
		title: 'Item 4',
	},
]);

const right = ref([
	{
		id: getUid(),
		title: 'Item A',
	},
	{
		id: getUid(),
		title: 'Item B',
	},
]);

const middle = ref([
	{
		id: getUid(),
		title: 'Item A1',
	},
	{
		id: getUid(),
		title: 'Item B2',
	},
	{
		id: getUid(),
		title: 'Item C3',
	},
]);
</script>

<style lang="less" scoped>
.playground {
  > div {
		flex: 1;
	}
}

.orion-droppable {
	position: relative;
	padding: var(--fluid-10px);
	border-radius: 0.5rem;
	background: var(--grey-light);

	&--allowed {
		background: rgba(var(--rgb-success), 0.15);
	}

	&--forbidden {
		background: rgba(var(--rgb-danger), 0.15);
	}

	&--over {
		background: rgba(var(--rgb-info), 0.15);
	}

	&--disabled{
		border: calc(1rem / 16) solid var(--danger);
		opacity: 0.2
	}
}

.draggable-content {
	display: flex;
	align-items: center;
	gap: 0.5rem;

	.orion-icon {
		font-size: 1.25rem;
	}
}
</style>


### Playground
