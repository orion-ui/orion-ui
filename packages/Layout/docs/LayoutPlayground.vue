<template>
	<b>Classic layout: </b>
	<div class="example">
		<div class="nav-top">
			Nav top
		</div>
		<div class="container">
			<div class="nav-main">
				Nav main
			</div>
			<div class="main">
				<span>Main</span>
			</div>
		</div>
	</div>

	<b>Layout on small screen :</b>
	<div class="example">
		<div class="nav-top">
			Nav top
		</div>
		<div class="main">
			<span>Main</span>
		</div>
		<div class="nav-tabs">
			Nav tabs
		</div>
	</div>
</template>

<style scoped lang="less">
.nav-top {
	display: flex;
	align-items: center;
	justify-content: center;
	height: 3rem;
	background-color: var(--o-background-neutral-moderate);
}

.nav-main {
	display: flex;
	flex: 6rem 0 0;
	align-items: center;
	justify-content: center;
	background-color: var(--o-background-neutral-subtle);
}

.main {
	display: flex;
	flex: 1;
	align-items: center;
	justify-content: center;
	height: calc(200rem / 16);
	padding-top: 1rem;
	background-color: var(--o-background-neutral-minimal);
}

.nav-tabs {
	display: flex;
	align-items: center;
	justify-content: center;
	height: 3rem;
	background-color: var(--o-background-neutral-default);
}

.container {
	display: flex;
	height: calc(200rem / 16);
}

.example {
	margin-top: 2rem;
	margin-bottom: 2rem;
	border: calc(3rem / 16) solid white;
}
</style>

@lang:en
### Common use
@lang

@lang:fr
### Exemple de disposition
@lang
