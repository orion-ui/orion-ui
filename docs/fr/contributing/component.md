---
lang: fr-FR
title: Composant
pageClass: contributing__component
---

# Créer un nouveau composant

**Orion** fournit une simple **interface de ligne de commande** pour améliorer l'expérience développeur au moment de contribuer au projet.\
Ce `cli` va se charger de construire un nouveau composant en créant les fichier nécessaires dans les bons dossiers.

Ne vous inquiétez pas, nous utilisons une architecture assez courante avec seulement un léger changement dans le `script` que nous allons expliquer juste après.

## Notre philosophie de conception de packages

Le design est assez basique et suis le schéma ci dessous.

::: tip
Pour comprendre facilement le méchanisme, créons un composant **Brouillon**.
:::

<div class="img--schema">

![Package design philosophy](../../contributing/package-design.png)

</div>

### Garder le code clair

Le code est divisé en 3 fichiers.

<div class="flex-list">

- ![Template](/assets/logos/vue.svg)<p>La partie `template` reste évidemment dans le fichier `.vue` .</p>
- ![Style](/assets/logos/less.svg)<p>La partie `style` prend place dans un fichier `.less`.
  Cela a pour but de garder le code propre et d'éviter `scoped style` ce qui rend la réécriture des styles plus facile pour les gens qui utilisent **Orion** et veulent le personnaliser.</p>
- ![Script](/assets/logos/typescript.svg)<p>La partie `script` se retrouve dans un fichier `.ts`. C'était un choix difficile car ce n'est pas encore entièrement supporté par Vue.js. Cependant cela permet de profiter pleinement des fonctionnalités de typescript, et plus spécifiquement les classes et l'héritage. Plus de détails dans la section [amélioration de l'expérience développeur](#enhance-dx).</p>

</div>

### Améliorer l'expérience développeur

Comme dit plusieurs fois, nous tenons à l'expérience développeur. C'est pour l'une de ces raisons que nous avons choisi de mettre toute la partie script dans une `class` typescript dédiée pour chaque composant.

Ce modèle de conception rend l'utilisation de `class` et d'`héritage` beaucoup plus simple. Cela contribue également à maintenir un code propre, **même à l'intérieur d'un template**.

**_Vous vous demandez comment c'est possible ?_**

Il suffit juste d'utiliser des attributs `private` ou `protected` dans votre classe `SetupService` pour les empêcher d'être accessibles depuis le template.\
Par exemple si vous utilisez VSCode, vous aurez un **Intellisense** plus propre. Cela permet de réduire le nombre d'erreurs et la complexité du code lors du développement de votre application.\
Mais regardons un exemple plus concret.

## Le processus de création de composant

Nous ne voulons pas ennuyer les développeur avec une convention de nommage et une structure de fichier. C'est pourquoi nous avons créé un petit `cli` pour rendre ce processus plus simple.

```sh:no-line-numbers
# À la racine d'Orion
node cli.cjs
```

<br>

Choisissez l'option `package`.

```:no-line-numbers{3}
┌
🥨 --> Welcome to Orion CLI
│
◆  Select what you want to do
│  ○ Volar Intellisense
│  ● New package (Scaffold a new package)
│  ○ Create packages index
│  ○ Create services index
│  ○ Create sandbox routes
│  ○ Build lib
│  ○ Create doc's data files
└
```

<br>

Entrez ensuite le nom de votre paquet.

```:no-line-numbers{2}
┌
🥨 --> Welcome to Orion CLI
│
◇  Select what you want to do
│  New package
│
◆  What's the name of your package?
│  Package name
└
```

::: tip
Ne vous inquiétez pas de la convention de nommage, entrez simplement le nom.\
Il sera automatiquement converti en **PascalCase** et préfixé avec _Orion_.
:::

```:no-line-numbers{2}
┌
🥨 --> Welcome to Orion CLI
│
◇  Select what you want to do
│  New package
│
◇  What's the name of your package?
│  draft
│
◆  🥨 --> Orion created /packages/Draft/index.ts
│
◆  🥨 --> Orion created /packages/Draft/src/OrionDraft.vue
│
◆  🥨 --> Orion created /packages/Draft/src/OrionDraft.less
│
◆  🥨 --> Orion created /packages/Draft/src/OrionDraftSetupService.ts
│
◆  🥨 --> Orion created /docs/components/OrionDraft.md
│
◆  🥨 --> Orion created /packages/index.ts
│
◆  🥨 --> Orion created /lib/packages.d.ts
│
◆  Enter the prefix for Orion components?
│  o_
└
```

La commande `volar` est exécutée automatiquement pour récréer le fichier `orion-volar.d.ts` avec votre nouveau composant ([plus d'info sur la commande `volar`](/fr/guide/volar.md)).

### Fichiers packages

La structure des dossiers suivante sera générée avec la commande `package`.

\
![Structure des dossiers](../../contributing/folder-structure.png)

<br>

::: tip
Il s'agit des 3 principeux fichiers dans lesquels vous allez écrire votre code.
:::

::: code-tabs
@tab OrionDraft.vue

```vue
<template>
	<pre>OrionDraft</pre>
</template>

<script setup lang="ts">
import './OrionDraft.less';
import OrionDraftSetupService from './OrionDraftSetupService';
const props = defineProps(OrionDraftSetupService.props);
const setup = new OrionDraftSetupService(props);
defineExpose(setup.publicInstance);
</script>
```

@tab OrionDraftSetupService.ts

```ts
import SharedSetupService from '../../Shared/SharedSetupService';
import SharedProps from '../../Shared/SharedProps';

type Props = SetupProps<typeof OrionDraftSetupService.props>;

export default class OrionDraftSetupService extends SharedSetupService<Props> {
	static props = {};

	constructor(props: Props) {
		super(props);
	}
}
```

@tab OrionDraft.less

```less
@import '../../Shared/styles/variables.less';
@import '../../Shared/styles/mixins.less';

.orion-draft {
}
```

:::

### Structure des paquets

<div class="img--schema">

![Structure d'un paquet](../../contributing/package-structure.png)

</div>

::: tip SharedSetupService.ts
Chaque `SetupService` étend la classe `SharedSetupService`
_Donc, vous comprenez l'idée..._

Si quelque chose est commun à tous les composants, le `SharedSetupService` sera le bon fichier où implémenter votre code.
:::

### Documentation

Une fois que vous avez créé votre nouveau composant, n'oubliez pas d'ajouter une documentation.

La commande `package` a également créé le fichier suivant : `/docs/components/OrionDraft.md`

Il est difficile d'écrire une documentation, mais faites de votre mieux en expliquant simplement comment fonctionne le composant, quand il peut être utilisé, et quelles situations spécifiques il peut gérer.

#### Démos

Comme vous l'avez probablement remarqué, chaque paquet comprend un dossier `docs`. Il contiendra les fichiers `.vue` pour chaque démo ou playground que vous voulez voir apparaître dans la documentation.

Nous avons créé un plugin Vuepress/Markdown pour intégrer facilement ces démos dans les fichiers markdown.

À la suite de votre code, il est possible d'ajouter une description concernant la démo.
Pour cela, utilisez le marqueur `@lang:` suivi d'une des langues supportées dans la documentation (`en` pour l'anglais est nécéssaire).

<br>

Prenons par exemple la [documentation d'OrionButton](/fr/components/OrionButton.md), vous y trouverez ces lignes:

```md:no-line-numbers
::: demo:Button
ButtonColors
ButtonIcons
ButtonPlayground
:::
```

<br>

La première ligne correspond au marqueur qui va indiquer au bundler d'intégrer les démos à ce niveau.\
Lors du parsing des fichiers sources, la regex cherchera l'expression suivante : `::: demo:`\
Si nous prenons l'exemple de notre composant **Draft** :

```md:no-line-numbers{1}
::: demo:Draft
```

<br>

Ensuite il suffit de spécifier quelle démo vous souhaitez insérez (en écrivant le nom du fichier) :

```md:no-line-numbers{2-4}
::: demo:Draft
DraftDemo1
DraftDemo2
DraftDemo3
::: <!-- ne pas oublier de fermer le marqueur de démo avec ::: -->
```

Puis dans le fichier `.vue` la description prendra cette forme à la fin du fichier

```vue:no-line-numbers
@lang:en
### Titre de votre démo

La description de votre composant
@lang
```

#### Ajouter votre documentation dans le menu

La dernière étape consiste à ajouter un lien de la page de documentation au niveau de la **sidebar**.\
Ajoutez le chemin correspondant à votre fichier dans l'une des parties `children` dans le fichier`docs/.vuepress/configs/sidebar/index.ts`.
La bonne position dépendra de la catégorie de votre composant.
