<template>
	<div
		:ref="setup._el"
		class="orion-card"
		:class="[
			`orion-card--${setup.props.size}`,
			`orion-card--selected-${setup.props.selectedColor}`,
			{ 'orion-card--clickable': !!$attrs.onClick },
			{ 'orion-card--selected': setup.props.selected },
			{ 'orion-card--no-elevation': hoverElevation <= 0 },
			( setup.props.gradient ? `orion-card--gradient-${setup.props.gradient}` : '' ),
		]"
		:style="`--hoverElevation: ${hoverElevation}`">
		<div
			v-if="$slots.poster"
			class="orion-card__poster">
			<slot name="poster"/>
		</div>

		<div
			v-if="$slots.header || setup.props.title"
			class="orion-card__header"
			:class="[
				{ 'orion-card__header--lined': setup.props.headerLine },
			]"
			@click="$emit('header-click')">
			<h4
				v-if="setup.props.title"
				class="orion-card__title">
				{{ setup.props.title }}
			</h4>
			<slot name="header"/>
		</div>

		<div
			class="orion-card__body"
			@click="$emit('body-click')">
			<slot/>
		</div>

		<div
			v-if="$slots.actions"
			class="orion-card__actions"
			:class="[
				{ 'orion-card__actions--lined': setup.props.actionsLine },
			]">
			<slot name="actions"/>
		</div>

		<div class="orion-card__selected">
			<svg
				class="marker"
				viewBox="0 0 90 90">
				<circle
					cx="105"
					cy="105"
					r="45"/>
			</svg>
			<svg
				class="check"
				viewBox="0 0 12 12">
				<polyline points="1.5 6 4.5 9 10.5 1"/>
			</svg>
		</div>
	</div>
</template>

<script setup lang="ts">
import './OrionCard.less';
import OrionCardSetupService from './OrionCardSetupService';
const props = defineProps(OrionCardSetupService.props);
const setup = new OrionCardSetupService(props);
// eslint-disable-next-line func-call-spacing
defineEmits<{
	(e: 'header-click'): void,
	(e: 'body-click'): void,
}>();
defineExpose(setup.publicInstance);

/** Doc
 *
 * @doc slot/poster adds a poster at the top of the card, without any padding
 * @doc/fr slot/poster ajoute un poster en haut de la carte, sans aucun padding
 *
 * @doc slot/header the header of the card
 * @doc/fr slot/header en-tête de la carte
 *
 * @doc slot/actions actions of the card, on the footer of the card
 * @doc/fr slot/actions actions au bas de la carte
 *
 * @doc slot/default the content of the card
 * @doc/fr slot/default contenu de la carte

 *
 * @doc event/header-click/desc emitted on header click
 * @doc/fr event/header-click/desc émis lors du click sur l'en-tête
 * @doc event/body-click/desc emitted on body click
 * @doc/fr event/body-click/desc émis lors du click sur le body de la carte
 */
</script>
