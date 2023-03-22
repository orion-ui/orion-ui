<template>
	<div class="flex fd-c g-xs">
		<o-rate
			v-for="(color, index) of colors.slice(0, 4)"
			:key="index"
			:number-of-rates="12"
			:model-value="3"
			:color="color"/>
		<o-rate
			v-for="(color, index) of colors.slice(4)"
			:key="index"
			:number-of-rates="103"
			:model-value="3"
			:color="color">
			<template #default="{ rateNumber }">
				{{ rateNumber }} votes
			</template>
		</o-rate>
	</div>
</template>

<script setup lang="ts">
import { colors } from 'lib';
</script>

@hl {6,12,15-17}

@lang:en
### Rating
You can add the total number of rates with the prop `numberOfRates`
or with the `default` slot which bind `rateNumber`.
@lang

@lang:fr
### Notations
Il est possible d'ajouter le nombre total de notations qui on été effectuées avec la prop `numberOfRates`
ou le slot `default` qui remonte la propriété `rateNumber`.
@lang
