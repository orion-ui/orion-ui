<template>
	<div><strong>Default alignement</strong></div>
	<br>
	<div class="row row--gutter">
		<div class="col-sm-6">
			<o-icon-section
				icon="image"
				title="Default">
				Lorem ipsum
			</o-icon-section>
		</div>
		<div class="col-sm-6">
			<o-icon-section
				icon="house"
				title="Center">
				Lorem ipsum
			</o-icon-section>
		</div>
	</div>

	<hr>

	<div><strong>Center alignement</strong></div>
	<br>
	<div class="row row--gutter">
		<div class="col-sm-6">
			<o-icon-section
				icon="wb_sunny"
				title="Center with labels"
				center>
				Lorem ipsum
			</o-icon-section>
		</div>
		<div class="col-sm-6">
			<o-icon-section
				icon="redo"
				title="Only centers the description"
				center>
				Lorem ipsum
			</o-icon-section>
		</div>
	</div>
</template>

<script setup lang="ts">

</script>

<style lang="less" scoped>
  .orion-icon-section {
    background-color: var(--o-background-neutral-default);
		padding: 0.75rem 0;
		border-radius: 0.5rem;

		[data-orion-theme="dark"] & {
			background-color: black;
		}
  }
</style>

@hl {30,38}

@lang:en
### Style

The `center` prop can be used to center the content.
@lang

@lang:fr
### Style

La prop `center` permet de centrer le composant.
@lang

