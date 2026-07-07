<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
  <div id="modal-teleport"></div>
</template>
<script setup lang="ts">
import { useStore } from '@/stores/index'
const store = useStore()

useHead({
  htmlAttrs:{
    lang: 'ko',
    class: computed(() => store.value.darkMode ?? 'is-darkMode')
  }
})

</script>