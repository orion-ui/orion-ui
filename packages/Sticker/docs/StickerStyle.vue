<template>
	<o-sticker
		title="Title">
		Lorem ipsum dolor sit amet consectetur adipisicing elit.
		Tempora blanditiis cumque modi ullam non fugiat nulla suscipit.
	</o-sticker>

	<o-sticker
		title="No elevation"
		:use-elevation="false">
		Lorem ipsum dolor sit amet consectetur adipisicing elit.
		Tempora blanditiis cumque modi ullam non fugiat nulla suscipit.
	</o-sticker>

	<o-sticker
		title="Muted sticker"
		muted>
		Lorem ipsum dolor sit amet consectetur adipisicing elit.
		Tempora blanditiis cumque modi ullam non fugiat nulla suscipit.
	</o-sticker>

	<o-sticker
		title="With actions">
		Lorem ipsum dolor sit amet consectetur adipisicing elit.
		Tempora blanditiis cumque modi ullam non fugiat nulla suscipit.
		<template #actions>
			<o-icon
				ripple="info"
				icon="check"/>
			<o-icon
				icon="undo"/>
		</template>
	</o-sticker>

	<o-sticker
		title="Thumbnail">
		Lorem ipsum dolor sit amet consectetur adipisicing elit.
		Tempora blanditiis cumque modi ullam non fugiat nulla suscipit.
		<template #thumbnail>
			<o-avatar
				:size="75"
				name="Aolrf"
				avatar="https://picsum.photos/id/104/3840/2160"/>
		</template>
	</o-sticker>
</template>


@hl {3,10,17,26-31,39-44}


@lang:en
### Style

You can add a title, a disabled style with the prop `muted`, or change the layout with the slots `actions` and `thumbnail`.
@lang

@lang:fr
### Style

Il est possible d'ajouter un titre au sticker, un style désactivé via la props `muted` ou de modifier la disposition avec les slots `actions` ou `thumbnail`.
@lang
