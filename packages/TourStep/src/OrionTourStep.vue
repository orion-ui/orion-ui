<template>
	<div
		v-if="_tour"
		id="tour-tooltip"
		:ref="setup._el"
		class="orion-tour-tooltip"
		:class="[
			`orion-tour-tooltip--${setup.props.size}`,
		]">
		<span
			v-if="setup.props.closable"
			class="orion-tour-tooltip__close"
			@click="setup.stop()"/>
		<div
			id="orion-tour-tooltip__arrow"
			class="orion-tour-tooltip__arrow"/>
		<div class="orion-tour-tooltip__title">
			{{ setup.props.title }}
		</div>
		<div
			class="orion-tour-tooltip__body"
			:class="[
				`orion-tour-tooltip__body--${setup.props.size}`,
			]">
			<slot/>
		</div>

		<div
			class="orion-tour-tooltip__footer"
			:class="[
				`orion-tour-tooltip__footer--${setup.props.size}`,
			]">
			<div
				v-if="setup.steps?.length && setup.currentIndex !== -1 && setup.currentIndex !== undefined"
				class="orion-tour-tooltip__counter">
				{{ setup.currentIndex + 1 }} / {{ _tour.steps.length }}
			</div>
			<div class="orion-tour-tooltip__actions">
				<slot
					name="actions"
					:next="setup.goNextStep.bind(setup)"
					:previous="setup.goPreviousStep.bind(setup)">
					<orion-button
						v-if="setup.currentIndex !== undefined && setup.currentIndex > 0"
						id="previousButton"
						outline
						size="xs"
						@click="setup.goPreviousStep()">
						{{ setup.previousButtonLabel }}
					</orion-button>
					<orion-button
						v-if="setup.steps && setup.currentIndex !== setup.steps.length - 1"
						id="nextButton"
						color="brand"
						size="xs"
						@click="setup.goNextStep()">
						{{ setup.nextButtonLabel }}
					</orion-button>
				</slot>
				<orion-button
					v-if="!setup.props.hideFinish"
					id="endButton"
					color="info"
					size="xs"
					@click="setup.stop()">
					{{ setup.endButtonLabel }}
				</orion-button>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
// Needed to manage slots in OrionTourSetupService / calcStepInstances
export default { name: 'OrionTourStep' };
</script>

<script setup lang="ts">
import { inject } from 'vue';
import { OrionButton } from 'packages/Button';
import '../../Tour/src/OrionTour.less';
import OrionTourStepSetupService from './OrionTourStepSetupService';
const _tour = inject<OrionTour>('_tour');
const props = defineProps(OrionTourStepSetupService.props);
const setup = new OrionTourStepSetupService(props, _tour);
defineExpose(setup.publicInstance);
/** Doc
 * @doc slot/default content of the step
 * @doc/fr slot/default contenu de l'étape
 *
 * @doc slot/actions actions of the step
 * @doc/fr slot/actions actions de l'étape
 * @doc slot/actions/next/desc go to next step
 * @doc/fr slot/actions/next/desc aller à l'étape suivante
 * @doc slot/actions/next/type () => void
 * @doc slot/actions/previous/desc go to previous step
 * @doc/fr slot/actions/previous/desc aller à l'étape précédente
 * @doc slot/actions/previous/type () => void
 */
</script>
