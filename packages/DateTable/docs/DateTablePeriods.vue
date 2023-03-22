<template>
	<o-date-table
		v-model="date"
		:periods="periods"/>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const date = ref(new Date());
const today = new Date();

const periods: Orion.Period[] = [
	{
		isStart: false,
		isEnd: false,
		start: new Date(),
		end: new Date(today.setDate(today.getDate()+7)),
		label: 'period 1',
		color: 'info',
		specific: [],
	},
	{
		isStart: false,
		isEnd: false,
		start: new Date(today.setDate(today.getDate()+3)),
		end: new Date(today.setDate(today.getDate()+6)),
		label: 'period 2',
		color: 'danger',
		specific: [
			{
				color: 'warning',
				date: new Date(today.setDate(today.getDate()-1)),
				exclude: true,
			},
			{
				color: 'warning',
				date: new Date(today.setDate(today.getDate()-3)),
				exclude: false,
			},
		],
	},
];
</script>

@hl {4,13-45}

@lang:en
### Periods
You can display periods on a table with the attibute `periods` which takes `Periods[]` as argument.
You can easily hide a period by clicking on its name on the bottom of the table.

Exceptions can also be set during a period with the prop `specific` within the period object.
@lang

@lang:fr
### Périodes

Il est possible d'afficher des périodes grâce à la prop `periods` qui prend une valeur de type `Periods[]`\
Une période peut être cachée en cliquant sur son nom au niveau de la légende dans le bas de la table.

Des exceptions peuvent aussi être mises en place pendant une période à travers la prop `specific` de l'objet représentant la période.
Cette exeption s'affichera donc différement au sein de la période.
@lang
