<template>
	<div class="row row--grid row--middle">
		<o-button
			id="stepNext"
			outline
			color="info"
			@click="startTour(6)">
			Step with End object
		</o-button>
	</div>
</template>


<script setup lang="ts">
import { useTour } from 'lib';


function startTour (index = 0) {
	useTour('_tourProps').start(index);
}

</script>

@lang:en
### Previous / Next / End

`previous`, `next` and `end` objects have a stucture like :

```
{
	label: string
	callback: Function
	clean: Function
}
```

The `callback` function is called when the button is clicked, and the `clean` function is called just after the tour index incrementation.
@lang

@lang:fr
### Attributs Previous / Next / End

Les props `previous`, `next` and `end` sont des objets de ce format :

```
{
	label: string
	callback: Function
	clean: Function
}
```

`label` correspond au texte qui sera présent sur le bouton.\
La fonction `callback` sera appelée au moment du click sur le bouton correspond, et la fonction `clean` sera appelée juste après l'incrémentation
de l'index du tour.
@lang

