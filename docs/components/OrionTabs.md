---
lang: en-US
title: Tabs
---

# OrionTabs

`<o-tabs>` displays tabs. It must be used with `<o-tab-pane>` components ([more infos below](#orion-tab-pane)).

Its mecanism is very similar with the `<o-timeline>` component ([more infos here](../components/OrionTimeline.md)). 

## Usage

::: demo:Tabs
TabsPlayground
:::

## Using with VueRouter

Since version `1.6.0`, it is possible to use the `OrionTabs` component with **VueRouter**.

You only need to provide the nested `OrionTabPane`, and **Orion** will automatically add the appropriate `<router-view/>` component.

The `name` prop will correspond to the `name` property of the target route.

```vue{2}
<!-- Simple usage -->
<o-tabs use-router>
	<o-tab-pane name="RouteOne" label="Label One"/>
	<o-tab-pane name="RouteTwo" label="Label Two"/>
	<o-tab-pane name="RouteThree" label="Label Three"/>
</o-tabs>
```

\
To avoid conflicts with your other **subviews**, you can use the **named views** system of **VueRouter**: 
[https://router.vuejs.org/guide/essentials/named-views.html](https://router.vuejs.org/guide/essentials/named-views.html)


```vue{2}
<!-- Usage with named views -->
<o-tabs use-router router-view-name="mySubview">
	<o-tab-pane name="RouteOne" label="Label One"/>
	<o-tab-pane name="RouteTwo" label="Label Two"/>
	<o-tab-pane name="RouteThree" label="Label Three"/>
</o-tabs>
```



## Orion Tabs 
<attribute-table package="Tabs"/>

## Orion Tab Pane

::: demo:Tabs
TabPaneMarker 
TabPaneStyle 
:::

<attribute-table package="TabPane"/>

