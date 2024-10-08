<template>
	<div
		:ref="setup._el"
		:class="[
			`orion-rate`,
			`orion-rate--${setup.color}`,
			{ 'orion-rate--disabled': disabled },
		]">
		<div class="orion-rate__wrapper">
			<template v-if="disabled">
				<orion-icon
					v-for="star in 5"
					:key="star"
					class="orion-rate__star"
					:class="setup.starColor(star)"
					:icon="setup.fontIcon ? undefined : setup.icon"
					:font-icon="setup.fontIcon"/>
			</template>
			<template v-else>
				<template
					v-for="i in 5"
					:key="`rate-${setup._uid}-${i}`">
					<input
						:id="`rate-${setup._uid}-${i}`"
						v-model="setup.rateRounded"
						:value="6 - i"
						:name="`rate-${setup._uid}-${i}`"
						type="radio"
						@input="setup.emitUpdate(6 - i)">
					<label
						:for="`rate-${setup._uid}-${i}`"
						class="orion-rate__star">
						<orion-icon
							:icon="setup.fontIcon ? undefined : setup.icon"
							:font-icon="setup.fontIcon"/>
					</label>
				</template>
			</template>
		</div>
		<span
			v-if="setup.numberOfRates || $slots.default"
			class="orion-rate__number">
			<slot v-bind="{ rateNumber: setup.numberOfRates }">({{ setup.numberOfRates }})</slot>
		</span>
	</div>
</template>

<script setup lang="ts">
import { OrionIcon } from 'packages/Icon';
import './OrionRate.less';
import OrionRateSetupService from './OrionRateSetupService';

type RateEmit = {
	(e: 'input', val: number): void,
	(e: 'update:modelValue', val: number): void,
}
const emit = defineEmits<RateEmit>();
const props = defineProps(OrionRateSetupService.props);
const setup = new OrionRateSetupService(props, emit);
defineExpose(setup.publicInstance);

/** Doc
 * @doc event/input/desc emitted on model value change
 * @doc/fr event/input/desc émis lorsque le modelValue change
 *
 * @doc event/update:modelValue/desc emitted to update the model value
 * @doc/fr event/update:modelValue/desc émis pour mettre à jour le modelValue
 *
 * @doc slot/default legend of the rating
 * @doc/fr slot/default légende de la notation
 * @doc slot/default/rateNumber/type number
 * @doc slot/default/rateNumber/desc number of total rates ( = prop `numberOfRates`)
 * @doc/fr slot/default/rateNumber/desc le nombre total d'évaluations ( = prop `numberOfRates`)
 */
</script>
