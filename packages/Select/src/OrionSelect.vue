<template>
	<v-dropdown
		:ref="setup._popover"
		placement="bottom-start"
		:theme="setup.showPopoverSearch ? 'orion-select-searchable' : 'orion-select'"
		:positioning-disabled="setup.responsive.onPhone"
		:triggers="[]"
		:shown="setup.showPopover"
		:auto-hide="false"
		@apply-show="setup.handlePopoverShow()">
		<orion-field
			v-bind="setup.orionFieldBinding"
			:label-is-floating="setup.labelIsFloating"
			class="orion-select"
			:class="[{ 'orion-select--multiple': setup.props.multiple }, $attrs.class]"
			@clear="setup.clear()">
			<div
				:ref="setup._input"
				class="orion-input__input"
				:tabindex="setup.props.disabled ? undefined : 0"
				@focus="setup.handleFocus($event)"
				@blur="setup.handleBlur($event)"
				@keydown.down.prevent="setup.handleKeydown('down')"
				@keydown.up.prevent="setup.handleKeydown('up')"
				@keydown.enter="setup.selectItemFromEnter()">
				<div v-if="multiple && setup.isArray(setup.vModel) && setup.vModel?.length">
					<span
						v-for="(item, i) in setup.vModel"
						:key="Number(i)"
						class="orion-select__selected-item">
						<slot
							name="value"
							v-bind="setup.valueDisplay(item)">
							{{ setup.valueDisplay(item).display }}
						</slot>
						<span
							v-if="!setup.props.readonly && !setup.props.disabled"
							class="orion-select__selected-item-remove"
							@mousedown.prevent="setup.removeIndex(i)">
							&times;
						</span>
					</span>
				</div>
				<slot
					v-else-if="!setup.props.multiple && !setup.isArray(setup.vModel)"
					name="value"
					v-bind="setup.valueDisplay(setup.vModel)">
					{{ setup.valueDisplay(setup.vModel).display }}
				</slot>

				<input
					v-if="setup.props.autocomplete &&
						(!setup.props.multiple ||
							(setup.props.multiple && !setup.hasValue) ||
							(setup.props.multiple && setup.hasValue && setup.isFocus)
						)"
					:ref="setup._autocomplete"
					v-model="setup.autocompleteValue"
					type="text"
					class="orion-input__input orion-select__autocomplete"
					:class="{
						'orion-select__autocomplete--single': !setup.props.multiple,
						'orion-select__autocomplete--multiple': setup.props.multiple,
					}"
					@focus="setup.handleFocus($event)"
					@blur="setup.handleBlur($event)">
			</div>

			<template #icon-suffix>
				<orion-icon
					v-show="!setup.props.autocomplete &&
						(!setup.props.clearable || (setup.props.clearable && !setup.hasValue))"
					class="orion-input__icon orion-select__carret orion-select__icon--internal"
					icon="chevron_down"
					:class="{ 'open' : setup.isFocus }"
					:loading="setup.isFetching"/>
			</template>

			<div
				v-if="setup.showState
					&& (setup.showError || setup.showWarning)
					&& setup.validationHtmlMessages?.length"
				class="orion-input__error-message"
				v-html="setup.validationHtmlMessages"/>
		</orion-field>

		<template #popper>
			<div
				:ref="setup._popoverinner"
				class="orion-select__popover"
				:class="{ 'orion-select-multiple__popover': setup.props.multiple }"
				@touchmove.stop="setup.handleScroll()"
				@scroll.stop>
				<orion-input
					v-if="setup.showPopoverSearch"
					:ref="setup._optionssearchinput"
					v-model="setup.valueToSearch"
					:label="setup.lang.SEARCH"
					class="orion-select__popover-search-input"
					size="xs"
					suffix-icon="search_magnifying_glass"
					enterkeyhint="search"
					@keydown.down.prevent.stop="setup.handleKeydown('down')"
					@keydown.up.prevent.stop="setup.handleKeydown('up')"
					@keydown.enter.stop="setup.selectItemFromEnter()"
					@keydown.esc.stop="setup.handleBlur()"
					@keydown.tab.prevent.stop="$emit('input-keydown-tab')"
					@blur="setup.handleBlur()"
					@input="setup.resetIndex()"/>

				<slot
					name="before-options"
					:options="setup.optionsDisplay"/>

				<div
					v-if="setup.optionsDisplay.length === 0"
					class="orion-select__popover-item orion-select__popover-item--noresult">
					{{ fetchUrl ? setup.lang.ENTER_YOUR_SEARCH_TERM : setup.lang.NO_RESULT }}
				</div>

				<div
					v-else
					:ref="setup._optionscontainer"
					@mousemove="setup.indexNav = -1"
					@touchmove="setup.indexNav = -1">
					<div
						v-for="(option, i) in setup.optionsDisplay"
						:key="i"
						:ref="el => { if (!!el) setup._items.value.push(el) }"
						class="orion-select__popover-item"
						:class="{
							'selected' : setup.optionIsSelected(option),
							'hover' : setup.indexNav === i,
							'disabled' : !!setup.props.disabledKey && !!setup.get(option, setup.props.disabledKey, false),
						}"
						@mousedown.prevent="setup.selectItem(option)">
						<slot
							name="option"
							:item="option"
							:index="i"
							:marked-search="setup.markedSearch.bind(setup)">
							<span
								v-html="setup.itemIsObject(option) && setup.props.displayKey
									? setup.markedSearch(option[setup.props.displayKey])
									: setup.markedSearch(option)"/>
						</slot>
						<template v-if="multiple">
							<orion-icon
								icon="check"
								class="icon--selected orion-select__icon--internal"/>
							<orion-icon
								icon="trash_full"
								class="icon--delete orion-select__icon--internal"/>
						</template>
					</div>
				</div>

				<slot
					name="after-options"
					:options="setup.optionsDisplay"/>

				<div
					v-if="setup.responsive.onPhone && multiple"
					class="orion-select__popover-actions">
					<orion-button
						outline
						@click="setup.handleBlur(undefined, true)">
						{{ setup.lang.CLOSE_ACTION }}
					</orion-button>
				</div>

				<orion-loader
					class="orion-select__popover-loader"
					size="sm"
					color="info"
					:visible="setup.isFetching"
					:message="setup.lang.LOADING_RESULTS"/>
			</div>
		</template>
	</v-dropdown>
</template>

<script setup lang="ts">
import './OrionSelect.less';
import { OrionButton } from 'packages/Button';
import { OrionIcon } from 'packages/Icon';
import { OrionInput } from 'packages/Input';
import { OrionLoader } from 'packages/Loader';
import { OrionField } from 'packages/Field';
import OrionSelectSetupService from './OrionSelectSetupService';
type BaseVModelType = string | number | boolean | Record<string, any>;
type VModelType = BaseVModelType | BaseVModelType[] | null | undefined;
type SelectEmit = {
  (e: 'focus', payload: FocusEvent): void;
  (e: 'blur', payload?: FocusEvent): void;
  (e: 'input', payload: VModelType): void;
  (e: 'input-keydown-tab'): void;
  (e: 'change', val?: VModelType): void;
  (e: 'update:modelValue', payload: VModelType): void;
  (e: 'clear'): void;
	(e: 'add', payload: BaseVModelType): void;
	(e: 'remove', payload: BaseVModelType): void;
	(e: 'select', payload: BaseVModelType): void;
	(e: 'fetch-start', payload: string): void;
	(e: 'fetch-end', payload: BaseVModelType[]): void;
}
const emit = defineEmits<SelectEmit>();
const props = defineProps(OrionSelectSetupService.props);
const setup = new OrionSelectSetupService(props, emit);
defineExpose(setup.publicInstance);

/** Doc
 * @doc slot/value The selected value if single select, each value if multiple select
 * @doc/fr slot/value La valeur sélectionnée s'il s'agit d'un select simple, sinon chaque valeur s'il s'agit d'un select multiple
 * @doc slot/value/item/desc The selected item, typed any to avoid linter errors
 * @doc/fr slot/value/item/desc l'élément sélectionné, typé `any` pour éviter des erreur du linter
 * @doc slot/value/item/type any
 * @doc slot/value/display/desc The selected item display value (display-key)
 * @doc/fr slot/value/display/desc La valeur d’affichage de l’élément sélectionné (display-key)
 * @doc slot/value/display/type any
 *
 * @doc slot/before-options Content before the select options in the popover
 * @doc/fr slot/before-options Contenu de la tooltip avant la liste des options
 * @doc slot/before-options/options/desc Options available in the dropdown list
 * @doc/fr slot/before-options/options/desc Options disponibles dans la liste déroulante
 * @doc slot/before-options/options/type BaseVModelType[]

 * @doc slot/option Content of each option in the dropdown list
 * @doc/fr slot/option Contenu de chaque option dans la liste déroulante
 * @doc slot/option/item/desc The option item, typed any to avoid linter errors
 * @doc slot/option/item/desc Un élément parmi les options, typé `any` pour éviter les erreurs du linter
 * @doc slot/option/item/type any
 * @doc slot/option/index/desc The option's index in dropdown list
 * @doc/fr slot/option/index/desc L'index de l'option dans la liste déroulante
 * @doc slot/option/index/type number
 * @doc slot/option/marked-search/desc Function to highlight search term in options list
 * @doc/fr slot/option/marked-search/desc Fonction permettant de mettre en surbrillance le terme recherché dans les options
 * @doc slot/option/marked-search/type (content: string) => string

 * @doc slot/after-options Content after the select options in the popover
 * @doc/fr slot/after-options Contenu de la popover situé après la liste des options
 * @doc slot/after-options/options/desc Options available in the dropdown list
 * @doc/fr slot/after-options/options/desc Options disponibles dans la liste déroulante
 * @doc slot/after-options/options/type BaseVModelType[]
 *
 * @doc event/focus/desc emitted on focus
 * @doc/fr event/focus/desc émis lors du focus
 * @doc event/blur/desc emitted when the focus leaves the field
 * @doc/fr event/blur/desc émis quand le focus quitte le champ
 * @doc event/input/desc emitted when the value of the field changes
 * @doc/fr event/input/desc émis lorsque la valeur est modifiée
 * @doc event/input-keydown-tab/desc emitted when pressing Tab key from the search field
 * @doc/fr event/input-keydown-tab/desc émis lors de l'appui sur la touche Tab depuis le champ de recherche
 * @doc event/change/desc emitted when the value of the field changes
 * @doc/fr event/change/desc émis lorsque la valeur est modifiée
 * @doc event/update:modelValue/desc emitted to update the field value
 * @doc/fr event/update:modelValue/desc émis pour mettre à jour la valeur
 * @doc event/clear/desc emitted when the field is cleared
 * @doc/fr event/clear/desc émis quand le champ est vidé
 *
 * @doc event/add/desc emitted when a value is added from a multiple select
 * @doc/fr event/add/desc émis lorsqu'une valeur est ajoutée à partir d'un select multiple
 * @doc event/remove/desc emitted when a value is removed from a multiple select
 * @doc/fr event/remove/desc émis lorsqu'une valeur est retirée à partir d'un select multiple
 * @doc event/select/desc emitted when a value is selected from a simple select
 * @doc/fr event/select/desc émis lorsqu'une valeur est sélectionnée à partir d'un select simple
 * @doc event/fetch-start/desc emitted when the fetch research starts
 * @doc/fr event/fetch-start/desc émis lorsque la récupération des options commence
 * @doc event/fetch-end/desc emitted when the fetch research ends
 * @doc/fr event/fetch-end/desc émis quand la récupération des options est finie
 */
</script>
