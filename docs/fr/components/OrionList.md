---
lang: fr-FR
title: List
---

# OrionList

`<o-list>` est un moyen rapide d'afficher une liste avec des fonctionnalités telles que la pagination, la sélection ou l'affiche en grille ou en lignes.

Le composant utilise le slot `default` pour itérer sur le tableau passé via la prop `list`.

## Bind avec Vue Router

Vous avez la possibilité de binder la pagination de la liste avec **Vue Router** en précisant la props `:bind-router-page` et en option `:bind-router-size`. La valeur `string` de ces props correspond à la key utilisée dans la query de l'URL.

Dans le cas où les paramètres ne sont pas définis dans l'URL lors de l'arrivée sur la page, `OrionList` utilisera des valeurs par défaut (`page = 1`, `size = 20`) ou celles spécifiées en props `page` et `size`.

Cette fonctionnalité est activée par défaut dans le playground ci-dessous (voir code source).

::: demo:List
ListPlayground
:::

<attribute-table/>
