<template>
	<div class="flex g-sm">
		<o-button @click="_asideA?.open()">
			Show aside with actions
		</o-button>

		<o-button @click="_asideB?.open()">
			Show aside with footer
		</o-button>

		<o-button @click="_asideC?.open()">
			Show aside with header
		</o-button>

		<o-aside ref="_asideA">
			<o-section title="Aside with actions">
				Lorem ipsum dolor sit amet, consectetur adipiscing elit.
				Duis sagittis viverra vulputate. Nunc ultricies ante urna, eget.
				Pellentesque lectus massa, fringilla eu risus id, semper volutpat nunc.
				Aliquam sapien tortor, auctor sed consequat ac, tempor id nibh.
				Nullam eu ipsum eu nulla feugiat eleifend at id sem. Nunc id dui sed.
				Praesent eu erat iaculis, venenatis ligula non, fringilla turpis.
				Ut ut molestie nisi. Nulla facilisi. Duis volutpat imperdiet nisi.
			</o-section>
		</o-aside>

		<teleport
			v-if="_asideA"
			:to="_asideA?.actionsSlotId">
			<o-button
				prefix-icon="check"
				color="success"/>
			<o-button
				prefix-icon="facebook"
				color="info"/>
		</teleport>

		<o-aside ref="_asideB">
			<template #footer>
				<o-alert
					color="brand"
					center
					title="Aside footer slot">
					Here comes your footer content
				</o-alert>
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

		<o-aside ref="_asideC">
			<template #header>
				<img src="https://picsum.photos/id/1041/200">
			</template>

			<o-section title="Aside with header">
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

@hl {29,39-46,60-62}

@lang:en
### Slots

There are 3 slots you can use to structure the aside content : `actions`, `header` and `footer`.

:::tip Good to know
These slots can be accessed using the `teleport` component,
and targeting the slot id using a string like `#OrionAside-${uid}__$slotName`.\
Getters are available to easily get aside's slots ids :
- `posterSlotId`
- `actionsSlotId`
- `footerSlotId`

**It is possible to see an example of this syntax with the `actions` slot, line 29.**
:::
@lang

@lang:fr
### Slots

Il existe 3 slots permettant de structurer le contenu de l'aside : `actions`, `header` and `footer`.

:::tip Bon à savoir
Il est possible d'accéder à ces slots en utilisant le composant `teleport`,
 et en ciblant l'id du slot à l'aide d'une string de la forme `#OrionAside-${uid}__$slotName`.\
Des getters sont disponibles pour récupérer plus facilement les ids correspondants aux différents slots de l'aside :
- `posterSlotId`
- `actionsSlotId`
- `footerSlotId`

**Il est possible de voir un exemple de cette syntaxe avec le slot `actions`, ligne 29.**
:::
@lang
