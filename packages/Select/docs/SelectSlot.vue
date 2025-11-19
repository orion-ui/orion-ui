<template>
	<o-select
		v-model="selectValue"
		label="Fake company"
		:options="options"
		clearable
		track-key="id">
		<template #before-options>
			<div class="demo__before-option">
				Before options
			</div>
		</template>

		<template #option="{ item, markedSearch }">
			<div class="demo__item-option">
				<strong v-html="markedSearch(item.name)"/>
				<div>{{ item.city }}</div>
				<em>{{ item.catchPhrase }}</em>
			</div>
		</template>

		<template #after-options>
			<div class="demo__after-option">
				The END
			</div>
		</template>

		<template
			v-if="selectValue"
			#value="{ item }">
			<div>
				<b>Selected :</b>
				{{ item.name }} based in <em class="text--info">{{ item.city }}</em>
			</div>
		</template>
	</o-select>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { getUid } from 'lib';
import { faker } from '@faker-js/faker';

type FakeCompany = {
	id: number
	name: string
	catchPhrase: string
	city: string
}

function seedOptions (qty = 10) {
	const items: FakeCompany[] = [];
	for (let index = 0; index < qty; index++) {
		items.push({
			id: getUid(),
			name: faker.company.name(),
			catchPhrase: faker.company.catchPhrase(),
			city: faker.address.cityName(),
		});
	}

	return items;
}

const options = seedOptions();
const selectValue = ref<FakeCompany>();
</script>

<style lang="less" scoped>
.demo {
	&__before-option {
		background-color: var(--background-info-minimal);
		padding: 0.5rem;
		text-align: center;
		text-transform: uppercase;
		font-weight: 700;
		font-size: 0.85rem;
		color: var(--text-default-default);
		border-radius: 0.25rem;
		margin-bottom: 0.5rem;
	}

	&__item-option {
		display: flex;
		flex-direction: column;
		gap: 0.125rem;

		> strong {
			color: var(--text-default-default);
			.selected > & {
				color: var(--text-default-inverted);
			}
		}

		> div {
			color: var(--text-info-default);
			.selected > & {
				color: var(--text-info-subtle);
			}
		}

		> em {
			color: var(--text-default-subtle);
			.selected > & {
				color: var(--text-default-moderate);
			}
		}
	}

	&__after-option {
		background-color: var(--background-primary-minimal);
		padding: 0.5rem;
		text-align: center;
		font-style: italic;
		font-weight: 700;
		font-size: 0.85rem;
		color: var(--text-primary-default);
		border-radius: 0.25rem;
		margin-top: 0.5rem;
	}
}
</style>

@hl {8-12,14-20,22-26,28-35}

@lang:en
### Use slots to customize options and value rendering

You can use the `before-options` and `after-options` slots to add content before and after the options list in the popover.

Use the `option` slot to customize the way **options** are displayed.

Use the `value` or `multiple-value` slot to customize the way **value** is displayed.
@lang

@lang:fr
### Utilisez les slots pour personnaliser l'affichage des options et de la valeur

Vous pouvez utiliser les slots `before-options` et `after-options` pour ajouter du contenu avant et après la liste des options dans la popover.

Utilisez le slot `option` pour personnaliser la façon d'afficher les **options**.

Utilisez le slot `value` ou `multiple-value` pour personnaliser la façon d'afficher la **valeur**.
@lang
