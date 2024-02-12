<template>
<h1>Services</h1>

<div class="row row--grid-xs">
	<div v-for="(service, serviceName) in services" :key="serviceName" class="col-sm-6">
		<router-link class="tile tile--grey-lighter" :to="service[frontmatter.lang as keyof typeof service].url">
			<h3>{{ serviceName }}</h3>
			{{ service[frontmatter.lang as keyof typeof service].desc }}
		</router-link>
	</div>
</div>
</template>

<script setup lang="ts">
import { usePageFrontmatter } from 'vuepress/client';

const frontmatter = usePageFrontmatter()

const services = {
	Country: {
		'en-US': {
			url: `/services/Country.html`,
			desc: `Get informations about countries like their code (2 letters format) and their areaCode for the phone numbers`,
		},
		'fr': {
			url: `/fr/services/Country.html`,
			desc: `Récupérer des informations sur les pays comme leur code (format 2 lettres) et leur indicatif pour les numéros de téléphone`,
		}
	},
	Monkey: {
		'en-US': {
			url: `/services/Monkey.html`,
			desc: `Allows you to benefit from Orion Monkey Patching for prototypes like Array, Number, Date, or String but without actually using it`,
		},
		'fr': {
			url: `/fr/services/Monkey.html`,
			desc: `Permet de bénéficier du Monkey Patching d'Orion pour les prototypes comme Array, Number, Date, ou String mais sans vraiment l'utiliser`,
		}
	},
	Overlay: {
		'en-US': {
			url: `/services/Overlay.html`,
			desc: `A quick and easy way to show or hide the main overlay wich is used by asides and modals components`,
		},
		'fr': {
			url: `/fr/services/Overlay.html`,
			desc: `Un moyen simple et rapide d'afficher ou masquer l'overlay global qui est utilisé par les asides et les modales par exemple`,
		}
	},
	Prompt: {
		'en-US': {
			url: `/services/Prompt.html`,
			desc: `A quick and easy way to display a modal with an input field and confirm/cancel buttons`,
		},
		'fr': {
			url: `/fr/services/Prompt.html`,
			desc: `Un moyen simple et rapide d'afficher une modale avec un champ de saisie, ainsi que des boutons valider et annuler`,
		}
	},
	Validation: {
		'en-US': {
			url: `/services/Validation.html`,
			desc: `Simple field or form validation functions for every situation`,
		},
		'fr': {
			url: `/fr/services/Validation.html`,
			desc: `Des fonctionnalités de validation de champ ou de formulaire en tout simplicité, pour chaque situation`,
		}
	},
}
</script>
