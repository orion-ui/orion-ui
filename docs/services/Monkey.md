---
lang: en-US
title: Monkey service
description:
---

# Monkey service

The `useMonkey` service allows you to benefit from Orion [Monkey Patching](../guide/monkey-patching.md) for prototypes like `Array`, `Number`, `Date`, or `String` but without actually using it.

This is useful for people who don't want to add methods to the native prototypes.\
Parameter type will be automatically inferred to provide the available methods.

::: tip
Please head to our [Monkey Patching](../guide/monkey-patching.md) guide page for further informations.
:::

## Example

``` ts:no-line-numbers
useMonkey(['a', 'b', 'c']).delete('b');
// returns -> "['a', 'c']"

useMonkey(new Date(2022, 8, 5)).toReadable('$dddd, $YYYY-$MM-$DD');
// returns -> "Wednesday, 2022-09-05"

useMonkey(1.5).toHoursMinutes();
// returns -> "01:30"

useMonkey('Hello world').insert(' tiny', 5);
// returns -> "Hello tiny world"
```

## Available methods

<service-preview />
