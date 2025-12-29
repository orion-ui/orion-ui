<template>
	<div class="flex g-16">
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

			<teleport
				v-if="_modalC"
				:to="_modalC?.slotFooter">
				<o-alert
					color="info"
					center>
					Footer with teleport component
				</o-alert>
			</teleport>
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

@hl {17-23,36-45,69-77}

@lang:en
### Actions & footer slot

You can add actions to the modal using the property `actions` from the `options` prop or the `footer` slot.

:::tip Good to know
If you need to access the `footer` slot from a subcomponent of the modal,
you can use the built-in Vue `teleport` component.\
Simply provide the `:to` prop using the appropriate getter `slotFooter`.

**You can see an example of this syntax with the `actions` slot, line 69 to 77.**
:::
@lang

@lang:fr
### Actions & slot footer

Il est possible de modifier les actions par défaut en utilisant la propritété `actions` de la prop `options` ou le slot `footer`.

:::tip Bon à savoir
Dans le cas où vous auriez besoin d'accéder au slot `footer` depuis un sous composant de la modal
il est possible d'utiliser le composant `teleport` intégré à Vue.\
Il suffira de alors de renseigner la prop `:to` en utilisant le getter approprié `slotFooter`.

**Il est possible de voir un exemple de cette syntaxe avec le slot `footer`, lignes 69 à 77.**
:::
@lang
