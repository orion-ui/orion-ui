---
lang: en-US
title: Avatar
---

# OrionAvatar

`<o-avatar>` is used to represent people or object like an article thumbnail for example.

It will display the first letter of the `name` prop in case the `avatar` prop is undefined.

Additionally if you provide the `update-function` prop, it will automatically add an upload icon to trigger this function.

::: tip
Although this component is very simple, it can handle complex cases depending on your application architecture.

More on that below in the [Edges cases](#edge-cases) section.
:::

### Usage

::: demo:Avatar
AvatarSquare
AvatarUpdate
AvatarPlayground
:::

### Edge cases

Like we explained before the usage can be very simple, just by providing an url for the `avatar` prop and a string for the `name` prop as a fallback.

But let's take a different example where the avatar is stored in a database and can be displayed with its `id`.
In this case you can provide a number for the `avatar` prop and a string for the `root-url` prop.
Then the component will automatically detect it and recreate the right url by concatenating both prop.

This can also be the case when the avatar is retrieved as a JSON object, you can directly use it for the `avatar` prop, it just need an `id` key.

<attribute-table/>

## OrionAvatarGroup

`<o-avatar-group>` can be used to stack avatars in a group. You can set a limit with the `max` prop or define the spacing in px between each avatar with the `spacing` prop.

::: demo:Avatar
AvatarGroupPlayground
:::

<attribute-table package="OrionAvatarGroup"/>
