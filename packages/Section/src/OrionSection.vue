<template>
	<component
		:is="collapsible ? 'details' : 'section'"
		:ref="setup._details"
		:open="!collapsed"
		class="orion-section"
		:class="`orion-section--${setup.props.gap}`">
		<component
			:is="collapsible ? 'summary' : 'div'"
			v-if="setup.props.title || setup.props.subtitle || $slots.actions"
			class="orion-section__header"
			:class="[
				setup.props.collapsible ? `orion-section__header--collapsible` : null,
			]">
			<div>
				<h3
					v-if="setup.props.title"
					class="orion-section__title">
					{{ setup.props.title }}
					<orion-icon
						v-if="collapsible"
						:icon="setup.isCollapsed ? 'chevron_down' : 'chevron_up'"
						class="orion-section__title-chevron"/>
				</h3>
				<h4
					v-if="setup.props.subtitle"
					class="orion-section__subtitle">
					{{ setup.props.subtitle }}
				</h4>
			</div>

			<div
				v-if="$slots.actions"
				class="orion-section__actions">
				<slot name="actions"/>
			</div>
		</component>

		<div
			:ref="setup._content"
			class="orion-section__content"
			:class="[
				setup.props.align ? `orion-section__content--align` : undefined,
				setup.props.align ? `orion-section__content--align-${setup.props.align}` : undefined,
			]">
			<slot/>
		</div>
	</component>
</template>

<script setup lang="ts">
import './OrionSection.less';
import OrionSectionSetupService from './OrionSectionSetupService';
import OrionIcon from 'packages/Icon/src/OrionIcon.vue';
const emits = defineEmits<{(e: 'update:collapsed', val: boolean): void}>();
const props = defineProps(OrionSectionSetupService.props);
const setup = new OrionSectionSetupService(props, emits);
defineExpose(setup.publicInstance);

/** Doc
 * @doc slot/default the content of the section
 * @doc/fr slot/default contenu de la section
 *
 * @doc slot/actions actions of the section
 * @doc/fr slot/actions actions de la section
 *
 * @doc event/update:collapsed/desc update the v-model:collapse value
 * @doc/fr event/update:collapsed/desc met à jour la valeur de la prop v-model:collapse
 */
</script>
