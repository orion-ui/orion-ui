---
lang: fr-FR
title: Tabs
---

# OrionTabs

`<o-tabs>` permet d'afficher des onglets. Il doit être utilisé avec des `<o-tab-pane>` ([plus d'infos ci-dessous](#orion-tab-pane)).

Son mécanisme est très similaire avec celui du composant `<o-timeline>` ([plus d'infos ici](../../fr/components/OrionTimeline.md)). 

## Usage

::: demo:Tabs
TabsPlayground
:::

## Utilisation avec VueRouter

Depuis la version `1.6.0` il est possible d'utiliser le composant `OrionTabs` avec **VueRouter**.

Il n'y alors alors qu'à renseigner les `OrionTabPane` enfants, **Orion** s'occupera automatiquement de rajouter le composant `<router-view/>` adéquat.

La prop `name` correspondra alors à la propriété `name` de la route cible.

```vue{2}
<!-- Utilisation simple -->
<o-tabs use-router>
	<o-tab-pane name="RouteOne" label="Label One"/>
	<o-tab-pane name="RouteTwo" label="Label Two"/>
	<o-tab-pane name="RouteThree" label="Label Three"/>
</o-tabs>
```

\
Afin de ne pas rentrer en conflit avec vos autre **subviews**, vous pouvez utiliser le système de **named views** de **VueRouter** :
[https://router.vuejs.org/guide/essentials/named-views.html](https://router.vuejs.org/guide/essentials/named-views.html)


```vue{2}
<!-- Utilisation avec les named views -->
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
