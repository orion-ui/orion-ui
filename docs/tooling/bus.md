---
lang: en-US
title: Bus
---

# Bus

This tool allows you to communicate inside the application through a bus event. These events are emitted globally. \
The external library used is `mitt`. [(See mitt documentation here)](https://github.com/developit/mitt)

## Usage

How to emit an event :

```ts:no-line-numbers
import { Bus } from '@/lib';

Bus.emit('component:myEvent');
```

How to receive an event :

```ts:no-line-numbers
Bus.on('component:myEvent', () => {
	// Do something
});
```
