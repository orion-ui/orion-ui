<template>
	<div class="row row--gutter row--middle">
		<div class="col-sm-6">
			<o-select
				v-model="state.flat"
				label="Select with favorite"
				:options="optionsFlat"
				:multiple="state.multiple"
				:favorites-options="optionsFlat.slice(1, 2)"
				clearable/>
		</div>
		<div class="col-sm-6">
			<pre>{{ state.flat }}</pre>
		</div>

		<div class="col-sm-6">
			<o-select
				v-model="state.flat"
				label="Favorite with icon"
				:options="optionsFlat"
				:multiple="state.multiple"
				:favorites-options="optionsFlat.slice(1, 2)"
				show-favorite-icon
				clearable/>
		</div>
		<div class="col-sm-6">
			<pre>{{ state.flat }}</pre>
		</div>

		<div class="col-sm-6">
			<o-select
				v-model="state.flat"
				label="Favorite icon set"
				:options="optionsFlat"
				:multiple="state.multiple"
				:favorites-options="optionsFlat.slice(1, 2)"
				show-favorite-icon
				favorite-icon="heart_01"
				clearable/>
		</div>
		<div class="col-sm-6">
			<pre>{{ state.flat }}</pre>
		</div>
	</div>

	<hr>

	<o-toggle
		v-model="state.multiple"
		label="Multiple"/>
</template>

<script setup lang="ts">
import { reactive, watch } from 'vue';
import { getUid } from 'lib';
import { faker } from '@faker-js/faker';

function seedOptions (qty = 5) {
	const items = [];
	for (let index = 0; index < qty; index++) {
		items.push({
			id: getUid(),
			value: faker.music.songName(),
		});
	}
	return items;
}

const optionsFlat = seedOptions().map(x => x.value);
const state = reactive({
	flat: optionsFlat[0] as Undef<string>,
	multiple: false,
});

watch(() => state.multiple, () => {
	state.flat = undefined;
});
</script>

@hl {38}

@lang:en
### Favorites options

You can display some options in the head of the select with `favorites-options`.

:::warning Favorites options type
Favorite options are given through the `favorites-options` props.

They are compared with the classic options to generate an ordered list; the two lists must have a strictly similar object type.
The list of options can contain favorite options, but duplicates will be handled when the select is created.
:::

:::tip Icon favorite option
You can use the `show-favorite-icon` prop to display a default icon, or even choose one with the `favorite-icon` prop.
:::
@lang

@lang:fr
### Options favorites

Vous pouvez choisir d'afficher certaines options en premières grâce à `favorites-options`.

:::warning Type des options favorites
Les options favorites sont données à travers la props `favorites-options`.

Elles sont comparées aux options classiques afin de générer une liste ordonnée, il faut que les deux listes aient un type d'objet strictement similaire.
La liste d'options peut contenir les options favorites, les doublons seront gérés lors de la création du select.
:::

:::tip Icône option favorite
Vous pouvez utiliser la prop `show-favorite-icon` pour afficher une icône par défaut ou même en choisir une avec la prop `favorite-icon`.
:::
@lang
