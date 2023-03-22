<template>
	<div class="progress-circle">
		<o-progress-circle
			:label="`10`"
			:value="10"
			:path-width="3"
			:value-width="2"
			color="info"/>
		<o-progress-circle
			:label="`10`"
			:value="10"
			:path-width="5"
			:value-width="4"
			color="info"/>
		<o-progress-circle
			:label="`10`"
			:value="10"
			:path-width="10"
			:value-width="8"
			color="info"/>
	</div>
	<div class="progress-circle">
		<o-progress-circle
			:label="`10`"
			:value="10"
			:size="40"
			:path-width="3"
			:value-width="2"
			color="info"/>
		<o-progress-circle
			:label="`10`"
			:value="10"
			:size="60"
			:path-width="5"
			:value-width="4"
			color="info"/>
		<o-progress-circle
			:label="`10`"
			:value="10"
			:size="100"
			:path-width="3"
			:value-width="2"
			color="info"/>
	</div>
</template>

<script setup lang="ts">

</script>

<style scoped lang="less">
.progress-circle {
  display: flex;
  align-items: center;
  justify-content: space-around;
  gap: var(--space-sm);
  margin-bottom: var(--space-md);
}
</style>

@hl {6-7,12-13,18-19,26,33,40}

@lang:en
### Style

With `pathWidth` and `valueWidth` props you can change the width of the path and the value's circle.

You can also change the size of the progress cirle with `size` prop.
@lang

@lang:fr
### Style

Avec les props `pathWidth` et `valueWidth` il est possible de changer l'épaisseur du cercle ainsi que celle de sa valeur.

La taille du cerle est aussi modifiable avec la prop `size`.
@lang
