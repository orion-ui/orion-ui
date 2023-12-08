<template>
	<o-date-table
		v-model:multiple="state.multiple"
		type="multiple"/>
</template>

<script setup lang="ts">
import { reactive } from 'vue';

const state = reactive({ multiple: [] });

</script>

<style lang="less" scoped>
.playground-form {
	margin-top: 3rem;
}
</style>

@hl {3-4}

@lang:en
### Multiple dates

Display multiple selected dates by setting the **type** props with the value `multiple` and using the `v-model:multiple`.
@lang

@lang:fr
### Dates multiples
Affichez plusieurs dates sélectionnées en définissant la props **type** avec la valeur `multiple` et un utilisant `v-model:multiple`.
@lang

