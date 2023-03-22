<template>
	<div class="row row--gutter">
		<div class="col-sm-6">
			<o-textarea
				v-model="value"
				label="Clearable"
				clearable/>
		</div>
		<div class="col-sm-6">
			<o-textarea
				v-model="value"
				label="Max length"
				:max-length="120"/>
		</div>
		<div class="col-sm-6">
			<o-textarea
				v-model="value"
				label="Disabled"
				disabled/>
		</div>
		<div class="col-sm-6">
			<o-textarea
				v-model="value"
				label="Readonly"
				readonly/>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
const value = ref(null);
</script>

@hl {7,13,19,25}

@lang:en
### Basic features

With the `clearable` prop, you can clear the field with one click.

You can set a maximal length for the input with the prop `max-length`.

You can also prevent data input with the props `disabled` and `readonly`.
@lang

@lang:fr
### Fonctionnalités basiques

Avec la prop `clearable` il est possible de vider le champ en un clic.

Pour configurer une longueur maximale, il suffit de spécifier une valeur à la prop `max-length`.

Pour empêcher la saisie, les props `disabled` et `readonly` sont disponibles.
@lang
