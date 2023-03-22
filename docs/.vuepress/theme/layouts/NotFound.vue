<script setup lang="ts">
import { useRouteLocale, useSiteLocaleData } from '@vuepress/client'

const routeLocale = useRouteLocale()

const LocaleData = useSiteLocaleData();

const message = LocaleData.value.lang.split('-')[0] === 'en' ? 'Oooops, Not Found' : 'Oupsss page introuvable'
const homeLink = routeLocale.value
const homeText = LocaleData.value.lang.split('-')[0] === 'en' ? 'Back to home' : `Retourner à l'accueil`
</script>

<template>
  <div class="theme-container">
    <main class="page">
      <div class="theme-default-content">
        <h1>404</h1>

        <blockquote>{{ message }}</blockquote>
        <br>

        <RouterLink :to="homeLink">{{ homeText }}</RouterLink>
      </div>
    </main>
  </div>
</template>
