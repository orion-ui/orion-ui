<template>
	<div class="row row--center">
		<o-avatar
			name="Toto"
			:avatar="avatarUrl"
			:nb-avatar-updates="avatarUpdateIncrement"
			:update-function="update"/>
	</div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useNotif } from 'lib';

const avatarUrl = ref('https://picsum.photos/id/1011/200');
const avatarUpdateIncrement = ref(0);

function update () {
	useNotif.info('Create your update function');
	avatarUpdateIncrement.value++;
	avatarUrl.value = `https://picsum.photos/200?random=${avatarUpdateIncrement.value}`;
}
</script>

@hl {6,7,16,18-22}

@lang:en
### Update function

You can update the avatar image directly from the component by implementing the `update-function` prop.

::: warning Refreshing the image on update
Depending on how your avatar or thumbnail are managed, you may have the same url for the image even after updating it.
If this is the case the image won't change in the component which is the normal behavior.

To fix this we provide the `nb-avatar-updates` prop.

It must be a number that you should increment after each update so the image will be refreshed.
:::
@lang


@lang:fr
### Fonction update

Il est possible de modifier l'image de l'avatar directement à partir du composant en implémentant la prop `update-function`.

::: warning Actualiser l'image lors de la mise à jour
Selon la façon dont sont gérés l'avatar ou la vignette, il est possible d'avoir la même url pour l'image même après l'avoir mise à jour.
Dans ce cas l'image ne va pas changer au niveau du composant, ce qui est le comportement normal.

Pour y remédier, nous mettons à disposition la prop `nb-avatar-updates`.

Il doit s'agir d'un nombre qu'il faut incrémenter à chaque mise à jour pour que l'image soit actualisée.
:::
@lang
