<template>
	<o-tour ref="_tourProps">
		<o-tour-step title="No target">
			<o-section size="xs">
				Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras gravida orci a nulla auctor,
				in tempus erat elementum. Nullam ac tincidunt dolor. Sed sapien massa, commodo sed feugiat ac,
				auctor sed lectus.
			</o-section>
		</o-tour-step>
		<o-tour-step
			target="tour3">
			<o-section size="xs">
				Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras gravida orci a nulla auctor,
				in tempus erat elementum. Nullam ac tincidunt dolor. Sed sapien massa, commodo sed feugiat ac,
				auctor sed lectus.
			</o-section>
		</o-tour-step>
		<o-tour-step
			:target="getTarget">
			<o-section size="xs">
				Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras gravida orci a nulla auctor,
				in tempus erat elementum. Nullam ac tincidunt dolor. Sed sapien massa, commodo sed feugiat ac,
				auctor sed lectus.
			</o-section>
		</o-tour-step>
		<o-tour-step
			size="sm"
			target="stepsm">
			<o-section size="xs">
				Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras gravida orci a nulla auctor,
				in tempus erat elementum. Nullam ac tincidunt dolor. Sed sapien massa, commodo sed feugiat ac,
				auctor sed lectus.
			</o-section>
		</o-tour-step>
		<o-tour-step
			size="md"
			target="stepmd">
			<o-section size="xs">
				Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras gravida orci a nulla auctor,
				in tempus erat elementum. Nullam ac tincidunt dolor. Sed sapien massa, commodo sed feugiat ac,
				auctor sed lectus.
			</o-section>
			<o-section size="xs">
				Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras gravida orci a nulla auctor,
				in tempus erat elementum. Nullam ac tincidunt dolor. Sed sapien massa, commodo sed feugiat ac,
				auctor sed lectus.
			</o-section>
		</o-tour-step>
		<o-tour-step
			size="lg"
			target="steplg">
			<o-section size="xs">
				Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras gravida orci a nulla auctor,
				in tempus erat elementum. Nullam ac tincidunt dolor. Sed sapien massa, commodo sed feugiat ac,
				auctor sed lectus.
			</o-section>
			<o-section size="xs">
				Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras gravida orci a nulla auctor,
				in tempus erat elementum. Nullam ac tinciduntO dolor. Sed sapien massa, commodo sed feugiat ac,
				auctor sed lectus.
			</o-section>
			<o-section size="xs">
				Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras gravida orci a nulla auctor,
				in tempus erat elementum. Nullam ac tincidunt dolor. Sed sapien massa, commodo sed feugiat ac,
				auctor sed lectus.
			</o-section>
		</o-tour-step>
		<o-tour-step
			:end="{
				label: 'Custom END Label',
				callback: () => useNotif.info('end clicked'),
			}"
			target="stepNext">
			<o-section size="xs">
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

const _tourProps = ref<OrionTour>();

onMounted(() => {
	useTour('_tourProps', _tourProps.value);
});

function getTarget () {
	return document.getElementById('tour4');
}
</script>
