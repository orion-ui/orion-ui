---
lang: en-US
title: Log
---

# Log

A tool to customize and highlight your logs in the console.

## Example

<o-button color="info" outline @click="Log.success('This is my log', 'Title');">
Try this success log
</o-button>

```ts:no-line-numbers
import { Log } from '@/lib';

Log.success('This is my log', 'Title');
```

## Usage

You can use multiple levels of logs, which will change the color of the associated log :

- info
- success
- warn
- error

The title of the log is also optional. If not filled, it will be its level.

<o-button color="info" outline @click="Log.warn('This is my warning log');">
Try this default warning log
</o-button>

<script setup lang="ts">
import { Log } from '@/lib';

</script>
