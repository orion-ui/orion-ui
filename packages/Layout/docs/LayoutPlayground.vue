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
  background-color: var(--grey);
  height: 3rem;
  display: flex;
  justify-content: center;
  align-items: center;
}
.nav-main {
  background-color: var(--grey-light);
  flex: 6rem 0 0;
  display: flex;
  justify-content: center;
  align-items: center;
}
.main {
  background-color: var(--grey-lighter);
  display: flex;
	flex: 1;
  justify-content: center;
  align-items: center;
  height: calc(200rem / 16);
	padding-top: 1rem;
}
.nav-tabs {
  background-color: var(--grey-dark);
  height: 3rem;
  display: flex;
  justify-content: center;
  align-items: center;
}

.container {
  display: flex;
  height: calc(200rem / 16);
}

.example {
  margin-bottom: 2rem;
  margin-top: 2rem;
  border: calc(3rem / 16) solid white;
}
</style>

@lang:en
### Common use
@lang

@lang:fr
### Exemple de disposition
@lang
