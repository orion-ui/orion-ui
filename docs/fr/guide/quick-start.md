---
lang: fr-FR
title: Démarrage
pageClass: 'no-toc'
---

# Bien débuter

::: tip
Si vous n'êtes pas familier avec **npm** vous pouvez vous référer à la [page d'installation](installation.md)
:::

```sh:no-line-numbers
npm install --save @orion.ui/orion
```

:::: code-group
::: code-group-item Full library

```ts {4,5,6,9}
import { createApp } from 'vue';
import App from './App.vue';

import Orion from '@orion.ui/orion'; // Import de la librairie
import '@orion.ui/orion/dist/style.css'; // Import des styles
import '@orion.ui/orion/dist/monkey-patching'; // Import du fichier de définition du Monkey Patching

createApp(App).use(Orion).mount('#app');
```

:::

::: code-group-item With options

```ts{8-12}
import { createApp } from 'vue';
import App from './App.vue';

import Orion from '@orion.ui/orion'; // Import de la librairie
import '@orion.ui/orion/dist/style.css'; // Import des styles

createApp(App)
  .use(Orion, {
		prefix: 'abc',
    use: ['components'], // Le Monkey Patching ne sera pas utilisé ici
    lang: 'fr',
  } as Orion.Config)
  .mount('#app')
```

:::
::::

## Options de configuration

**Orion** fournit des options de configuration lorsqu'il est utilisé dans votre application.-

Ces options ce de type `Orion.Config`, décrit ci-dessous :

<type-description>

```ts:no-line-numbers
// Type definition
type Orion.Config = {
	prefix?: string;
	use?: ("components" | "monkeyPatching")[];
	lang?: LangAvailable;
}
```

<prop-description name="prefix" type="string" value="'o'">

Il s'agit du préfix qui va se placer avant le nom des composants au niveau du template.\
Par exemple si vous définissez `'abc'`, dans votre template `<o-button>` sera `<abc-button>`.

</prop-description>

<prop-description name="use" type="('components' | 'monkeyPatching')[]" value="['components', 'monkeyPatching']">

Il est possible d'utiliser uniquement les composants, ou juste le Monkey patching ([plus d'infos](monkey-patching.md)), ou les deux, ce qui est le comportement par défaut.

</prop-description>

<prop-description name="lang" type="'en' | 'fr'" value="'en'">

Pour le moment des traductions en **anglais** et en **français** sont disponibles.
</prop-description>

</type-description>
