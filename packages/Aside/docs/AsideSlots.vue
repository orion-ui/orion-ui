<template>
	<div class="flex g-16">
		<o-button @click="_asideA?.open()">
			Show aside with actions
		</o-button>

		<o-button @click="_asideB?.open()">
			Show aside with footer
		</o-button>

		<o-button @click="_asideC?.open()">
			Show aside with poster
		</o-button>

		<o-aside
			ref="_asideA"
			:options="{ title: 'This is the Title', description: 'This is an aside with a description' }">
			<o-section title="Aside with actions">
				Lorem ipsum dolor sit amet, consectetur adipiscing elit.
				Duis sagittis viverra vulputate. Nunc ultricies ante urna, eget.
				Pellentesque lectus massa, fringilla eu risus id, semper volutpat nunc.
				Aliquam sapien tortor, auctor sed consequat ac, tempor id nibh.
				Nullam eu ipsum eu nulla feugiat eleifend at id sem. Nunc id dui sed.
				Praesent eu erat iaculis, venenatis ligula non, fringilla turpis.
				Ut ut molestie nisi. Nulla facilisi. Duis volutpat imperdiet nisi.
			</o-section>

			<teleport
				v-if="_asideA"
				:to="_asideA?.slotActions">
				<o-button
					outline>
					Cancel
					</o-button>
				<o-button
					color="info">
					Save
					</o-button>
			</teleport>
		</o-aside>

		<o-aside ref="_asideB" :options="{ title: 'This is the Title', description: 'This is an aside with a description' }">
			<template #footer>
					<span class="text--primary">Here</span> comes your <span class="text--primary">footer content</span>
			</template>

			<o-section title="Aside with footer">
				Lorem ipsum dolor sit amet, consectetur adipiscing elit.
				Duis sagittis viverra vulputate. Nunc ultricies ante urna, eget.
				Pellentesque lectus massa, fringilla eu risus id, semper volutpat nunc.
				Aliquam sapien tortor, auctor sed consequat ac, tempor id nibh.
				Nullam eu ipsum eu nulla feugiat eleifend at id sem. Nunc id dui sed.
				Praesent eu erat iaculis, venenatis ligula non, fringilla turpis.
				Ut ut molestie nisi. Nulla facilisi. Duis volutpat imperdiet nisi.
			</o-section>
		</o-aside>

		<o-aside ref="_asideC" :options="{ title: 'This is the Title', description: 'This is an aside with a description' }">
			<template #poster>
				<img
					src="https://picsum.photos/id/1041/200"
					style="display: block; width: 100%; height: 15rem; object-fit: cover;">
			</template>

			<o-section title="Aside with poster">
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
const _asideC = ref<OrionAside>();
</script>

@hl {28,39-46,60-62}

@lang:en
### Slots

There are 4 slots available to structure the content of the aside: `actions`, `header`, `poster`, and `footer`.

:::tip Tip
If you need to access these slots from a subcomponent of the aside,
you can use the built-in Vue `teleport` component.\
Simply provide the `:to` prop using the appropriate getter:
- `slotPoster`
- `slotFooter`
- `slotActions`
- `slotHeader`

**You can see an example of this syntax with the `actions` slot, lines 26 to 35.**
:::
@lang

@lang:fr
### Slots

Il existe 4 slots permettant de structurer le contenu de l'aside : `actions`, `header`, `poster` and `footer`.

:::tip Bon à savoir
Dans le cas où vous auriez besoin d'accéder à ces slots depuis un sous composant de l'aside
il est possible d'utiliser le composant `teleport` intégré à Vue.\
Il suffira de alors de renseigner la prop `:to` en utilisant le getter approprié :
- `slotPoster`
- `slotFooter`
- `slotActions`
- `slotHeader`

**Il est possible de voir un exemple de cette syntaxe avec le slot `actions`, ligne 26 à 35.**
:::
@lang
