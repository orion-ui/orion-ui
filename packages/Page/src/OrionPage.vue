?<template>
	<div
		:ref="setup._el"
		class="orion-page">
		<div
			v-if="title || $slots.actions"
			class="orion-page__header"
			:class="{ 'orion-page__header--unwrap': titleEllipsis }">
			<div class="orion-page__title-subtitle">
				<h1
					v-if="title"
					class="orion-page__title"
					:class="{ 'orion-page__title--ellipsis': titleEllipsis }">
					{{ title }}
				</h1>
				<h3
					v-if="subtitle"
					class="orion-page__subtitle"
					:class="{ 'orion-page__subtitle--ellipsis': subtitleEllipsis }">
					{{ subtitle }}
				</h3>
			</div>
			<div
				v-if="$slots.actions"
				class="orion-page__actions">
				<slot name="actions"/>
			</div>
		</div>

		<div
			v-if="$slots.subactions"
			class="orion-page__subactions"
			:class="{
				'orion-page__subactions--sticky': stickySubactions,
			}">
			<slot name="subactions"/>
		</div>

		<div class="orion-page__content">
			<slot/>
		</div>
	</div>
</template>

<script setup lang="ts">
import './OrionPage.less';
import OrionPageSetupService from './OrionPageSetupService';
import type { OrionPageProps, OrionPageEmits } from './OrionPageSetupService';
const emits = defineEmits<OrionPageEmits>() as OrionPageEmits;
const props = withDefaults(defineProps<OrionPageProps>(), OrionPageSetupService.defaultProps);
const setup = new OrionPageSetupService(props, emits);
defineExpose(setup.publicInstance);

/** Doc
 *  @doc slot/subactions secondary actions, below the main actions
 *  @doc/fr slot/subactions actions secondaires, placées en dessous des actions principales
 *
 * @doc slot/actions actions of the page, on the top right
 * @doc/fr slot/actions actions de la page, situées en haut à droite
 *
 * @doc slot/default the content of the page
 * @doc/fr slot/default contenu de la page
 */
</script>
