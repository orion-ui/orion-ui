<template>
	<div class="row row--grid">
		<div class="col-sm-4">
			<o-card
				title="Card with actions slot"
				header-line
				actions-line
				:selected="selected">
				Duis elit dolore elit eiusmod ipsum ex cillum eu eiusmod.
				Tempor ipsum do magna qui.
				Veniam est ex ullamco deserunt elit id anim tempor.

				<template #actions>
					<o-icon
						icon="check"
						ripple="info"
						@click="selected = !selected"/>

					<o-icon
						icon="play_arrow"
						ripple="success"
						@click="triggerNotif()"/>
				</template>
			</o-card>
		</div>

		<div class="col-sm-4">
			<o-card
				title="Card with poster slot">
				Duis elit dolore elit eiusmod ipsum ex.
				Veniam est ex ullamco deserunt elit id anim tempor.

				<template #poster>
					<img
						style="height:6rem"
						src="https://picsum.photos/id/1004/200">
				</template>
			</o-card>
		</div>

		<div class="col-sm-4">
			<o-card
				title="Card with header slot"
				header-line>
				Duis elit dolore elit eiusmod ipsum ex.
				Veniam est ex ullamco deserunt elit id anim tempor.
				Duis elit dolore elit eiusmod ipsum ex.
				Veniam est ex ullamco deserunt elit id anim tempor.

				<template #header>
					Lorem Ipsum
				</template>
			</o-card>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useNotif } from 'lib';

const selected = ref(false);

function triggerNotif () {
	useNotif.info('Nice job !');
}
</script>

@hl {6,7,13-23,33-37,44,50-52}

@lang:en
### Slots

You can use four slots to quickly add content to the card : `default`, `actions`, `header` and `poster`

With `headerLine` and `actionsLine` props you can also delimit the different slots.
@lang

@lang:fr
### Slots

4 slots sont disponibles pour ajouter du contenu facilement à la carte : `default`, `actions`, `header` and `poster`

Avec les props `headerLine` et `actionsLine` il est possible de délimiter les différents slots en ajoutant une ligne de démarcation.
@lang
