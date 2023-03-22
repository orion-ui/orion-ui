<template>
	<div class="flex g-sm">
		<o-button @click="_modalA?.open()">
			Actions from the options object
		</o-button>

		<o-button @click="_modalB?.open()">
			Actions from slot
		</o-button>

		<o-modal
			ref="_modalA"
			:options="{
				actions: [{
					label: 'Modal Action',
					color: 'success',
					callback: () => useNotif.success('Accept from modal'),
				}],
			}">
			<o-section title="Modal with actions from options">
				<p class="text--grey-dark">
					Lorem ipsum dolor sit amet, consectetur adipiscing elit.
					Maecenas et sem commodo, feugiat lorem ut, aliquam eros.
					Duis sagittis viverra vulputate. Nunc ultricies ante urna, eget aliquet lectus consectetur et.
					Pellentesque lectus massa, fringilla eu risus id, semper volutpat nunc.
					Curabitur libero odio, condimentum ac massa eget, placerat commodo mi.
				</p>
			</o-section>
		</o-modal>

		<o-modal ref="_modalB">
			<template #footer="{ close }">
				<o-section align="right">
					<o-button
						color="danger"
						outline
						@click="close">
						Close modal
					</o-button>
				</o-section>
			</template>

			<o-section title="Modal with actions from footer slot">
				<p class="text--grey-dark">
					Lorem ipsum dolor sit amet, consectetur adipiscing elit.
					Maecenas et sem commodo, feugiat lorem ut, aliquam eros.
					Duis sagittis viverra vulputate. Nunc ultricies ante urna, eget aliquet lectus consectetur et.
					Pellentesque lectus massa, fringilla eu risus id, semper volutpat nunc.
					Curabitur libero odio, condimentum ac massa eget, placerat commodo mi.
				</p>
			</o-section>
		</o-modal>
	</div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useNotif } from 'lib';

const _modalA = ref<OrionModal>();
const _modalB = ref<OrionModal>();
</script>

@hl {13-19,32-41}

@lang:en
### Actions

You can add actions to the modal using the property `actions` from the `options` prop or the `footer` slot.
@lang

@lang:fr
### Actions

Il est possible de modifier les actions par défaut en utilisant la propritété `actions` de la prop `options` ou le slot `footer`.
@lang
