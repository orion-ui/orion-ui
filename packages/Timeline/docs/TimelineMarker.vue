<template>
	<o-timeline v-model="activePane">
		<o-timeline-pane
			name="pane1"
			complete
			marker
			icon="check">
			<template #before>
				<div class="timeline-before-pill">
					<b>First step</b>
					<em>Ridiculus</em>
				</div>
			</template>

			<template #after>
				Donec id elit non mi porta gravida at eget metus.
				Etiam porta sem malesuada magna mollis euismod.
				Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit.
			</template>
		</o-timeline-pane>
		<o-timeline-pane
			name="pane2"
			icon="image_01"
			:marker="4"
			marker-color="info">
			<template #before>
				<div class="timeline-before-pill">
					<b>Second step</b>
					<em>Magna Lorem</em>
				</div>
			</template>

			<template #after>
				Integer posuere erat a ante venenatis dapibus posuere velit aliquet.
				Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit.
				Cras mattis consectetur purus sit amet fermentum.
			</template>
		</o-timeline-pane>
	</o-timeline>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const activePane = ref('pane2');
</script>

<style lang="less" scoped>
.timeline-before-pill {
	display: flex;
	flex-direction: column;
	gap: 0.25rem;
	width: 5rem;
	text-align: right;

	> em {
		color: var(--text-neutral-moderate);
	}
}
</style>

@hl {6,8-13,15-19,24,25}

@lang:en
### Marker and vertical layout

You can easily add a visual marker on the pane and change its color and its value.

In vertical mode, use `before` and `after` slots to display your content.
@lang

@lang:fr
### Pastille

Il est possible d'ajouter une pastille de notification au niveau de l'icône du panneau, de changer sa valeur et sa couleur.

En mode vertical, utilisez les slots `before` et `after` pour afficher votre contenu.
@lang
