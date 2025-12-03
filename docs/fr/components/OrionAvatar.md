---
lang: fr-FR
title: Avatar
---

# OrionAvatar

`<o-avatar>` est utilsé pour représenter une personne ou un objet comme sur la vignette d'un article par exemple.

Si la prop `avatar` n'est pas définie, le composant affichera la première lettre de la chaîne de caractères passée à la prop `name`.\
De plus, si la prop `update-function` est fournie, une icône de téléchargement sera automatiquement ajoutée pour appeler cette fonction à partir de ce bouton.

::: tip
Même si ce composant semble simple, il peut gérer des cas complexes en fonction de l'architecture de votre application.

Plus d'exemples dans la section [Cas complexes](#cas-complexes).
:::

### Usage

::: demo:Avatar
AvatarSquare
AvatarUpdate
AvatarPlayground
:::

### Cas complexes

Comme expliqué ci-dessus, l'usage de l'avatar peut être très simple en fournissant juste une url pour la prop `avatar` et une chaîne de caractères pour la prop `name` dans le cas où l'url ne serait pas trouvée.

Mais prenons un exemple différent où l'avatar est stocké dans une base de données et peut être affiché via son `id`.
Dans ce cas, il est possible de fournir un nombre pour la prop `avatar` et une chaîne de caractères pour la prop `root-url`.
Le composant va ensuite le détecter automatiquement et recréer l'url correcte en concaténant les deux props.

Cela peut aussi être le cas quand l'avatar est récupéré en tant qu'objet JSON, il est possible de l'utiliser directement avec la prop `avatar`, avec un `id` comme clé.

<attribute-table/>


### OrionAvatarGroup

`<o-avatar-group>` peut être utilisé pour empiler des avatars en groupe. Il est possible de définir une limite avec la prop `max` ou d'ajuster l'espacement en px entre chaque avatar avec la prop `spacing`.

::: demo:Avatar
AvatarGroupPlayground
:::

<attribute-table package="OrionAvatarGroup"/>