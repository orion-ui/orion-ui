---
lang: fr-FR
title: Aside
---

# OrionAside

`<o-aside>` crée une balise `<aside>` dans le DOM qui apparaît depuis la droite de la fenêtre via une simple animation.
Il peut être ouvert via le système de `refs` ou via la prop `display`.

:::tip Bon à savoir
`OrionAside` et `OrionModal` ont un fonctionnement très similaire.
:::

:::tip Popables
`OrionNotif`, `OrionAside` et `OrionModal` font partie de la famille des [Popables](../../fr/guide/the-popables.md).

Cela signifie que vous pouvez en ouvrir un nouveau sans fermer l'actuel. Si vous faites cela, le premier aside sera placé en file d'attente et se ré-ouvrira automatiquement à la fermeture du deuxième.

**Ce comportement peut être adapté en fonction de vos besoins.**\
Plus d'informations dans la [documentation des popables](../../fr/guide/the-popables.md).

Un exemple dans [la partie composant imbriqué](#aside-programmatique-composant-imbrique).
:::

## Usage

:::tip Les asides peuvent être utilisés de plusieurs façons

- directement dans le template, en utilisant les `refs` ou la prop `display` pour l'afficher ou le masquer.
- programmatiquement avec `useAside(customOptions)`.
:::

::: demo:Aside
AsideStyle
AsideSlots
AsideNested
:::

<summary class="flat-source-code">
<legend>Nested component source code</legend>
<details>

@[code vue{50}](../../../packages/Aside/docs/NestedComp.vue)

</details>
</summary>

::: demo:Aside
AsidePlayground
:::

<attribute-table/>
