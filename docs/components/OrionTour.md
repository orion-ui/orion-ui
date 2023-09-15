---
lang: en-US
title: Tour
description:
---

# OrionTour

`<o-tour>` is a customizable component that allows users onboarding on your projects.\
It can be used with the tag `<o-tour>` and must be combined with the `OrionTourStep` component.
During the tour, the scroll will be disabled, and an overlay is added to highlight the target.

::: demo:Tour
TourPlayground
:::

<attribute-table package="Tour"/>

## Tour step

This represent a step during the tour. It can target an item on the page, or be displayed on the middle of the screen if no target is selected.

::: demo:Tour
TourStepTarget
TourStepSize
TourStepPreviousNext
:::

<attribute-table package="TourStep"/>

## How to create a tour ?

**Create a file `ExampleTour.vue`.** \
This file will contain the different steps of your tour.

```vue
<template>
	<o-tour ref="_tour">
		<o-tour-step target="tour1">
			<div>Content of your step</div>
		</o-tour-step>

		<o-tour-step> </o-tour-step>

		....
	</o-tour>
</template>

<script setup lang="ts">
import { useTour } from 'lib';
import { onMounted, ref } from 'vue';

const _tour = ref<RefDom<OrionTour>>();

//Register your tour with the useTour() function from the service
onMounted(() => {
	useTour('_tour', _tour.value);
});
</script>
```

<br/>
<br/>

**Register your tour in your application's layout**\
In your layout file, add these lines:

```vue
<exemple-tour />

<script setup lang="ts">
import ExampleTour from '<file_path>/ExampleTour.vue';
</script>
```

<br>
<br>

**Use refs to access the tour and launch it**

```vue
<template>
	<o-page title="Tour">
		<o-button id="target1" color="info" @click="startTour">
			Start the tour
		</o-button>
	</o-page>
</template>

<script setup lang="ts">
import { useTour } from 'lib';

// Launch the tour
function startTour() {
	useTour('_tour').start();
}
</script>
```

::: tip
It is possible to start the tour on a specific step. To do so, simply add the desired index as a parameter when calling the `useTour('_tour').start(2)` function.
:::
