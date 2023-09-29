<template>
	<div class="datetable-validation flex g-md jc-s ai-s">
		<div>
			<o-droppable
				v-model:datalist="left"
				:tag="`o-section`">
				<o-draggable
					v-for="item in left"
					:key="item.id"
					:data="item"
					tag="o-sticker">
					<div class="draggable-content">
						<o-icon icon="file_document"/>
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
					tag="o-sticker">
					<div class="draggable-content">
						<o-icon icon="file_blank"/>
						<strong>{{ item.title }}</strong>
					</div>
				</o-draggable>
			</o-droppable>
		</div>
	</div>
</template>

<script setup lang="ts">
import { useNotif, getUid } from 'lib';
import { ref } from 'vue';

const validation = {
	method: () => right.value.length < 2,
	notif: () => useNotif.warning('2 items maximum'),
};

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
</script>

<style lang="less" scoped>
.datetable-validation {
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

@hl {24,44-47}

@lang:en
### Validation on drop

You can add a validation rule on the drop of an item in the dropzone.

To do this you just have to pass a `validation` prop of the `Orion.Validation` type.

If the `method` property return false, the drag'n drop operation will be canceled.
@lang

@lang:fr
### Validation au drop

Il est possible d'ajouter une règle de validation au moment du drop d'un élément dans une zone.

Il suffit pour cela de passer une prop `validation` correspondant à un objet du type `Orion.DndValidation`.

Si la propriété `method` renvoi `false`, l'opération de drag'n drop sera annulée.
@lang
