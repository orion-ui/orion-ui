<template>
	<v-dropdown
		:ref="setup._popover"
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
			:class="[
				{ 'orion-datepicker--range' : setup.props.type === 'range' },
				{ 'orion-datepicker-multiple' : setup.props.type === 'multiple' },
			]"
			@clear="setup.handleClear()">
			<input
				v-if="setup.props.type === 'date'"
				:ref="setup._input"
				class="orion-input__input"
				:value="setup.displayDateSelected"
				:maxlength="setup.maxInput"
				v-bind="$attrs"
				@keydown="setup.handleKeydownGuard($event)"
				@focus="setup.handleFocus($event)"
				@mouseup="setup.handleMouseup()"
				@mousedown="setup.handleMousedown()"
				@blur="setup.handleBlur($event)">

			<div
				v-else-if="type === 'multiple' "
				:ref="setup._input"
				class="orion-input__input"
				tabindex="0"
				@focus="setup.handleFocus($event)"
				@blur="setup.handleBlur($event)">
				<div
					v-if="!$slots.multipleDisplay"
					class="orion-datepicker-multiple__content">
					<orion-label
						v-for="date in multiple"
						:key="date.toString()"
						:color="multipleLabelColor"
						size="sm">
						<div class="flex ai-c g-xs">
							{{ setup.inputValueFormat(date) }}
							<span
								:class="`orion-datepicker-multiple__clearable`"
								@click="setup.removeDate(date)"/>
						</div>
					</orion-label>
				</div>
				<div
					class="orion-datepicker__multiple">
					<slot
						name="multipleDisplay"
						:datas="multiple"
						:close="setup.removeDate.bind(setup)"/>
				</div>
			</div>

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

			<div
				v-if="setup.showState
					&& (setup.showError || setup.showWarning)
					&& setup.validationHtmlMessages?.length"
				class="orion-input__error-message"
				v-html="setup.validationHtmlMessages"/>
		</orion-field>

		<template #popper>
			<orion-date-table
				v-if="setup.props.type === 'date'"
				:ref="setup._options"
				v-model="setup.vModel"
				:min-date="setup.minDate"
				:max-date="setup.maxDate"
				@update:model-value="time && !setup.responsive.onPhone
					? $nextTick(() => setup.setSelectionToHour())
					: setup.handleBlur(undefined, setup.responsive.onPhone && !time)
				"/>
			<orion-date-table
				v-if="setup.props.type === 'multiple'"
				:ref="setup._options"
				v-model:multiple="setup.multiple"
				:type="type === 'multiple' ? 'multiple' : undefined"
				:min-date="setup.minDate"
				:max-date="setup.maxDate"
				@update:model-value="time && !setup.responsive.onPhone
					? $nextTick(() => setup.setSelectionToHour())
					: setup.handleBlur(undefined, setup.responsive.onPhone && !time)
				"/>
			<orion-date-range
				v-else-if="setup.props.type === 'range'"
				:ref="setup._options"
				v-model="setup.rangeBuffer"
				:min-date="setup.minDate"
				:max-date="setup.maxDate"
				@select-range="setup.handleBlur(undefined, true)"/>
			<orion-date-week
				v-else-if="setup.props.type === 'week'"
				:ref="setup._options"
				v-model="setup.range"
				:min-date="setup.minDate"
				:max-date="setup.maxDate"
				@update:model-value="setup.handleBlur()"/>
			<orion-date-table
				v-if="setup.props.type === 'month'"
				:ref="setup._options"
				v-model:range="setup.range"
				:min-date="setup.minDate"
				type="range"
				month
				:max-date="setup.maxDate"
				@update:range="setup.handleBlur(undefined, setup.responsive.onPhone)"/>

			<div
				v-if="setup.isOnPhoneWithTimepicker"
				class="orion-datepicker__timepicker-wrapper">
				<div class="orion-datepicker-timepicker">
					<div
						:ref="setup._hours"
						class="orion-datepicker-timepicker__hours"
						@scroll="setup.handleTimeScroll('hours')">
						<div class="orion-datepicker-timepicker__scroll-filler"/>
						<div
							v-if="setup.appLang === 'fr'"
							class="orion-datepicker-timepicker__scroll-item">
							00
						</div>
						<div
							v-for="i in (setup.appLang === 'en' ? 12 : 23)"
							:key="i"
							:data-value="i"
							class="orion-datepicker-timepicker__scroll-item">
							{{ i.toString().padStart(2, '0') }}
						</div>
						<div class="orion-datepicker-timepicker__scroll-filler"/>
					</div>
					<div class="orion-datepicker-timepicker__separator">{{ setup.lang.TIME_SEPARATOR }}</div>
					<div
						:ref="setup._minutes"
						class="orion-datepicker-timepicker__minutes"
						@scroll="setup.handleTimeScroll('minutes')">
						<div class="orion-datepicker-timepicker__scroll-filler"/>
						<div class="orion-datepicker-timepicker__scroll-item">00</div>
						<div
							v-for="i in 59"
							:key="i"
							:data-value="i"
							class="orion-datepicker-timepicker__scroll-item">
							{{ i.toString().padStart(2, '0') }}
						</div>
						<div class="orion-datepicker-timepicker__scroll-filler"/>
					</div>
					<div
						v-if="setup.appLang === 'en'"
						class="orion-datepicker-timepicker__meridian">
						<div
							:class="{ 'active': !setup.isPm }"
							@click="setup.setAmPm('a')">
							AM
						</div>
						<div
							:class="{ 'active': setup.isPm }"
							@click="setup.setAmPm('p')">
							PM
						</div>
					</div>
				</div>

				<div class="orion-datepicker-timepicker-actions">
					<div class="orion-input__input">{{ setup.displayDateSelected }}</div>
					<orion-button
						block
						outline
						color="brand"
						@click="setup.handleBlur(undefined, true)">
						{{ setup.lang.VALIDATE }}
					</orion-button>
				</div>
			</div>
		</template>
	</v-dropdown>
</template>

<script setup lang="ts">
import './OrionDatepicker.less';
import { OrionButton } from 'packages/Button';
import { OrionDateRange } from 'packages/DateRange';
import { OrionDateTable } from 'packages/DateTable';
import { OrionDateWeek } from 'packages/DateWeek';
import { OrionField } from 'packages/Field';
import { OrionLabel } from 'packages/Label';
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
	(e: 'update:multiple', payload: Date[]): void;
}
const emit = defineEmits<FieldEmit>();
const props = defineProps(OrionDatepickerSetupService.props);
const setup = new OrionDatepickerSetupService(props, emit);
defineExpose(setup.publicInstance);

/** Doc
 * @doc slot/multipleDisplay if type is `multiple`, the content inside the input
 * @doc/fr slot/multipleDisplay si le type est `multiple`, il s'agit du contenu de l'input
 * @doc slot/multipleDisplay/datas/type Date[]
 * @doc slot/multipleDisplay/datas/desc the selected dates
 * @doc slot/multipleDisplay/datas/desc les dates sélectionnées
 * @doc slot/multipleDisplay/close/type (date: Date) => void
 * @doc slot/multipleDisplay/close/desc remove the date
 * @doc/fr slot/multipleDisplay/close/desc retire la date
 *
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
 * @doc event/update:range/desc emitted to update the modelValue when the type is `range`
 * @doc/fr event/update:range/desc émis pour mettre à jour la valeur quand le type est `range`
 *
 * @doc event/update:multiple/desc emitted to update the field value when the type is `multiple`
 * @doc/fr event/update:multiple/desc émis pour mettre à jour la valeur quand le type est `multiple`
 *
 * @doc event/clear/desc emitted when the field is cleared
 * @doc/fr event/clear/desc émis quand le champ est vidé
 */
</script>
