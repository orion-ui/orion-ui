<template>
	<teleport
		to="body"
		:disabled="setup.options.programmatic">
		<aside
			v-show="setup.visible"
			:id="`OrionAside-${setup.uid}`"
			:ref="setup._el"
			class="orion-aside"
			:class="[
				setup.options.customClass,
				`orion-aside--${setup.options.size}`,
				{ 'orion-aside--visible': setup.visible },
			]">
			<div class="orion-aside__poster">
				<div
					v-if="$slots.poster">
					<slot name="poster"/>
				</div>
				<div
					v-else
					:id="`OrionAside-${setup.uid}__poster`"/>
			</div>

			<div class="orion-aside__header">
				<div
					v-if="$slots.header"
					class="orion-aside__logo">
					<slot name="header"/>
				</div>
				<div
					:id="`OrionAside-${setup.uid}__actions`"
					:ref="setup._actions"
					class="orion-aside__actions">
					<slot
						name="actions"
						:close="setup.close.bind(setup)"/>
				</div>
			</div>

			<div
				:id="`OrionAside-${setup.uid}__footer`"
				class="orion-aside__footer">
				<slot
					name="footer"
					:close="setup.close.bind(setup)"/>
			</div>

			<div class="orion-aside__body">
				<component
					:is="setup.options.Nested"
					v-if="setup.options.Nested && setup.isMounted"
					v-bind="setup.options.NestedProps"/>

				<slot :close="setup.close.bind(setup)"/>
			</div>

			<span
				v-if="!setup.options.hideClose"
				class="orion-aside__close"
				@click="setup.close({ keepInQueue: false })"
				@touchend.prevent.stop="setup.close({ keepInQueue: false })"/>

			<orion-loader :ref="setup._loader"/>
		</aside>
	</teleport>
</template>

<script setup lang="ts">
import './OrionAside.less';
import { provide } from 'vue';
import { OrionLoader } from 'packages/Loader';
import OrionAsideSetupService from './OrionAsideSetupService';
type AsideEmit = {
	(e: 'enter-start'): void,
	(e: 'enter-end'): void,
	(e: 'leave-start'): void,
	(e: 'leave-end'): void,
}
const emit = defineEmits<AsideEmit>();
const props = defineProps(OrionAsideSetupService.props);
const setup = new OrionAsideSetupService(props, emit);
provide('_aside', setup.publicInstance);
defineExpose(setup.publicInstance);

/** Doc
 * @doc slot/poster useful to display a poster image on aside's top
 * @doc/fr slot/poster utile pour afficher une image de couverture en haut de l'aside
 *
 * @doc slot/header the header of the aside
 * @doc/fr slot/header en-tête de l'aside
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
 *
 * @doc event/enter-start/desc the aside begins its enter transition
 * @doc/fr event/enter-start/desc l'aside commence son animation d'arrivée
 * @doc event/enter-end/desc the aside ends its enter transition
 * @doc/fr event/enter-end/desc l'aside a fini son animation d'arrivée
 * @doc event/leave-start/desc the aside begins its leave transition
 * @doc/fr event/leave-start/desc l'aside commence sa transition de départ
 * @doc event/leave-end/desc the aside ends its leave transition
 * @doc/fr event/leave-end/desc l'aside a fini sa transition de départ
 */
</script>

