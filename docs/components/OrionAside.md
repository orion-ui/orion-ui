---
lang: en-US
title: Aside
---

# OrionAside

`<o-aside>` creates an `<aside>` tag in the DOM that appear from the right of the window in a simple animation.
It can be opened using `refs` or with the prop `display`.

:::tip Good to know
`OrionAside` and `OrionModal` work in a very similar way.
:::

:::tip Popables
`OrionNotif`, `OrionAside` and `OrionModal` are parts of the [Popables family](../guide/the-popables.md).

It means that you can open a new aside without closing the actual. If you do so, the first one will be kept in queue and reappear when you close the second one.

**This behaviour can be customized to fit your needs.**\
More informations on this mecanism on the [Popables documentation](../guide/the-popables.md).

Example in the [nested component documentation part](#programmatic-aside-nested-component).
:::

## Usage

:::tip Asides can be used in multiples ways

- in the template, using `refs` or the prop `display` to hide or show an aside.
- programmatically with `useAside(customOptions)`.
:::

::: demo:Aside
AsideStyle
AsideSlots
AsideNested
:::

<summary class="flat-source-code">
<legend>Nested component source code</legend>
<details>

@[code vue{50}](../../packages/Aside/docs/NestedComp.vue)

</details>
</summary>

::: demo:Aside
AsidePlayground
:::

<attribute-table/>
