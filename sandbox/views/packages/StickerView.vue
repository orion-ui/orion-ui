<template>
	<o-page title="Sticker">
		<o-sticker
			title="The little sticker"
			@click="logTut()">
			Lorem ipsum dolor sit amet consectetur adipisicing elit.

			<o-icon-section
				icon="Sketch"
				title="turlututu">
				Chapeau pointu
			</o-icon-section>

			<o-icon
				icon="linkpath"
				style="font-size: 2rem"
				marker/>
		</o-sticker>
	</o-page>
</template>

<script setup lang="ts">
function logTut () {
	console.log('tut');
}
function logTut2 () {
	console.log('tut2');
}
</script>
