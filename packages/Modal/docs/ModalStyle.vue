<template>
	<div class="flex g-16">
		<o-button @click="displayModalA = true">
			Modal with hideClose
		</o-button>

		<o-button @click="_modalB?.open()">
			Modal without overlay
		</o-button>

		<o-modal
			ref="_modalA"
			:options="{
				hideOnOverlayClick: false,
				hideClose: true,
			}"
			:display="displayModalA"
			@leave-start="displayModalA = false">
			<template #footer="{ close }">
				<o-section align="stretch">
					<o-button
						color="danger"
						outline
						@click="close">
						Close modal from the slot
					</o-button>
					<o-button
						color="warning"
						outline
						@click="displayModalA = false">
						Close modal through the prop
					</o-button>
				</o-section>
			</template>

			<o-section title="Modal with hideClose">
				Lorem ipsum dolor sit amet, consectetur adipiscing elit.
				Duis sagittis viverra vulputate. Nunc ultricies ante urna.
				Pellentesque lectus massa, fringilla eu risus id, semper.
				Aliquam sapien tortor, auctor sed consequat ac, tempor id nibh.
				Nullam eu ipsum eu nulla feugiat eleifend at id sem. Nunc id dui.
				Praesent eu erat iaculis, venenatis ligula non, fringilla turpis.
				Ut ut molestie nisi. Nulla facilisi. Duis volutpat imperdiet nisi.
			</o-section>

			<o-section>
				Lorem ipsum dolor sit amet, consectetur adipiscing elit.
				Duis sagittis viverra vulputate. Nunc ultricies ante urna.
				Pellentesque lectus massa, fringilla eu risus id, semper.
				Aliquam sapien tortor, auctor sed consequat ac, tempor id nibh.
				Nullam eu ipsum eu nulla feugiat eleifend at id sem. Nunc id dui.
				Praesent eu erat iaculis, venenatis ligula non, fringilla turpis.
				Ut ut molestie nisi. Nulla facilisi. Duis volutpat imperdiet nisi.
			</o-section>
		</o-modal>

		<o-modal
			ref="_modalB"
			:options="{ overlay: false }">
			<o-section title="Modal without overlay">
				Lorem ipsum dolor sit amet, consectetur adipiscing elit.
				Duis sagittis viverra vulputate. Nunc ultricies ante urna, eget.
				Pellentesque lectus massa, fringilla eu risus id, semper volutpat nunc.
				Aliquam sapien tortor, auctor sed consequat ac, tempor id nibh.
				Nullam eu ipsum eu nulla feugiat eleifend at id sem. Nunc id dui sed.
				Praesent eu erat iaculis, venenatis ligula non, fringilla turpis.
				Ut ut molestie nisi. Nulla facilisi. Duis volutpat imperdiet nisi.
			</o-section>
		</o-modal>
	</div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const _modalA = ref<OrionModal>();
const _modalB = ref<OrionModal>();
const displayModalA = ref(false);
</script>

@hl {3,7,13-16,19,24,59}

@lang:en
### Modal closing

By default, the modal closes when the user clicks on the overlay.
You can change this behavior with the prop `hideOnOverlayClick`.

You can also hide the close symbole on the top right with the prop `hideClose`.
@lang

@lang:fr
### Fermeture de la modal

Par défaut, la modal se ferme lorsque l'utilisateur clique sur l'overlay.
Il est possible de changer ce comportement avec la prop `hideOnOverlayClick`.

Il est également possible de masquer la croix en haut à droite de la modal avec la prop `hideClose`.
@lang
