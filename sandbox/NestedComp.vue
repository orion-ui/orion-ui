<template>
	<div>
		<div class="row row--grid">
			<div
				v-for="i in 4"
				:key="i"
				class="col-xs-6 col-sm-4 col-lg-3">
				<o-card :title="faker.person.firstName()">
					{{ faker.lorem.paragraph() }}
				</o-card>
			</div>
		</div>

		<o-phone
			v-model="inputVal"
			autofocus
			label="test popover"/>

		<o-input
			v-model="inputVal"
			label="test popover"/>

		<o-datepicker
			v-model="datepickerVal"
			label="test popover"/>

		<o-select
			v-model="selectVal"
			label="test popover"
			:options="['toto', 'tutu', 'titi', 'tata']"/>

		<o-section :title="title ?? `Nested component`">
			<p>
				Nulla vitae elit libero, a pharetra augue.
				Nullam id dolor id nibh ultricies vehicula ut id elit.
				Aenean eu leo quam.
				Pellentesque ornare sem lacinia quam venenatis vestibulum.
				Donec sed odio dui. Vestibulum id ligula porta felis euismod semper.
			</p>

			<!-- <o-input
				id="tour1111"
				v-model="inputval"
				label="Mask decimal"
				mask="decimal"/> -->
		</o-section>

		<!-- <o-section>
			<o-button
				v-if="_tabs"
				@click="_tabs?._loader.value?.show()">
				show tabs loader
			</o-button>
			<o-button @click="_loader?.show()">
				show nested loadr
			</o-button>
		</o-section> -->

		<o-section align="center">
			<o-button
				id="tourA"
				:color="'info'"
				@click="openNested()">
				Open nested
			</o-button>
			<o-button
				color="danger"
				outline
				@click="_popable?.close()">
				Close
			</o-button>
			<o-button
				color="danger"
				outline
				@click="_popable?.close({ flush: true })">
				Close & flush
			</o-button>
			<o-button
				color="info"
				outline
				@click="showLoader()">
				Show loader
			</o-button>
			<o-button
				color="info"
				outline
				@click="_popable?.trigger('toto', { hoho: 'huhu' })">
				Emit toto event
			</o-button>
			<o-button
				color="info"
				outline
				@click="$emit('toto', { hoho: 'huhu' })">
				Emit toto event in component
			</o-button>
			<o-button @click="openBlankModal()">blank modal</o-button>
			<o-button @click="openBlankAside()">blank aside</o-button>
		</o-section>

		<teleport
			v-if="_aside"
			:to="_aside.slotActions">
			<o-button
				color="warning"
				prefix-icon="close"
				@click="_aside?.close()"/>
			<o-button
				color="info"
				prefix-icon="airplay"/>
			<o-button
				color="success"
				prefix-icon="check"
				@click="startTour()"/>
		</teleport>

		<teleport
			v-if="_aside"
			:to="_aside.slotFooter">
			<o-button
				color="danger"
				@click="_aside?.close()">
				close from teleport
			</o-button>
		</teleport>

		<teleport
			v-if="_aside"
			:to="_aside.slotPoster">
			<img src="https://picsum.photos/1000/500">
		</teleport>
	</div>

	<o-loader ref="_loader"/>
</template>

<script setup lang="ts">
import { inject, onMounted, onUnmounted, ref } from 'vue';
import { useAside, useModal } from 'lib';
import { faker } from '@faker-js/faker';
import NestedCompVue from './NestedComp.vue';

defineProps({
	title: {
		type: String,
		default: undefined,
	},
});

defineEmits<{(e: 'toto', val: any): void}>();

const _loader = ref<RefDom<OrionLoader>>();
const _aside = inject<OrionAside>('_aside');
const _modal = inject<OrionModal>('_modal');
const _tabs = inject<OrionTabs>('_tabs');
const _popable = _aside ?? _modal;
const selectVal = ref<string>();
const datepickerVal = ref<Date>();
const inputVal = ref<string>();


// const _tabs = inject<OrionTabs>('_tabs');

function showLoader (): void {
	if (_popable) {
		_popable?._loader()?.show('tutu');
		setTimeout(() => {
			_popable?._loader()?.hide();
		}, 500);
	} else if (_tabs) {
		_tabs._loader()?.show();
		setTimeout(() => {
			_tabs._loader()?.hide();
		}, 1000);
	}
}

function openNested (): void {
	if (_aside) {
		useAside({
			Nested: NestedCompVue,
			overlay: false,
		});
	} else if (_modal) {
		useModal({
			Nested: NestedCompVue,
			// overlay: false,
		});
	}
}

function startTour () {
	// useTour('_tourAside').start();
}

function openBlankModal () {
	useModal({ title: `This is just a blank modal` });
}

function openBlankAside () {
	useAside({});
}

onMounted(() => {
	// eslint-disable-next-line no-console
	console.log('nestedComp mounted');
});
onUnmounted(() => {
	// eslint-disable-next-line no-console
	console.log('nestedComp onUnmounted');
});
</script>

<style lang="less" scoped>
.row--grid > div > .orion-card {
	height: 100%;
}
</style>
