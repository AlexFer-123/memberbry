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
        <div class="card w-64 flex-wrap flex justify-center">
          <div class="flex" >
            <span class=" block subtitle font-medium">
              {{integration.name}}
            </span>
          </div>

          <div class="sm:col-span-3 mt-2">
            <label for="last-name" class="block text-sm font-light leading-6 text-gray-900">Nome</label>
            <div class="mt-1">
              <input v-model="authBody.name" type="text" name="surname" id="surname" autocomplete="family-name" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
            </div>
          </div>
          
          <div class="sm:col-span-3 mt-2">
            <label for="last-name" class="block text-sm font-light leading-6 text-gray-900">URL Callback</label>
            <div class="mt-1">
              <input v-model="authBody.url_callback" type="text" name="surname" id="surname" autocomplete="family-name" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
            </div>
          </div>

          <div class="sm:col-span-3 mt-2">
            <label for="last-name" class="block text-sm font-light leading-6 text-gray-900">URL Website</label>
            <div class="mt-1">
              <input v-model="authBody.url_website" type="text" name="surname" id="surname" autocomplete="family-name" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
            </div>
          </div>

          <div class="sm:col-span-3 mt-2">
            <label for="last-name" class="block text-sm font-light leading-6 text-gray-900">Logo</label>
            <div class="mt-1">
              <input v-model="authBody.logo" type="text" name="surname" id="surname" autocomplete="family-name" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
            </div>
          </div>

          <button @click.prevent="auth2Panda()"> Auth</button>
        
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref } from "vue";

const authBody = ref({})

const integrations = ref([
  {
    name: 'Panda Video'
  },
  {
    name: 'Vimeo'
  },
  {
    name: 'Youtube'
  }
])

const auth2Panda = () => {
  console.log(authBody.value)
}
</script>

<style lang="scss" scoped>
  .font-title {
    font: {
      size: 2rem;
      weight: 600;
    }
  }

  .card { 
    padding: 1.5rem;
    @apply bg-slate-200 mr-1;
    
    .subtitle {
      font: {
        size: 1.2rem
      };
    }
  }
</style>