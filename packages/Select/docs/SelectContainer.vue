<template>
	<div class="flex jc-c">
		<o-select
			v-model="data"
			:options="options"
			:dropdown-options="{ placement: 'right' }">
			<o-chips>
				{{ data ?? 'Click me' }}
			</o-chips>
		</o-select>
	</div>
</template>

<script setup lang="ts">
import { ref } from 'vue';


const data = ref(null);
const options = [
	'option 1',
	'option 2',
	'option 3',
	'option 4',
	'option 5',
];
</script>

@hl {6-9}

@lang:en
### Use another container for the dropdown

Instead of using an input, you can use a custom element as the dropdown trigger by using the `default` slot.
Use `dropdown-options` prop to configure the dropdown. (see [Floating Vue for more infos](https://floating-vue.starpad.dev/api/))
@lang

@lang:fr
### Utiliser un autre conteneur pour le dropdown

Au lieu d'utiliser un input, vous pouvez utiliser un élément personnalisé comme déclencheur du dropdown en utilisant le `default` slot.
Il est possible de configurer le dropdown avec la prop `dropdown-options`. (voir [Floating Vue pour plus d'infos](https://floating-vue.starpad.dev/api/))

@lang
