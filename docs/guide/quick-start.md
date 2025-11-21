---
lang: en-US
title: Quick Start
pageClass: 'no-toc'
---

# Quick Start

## Create a new project

If you want a fresh start you can use **Orion CLI** to scafflod a **new clean project**.\
Go to the [Creating a new project section](installation.md#creating-a-new-project) of the [installation page](installation.md).

## Installation in an existing project

If you're not familiar with **npm** you can refer to the [installation page](installation.md).\
If you want to install **Orion** in an **existing project**, follow below steps.

```sh:no-line-numbers
npm install --save @orion.ui/orion
```

::: code-tabs
@tab Full library

```ts {4,5,6,9}
import { createApp } from 'vue';
import App from './App.vue';

import Orion from '@orion.ui/orion'; // Import library
import '@orion.ui/orion/dist/style.css'; // Import styles
import '@orion.ui/orion/dist/monkey-patching'; // Import Monkey Patching definition file

createApp(App).use(Orion).mount('#app');
```

@tab With options

```ts{8-12}
import { createApp } from 'vue';
import App from './App.vue';

import Orion from '@orion.ui/orion'; // Import library
import '@orion.ui/orion/dist/style.css'; // Import styles

createApp(App)
  .use(Orion, {
		prefix: 'abc',
    use: ['components'], // Monkey patching won't be used here
    lang: 'fr',
  } as Orion.Config)
  .mount('#app')
```

:::

## Configuration options

**Orion** provides some configuration options when using it in your application.\
These options are of type `Orion.Config`, described below.

<type-description>

```ts:no-line-numbers
// Type definition
type Orion.Config = {
	prefix?: string
	use?: ("components" | "monkeyPatching")[]
	lang?: LangAvailable
	router?: Router
}
```

<prop-description name="prefix" type="string" value="'o'">

This is the prefix that will prepend the components name in the template.\
For example if you set it with `'abc'`, in your template `<o-button>` will be `<abc-button>`.

</prop-description>

<prop-description name="use" type="('components' | 'monkeyPatching')[]" value="['components', 'monkeyPatching']">

Basically you can use only the components, or only the Monkey Patching ([more infos](monkey-patching.md)), or both, which is the default usage.

</prop-description>

<prop-description name="lang" type="'en' | 'fr'" value="'en'">

At the moment **english** and **french** translation are available.

</prop-description>

<prop-description name="router" type="Router" value="undefined">

Your application's **VueRouter** instance, if you use **OrionLayout** or navigation components (**OrionNavMain**, **OrionNavTop**, **OrionNavTab**)

</prop-description>

<prop-description name="iconStyle" type="Orion.IconStyle" value="outlined">

Your application's default icon style, if you use **OrionIcon** components.

</prop-description>

</type-description>
