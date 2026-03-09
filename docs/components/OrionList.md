---
lang: en-US
title: List
---

# OrionList

`<o-list>` is a quick way to display a list with pagination, selection, grid or row layout features.

It will use the `default` slot to iterate over the given array through the `list` prop.

## Bind with Vue Router

You can bind the list pagination with **Vue Router** by specifying the `:bind-router-page` prop and optionally `:bind-router-size`. The `string` value of these props corresponds to the key used in the URL query.

If the parameters are not defined in the URL when arriving on the page, `OrionList` will use default values (`page = 1`, `size = 20`) or those specified in the `page` and `size` props.

This feature is enabled by default in the playground below (see source code).

::: demo:List
ListPlayground
:::

<attribute-table/>
