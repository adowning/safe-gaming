<!-- eslint-disable no-console -->
<script setup lang='ts'>
import consola from 'consola'

import { useDataStore } from '@/store/data'
import { useThemeStore } from '@/store/theme'

const dataStore = useDataStore()
const themeStore = useThemeStore()

onMounted(async () => {
  themeStore.init()
  await dataStore.$load({ name: 'data' }).catch((error: any) => consola.log(error))
  // dataStore.getComments()
})

useHead({
  title: 'Vite PrimeVue Starter',
  meta: [
    {
      name: 'description',
      content: 'PrimeVue Starter starter for vue and vite',
    },
  ],
})
</script>

<template>
  <div id="bar" />
  <router-view />
</template>

<style lang='scss'>
@import './styles/global/variables.scss';
@import 'App.scss';
</style>
