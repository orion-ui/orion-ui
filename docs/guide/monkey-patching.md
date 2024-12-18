---
lang: en-US
title: Monkey Patching
pageClass: 'no-toc'
---

# Monkey Patching

::: details Maybe you're asking what is Monkey Patching ? Click here for more details...
Basically it is used to add methods or properties to native javascript prototypes like Array, Date, Number or String for example.

Some people like this concept because of the ease of use it brings to the development of your application.
Others prefer not to use it to keep the native javascript prototypes clean and prevent any unwanted overrides or conflicts.
:::

**Monkey Patching** can be pretty controversial, that's why we decided to make it optionnal.

It is installed by default when using the full library, but you can omit it in the options like in the example below.

::: tip
To make the benefits of our Monkey Patching available to everyone we provide a **useMonkey** service (or composable) which infers parameter's type to provide available methods.
:::

::: code-tabs
@tab With MonkeyPatching

```ts {5,8,12}
import { createApp } from 'vue';
import App from './App.vue';
import Orion from '@orion.ui/orion'; // Import library
import '@orion.ui/orion/dist/style.css'; // Import styles
import '@orion.ui/orion/dist/monkey-patching'; // Import Monkey Patching definition file

createApp(App)
	.use(Orion) // full library
	.mount('#app');

const testDate = new Date(2022, 8, 5);
const result = testDate.toReadable('$year - $monthNum - $dayNum');
// .toReadable is a new method added to the Date prototype

console.log(readableDate);
// output -> "2022 - 09 - 05"
```

@tab With useMonkey service

```ts {3,8,14-15}
import { createApp } from 'vue';
import App from './App.vue';
import Orion, { useMonkey } from '@orion.ui/orion'; // Import library
import '@orion.ui/orion/dist/style.css'; // Import styles

createApp(App)
	.use(Orion, {
		use: ['components'], // use only components
		lang: 'fr',
	} as Orion.Config)
	.mount('#app');

const testDate = new Date(2022, 8, 5);
const result = useMonkey(testDate) // type Date inferred here
	.toReadable('$year - $monthNum - $dayNum');

console.log(readableDate);
// output -> "2022 - 09 - 05"
```

:::
