<template>
	<div class="row row--gutter">
		<div class="col-sm-6">
			<o-select
				v-model="state.single"
				label="Single"
				clearable
				track-key="id"
				display-key="email"
				fetch-url="https://jsonplaceholder.typicode.com/users"/>
			<pre>{{ state.single }}</pre>
		</div>

		<div class="col-sm-6">
			<o-select
				ref="multiple"
				v-model="state.multiple"
				label="Multiple"
				clearable
				multiple
				track-key="id"
				display-key="value"
				:custom-fetch="customFetch"/>
			<pre>{{ state.multiple }}</pre>
		</div>
	</div>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import { getUid } from 'lib';
import { faker } from '@faker-js/faker';

async function customFetch (searchTerm: string) {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve(seedOptions().filter(x => x.value.toLowerCase().includes(searchTerm.toLowerCase())));
		}, 700);
	});
}

const state = reactive({
	single: undefined,
	multiple: undefined,
});

function seedOptions (qty = 10) {
	const items = [];
	for (let index = 0; index < qty; index++) {
		items.push({
			id: getUid(),
			value: faker.music.songName(),
		});
	}
	return items;
}
</script>

@hl {10,23,34-40}

@lang:en
### Options fetching

You can fetch options from a given URL with the `fetch-url` prop.

You can also use a custom function by using the `custom-fetch` prop, with the **search term** as argument (example below).

Use the `fetchMinSearch` prop to customize the search terms minimum length to trigger the ajax call.

Use the `fetchInitialOptions` prop to provide initial options before the first ajax call.
@lang

@lang:fr
### Chargement des options

Il est possible de récupérer les options depuis une URL avec la prop `fetch-url`.

Vous pouvez également utiliser une fonction personnalisée via la prop `custom-fetch`, avec **les termes de recherche** passés en paramètre (exemple ci-dessous).

Utilisez la prop `fetchMinSearch` pour personnaliser le nombre minimum de caractères pour déclencher l'appel ajax.

Utilisez la prop `fetchInitialOptions` pour fournir un tableau d'options initiales avant le premier appel ajax.
@lang
