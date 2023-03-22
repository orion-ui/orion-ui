<template>
	<div class="row row--gutter">
		<div class="col-sm-6">
			<o-select
				v-model="state.single"
				label="Single"
				v-bind="selectBind"/>

			<o-select
				v-model="state.single"
				label="Single searchable"
				v-bind="selectBind"
				class="mt-sm"
				searchable/>

			<o-select
				v-model="state.single"
				label="Single autocomplete"
				v-bind="selectBind"
				class="mt-sm"
				autocomplete/>

			<pre
				v-if="state.single"
				class="pa-xs">Value:<br>{{ state.single }}</pre>
		</div>

		<div class="col-sm-6">
			<o-select
				v-model="state.multiple"
				label="Multiple"
				v-bind="selectBind"
				multiple/>

			<o-select
				v-model="state.multiple"
				label="Multiple searchable"
				v-bind="selectBind"
				class="mt-sm"
				multiple
				searchable/>

			<o-select
				v-model="state.multiple"
				label="Multiple autocomplete"
				v-bind="selectBind"
				class="mt-sm"
				multiple
				autocomplete/>

			<pre
				v-if="state.multiple"
				class="pa-xs">Value:<br>{{ state.multiple }}</pre>
		</div>
	</div>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import { faker } from '@faker-js/faker';

function seedOptions (qty = 10) {
	const items = [];
	for (let index = 0; index < qty; index++) {
		items.push(faker.music.songName());
	}
	return items;
}

const selectBind = {
	options: seedOptions(),
	clearable: true,
};

const state = reactive({
	single: undefined,
	multiple: undefined,
});
</script>

@hl {14,34}

@lang:en
### Single and multiple, searchable and autocomplete

By default, you can only select one of the options.

The prop `multiple` allows you to select several options.

The prop `searchable` adds a search field on top of the options list to filter it.

The prop `autocomplete` removes the carret and use the input area as search field.
@lang

@lang:fr
### Simple et multiple, recherche et auto-complétion

Par défaut, vous pouvez seulement sélectionner une option.

La prop `multiple` vous permet de choisir plusieurs options.

La prop `searchable` affiche un champ de recherche en haut de la liste d'options pour la filtrer.

La prop `autocomplete` retire le chevron et utilise la zone de l'input comme champ de recherche.
@lang
