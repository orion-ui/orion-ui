<template>
	<o-timeline
		v-model="activePane"
		horizontal>
		<o-timeline-pill
			name="pane1"
			color="danger"/>
		<o-timeline-pill
			name="pane2"
			complete
			:popper-options="{ triggers: ['hover'] }">
			<template #popper>
				<strong>Custom popper content</strong>
			</template>
		</o-timeline-pill>
		<o-timeline-pill
			name="pane3"
			color="warning"/>
	</o-timeline>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const activePane = ref('pane2');
</script>

<style lang="less" scoped>

</style>

@hl {7,11-13}

@lang:en
### Pills only
Instead of using panes, you can also use only `o-timeline-pill` components to use the timeline like a stepper.

The `popper` slot is available to add content to a dropdown popper for each pill.


@lang

@lang:fr
### Pastilles uniquement
Au lieu d'utiliser des panneaux, vous pouvez également utiliser uniquement des composants `o-timeline-pill`
pour utiliser la timeline comme un séquenceur d'étapes.

Le slot `popper` peut aussi être utilisé pour ajouter du contenu à un popper pour chaque pastille.
@lang
