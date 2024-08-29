<template>
	<component
		:is="collapsible ? 'details' : 'section'"
		:ref="setup._el"
		:open="!collapsed"
		class="orion-section"
		:class="`orion-section--${gap}`">
		<component
			:is="collapsible ? 'summary' : 'div'"
			v-if="title || subtitle || $slots.actions"
			class="orion-section__header"
			:class="[
				collapsible ? `orion-section__header--collapsible` : null,
			]">
			<div>
				<h3
					v-if="title"
					class="orion-section__title">
					{{ title }}
					<orion-icon
						v-if="collapsible"
						:icon="setup.isCollapsed ? 'chevron_down' : 'chevron_up'"
						class="orion-section__title-chevron"/>
				</h3>
				<h4
					v-if="subtitle"
					class="orion-section__subtitle">
					{{ subtitle }}
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
				align ? `orion-section__content--align` : undefined,
				align ? `orion-section__content--align-${align}` : undefined,
			]">
			<slot/>
		</div>
	</component>
</template>

<script setup lang="ts">
import './OrionSection.less';
import OrionSectionSetupService from './OrionSectionSetupService';
import OrionIcon from 'packages/Icon/src/OrionIcon.vue';
import type { OrionSectionProps, OrionSectionEmits } from './OrionSectionSetupService';
const emits = defineEmits<OrionSectionEmits>() as OrionSectionEmits;
const props = withDefaults(defineProps<OrionSectionProps>(), OrionSectionSetupService.defaultProps);
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
