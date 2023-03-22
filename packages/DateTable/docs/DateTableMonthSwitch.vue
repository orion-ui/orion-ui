<template>
	<o-date-table
		v-model="date"
		:can-go-prev-month="false"
		disable-month-and-year/>
</template>

<script setup lang="ts">
import { ref } from 'vue';
const date = ref(new Date());
</script>

@hl {4-5}

@lang:en
### Table navigation

You can disable the switch to the previous and the next month with the props `canGoPrevMonth` and `canGoNextMonth`.

It is also possible to hide the month and year selection with the prop `disableMonthAndYear`
@lang

@lang:fr
### Navigation

Il est possible de bloquer la navigation vers le mois précédent ou le mois suivant avec les props `canGoPrevMonth` et `canGoNextMonth`.

Il est aussi possible de masquer la sélection du mois et de l'année avec la prop `disableMonthAndYear`.
@lang
