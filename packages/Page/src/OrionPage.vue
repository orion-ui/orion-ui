<template>
	<div class="orion-page">
		<div
			v-if="setup.props.title || $slots.actions"
			class="orion-page__header"
			:class="{ 'orion-page__header--unwrap': setup.props.titleEllipsis }">
			<div class="orion-page__title-subtitle">
				<h1
					v-if="setup.props.title"
					class="orion-page__title"
					:class="{ 'orion-page__title--ellipsis': setup.props.titleEllipsis }">
					{{ setup.props.title }}
				</h1>
				<h3
					v-if="setup.props.subtitle"
					class="orion-page__subtitle"
					:class="{ 'orion-page__subtitle--ellipsis': setup.props.subtitleEllipsis }">
					{{ setup.props.subtitle }}
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
				'orion-page__subactions--sticky': setup.props.stickySubactions,
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
const props = defineProps(OrionPageSetupService.props);
const setup = new OrionPageSetupService(props);
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
