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
  background-color: var(--background-neutral-moderate);
  height: 3rem;
  display: flex;

  &__left {
    justify-content: center;
    align-items: center;
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: var(--background-neutral-default);
  }
  &__additional {
    justify-content: center;
    align-items: center;
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: var(--background-neutral-moderate);
  }
  &__right {
    justify-content: center;
    align-items: center;
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: var(--background-neutral-subtle);
  }
}

.nav-main {
  background-color: var(--background-neutral-default);
	flex: 6rem 0 0;
  display: flex;
  justify-content: center;
  align-items: center;
}

.nav-fullpage {
  background-color: var(--background-neutral-subtle);
  display: flex;
  height: 100%;
  justify-content: center;
  align-items: center;

  &__before {
    height: 3rem;
    width: 100%;
    justify-content: center;
    align-items: center;
    display: flex;
    background-color: var(--background-neutral-minimal);
  }

	&__after {
    height: 3rem;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: var(--background-neutral-moderate);
  }
}

.nav-container {
  background-color: var(--background-neutral-subtle);
  width: 100%;
  display: flex;
  height: 100%;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.nav {
  display: flex;
  height: 100%;
  height: 15rem;
  justify-content: center;
  align-items: center;
}

.main {
  background-color: var(--background-neutral-minimal);
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  height: 12.5rem
}
.footer {
  background-color: var(--background-neutral-subtle);
  display: flex;
  justify-content: center;
  align-items: center;
  height: 2rem
}
.nav-tabs {
  background-color: var(--background-neutral-default);
  height: 3rem;
  display: flex;
  justify-content: center;
  align-items: center;
}

.container {
  display: flex;
  height: 12.5rem;
  flex-direction: column;
}

.example {
  margin-bottom: 2rem;
  margin-top: 2rem;
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
