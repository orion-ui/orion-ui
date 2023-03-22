<template>
	<div class="row row--grid">
		<div class="col-sm-6">
			<o-phone
				v-model="phone"
				label="Classic"/>
		</div>
		<div class="col-sm-6">
			<o-phone
				v-model="phoneMobile"
				label="Mobile"
				mobile/>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const phone = ref<Orion.Phone>({ phoneCountryCode: 'FR' });
const phoneMobile = ref<Orion.Phone>({ phoneCountryCode: 'FR' });
</script>

@hl {12}

@lang:en
### Mobile

With the prop `mobile` you can add a field validation to check if the number match a mobile number.

:::warning Looking for contributions
This feature is currently only available for french mobile phone.\
Contributions are welcome for other countries.\
Search for `@contribution` term in the project source code to find where you can add more validation rules.
:::
@lang

@lang:fr
### Mobile

Avec la prop `mobile` une vérification sera effectuée pour vérifier que le numéro entré correspond à un portable.

:::warning Contributions recherchées
Cette fonctionnalité est pour le moment uniquement disponible pour les numéros français.
Les contributions sont bienvenues pour les autres pays.\
Cherchez simplement le terme `@contribution` dans le code source du projet pour voir ou ajouter des règles de validation supplémentaires.
:::
@lang
