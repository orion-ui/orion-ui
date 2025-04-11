<template>
	<div
		:id="`orion-carousel-${setup.uid}`"
		:ref="setup._el"
		class="orion-carousel"
		:class="{ 'orion-carousel--timer': !!stepTimer }"
		@mouseenter="setup.handleMouseEnter()"
		@mouseleave="setup.handleMouseLeave()">
		<div
			v-if="$slots.poster"
			class="orion-carousel__poster">
			<slot
				name="poster"
				v-bind="{
					step: setup.step,
					stepIndex: setup.stepIndex,
				}"/>
		</div>

		<div
			v-if="$slots.default"
			class="orion-carousel__steps-wrapper">
			<div
				class="orion-carousel__steps"
				:style="{ transform: `translate3d(${setup.stepIndex * -100}%, 0, 0)` }">
				<slot
					v-bind="{
						step: setup.step,
						stepIndex: setup.stepIndex,
						goPreviousStep: () => setup.goPreviousStep(),
						goNextStep: () => setup.goNextStep(),
					}"/>
			</div>
		</div>

		<div
			v-if="!hideNavigationButtons || !hideNavigationDots"
			class="orion-carousel__navigation">
			<slot
				name="navigation"
				v-bind="{
					step: setup.step,
					stepIndex: setup.stepIndex,
					goPreviousStep: () => setup.goPreviousStep(),
					goNextStep: () => setup.goNextStep(),
				}">
				<orion-button
					class="orion-carousel__navigation-previous"
					:disabled="hideNavigationButtons || (!setup.shouldLoop && setup.stepIndex === 0)"
					outline
					size="sm"
					prefix-icon="chevron_left"
					@click="setup.goPreviousStep()"/>

				<orion-button
					class="orion-carousel__navigation-next"
					:disabled="hideNavigationButtons || (!setup.shouldLoop && setup.stepIndex === (setup.stepsLength - 1))"
					outline
					size="sm"
					suffix-icon="chevron_right"
					@click="setup.goNextStep()"/>
			</slot>

			<div
				v-if="!hideNavigationDots && (setup.stepIndex <= setup.stepsLength)"
				class="orion-carousel__dot-section">
				<div
					v-for="index in setup.stepsLength"
					:key="index"
					class="orion-carousel__dot"
					:class="[
						{ 'orion-carousel__dot--active': (index - 1) === setup.stepIndex },
						{ 'orion-carousel__dot--past': (index - 1) < setup.stepIndex },
					]"
					:style="{ '--color': setup.rgbColor }"
					@click="setup.goToStepIndex(index - 1)">
					<div
						class="orion-carousel__dot-loader"
						:style="{ 'animation-duration': setup.stepTimerForCss }"/>
				</div>
			</div>
		</div>

		<div
			v-if="$slots.actions"
			class="orion-carousel__actions">
			<slot
				name="actions"
				v-bind="{
					step: setup.step,
					stepIndex: setup.stepIndex,
					goPreviousStep: () => setup.goPreviousStep(),
					goNextStep: () => setup.goNextStep(),
					goToStep: (step: any) => setup.goToStep(step),
					goToStepIndex: (index: number) => setup.goToStepIndex(index),
				}"/>
		</div>
	</div>
</template>

<script setup lang="ts">
import { provide } from 'vue';
import './OrionCarousel.less';
import OrionCarouselSetupService from './OrionCarouselSetupService';
import OrionButton from 'packages/Button/src/OrionButton.vue';
import type { OrionCarouselProps, OrionCarouselEmits } from './OrionCarouselSetupService';
const slots = defineSlots();
const vModel = defineModel<Undef<number | string>>({ required: true });
const emits = defineEmits<OrionCarouselEmits>() as OrionCarouselEmits;
const props = withDefaults(defineProps<OrionCarouselProps>(), OrionCarouselSetupService.defaultProps);
const setup = new OrionCarouselSetupService(props, emits, vModel, slots);
provide('_carousel', setup.publicInstance);
defineExpose(setup.publicInstance);

/** Doc
 * @doc vModel/vModel refers to the active step's **name** prop
 * @doc/fr vModel/vModel correspond à la prop **name** de l'élément actif
 *
 * @doc slot/poster fixed placeholder no matter what slide is active
 * @doc/fr slot/poster emplacement fixe peu importe le slide actif
 * @doc slot/poster/step/type number | string | undefined
 * @doc slot/poster/step/desc active step
 * @doc/fr slot/poster/step/desc l'élément actif
 * @doc slot/poster/stepIndex/type number
 * @doc slot/poster/stepIndex/desc active step index
 * @doc/fr slot/poster/stepIndex/desc l'index de l'élément actif
 *
 * @doc slot/default the content of the carousel (use o-carousel-item component)
 * @doc/fr slot/default contenu du carousel (utilisez le composant o-carousel-item)
 * @doc slot/default/step/type number | string | undefined
 * @doc slot/default/step/desc active step
 * @doc/fr slot/default/step/desc l'élément actif
 * @doc slot/default/stepIndex/type number
 * @doc slot/default/stepIndex/desc active step index
 * @doc/fr slot/default/stepIndex/desc l'index de l'élément actif
 * @doc slot/default/goPreviousStep/type () => void
 * @doc slot/default/goPreviousStep/desc function to display previous step
 * @doc/fr slot/default/goPreviousStep/desc fonction pour afficher l'élément précédent
 * @doc slot/default/goNextStep/type () => void
 * @doc slot/default/goNextStep/desc function to display next step
 * @doc/fr slot/default/goNextStep/desc fonction pour afficher l'élément suivant
 *
 * @doc slot/navigation the content of the carousel (use o-carousel-item component)
 * @doc/fr slot/navigation contenu du carousel (utilisez le composant o-carousel-item)
 * @doc slot/navigation/step/type number | string | undefined
 * @doc slot/navigation/step/desc active step
 * @doc/fr slot/navigation/step/desc l'élément actif
 * @doc slot/navigation/stepIndex/type number
 * @doc slot/navigation/stepIndex/desc active step index
 * @doc/fr slot/navigation/stepIndex/desc l'index de l'élément actif
 * @doc slot/navigation/goPreviousStep/type () => void
 * @doc slot/navigation/goPreviousStep/desc function to display previous step
 * @doc/fr slot/navigation/goPreviousStep/desc fonction pour afficher l'élément précédent
 * @doc slot/navigation/goNextStep/type () => void
 * @doc slot/navigation/goNextStep/desc function to display next step
 * @doc/fr slot/navigation/goNextStep/desc fonction pour afficher l'élément suivant
 *
 * @doc slot/actions display additional actions for the carousel
 * @doc/fr slot/actions affiche des actions supplémentaires pour le carrousel
 * @doc slot/actions/step/type number | string | undefined
 * @doc slot/actions/step/desc active step
 * @doc/fr slot/actions/step/desc l'élément actif
 * @doc slot/actions/stepIndex/type number
 * @doc slot/actions/stepIndex/desc active step index
 * @doc/fr slot/actions/stepIndex/desc l'index de l'élément actif
 * @doc slot/actions/goPreviousStep/type () => void
 * @doc slot/actions/goPreviousStep/desc function to display previous step
 * @doc/fr slot/actions/goPreviousStep/desc fonction pour afficher l'élément précédent
 * @doc slot/actions/goNextStep/type () => void
 * @doc slot/actions/goNextStep/desc function to display next step
 * @doc/fr slot/actions/goNextStep/desc fonction pour afficher l'élément suivant
 * @doc slot/actions/goToStep/type (step: { name: number | string }) => void
 * @doc slot/actions/goToStep/desc function to activate specific step
 * @doc/fr slot/actions/goToStep/desc fonction pour afficher un élément spécifique
 * @doc slot/actions/goToStepIndex/type (index: number) => void
 * @doc slot/actions/goToStepIndex/desc function to display step at specific index
 * @doc/fr slot/actions/goToStepIndex/desc fonction pour afficher un élément à l'index spécifié
 */
</script>
