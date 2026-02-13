---
lang: en-US
title: Paginate
---

# OrionPaginate

`<o-paginate>` displays a pagination module. This component is integrated in `<o-list>` but you can use it as a standalone.

## Variants

- `default` classic page numbers with previous/next buttons.
- `detailed` adds a per-page selector and page info with first/previous/next/last actions.

The extra blocks in `detailed` mode can be toggled with `showPageSizeSelect` and `showPageInfo`.

::: demo:Paginate
PaginateRouterBinding
:::

## Usage

::: demo:Paginate
PaginatePlayground
:::

## Example (standalone)

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

## Selection count

If you need a "x / y selected" label, display it outside of `<o-paginate>` (for example next to the component or in a list header).

## With OrionList

`<o-list>` can pass pagination options to the embedded `<o-paginate>`:

```vue
<o-list
	v-model:page="page"
	:list="items"
	:total="total"
	:pagination-size-options="[10, 20, 50]"
	pagination-variant="detailed"/>
```

<attribute-table/>
