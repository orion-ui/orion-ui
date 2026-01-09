<template>
	<teleport
		to="#orion-popable-wrapper"
		:disabled="setup.options.programmatic">
		<aside
			:id="`OrionAside-${setup.uid}`"
			:ref="setup._el"
			:style="setup.domStyle"
			class="orion-aside"
			:class="[
				setup.options.customClass,
				`orion-aside--${setup.options.size}`,
				{ 'orion-aside--visible': setup.visible },
			]">
			<div class="orion-aside__poster">
				<div v-if="$slots.poster">
					<slot name="poster"/>
				</div>
				<div
					v-else
					:id="`OrionAside-${setup.uid}__poster`"/>
			</div>

			<div
				v-if="setup.displayHeader"
				:id="`OrionAside-${setup.uid}__header`"
				class="orion-aside__header">
				<div class="orion-aside__header-container">
					<div
						v-if="options.title"
						class="orion-aside__title">
						{{ options.title }}
					</div>
					<slot name="header"/>
				</div>

				<span
					v-if="options.description"
					class="orion-aside__description">
					{{ options.description }}
				</span>
			</div>

			<div
				:id="`OrionAside-${setup.uid}__body`"
				class="orion-aside__body">
				<component
					:is="setup.options.Nested"
					v-if="setup.options.Nested && setup.isMounted"
					v-bind="setup.options.NestedProps"/>

				<slot :close="setup.close.bind(setup)"/>
			</div>

			<div
				:id="`OrionAside-${setup.uid}__actions`"
				:ref="setup._actions"
				class="orion-aside__actions">
				<slot
					name="actions"
					:close="setup.close.bind(setup)"/>
			</div>

			<div
				:id="`OrionAside-${setup.uid}__footer`"
				:ref="setup._footer"
				class="orion-aside__footer">
				<slot
					name="footer"
					:close="setup.close.bind(setup)"/>
			</div>

			<teleport
				defer
				:to="setup.displayHeader
					? `#OrionAside-${setup.uid}__header`
					: `#OrionAside-${setup.uid}__body`">
				<o-button
					v-if="!setup.options.hideClose"
					class="orion-aside__close"
					color="primary"
					nude
					prefix-icon="close"
					@click="setup.close({ keepInQueue: false })"
					@touchend.prevent.stop="setup.close({ keepInQueue: false })"/>
			</teleport>

			<orion-loader :ref="setup._loader"/>
		</aside>
	</teleport>
</template>

<script setup lang="ts">
import { OrionLoader } from 'packages/Loader';
import { provide } from 'vue';
import './OrionAside.less';
import type { OrionAsideEmits, OrionAsideProps } from './OrionAsideSetupService';
import OrionAsideSetupService from './OrionAsideSetupService';
const emits = defineEmits<OrionAsideEmits>() as OrionAsideEmits;
const props = withDefaults(defineProps<OrionAsideProps>(), OrionAsideSetupService.defaultProps);
const slots = defineSlots();
const setup = new OrionAsideSetupService(props, emits, slots);
provide('_aside', setup.publicInstance);
defineExpose(setup.publicInstance);

/** Doc
 * @doc slot/poster useful to display a poster image on aside's top
 * @doc/fr slot/poster utile pour afficher une image de couverture en haut de l'aside
 *
 * @doc slot/actions the actions of the aside
 * @doc/fr slot/actions en-tête de l'aside
 *
 * @doc slot/actions content at the top left of the aside (useful for action's buttons)
 * @doc/fr slot/actions contenu situé en haut à gauche de l'aside (utile pour des boutons d'actions)
 * @doc slot/actions/close/type () => void
 * @doc slot/actions/close/desc to close the aside
 * @doc/fr slot/actions/close/desc fonction pour fermer l'aside
 *
 * @doc slot/default the content of the aside
 * @doc/fr slot/default contenu de l'aside
 * @doc slot/default/close/type () => void
 * @doc slot/default/close/desc to close the aside
 * @doc/fr slot/default/close/desc fonction pour fermer l'aside
 *
 * @doc slot/footer the footer of the aside
 * @doc/fr slot/footer pied de page de l'aside
 * @doc slot/footer/close/type function
 * @doc slot/footer/close/desc to close the aside
 * @doc/fr slot/footer/close/desc fonction pour fermer l'aside
 */
</script>
