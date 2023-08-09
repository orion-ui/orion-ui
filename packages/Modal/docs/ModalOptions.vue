<template>
	<div class="flex g-sm">
		<o-button @click="_modalA?.open()">
			Actions from the options object
		</o-button>

		<o-button @click="_modalB?.open()">
			Actions from slot
		</o-button>

		<o-button @click="_modalC?.open()">
			Footer from teleport
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


		<teleport
			v-if="_modalC"
			:to="_modalC?.footerSlotId">
			<o-section>
				<o-alert
					color="info"
					center>
					Footer with teleport component
				</o-alert>
			</o-section>
		</teleport>

		<o-modal ref="_modalC">
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
const _modalC = ref<OrionModal>();
</script>

@hl {13-19,32-41}

@lang:en
### Actions & footer slot

You can add actions to the modal using the property `actions` from the `options` prop or the `footer` slot.

:::tip Good to know
This slot can be accessed using the `teleport` component,
and targeting the modal's slot id using a string like `#OrionModal-${uid}__footer`.\
A getter `footerSlotId` is available to easily get the modal's slot id.

**It is possible to see an example of this syntax with the `actions` slot, line 61.**
:::
@lang

@lang:fr
### Actions & slot footer

Il est possible de modifier les actions par défaut en utilisant la propritété `actions` de la prop `options` ou le slot `footer`.

:::tip Bon à savoir
Il est possible d'accéder à ce slot en utilisant le composant `teleport`,
 et en ciblant l'id du slot de la modal avec une string de la forme `#OrionModal-${uid}__footer`.\
Un getter `footerSlotId` est disponible pour récupérer plus facilement l'id correspondant au slot de la modal.\
**Il est possible de voir un exemple de cette syntaxe avec le slot `footer`, ligne 61.**
:::
@lang
