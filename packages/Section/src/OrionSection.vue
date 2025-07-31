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
						:icon="collapsed ? 'chevron_down' : 'chevron_up'"
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
const collapsed = defineModel<boolean>('collapsed', { default: false });
const setup = new OrionSectionSetupService(props, emits, collapsed);
defineExpose(setup.publicInstance);

/** Doc
 * @doc vModel/collapsed if the prop `collapsible` is set to `true`, defines this initial state
 * @doc/fr vModel/collapsed si la prop `collapsible` est à `true`, déinit l'état initial
 *
 * @doc slot/default the content of the section
 * @doc/fr slot/default contenu de la section
 *
 * @doc slot/actions actions of the section
 * @doc/fr slot/actions actions de la section
 */
</script>
