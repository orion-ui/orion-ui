---
lang: en-US
title: Country service
description:
---

# Country service

The `useCountry` is mainly used with the `<o-phone>` component, but you can use it on demand.

Basically this service gives you some informations about countries like their **code** (2 letters format) and their **areaCode** for the phone numbers.

The datas it provides are of type `Orion.Country`

```ts:no-line-numbers
// Type definition
type Orion.Country = {
	code: string; // 2 uppercase letters
	name: string;
	areaCode: string;
}
```

<service-preview />

::: demo:(service)
CountryExample
:::
