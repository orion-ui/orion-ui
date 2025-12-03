<template>
	<div class="flex g-32">
		<o-icon
			icon="house"
			:marker="3"
			@marker-click="useNotif.info('You clicked on marker')"/>
		<o-icon
			icon="house"
			marker
			marker-color="warning"/>
		<o-icon
			icon="house"
			marker
			marker-color="success"
			marker-position="bottom right"/>
	</div>
</template>

<script setup lang="ts">
import { useNotif } from 'lib';

</script>

<style lang="less" scoped>
.orion-icon{
  font-size: 1.5rem;
}
</style>

@hl {4-5,8-9,12-14}

@lang:en
### Marker
You can easily add a visual marker on an icon and change its style. The prop `marker` can be boolean, or a number to add a quantity.\
It comes also in different colors from `Orion.Color`.
@lang

@lang:fr
### Pastille
Il est possible d'afficher une pastille de notification sur une icône, ainsi que de choisir sa position avec la prop `marker-position`.\
La prop `marker` peut être un booléen ou un nombre pour indiquer une quantité.\
Plusieurs couleurs sont disponibles et définies par `Orion.Color`.
@lang

