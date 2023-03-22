<template>
	<div class="row row--gutter row--middle">
		<div class="col-sm-6">
			<o-select
				v-model="state.flat"
				label="Array of strings"
				:options="optionsFlat"
				:multiple="state.multiple"
				clearable/>
		</div>
		<div class="col-sm-6">
			<pre>{{ state.flat }}</pre>
		</div>

		<div class="col-sm-6">
			<o-select
				v-model="state.object"
				label="Array of objects"
				:options="optionsObject"
				:multiple="state.multiple"
				clearable
				track-key="id"
				display-key="value"/>
		</div>
		<div class="col-sm-6">
			<pre>{{ state.object }}</pre>
		</div>

		<div class="col-sm-6">
			<o-select
				v-model="state.objectValueKey"
				label="Value key"
				:options="optionsObject"
				:multiple="state.multiple"
				clearable
				track-key="id"
				display-key="value"
				value-key="id"/>
		</div>
		<div class="col-sm-6">
			<pre>{{ state.objectValueKey }}</pre>
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
const optionsObject = seedOptions();
const state = reactive({
	flat: optionsFlat[0] as Undef<string>,
	object: undefined,
	objectValueKey: undefined,
	multiple: false,
});

watch(() => state.multiple, () => {
	state.flat = undefined;
	state.object = undefined;
	state.objectValueKey = undefined;
});
</script>

@hl {38}

@lang:en
### Options format

The options can be a flat array or an array of objects.

:::warning Array of objects
If you use an array of objects you have to provide a `track-key` prop which will be used internally to loop over options.
:::

:::tip The value format when using array of objects
If you use an array of objects you can also provide a `value-key` prop.

By doing so, when selecting an option, the `v-model` value will be the value of the option's key instead of the whole object.
:::
@lang

@lang:fr
### Format des options

Les options peuvent être un tableau plat, ou un tableau d'objets.

:::warning Tableau d'objets
Si vous utilisez un tableau d'objets vous devrez fournir la prop `track-key` qui sera utilisée en interne pour boucler sur la liste des options.
:::

:::tip Le format de la valeur en utilisant un tableau d'objets
Si vous utilisez un tableau d'objets vous pouvez également fournir la prop `value-key`.

En faisant ça, lorsque vous sélectionnerez une option, la valeur de `v-model` sera la valeur de la propriété de l'objet plutôt que l'objet entier.
:::
@lang
