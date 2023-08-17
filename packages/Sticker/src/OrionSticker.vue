<template>
	<div
		:ref="setup._el"
		class="orion-sticker"
		:class="[
			`orion-sticker--selected-${setup.props.selectedColor}`,
			{ 'orion-sticker--muted': setup.props.muted },
			{ 'orion-sticker--clickable': !!$attrs.onClick },
			{ 'orion-sticker--selected': setup.props.selected },
			{ 'orion-sticker--no-elevation': hoverElevation <= 0 },
		]">
		<div
			v-if="$slots.thumbnail"
			class="orion-sticker__thumbnail">
			<slot name="thumbnail"/>
		</div>

		<div class="orion-sticker__content">
			<h4
				v-if="setup.props.title"
				class="orion-sticker__title">
				{{ setup.props.title }}
			</h4>

			<slot/>
		</div>

		<div
			v-if="!setup.props.hideActions && $slots.actions"
			class="orion-sticker__actions">
			<slot name="actions"/>
		</div>

		<div class="orion-sticker__selected">
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
import './OrionSticker.less';
import OrionStickerSetupService from './OrionStickerSetupService';
const props = defineProps(OrionStickerSetupService.props);
const setup = new OrionStickerSetupService(props);
defineExpose(setup.publicInstance);

/** Doc
 * @doc slot/default sticker's content
 * @doc/fr slot/default contenu du sticker
 *
 * @doc slot/thumbnail sticker's thumbnail content on the left of the sticker
 * @doc/fr slot/thumbnail contenu de la vignette à gauche du sticker
 *
 * @doc slot/actions sticker's actions
 * @doc/fr slot/actions actions du sticker
 */
</script>

<style lang="less">
.orion-sticker:not(.orion-sticker--muted):not(.orion-sticker--no-elevation):hover {
	--elevation: calc(1rem * v-bind(hoverElevation));
	--shadowColor: rgba(0, 0, 0, calc(0.03 * (1 + v-bind(hoverElevation) / 5)));

	body:not(.istouch) & {
		z-index: 1;
		transform: translate3d(0, -0.125rem, 0);
		box-shadow:
			0 calc(var(--elevation) / 8) calc(var(--elevation) / 8) var(--shadowColor),
			0 calc(var(--elevation) / 4) calc(var(--elevation) / 4) var(--shadowColor),
			0 calc(var(--elevation) / 2) calc(var(--elevation) / 2) var(--shadowColor),
			0 var(--elevation) var(--elevation) var(--shadowColor),
			0 calc(var(--elevation) * 2) calc(var(--elevation) * 2) var(--shadowColor);
	}
}
</style>
