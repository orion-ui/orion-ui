<template>
	<o-paginate
		bind-router-page="page"
		:total="state.list.length"
		variant="detailed"/>

	<hr>

	<o-list
		bind-router-page="page"
		:total="state.list.length"
		:list="state.list"
		use-auto-pagination
		:use-pagination-bottom="false"
		:use-pagination-top="false">
		<template #default="{ item, selected }">
			<o-card
				:selected="selected"
				:title="item.title">
				{{ item.description }}
			</o-card>
		</template>
	</o-list>
</template>

<script setup lang="ts">
import { faker } from '@faker-js/faker';
import { getUid } from 'lib';
import { reactive } from 'vue';

const state = reactive({ list: seedList() });

function seedList (qty = 36) {
	const items = [];
	for (let index = 0; index < qty; index++) {
		items.push({
			id: getUid(),
			title: faker.music.songName(),
			description: faker.lorem.sentence(),
		});
	}

	return items;
}
</script>

@hl {3,11}

@lang:en
## Bind with Vue Router

By setting the `bind-router-page` prop, you enable binding between Vue Router and the pagination.

For example, if you use `bind-router-page="page"`, the component will automatically update the URL query parameters when navigating through pages using the defined key "page".

You can also specify the `bind-router-size` prop for further customization (the default value is "size").
@lang

@lang:fr
## Bind with Vue Router

En définissant la prop `bind-router-page`, vous activez la liaison entre Vue Router et la pagination.

Par exemple, si vous utilisez `bind-router-page="page"`, le composant mettra automatiquement à jour les paramètres de requête (query parameters) de l’URL lors de la navigation entre les pages en utilisant la clé spécifiée "page".

Vous pouvez également spécifier la prop `bind-router-size` pour davantage de personnalisation (la valeur par défaut est "size").
@lang
