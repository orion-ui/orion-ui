---
lang: fr-FR
title: Paginate
---

# OrionPaginate

`<o-paginate>` affiche un module de pagination. Ce composant est intégré dans le composant `<o-list>` mais vous pouvez l'utiliser de façon indépendante.

## Variants

- `default` pagination classique avec numéros + précédent/suivant.
- `detailed` ajoute un sélecteur de lignes par page et les informations de page avec actions première/précédente/suivante/dernière.

Les blocs additionnels en mode `detailed` sont activables avec `showPageSizeSelect` et `showPageInfo`.

::: demo:Paginate
PaginateRouterBinding
:::

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
	@update:size="page.size = $event"/>
```

## Sélection

Si vous avez besoin d'un libellé "x / y sélectionnées", affichez-le en dehors de `<o-paginate>` (par exemple à côté du composant ou dans l'en-tête de liste).

## Avec OrionList

`<o-list>` peut passer des options de pagination au `<o-paginate>` embarqué :

```vue
<o-list
	v-model:page="page"
	:list="items"
	:total="total"
	:pagination-size-options="[10, 20, 50]"
	pagination-variant="detailed"/>
```

<attribute-table/>
