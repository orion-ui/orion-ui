---
lang: en-US
title: Tools
---

# Tools

You can import these functions to help you with basic tooling functions

## Example

```ts
import { prefixWithZeros, getDaysInMonth, isTouch } from '@orion.ui/orion';

const numberWithPrefix = prefixWithZeros(15, 6)
// output -> "000015"

const numberOfdays = getDaysInMonth(2, 2023)
// output -> 28

const isTouchableDevice = isTouch()
// output -> false (if from non-touchable device)
```

## Functions 

<service-preview :tools=true />





