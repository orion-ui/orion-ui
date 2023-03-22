---
lang: fr-FR
title: Tour
description:
---

# Service Tour

Le service Tour doit être utilisé avec le composant `<o-tour>`. Ce service fournit les functions nécessaires pour enregistrer, démarrer ou arreter un tour.\
Pour voir un example, voir le [composant Tour](../../fr/components/OrionTour.md).
<service-preview />

## Comment créer un tour ?

**Créer un fichier `ExempleTour.vue`.** \
Ce fichier va contenir les différentes étapes du tour.

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

//Register your tour with the tour service and its ref
//Enregistrez votre tour avec le service tour et sa ref
onMounted(() => {
	useTour('_tour', _tour.value);
});
</script>
```

**Enregistrez le tour dans le layout de votre application**

Dans le fichier layout, ajoutez ces lignes:

```vue
<exemple-tour />

<script setup lang="ts">
import ExempleTour from '<file_path>/ExempleTour.vue';
</script>
```

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
