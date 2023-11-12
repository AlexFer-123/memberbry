<template>
  <div class="container mx-auto max-w-4xl">

    <div class="text-center flex-column justify-center align-middle my-6 mx-auto">
      <h1 class="font-title">
        Integrações
      </h1>
      <div class="flex justify-center">
        <div class="flex border-b-2 my-6 border-spacing-0 border-violet-400 opacity-25 w-1/4"></div>
      </div>
    </div>

    <div class="integrations flex flex-wrap">
      <div v-for="integration in integrations" :key="integration" class="">
        <div class="card w-64 flex-wrap">
          {{integration.name}}
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref } from "vue";


const integrations = ref([
  {
    name: 'PandaVídeo'
  },
  {
    name: 'Vimeo'
  }
])

console.log(integrations.value)
</script>

<style lang="scss" scoped>
  .font-title {
    font: {
      size: 2rem;
      weight: 600;
    }
  }
</style>