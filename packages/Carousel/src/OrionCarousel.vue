<template>
	<div
		:id="`orion-carousel-${setup.uid}`"
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
			<div class="orion-carousel__steps">
				<slot
					v-bind="{
						step: setup.step,
						stepIndex: setup.stepIndex,
						goPreviousStep: () => setup.goPreviousStep(),
						goNextStep: () => setup.goNextStep(),
					}"/>
			</div>
		</div>

		<div class="orion-carousel__footer">
			<slot
				name="actions"
				v-bind="{
					step: setup.step,
					stepIndex: setup.stepIndex,
					goPreviousStep: () => setup.goPreviousStep(),
					goNextStep: () => setup.goNextStep(),
				}">
				<o-button
					outline
					size="sm"
					prefix-icon="chevron_big_left"
					@click="setup.goPreviousStep()"/>

				<o-button
					outline
					size="sm"
					suffix-icon="chevron_big_right"
					@click="setup.goNextStep()"/>
			</slot>

			<div
				v-if="setup.stepIndex <= setup.stepsLength"
				class="orion-carousel__dot-section">
				<div
					v-for="index in setup.stepsLength"
					:key="index"
					class="orion-carousel__dot"
					:class="[
						{ 'orion-carousel__dot--active': (index - 1) === setup.stepIndex },
						{ 'orion-carousel__dot--past': (index - 1) < setup.stepIndex },
					]"
					@click="setup.goToStepIndex(index - 1)">
					<div class="orion-carousel__dot-loader"/>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { useSlots, provide } from 'vue';
import './OrionCarousel.less';
import OrionCarouselSetupService from './OrionCarouselSetupService';
type Emits = {(e: 'update:modelValue', val?: number | string): void}
const slots = useSlots();
const emits = defineEmits<Emits>();
const props = defineProps(OrionCarouselSetupService.props);
const setup = new OrionCarouselSetupService(props, emits, slots);
provide('_carousel', setup.publicInstance);
defineExpose(setup.publicInstance);

/** Doc
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
 * @doc slot/actions the content of the carousel (use o-carousel-item component)
 * @doc/fr slot/actions contenu du carousel (utilisez le composant o-carousel-item)
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
 */
</script>

<style scoped lang="less">
.orion-carousel {
  height: 100%;
  display: flex;
  flex-direction: column;

  &__content {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    flex: 1;
    overflow: auto;
  }

  &__poster {
    flex: 1;
  }

	&__footer {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 1rem;

		> :nth-child(1) {
			order: 1;
		}
		> :nth-child(2) {
			order: 3;
		}
	}

  &__dot-section {
		order: 2;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
  }

  &__dot {
    --color: v-bind('setup.rgbColor');
    transition: background .3s, border .3s, width .3s;
		position: relative;
		overflow: hidden;
    height: 0.5rem;
    width: 0.5rem;
    border-radius: 0.25rem;
    background: white;
    border: 1px solid var(--grey);
    cursor: pointer;

    &:hover {
			border-color: rgb(var(--color));
    }

    &--active, &--past {
      border-color: transparent;
			background-color: rgb(var(--color));
    }

		&--past {
      opacity: 0.3;
    }

		&--active {
			.orion-carousel--timer & {
				background-color: rgba(var(--color), 0.2);
				width: 1.5rem;
			}
		}

		&-loader {
			position: absolute;
			top: 0;
			bottom: 0;
			left: 0;
			right: 0;
			background-color: rgb(var(--color));
			transform: scale3d(0, 1, 1);
			transform-origin: left;

			.orion-carousel--timer .orion-carousel__dot--active & {
				animation: dotLoader;
				animation-duration: v-bind('setup.stepTimerForCss');
				animation-timing-function: linear;
			}
		}
  }

	&__steps-wrapper {
		overflow: hidden;
	}

  &__steps {
		transition: transform 0.3s ease-in-out;
    flex: 1;
		display: flex;
		transform: translate3d(calc(v-bind('setup.stepIndex') * -100%) , 0, 0);
  }
}

@keyframes dotLoader {
	0% {
		transform: scale3d(0, 1, 1);
	}
	100% {
		transform: scale3d(1, 1, 1);
	}
}
</style>
