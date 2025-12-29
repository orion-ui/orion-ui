<template>
	<div class="playground flex g-32 jc-s">
		<div>
			<o-droppable
				v-model:datalist="left"
				:tag="`o-section`">
				<o-draggable
					v-for="item in left"
					:key="item.__uid"
					:data="item"
					:disabled="item.title === 'Item 1' ? state.disabled : false"
					:tag="state.tag">
					<div class="draggable-content">
						<o-icon icon="docs"/>
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
					:key="item.__uid"
					:data="item"
					:tag="state.tag">
					<div class="draggable-content">
						<o-icon icon="draft"/>
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
					:key="item.__uid"
					:data="item"
					:tag="state.tag">
					<div class="draggable-content">
						<o-icon icon="file_present"/>
						<strong>{{ item.title }}</strong>
					</div>
				</o-draggable>
			</o-droppable>
		</div>
	</div>

	<hr>

	<div class="flex g-32">
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
import { getUid, useNotif } from 'lib';
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
	'o-chips',
];

const left = ref([
	{
		__uid: getUid(),
		title: 'Item 1',
	},
	{
		__uid: getUid(),
		title: 'Item 2',
	},
	{
		__uid: getUid(),
		title: 'Item 3',
	},
	{
		__uid: getUid(),
		title: 'Item 4',
	},
]);

const right = ref([
	{
		__uid: getUid(),
		title: 'Item A',
	},
	{
		__uid: getUid(),
		title: 'Item B',
	},
]);

const middle = ref([
	{
		__uid: getUid(),
		title: 'Item A1',
	},
	{
		__uid: getUid(),
		title: 'Item B2',
	},
	{
		__uid: getUid(),
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
	padding: var(--o-space-16);
	border-radius: 0.5rem;
	background: var(--o-background-neutral-subtle);

	&--allowed {
		background: color-mix(
			in srgb,
			var(--o-background-success-default) 15%,
			transparent 85%
		);
	}

	&--forbidden {
		background: color-mix(
			in srgb,
			var(--background-error-default) 15%,
			transparent 85%
		);
	}

	&--over {
		background: color-mix(
			in srgb,
			var(--o-background-info-default) 15%,
			transparent 85%
		);
	}

	&--disabled {
		border: 1px solid var(--background-error-default);
		opacity: 0.2;
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

