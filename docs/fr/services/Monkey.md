---
lang: fr-FR
title: Monkey
description:
---

# Monkey service

Service `useMonkey` permet de bénéficier du [Monkey Patching](../../fr/guide/monkey-patching.md) d'Orion pour les prototypes comme `Array`, `Number`, `Date`, ou `String` mais sans vraiment l'utiliser.\
C'est utile pour les personnes qui ne veulent pas ajouter des méthodes aux prototypes natifs.\
Le type de paramètre sera automatiquement déduit pour fournir les méthodes disponibles.

::: tip
Rendez-vous sur notre guide du [Monkey Patching](../../fr/guide/monkey-patching.md) pour plus d'informations.
:::

## Exemple

```ts:no-line-numbers
useMonkey(['a', 'b', 'c']).delete('b');
// retourne -> "['a', 'c']"

useMonkey(new Date(2022, 8, 5)).toReadable('$dddd, $YYYY-$MM-$DD');
// retourne -> "Wednesday, 2022-09-05"

useMonkey(1.5).toHoursMinutes();
// retourne -> "01:30"

useMonkey('Hello world').insert(' tiny', 5);
// retourne -> "Hello tiny world"
```

## Méthodes disponibles

<service-preview />
