---
lang: fr-FR
title: Tour
description:
---

# OrionTour

`<o-tour>` est un composant personnalisable permettant de guider pas à pas l'utilisateur sur votre projet.\
Le composant `<o-tour>` doit être combiné avec `<o-tour-step>`.\
Pendant le tour, la barre de défilement disparaît et un contraste est ajouté pour mettre en surbrillance la cible de l'étape.

::: demo:Tour
TourPlayground
:::

<attribute-table package="Tour"/>

## Tour step

Le composant `<o-tour-step>` représente une étape du tour. Il peut cibler un élément de la page, ou arraparaître au centre de la page ni aucune cible n'est spécifiée.

::: demo:Tour
TourStepTarget
TourStepSize
TourStepPreviousNext
:::

<attribute-table package="TourStep"/>

## Comment créer un tour ?

**Créer un fichier `ExempleTour.vue`.** \
Ce fichier va contenir les différentes étapes de votre tour.

```vue
<template>
	<o-tour ref="_tour">
		<o-tour-step target="tour1">
			<div>Contenu de l'étape</div>
		</o-tour-step>

		<o-tour-step> </o-tour-step>

		....
	</o-tour>
</template>

<script setup lang="ts">
import { useTour } from 'lib';
import { onMounted, ref } from 'vue';

const _tour = ref<RefDom<OrionTour>>();

//Enregistrez votre tour avec useTour()
onMounted(() => {
	useTour('_tour', _tour.value);
});
</script>
```

<br/>
<br/>

**Enregistrez le tour dans le layout de votre application**\
Dans le fichier layout, ajoutez ces lignes:

```vue
<exemple-tour />

<script setup lang="ts">
import ExempleTour from '<file_path>/ExempleTour.vue';
</script>
```

<br>
<br>

**Utilisez les refs pour accéder au tour et le lancer**

```vue
<template>
	<o-page title="Tour">
		<o-button id="target1" color="info" @click="startTour">
			Démarrer le tour !
		</o-button>
	</o-page>
</template>

<script setup lang="ts">
import { useTour } from 'lib';

// Accéder au tour et démarrez le !
function startTour() {
	useTour('_tour').start();
}
</script>
```

::: tip
Il est possible de démarrer le tour à une étape spécifique, pour cela ajoutez simplement l'index voulu en tant que paramètre en appelant la fonction `useTour('_tour').start(2)`
:::
