<template>
	<div class="row row--grid">
		<div class="col-sm-9">
			<o-phone
				v-model="phone"
				flag
				label="Classic"/>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const phone = ref<Orion.Phone>({ phoneCountryCode: 'FR' });
</script>

@hl {12}

@lang:en
### Flag

With the prop `flag` you can display a flag in your select element.
@lang

@lang:fr
### Drapeau

Avec la prop `flag` un drapeau sera ajouté dans l'encadrer comportant le code ISO du pays sélectionné.
@lang
