<template>
	<div
		:ref="setup._el"
		class="orion-card"
		:class="[
			`orion-card--${size}`,
			`orion-card--selected-${selectedColor}`,
			{ 'orion-card--clickable': !!$attrs.onClick },
			{ 'orion-card--selected': selected },
			{ 'orion-card--no-elevation': hoverElevation <= 0 },
		]"
		:style="`--hoverElevation: ${hoverElevation}`">
		<div
			v-if="$slots.poster"
			class="orion-card__poster">
			<slot name="poster"/>
		</div>

		<div
			v-if="$slots.header || title"
			class="orion-card__header"
			@click="emits('header-click')">
			<div
				v-if="title || subtitle"
				class="orion-card__header-content"
				:class="{ 'orion-card__header-content--lined': headerLine }">
				<div class="orion-card__header-content-wrapper">
					<div class="orion-card__header-content-title">
						<h4
							v-if="title"
							class="orion-card__title">
							{{ title }}
						</h4>
						<h5
							v-if="subtitle"
							class="orion-card__subtitle">
							{{ subtitle }}
						</h5>
					</div>
					<slot name="header-actions"/>
				</div>
				<slot name="header"/>
			</div>
		</div>

		<div
			class="orion-card__body"
			@click="emits('body-click')">
			<slot/>
		</div>

		<div
			v-if="$slots.actions"
			class="orion-card__actions">
			<div
				class="orion-card__actions-content"
				:class="{ 'orion-card__actions-content--lined': actionsLine }">
				<slot name="actions"/>
			</div>
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
import { OrionCardSetup, type OrionCardEmits, type OrionCardProps } from './OrionCardSetup';
const emits = defineEmits<OrionCardEmits>() as OrionCardEmits;
const props = withDefaults(defineProps<OrionCardProps>(), OrionCardSetup.defaultProps);
const setup = new OrionCardSetup(props, emits);
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
 */
</script>
