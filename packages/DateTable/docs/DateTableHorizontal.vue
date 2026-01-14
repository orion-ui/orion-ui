<template>
	<o-date-table
		v-model="date"
		horizontal
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
### Horizontal variant
You can display the date table in a horizontal way by adding the `horizontal` prop to the component.
Primarily designed for desktop use, it can also be used on mobile.
@lang

@lang:fr
### Variante horizontale
Vous pouvez afficher le tableau des dates de manière horizontale en ajoutant la prop `horizontal` au composant.
Principalement conçu pour une utilisation sur ordinateur, il peut également être utilisé sur mobile.
@lang
