<template>
	<div class="flex g-72 jc-c">
		<div>
			<o-checkbox
				v-model="checkValue"
				label="Single value"/>
			<pre>{{ checkValue }}</pre>
		</div>
		<div>
			<o-checkbox
				v-model="multipleValue"
				multiple
				input-value="option1"
				label="Option 1"/>
			<o-checkbox
				v-model="multipleValue"
				multiple
				input-value="option2"
				label="Option 2"/>
			<o-checkbox
				v-model="multipleValue"
				multiple
				input-value="option3"
				label="Option 3"/>
			<pre>{{ multipleValue }}</pre>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const checkValue = ref(true);
const multipleValue = ref(['option1']);
</script>

@hl {5,11-12,16-17,21-22}

@lang:en
### Value

With the `multiple` prop you can use an array as the value of the checkbox, and select multiple options.
@lang

@lang:fr
### Valeur

Avec la prop `multiple` il est possible de passer un tableau comme valeur, et donc sélectionner plusieurs options.
@lang
