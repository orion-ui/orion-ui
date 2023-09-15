<template>
	<o-tour
		ref="_tour"
		:callback="endFunction">
		<o-tour-step
			target="oriontour"
			size="sm"
			title="First step">
			<o-section size="lg">
				This step target is an id in the DOM.
			</o-section>
		</o-tour-step>
		<o-tour-step
			target="toc-propsTour"
			size="lg"
			title="Second step of the tour">
			<o-section size="xs">
				Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras gravida orci a nulla auctor,
				in tempus erat elementum. Nullam ac tincidunt dolor. Sed sapien massa, commodo sed feugiat ac,
				auctor sed lectus.
			</o-section>
			<o-section size="xs">
				Cras eu sapien fermentum, bibendum turpis vel, congue metus. Phasellus ultricies
				urna porta sem auctor, in dignissim lorem tempus. Morbi non blandit ante, a fermentum orci. Praesent
				dolor ex, vehicula non semper et, fringilla lacinia erat.
			</o-section>
			<o-section size="xs">
				Cras eu sapien fermentum, bibendum turpis vel, congue metus. Phasellus ultricies
				urna porta sem auctor, in dignissim lorem tempus. Morbi non blandit ante, a fermentum orci. Praesent
				dolor ex, vehicula non semper et, fringilla lacinia erat.
				<o-section size="lg">
					Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras gravida orci a nulla auctor,
					in tempus erat elementum. Nullam ac tincidunt dolor. Sed sapien massa, commodo sed feugiat ac,
					auctor sed lectus.
				</o-section>
			</o-section>
		</o-tour-step>
		<o-tour-step
			:target="getTarget"
			size="lg"
			title="Target with function">
			<o-section size="md">
				Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras gravida orci a nulla auctor,
				in tempus erat elementum. Nullam ac tincidunt dolor. Sed sapien massa, commodo sed feugiat ac,
				auctor sed lectus.
			</o-section>
		</o-tour-step>
		<o-tour-step
			target="tour1"
			size="lg"
			:previous="{ label:'Custom Previous Label' }"
			title="Target with function">
			<o-section size="md">
				Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras gravida orci a nulla auctor,
				in tempus erat elementum. Nullam ac tincidunt dolor. Sed sapien massa, commodo sed feugiat ac,
				auctor sed lectus.
			</o-section>
		</o-tour-step>
		<o-tour-step
			size="lg"
			title="Step with no target">
			<o-section size="md">
				Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras gravida orci a nulla auctor,
				in tempus erat elementum. Nullam ac tincidunt dolor. Sed sapien massa, commodo sed feugiat ac,
				auctor sed lectus.
			</o-section>
		</o-tour-step>
	</o-tour>
</template>

<script setup lang="ts">
import { useNotif, useTour } from 'services';
import { onMounted } from 'vue';
import { ref } from 'vue';


const _tour = ref<OrionTour>();

function endFunction () {
	useNotif.success('Tour ended !');
}

function getTarget () {
	return document.getElementById('toc-publicInstanceTourStep');
}

onMounted(() => {
	useTour('tour', _tour.value);
});
</script>
