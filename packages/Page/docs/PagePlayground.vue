<template>
	<o-page v-bind="state">
		<div class="mt-sm flex fd-c g-xs">
			<div>
				Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras gravida orci a nulla auctor,
				in tempus erat elementum. Nullam ac tincidunt dolor. Sed sapien massa, commodo sed feugiat ac,
				auctor sed lectus.
			</div>
			<div>
				Cras eu sapien fermentum, bibendum turpis vel, congue metus. Phasellus ultricies
				urna porta sem auctor, in dignissim lorem tempus. Morbi non blandit ante, a fermentum orci. Praesent
				dolor ex, vehicula non semper et, fringilla lacinia erat.
			</div>
			<div>
				Cras eu sapien fermentum, bibendum turpis vel, congue metus. Phasellus ultricies
				urna porta sem auctor, in dignissim lorem tempus. Morbi non blandit ante, a fermentum orci. Praesent
				dolor ex, vehicula non semper et, fringilla lacinia erat.
			</div>
		</div>

		<template #actions>
			<o-icon
				v-tooltip="`Search`"
				icon="search"
				@click="triggerSearch()"/>
			<o-button
				color="success"
				@click="showNotif()">
				Action
			</o-button>
		</template>

		<template #subactions>
			<o-button
				button="info"
				size="xs"
				icon="check">
				subactions
			</o-button>
			<div class="flex g-xs mr-xs">
				<o-icon icon="alarm"/>
				<o-icon icon="file_archive"/>
				<o-icon icon="bar_chart_alt"/>
				<o-icon
					icon="devices"
					button="info"/>
			</div>
		</template>
	</o-page>

	<hr>

	<div class="row row--gutter row--middle">
		<div class="col-sm-6">
			<o-input
				v-model="state.title"
				label="Title"/>
		</div>
		<div class="col-sm-6">
			<o-input
				v-model="state.subtitle"
				label="Subtitle"/>
		</div>
	</div>

	<div class="row row--gutter row--toggles">
		<div class="col-sm-4">
			<o-toggle
				v-model="state.stickySubactions"
				label="Sticky subactions"/>
		</div>
		<div class="col-sm-4">
			<o-toggle
				v-model="state.titleEllipsis"
				label="Title ellipsis"/>
		</div>
		<div class="col-sm-4">
			<o-toggle
				v-model="state.subtitleEllipsis"
				label="Subtitle ellipsis"/>
		</div>
	</div>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import { useNotif } from 'lib';

const state = reactive({
	stickySubactions: false,
	titleEllipsis: true,
	subtitleEllipsis: false,
	title: 'Lorem ipsum dolor sit amet',
	subtitle: 'Subtitle',
});

function showNotif () {
	useNotif.info('This is in the actions slot');
}
function triggerSearch () {
	useNotif.info('This is just a fake search');
}
</script>

<style lang="less" scoped>
:deep(.orion-page__subactions) {
	&--sticky {
		background-color: rgba(var(--rgb-grey-lighter), 0.7);
		backdrop-filter: blur(2px);
		margin: 0 -0.5rem;
		padding: 0.5rem;
		top: 4.5rem;
	}
}
</style>

### Playground
