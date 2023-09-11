<template>
	<o-button
		id="tour1"
		color="info"
		@click="startTour">
		Let's start a tour !
	</o-button>
</template>


<script setup lang="ts">
import { useTour } from 'lib';

function startTour () {
	useTour('tour').start();
}
</script>

@lang:en
## Tour

**You can see how to create a complete tour in [this section](#Example).**
@lang

@lang:fr
## Tour
**Vous pouvez trouver un exemple de création de tour dans [cette section](#comment-creer-un-tour).**
@lang
