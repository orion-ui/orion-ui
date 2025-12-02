<template>
	<div class="flex g-16">
		<o-button @click="displayAsideA = true">
			Aside with hideClose
		</o-button>

		<o-button @click="_asideB?.open()">
			Aside without overlay
		</o-button>

		<o-aside
			ref="_asideA"
			:options="{
				hideOnOverlayClick: false,
				hideClose: true,
			}"
			:display="displayAsideA"
			@leave-start="displayAsideA = false">
			<template #footer="{ close }">
				<o-section align="stretch">
					<o-button
						color="error"
						outline
						@click="close">
						Close aside from the slot
					</o-button>
					<o-button
						color="warning"
						outline
						@click="displayAsideA = false">
						Close aside through the prop
					</o-button>
				</o-section>
			</template>

			<o-section title="Aside with hideClose">
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
		</o-aside>

		<o-aside
			ref="_asideB"
			:options="{ overlay: false }">
			<o-section title="Aside without overlay">
				Lorem ipsum dolor sit amet, consectetur adipiscing elit.
				Duis sagittis viverra vulputate. Nunc ultricies ante urna, eget.
				Pellentesque lectus massa, fringilla eu risus id, semper volutpat nunc.
				Aliquam sapien tortor, auctor sed consequat ac, tempor id nibh.
				Nullam eu ipsum eu nulla feugiat eleifend at id sem. Nunc id dui sed.
				Praesent eu erat iaculis, venenatis ligula non, fringilla turpis.
				Ut ut molestie nisi. Nulla facilisi. Duis volutpat imperdiet nisi.
			</o-section>
		</o-aside>
	</div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
const _asideA = ref<OrionAside>();
const _asideB = ref<OrionAside>();
const displayAsideA = ref(false);
</script>

@hl {3,7,13-16,19,24,59}

@lang:en
### Aside closing

By default, the aside closes when the user clicks on the overlay.
You can change this behavior with the prop `hideOnOverlayClick`.

You can also hide the close symbole on the top right with the prop `hideClose`.
@lang

@lang:fr
### Fermeture de l'aside

Par défaut, l'aside se ferme lorsque l'utilisateur clique sur l'overlay.
Il est possible de changer ce comportement avec la prop `hideOnOverlayClick`.

Il est également possible de masquer la croix en haut à gauche de l'aside avec la prop `hideClose`.
@lang
