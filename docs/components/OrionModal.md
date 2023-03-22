---
lang: en-US
title: Modal
---

# OrionModal

`<o-modal>` creates a `<div>` tag in the DOM that appear from the top of the window in a simple animation.
It can be opened using `refs` or with the prop `display`.

:::tip Good to know
`OrionModal` and `OrionAside` work in a very similar way.
:::

:::tip Popables
`OrionNotif`, `OrionAside` and `OrionModal` are parts of the [Popables family](../guide/the-popables.md).

It means that you can open a new modal without closing the actual. If you do so, the first one will be kept in queue and reappear when you close the second one.

**This behaviour can be customized to fit your needs.**\
More informations on this mecanism on the [Popables documentation](../guide/the-popables.md).

Example in the [nested component documentation part](#programmatic-modal-nested-component).
:::

## Usage

:::tip Modals can be used in multiples ways
- in the template, using `refs` or the prop `display` to hide or show a modal.
- programmatically with `useModal(customOptions)`.
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

@[code vue{51}](../../packages/Modal/docs/NestedComp.vue)

</details>
</summary>

::: demo:Modal
ModalPlayground
:::

<attribute-table/>
