---
lang: fr-FR
title: Monkey Patching
pageClass: 'no-toc'
---

# Monkey Patching

::: details Vous vous demandez peut être ce qu'est le Monkey Patching ? Cliquez ici pour plus d'infos...
Il est utilisé pour ajouter des méthodes ou des propriétés aux prototypes natifs de javascript comme Array, Date, Number ou String par exemple.

Certaines personnes aiment ce concept pour la facilité d'utilisation qu'il apporte au niveau du développement de votre application.
D'autres préfèrent ne pas l'utiliser pour garder les prototypes natifs de javascript propres et éviter d'éventuels conflits ou surchages non désirés.
:::

Le **Monkey Patching** peut être assez controversé, c'est pourquoi nous avons choisi de le rendre optionnel.

Il est installé par défaut lorsque la librairie est utilisé entièrement, mais vous pouvez le retirer des options comme montré ci-dessous.

::: tip
Pour que tout le monde puisse profiter des avantages de notre Monkey Patching, nous fournissons un service (ou composable) **useMonkey** qui déduit à partir du type les méthodes disponibles.
:::

:::: code-group
::: code-group-item With MonkeyPatching

```ts {7,11}
import { createApp } from 'vue';
import App from './App.vue';
import Orion from '@orion.ui/orion'; // Import de la librairie
import '@orion.ui/orion/dist/style.css'; // Import des styles

createApp(App)
	.use(Orion) // librairie complète
	.mount('#app');

const testDate = new Date(2022, 8, 5);
const result = testDate.toReadable('$year - $monthNum - $dayNum');
// .toReadable est une nouvelle méthode ajouté au prototype Date

console.log(readableDate);
// sortie -> "2022 - 09 - 05"
```

:::

::: code-group-item With useMonkey service

```ts {3,8,14-15}
import { createApp } from 'vue';
import App from './App.vue';
import Orion, { useMonkey } from '@orion.ui/orion'; // Import library
import '@orion.ui/orion/dist/style.css'; // Import styles

createApp(App)
	.use(Orion, {
		use: ['components'], // Utilise uniquement les composants
		lang: 'fr',
	} as Orion.Config)
	.mount('#app');

const testDate = new Date(2022, 8, 5);
const result = useMonkey(testDate) // type Date déduit
	.toReadable('$year - $monthNum - $dayNum');

console.log(readableDate);
// sortie -> "2022 - 09 - 05"
```

:::
::::
