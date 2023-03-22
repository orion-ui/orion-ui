<template>
	<div class="flex jc-fs">
		<o-datepicker
			v-model="date"
			label="Date"
			:min-date="today"
			:max-date="maxDate"
			clearable/>
	</div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const date = ref(new Date());
const today = new Date();
const maxDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 7);
</script>

@hl {6-7}

@lang:en
### Min and max date

Define the minimum and the maximum dates which can be selected with the `min-date` and `max-date` props.
@lang

@lang:fr
### Date minimum & maximum

Définissez l'interval dans lequel la date peut être selectionnée avec les props `min-date` et `max-date`.
@lang
