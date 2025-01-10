<template>
	<div class="row">
		<div class="col-sm-6">
			<o-datepicker
				v-model:range="dateRange.week"
				label="Date"
				type="week"
				:value-display-format="customValueDisplay"
				clearable/>
		</div>
	</div>
</template>

<script setup lang="ts">
import { useMonkey } from 'services';
import { reactive } from 'vue';

const dateRange = reactive({ week: null });

function customValueDisplay (val: Orion.DateRange) {
	if (val.start) return `Week 
	<em>number</em> 
	<strong class="text--warning">${val.weekNumber}</strong>
	starting the ${ useMonkey(val.start)?.toReadable()}
	`;
}
</script>


@hl {8,19-25}

@lang:en
### Custom value display

Customize how the datepicker value will be rendered with the `value-display-format` prop.
@lang

@lang:fr
### Affichage personnalisé de la valeur

Personnalisez l'affichage de la valeur avec la prop `value-display-format`.
@lang
