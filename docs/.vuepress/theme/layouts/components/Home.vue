<template>
	<div class="container">
		<o-section class="hero">
			<div class="row row--grid row--middle">
				<div class="col-sm-6">
					<h1>
						<span class="clip">Orion</span>
					</h1>
					<h2 v-if="frontmatter.lang === 'fr'">
						<span class="clip">Un framework UI</span><br>
						simple<br>
						mais puissant<br>
					</h2>
					<h2 v-else>
						Another simple<br>
						yet powerful<br>
						<span class="clip">UI framework</span>
					</h2>

					<o-section align="left">
						<o-button v-if="frontmatter.lang === 'fr'" color="brand" @click="$router.push('/fr/guide/quick-start.md')">Démarrage</o-button>
						<o-button v-else color="brand" @click="$router.push('/guide/quick-start.md')">Quick Start</o-button>
						<o-button v-if="frontmatter.lang === 'fr'" color="brand" outline @click="$router.push('/fr/components/OrionAvatar.md')">Composants</o-button>
						<o-button v-else color="brand" outline @click="$router.push('/components/OrionAvatar.md')">Components</o-button>
					</o-section>
				</div>
	
				<div class="col-sm-6">
					<div class="logo">
						<div class="logo-bg">
							<svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500" width="100%" id="blobSvg" style="opacity: 1;" transform="rotate(0)">
								<defs>
									<linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
										<stop offset="0%" style="stop-color: rgb(112, 39, 250);"></stop>
										<stop offset="100%" style="stop-color: rgb(163, 64, 205);"></stop>
									</linearGradient>
								</defs>
								<path id="blob" fill="url(#gradient)" style="opacity: 0.4;">
									<animate attributeName="d" dur="25s" repeatCount="indefinite" values="M402.82336,294.74662Q372.52122,339.49324,339.45366,380.77461Q306.3861,422.05598,251.70463,416.9165Q197.02317,411.77702,159.66506,377.28619Q122.30695,342.79537,72.75579,296.39768Q23.20463,250,37.88851,178.24662Q52.57238,106.49324,117.0304,72.97924Q181.48842,39.46525,238.53957,73.79537Q295.59073,108.12549,332.49083,135.50917Q369.39092,162.89286,401.2582,206.44643Q433.12549,250,402.82336,294.74662Z;M460.19079,314.81752Q429.48296,379.63503,366.74655,397.33779Q304.01014,415.04055,238.62673,450.6401Q173.24331,486.23965,141.80231,418.853Q110.3613,351.46635,87.51337,300.73317Q64.66545,250,86.56406,198.80231Q108.46268,147.60462,149.75669,107.39355Q191.05069,67.18248,258.9189,40.41566Q326.7871,13.64883,381.21107,64.45621Q435.63503,115.26359,463.26683,182.63179Q490.89862,250,460.19079,314.81752Z;M424.84079,321.86371Q447.86386,393.72743,384.56836,431.15935Q321.27286,468.59128,248.86371,472.84107Q176.45457,477.09086,148.84107,410.1135Q121.22757,343.13614,67.95457,296.56807Q14.68157,250,76.45485,209.5685Q138.22813,169.13699,166.2505,123.59142Q194.27286,78.04585,249.70464,79.81828Q305.13643,81.59072,362.47721,103.93179Q419.818,126.27286,410.81786,188.13643Q401.81772,250,424.84079,321.86371Z;M469.34657,320.38487Q443.8468,390.76973,373.53877,402.1156Q303.23073,413.46147,238.88463,448.30757Q174.53853,483.15367,122.76833,431.6929Q70.99814,380.23213,76.84563,315.11607Q82.69313,250,78.9227,186.3071Q75.15227,122.6142,131.92223,91.73003Q188.6922,60.84587,253.2305,51.539Q317.7688,42.23213,359.5759,90.92433Q401.383,139.61653,448.11467,194.80827Q494.84633,250,469.34657,320.38487Z;M402.82336,294.74662Q372.52122,339.49324,339.45366,380.77461Q306.3861,422.05598,251.70463,416.9165Q197.02317,411.77702,159.66506,377.28619Q122.30695,342.79537,72.75579,296.39768Q23.20463,250,37.88851,178.24662Q52.57238,106.49324,117.0304,72.97924Q181.48842,39.46525,238.53957,73.79537Q295.59073,108.12549,332.49083,135.50917Q369.39092,162.89286,401.2582,206.44643Q433.12549,250,402.82336,294.74662Z"></animate>
								</path>
								<path id="blob" fill="url(#gradient)" style="opacity: 0.4;">
									<animate attributeName="d" dur="25s" repeatCount="indefinite" values="M469.34657,320.38487Q443.8468,390.76973,373.53877,402.1156Q303.23073,413.46147,238.88463,448.30757Q174.53853,483.15367,122.76833,431.6929Q70.99814,380.23213,76.84563,315.11607Q82.69313,250,78.9227,186.3071Q75.15227,122.6142,131.92223,91.73003Q188.6922,60.84587,253.2305,51.539Q317.7688,42.23213,359.5759,90.92433Q401.383,139.61653,448.11467,194.80827Q494.84633,250,469.34657,320.38487Z;M428.88107,298.41731Q382.87896,346.83463,343.6411,381.94757Q304.40324,417.06052,249.73188,417.66327Q195.06052,418.26602,121.90324,407.33463Q48.74595,396.40324,42.90922,323.20162Q37.07249,250,50.04223,182.03624Q63.01197,114.07249,129.2076,98.49191Q195.40324,82.91133,251.0746,78.83673Q306.74595,74.76214,356.50598,105.64321Q406.26602,136.52427,440.5746,193.26214Q474.88318,250,428.88107,298.41731Z;M402.82336,294.74662Q372.52122,339.49324,339.45366,380.77461Q306.3861,422.05598,251.70463,416.9165Q197.02317,411.77702,159.66506,377.28619Q122.30695,342.79537,72.75579,296.39768Q23.20463,250,37.88851,178.24662Q52.57238,106.49324,117.0304,72.97924Q181.48842,39.46525,238.53957,73.79537Q295.59073,108.12549,332.49083,135.50917Q369.39092,162.89286,401.2582,206.44643Q433.12549,250,402.82336,294.74662Z;M410.95278,296.31131Q377.83016,342.62262,346.59668,396.40799Q315.3632,450.19336,253.66275,438.70512Q191.9623,427.21687,143.72172,394.79004Q95.48115,362.3632,86.24057,306.1816Q77,250,74.51885,185.3632Q72.0377,120.72639,123.0377,68.91975Q174.0377,17.1131,239.88914,47.47163Q305.74057,77.83016,366.40332,99.75233Q427.06607,121.67451,435.57074,185.83725Q444.0754,250,410.95278,296.31131Z;M469.34657,320.38487Q443.8468,390.76973,373.53877,402.1156Q303.23073,413.46147,238.88463,448.30757Q174.53853,483.15367,122.76833,431.6929Q70.99814,380.23213,76.84563,315.11607Q82.69313,250,78.9227,186.3071Q75.15227,122.6142,131.92223,91.73003Q188.6922,60.84587,253.2305,51.539Q317.7688,42.23213,359.5759,90.92433Q401.383,139.61653,448.11467,194.80827Q494.84633,250,469.34657,320.38487Z"></animate>
								</path>
							</svg>
						</div>
						
						<svg viewBox="-5 -5 215 215" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
							<defs>
								<path d="M102.5,0 C159.109187,0 205,45.8908131 205,102.5 C205,159.109187 159.109187,205 102.5,205 C45.8908131,205 0,159.109187 0,102.5 C0,45.8908131 45.8908131,0 102.5,0 Z M102.5,21.6210938 C57.3895542,21.6210938 20.8203125,58.1903355 20.8203125,103.300781 C20.8203125,148.411227 57.3895542,184.980469 102.5,184.980469 C147.610446,184.980469 184.179688,148.411227 184.179688,103.300781 C184.179688,58.1903355 147.610446,21.6210938 102.5,21.6210938 Z" id="path-e0vkp6c181-4"></path>
							</defs>
							<g stroke="none" stroke-width="2" fill="none" fill-rule="evenodd">
								<g transform="translate(-26.000000, -26.000000)">
									<g transform="translate(26.000000, 26.000000)">
										<path d="M100.668459,80.0197853 C96.1453523,80.0197853 92.4786503,83.6864873 92.4786503,88.2095935 L92.4786503,147.91109 C92.4786503,150.504905 91.9124514,152.269848 90.8796818,153.304631 C89.8055491,154.380858 88.4974941,154.9051 86.8367824,154.9051 C85.1760707,154.9051 83.8680157,154.380858 82.793883,153.304631 C81.7611134,152.269848 81.1949145,150.504905 81.1949145,147.91109 L81.1949145,88.2095935 C81.1949145,83.6864873 77.5282125,80.0197853 73.0051063,80.0197853 C68.4820001,80.0197853 64.815298,83.6864873 64.815298,88.2095935 L64.815298,149.126761 C64.815298,152.235171 65.3962817,155.123364 66.5620084,157.773825 C67.7134602,160.39183 69.3104906,162.725374 71.3454726,164.764323 C73.3806381,166.803457 75.7100743,168.4039 78.3236743,169.557901 C80.9681545,170.725538 83.8118553,171.308848 86.8367824,171.308848 C89.8585536,171.308848 92.7184414,170.7268 95.3992315,169.56286 C98.056874,168.408969 100.410685,166.807037 102.449423,164.764323 C104.490889,162.718877 106.071863,160.376257 107.18353,157.747608 C108.301443,155.104188 108.858267,152.225377 108.858267,149.126761 L108.858267,88.2095935 C108.858267,83.6864873 105.191565,80.0197853 100.668459,80.0197853 Z M129.678579,136.875254 C125.255987,136.875254 121.670767,140.460474 121.670767,144.883067 C121.670767,149.305659 125.255987,152.890879 129.678579,152.890879 C134.101172,152.890879 137.686392,149.305659 137.686392,144.883067 C137.686392,140.460474 134.101172,136.875254 129.678579,136.875254 Z M129.678579,42.3830665 C125.255987,42.3830665 121.670767,45.9682863 121.670767,50.390879 L121.670767,124.863535 C121.670767,129.286128 125.255987,132.871348 129.678579,132.871348 C134.101172,132.871348 137.686392,129.286128 137.686392,124.863535 L137.686392,50.390879 C137.686392,45.9682863 134.101172,42.3830665 129.678579,42.3830665 Z M72.8231105,59.1994728 C68.4005178,59.1994728 64.815298,62.7846926 64.815298,67.2072853 C64.815298,71.629878 68.4005178,75.2150978 72.8231105,75.2150978 C77.2457032,75.2150978 80.830923,71.629878 80.830923,67.2072853 C80.830923,62.7846926 77.2457032,59.1994728 72.8231105,59.1994728 Z" id="Combined-Shape" fill="white" fill-rule="nonzero" transform="translate(101.250845, 106.845957) rotate(-45.000000) translate(-101.250845, -106.845957) "></path>
										<use id="Combined-Shape" stroke="white" xlink:href="#path-e0vkp6c181-4"></use>
									</g>
								</g>
							</g>
						</svg>
					</div>
				</div>
			</div>
		</o-section>

		<o-section>
			<div class="row row--grid-xs">
				<div v-for="(feature, index) in features" :key="index" class="col-sm-6 col-md-4">
					<div class="tile tile--grey-lighter">
						<h3>{{ feature.title }}</h3>
						{{ feature.description }}
					</div>
				</div>
			</div>
		</o-section>
	</div>
</template>

<script setup lang="ts">
import { usePageFrontmatter } from 'vuepress/client';
import { computed } from 'vue';

const frontmatter = usePageFrontmatter()

const features = computed (() => {
	if(frontmatter.value.lang !== 'fr') return [
	{
		title: 'Simplicity',
		description: `Orion aims at being as simple as possible, but still provides rich features out-of-the-box.`
	},
	{
		title: 'Fully typed',
		description: `Written in TypeScript, fully typed, because we care about DX. And, it was more fun for us too !`
	},
	{
		title: 'Vue 3 & Vite based',
		description: `Seriously... Should we really introduce you to the Vue.js world ?`
	},
	{
		title: 'Customization',
		description: `Customize easily with CSS vars, typed config, and even customizable components prefix !`
	},
	{
		title: 'Well documented',
		description: `We care a lot about developer experience, and we know how important is a good documentation.`
	},
	{
		title: 'Demos & Playgrounds',
		description: `To quickly kickstart your next project, we provide lot of demos and playgrounds for each component, service and tool.`
	},
] 
	else return  [
	{
		title: 'Simplicité',
		description: `Orion vise à être aussi simple que possible, mais offre de riches fonctionnalités prêtes à l'emploi.`
	},
	{
		title: 'Entièrement typé',
		description: `Entièrement écrit en TypeScript parce que nous nous soucions de l'expérience développeur. Et parce que c'était aussi plus fun pour nous !`
	},
	{
		title: 'Basé sur Vue 3 & Vite',
		description: `Sérieusement... Devons-nous vraiment vous présenter le monde de Vue.js ?`
	},
	{
		title: 'Personnalisation',
		description: `Personnalisez facilement grâce aux variables CSS, à la configuration typéé, et même grâce aux préfixes de composants personnalisables.`
	},
	{
		title: 'Bien documenté',
		description: `Nous nous soucions beaucoup de l'expérience développeur, et nous savons qu'il est important d'avoir une bonne documentation.`
	},
	{
		title: 'Démos & Playgrounds',
		description: `Pour démarrer rapidement votre prochain projet, nous fournissions beaucoup de démo et de playgrounds pour chaque composant, service et outils.`
	},
]})

</script>

<style scoped lang="less">
@import '../../../../../packages/Shared/styles/variables.less';

.container {
	padding: 0 var(--fluid-30px);
}

.clip {
	background: linear-gradient(to bottom right, var(--background-primary-default), var(--brand-alt));
	-webkit-background-clip: text;
	-webkit-text-fill-color: transparent;
	background-clip: text;
}

h1 {
	font-size: 4rem;
	line-height: 1;
	font-weight: 700;
	letter-spacing: -0.125rem;
	margin-bottom: 1rem;
	
	@media @tabletLandscape {
		font-size: 5.25rem;
		margin-bottom: 2rem;
	}
}

h2 {
	border: none;
	font-size: 2.5rem;
	line-height: 1.1;
	color: var(--text-neutral-default);
	padding-top: 0 !important;
	margin-top: 0 !important;
	margin-bottom: 2rem;
	
	@media @tablet {
		font-size: 3rem;
	}
	
	@media @tabletLandscape {
		font-size: 3.5rem;
		margin-bottom: 2.5rem;
	}
}

.logo {
	position: relative;
	display: flex;
	align-items: center;
	justify-content: center;
	aspect-ratio: 1;

	> svg {
		position: relative;
		width: 70%;
		filter: drop-shadow(0 5px 15px rgba(0,0,0,0.3));
	}
}

.logo-bg {
	position: absolute;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;

	> svg {
		scale: 1.1;
	}
}
</style>
