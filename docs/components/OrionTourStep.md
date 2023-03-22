---
lang: en-US
title: TourStep
description:
---

# OrionTourStep

`<o-tour-step>` is a component that reprensents a step in the `OrionTour`, and it can not be used on his own. The content of a step can contain any type of HTML tags.

## Usage

```vue:no-line-numbers
<o-tour-step title="step 1">
  <div>
    my step content
  </div>
</o-tour-step>
```

<attribute-table/>

<script setup lang="ts">
import { ref, reactive, provide, onMounted } from 'vue';
import { useTour } from '@/lib'

function startTour(index: number) {
  // useTour('_tour').start(index); FIXME: TODO:
  useTour('_tour').start();
}

function getTour() {
  return useTour('_tour')
}

const _tour = ref<RefDom<OrionTour>>();

onMounted(() => {
  useTour('_tour', _tour.value);
});


provide('sampleData', reactive({
  startTour: startTour,
}))

</script>
