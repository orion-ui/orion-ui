---
lang: fr-FR
title: Paginate
---

# OrionPaginate

`<o-paginate>` affiche un module de pagination. Ce composant est intégré dans le composant `<o-list>` mais vous pouvez l'utiliser de façon indépendante.

## Variants

- `default` : pagination classique avec numeros + precedent/suivant.
- `detailed` : ajoute un selecteur de lignes par page et les infos de page avec actions premiere/precedente/suivante/derniere.

Les blocs additionnels en mode `detailed` sont activables avec `showPerPage` et `showPageInfo`.

## Usage

::: demo:Paginate
PaginatePlayground
:::

## Exemple (standalone)

```vue
<o-paginate
	v-model="page.index"
	:size="page.size"
	:total="total"
	variant="detailed"
	:show-per-page="true"
	:show-page-info="true"
	:size-options="[10, 20, 50]"
	@paginate="handlePaginate"
	@update:size="page.size = $event"
/>
```

## Binding router

Utilisez `bindRouter` pour synchroniser la page courante avec une cle de query.

## Selection

Si vous avez besoin d'un libelle "x / y selectionnees", affichez-le en dehors de `<o-paginate>` (par exemple a cote du composant ou dans l'entete de liste).

## Avec OrionList

`<o-list>` peut passer des options de pagination au `<o-paginate>` embarque :

```vue
<o-list
	v-model:page="page"
	:list="items"
	:total="total"
	paginate-variant="detailed"
	:paginate-size-options="[10, 20, 50]"
/>
```

<attribute-table/>
