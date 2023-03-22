---
lang: fr-FR
title: Notif
---

# OrionNotif

`useNotif.[color](options)` affiche une notification personnalisable en bas à droite de l'écran.

:::tip Popables
`OrionNotif`, `OrionAside` et `OrionModal` font partie de la famille des [Popables](../../fr/guide/the-popables.md).

Cela signifie que toutes les `OrionNotif` que vous ouvrez seront conservées dans une file d'attente.

**Ce comportement peut être adapté en fonction de vos besoins.**\
Plus d'informations dans la [documentation des popables](../../fr/guide/the-popables.md).
:::

## Usage

:::tip
Les notification sont généralement créées programmatiquement.

Toutefois, à l'instar de `<o-modal>` et `<o-aside>`, vous pouvez utiliser `<o-notif>` dans un template, et la rendre visible via la prop boolean `display`.
:::

::: demo:Notif
NotifStyle
NotifPlayground
:::

<attribute-table/>
