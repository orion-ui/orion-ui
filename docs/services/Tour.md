---
lang: en-US
title: Tour service
description:
---

# Tour service

The Tour service must be used with the `<o-tour>` component. This service gives all the functions to register, start or stop a tour.
To see an example, go to the [Tour component](../components/OrionTour.md)

<service-preview />

## How to create a tour ?

**Create a tour file `TourExample.vue`.** \
 This file will contain all the different steps of the tour.

```vue
<template>
	<o-tour ref="_tour">
		<o-tour-step target="tour1">
			<div>Step content for this step</div>
		</o-tour-step>

		<o-tour-step> </o-tour-step>

		....
	</o-tour>
</template>

<script setup lang="ts">
import { useTour } from 'lib';
import { onMounted, ref } from 'vue';

const _tour = ref<RefDom<OrionTour>>();

//Register your tour with the tour service and its ref
onMounted(() => {
	useTour('_tour', _tour.value);
});
</script>
```

**Register the tour in your app's layout**

In your layout file add these lines

```vue
<tour-example />

<script setup lang="ts">
import TourExample from '<file_path>/TourExample.vue';
</script>
```

**Use refs to access your tour and launch it !**

```vue
<template>
	<o-page title="Tour">
		<o-button id="target1" color="info" @click="startTour">
			Start Tour !
		</o-button>
	</o-page>
</template>

<script setup lang="ts">
import { useTour } from 'lib';

// Accessing tour and starting it
function startTour() {
	useTour('_tour').start();
}
</script>
```

::: tip
You can choose to start the tour on a specific step, just add the index as a parameter when calling `useTour('_tour').start(2)`
:::
