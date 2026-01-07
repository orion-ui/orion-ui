<template>
	<o-page
		title="ajax select"
		:subtitle="$route.path"
		sticky-subactions>
		<template #actions>
			<o-button @click="_modalSelect?.open()">
				Open Modal Select
			</o-button>
		</template>

		<o-section title="orion-select | multiple | options -> fetch">
			<o-input
				:model-value="search"
				@input="setting($event)"/>
			<div class="row row--grid">
				<div class="col-sm-4">
					<o-select
						v-model="data.ajaxSingle"
						size="xs"
						placeholder="placeholder"
						track-key="id"
						label="Label"
						display-key="email"
						disabled
						value-key="id"
						:custom-fetch="customFetch"
						:fetch-min-search="2"
						:fetch-initial-options="data.ajaxSingleInitialOptions"
						@fetch-search-clear="cb">
						<template #option="{ item, markedSearch }">
							<div v-if="item">
								<strong v-html="markedSearch(item.name.slice(0, 10))"/><br>
								<span v-html="markedSearch(item.email.slice(0, 20))"/>
							</div>
						</template>
					</o-select>
					<pre>{{ data.ajaxSingle }}</pre>
				</div>

				<div class="col-sm-4">
					<o-select
						ref="_test"
						v-model="data.ajaxMultiple"
						track-key="id"
						display-key="email"
						fetch-url="https://jsonplaceholder.typicode.com/users"
						:label="`Multiple`"
						multiple>
						<template #before-options>
							<o-button @click="tutu()">Reload</o-button>
						</template>
					</o-select>
				</div>
			</div>

			<div class="row row--grid">
				<div class="col-sm-4">
					<o-select
						v-model="data.ajaxSingle"
						required
						autocomplete
						prefill-search="oiu"
						track-key="id"
						display-key="email"
						value-key="id"
						placeholder="Placeholder"
						:custom-fetch="customFetch"
						v-bind="commonBind">
						<template #value="{ item, display }">
							<div class="flex g-8 ai-c">{{ item?.name }} <o-chips>{{ display }}</o-chips></div>
						</template>
						<template #option="{ item, markedSearch }">
							<div>
								<span v-html="markedSearch(item.name)"/> <span v-html="markedSearch(item.username)"/><br>
								<b v-html="markedSearch(item.email)"/>
							</div>
						</template>
					</o-select>
				</div>

				<div class="col-sm-4">
					<o-select
						v-model="data.ajaxMultiple"
						autocomplete
						track-key="id"
						display-key="email"
						fetch-url="https://jsonplaceholder.typicode.com/users"
						label="Multiple"
						multiple
						v-bind="commonBind"/>
				</div>
			</div>
		</o-section>

		<o-section title="orion-select | simple | options -> String table">
			<div class="row row--gutter">
				<div class="col-sm-6">
					<div class="row row--gutter">
						<div class="col-sm-6">
							<o-select
								v-model="data.fieldSelect.value"
								:label="`Simple`"
								:options="[]">
								<template #before-options="{ options }">
									turltutu {{ options.length }}
								</template>
								<template #after-options>
									turltutu chapeau pointu
								</template>
							</o-select>
						</div>
						<div class="col-sm-6">
							<o-select
								v-model="data.fieldSelect.value"
								:label="`Simple Prefix Icon`"
								:options="data.fieldSelect.options"
								prefix-icon="camera"/>
						</div>
						<div class="col-sm-6">
							<o-select
								v-model="data.fieldSelect.value"
								:label="`Simple Searchable`"
								searchable
								:options="data.fieldSelect.options">
								<template #before-options="{ options }">
									turltutu {{ options.length }}
								</template>
								<template #value="{ item }">{{ item }}</template>
								<template #option="{ item }"> {{ item }}</template>
							</o-select>
						</div>
						<div class="col-sm-6">
							<o-select
								v-model="data.fieldSelect.value"
								:label="`Simple Searchable Prefix Icon`"
								searchable
								:options="data.fieldSelect.options"
								prefix-icon="camera"/>
						</div>
					</div>
				</div>
				<div class="col-sm-6">
					<pre>{{ data.fieldSelect.value }}</pre>
				</div>
			</div>
		</o-section>

		<o-section title="orion-select | simple | options -> Object table">
			<div class="row row--gutter">
				<o-button @click="testt?.togglePopover()">test</o-button>
				<div class="col-sm-6">
					<div class="row row--gutter">
						<div class="col-sm-6">
							<o-select
								ref="testt"
								v-model="data.fieldSelectObject.value"
								:label="`Simple`"
								display-key="label"
								track-key="id"
								disabled-key="disabled"
								:options="data.fieldSelectObject.options"
								@select="cb"/>
						</div>
						<div class="col-sm-6">
							<o-select
								v-model="data.fieldSelectObject.value"
								:label="`Simple Prefix Icon`"
								display-key="label"
								track-key="id"
								:options="data.fieldSelectObject.options"
								prefix-icon="camera"/>
						</div>
						<div class="col-sm-6">
							<o-select
								v-model="data.fieldSelectObject.value"
								:label="`Simple Searchable`"
								display-key="label"
								track-key="id"
								searchable
								:options="data.fieldSelectObject.options"/>
						</div>
						<div class="col-sm-6">
							<o-select
								v-model="data.fieldSelectObject.value"
								:label="`Simple Searchable Prefix Icon`"
								display-key="label"
								track-key="id"
								searchable
								:options="data.fieldSelectObject.options"
								prefix-icon="camera"/>
						</div>
					</div>
				</div>
				<div class="col-sm-6">
					<pre>{{ data.fieldSelectObject.value }}</pre>
				</div>
			</div>
		</o-section>

		<o-section title="orion-select | simple | options -> Object table with value-key">
			<div class="row row--gutter">
				<div class="col-sm-6">
					<div class="row row--gutter">
						<div class="col-sm-6">
							<pre>{{ data.fieldSelectValueKey }}</pre>
							<o-select
								v-model="data.fieldSelectValueKey"
								:label="`Simple----`"
								placeholder="placeholder"
								clearable
								value-key="id"
								display-key="label"
								:options="data.fieldSelectObject.options">
								<template #value="{ item, display }">
									{{ display }} - {{ item }}
								</template>
								<template #option="{ item, index }">
									{{ `${index} -- ${item.label}` }}
								</template>
							</o-select>
						</div>
						<div class="col-sm-6">
							<o-select
								v-model="data.fieldSelectValueKey"
								:label="`Simple Prefix Icon`"
								display-key="display"
								track-key="id"
								value-key="label"
								:options="data.fieldSelectObject.options"
								prefix-icon="camera"/>
						</div>
						<div class="col-sm-6">
							<o-select
								v-model="data.fieldSelectValueKey"
								:label="`Simple Searchable`"
								display-key="display"
								track-key="id"
								value-key="label"
								searchable
								:options="data.fieldSelectObject.options"/>
						</div>
						<div class="col-sm-6">
							<o-select
								v-model="data.fieldSelectValueKey"
								:label="`Simple Searchable Prefix Icon`"
								display-key="display"
								track-key="id"
								value-key="label"
								searchable
								:options="data.fieldSelectObject.options"
								prefix-icon="camera"/>
						</div>
					</div>
				</div>
				<div class="col-sm-6">
					<pre>{{ data.fieldSelectValueKey }}</pre>
				</div>
			</div>
		</o-section>

		<o-section title="orion-select | multiple | options -> String table">
			<div class="row row--gutter">
				<div class="col-sm-6">
					<div class="row row--gutter">
						<div class="col-sm-6">
							<o-select
								v-model="data.fieldSelectMultiple.value"
								:label="`Multiple`"
								multiple
								:options="data.fieldSelectMultiple.options"/>
						</div>
						<div class="col-sm-6">
							<o-select
								v-model="data.fieldSelectMultiple.value"
								:label="`Multiple Prefix Icon`"
								multiple
								:options="data.fieldSelectMultiple.options"
								prefix-icon="camera">
								<template #multiple-value="{ value }">
									{{ value[0]?.toUpperCase() }}
								</template>
							</o-select>
						</div>
						<div class="col-sm-6">
							<o-select
								v-model="data.fieldSelectMultiple.value"
								:label="`Multiple Searchable`"
								multiple
								searchable
								:options="data.fieldSelectMultiple.options"/>
						</div>
						<div class="col-sm-6">
							<o-select
								v-model="data.fieldSelectMultiple.value"
								:label="`Multiple Searchable Prefix Icon`"
								multiple
								searchable
								:options="data.fieldSelectMultiple.options"
								prefix-icon="camera"/>
						</div>
					</div>
				</div>
				<div class="col-sm-6">
					<pre>{{ data.fieldSelectMultiple.value }}</pre>
				</div>
			</div>
		</o-section>

		<o-section title="orion-select | multiple | options -> Object table">
			<div class="row row--gutter">
				<div class="col-sm-6">
					<div class="row row--gutter">
						<div class="col-sm-6">
							<o-select
								v-model="data.fieldSelectObjectMultiple.value"
								:label="`Multiple`"
								track-key="id"
								display-key="label"
								multiple
								:options="data.fieldSelectObjectMultiple.options">
								<template #multiple-value="{ value }">
									ici {{ value }}
								</template>
							</o-select>
						</div>
						<div class="col-sm-6">
							<o-select
								v-model="data.fieldSelectObjectMultiple.value"
								:label="`Multiple Prefix Icon`"
								track-key="id"
								display-key="label"
								multiple
								:options="data.fieldSelectObjectMultiple.options"
								prefix-icon="camera"/>
						</div>
						<div class="col-sm-6">
							<o-select
								v-model="data.fieldSelectObjectMultiple.value"
								:label="`Multiple Searchable`"
								track-key="id"
								display-key="label"
								multiple
								searchable
								:options="data.fieldSelectObjectMultiple.options"/>
						</div>
						<div class="col-sm-6">
							<o-select
								v-model="data.fieldSelectObjectMultiple.value"
								:label="`Multiple Searchable Prefix Icon`"
								track-key="id"
								display-key="label"
								multiple
								searchable
								:options="data.fieldSelectObjectMultiple.options"
								prefix-icon="camera"/>
						</div>
					</div>
				</div>
				<div class="col-sm-6">
					<pre>{{ data.fieldSelectObjectMultiple.value }}</pre>
				</div>
			</div>
		</o-section>

		<o-section title="orion-select | multiple | options -> Object table with value-key">
			<div class="row row--gutter">
				<div class="col-sm-6">
					<div class="row row--gutter">
						<div class="col-sm-6">
							<o-select
								v-model="data.fieldSelectMulitpleValueKey"
								:label="`Multiple`"
								track-key="id"
								display-key="label"
								value-key="label"
								multiple
								:options="data.fieldSelectObjectMultiple.options">
								<template #multiple-value="{ value }">
									<!-- {{ item?.label }} - {{ item.id }} -->
									{{ value }} heho
								</template>
								<template #option="{ item, index }">
									<div>
										<o-icon icon="camera"/>{{ `${index} -- ${item}` }}
									</div>
								</template>
							</o-select>
						</div>
						<div class="col-sm-6">
							<o-select
								v-model="data.fieldSelectMulitpleValueKey"
								:label="`Multiple Prefix Icon`"
								track-key="id"
								display-key="label"
								value-key="label"
								multiple
								:options="data.fieldSelectObjectMultiple.options"
								prefix-icon="camera"/>
						</div>
						<div class="col-sm-6">
							<o-select
								v-model="data.fieldSelectMulitpleValueKey"
								:label="`Multiple Searchable`"
								track-key="id"
								display-key="label"
								value-key="label"
								multiple
								searchable
								:options="data.fieldSelectObjectMultiple.options"/>
						</div>
						<div class="col-sm-6">
							<o-select
								v-model="data.fieldSelectMulitpleValueKey"
								:label="`Multiple Searchable Prefix Icon`"
								track-key="id"
								display-key="label"
								value-key="label"
								multiple
								searchable
								:options="data.fieldSelectObjectMultiple.options"
								prefix-icon="camera"/>
						</div>
					</div>
				</div>
				<div class="col-sm-6">
					<pre>{{ data.fieldSelectMulitpleValueKey }}</pre>
				</div>
			</div>
		</o-section>

		<o-section title="orion-select | dropdownOptions | triggerPopover">
			<div class="row row--gutter mb-xl">
				<div class="col-sm-6">
					<o-button @click="_selectWithTrigger?.togglePopover()">
						trigger popover
					</o-button>
				</div>

				<div class="col-sm-6">
					<o-select
						ref="_selectWithTrigger"
						v-model="data.ajaxSingle"
						:dropdown-options="{
							placement: 'right',
						}"
						:options="data.fieldSelect.options">
						<o-chips>
							{{ data.ajaxSingle ? data.ajaxSingle : 'Chips slot' }}
						</o-chips>
					</o-select>
					<o-select
						v-model="data.ajaxSingle"
						multiple
						searchable
						:dropdown-options="{
							placement: 'right',
						}"
						:options="data.fieldSelect.options">
						<div
							class="tytyty">
							{{ data.ajaxSingle ? data.ajaxSingle : 'Div slot' }}
						</div>
					</o-select>
				</div>
			</div>
		</o-section>

		<o-section title="orion-select | dropdownOptions | triggerPopover">
			<div class="search-header__filters-item">
				<div>
					<o-select
						ref="oSelect2"
						v-model="data.ajaxSingle"
						label="test"
						class="hide-select"
						display-key="email"
						:dropdown-options="{
							placement: 'bottom-start',
						}"
						:options="data.fieldSelect.options">
						<template #default>
							<div class="search-filter__label">{{ "Select 'simple' :" }}</div>
							<div>Autre ligne de texte</div>
						</template>
					</o-select>
				</div>
			</div>

			<div class="search-header__filters-item">
				<div>
					<o-select
						ref="oSelectMultiple"
						v-model="data.ajaxSingle"
						label="test"
						multiple
						class="hide-select"
						display-key="email"
						:dropdown-options="{
							placement: 'bottom-start',
						}"
						:options="data.fieldSelect.options">
						<div class="search-filter__label">{{ "Shared multiple : " + data.ajaxSingle }}</div>

						<template #option="{ item }">
							{{ item }}
						</template>
						<template #value="{ item }">
							{{ item }}
						</template>

						<template #before-options="{ }">
							je suis un before options
						</template>

						<template #after-options="{ }">
							je suis un after options
						</template>
					</o-select>
				</div>
			</div>
		</o-section>
		<o-section title="orion-select | favorites options">
			<div class="row row--gutter">
				<div class="col-sm-6">
					<div class="row row--gutter">
						<div class="col-sm-6">
							<o-select
								v-model="data.fieldSelectMulitpleValueKey"
								:label="`Favorite`"
								track-key="id"
								display-key="label"
								value-key="label"
								multiple
								:options="data.fieldSelectObjectMultiple.options"
								:favorites-options="data.fieldSelectObjectMultiple.options.slice(3, 5)">
								<template #value="{ display }">
									<!-- {{ item?.label }} - {{ item.id }} -->
									{{ display }} heho
								</template>
								<template #option="{ item, index }">
									<div>
										<o-icon icon="camera"/>{{ `${index} -- ${item.label}` }}
									</div>
								</template>
							</o-select>
						</div>
						<div class="col-sm-6">
							<o-select
								v-model="data.fieldSelectMulitpleValueKey"
								:label="`Favorite with icon`"
								track-key="id"
								display-key="label"
								value-key="label"
								multiple
								:options="data.fieldSelectObjectMultiple.options"
								:favorites-options="data.fieldSelectObjectMultiple.options.slice(3, 5)"
								show-favorite-icon
								prefix-icon="camera"/>
						</div>
						<div class="col-sm-6">
							<o-select
								v-model="data.fieldSelectMulitpleValueKey"
								:label="`Favorite icon set`"
								track-key="id"
								display-key="label"
								value-key="label"
								multiple
								:options="data.fieldSelectObjectMultiple.options"
								:favorites-options="data.fieldSelectObjectMultiple.options.slice(3, 5)"
								:favorite-icon="'view_column'"
								show-favorite-icon
								prefix-icon="camera"/>
						</div>
					</div>
				</div>
				<div class="col-sm-6">
					<pre>{{ data.fieldSelectMulitpleValueKey }}</pre>
				</div>
			</div>
		</o-section>
	</o-page>

	<o-modal
		ref="_modalSelect"
		:options="{ size: 'xs' }">
		<o-section title="test select">
			<o-select
				v-model="data.fieldSelect.value"
				:label="`Simple Searchable`"
				searchable
				:options="data.fieldSelect.options">
				<template #before-options="{ options }">
					turltutu {{ options.length }}
				</template>
			</o-select>
		</o-section>
	</o-modal>
</template>

<script setup lang="ts">
import { inject, reactive, ref } from 'vue';

const _modalSelect = ref<OrionModal>();
const _test = ref<OrionSelect>();
const testt = ref<OrionSelect>();
const _chip = ref<HTMLElement>();
const _tututu = ref<OrionChips>();
const _selectWithTrigger = ref<OrionSelect>();
const search =ref('');

function tutu () {
	_test.value?.setSearchTerm('b');
	_test.value?.triggerSearchAsync();
}

function setting (val: Nil<string | number>) {
	_test.value?.setSearchTerm(String(val));
}

// #region Data
const data = reactive({
	ajaxSingle: null,
	ajaxSingleInitialOptions: [{
		'id': 2,
		'name': 'Ervin Howell',
		'username': 'Antonette',
		'email': 'Shanna@melissa.tv',
		'address': {
			'street': 'Victor Plains',
			'suite': 'Suite 879',
			'city': 'Wisokyburgh',
			'zipcode': '90566-7771',
			'geo': {
				'lat': '-43.9509',
				'lng': '-34.4618',
			},
		},
		'phone': '010-692-6593 x09125',
		'website': 'anastasia.net',
		'company': {
			'name': 'Deckow-Crist',
			'catchPhrase': 'Proactive didactic contingency',
			'bs': 'synergize scalable supply-chains',
		},
	}],
	ajaxMultiple: null,
	fieldSelect: {
		value: 'toto',
		options: ['Tempor nostrud veniam amet ad mollit', 'toto', 'tutu', 'titi', 'tata'],
	},
	fieldSelectMultiple: {
		value: ['toto', 'tutu'],
		options: ['toto', 'tutu', 'titi', 'tata', 'dodo', 'dudu', 'didi', 'dada'],
	},
	fieldSelectValueKey: null as string | null,
	fieldSelectMulitpleValueKey: ['toto', 'titi'],
	fieldSelectObject: {
		value: {
			id: 0,
			label: 'toto',
		},
		options: [
			{
				id: 0,
				label: 'toto',
				display: 'disp-toto',
				disabled: false,
			},
			{
				id: 1,
				label: 'tutu',
				display: 'disp-tutu',
				disabled: true,
			},
			{
				id: 2,
				label: 'titi',
				display: 'disp-titi',
				disabled: false,
			},
			{
				id: 3,
				label: 'tata',
				display: 'disp-tata',
				disabled: false,
			},
		],
	},
	fieldSelectObjectMultiple: {
		value: [
			{
				id: 0,
				label: 'toto',
			},
			{
				id: 1,
				label: 'tutu',
			},
		],
		options: [
			{
				id: 0,
				label: 'toto',
			},
			{
				id: 1,
				label: 'tutu',
			},
			{
				id: 2,
				label: 'titi',
			},
			{
				id: 3,
				label: 'é toi',
			},
			{
				id: 4,
				label: 'euh',
			},
			{
				id: 5,
				label: 'dudu',
			},
			{
				id: 6,
				label: 'didi',
			},
			{
				id: 7,
				label: 'dada',
			},
		],
	},
});

const commonBind = inject<Record<string, any>>('commonBind');
// #endregion


// #region Methods
async function customFetch (term?: string): Promise<any[]> {
	// eslint-disable-next-line no-console
	console.log(`customFetch term:`, term);
	const resp = await fetch(`https://jsonplaceholder.typicode.com/users`);
	return await resp.json();
}

function cb () {
	// eslint-disable-next-line no-console
	console.log(`🚀 ~ cb ~`);
}
// #endregion
</script>

<style lang="less">

.tytyty {
	margin: 1rem;
	//width: 10rem;
	position:relative;
	background: var(--o-background-danger-default);
}

.chip-style {
	//width: fit-content;

	position: relative;
}
.hide-select {
	//visibility: hidden;
}
</style>
