<template>
	<o-page title="DragNDrop Service">
		{{ left }}
		<o-horizontal-scroll
			id="pipeline"
			drop-shadow>
			<o-section title="Titre">
				<o-droppable
					v-model:datalist="left"
					:tag="`o-section`">
					<o-draggable
						v-for="item in left"
						:key="item.id"
						:data="item"
						tag="o-sticker">
						<strong>{{ item.title }} </strong>
						<o-icon font-icon="layout-module"/>
					</o-draggable>
				</o-droppable>
			</o-section>
			<o-section>
				<o-droppable
					v-model:datalist="middle"
					:tag="`o-section`">
					<o-draggable
						v-for="item in middle"
						:key="item.id"
						:data="item"
						:tag="`o-sticker`">
						<strong>{{ item.title }} </strong>
						<o-icon font-icon="layout-module"/>
					</o-draggable>
				</o-droppable>
			</o-section>
			<o-section>
				<o-droppable
					v-model:datalist="right"
					:tag="`o-section`"
					:validation="validation">
					<o-draggable
						v-for="item in right"
						:key="item.id"
						:data="item"
						:tag="`o-sticker`">
						<strong>{{ item.title }} </strong>
						<o-icon font-icon="layout-module"/>
					</o-draggable>
				</o-droppable>
			</o-section>
		</o-horizontal-scroll>
	</o-page>
</template>

<script setup lang="ts">
import { useNotif } from 'lib';
import { ref } from 'vue';

const validation = {
	method: () => {
		return right.value.length < 2;
	},
	notif: () => {
		useNotif.warning('2 items maximum');
	},
};

const left = ref([
	{
		id: 0,
		title: 'Item 1',
	},
	{
		id: 1,
		title: 'Item 2',
	},
	{
		id: 2,
		title: 'Item 3',
	},
	{
		id: 5,
		title: 'Item 5',
		color: 'red',
	},
]);

const right = ref([
	{
		id: 0,
		title: 'Item A',
	},
	{
		id: 1,
		title: 'Item B',
	},
]);

const middle = ref([
	{
		id: 25,
		title: 'Item 25',
		color: 'red',
	},
	{
		id: 27,
		title: 'Item 27',
		color: 'red',
	},
	{
		id: 10069,
		title: 'Item 10069',
		color: 'red',
	},
]);
</script>

<style scoped lang="less">
.horizontal-scroll {
	&__container {
		position: relative;
		width: 100%;
		max-width: 100%;
		background: yellow;
		overflow: hidden;
		display: flex;
		gap: 10px;
		flex-shrink: unset;
	}
}

.orion-section {
	width: 300px;
}

.orion-droppable {
	position: relative;
	padding: 10px;
	border-radius: 10px;
	background: fade(grey, 50);

	&--allowed {
		background: fade(lightgreen, 15);
	}

	&--forbidden {
		background: fade(red, 15);
	}

	&--over {
		background: fade(blue, 15);
	}

	&--disabled{
		border: 1px solid red;
		opacity: 0.2
	}
}
</style>
