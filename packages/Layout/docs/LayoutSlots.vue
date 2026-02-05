<template>
	<div class="example">
		<div class="nav-top">
			<div class="nav-top__left">
				Top left
			</div>
			<div class="nav-top__additional">
				Top additional
			</div>
			<div class="nav-top__right">
				Top right
			</div>
		</div>
		<div class="container">
			<div class="main">
				<span>Default</span>
			</div>
			<div class="footer">
				Footer
			</div>
		</div>
	</div>
</template>

<style scoped lang="less">
.nav-top {
	display: flex;
	height: 3rem;
	background-color: var(--o-background-neutral-moderate);

	&__left {
		display: flex;
		flex: 1;
		align-items: center;
		align-items: center;
		justify-content: center;
		justify-content: center;
		background-color: var(--o-background-neutral-default);
	}

	&__additional {
		display: flex;
		flex: 1;
		align-items: center;
		align-items: center;
		justify-content: center;
		justify-content: center;
		background-color: var(--o-background-neutral-moderate);
	}

	&__right {
		display: flex;
		flex: 1;
		align-items: center;
		align-items: center;
		justify-content: center;
		justify-content: center;
		background-color: var(--o-background-neutral-subtle);
	}
}

.nav-main {
	display: flex;
	flex: 6rem 0 0;
	align-items: center;
	justify-content: center;
	background-color: var(--o-background-neutral-default);
}

.nav-fullpage {
	display: flex;
	align-items: center;
	justify-content: center;
	height: 100%;
	background-color: var(--o-background-neutral-subtle);

	&__before {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 3rem;
		background-color: var(--o-background-neutral-minimal);
	}

	&__after {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 3rem;
		background-color: var(--o-background-neutral-moderate);
	}
}

.nav-container {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	width: 100%;
	height: 100%;
	background-color: var(--o-background-neutral-subtle);
}

.nav {
	display: flex;
	align-items: center;
	justify-content: center;
	height: 100%;
	height: 15rem;
}

.main {
	display: flex;
	align-items: center;
	justify-content: center;
	width: 100%;
	height: 12.5rem;
	background-color: var(--o-background-neutral-minimal);
}

.footer {
	display: flex;
	align-items: center;
	justify-content: center;
	height: 2rem;
	background-color: var(--o-background-neutral-subtle);
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
	flex-direction: column;
	height: 12.5rem;
}

.example {
	margin-top: 2rem;
	margin-bottom: 2rem;
	border: calc(3rem / 16) solid white;
}
</style>

@lang:en
### Slots

In addition to the props, you can use `slots` to place items more precisely.
@lang

@lang:fr
### Slots
En complément des props, il est possible d'utiliser les `slots` pour placer le contenu plus précisément.
@lang
