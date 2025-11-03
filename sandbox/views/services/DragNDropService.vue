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
						:tag="`o-sticker`"
						class="order-pipeline-candidate-sticker">
						<strong>{{ item.title }} </strong>
						<o-icon
							v-tooltip="'tututu'"
							icon="chart_line"/>
						<o-icon font-icon="layout-module"/>
						<div class="order-pipeline-candidate-sticker__actions">
							<o-icon
								v-tooltip="`Voir le profil`"
								ripple="info"
								icon="calendar"
								@mousedown.stop/>
							<o-icon
								v-tooltip="`Discussion`"
								ripple="info"
								icon="calendar"
								@mousedown.stop/>
						</div>
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
.order-pipeline-candidate-sticker{
&:hover {
		max-height: 6.25rem;

		.order-pipeline-candidate-sticker__actions {
			max-height: 1rem;
			margin: 1rem 0 0;
			pointer-events: all;
			opacity: 1;

			.orion-icon {
				opacity: 1;

				each(range(5), {
					&:nth-child(@{value}) {
						transition-delay: calc(@value * 0.07s);
					}
				})
			}
		}
	}

	&__actions{
		transition: max-height 0.3s, margin 0.3s, opacity 0.3s;
		will-change: max-height, margin, opacity;
		display: flex;
		width: 100%;
		justify-content: center;
		align-items: center;
		gap: 1.3rem;
		pointer-events: none;
		opacity: 0;
		margin: 0;
		max-height: 0;

		.orion-icon {
			transition: opacity 0.3s;
			font-size: 0.9rem;
			opacity: 0;
		}
	}
}

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
	background: var(--background-neutral-subtle);

	&--allowed {
		background: var(--background-success-subtle);
	}

	&--forbidden {
		background: var(--background-danger-subtle);
	}

	&--over {
		background: var(--background-info-subtle);
	}

	&--disabled{
		border: 1px solid var(--background-danger-default);
		opacity: 0.2;
	}
}
</style>
