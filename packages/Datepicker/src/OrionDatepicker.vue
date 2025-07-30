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
			:label-is-floating="setup.hasValue || (type === 'date' && setup.isFocus)"
			:class="[
				{ 'orion-datepicker--range' : type === 'range' },
				{ 'orion-datepicker-multiple' : type === 'multiple' },
			]"
			@clear="setup.handleClear()">
			<input
				v-if="type === 'date'"
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
				v-else-if="type === 'multiple'"
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
				<span v-if="type === 'week' && range?.weekNumber">
					<div
						v-if="valueDisplayFormat"
						v-html="valueDisplayFormat(range)"/>
					<template v-else>
						{{ `${setup.lang.WEEK} ${range.weekNumber}` }}
					</template>
				</span>
				<span v-else>
					<div
						v-if="valueDisplayFormat"
						v-html="valueDisplayFormat(setup.vModelProxy ?? range)"/>
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
			<slot
				name="popper"
				v-bind="{ closePopperSlot: setup.closePopperSlot.bind(setup) }">
				<orion-date-table
					v-if="type === 'date'"
					:ref="setup._options"
					v-model="setup.vModelProxy"
					:min-date="setup.minDate"
					:max-date="setup.maxDate"
					:display-week-number="displayWeekNumber"
					@update:model-value="time && !setup.responsive.onPhone
						? $nextTick(() => setup.setSelectionToHour())
						: setup.handleBlur(undefined, setup.responsive.onPhone && !time)
					"/>
				<orion-date-table
					v-if="type === 'multiple'"
					:ref="setup._options"
					v-model:multiple="multiple"
					:type="type === 'multiple' ? 'multiple' : undefined"
					:min-date="setup.minDate"
					:max-date="setup.maxDate"
					:display-week-number="displayWeekNumber"
					@update:model-value="time && !setup.responsive.onPhone
						? $nextTick(() => setup.setSelectionToHour())
						: setup.handleBlur(undefined, setup.responsive.onPhone && !time)
					"/>
				<orion-date-range
					v-else-if="type === 'range'"
					:ref="setup._options"
					v-model="setup.rangeBuffer"
					:min-date="setup.minDate"
					:max-date="setup.maxDate"
					:display-week-number="displayWeekNumber"
					@select-range="setup.handleBlur(undefined, true)"/>
				<orion-date-week
					v-else-if="type === 'week'"
					:ref="setup._options"
					v-model="setup.rangeBuffer"
					:min-date="setup.minDate"
					:max-date="setup.maxDate"
					:hide-disabled="hideDisabled"
					@update:model-value="setup.handleBlur()"/>
				<orion-date-table
					v-if="type === 'month'"
					:ref="setup._options"
					v-model:range="setup.rangeBuffer"
					:min-date="setup.minDate"
					:max-date="setup.maxDate"
					:display-week-number="displayWeekNumber"
					type="range"
					month
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
			</slot>
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
import type { OrionDatepickerProps, OrionDatepickerEmits } from './OrionDatepickerSetupService';
const slots = defineSlots();
const vModel = defineModel<Nil<Date>>();
const range = defineModel<Nil<Orion.DateRange>>('range');
const multiple = defineModel<Nil<Date[]>>('multiple');
const emits = defineEmits<OrionDatepickerEmits>() as OrionDatepickerEmits;
const props = withDefaults(defineProps<OrionDatepickerProps>(), OrionDatepickerSetupService.defaultProps);
const setup = new OrionDatepickerSetupService(props, emits, slots, vModel, range, multiple);
defineExpose(setup.publicInstance);

/** Doc
 * @doc vModel/vModel the vModel if the type is set to `date`
 * @doc/fr vModel/vModel le vModel si le type est défini à `date`
 * @doc vModel/multiple the vModel if the type is set to `multiple`
 * @doc/fr vModel/multiple le vModel si le type est défini à `multiple`
 * @doc vModel/range the vModel if the type is set to `range`
 * @doc/fr vModel/range le vModel si le type est défini à `range`
 *
 * @doc slot/multipleDisplay if type is `multiple`, the content inside the input
 * @doc/fr slot/multipleDisplay si le type est `multiple`, il s'agit du contenu de l'input
 * @doc slot/multipleDisplay/datas/type Date[]
 * @doc slot/multipleDisplay/datas/desc the selected dates
 * @doc slot/multipleDisplay/datas/desc les dates sélectionnées
 * @doc slot/multipleDisplay/close/type (date: Date) => void
 * @doc slot/multipleDisplay/close/desc remove the date
 * @doc/fr slot/multipleDisplay/close/desc retire la date
 */
</script>
