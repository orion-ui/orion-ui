---
lang: fr-FR
title: Outils
---

# Outils

Il est possible d'importer ces fonctions pour vous aider avec des opérations de bases.

## Exemple

```ts
import { prefixWithZeros, getDaysInMonth, isTouch } from '@orion.ui/orion';

const numberWithPrefix = prefixWithZeros(15, 6);
// sortie -> "000015"

const numberOfdays = getDaysInMonth(2, 2023);
// sortie -> 28

const isTouchableDevice = isTouch();
// sortie -> false (si écran non-tactile)
```

## Fonctions

<service-preview :tools=true />
