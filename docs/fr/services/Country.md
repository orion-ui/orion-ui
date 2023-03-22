---
lang: fr-FR
title: Country
description:
---

# Service Country

Le service `useCountry` est principalement utilisé avec le composant `<o-phone>`, mais vous pouvez l'utiliser dans d'autres conditions.
Ce service vous donne certaines informations sur les pays comme leur **code** (format 2 lettres) et leur **indicatif** pour les numéros de téléphone.

Les données fournies sont du type `Orion.Country`.

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
