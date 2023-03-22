---
lang: en-US
title: Notif
---

# OrionNotif

`useNotif.[color](options)` displays a notification at the bottom right of the screen.

:::tip Popables
`OrionNotif`, `OrionAside` and `OrionModal` are parts of the [Popables family](../guide/the-popables.md).

It means that all the `OrionNotif` you open will be kept in queue.

**This behaviour can be customized to fit your needs.**\
More informations on this mecanism on the [Popables documentation](../guide/the-popables.md).
:::

## Usage

:::tip
Notifications are generally used programatically with the `useNotif` service.

However, like `<o-modal>` and `<o-aside>`, you can use `<o-notif>` in a template, and make it visible through the `display` boolean prop.
:::

::: demo:Notif
NotifStyle
NotifPlayground
:::

<attribute-table/>
