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
			<div class="row row--grid">
				<div class="col-sm-4">
					<o-select
						v-model="data.ajaxSingle"
						size="xs"
						track-key="id"
						display-key="email"
						value-key="id"
						fetch-url="https://jsonplaceholder.typicode.com/users"
						:fetch-initial-options="data.ajaxSingleInitialOptions"
						:label="`Single`">
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
						ref="multiple"
						v-model="data.ajaxMultiple"
						track-key="id"
						display-key="email"
						fetch-url="https://jsonplaceholder.typicode.com/users"
						:label="`Multiple`"
						multiple/>
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
						label="Single"
						:custom-fetch="customFetch"
						v-bind="commonBind">
						<template #item="{ data: itemData, markedSearch }">
							<div>
								<span v-html="markedSearch(itemData.name)"/> <span v-html="markedSearch(itemData.username)"/><br>
								<b v-html="markedSearch(itemData.email)"/>
							</div>
						</template>
					</o-select>
				</div>

				<div class="col-sm-4">
					<o-select
						ref="multiple"
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
								:options="data.fieldSelect.options">
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
								prefix-icon="apple"/>
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
							</o-select>
						</div>
						<div class="col-sm-6">
							<o-select
								v-model="data.fieldSelect.value"
								:label="`Simple Searchable Prefix Icon`"
								searchable
								:options="data.fieldSelect.options"
								prefix-icon="apple"/>
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
				<div class="col-sm-6">
					<div class="row row--gutter">
						<div class="col-sm-6">
							<o-select
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
								prefix-icon="apple"/>
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
								prefix-icon="apple"/>
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
							<o-select
								v-model="data.fieldSelectValueKey"
								:label="`Simple`"
								display-key="display"
								track-key="id"
								value-key="label"
								clearable
								:options="data.fieldSelectObject.options">
								<template #value="{ item }">
									{{ item?.label }}
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
								prefix-icon="apple"/>
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
								prefix-icon="apple"/>
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
								prefix-icon="apple"/>
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
								prefix-icon="apple"/>
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
								:options="data.fieldSelectObjectMultiple.options"/>
						</div>
						<div class="col-sm-6">
							<o-select
								v-model="data.fieldSelectObjectMultiple.value"
								:label="`Multiple Prefix Icon`"
								track-key="id"
								display-key="label"
								multiple
								:options="data.fieldSelectObjectMultiple.options"
								prefix-icon="apple"/>
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
								prefix-icon="building"/>
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
								<template #value="{ display }">
									<!-- {{ item?.label }} - {{ item.id }} -->
									{{ display }} heho
								</template>
								<template #option="{ item, index }">
									<div>
										<o-icon icon="LinkedIn"/>{{ `${index} -- ${item.label}` }}
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
								prefix-icon="chevron_duo_right"/>
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
								prefix-icon="pause_circle_filled"/>
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
	fieldSelectValueKey: null,
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

const commonBind = inject('commonBind');
// #endregion


// #region Methods
async function customFetch () {
	const resp = await fetch(`https://jsonplaceholder.typicode.com/users`);
	return await resp.json();
}

function cb (e:any) {
	// eslint-disable-next-line no-console
	console.log(`🚀 ~ cb ~ e`, e);
}
// #endregion
</script>
