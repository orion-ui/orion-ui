---
lang: fr-FR
title: Modal
---

# OrionModal

`<o-modal>` crée une balise `<div>` dans le DOM qui apparaît depuis le haut de la fenêtre via une simple animation.
Elle peut être ouverte via le système de `refs` ou via la prop `display`.

:::tip Bon à savoir
`OrionModal` et `OrionAside` ont un fonctionnement très similaire.
:::

:::tip Popables
`OrionNotif`, `OrionAside` et `OrionModal` font partie de la famille des [Popables](../../fr/guide/the-popables.md).

Cela signifie que vous pouvez en ouvrir une nouvelle sans fermer l'actuelle. Si vous faites cela, la première modal sera placée en file d'attente et se ré-ouvrira automatiquement à la fermeture de la deuxième.

**Ce comportement peut être adapté en fonction de vos besoins.**\
Plus d'informations dans la [documentation des popables](../../fr/guide/the-popables.md).

Un exemple dans [la partie composant imbriqué](#modal-programmatique-composant-imbrique).
:::

## Usage

:::tip Les modal peuvent être utilisées de plusieurs façons
- directement dans le template, en utilisant les `refs` ou la prop `display` pour l'afficher ou le masquer.
- programmatiquement avec `useModal(customOptions)`.
:::

::: demo:Modal
ModalStyle
ModalOptions
ModalPromptConfirm
ModalNested
:::

<summary class="flat-source-code">
<legend>Nested component source code</legend>
<details>

@[code vue{51}](../../../packages/Modal/docs/NestedComp.vue)

</details>
</summary>

::: demo:Modal
ModalPlayground
:::

<attribute-table/>
