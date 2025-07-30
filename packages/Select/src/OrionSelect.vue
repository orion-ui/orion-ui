<template>
	<v-dropdown
		:ref="setup._popover"
		:theme="setup.showPopoverSearch ? 'orion-select-searchable' : 'orion-select'"
		:positioning-disabled="setup.responsive.onPhone"
		:triggers="[]"
		:shown="setup.showPopover"
		:auto-hide="!!$slots.default"
		v-bind="dropdownOptions"
		:container="setup._defaultSlot.value"
		@hide="setup.handleBlur()"
		@apply-show="setup.handlePopoverShow()">
		<orion-field
			v-if="!$slots.default"
			v-bind="setup.orionFieldBinding"
			:placeholder="(setup.valueToSearch?.length && !setup._optionssearchinput || setup.labelIsFloating) ? undefined : placeholder"
			:label-is-floating="setup.labelIsFloating"
			class="orion-select"
			:class="[{ 'orion-select--multiple': multiple }, $attrs.class]"
			@clear="setup.clear()">
			<div
				:ref="setup._input"
				class="orion-input__input"
				:tabindex="disabled ? undefined : 0"
				@focus="setup.handleFocus($event)"
				@blur="setup.handleBlur($event)"
				@mousedown="setup.handleInputMousedown()"
				@keydown.esc="setup.handleBlur()"
				@keydown.down.prevent="setup.handleKeydown('down')"
				@keydown.up.prevent="setup.handleKeydown('up')"
				@keydown.enter="setup.selectItemFromEnter()">
				<div v-if="multiple && setup.isArray(vModel) && vModel?.length && !$slots['multiple-value']">
					<span
						v-for="(item, i) in vModel"
						:key="Number(i)"
						class="orion-select__selected-item">
						<slot
							v-if="setup.valueDisplay(item)"
							name="value"
							v-bind="setup.valueDisplay(item)">
							{{ setup.valueDisplay(item)!.display }}
						</slot>
						<span
							v-if="!readonly && !disabled"
							class="orion-select__selected-item-remove"
							@mousedown.prevent="setup.removeIndex(i)">
							&times;
						</span>
					</span>
				</div>
				<slot
					v-else-if="!multiple && !setup.isArray(vModel) && setup.valueDisplay()"
					name="value"
					v-bind="setup.valueDisplay(vModel)">
					{{ setup.valueDisplay(vModel).display }}
				</slot>
				<slot
					v-else-if="$slots['multiple-value'] && vModel && setup.isArray(vModel)"
					name="multiple-value"
					:value="vModel"/>


				<input
					v-if="autocomplete && (!setup.hasValue || (setup.hasValue && setup.isFocus))"
					:ref="setup._autocomplete"
					v-model="setup.valueToSearch"
					type="text"
					class="orion-input__input orion-select__autocomplete"
					:class="{
						'orion-select__autocomplete--single': !multiple,
						'orion-select__autocomplete--multiple': multiple,
					}"
					@focus="setup.handleFocus($event)"
					@blur="setup.handleBlur($event)">
			</div>

			<template #icon-suffix>
				<orion-icon
					v-show="!autocomplete &&
						(!clearable || (clearable && !setup.hasValue))"
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

		<div
			v-if="$slots.default"
			:ref="setup._defaultSlot"
			class="orion-select orion-select--default-slot"
			:tabindex="disabled ? undefined : 0"
			@mousedown="setup.togglePopover()"
			@keydown.esc="setup.handleBlur()"
			@keydown.down.prevent="setup.handleKeydown('down')"
			@keydown.up.prevent="setup.handleKeydown('up')"
			@keydown.enter="setup.selectItemFromEnter()">
			<slot/>
		</div>

		<template #popper>
			<div
				:ref="setup._popoverinner"
				class="orion-select__popover"
				:class="{ 'orion-select-multiple__popover': multiple }"
				@touchmove.stop="setup.handleScroll()"
				@mousedown.self="setup.handleMousedownOnPopper($event)"
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
					@keydown.tab.prevent.stop="setup.handleTabEvent()"
					@keydown.esc.stop="setup.handleBlur()"
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
					<template
						v-for="(option, i) in setup.optionsDisplay"
						:key="i">
						<div
							:ref="el => { if (!!el) setup._items.value.push(el) }"
							class="orion-select__popover-item"
							:class="{
								'selected' : setup.optionIsSelected(option),
								'hover' : setup.indexNav === i,
								'disabled' : !!disabledKey && !!setup.get(option, disabledKey, false),
								'favorite' : i < (setup.favoritesOptions ? setup.favoritesOptions.length : 0),
								'favorite--last': setup.favoritesOptions && i + 1 === setup.favoritesOptions.length,
							}"
							@mousedown.prevent.stop="setup.selectItem(option)">
							<slot
								name="option"
								:item="option"
								:index="i"
								:marked-search="setup.markedSearch.bind(setup)">
								<span
									v-html="setup.itemIsObject(option) && displayKey
										? setup.markedSearch(option[displayKey])
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
							<orion-icon
								v-if="favoriteIcon && !setup.optionIsSelected(option)"
								:icon="favoriteIcon"
								class="favorite-icon"/>
						</div>
						<hr
							v-if="setup.favoritesOptions && i === (setup.favoritesOptions.length - 1)"
							class="favorite-separator">
					</template>
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

<script
	setup
	lang="ts"
	generic="
		T,
		O,
		VKey extends keyof O = never,
		DKey extends keyof O = VKey,
	">
import './OrionSelect.less';
import { OrionButton } from 'packages/Button';
import { OrionIcon } from 'packages/Icon';
import { OrionInput } from 'packages/Input';
import { OrionLoader } from 'packages/Loader';
import { OrionField } from 'packages/Field';
import OrionSelectSetupService from './OrionSelectSetupService';
import type { OrionSelectProps, OrionSelectEmits, VModelType } from './OrionSelectSetupService';
const emits = defineEmits<OrionSelectEmits<T, O>>();
const vModel = defineModel<VModelType<T>>();
const props = withDefaults(defineProps<OrionSelectProps<T, O, VKey, DKey>>(), OrionSelectSetupService.defaultProps);
const setup = new OrionSelectSetupService(props, emits, vModel);

defineSlots<{
	'default'(): void
	'multiple-value'(props: { value: T[] }): void
	'before-options'(props: { options: O[] }): void
	'after-options'(props: { options: O[] }): void
  'option'(props: {
			item: O,
			index: number,
			markedSearch:(content: string) => string | undefined
		}): void
	'value'(props: {
			item: ReturnType<OrionSelectSetupService<T, O, VKey, DKey>['valueDisplay']>['item'],
			display: ObjectKeyValidator<O, DKey, VKey> extends never
				? O
				: DKey extends keyof O
					? O[DKey]
					: O | undefined;
		}): void
}>();

defineExpose(setup.publicInstance);


type ObjectKeyValidator<
	O,
	D extends keyof O,
	V extends keyof O
> = D extends never
	? (V extends never ? O : O[V])
	: O[D];

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
 * @doc slot/multiple-value The content of the select if the props multiple is set
 * @doc/fr slot/multiple-value Contenu du select si la props multiple est définie
 * @doc slot/multiple-value/value/desc value of the vModel
 * @doc/fr slot/multiple-value/value/desc valeur du vModel
 * @doc slot/multiple-value/value/type BaseVModelType[]
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
 */
</script>
