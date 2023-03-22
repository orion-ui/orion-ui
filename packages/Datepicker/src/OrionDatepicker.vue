<template>
	<v-dropdown
		placement="bottom-start"
		:positioning-disabled="setup.responsive.onPhone"
		:triggers="[]"
		:shown="setup.isFocus"
		:auto-hide="false"
		@apply-show="setup.handlePopperShow()"
		@apply-hide="setup.handlePopperHide()">
		<orion-field
			v-bind="setup.orionFieldBinding"
			class="orion-datepicker"
			:has-value="setup.hasValue"
			:label-is-floating="setup.hasValue || (setup.props.type === 'date' && setup.isFocus)"
			:class="{ 'orion-datepicker--range' : setup.props.type === 'range' }"
			@clear="setup.handleClearCustom()">
			<input
				v-if="setup.props.type === 'date'"
				:ref="setup._input"
				class="orion-input__input"
				:value="setup.displayDateSelected"
				:maxlength="setup.maxInput"
				:name="setup.props.name"
				@keydown="setup.handleKeydownGuard($event)"
				@focus="setup.handleFocusCustom($event)"
				@mouseup="setup.handleMouseup($event)"
				@mousedown="setup.handleMousedown()"
				@blur="setup.handleBlurCustom($event)">
			<div
				v-else
				:ref="setup._input"
				class="orion-input__input"
				tabindex="0"
				@focus="setup.handleFocus($event)"
				@blur="setup.handleBlur($event)">
				<span v-if="setup.props.type === 'week' && setup.range?.weekNumber">
					<div
						v-if="setup.props.valueDisplayFormat"
						v-html="setup.props.valueDisplayFormat(setup.range)"/>
					<template v-else>
						{{ `${setup.lang.WEEK} ${setup.range.weekNumber}` }}
					</template>
				</span>
				<span v-else>
					<div
						v-if="setup.props.valueDisplayFormat"
						v-html="setup.props.valueDisplayFormat(setup.vModel ?? setup.range)"/>
					<template v-else>
						{{ setup.displayDateSelected }}
					</template>
				</span>
			</div>
		</orion-field>

		<template #popper>
			<orion-date-table
				v-if="setup.props.type === 'date'"
				:ref="setup._options"
				v-model="setup.vModel"
				:min-date="setup.minDate"
				:max-date="setup.maxDate"
				@update:model-value="setup.handleBlurCustom()"/>
			<orion-date-range
				v-else-if="setup.props.type === 'range'"
				:ref="setup._options"
				v-model="setup.range"
				:min-date="setup.minDate"
				:max-date="setup.maxDate"
				@select-range="setup.handleBlurCustom()"/>
			<orion-date-week
				v-else-if="setup.props.type === 'week'"
				:ref="setup._options"
				v-model="setup.range"
				:min-date="setup.minDate"
				:max-date="setup.maxDate"
				@update:model-value="setup.handleBlurCustom()"/>
		</template>
	</v-dropdown>
</template>

<script setup lang="ts">
import './OrionDatepicker.less';
import { OrionDateRange } from 'packages/DateRange';
import { OrionDateTable } from 'packages/DateTable';
import { OrionDateWeek } from 'packages/DateWeek';
import { OrionField } from 'packages/Field';
import OrionDatepickerSetupService from './OrionDatepickerSetupService';
type VModelType = Nil<Date>;
type FieldEmit = {
  (e: 'focus', payload: FocusEvent): void;
  (e: 'blur', payload?: FocusEvent): void;
  (e: 'input', payload: VModelType): void;
  (e: 'change', val?: VModelType): void;
  (e: 'update:modelValue', payload: VModelType): void;
  (e: 'clear'): void;
	(e: 'update:range', payload: Nil<Orion.DateRange>): void;
}
const emit = defineEmits<FieldEmit>();
const props = defineProps(OrionDatepickerSetupService.props);
const setup = new OrionDatepickerSetupService(props, emit);
defineExpose(setup.publicInstance);

/** Doc
 * @doc event/focus/desc emitted on focus
 * @doc/fr event/focus/desc émis lors du focus
 *
 * @doc event/blur/desc emitted when the focus leaves the field
 * @doc/fr event/blur/desc émis quand le focus quitte le champ
 *
 * @doc event/input/desc emitted when the value of the field changes
 * @doc/fr event/input/desc émis lorsque la valeur est modifiée
 *
 * @doc event/change/desc emitted when the value of the field changes
 * @doc/fr event/change/desc émis lorsque la valeur est modifiée
 *
 * @doc event/update:modelValue/desc emitted to update the field value
 * @doc/fr event/update:modelValue/desc émis pour mettre à jour la valeur
 *
 * @doc event/clear/desc emitted when the field is cleared
 * @doc/fr event/clear/desc émis quand le champ est vidé
 */
</script>
