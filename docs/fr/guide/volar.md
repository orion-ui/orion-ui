---
lang: fr-FR
title: Volar
pageClass: 'no-toc'
---

# Volar

[Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) est une extension populaire sur VSCode qui permet d'ajouter le support du language Vue.
Il peut ajouter l'auto-complétion et la vérification de type au niveau des props directement dans le `<template>`

Il est possible de bénéficier de ces fonctionnalités avec les composants d'Orion en ajoutant un fichier de définition des types dans le dossier `src` de votre projet.

Cette étape est facile en utilisant la commande **Orion CLI** suivante :

```sh:no-line-numbers
npx orion
```

Sélectionner ensuite l'option **volar**...

```:no-line-numbers{2}
┌  
🥨 --> Welcome to Orion CLI
│
◆  Select what you want to do
│  ● Volar Intellisense (Create .dts file for Volar)
└
```

... et entrer le préfix des composants d'Orion (appuyez sur **Enter** pour utiliser le préfix 'o' par défaut).\
Ce préfix doit bien sûr être le même que celui présent dans la [configuration d'Orion](quick-start.md#configuration-options).\
Vous pouvez voir un exemple de préfix personnalisé [ci-dessous](#prefix-personnalise).

```:no-line-numbers{2}
┌
🥨 --> Welcome to Orion CLI
│
◇  Select what you want to do
│  Volar Intellisense
│
◆  Enter the prefix for Orion components?
│  o_
└
```

Cette commande va créer un fichier `orion-volar.d.ts` avec le contenu correspondant.

:::: code-group
::: code-group-item orion-volar.d.ts

```ts
declare module 'vue' {
	export interface GlobalComponents {
		OAlert: typeof import('@orion.ui/orion/dist/types/packages')['OrionAlert'];
		OAside: typeof import('@orion.ui/orion/dist/types/packages')['OrionAside'];
		...
		OUpload: typeof import('@orion.ui/orion/dist/types/packages')['OrionUpload'];
	}

  export interface ComponentCustomProperties {}
}

export {};
```

:::
::::

## Préfix personnalisé

::: tip
Si vous avez configuré **Orion** avec un préfix personnalisé pour les composants, vous pouvez ajouter l'option `--prefix` à cette commande.
:::

:::: code-group
::: code-group-item main.ts

```ts{2}
createApp(App)
  .use(Orion, { prefix: 'abc' } as Orion.Config)
  .mount('#app')
```

:::
::::

```sh:no-line-numbers
npx orion
```

```:no-line-numbers{2}
┌  
🥨 --> Welcome to Orion CLI
│
◆  Select what you want to do
│  ● Volar Intellisense (Create .dts file for Volar)
└
```

```:no-line-numbers{2}
┌
🥨 --> Welcome to Orion CLI
│
◇  Select what you want to do
│  Volar Intellisense
│
◆  Enter the prefix for Orion components?
│  o_
└
```

:::: code-group
::: code-group-item orion-volar.d.ts

```ts{3,4,6}
declare module 'vue' {
	export interface GlobalComponents {
		AbcAlert: typeof import('@orion.ui/orion/dist/types/packages')['OrionAlert'];
		AbcAside: typeof import('@orion.ui/orion/dist/types/packages')['OrionAside'];
		...
		AbcUpload: typeof import('@orion.ui/orion/dist/types/packages')['OrionUpload'];
	}

  export interface ComponentCustomProperties {}
}

export {};
```

:::
::::
